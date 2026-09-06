/* =========================================================================
   Microsoft Access reader (Jet 3/4 and ACE).

   An .mdb or .accdb is a paged database file, not a document. This reads
   its catalogue — the table definitions, the column types, the row counts,
   and the inventory of forms, reports, macros and modules — without ever
   reading a row of the data those tables hold.

   That distinction is the point of the tool and is worth keeping true: the
   only tables whose rows are read are MSysObjects and MSysRelationships,
   which describe the database rather than contain anyone's records.

   No dependency. Every online converter for this format uploads the file
   to a server, which is exactly the thing the owner of a customer database
   should not do.
   ========================================================================= */

const JET_MAGIC = 'Standard Jet DB';
const ACE_MAGIC = 'Standard ACE DB';

const PAGE_DATA = 0x01;
const PAGE_TABLE_DEF = 0x02;

/* Offsets inside a table-definition page, all derived from and checked
   against real files rather than from memory. */
const TDEF = {
  ROW_COUNT: 0x10,
  TABLE_TYPE: 0x28,
  VAR_COLUMNS: 0x2b,
  COLUMNS: 0x2d,
  REAL_INDEXES: 0x33,
  HEADER_LENGTH: 0x3f,
  INDEX_BLOCK: 12,
  COLUMN_DEF: 25,
};

/* MSysObjects.Type. The negative values are how Access stores the things
   that are not data: the application built on top of it. */
export const OBJECT_TYPES = {
  1: 'table',
  4: 'linked table (ODBC)',
  5: 'query',
  6: 'linked table',
  8: 'relationship',
  [-32768]: 'form',
  [-32766]: 'macro',
  [-32764]: 'report',
  [-32761]: 'module',
  [-32758]: 'data access page',
};

/* Jet column type -> what it is, what Postgres column it should become, and
   what goes wrong if the migration is done naively. */
export const COLUMN_TYPES = {
  0x01: { name: 'Yes/No', sql: 'boolean', hazard: 'Access stores true as -1. An import that treats it as 1 silently inverts or overflows.' },
  0x02: { name: 'Byte', sql: 'smallint' },
  0x03: { name: 'Integer', sql: 'smallint' },
  0x04: { name: 'Long Integer', sql: 'integer' },
  0x05: { name: 'Currency', sql: 'numeric(19,4)' },
  0x06: { name: 'Single', sql: 'real' },
  0x07: { name: 'Double', sql: 'double precision' },
  0x08: { name: 'Date/Time', sql: 'timestamp', hazard: 'No time zone, and the zero date is 1899-12-30 rather than the epoch most importers assume.' },
  0x09: { name: 'Binary', sql: 'bytea' },
  0x0a: { name: 'Text', sql: 'varchar' },
  0x0b: { name: 'OLE Object', sql: 'bytea', hazard: 'Embedded files. These belong in object storage, not in a column.' },
  0x0c: { name: 'Memo', sql: 'text' },
  0x0d: { name: 'Replication ID', sql: 'uuid' },
  0x0f: { name: 'GUID', sql: 'uuid' },
  0x10: { name: 'Decimal', sql: 'numeric' },
  0x12: { name: 'Attachment', sql: null, hazard: 'Multi-valued. There is no single column that holds this — it has to become a child table.' },
};

const COLUMN_FIXED = 0x01;

export function isAccessFile(bytes) {
  if (!bytes || bytes.length < 0x20) return false;
  const magic = latin1(bytes, 4, 19);
  return magic === JET_MAGIC || magic === ACE_MAGIC;
}

function latin1(bytes, from, to) {
  let out = '';
  for (let i = from; i < to && i < bytes.length; i += 1) out += String.fromCharCode(bytes[i]);
  return out;
}

function utf16(bytes, from, to) {
  let out = '';
  for (let i = from; i + 1 < to && i + 1 < bytes.length; i += 2) {
    out += String.fromCharCode(bytes[i] | (bytes[i + 1] << 8));
  }
  return out;
}

/* Jet 3 wrote names in the database code page rather than UTF-16. */
function readName(bytes, at, length, wide) {
  return wide ? utf16(bytes, at, at + length) : latin1(bytes, at, at + length);
}

const VERSIONS = {
  0: { label: 'Access 97', pageSize: 2048, wide: false },
  1: { label: 'Access 2000–2003', pageSize: 4096, wide: true },
  2: { label: 'Access 2007', pageSize: 4096, wide: true },
  3: { label: 'Access 2010', pageSize: 4096, wide: true },
  4: { label: 'Access 2013', pageSize: 4096, wide: true },
  5: { label: 'Access 2016 or later', pageSize: 4096, wide: true },
};

