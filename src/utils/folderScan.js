/* =========================================================================
   Shared-drive spreadsheet map.

   Reads a folder of workbooks and works out which files the others depend
   on: who links to whom, which links point at a machine that is not in the
   folder, which one file a dozen reports read from, and which of those has
   only ever been saved by one person.

   The trick that makes this possible in a tab is not reading the files. A
   workbook is a ZIP, and everything here comes from four small XML parts —
   so a 40MB model costs a few kilobytes of reading, not 40MB of memory.
   Nothing is uploaded; nothing leaves the page.
   ========================================================================= */

import { openZipFromBlob } from './zipReader';
import { parseXml, tags, attr, textOf } from './ooxml';

export const WORKBOOK_PATTERN = /\.(xlsx|xlsm|xltx|xltm)$/i;

/* A shared drive can hold tens of thousands of files. The cap keeps the
   scan finite; what it drops is reported rather than silently ignored. */
export const MAX_FILES = 2000;

/* Only these are read out of each workbook. Named here because a visitor
   is being asked to point this at their company's files, and "we read four
   parts" is a checkable claim in a way that "it's all local" is not. */
export const PARTS_READ = [
  'xl/workbook.xml',
  'xl/externalLinks/_rels/*.rels',
  'xl/connections.xml',
  'docProps/core.xml',
];

/* ---------- reading one workbook ---------------------------------------- */

/**
 * Probe a single workbook. Returns null when the file is not a readable
 * OOXML package — an .xls, a corrupt file, or something merely named .xlsx.
 */
export async function probeWorkbook(file, relativePath) {
  let zip = null;
  try {
    zip = await openZipFromBlob(file);
  } catch (err) {
    zip = null;
  }
  if (!zip || !zip.has('xl/workbook.xml')) return null;

  const record = {
    path: normalizePath(relativePath || file.name),
    name: baseName(relativePath || file.name),
    size: file.size,
    modified: file.lastModified || 0,
    sheets: [],
    links: [],
    connections: [],
    hasMacros: zip.has('xl/vbaProject.bin'),
    macroBytes: zip.has('xl/vbaProject.bin') ? zip.entry('xl/vbaProject.bin').uncompressedSize : 0,
    creator: '',
    lastModifiedBy: '',
    revision: '',
  };

  const workbookDoc = parseXml(await zip.text('xl/workbook.xml'));
  record.sheets = tags(workbookDoc, 'sheet').map((node) => ({
    name: attr(node, 'name') || '',
    state: attr(node, 'state') || 'visible',
  }));

  if (zip.has('xl/connections.xml')) {
    const doc = parseXml(await zip.text('xl/connections.xml'));
    record.connections = tags(doc, 'connection')
      .map((node) => {
        const db = [...node.children].find((child) => child.localName === 'dbPr');
        const string = attr(db, 'connection') || '';
        const source = /(?:^|;)\s*(?:data source|server|dsn)\s*=\s*([^;]+)/i.exec(string);
        return { name: attr(node, 'name') || '', server: source ? source[1].trim() : '' };
      })
      /* $Workbook$ and the Mashup provider point at the file itself. */
      .filter((c) => c.server && !/^\$/.test(c.server));
  }

  const relNames = zip.names().filter((name) => /^xl\/externalLinks\/_rels\/.+\.rels$/i.test(name));
  for (let i = 0; i < relNames.length; i += 1) {
    /* eslint-disable-next-line no-await-in-loop */
    const doc = parseXml(await zip.text(relNames[i]));
    tags(doc, 'Relationship').forEach((node) => {
      const target = attr(node, 'Target');
      if (!target) return;
      let decoded = target;
      try {
        decoded = decodeURIComponent(target);
      } catch (err) {
        /* A literal % in a filename. The raw target is still usable. */
      }
      record.links.push(decoded);
    });
  }

  if (zip.has('docProps/core.xml')) {
    const doc = parseXml(await zip.text('docProps/core.xml'));
    record.creator = textOf(doc, 'creator');
    record.lastModifiedBy = textOf(doc, 'lastModifiedBy');
    record.revision = textOf(doc, 'revision');
  }

  return record;
}

/* ---------- paths -------------------------------------------------------- */

