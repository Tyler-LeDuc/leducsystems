import {
  buildMap,
  versionKey,
  sheetSimilarity,
  layoutGraph,
  normalizePath,
  baseName,
  probeWorkbook,
  WORKBOOK_PATTERN,
} from './folderScan';
import { buildZip } from './buildTestWorkbook';

/* A probe record, with only the fields a given test cares about set. */
function file(path, extra = {}) {
  return {
    path,
    name: baseName(path),
    size: 1024,
    modified: 1_700_000_000_000,
    sheets: [],
    links: [],
    connections: [],
    hasMacros: false,
    macroBytes: 0,
    creator: '',
    lastModifiedBy: '',
    revision: '',
    ...extra,
  };
}

describe('paths', () => {
  it('normalises windows separators', () => {
    expect(normalizePath('Finance\\2026\\model.xlsx')).toBe('Finance/2026/model.xlsx');
    expect(baseName('Finance\\2026\\model.xlsx')).toBe('model.xlsx');
  });

  it('recognises the workbook extensions and nothing else', () => {
    expect(WORKBOOK_PATTERN.test('a.xlsx')).toBe(true);
    expect(WORKBOOK_PATTERN.test('a.xlsm')).toBe(true);
    expect(WORKBOOK_PATTERN.test('a.xls')).toBe(false);
    expect(WORKBOOK_PATTERN.test('a.csv')).toBe(false);
  });
});

describe('buildMap edges', () => {
  it('resolves a relative link to an exact path', () => {
    const map = buildMap([
      file('Finance/Q3/summary.xlsx', { links: ['../Rates/rates.xlsx'] }),
      file('Finance/Rates/rates.xlsx'),
    ]);

    expect(map.edges).toHaveLength(1);
    expect(map.edges[0]).toMatchObject({
      from: 'Finance/Q3/summary.xlsx',
      to: 'Finance/Rates/rates.xlsx',
      confidence: 'exact',
    });
    expect(map.outside).toHaveLength(0);
  });

  it('falls back to a filename match and says that is what it did', () => {
    const map = buildMap([
      file('Reports/summary.xlsx', { links: ['\\\\fileserver\\ops\\rates.xlsx'] }),
      file('Finance/Rates/rates.xlsx'),
    ]);

    expect(map.edges[0]).toMatchObject({ to: 'Finance/Rates/rates.xlsx', confidence: 'by name' });
  });

  it('refuses to guess when two files share a name', () => {
    const map = buildMap([
      file('Reports/summary.xlsx', { links: ['\\\\server\\rates.xlsx'] }),
      file('A/rates.xlsx'),
      file('B/rates.xlsx'),
    ]);

    expect(map.edges[0]).toMatchObject({ to: null, confidence: 'ambiguous' });
  });

  it('records a link to a file that is not in the folder', () => {
    const map = buildMap([file('Reports/summary.xlsx', { links: ['C:/Users/dh/Desktop/targets.xlsx'] })]);

    expect(map.edges).toHaveLength(0);
    expect(map.outside).toEqual([
      { from: 'Reports/summary.xlsx', target: 'C:/Users/dh/Desktop/targets.xlsx' },
    ]);
  });

  it('ranks the files everything else reads from', () => {
    const map = buildMap([
      file('rates.xlsx'),
      file('a.xlsx', { links: ['rates.xlsx'] }),
      file('b.xlsx', { links: ['rates.xlsx'] }),
      file('c.xlsx', { links: ['rates.xlsx'] }),
      file('d.xlsx', { links: ['a.xlsx'] }),
    ]);

    expect(map.dependedOn[0].record.path).toBe('rates.xlsx');
    expect(map.dependedOn[0].dependents).toBe(3);
    expect(map.counts.linked).toBe(4);
  });
});

describe('key-person and application risk', () => {
  it('flags a depended-on file only one person has ever saved', () => {
    const map = buildMap([
      file('rates.xlsx', { creator: 'D Halloran', lastModifiedBy: 'D Halloran' }),
      file('a.xlsx', { links: ['rates.xlsx'], creator: 'D Halloran', lastModifiedBy: 'R Okafor' }),
    ]);

    expect(map.oneAuthor.map((f) => f.path)).toEqual(['rates.xlsx']);
  });

  it('does not flag a single-author file nothing depends on', () => {
    const map = buildMap([file('scratch.xlsx', { creator: 'D Halloran', lastModifiedBy: 'D Halloran' })]);
    expect(map.oneAuthor).toHaveLength(0);
  });

  it('calls a macro workbook with a live connection an application', () => {
    const map = buildMap([
      file('tool.xlsm', { hasMacros: true, connections: [{ name: 'W', server: 'SQL01' }] }),
      file('plain.xlsx', { hasMacros: true }),
    ]);

    expect(map.applications.map((f) => f.path)).toEqual(['tool.xlsm']);
  });
});