/* ---------- pages -------------------------------------------------------- */

function reader(bytes, pageSize) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return {
    view,
    pages: Math.floor(bytes.length / pageSize),
    u8: (o) => bytes[o],
    u16: (o) => (o + 2 <= bytes.length ? view.getUint16(o, true) : 0),
    i16: (o) => (o + 2 <= bytes.length ? view.getInt16(o, true) : 0),
    u32: (o) => (o + 4 <= bytes.length ? view.getUint32(o, true) : 0),
    i32: (o) => (o + 4 <= bytes.length ? view.getInt32(o, true) : 0),
  };
}

function readTableDefinition(bytes, r, pageNo, pageSize, wide) {
  const base = pageNo * pageSize;
  if (base + pageSize > bytes.length || r.u8(base) !== PAGE_TABLE_DEF) return null;

  const columnCount = r.u16(base + TDEF.COLUMNS);
  const realIndexes = r.u32(base + TDEF.REAL_INDEXES);
  if (columnCount > 4096 || realIndexes > 4096) return null;

  const definition = {
    page: pageNo,
    rowCount: r.u32(base + TDEF.ROW_COUNT),
    isSystem: r.u8(base + TDEF.TABLE_TYPE) === 0x53,
    variableColumns: r.u16(base + TDEF.VAR_COLUMNS),
    columnCount,
    columns: [],
  };

  let at = base + TDEF.HEADER_LENGTH + realIndexes * TDEF.INDEX_BLOCK;

  for (let i = 0; i < columnCount; i += 1) {
    const o = at + i * TDEF.COLUMN_DEF;
    if (o + TDEF.COLUMN_DEF > bytes.length) return null;
    definition.columns.push({
      type: r.u8(o),
      id: r.u16(o + 5),
      variableIndex: r.u16(o + 7),
      flags: r.u8(o + 15),
      fixedOffset: r.u16(o + 21),
      length: r.u16(o + 23),
    });
  }

  at += columnCount * TDEF.COLUMN_DEF;

  for (let i = 0; i < columnCount; i += 1) {
    const length = wide ? r.u16(at) : r.u8(at);
    const skip = wide ? 2 : 1;
    if (length > 512 || at + skip + length > bytes.length) return null;
    definition.columns[i].name = readName(bytes, at + skip, length, wide);
    at += skip + length;
  }

  return definition;
}

/* A row's fixed columns sit at known offsets; its variable columns are
   addressed by a table that grows backwards from the null mask. */
function readRow(bytes, r, from, to, definition, wide) {
  const length = to - from;
  if (length < 6) return null;

  const columnCount = r.u16(from);
  if (columnCount !== definition.columnCount) return null;

  const maskLength = Math.ceil(columnCount / 8);
  const maskAt = to - maskLength;
  const isNull = (id) => !((bytes[maskAt + (id >> 3)] >> (id & 7)) & 1);

  const variableCount = definition.variableColumns ? r.u16(maskAt - 2) : 0;
  if (variableCount > definition.columnCount) return null;

  const offsets = [];
  for (let i = 0; i <= variableCount; i += 1) offsets.push(r.u16(maskAt - 4 - i * 2));

  const row = {};
  definition.columns.forEach((column) => {
    if (!column.name) return;
    if (isNull(column.id)) {
      row[column.name] = null;
      return;
    }

    if ((column.flags & COLUMN_FIXED) !== 0) {
      row[column.name] = readFixed(r, from + 2 + column.fixedOffset, column.type);
      return;
    }

    const start = offsets[column.variableIndex];
    const end = offsets[column.variableIndex + 1];
    if (start == null || end == null || end < start || from + end > to) return;
    row[column.name] = readName(bytes, from + start, end - start, wide);
  });

  return row;
}

function readFixed(r, at, type) {
  switch (type) {
    case 0x01: return r.u8(at) !== 0;
    case 0x02: return r.u8(at);
    case 0x03: return r.i16(at);
    case 0x04: return r.i32(at);
    default: return null;
  }
}

