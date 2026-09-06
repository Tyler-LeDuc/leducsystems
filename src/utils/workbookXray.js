/* =========================================================================
   Workbook X-ray.

   Takes the bytes of an .xlsx / .xlsm and reports what is running inside
   it: macros and what they reach, database connections, Power Query
   sources, links out to other people's machines, sheets that cannot be
   unhidden from the menu, and who last touched it.

   None of this is visible from Excel's own interface without knowing
   where to look, which is the point. A workbook that connects to a
   database and runs four thousand lines of code on open is a piece of
   software. It is worth being able to see that before the person who
   wrote it leaves.

   Everything here is pure and runs in the page. No upload, no server.
   ========================================================================= */

import { openZip, decodeUtf8 } from './zipReader';
import { readCompoundFile, isCompoundFile } from './compoundFile';
import { extractModules, scanSource } from './vbaProject';

export const MAX_BYTES = 80 * 1024 * 1024;

/* ---------- small XML helpers ------------------------------------------ */

function parseXml(text) {
  if (!text) return null;
  try {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    return doc.getElementsByTagName('parsererror').length ? null : doc;
  } catch (err) {
    return null;
  }
}

/* OOXML parts are namespaced inconsistently between producers, so tags are
   matched on local name rather than by prefix. */
function tags(doc, localName) {
  if (!doc) return [];
  return [...doc.getElementsByTagName('*')].filter((node) => node.localName === localName);
}

const attr = (node, name) => (node && node.getAttribute ? node.getAttribute(name) : null);

/* ---------- individual readers ------------------------------------------ */

function readSheets(doc) {
  return tags(doc, 'sheet').map((node) => ({
    name: attr(node, 'name') || '(unnamed)',
    state: attr(node, 'state') || 'visible',
  }));
}

function readDefinedNames(doc) {
  return tags(doc, 'definedName').map((node) => ({
    name: attr(node, 'name') || '(unnamed)',
    hidden: attr(node, 'hidden') === '1',
    formula: (node.textContent || '').trim(),
  }));
}

/* Connection strings are semicolon-delimited key=value. Only the keys that
   name a system are pulled out; the rest is deliberately not surfaced,
   because a connection string is exactly the kind of thing that should not
   be echoed onto a page in full. */
function describeConnectionString(value) {
  const out = {};
  String(value || '')
    .split(';')
    .forEach((pair) => {
      const at = pair.indexOf('=');
      if (at < 0) return;
      const key = pair.slice(0, at).trim().toLowerCase();
      const val = pair.slice(at + 1).trim();
      if (key === 'data source' || key === 'server' || key === 'dsn') out.server = val;
      else if (key === 'initial catalog' || key === 'database') out.database = val;
      else if (key === 'provider' || key === 'driver') out.provider = val;
      else if (key === 'uid' || key === 'user id') out.user = val;
    });
  return out;
}

/* Loading a Power Query or a data model to a sheet writes a connection
   whose "server" is $Workbook$ or the Mashup provider — that is the file
   itself, not an outside system. Reporting those as an external dependency
   is simply wrong, and it is what the Power Query section already covers. */
function isInternalConnection(connection) {
  const provider = (connection.provider || '').toLowerCase();
  const server = (connection.server || '').toLowerCase();
  return (
    provider.includes('mashup') ||
    server === '$workbook$' ||
    server === '$embedded$' ||
    connection.command === 'Model'
  );
}

function readConnections(doc) {
  return tags(doc, 'connection')
    .map((node) => {
      const db = [...node.children].find((child) => child.localName === 'dbPr');
      const connectionString = attr(db, 'connection') || '';
      return {
        name: attr(node, 'name') || '(unnamed)',
        description: attr(node, 'description') || '',
        refreshOnLoad: attr(node, 'refreshOnLoad') === '1',
        savePassword: attr(node, 'savePassword') === '1',
        command: (attr(db, 'command') || '').trim(),
        ...describeConnectionString(connectionString),
      };
    })
    .filter((connection) => !isInternalConnection(connection));
}

/* Power Query lives base64-encoded inside a custom XML part: a small
   header, then a whole second ZIP holding the M source. */
function decodeBase64(text) {
  const clean = String(text || '').replace(/\s+/g, '');
  try {
    const binary = atob(clean);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
    return out;
  } catch (err) {
    return null;
  }
}

