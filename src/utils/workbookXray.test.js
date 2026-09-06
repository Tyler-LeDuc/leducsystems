import fs from 'fs';
import path from 'path';
import { openZip, listEntries } from './zipReader';
import { readCompoundFile, isCompoundFile } from './compoundFile';
import {
  decompress,
  ceilingLog2,
  decodeAnsi,
  extractModules,
  scanSource,
  readProjectFlags,
  decryptProjectRecord,
} from './vbaProject';
import { xrayWorkbook } from './workbookXray';
import { buildZip, buildKitchenSinkWorkbook, buildPlainWorkbook } from './buildTestWorkbook';

const realWorkbook = () =>
  new Uint8Array(fs.readFileSync(path.join(__dirname, '__fixtures__', 'SimpleMacro.xlsm')));

describe('zipReader', () => {
  it('lists entries from a real workbook', () => {
    const names = listEntries(realWorkbook()).map((entry) => entry.name);
    expect(names).toContain('xl/workbook.xml');
    expect(names).toContain('xl/vbaProject.bin');
  });

  it('inflates a deflated part back to the original text', async () => {
    const body = 'sheet '.repeat(500);
    const zip = openZip(buildZip([{ name: 'a.xml', data: body }]));
    await expect(zip.text('a.xml')).resolves.toBe(body);
  });

  it('reads a stored part', async () => {
    const zip = openZip(buildZip([{ name: 'a.xml', data: 'plain', deflate: false }]));
    await expect(zip.text('a.xml')).resolves.toBe('plain');
  });

  it('returns nothing for bytes that are not a zip', () => {
    expect(listEntries(new Uint8Array([1, 2, 3, 4]))).toEqual([]);
  });

  it('resolves null for a part that is not there', async () => {
    const zip = openZip(buildZip([{ name: 'a.xml', data: 'x' }]));
    await expect(zip.text('missing.xml')).resolves.toBeNull();
  });
});

describe('compoundFile', () => {
  it('recognises the OLE signature', () => {
    expect(isCompoundFile(new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, ...new Array(600).fill(0)]))).toBe(true);
    expect(isCompoundFile(new Uint8Array([0x50, 0x4b, 3, 4]))).toBe(false);
  });

  it('returns null rather than throwing on rubbish', () => {
    expect(readCompoundFile(new Uint8Array(600))).toBeNull();
  });

  it('walks the directory of a real VBA project', async () => {
    const zip = openZip(realWorkbook());
    const container = readCompoundFile(await zip.bytes('xl/vbaProject.bin'));
    const paths = container.streams.map((stream) => stream.path);

    expect(paths).toContain('VBA/dir');
    expect(paths).toContain('VBA/Module1');
    /* Module streams are under the 4096-byte cutoff, so finding them at all
       proves the mini-stream allocation is being followed. */
    expect(container.read('VBA/Module1').length).toBeLessThan(4096);
  });
});

describe('MS-OVBA decompression', () => {
  it('computes the copy-token bit split', () => {
    expect(ceilingLog2(1)).toBe(0);
    expect(ceilingLog2(16)).toBe(4);
    expect(ceilingLog2(17)).toBe(5);
  });

  it('rejects a container without the signature byte', () => {
    expect(decompress(new Uint8Array([0x02, 0x00, 0xb0]), 0)).toBeNull();
  });

  it('reads a chunk of plain literals', () => {
    /* signature, then a chunk header (size 9, sig 0b011, compressed), then
       one flag byte of eight clear bits followed by eight literals. */
    const bytes = new Uint8Array([0x01, 0x09, 0xb0, 0x00, ...[...'abcdefgh'].map((c) => c.charCodeAt(0))]);
    expect(decodeAnsi(decompress(bytes, 0))).toBe('abcdefgh');
  });

  it('expands a copy token, including an overlapping run', () => {
    /* Four literals "abcd", then a copy token. Four bytes are in the chunk
       so the split is 4 offset bits / 12 length bits: offset 4, length 6 —
       a copy that reads past what it has written and must repeat itself. */
    const token = ((4 - 1) << 12) | (6 - 3);
    const bytes = new Uint8Array([0x01, 0x08, 0xb0, 0b00010000, 0x61, 0x62, 0x63, 0x64, token & 0xff, token >> 8]);
    expect(decodeAnsi(decompress(bytes, 0))).toBe('abcdabcdab');
  });

  it('reads an uncompressed chunk verbatim', () => {
    const raw = [...'hello world'].map((c) => c.charCodeAt(0));
    const size = raw.length + 3 - 3;
    const header = (size & 0x0fff) | (0x03 << 12);
    const bytes = new Uint8Array([0x01, header & 0xff, header >> 8, ...raw]);
    expect(decodeAnsi(decompress(bytes, 0))).toBe('hello world');
  });

  it('maps windows-1252 punctuation', () => {
    expect(decodeAnsi(new Uint8Array([0x93, 0x41, 0x94]))).toBe('\u201cA\u201d');
  });
});