function readTableRows(bytes, r, definition, pageSize, wide, ownerPages) {
  const rows = [];
  (ownerPages || []).forEach((pageNo) => {
    const base = pageNo * pageSize;
    const count = r.u16(base + 0x0c);
    if (count > pageSize / 4) return;

    for (let i = 0; i < count; i += 1) {
      const raw = r.u16(base + 0x0e + i * 2);
      /* The high bits flag deleted rows and rows that overflow to another
         page; neither is worth chasing for a catalogue read. */
      if (raw & 0x8000) continue;
      const start = raw & 0x1fff;
      const end = i === 0 ? pageSize : r.u16(base + 0x0e + (i - 1) * 2) & 0x1fff;
      if (end <= start || base + end > bytes.length) continue;

      const row = readRow(bytes, r, base + start, base + end, definition, wide);
      if (row) rows.push(row);
    }
  });
  return rows;
}

/* ---------- entry point --------------------------------------------------- */

export const MAX_BYTES = 256 * 1024 * 1024;

/**
 * Read the catalogue of an Access database.
 * Returns { error } rather than throwing, so the page can explain itself.
 */
export function readAccessFile(bytes) {
  if (!bytes || !bytes.length) return { error: 'That file is empty.' };
  if (!isAccessFile(bytes)) {
    return { error: 'That is not an Access database. Expected a .mdb or .accdb file.' };
  }

  const raw = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0x14, true);
  const version = VERSIONS[raw] || VERSIONS[5];
  const { pageSize, wide } = version;
  const r = reader(bytes, pageSize);

  /* A password-protected database has its pages encrypted; the catalogue
     will not parse and saying so beats reporting an empty database. */
  const catalog = readTableDefinition(bytes, r, 2, pageSize, wide);
  if (!catalog || !catalog.columns.some((column) => column.name === 'Name')) {
    return {
      error:
        'The catalogue in this file could not be read. That usually means the database is password-protected or encrypted, which this tool cannot open.',
    };
  }

  /* One pass over the page headers, building owner -> data pages. Doing it
     per table would be a full scan per table. */
  const owners = new Map();
  for (let page = 0; page < r.pages; page += 1) {
    const base = page * pageSize;
    if (r.u8(base) !== PAGE_DATA) continue;
    const owner = r.u32(base + 4);
    if (!owners.has(owner)) owners.set(owner, []);
    owners.get(owner).push(page);
  }

  const objects = readTableRows(bytes, r, catalog, pageSize, wide, owners.get(2)).filter(
    (row) => row.Name && row.Type != null
  );

  /* Everything Access hides from the navigation pane starts with MSys or
     ~, and none of it is the user's data model. */
  const isInternal = (name) => /^(MSys|~)/i.test(name);

  const tables = objects
    .filter((row) => row.Type === 1 && !isInternal(row.Name))
    .map((row) => {
      const definition = readTableDefinition(bytes, r, row.Id & 0x00ffffff, pageSize, wide);
      return {
        name: row.Name,
        rowCount: definition ? definition.rowCount : null,
        columns: definition
          ? definition.columns
              .filter((column) => column.name)
              .map((column) => ({
                name: column.name,
                type: column.type,
                length: column.length,
                typeName: (COLUMN_TYPES[column.type] || {}).name || `type 0x${column.type.toString(16)}`,
              }))
          : [],
        unreadable: !definition,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const relationships = readRelationships(bytes, r, objects, pageSize, wide, owners);

  const inventory = {};
  objects.forEach((row) => {
    if (isInternal(row.Name)) return;
    const kind = OBJECT_TYPES[row.Type];
    if (!kind || kind === 'relationship') return;
    inventory[kind] = (inventory[kind] || 0) + 1;
  });

  return {
    version: version.label,
    pageSize,
    bytes: bytes.length,
    tables,
    relationships,
    inventory,
    systemTableCount: objects.filter((row) => row.Type === 1 && isInternal(row.Name)).length,
  };
}

function readRelationships(bytes, r, objects, pageSize, wide, owners) {
  const entry = objects.find((row) => row.Name === 'MSysRelationships' && row.Type === 1);
  if (!entry) return [];

  const page = entry.Id & 0x00ffffff;
  const definition = readTableDefinition(bytes, r, page, pageSize, wide);
  if (!definition) return [];

  return readTableRows(bytes, r, definition, pageSize, wide, owners.get(page))
    .filter((row) => row.szObject && row.szReferencedObject)
    .map((row) => ({
      from: row.szObject,
      fromColumn: row.szColumn || '',
      to: row.szReferencedObject,
      toColumn: row.szReferencedColumn || '',
      /* grbit carries the referential-integrity flags. Bit 0 set means
         integrity is NOT enforced. */
      enforced: typeof row.grbit === 'number' ? (row.grbit & 0x02) === 0 : null,
    }));
}
