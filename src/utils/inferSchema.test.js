import {
  parseDelimited,
  detectDelimiter,
  inferColumnType,
  toColumnName,
  analyse,
  toPostgres,
} from './inferSchema';

describe('parseDelimited', () => {
  it('handles quoted cells containing the delimiter', () => {
    const rows = parseDelimited('a,b\n"one, two",three', ',');
    expect(rows[1]).toEqual(['one, two', 'three']);
  });

  it('handles escaped quotes', () => {
    const rows = parseDelimited('a\n"say ""hi"""', ',');
    expect(rows[1][0]).toBe('say "hi"');
  });

  it('drops blank lines', () => {
    const rows = parseDelimited('a,b\n\n1,2\n', ',');
    expect(rows).toHaveLength(2);
  });
});

describe('detectDelimiter', () => {
  it('finds tabs in pasted spreadsheet data', () => {
    expect(detectDelimiter('a\tb\tc\n1\t2\t3').char).toBe('\t');
  });

  it('finds semicolons', () => {
    expect(detectDelimiter('a;b;c\n1;2;3').char).toBe(';');
  });
});

describe('inferColumnType', () => {
  it('reads integers', () => {
    expect(inferColumnType(['1', '2', '30']).sqlType).toBe('integer');
  });

  it('reads currency as numeric', () => {
    expect(inferColumnType(['$1,200.00', '$3.50']).label).toBe('money');
  });

  it('reads ISO dates', () => {
    expect(inferColumnType(['2026-01-01', '2026-02-14']).sqlType).toBe('date');
  });

  it('reads timestamps', () => {
    expect(inferColumnType(['2026-01-01 09:30:00']).sqlType).toBe('timestamptz');
  });

  it('widens to text when one value breaks the pattern', () => {
    expect(inferColumnType(['1', '2', 'n/a — see notes']).label).toBe('text');
  });

  it('treats blanks as absent rather than as values', () => {
    expect(inferColumnType(['1', '', 'NULL', '3']).sqlType).toBe('integer');
  });

  it('does not call a 0/1 column boolean', () => {
    expect(inferColumnType(['0', '1', '1']).sqlType).toBe('integer');
  });

  it('does call a yes/no column boolean', () => {
    expect(inferColumnType(['yes', 'no', 'yes']).sqlType).toBe('boolean');
  });

  it('recognises uuids', () => {
    expect(inferColumnType(['3f2504e0-4f89-11d3-9a0c-0305e82c3301']).sqlType).toBe('uuid');
  });

  it('returns empty for a column with nothing in it', () => {
    expect(inferColumnType(['', '', '']).label).toBe('empty');
  });
});

describe('toColumnName', () => {
  it('snake_cases messy headers', () => {
    expect(toColumnName('Customer Name!', 0)).toBe('customer_name');
  });

  it('escapes reserved words', () => {
    expect(toColumnName('Order', 0)).toBe('order_');
  });

  it('prefixes leading digits', () => {
    expect(toColumnName('2026 Total', 0)).toBe('col_2026_total');
  });

  it('falls back to a positional name', () => {
    expect(toColumnName('   ', 4)).toBe('column_5');
  });
});

describe('analyse', () => {
  const rows = [
    ['Invoice ID', 'Issue Date', 'Phone', 'Status', 'Notes'],
    ['1001', '2026-01-04', '0212345678', 'paid', ''],
    ['1002', '4/5/26', '0219876543', 'paid', ''],
    ['1003', '2026-01-06', '0215551234', 'pending', 'split across two POs'],
  ];

  it('flags mixed date notations in one column', () => {
    const { findings } = analyse(rows);
    expect(
      findings.some((f) => f.column === 'Issue Date' && /Mixed date notations/.test(f.message))
    ).toBe(true);
  });

  it('flags a date-named column that is really free text', () => {
    const { findings } = analyse([
      ['Start Date'],
      ['sometime in March'],
      ['TBC'],
    ]);
    expect(
      findings.some((f) => f.column === 'Start Date' && /Named like a date/.test(f.message))
    ).toBe(true);
  });

  it('does not complain when one date format is used consistently', () => {
    const { findings } = analyse([
      ['Issue Date'],
      ['2026-01-04'],
      ['2026-01-06'],
    ]);
    expect(findings.some((f) => /Mixed date notations/.test(f.message))).toBe(false);
  });

  it('flags leading zeros that an integer import would drop', () => {
    const { findings } = analyse(rows);
    expect(
      findings.some((f) => f.column === 'Phone' && /leading zeros/.test(f.message))
    ).toBe(true);
  });

  it('does not claim lost leading zeros when there are none', () => {
    const { findings } = analyse([['Order ID'], ['1001'], ['1002']]);
    expect(findings.some((f) => /leading zeros/.test(f.message))).toBe(false);
  });

  it('does not call a money or date column a primary key candidate', () => {
    const { findings } = analyse(rows);
    const pk = findings.filter((f) => /primary key candidate/.test(f.message));
    expect(pk.map((f) => f.column)).not.toContain('Amount');
    expect(pk.map((f) => f.column)).not.toContain('Issue Date');
  });

  it('spots a low-cardinality column that should be a lookup table', () => {
    const { findings } = analyse([
      ['Customer', 'Status'],
      ['Acme Dental', 'paid'],
      ['Borden Property Group', 'paid'],
      ['Acme Dental', 'pending'],
      ['Crossway Interiors', 'paid'],
      ['Borden Property Group', 'cancelled'],
      ['Acme Dental', 'pending'],
    ]);
    expect(
      findings.some((f) => f.column === 'Status' && /lookup table/.test(f.message))
    ).toBe(true);
    expect(
      findings.some((f) => f.column === 'Customer' && /lookup table/.test(f.message))
    ).toBe(true);
  });

  it('does not infer a lookup table from too few rows', () => {
    const { findings } = analyse([['Status'], ['open'], ['open'], ['closed']]);
    expect(findings.some((f) => /lookup table/.test(f.message))).toBe(false);
  });

  it('flags inconsistent row widths', () => {
    const { findings } = analyse([['a', 'b'], ['1', '2'], ['3']]);
    expect(findings.some((f) => /inconsistent column counts/.test(f.message))).toBe(true);
  });

  it('flags duplicate column names', () => {
    const { findings } = analyse([['Name', 'name'], ['a', 'b']]);
    expect(findings.some((f) => /Duplicate column name/.test(f.message))).toBe(true);
  });

  it('counts body rows, not the header', () => {
    expect(analyse(rows).rowCount).toBe(3);
  });

  it('survives empty input', () => {
    expect(analyse([]).columns).toEqual([]);
  });
});

describe('toPostgres', () => {
  it('emits a create table with an identity key', () => {
    const { columns } = analyse([['Name', 'Qty'], ['widget', '4']]);
    const sql = toPostgres(columns, 'Inventory Items');
    expect(sql).toContain('create table inventory_items (');
    expect(sql).toContain('generated always as identity primary key');
    expect(sql).toContain('qty');
  });

  it('returns nothing for no columns', () => {
    expect(toPostgres([], 't')).toBe('');
  });
});