describe('version sprawl', () => {
  it('strips the things people use instead of version control', () => {
    expect(versionKey('Margin Model v11.xlsx')).toBe('margin model');
    expect(versionKey('Copy of Margin Model FINAL.xlsx')).toBe('margin model');
    expect(versionKey('margin_model_2026-01-04.xlsx')).toBe('margin model');
    expect(versionKey('Margin Model (2).xlsx')).toBe('margin model');
  });

  it('groups copies that agree on their sheet names', () => {
    const sheets = [{ name: 'Input' }, { name: 'Calc' }, { name: 'Output' }];
    const map = buildMap([
      file('Margin Model v1.xlsx', { sheets, modified: 1 }),
      file('Margin Model v2.xlsx', { sheets, modified: 2 }),
      file('Copy of Margin Model FINAL.xlsx', { sheets, modified: 3 }),
    ]);

    expect(map.versions).toHaveLength(1);
    expect(map.versions[0].members).toHaveLength(3);
    expect(map.versions[0].newest.path).toBe('Copy of Margin Model FINAL.xlsx');
  });

  it('does not call unrelated files with similar names a version cluster', () => {
    /* Same normalised name, entirely different workbooks. Reporting these
       as copies of one another would be a confident guess about someone's
       filing that the sheet names flatly contradict. */
    const map = buildMap([
      file('Report v1.xlsx', { sheets: [{ name: 'Sales' }, { name: 'Notes' }] }),
      file('Report v2.xlsx', { sheets: [{ name: 'Payroll' }] }),
      file('Report v3.xlsx', { sheets: [{ name: 'Assets' }, { name: 'Depreciation' }] }),
    ]);

    expect(map.versions).toHaveLength(0);
  });

  it('needs three files before it calls anything sprawl', () => {
    const sheets = [{ name: 'A' }];
    const map = buildMap([file('Model v1.xlsx', { sheets }), file('Model v2.xlsx', { sheets })]);
    expect(map.versions).toHaveLength(0);
  });

  it('scores sheet-set overlap', () => {
    expect(sheetSimilarity([{ name: 'A' }], [{ name: 'A' }])).toBe(1);
    expect(sheetSimilarity([{ name: 'A' }], [{ name: 'B' }])).toBe(0);
    expect(sheetSimilarity([{ name: 'A' }, { name: 'B' }], [{ name: 'A' }])).toBeCloseTo(0.5);
  });
});

describe('stale but depended on', () => {
  it('measures age against the folder, not the clock', () => {
    const recent = 1_700_000_000_000;
    const old = recent - 1000 * 60 * 60 * 24 * 365 * 3;
    const map = buildMap([
      file('rates.xlsx', { modified: old }),
      file('live.xlsx', { links: ['rates.xlsx'], modified: recent }),
    ]);

    expect(map.stale.map((f) => f.path)).toEqual(['rates.xlsx']);
  });

  it('leaves an old file alone when nothing reads from it', () => {
    const recent = 1_700_000_000_000;
    const map = buildMap([
      file('archive.xlsx', { modified: recent - 1000 * 60 * 60 * 24 * 365 * 5 }),
      file('live.xlsx', { modified: recent }),
    ]);
    expect(map.stale).toHaveLength(0);
  });
});

describe('layoutGraph', () => {
  const nodes = [
    { id: 'a', label: 'a.xlsx', weight: 3 },
    { id: 'b', label: 'b.xlsx', weight: 1 },
    { id: 'c', label: 'c.xlsx', weight: 1 },
  ];
  const edges = [
    { from: 'b', to: 'a' },
    { from: 'c', to: 'a' },
  ];

  it('leaves room for the label above every node', () => {
    /* A node's filename is drawn above it and centred, so a node flush
       against the frame would have its label clipped. */
    layoutGraph(nodes, edges, 400, 300).forEach((point) => {
      expect(point.x).toBeGreaterThanOrEqual(40);
      expect(point.x).toBeLessThanOrEqual(360);
      expect(point.y).toBeGreaterThanOrEqual(30);
      expect(point.y).toBeLessThanOrEqual(285);
    });
  });

  it('is deterministic, so the same folder draws the same picture', () => {
    expect(layoutGraph(nodes, edges, 400, 300)).toEqual(layoutGraph(nodes, edges, 400, 300));
  });

  it('separates nodes rather than stacking them', () => {
    const [a, b] = layoutGraph(nodes, edges, 400, 300);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThan(10);
  });

  it('handles an empty graph', () => {
    expect(layoutGraph([], [])).toEqual([]);
  });
});