const M_SOURCES = [
  { pattern: /Sql\.Databases?\s*\(/g, label: 'SQL Server' },
  { pattern: /Odbc\.(DataSource|Query)\s*\(/g, label: 'ODBC' },
  { pattern: /OleDb\.DataSource\s*\(/g, label: 'OLE DB' },
  { pattern: /Oracle\.Database\s*\(/g, label: 'Oracle' },
  { pattern: /PostgreSQL\.Database\s*\(/g, label: 'PostgreSQL' },
  { pattern: /MySQL\.Database\s*\(/g, label: 'MySQL' },
  { pattern: /Access\.Database\s*\(/g, label: 'Access' },
  { pattern: /Web\.(Contents|Page)\s*\(/g, label: 'a web request' },
  { pattern: /SharePoint\.(Files|Tables|Contents)\s*\(/g, label: 'SharePoint' },
  { pattern: /Folder\.(Files|Contents)\s*\(/g, label: 'a folder on disk' },
  { pattern: /Excel\.Workbook\s*\(/g, label: 'another workbook' },
  { pattern: /Csv\.Document\s*\(/g, label: 'a CSV file' },
];

const MAX_M_CHARS = 2 * 1024 * 1024;

function readMashup(source) {
  /* `^[ \t]*` rather than `^\s*`: under the m flag \s matches newlines, so
     a near miss backtracks over every blank line before it. And the M text
     is capped, because several passes run over it. */
  const text = String(source).slice(0, MAX_M_CHARS);

  const queries = [...text.matchAll(/^[ \t]*shared[ \t]+#?"?([^"=\r\n]+?)"?[ \t]*=/gm)].map((m) =>
    m[1].trim()
  );

  const sources = M_SOURCES.filter(({ pattern }) => {
    pattern.lastIndex = 0;
    const found = pattern.test(text);
    pattern.lastIndex = 0;
    return found;
  }).map(({ label }) => label);

  const paths = [...text.matchAll(/"((?:[A-Za-z]:\\|\\\\)[^"\n]{2,120})"/g)].map((m) => m[1]);

  return { queries, sources, paths: [...new Set(paths)] };
}

async function readPowerQuery(zip) {
  const customXml = zip.names().filter((name) => /^customXml\/item\d*\.xml$/i.test(name));

  for (let i = 0; i < customXml.length; i += 1) {
    /* eslint-disable-next-line no-await-in-loop */
    const text = await zip.text(customXml[i]);
    if (!text || !/DataMashup/i.test(text)) continue;

    const doc = parseXml(text);
    const node = doc ? tags(doc, 'DataMashup')[0] : null;
    const payload = decodeBase64(node ? node.textContent : '');
    if (!payload || payload.length < 16) continue;

    /* version (4 bytes), package length (4 bytes), then the inner zip. */
    const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
    const length = view.getUint32(4, true);
    if (length <= 0 || 8 + length > payload.length) continue;

    const inner = openZip(payload.subarray(8, 8 + length));
    const section = inner.names().find((name) => /Section1\.m$/i.test(name));
    if (!section) continue;

    /* eslint-disable-next-line no-await-in-loop */
    const mBytes = await inner.bytes(section);
    if (mBytes) return readMashup(decodeUtf8(mBytes));
  }

  return null;
}

async function readExternalLinks(zip) {
  const rels = zip.names().filter((name) => /^xl\/externalLinks\/_rels\//i.test(name));
  const targets = [];

  for (let i = 0; i < rels.length; i += 1) {
    /* eslint-disable-next-line no-await-in-loop */
    const doc = parseXml(await zip.text(rels[i]));
    tags(doc, 'Relationship').forEach((node) => {
      const target = attr(node, 'Target');
      if (!target) return;
      /* A literal % in a filename ("Q1 100% margin.xlsx") makes this throw.
         The raw target is still perfectly readable, so a decode failure
         must not cost the entire report. */
      try {
        targets.push(decodeURIComponent(target));
      } catch (err) {
        targets.push(target);
      }
    });
  }

  return targets;
}

/* Excel writes external-link targets in several shapes for the same thing:
   a UNC path may arrive bare, wrapped in a file: URL, or with the slashes
   already flipped. Each case is matched explicitly rather than inferred
   from what the previous test failed to match. */
function classifyTarget(target) {
  const value = String(target || '');

  if (/^https?:/i.test(value)) return 'a web address';

  /* UNC first: file:///\\server\share and file://server/share are both
     network shares even though one has the local-drive prefix. */
  if (/^\\\\[^\\]/.test(value) || /^file:\/{2,3}\\\\/i.test(value) || /^file:\/\/[^/\\]/i.test(value)) {
    return 'a network share';
  }

  if (/^file:\/\/\/[A-Za-z]:/i.test(value) || /^[A-Za-z]:[\\/]/.test(value)) return 'a local drive';

  return 'another workbook';
}

function readDocProps(coreDoc, appDoc) {
  const text = (doc, name) => {
    const node = tags(doc, name)[0];
    return node ? (node.textContent || '').trim() : '';
  };

  return {
    creator: text(coreDoc, 'creator'),
    lastModifiedBy: text(coreDoc, 'lastModifiedBy'),
    created: text(coreDoc, 'created'),
    modified: text(coreDoc, 'modified'),
    revision: text(coreDoc, 'revision'),
    company: text(appDoc, 'Company'),
    application: text(appDoc, 'Application'),
    editingMinutes: Number(text(appDoc, 'TotalTime')) || 0,
  };
}

/* ---------- findings ---------------------------------------------------- */

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

function buildFindings(report) {
  const findings = [];
  const add = (level, where, message) => findings.push({ level, where, message });

  const { vba, connections, powerQuery, links, sheets, definedNames, props } = report;

  if (vba) {
    if (vba.unreadable) {
      add(
        'warn',
        'VBA project',
        'This workbook contains a VBA project that could not be decoded here. There is code in this file; this tool cannot tell you what it does.'
      );
    }

    if (vba.locked) {
      const recovered = vba.modules.some((module) => module.recovered);
      add(
        'warn',
        'VBA project',
        recovered
          ? 'The project is locked for viewing in the editor. That lock is not encryption — the source was read out of this file without the password, and anyone with the file can do the same.'
          : 'The project is locked for viewing in the editor.'
      );
    }

    const withCode = vba.scan.modulesWithCode;
    const moduleWord = plural(withCode, 'module');

    if (vba.scan.codeLines >= 500) {
      add(
        'error',
        'VBA project',
        `${vba.scan.codeLines.toLocaleString()} lines of code across ${moduleWord}. That is an application living in a file format with no version control, no tests, and no review.`
      );
    } else if (vba.scan.codeLines > 0) {
      add('info', 'VBA project', `${vba.scan.codeLines.toLocaleString()} lines of code across ${moduleWord}.`);
    }

    vba.scan.behaviours.forEach((behaviour) => {
      add(behaviour.level, 'VBA project', `${behaviour.label}. ${behaviour.detail}`);
    });

    if (vba.scan.credentialCount) {
      add(
        'error',
        'VBA project',
        `${vba.scan.credentialCount} hard-coded credential${vba.scan.credentialCount === 1 ? '' : 's'} in the source. Anyone who has the file has them.`
      );
    }

    if (vba.scan.paths.length) {
      add(
        'error',
        'VBA project',
        `${vba.scan.paths.length} hard-coded path${vba.scan.paths.length === 1 ? '' : 's'}, including ${vba.scan.paths[0]}. The code only runs where that path exists.`
      );
    }

    if (vba.scan.errorSuppressions >= 5) {
      add(
        'warn',
        'VBA project',
        `On Error Resume Next appears ${vba.scan.errorSuppressions} times. Failures here are silent, so wrong numbers look exactly like right ones.`
      );
    }

    if (vba.scan.sourceTruncated) {
      add(
        'info',
        'VBA project',
        `Only the first ${Math.round(vba.scan.scannedChars / 1024 / 1024)}MB of source was scanned. The line counts cover everything; what the code reaches may be incomplete.`
      );
    }

    const unreadable = vba.modules.filter((module) => !module.recovered && module.streamBytes > 0);
    if (unreadable.length) {
      add(
        'info',
        'VBA project',
        `${unreadable.length} module${unreadable.length === 1 ? '' : 's'} could not be decoded and are reported by name only.`
      );
    }
  }

  connections.forEach((connection) => {
    const where = connection.server || connection.provider || 'an external system';
    add(
      'error',
      `Connection: ${connection.name}`,
      `Pulls from ${where}${connection.database ? ` (${connection.database})` : ''}${connection.refreshOnLoad ? ' and refreshes every time the file opens' : ''}. Whoever opens this file needs that access.`
    );
    if (connection.savePassword) {
      add(
        'error',
        `Connection: ${connection.name}`,
        'The password is saved in the workbook. It travels with every copy of the file.'
      );
    }
  });

  if (powerQuery) {
    if (powerQuery.queries.length) {
      add(
        'warn',
        'Power Query',
        `${powerQuery.queries.length} quer${powerQuery.queries.length === 1 ? 'y' : 'ies'} — ${powerQuery.queries.slice(0, 4).join(', ')}${powerQuery.queries.length > 4 ? '…' : ''}. This is a data pipeline that runs on one person's desktop.`
      );
    }
    if (powerQuery.sources.length) {
      add('warn', 'Power Query', `Reads from ${powerQuery.sources.join(', ')}.`);
    }
    powerQuery.paths.slice(0, 1).forEach((path) => {
      add('error', 'Power Query', `Sourced from ${path} — a path, not a system. It breaks when that machine does.`);
    });
  }

  links.forEach((link) => {
    const kind = classifyTarget(link.target);
    const level = kind === 'a local drive' ? 'error' : 'warn';
    add(
      level,
      'External link',
      `Reads from ${kind}: ${link.target}. ${
        kind === 'a local drive'
          ? 'That path only exists on one computer.'
          : 'The number in this workbook is only as current as that file.'
      }`
    );
  });

  const veryHidden = sheets.filter((sheet) => sheet.state === 'veryHidden');
  if (veryHidden.length) {
    const one = veryHidden.length === 1;
    add(
      'warn',
      'Sheets',
      `${plural(veryHidden.length, 'sheet')} marked very hidden (${veryHidden
        .map((sheet) => sheet.name)
        .join(', ')}). ${one ? 'It cannot' : 'These cannot'} be unhidden from the menu — only from code.`
    );
  }

  const hidden = sheets.filter((sheet) => sheet.state === 'hidden');
  if (hidden.length) {
    add('info', 'Sheets', `${plural(hidden.length, 'hidden sheet')}.`);
  }

  const broken = definedNames.filter((name) => /#REF!/.test(name.formula));
  if (broken.length) {
    const one = broken.length === 1;
    add(
      'error',
      'Named ranges',
      `${plural(broken.length, 'named range')} ${one ? 'points' : 'point'} at #REF!. Something ${
        one ? 'it depended' : 'they depended'
      } on was deleted.`
    );
  }

  /* Stated as what the file records, not as what it implies. The document
     properties carry two names; they cannot tell you who has opened,
     edited, or maintained the workbook. */
  if (props.creator && props.lastModifiedBy && props.creator === props.lastModifiedBy) {
    add(
      'warn',
      'Authorship',
      `Created and last saved by the same name (${props.lastModifiedBy}). No second name appears anywhere in the file's properties.`
    );
  }

  return findings;
}

/* The verdict is one sentence derived from what was actually found. It
   asserts nothing about the business — only about the file it just read. */
function verdict(report, findings) {
  const codeLines = report.vba ? report.vba.scan.codeLines : 0;

  /* A Power Query with no source this tool recognises is still a pipeline
     reaching out of the file. Counting only recognised source kinds let the
     headline say "no connections" directly above a rendered query panel. */
  const systems =
    report.connections.length +
    (report.powerQuery ? Math.max(report.powerQuery.sources.length, report.powerQuery.queries.length ? 1 : 0) : 0) +
    report.links.length;

  if (codeLines >= 500 || (codeLines > 0 && systems > 0)) {
    return {
      title: 'This is an application.',
      body: 'It runs code, it reaches other systems, and it is stored as a document. Replacing it is a software project, not a spreadsheet clean-up.',
    };
  }
  if (codeLines > 0 || systems > 0) {
    return {
      title: 'This is a spreadsheet with software in it.',
      body: 'Small enough to still be understood, large enough that losing the person who wrote it would hurt.',
    };
  }

  /* Three different things get confused here if the branch is written as
     "there is a vba key on the report", so each is stated separately: the
     decode failed, or it succeeded and found an empty shell. Reporting a
     successful decode as a failure is the tool lying about its own work. */
  if (report.vba && report.vba.unreadable) {
    return {
      title: 'There is code in here.',
      body: 'This workbook carries a VBA project. This tool could not decode it, so what the code does is not something it can tell you.',
    };
  }

  if (report.vba) {
    return {
      title: 'A macro project with nothing in it.',
      body: 'The workbook is macro-enabled and carries a VBA project, but no module in it contains code — the usual sign of a file that was saved as .xlsm once and never used as one.',
    };
  }

  /* "Nothing is load-bearing" cannot stand over a page showing load-bearing
     findings, so the quiet verdict is gated on the findings themselves. */
  const structural = findings.filter((finding) => finding.level !== 'info');
  if (structural.length) {
    return {
      title: 'No code, but this file is not tidy.',
      body: 'No macros and nothing reaching outside the file — but the structure below is carrying problems worth reading.',
    };
  }

  return {
    title: 'This one is just a spreadsheet.',
    body: 'No macros, no connections, no external links. Nothing here is load-bearing in a way you cannot see.',
  };
}

/* ---------- entry point -------------------------------------------------- */

/**
 * Analyse a workbook. Rejections are returned as `{ error }` rather than
 * thrown so the page can say something useful about a file it cannot read.
 */
export async function xrayWorkbook(bytes) {
  if (!bytes || !bytes.length) return { error: 'That file is empty.' };
  if (bytes.length > MAX_BYTES) {
    return { error: 'That file is over 80MB, which is more than a browser tab should hold. Send it over instead.' };
  }

  if (isCompoundFile(bytes)) {
    return {
      error:
        'That is the old binary Excel format (.xls) or another Office document. Open it in Excel and save a copy as .xlsx or .xlsm first.',
    };
  }

  const zip = openZip(bytes);
  if (!zip.entries.length) return { error: 'That does not look like a workbook. Expected .xlsx or .xlsm.' };
  if (!zip.has('xl/workbook.xml')) {
    return { error: 'That is a ZIP, but not an Excel workbook — xl/workbook.xml is missing.' };
  }

  /* A null here means the part could not be inflated — a corrupt entry, or
     one whose declared size does not match its contents. Parsing on would
     report zero sheets and zero names, and the verdict would then hand the
     reader a clean bill of health for a file this tool never read. */
  const workbookXml = await zip.text('xl/workbook.xml');
  if (workbookXml == null) {
    return {
      error:
        'The main workbook part could not be read — it is corrupt, or it declares a size that does not match its contents.',
    };
  }

  const workbookDoc = parseXml(workbookXml);
  const connectionsDoc = zip.has('xl/connections.xml') ? parseXml(await zip.text('xl/connections.xml')) : null;
  const coreDoc = zip.has('docProps/core.xml') ? parseXml(await zip.text('docProps/core.xml')) : null;
  const appDoc = zip.has('docProps/app.xml') ? parseXml(await zip.text('docProps/app.xml')) : null;

  const linkTargets = await readExternalLinks(zip);
  const powerQuery = await readPowerQuery(zip);

  /* --- the VBA project --- */
  let vba = null;
  const vbaEntry = zip.entry('xl/vbaProject.bin');
  if (vbaEntry) {
    const vbaBytes = await zip.bytes('xl/vbaProject.bin');

    /* A malformed container costs the VBA section, never the whole report.
       Everything above this point has already been read successfully. */
    let extracted = null;
    try {
      const container = vbaBytes ? readCompoundFile(vbaBytes) : null;
      extracted = container ? extractModules(container) : null;
    } catch (err) {
      extracted = null;
    }

    if (extracted) {
      vba = {
        ...extracted,
        containerBytes: vbaBytes.length,
        scan: scanSource(extracted.modules),
      };
    } else {
      vba = {
        declared: 0,
        modules: [],
        locked: false,
        containerBytes: vbaBytes ? vbaBytes.length : vbaEntry.uncompressedSize,
        scan: {
          behaviours: [],
          paths: [],
          credentialCount: 0,
          procedures: 0,
          errorSuppressions: 0,
          totalLines: 0,
          codeLines: 0,
          modulesWithCode: 0,
        },
        unreadable: true,
      };
    }
  }

  const report = {
    sheets: readSheets(workbookDoc),
    definedNames: readDefinedNames(workbookDoc),
    connections: connectionsDoc ? readConnections(connectionsDoc) : [],
    powerQuery,
    links: linkTargets.map((target) => ({ target, kind: classifyTarget(target) })),
    props: readDocProps(coreDoc, appDoc),
    vba,
    partCount: zip.entries.length,
  };

  report.findings = buildFindings(report);
  report.verdict = verdict(report, report.findings);

  return report;
}
