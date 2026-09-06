import fs from 'fs';
import path from 'path';
import { isAccessFile, readAccessFile, COLUMN_TYPES } from './accessFile';
import { analyseAccessFile, toIdentifier, toPostgres } from './accessReport';

const database = () =>
  new Uint8Array(fs.readFileSync(path.join(__dirname, '__fixtures__', 'accessQueryTest.mdb')));

/* The only structural difference between a .mdb and a .accdb this reader
   cares about is the version byte; page layout and offsets are identical,
   which was checked against real files of both kinds. */
function asAce(bytes, version = 2) {
  const copy = bytes.slice();
  copy.set(new TextEncoder().encode('Standard ACE DB'), 4);
  new DataView(copy.buffer).setUint32(0x14, version, true);
  return copy;
}

describe('isAccessFile', () => {
  it('recognises a real database', () => {
    expect(isAccessFile(database())).toBe(true);
  });

  it('rejects everything else', () => {
    expect(isAccessFile(new Uint8Array([0x50, 0x4b, 3, 4, ...new Array(64).fill(0)]))).toBe(false);
    expect(isAccessFile(new Uint8Array(8))).toBe(false);
    expect(isAccessFile(null)).toBe(false);
  });
});

describe('readAccessFile', () => {
  it('reads the version off the header', () => {
    expect(readAccessFile(database()).version).toBe('Access 2000–2003');
    expect(readAccessFile(asAce(database(), 3)).version).toBe('Access 2010');
  });

  it('lists the user tables and leaves the system ones out', () => {
    const report = readAccessFile(database());
    expect(report.tables.map((table) => table.name)).toEqual(['Table1', 'Table2', 'Table3']);
    /* The file is full of MSys* tables; none of them are the user's data. */
    expect(report.systemTableCount).toBeGreaterThan(0);
  });

  it('reads columns and types out of each table definition', () => {
    const table = readAccessFile(database()).tables.find((t) => t.name === 'Table1');

    expect(table.columns.length).toBeGreaterThan(0);
    expect(table.unreadable).toBe(false);
    table.columns.forEach((column) => {
      expect(typeof column.name).toBe('string');
      expect(column.name.length).toBeGreaterThan(0);
      expect(column.typeName).toBeTruthy();
    });
  });

  it('counts the objects that are not data', () => {
    const report = readAccessFile(database());
    /* This fixture is a query test database: nine saved queries. */
    expect(report.inventory.query).toBe(9);
    expect(report.inventory.table).toBe(3);
  });

  it('reports an unreadable catalogue rather than an empty database', () => {
    const bytes = database();
    /* Scramble the catalogue page the way encryption would. */
    bytes.fill(0x7f, 2 * 4096, 3 * 4096);
    expect(readAccessFile(bytes).error).toMatch(/password-protected|could not be read/i);
  });

  it('rejects a file that is not a database', () => {
    expect(readAccessFile(new Uint8Array(64)).error).toMatch(/not an Access database/i);
    expect(readAccessFile(new Uint8Array(0)).error).toMatch(/empty/i);
  });
});

describe('toIdentifier', () => {
  it('makes an Access name safe for Postgres', () => {
    expect(toIdentifier('Customer Name')).toBe('customer_name');
    expect(toIdentifier('Order')).toBe('order_');
    expect(toIdentifier('2026 Totals')).toBe('t_2026_totals');
    expect(toIdentifier('')).toBe('column_1');
  });
});

describe('toPostgres', () => {
  it('emits a create table with mapped types', () => {
    const sql = toPostgres({
      name: 'Customer List',
      columns: [
        { name: 'ID', type: 0x04, length: 4, typeName: 'Long Integer' },
        { name: 'Company Name', type: 0x0a, length: 100, typeName: 'Text' },
        { name: 'Active', type: 0x01, length: 1, typeName: 'Yes/No' },
        { name: 'Balance', type: 0x05, length: 8, typeName: 'Currency' },
      ],
    });

    expect(sql).toContain('create table customer_list (');
    expect(sql).toContain('id integer');
    expect(sql).toContain('company_name varchar(50)');
    expect(sql).toContain('active boolean');
    expect(sql).toContain('balance numeric(19,4)');
  });

  it('will not invent a column for something that has no column type', () => {
    /* An Access attachment field is multi-valued. There is no Postgres
       column that holds one, and pretending otherwise would produce DDL
       that silently loses data. */
    const sql = toPostgres({
      name: 'Jobs',
      columns: [{ name: 'Photos', type: 0x12, length: 0, typeName: 'Attachment' }],
    });

    expect(sql).toContain('-- photos');
    expect(sql).toContain('child table');
    expect(sql).not.toMatch(/photos\s+\w+,/);
  });

  it('does not emit the same column name twice', () => {
    const sql = toPostgres({
      name: 'T',
      columns: [
        { name: 'Total $', type: 0x04, length: 4, typeName: 'Long Integer' },
        { name: 'Total %', type: 0x04, length: 4, typeName: 'Long Integer' },
      ],
    });
    expect(sql).toContain('total ');
    expect(sql).toContain('total_2 ');
  });
});

describe('analyseAccessFile', () => {
  it('leads with what does not convert', () => {
    const report = analyseAccessFile(database());
    const text = report.findings.map((finding) => finding.message).join(' | ');

    expect(text).toMatch(/9 saved queries/);
    expect(text).toMatch(/business logic/i);
  });

  it('says when nothing records how the tables relate', () => {
    /* This database defines no relationships, which is the common case and
       the expensive one: the joins live in the queries instead. */
    const report = analyseAccessFile(database());
    expect(report.relationships).toEqual([]);
    expect(report.findings.some((f) => /No relationships are defined/.test(f.message))).toBe(true);
  });

  it('produces DDL for every table it read', () => {
    const report = analyseAccessFile(database());
    report.tables.forEach((table) => {
      expect(report.sql).toContain(`create table ${toIdentifier(table.name)} (`);
    });
  });

  it('gives a verdict that matches what it found', () => {
    const report = analyseAccessFile(database());
    /* Tables and queries but no forms, reports or modules. */
    expect(report.verdict.title).toMatch(/just data/i);
  });

  it('refuses a file larger than a tab should hold', () => {
    const huge = { length: 300 * 1024 * 1024 };
    expect(analyseAccessFile(huge).error).toMatch(/more than a browser tab/i);
  });

  it('names every column type it claims to know', () => {
    const unnamed = Object.values(COLUMN_TYPES).filter((mapped) => !mapped.name);
    expect(unnamed).toEqual([]);
  });

  it('explains itself whenever a type has no Postgres column', () => {
    /* A type that cannot be mapped must say why, or the DDL just drops a
       column and says nothing. */
    const unexplained = Object.values(COLUMN_TYPES).filter((mapped) => !mapped.sql && !mapped.hazard);
    expect(unexplained).toEqual([]);
  });
});