export const normalizePath = (path) => String(path || '').replace(/\\/g, '/').replace(/^\.\//, '');

export const baseName = (path) => normalizePath(path).split('/').pop();

const dirName = (path) => {
  const parts = normalizePath(path).split('/');
  parts.pop();
  return parts.join('/');
};

/** Collapse "a/b/../c" to "a/c" so a relative target resolves to a real path. */
function resolveRelative(fromDir, target) {
  const segments = `${fromDir ? `${fromDir}/` : ''}${target}`.split('/');
  const out = [];
  segments.forEach((segment) => {
    if (!segment || segment === '.') return;
    if (segment === '..') out.pop();
    else out.push(segment);
  });
  return out.join('/');
}

const isAbsolute = (target) => /^([A-Za-z]:|\/\/|\\\\|file:|https?:)/.test(target);

/* ---------- the map ------------------------------------------------------ */

/**
 * Turn a list of probes into a dependency graph plus the facts worth
 * reading off it. Pure: same records in, same map out.
 */
export function buildMap(records) {
  const byPath = new Map(records.map((record) => [record.path.toLowerCase(), record]));

  const byName = new Map();
  records.forEach((record) => {
    const key = record.name.toLowerCase();
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(record);
  });

  const edges = [];
  const outside = [];

  records.forEach((source) => {
    source.links.forEach((rawTarget) => {
      const target = normalizePath(rawTarget.replace(/^file:\/{2,3}/i, ''));
      const name = baseName(target).toLowerCase();

      /* A relative target can be resolved exactly, which is the only kind
         of match worth calling certain. */
      if (!isAbsolute(target)) {
        const resolved = resolveRelative(dirName(source.path), target).toLowerCase();
        const hit = byPath.get(resolved);
        if (hit) {
          edges.push({ from: source.path, to: hit.path, confidence: 'exact', target: rawTarget });
          return;
        }
      }

      /* Otherwise the best available match is the filename. Reported as
         such: two folders can hold files with the same name, and saying
         "exact" about a guess would be the tool overstating what it knows. */
      const candidates = byName.get(name) || [];
      if (candidates.length === 1 && candidates[0].path !== source.path) {
        edges.push({ from: source.path, to: candidates[0].path, confidence: 'by name', target: rawTarget });
        return;
      }
      if (candidates.length > 1) {
        edges.push({ from: source.path, to: null, confidence: 'ambiguous', target: rawTarget });
        return;
      }

      outside.push({ from: source.path, target: rawTarget });
    });
  });

  const inDegree = new Map();
  const outDegree = new Map();
  edges.forEach((edge) => {
    outDegree.set(edge.from, (outDegree.get(edge.from) || 0) + 1);
    if (edge.to) inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1);
  });

  const dependedOn = records
    .filter((record) => inDegree.get(record.path))
    .map((record) => ({ record, dependents: inDegree.get(record.path) }))
    .sort((a, b) => b.dependents - a.dependents || a.record.path.localeCompare(b.record.path));

  const oneAuthor = records.filter(
    (record) =>
      record.creator &&
      record.lastModifiedBy &&
      record.creator === record.lastModifiedBy &&
      inDegree.get(record.path)
  );

  const applications = records.filter(
    (record) => record.hasMacros && (record.connections.length > 0 || inDegree.get(record.path))
  );

  return {
    files: records,
    edges,
    outside,
    dependedOn,
    oneAuthor,
    applications,
    versions: findVersionClusters(records),
    stale: findStaleButDependedOn(records, inDegree),
    counts: {
      files: records.length,
      withMacros: records.filter((r) => r.hasMacros).length,
      withConnections: records.filter((r) => r.connections.length).length,
      withLinks: records.filter((r) => r.links.length).length,
      linked: edges.filter((e) => e.to).length,
      outside: outside.length,
      bytes: records.reduce((sum, r) => sum + r.size, 0),
    },
    inDegree,
    outDegree,
  };
}

/* ---------- version sprawl ----------------------------------------------- */

/* Strip everything people add to a filename instead of using a version
   control system, and see what is left. */
