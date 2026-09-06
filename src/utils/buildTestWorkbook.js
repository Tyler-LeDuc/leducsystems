/* =========================================================================
   Build a real .xlsx in memory, for tests.

   The workbook readers are only worth trusting against bytes laid out the
   way Excel lays them out, so tests assemble a genuine ZIP — real local
   headers, a real central directory, real DEFLATE — rather than mocking
   the reader's input. Test-only; nothing in the app imports this.
   ========================================================================= */

/* eslint-disable no-bitwise */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const utf8 = (text) => new TextEncoder().encode(text);

/**
 * @param {Array<{name: string, data: string|Uint8Array, deflate?: boolean}>} files
 * @returns {Uint8Array} a valid ZIP archive
 */
export function buildZip(files) {
  const zlib = require('zlib');

  const parts = [];
  const central = [];
  let offset = 0;

  files.forEach((file) => {
    const raw = typeof file.data === 'string' ? utf8(file.data) : file.data;
    const deflate = file.deflate !== false;
    const body = deflate ? new Uint8Array(zlib.deflateRawSync(Buffer.from(raw))) : raw;
    const name = utf8(file.name);
    const crc = crc32(raw);

    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(8, deflate ? 8 : 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, body.length, true);
    lv.setUint32(22, raw.length, true);
    lv.setUint16(26, name.length, true);
    local.set(name, 30);

    parts.push(local, body);

    const header = new Uint8Array(46 + name.length);
    const hv = new DataView(header.buffer);
    hv.setUint32(0, 0x02014b50, true);
    hv.setUint16(6, 20, true);
    hv.setUint16(10, deflate ? 8 : 0, true);
    hv.setUint32(16, crc, true);
    hv.setUint32(20, body.length, true);
    hv.setUint32(24, raw.length, true);
    hv.setUint16(28, name.length, true);
    hv.setUint32(42, offset, true);
    header.set(name, 46);
    central.push(header);

    offset += local.length + body.length;
  });

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  const all = [...parts, ...central, eocd];
  const total = all.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let at = 0;
  all.forEach((part) => {
    out.set(part, at);
    at += part.length;
  });
  return out;
}

/* ---------- a workbook with something wrong with it --------------------- */

const WORKBOOK_XML = `<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Dashboard" sheetId="1" r:id="rId1"/>
    <sheet name="Raw" sheetId="2" state="hidden" r:id="rId2"/>
    <sheet name="Rates" sheetId="3" state="veryHidden" r:id="rId3"/>
  </sheets>
  <definedNames>
    <definedName name="MarginTable">Rates!$A$1:$D$40</definedName>
    <definedName name="OldRegion">#REF!</definedName>
  </definedNames>
</workbook>`;

const CONNECTIONS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<connections xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <connection id="1" name="BillingWarehouse" refreshOnLoad="1" savePassword="1" description="Nightly pull">
    <dbPr connection="Provider=SQLOLEDB;Data Source=SQL01;Initial Catalog=Billing;UID=reporting" command="SELECT * FROM dbo.Invoices"/>
  </connection>
</connections>`;

const EXTERNAL_RELS = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath" Target="file:///C:/Users/dhalloran/Desktop/Q3%20targets.xlsx" TargetMode="External"/>
</Relationships>`;

const CORE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/">
  <dc:creator>D Halloran</dc:creator>
  <cp:lastModifiedBy>D Halloran</cp:lastModifiedBy>
  <dcterms:created>2014-02-11T09:14:00Z</dcterms:created>
  <dcterms:modified>2026-08-19T16:02:00Z</dcterms:modified>
  <cp:revision>842</cp:revision>
</cp:coreProperties>`;

const APP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>Microsoft Excel</Application>
  <Company>Northgate</Company>
  <TotalTime>19440</TotalTime>
</Properties>`;

/** A workbook whose parts carry every signal the tool reports on. */
export function buildKitchenSinkWorkbook() {
  return buildZip([
    { name: '[Content_Types].xml', data: '<?xml version="1.0"?><Types/>' },
    { name: 'xl/workbook.xml', data: WORKBOOK_XML },
    { name: 'xl/connections.xml', data: CONNECTIONS_XML },
    { name: 'xl/externalLinks/_rels/externalLink1.xml.rels', data: EXTERNAL_RELS },
    { name: 'docProps/core.xml', data: CORE_XML },
    { name: 'docProps/app.xml', data: APP_XML },
  ]);
}

/** The same shape, with nothing alarming in it. */
export function buildPlainWorkbook() {
  return buildZip([
    { name: '[Content_Types].xml', data: '<?xml version="1.0"?><Types/>' },
    {
      name: 'xl/workbook.xml',
      data: `<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="Sheet1" sheetId="1"/></sheets></workbook>`,
    },
    { name: 'docProps/core.xml', data: CORE_XML.replace('<cp:lastModifiedBy>D Halloran</cp:lastModifiedBy>', '<cp:lastModifiedBy>R Okafor</cp:lastModifiedBy>') },
  ]);
}