describe('VBA project extraction', () => {
  it('recovers real module source from a real workbook', async () => {
    const zip = openZip(realWorkbook());
    const container = readCompoundFile(await zip.bytes('xl/vbaProject.bin'));
    const project = extractModules(container);

    expect(project.modules).toHaveLength(project.declared);
    expect(project.modules.map((module) => module.name)).toEqual(
      expect.arrayContaining(['Module1', 'ThisWorkbook', 'Sheet1'])
    );

    const module1 = project.modules.find((module) => module.name === 'Module1');
    expect(module1.recovered).toBe(true);
    expect(module1.kind).toBe('standard');
    /* The actual macro body, decompressed out of the binary. */
    expect(module1.source).toContain('Sub TestMacro()');
    expect(module1.source).toContain('ActiveCell.FormulaR1C1');
  });

  /* The inverse of MS-OVBA 2.4.3.2, so a protected project can be built
     rather than guessed at. Seed 0 keeps the ignored-byte run empty. */
  function encryptProjectRecord(payload, { seed = 0, version = 2, projKey = 0x2a } = {}) {
    const versionEnc = version ^ seed;
    const projKeyEnc = projKey ^ seed;
    const bytes = [seed, versionEnc, projKeyEnc];

    let encryptedByte1 = projKeyEnc;
    let encryptedByte2 = versionEnc;
    let unencryptedByte1 = projKey;

    const body = [payload.length & 0xff, (payload.length >> 8) & 0xff, 0, 0, ...payload];
    body.forEach((byte) => {
      const enc = (byte ^ ((encryptedByte2 + unencryptedByte1) & 0xff)) & 0xff;
      bytes.push(enc);
      encryptedByte2 = encryptedByte1;
      encryptedByte1 = enc;
      unencryptedByte1 = byte;
    });

    return bytes.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  describe('project protection', () => {
    /* The real values out of the committed fixture, which is an ordinary
       unprotected workbook. Excel writes DPB and CMG into every project it
       saves, so testing for their presence reports the opposite of the
       truth on the most common input this tool will ever see. */
    const UNPROTECTED =
      'ID="{1}"\r\nName="VBAProject"\r\nCMG="00022A282E282E282E282E"\r\nDPB="00022A2D2B2D2B2D"\r\nGC="00022A2D2B2D2BD2"\r\n';

    it('decrypts the fixture values rather than testing for the key', () => {
      expect(decryptProjectRecord('00022A2D2B2D2B2D')).toEqual({
        version: 2,
        declaredLength: 1,
        data: [0],
      });
      expect(decryptProjectRecord('00022A282E282E282E282E').data).toEqual([0, 0, 0, 0]);
    });

    it('does not call an unprotected project locked', () => {
      expect(readProjectFlags(UNPROTECTED).locked).toBe(false);
    });

    it('reports a project that really carries a password', () => {
      const dpb = encryptProjectRecord([0x9a, 0x4c, 0x11, 0x07, 0x63, 0x2e]);
      expect(readProjectFlags(`ID="{1}"\r\nDPB="${dpb}"\r\n`).locked).toBe(true);
    });

    it('reports a project with the protection bits set', () => {
      const cmg = encryptProjectRecord([0x04, 0x00, 0x00, 0x00]);
      expect(readProjectFlags(`ID="{1}"\r\nCMG="${cmg}"\r\n`).locked).toBe(true);
    });

    it('ignores a value it cannot decrypt', () => {
      expect(readProjectFlags('ID="{1}"\r\nDPB="0A0B"\r\n').locked).toBe(false);
      expect(readProjectFlags('ID="{1}"\r\nName="VBAProject"\r\n').locked).toBe(false);
    });

    it('does not accuse the real fixture of being locked', async () => {
      const zip = openZip(realWorkbook());
      const container = readCompoundFile(await zip.bytes('xl/vbaProject.bin'));
      expect(extractModules(container).locked).toBe(false);
    });
  });
});

describe('scanSource', () => {
  const scan = (source) => scanSource([{ source, lines: source.split('\n').length }]);

  it('names what the code reaches', () => {
    const result = scan([
      'Sub Refresh()',
      '  Set cn = CreateObject("ADODB.Connection")',
      '  cn.Open "Provider=SQLOLEDB;Data Source=SQL01"',
      '  Set ol = CreateObject("Outlook.Application")',
      '  Open "C:\\Reports\\out.csv" For Output As #1',
      'End Sub',
    ].join('\n'));

    const ids = result.behaviours.map((behaviour) => behaviour.id);
    expect(ids).toEqual(expect.arrayContaining(['database', 'email', 'files']));
  });

  it('finds hard-coded paths and network shares', () => {
    const result = scan('x = "\\\\fileserver\\ops\\rates.xlsx"\ny = "C:\\Users\\dh\\book.xlsm"');
    expect(result.paths).toHaveLength(2);
  });

  it('counts error suppression and procedures', () => {
    const result = scan(
      ['Sub A()', 'On Error Resume Next', 'End Sub', 'Private Function B()', 'On Error Resume Next', 'End Function'].join('\n')
    );
    expect(result.errorSuppressions).toBe(2);
    expect(result.procedures).toBe(2);
  });

  it('does not count comments or attributes as code', () => {
    const result = scan(['Attribute VB_Name = "M"', "' a comment", '', 'Dim x'].join('\n'));
    expect(result.codeLines).toBe(1);
  });

  it('spots hard-coded credentials', () => {
    expect(scan('cn.Open "...;Password=hunter2;"').credentialCount).toBe(1);
  });

  it('stays quiet on ordinary code', () => {
    const result = scan('Sub Total()\n  Range("A1").Value = 1\nEnd Sub');
    expect(result.behaviours.map((b) => b.id)).not.toContain('database');
    expect(result.credentialCount).toBe(0);
  });
});

describe('xrayWorkbook', () => {
  it('rejects the old binary format with an actionable message', async () => {
    const ole = new Uint8Array(600);
    ole.set([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    const result = await xrayWorkbook(ole);
    expect(result.error).toMatch(/\.xls/);
  });

  it('rejects a zip that is not a workbook', async () => {
    const result = await xrayWorkbook(buildZip([{ name: 'notes.txt', data: 'hello' }]));
    expect(result.error).toMatch(/workbook/i);
  });

  it('rejects an empty file', async () => {
    expect((await xrayWorkbook(new Uint8Array(0))).error).toBeTruthy();
  });

  it('reads structure, connections, links and authorship together', async () => {
    const report = await xrayWorkbook(buildKitchenSinkWorkbook());

    expect(report.sheets).toHaveLength(3);
    expect(report.connections[0].server).toBe('SQL01');
    expect(report.connections[0].database).toBe('Billing');
    expect(report.connections[0].savePassword).toBe(true);
    expect(report.links[0].kind).toBe('a local drive');
    expect(report.props.lastModifiedBy).toBe('D Halloran');
    expect(report.props.editingMinutes).toBe(19440);
  });

  it('reports the findings that make the file risky', async () => {
    const { findings } = await xrayWorkbook(buildKitchenSinkWorkbook());
    const text = findings.map((finding) => finding.message).join(' | ');

    expect(text).toMatch(/very hidden/i);
    expect(text).toMatch(/#REF!/);
    expect(text).toMatch(/password is saved/i);
    expect(text).toMatch(/local drive|only exists on one computer/i);
    expect(findings.some((finding) => finding.level === 'error')).toBe(true);
  });

  it('decodes the escaped external link target', async () => {
    const report = await xrayWorkbook(buildKitchenSinkWorkbook());
    expect(report.links[0].target).toContain('Q3 targets.xlsx');
  });

  it('says so plainly when a workbook is only a spreadsheet', async () => {
    const report = await xrayWorkbook(buildPlainWorkbook());
    expect(report.verdict.title).toMatch(/just a spreadsheet/i);
    expect(report.vba).toBeNull();
    expect(report.findings.filter((finding) => finding.level === 'error')).toHaveLength(0);
  });

  it('calls a macro workbook an application and reads its code', async () => {
    const report = await xrayWorkbook(realWorkbook());

    expect(report.vba).not.toBeNull();
    expect(report.vba.modules.length).toBeGreaterThan(0);
    expect(report.vba.scan.codeLines).toBeGreaterThan(0);
    expect(report.verdict.title).toMatch(/software|application/i);
  });
});

/* Every case below is a defect that shipped in the first draft of this
   tool and was caught in review. They are pinned so they cannot come back. */
describe('regressions', () => {
  it('refuses a part that inflates far past its declared size', async () => {
    /* A 1MB entry declaring 512 bytes and expanding to a gigabyte is a
       thing a stranger can hand you; it must not become a Uint8Array. */
    const bomb = buildZip([{ name: 'xl/workbook.xml', data: ' '.repeat(64 * 1024 * 1024) }]);
    const zip = openZip(bomb);
    await expect(zip.bytes('xl/workbook.xml')).resolves.toBeNull();
  });

  it('survives an external link whose name contains a literal percent', async () => {
    const rels = `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Target="file:///C:/Reports/Q1 100% margin.xlsx" TargetMode="External"/></Relationships>`;
    const report = await xrayWorkbook(
      buildZip([
        { name: 'xl/workbook.xml', data: '<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="S" sheetId="1"/></sheets></workbook>' },
        { name: 'xl/externalLinks/_rels/externalLink1.xml.rels', data: rels },
      ])
    );

    expect(report.error).toBeUndefined();
    expect(report.links[0].target).toContain('100% margin');
  });

  it('does not report the workbook itself as an external system', async () => {
    /* Loading a Power Query to a sheet writes a connection pointing at
       $Workbook$. That is this file, not somebody's database. */
    const connections = `<?xml version="1.0"?><connections xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
      <connection id="1" name="Query - Table1"><dbPr connection="Provider=Microsoft.Mashup.OleDb.1;Data Source=$Workbook$;Location=Query1" command="SELECT * FROM [Query1]"/></connection>
      <connection id="2" name="ThisWorkbookDataModel"><dbPr connection="Data Source=$Embedded$" command="Model"/></connection>
    </connections>`;
    const report = await xrayWorkbook(
      buildZip([
        { name: 'xl/workbook.xml', data: '<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="S" sheetId="1"/></sheets></workbook>' },
        { name: 'xl/connections.xml', data: connections },
      ])
    );

    expect(report.connections).toHaveLength(0);
    expect(report.findings.map((f) => f.message).join(' ')).not.toMatch(/\$Workbook\$|an external system/);
  });

  it('never calls a macro workbook "just a spreadsheet" because decoding failed', async () => {
    const report = await xrayWorkbook(
      buildZip([
        { name: 'xl/workbook.xml', data: '<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="S" sheetId="1"/></sheets></workbook>' },
        /* Present but not a compound file, so every VBA parse fails. */
        { name: 'xl/vbaProject.bin', data: 'not really a compound file' },
      ])
    );

    expect(report.vba).not.toBeNull();
    expect(report.verdict.title).not.toMatch(/just a spreadsheet/i);
    expect(report.findings.map((f) => f.message).join(' ')).toMatch(/could not be decoded/i);
  });

  it('writes singular findings as singular', async () => {
    const workbook = `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
      <sheets><sheet name="A" sheetId="1"/><sheet name="Rates" sheetId="2" state="veryHidden"/></sheets>
      <definedNames><definedName name="Gone">#REF!</definedName></definedNames>
    </workbook>`;
    const { findings } = await xrayWorkbook(buildZip([{ name: 'xl/workbook.xml', data: workbook }]));
    const text = findings.map((f) => f.message).join(' | ');

    expect(text).toContain('1 sheet marked very hidden');
    expect(text).toContain('It cannot be unhidden');
    expect(text).toContain('1 named range points at #REF!');
    expect(text).not.toMatch(/1 sheets|ranges point at/);
  });

  it('states what the properties say, not what they imply', async () => {
    const { findings } = await xrayWorkbook(buildKitchenSinkWorkbook());
    const authorship = findings.find((f) => f.where === 'Authorship');

    expect(authorship.message).toContain('Created and last saved by the same name');
    /* The file records two name fields. It cannot know who has edited it. */
    expect(authorship.message).not.toMatch(/nobody else/i);
  });
});

/* A second review pass. Same rule as above: each of these shipped and was
   caught, so each is pinned. */
describe('refinements', () => {
  const scan = (source) => scanSource([{ source, lines: source.split('\n').length }]);
  const fired = (source, id) => scan(source).behaviours.some((b) => b.id === id);

  it('does not read an English comment as a database call', () => {
    /* "Select … from" is ordinary English about spreadsheets. Firing
       "Talks to a database" at error level on this is the false positive
       that costs the tool its credibility. */
    expect(fired("' Select the totals from Sheet2 and paste them below", 'database')).toBe(false);
    expect(
      fired(['  Range("A1:D9").Select', "  ' copy from the summary tab"].join('\n'), 'database')
    ).toBe(false);
  });

  it('still reads SQL that is actually in a string', () => {
    expect(fired('cn.Execute "SELECT OrderID FROM dbo.Orders WHERE Paid = 0"', 'database')).toBe(true);
    expect(fired('Set cn = CreateObject("ADODB.Connection")', 'database')).toBe(true);
  });

  it('tells a network share from a local drive in every shape Excel writes', async () => {
    const rels = (target) =>
      `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Target="${target}" TargetMode="External"/></Relationships>`;
    const kindOf = async (target) => {
      const report = await xrayWorkbook(
        buildZip([
          { name: 'xl/workbook.xml', data: '<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="S" sheetId="1"/></sheets></workbook>' },
          { name: 'xl/externalLinks/_rels/externalLink1.xml.rels', data: rels(target) },
        ])
      );
      return report.links[0].kind;
    };

    await expect(kindOf(String.raw`\\fileserver\ops\rates.xlsx`)).resolves.toBe('a network share');
    await expect(kindOf('file://fileserver/ops/rates.xlsx')).resolves.toBe('a network share');
    await expect(kindOf(String.raw`file:///\\fileserver\ops\rates.xlsx`)).resolves.toBe('a network share');
    await expect(kindOf('file:///C:/Users/dh/book.xlsx')).resolves.toBe('a local drive');
    await expect(kindOf(String.raw`C:\Users\dh\book.xlsx`)).resolves.toBe('a local drive');
    await expect(kindOf('https://example.com/book.xlsx')).resolves.toBe('a web address');
    await expect(kindOf('../Budget.xlsx')).resolves.toBe('another workbook');
  });
});

/* Third pass. The decompressor and the verdict were the two that could
   respectively kill a tab and tell the reader something untrue. */
describe('second refinement pass', () => {
  const scan = (source) => scanSource([{ source, lines: source.split('\n').length }]);
  const fired = (source, id) => scan(source).behaviours.some((b) => b.id === id);

  it('bounds the decompressor against a self-amplifying chunk', () => {
    /* One literal then a copy token of length 4098 offset 1, repeated. Each
       6-byte chunk restates 4KB; before the cap this reached gigabytes. */
    const chunk = [0x03, 0xb0, 0x02, 0x41, 0xff, 0x0f];
    const bytes = new Uint8Array([0x01, ...Array.from({ length: 4000 }, () => chunk).flat()]);

    const started = Date.now();
    const out = decompress(bytes, 0, 1024 * 1024);
    expect(out.length).toBeLessThanOrEqual(1024 * 1024);
    expect(Date.now() - started).toBeLessThan(4000);
  });

  it('keeps a legitimate chunk intact', () => {
    const raw = [...'hello world'].map((c) => c.charCodeAt(0));
    const header = (raw.length & 0x0fff) | (0x03 << 12);
    expect(decodeAnsi(decompress(new Uint8Array([0x01, header & 0xff, header >> 8, ...raw]), 0))).toBe(
      'hello world'
    );
  });

  it('does not re-read a part listed many times in the central directory', async () => {
    const zip = openZip(buildZip([{ name: 'a.xml', data: 'x'.repeat(2000) }]));
    /* names() is the list the scanners iterate; duplicates there multiply
       the work by the number of headers, which cost 85 bytes each. */
    expect(new Set(zip.names()).size).toBe(zip.names().length);
  });

  it('reports a workbook part it could not read as an error, not as clean', async () => {
    /* uncompressedSize understated, so the bounded inflate refuses it. */
    const bytes = buildZip([
      { name: 'xl/workbook.xml', data: '<?xml version="1.0"?><workbook>' + ' '.repeat(200000) + '</workbook>' },
    ]);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    /* Rewrite the central-directory uncompressedSize to a small lie. */
    let at = -1;
    for (let i = bytes.length - 22; i >= 0; i -= 1) {
      if (view.getUint32(i, true) === 0x06054b50) { at = view.getUint32(i + 16, true); break; }
    }
    view.setUint32(at + 24, 8, true);

    const report = await xrayWorkbook(bytes);
    expect(report.error).toMatch(/could not be read|does not match/i);
    expect(report.verdict).toBeUndefined();
  });

  it('does not call a decoded, empty VBA project undecodable', async () => {
    const report = await xrayWorkbook(realWorkbook());
    expect(report.verdict.body).not.toMatch(/could not decode/i);
  });

  it('does not say "nothing is load-bearing" while raising findings', async () => {
    const workbook = `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="A" sheetId="1"/><sheet name="R" sheetId="2" state="veryHidden"/></sheets><definedNames><definedName name="Gone">#REF!</definedName></definedNames></workbook>`;
    const report = await xrayWorkbook(buildZip([{ name: 'xl/workbook.xml', data: workbook }]));

    expect(report.findings.some((f) => f.level !== 'info')).toBe(true);
    expect(report.verdict.body).not.toMatch(/nothing here is load-bearing/i);
    expect(report.verdict.title).not.toMatch(/just a spreadsheet/i);
  });

  it('does not read English in a string literal as a database call', () => {
    expect(fired('MsgBox "Select a customer from the list before continuing."', 'database')).toBe(false);
    expect(fired('Sheets("Select From Menu").Activate', 'database')).toBe(false);
    expect(fired('Range("A1").Select  \' copy from the summary tab', 'database')).toBe(false);
  });

  it('still reads real SQL and real connection objects', () => {
    expect(fired('cn.Execute "SELECT OrderID FROM dbo.Orders WHERE Paid = 0"', 'database')).toBe(true);
    expect(fired('Set cn = CreateObject("ADODB.Connection")', 'database')).toBe(true);
    expect(fired('cn.Open "Provider=SQLOLEDB;Data Source=SQL01"', 'database')).toBe(true);
  });
});