describe('probeWorkbook', () => {
  /* A Blob standing in for a File; jsdom's File lacks slice()/arrayBuffer()
     plumbing but Blob has both. */
  function asFile(bytes, name, lastModified = 1_700_000_000_000) {
    const blob = new Blob([bytes]);
    blob.name = name;
    blob.lastModified = lastModified;
    return blob;
  }

  const WORKBOOK = `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="Input" sheetId="1"/><sheet name="Hidden" sheetId="2" state="hidden"/></sheets></workbook>`;
  const RELS = `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Target="..%2FRates%2Frates.xlsx" TargetMode="External"/></Relationships>`;
  const CORE = `<?xml version="1.0"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator>D Halloran</dc:creator><cp:lastModifiedBy>D Halloran</cp:lastModifiedBy><cp:revision>42</cp:revision></cp:coreProperties>`;
  const CONNECTIONS = `<?xml version="1.0"?><connections xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><connection id="1" name="W"><dbPr connection="Provider=SQLOLEDB;Data Source=SQL01;Initial Catalog=Billing"/></connection><connection id="2" name="PQ"><dbPr connection="Provider=Microsoft.Mashup.OleDb.1;Data Source=$Workbook$"/></connection></connections>`;

  it('reads the four parts out of a real package without loading the file', async () => {
    const bytes = buildZip([
      { name: 'xl/workbook.xml', data: WORKBOOK },
      { name: 'xl/externalLinks/_rels/externalLink1.xml.rels', data: RELS },
      { name: 'xl/connections.xml', data: CONNECTIONS },
      { name: 'docProps/core.xml', data: CORE },
      /* Bulk that must never be read: the probe should ignore it. */
      { name: 'xl/worksheets/sheet1.xml', data: 'x'.repeat(400000) },
    ]);

    const record = await probeWorkbook(asFile(bytes, 'summary.xlsx'), 'Finance/Q3/summary.xlsx');

    expect(record.path).toBe('Finance/Q3/summary.xlsx');
    expect(record.sheets).toHaveLength(2);
    expect(record.links).toEqual(['../Rates/rates.xlsx']);
    expect(record.creator).toBe('D Halloran');
    expect(record.revision).toBe('42');
    /* The Power Query connection points at the file itself and is dropped. */
    expect(record.connections).toEqual([{ name: 'W', server: 'SQL01' }]);
    expect(record.hasMacros).toBe(false);
  });

  it('returns null for something that is not a workbook', async () => {
    const bytes = buildZip([{ name: 'notes.txt', data: 'hello' }]);
    await expect(probeWorkbook(asFile(bytes, 'notes.zip'), 'notes.zip')).resolves.toBeNull();
  });

  it('returns null rather than throwing on rubbish', async () => {
    await expect(probeWorkbook(asFile(new Uint8Array([1, 2, 3]), 'x.xlsx'), 'x.xlsx')).resolves.toBeNull();
  });
});

describe('version cluster dating', () => {
  const sheets = [{ name: 'Input' }, { name: 'Calc' }];

  it('names a newest when one file really is newer', () => {
    const map = buildMap([
      file('Model v1.xlsx', { sheets, modified: 1 }),
      file('Model v2.xlsx', { sheets, modified: 2 }),
      file('Model v3.xlsx', { sheets, modified: 3 }),
    ]);

    expect(map.versions[0].datedNewest).toBe(true);
    expect(map.versions[0].newest.path).toBe('Model v3.xlsx');
  });

  it('refuses to pick a newest when the copies share a timestamp', () => {
    /* Copied files routinely carry the same modified date. Choosing one and
       calling it current would be a guess dressed as a fact. */
    const map = buildMap([
      file('Model v1.xlsx', { sheets, modified: 5 }),
      file('Model v2.xlsx', { sheets, modified: 5 }),
      file('Model v3.xlsx', { sheets, modified: 5 }),
    ]);

    expect(map.versions[0].datedNewest).toBe(false);
  });
});