export function versionKey(name) {
  return (
    String(name)
      .toLowerCase()
      .replace(WORKBOOK_PATTERN, '')
      /* Separators collapse first. Underscores and dots are word characters
         to a regex, so "model_2026-01-04" has no word boundary before the
         year and a \b-anchored date pattern silently misses it. */
      .replace(/[\s._-]+/g, ' ')
      .replace(/\bcopy of\b/g, ' ')
      .replace(/\b(?:v|ver|rev|version) ?\d+(?: \d+)*\b/g, ' ')
      .replace(/\b\d{4} \d{1,2} \d{1,2}\b/g, ' ')
      .replace(/\b\d{6,8}\b/g, ' ')
      .replace(/\((?:\d+|copy)\)/g, ' ')
      .replace(/\b(?:final|draft|new|old|latest|current|backup|copy|updated?|revised)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/** Jaccard similarity of two sheet-name sets. */
export function sheetSimilarity(a, b) {
  const left = new Set(a.map((sheet) => sheet.name.toLowerCase()));
  const right = new Set(b.map((sheet) => sheet.name.toLowerCase()));
  if (!left.size && !right.size) return 1;
  let shared = 0;
  left.forEach((name) => {
    if (right.has(name)) shared += 1;
  });
  return shared / (left.size + right.size - shared);
}

/* A filename cluster on its own is a guess — "Q3 report" and "Q4 report"
   normalise together but are different documents. Confirming against the
   sheet names is what turns "eleven files" into "one workbook, eleven
   copies", so a cluster that does not agree on its own structure is not
   reported. */
function findVersionClusters(records) {
  const groups = new Map();
  records.forEach((record) => {
    const key = versionKey(record.name);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  });

  const clusters = [];
  groups.forEach((members, key) => {
    if (members.length < 3) return;

    const reference = members.reduce((a, b) => (b.sheets.length > a.sheets.length ? b : a));
    const agreeing = members.filter((member) => sheetSimilarity(member.sheets, reference.sheets) >= 0.5);
    if (agreeing.length < 3) return;

    const sorted = agreeing.slice().sort((a, b) => b.modified - a.modified);
    const newest = sorted[0];

    clusters.push({
      key,
      members: sorted,
      newest,
      /* Copies frequently share a modified date. When they do there is no
         newest to point at, and saying otherwise would be picking one at
         random and calling it the current version. */
      datedNewest: Boolean(newest.modified) && sorted.every((m) => m === newest || m.modified < newest.modified),
    });
  });

  return clusters.sort((a, b) => b.members.length - a.members.length);
}

const TWO_YEARS = 1000 * 60 * 60 * 24 * 365 * 2;

/* Deliberately compares against the newest file in the scan rather than the
   clock: the reference point is the folder's own working life, and it keeps
   the analysis pure. */
function findStaleButDependedOn(records, inDegree) {
  const newest = records.reduce((max, record) => Math.max(max, record.modified), 0);
  if (!newest) return [];
  return records
    .filter((record) => inDegree.get(record.path) && record.modified && newest - record.modified > TWO_YEARS)
    .sort((a, b) => a.modified - b.modified);
}

/* ---------- layout ------------------------------------------------------- */

/* A deterministic starting position per node, so the same folder always
   draws the same picture. Math.random would make every render different
   and every screenshot unreproducible. */
function seed(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

/**
 * A small force-directed layout: repulsion between every pair, springs
 * along edges, and a pull toward the centre. Enough for the handful of
 * files that actually reference each other.
 */
/* Room for the label above a node and for a long filename either side. */
const MARGIN_TOP = 34;
const MARGIN_BOTTOM = 18;
const MARGIN_X = 56;

export function layoutGraph(nodes, edges, width = 720, height = 420, iterations = 320) {
  if (!nodes.length) return [];

  const points = nodes.map((node, index) => ({
    id: node.id,
    label: node.label,
    weight: node.weight || 1,
    x: width * (0.2 + 0.6 * seed(`${node.id}x`)),
    y: height * (0.2 + 0.6 * seed(`${node.id}y${index}`)),
    vx: 0,
    vy: 0,
  }));

  const index = new Map(points.map((point) => [point.id, point]));
  const links = edges.map((edge) => ({ a: index.get(edge.from), b: index.get(edge.to) })).filter((l) => l.a && l.b);

  const area = (width * height) / points.length;
  const k = Math.sqrt(area) * 0.6;

  for (let step = 0; step < iterations; step += 1) {
    const cooling = 1 - step / iterations;

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 0.01) {
          dx = (seed(a.id + b.id) - 0.5) * 2;
          dy = (seed(b.id + a.id) - 0.5) * 2;
          distance = 1;
        }
        const force = (k * k) / distance;
        a.vx += (dx / distance) * force;
        a.vy += (dy / distance) * force;
        b.vx -= (dx / distance) * force;
        b.vy -= (dy / distance) * force;
      }
    }

    links.forEach(({ a, b }) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.max(0.01, Math.sqrt(dx * dx + dy * dy));
      const force = (distance * distance) / k;
      a.vx -= (dx / distance) * force;
      a.vy -= (dy / distance) * force;
      b.vx += (dx / distance) * force;
      b.vy += (dy / distance) * force;
    });

    points.forEach((point) => {
      point.vx += (width / 2 - point.x) * 0.012;
      point.vy += (height / 2 - point.y) * 0.012;

      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
      const limit = Math.max(1, 24 * cooling);
      const scale = speed > limit ? limit / speed : 1;

      /* The margins hold the labels, not just the dots: a filename is drawn
         above its node and centred on it, so a node pushed to the edge would
         have its name clipped by the frame. */
      point.x = Math.min(width - MARGIN_X, Math.max(MARGIN_X, point.x + point.vx * scale * 0.08));
      point.y = Math.min(height - MARGIN_BOTTOM, Math.max(MARGIN_TOP, point.y + point.vy * scale * 0.08));
      point.vx = 0;
      point.vy = 0;
    });
  }

  return points.map(({ id, label, weight, x, y }) => ({
    id,
    label,
    weight,
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
  }));
}
