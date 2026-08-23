/* =========================================================================
   Spreadsheet -> relational schema inference.

   Pure functions, no dependencies, no network. Given delimited text, work
   out what each column actually holds and emit Postgres DDL plus the
   problems worth knowing about before a migration.

   Deliberately conservative: when the evidence is thin the type widens to
   text rather than guessing something narrow that fails on row 40,000.
   ========================================================================= */

/* ---------- parsing ---------------------------------------------------- */

/**
 * Split delimited text into rows of cells, honouring RFC-4180 style quoting
 * so that embedded delimiters, quotes, and newlines survive.
 */
export function parseDelimited(text, delimiter) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      quoted = true;
    } else if (ch === delimiter) {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (ch !== '\r') {
      cell += ch;
    }
  }

  if (cell !== '' || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

/** Pick the delimiter that yields the most consistent column count. */
export function detectDelimiter(text) {
  const sample = text.split('\n').slice(0, 20).join('\n');
  const candidates = [
    { char: '\t', name: 'tab' },
    { char: ',', name: 'comma' },
    { char: ';', name: 'semicolon' },
    { char: '|', name: 'pipe' },
  ];

  let best = { char: ',', name: 'comma', score: -1 };

  candidates.forEach((candidate) => {
    const rows = parseDelimited(sample, candidate.char);
    if (rows.length < 2) return;
    const widths = rows.map((r) => r.length);
    const first = widths[0];
    if (first < 2) return;
    const consistent = widths.filter((w) => w === first).length / widths.length;
    const score = consistent * first;
    if (score > best.score) best = { ...candidate, score };
  });

  return best;
}

/* ---------- type inference -------------------------------------------- */

const BLANKS = new Set(['', 'null', 'n/a', 'na', 'none', '-', '--', '#n/a']);

const isBlank = (v) => BLANKS.has(String(v).trim().toLowerCase());

const BOOLEANS = new Set(['true', 'false', 'yes', 'no', 'y', 'n', '0', '1', 't', 'f']);

/* Currency and thousands separators are stripped before the numeric test so
   that "$1,234.50" reads as money rather than as free text. */
const stripNumeric = (v) => String(v).trim().replace(/^[$£€]\s?/, '').replace(/,/g, '');

function isInteger(v) {
  const s = stripNumeric(v);
  return /^-?\d+$/.test(s) && Number.isSafeInteger(Number(s));
}

function isDecimal(v) {
  const s = stripNumeric(v);
  return /^-?\d*\.\d+$/.test(s) && Number.isFinite(Number(s));
}

/* ISO, US, and dotted European forms. Deliberately not Date.parse, which
   accepts far too much and would classify plain words as dates. */
const DATE_FORMATS = [
  { name: 'ISO (YYYY-MM-DD)', re: /^\d{4}-\d{2}-\d{2}$/ },
  { name: 'slashed (D/M/YY)', re: /^\d{1,2}\/\d{1,2}\/\d{2,4}$/ },
  { name: 'dotted (D.M.YYYY)', re: /^\d{1,2}\.\d{1,2}\.\d{4}$/ },
];

function isDate(v) {
  const s = String(v).trim();
  return DATE_FORMATS.some((f) => f.re.test(s));
}

/**
 * Which date notations appear in a column. More than one is a migration
 * hazard: a slashed date is ambiguous on its own (4/5/26 is April 5th or
 * May 4th depending on who typed it), and mixing notations means the
 * spreadsheet was filled in by more than one convention.
 */
export function dateFormatsUsed(values) {
  const found = new Set();
  values
    .filter((v) => !isBlank(v))
    .forEach((v) => {
      const s = String(v).trim();
      const match = DATE_FORMATS.find((f) => f.re.test(s));
      if (match) found.add(match.name);
    });
  return [...found];
}

function isTimestamp(v) {
  const s = String(v).trim();
  return (
    /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?/.test(s) ||
    /^\d{1,2}\/\d{1,2}\/\d{2,4}\s+\d{1,2}:\d{2}/.test(s)
  );
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
const isUuid = (v) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(v).trim());

/**
 * Classify one column from its values. Every non-blank value must satisfy a
 * type for that type to win, so a single stray value widens the column.
 */
export function inferColumnType(values) {
  const present = values.filter((v) => !isBlank(v));

  if (!present.length) {
    return { sqlType: 'text', label: 'empty', confident: false };
  }

  const all = (fn) => present.every(fn);

  if (all(isUuid)) return { sqlType: 'uuid', label: 'uuid', confident: true };
  if (all(isTimestamp)) return { sqlType: 'timestamptz', label: 'timestamp', confident: true };
  if (all(isDate)) return { sqlType: 'date', label: 'date', confident: true };
  if (all(isEmail)) return { sqlType: 'text', label: 'email', confident: true };

  if (all((v) => BOOLEANS.has(String(v).trim().toLowerCase()))) {
    /* 0/1 columns are ambiguous: they are just as likely to be counts or
       flags. Only call it boolean when a word form appears somewhere. */
    const wordy = present.some((v) => /^(true|false|yes|no|t|f|y|n)$/i.test(String(v).trim()));
    if (wordy) return { sqlType: 'boolean', label: 'boolean', confident: true };
  }

  if (all(isInteger)) {
    const money = present.some((v) => /^[$£€]/.test(String(v).trim()));
    if (money) return { sqlType: 'numeric(12,2)', label: 'money', confident: true };
    return { sqlType: 'integer', label: 'integer', confident: true };
  }

  if (all((v) => isInteger(v) || isDecimal(v))) {
    const money = present.some((v) => /^[$£€]/.test(String(v).trim()));
    return {
      sqlType: money ? 'numeric(12,2)' : 'numeric',
      label: money ? 'money' : 'decimal',
      confident: true,
    };
  }

  const longest = present.reduce((max, v) => Math.max(max, String(v).length), 0);
  if (longest <= 80) {
    return { sqlType: `varchar(${Math.max(32, Math.ceil(longest / 16) * 16)})`, label: 'text', confident: true };
  }

  return { sqlType: 'text', label: 'long text', confident: true };
}

/* ---------- naming ----------------------------------------------------- */

const RESERVED = new Set([
  'order', 'user', 'group', 'table', 'select', 'from', 'where', 'default',
  'check', 'column', 'constraint', 'primary', 'references', 'end', 'desc',
]);

/** Turn a spreadsheet header into a safe snake_case identifier. */
export function toColumnName(header, index) {
  const base = String(header || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!base) return `column_${index + 1}`;
  const prefixed = /^\d/.test(base) ? `col_${base}` : base;
  return RESERVED.has(prefixed) ? `${prefixed}_` : prefixed;
}

/* ---------- analysis --------------------------------------------------- */

/**
 * Analyse parsed rows into a column model plus the findings a migration
 * would trip over. The findings are the point of the tool: the DDL is easy,
 * knowing what is wrong with the data is the part that costs weeks.
 */
export function analyse(rows) {
  if (!rows.length) {
    return { columns: [], findings: [], rowCount: 0 };
  }

  const headers = rows[0];
  const body = rows.slice(1);
  const findings = [];

  const seen = new Map();
  const columns = headers.map((header, index) => {
    const values = body.map((row) => (row[index] === undefined ? '' : row[index]));
    const present = values.filter((v) => !isBlank(v));
    const distinct = new Set(present.map((v) => String(v).trim()));
    const type = inferColumnType(values);
    const name = toColumnName(header, index);

    if (seen.has(name)) {
      findings.push({
        level: 'error',
        column: header || `column ${index + 1}`,
        message: `Duplicate column name — collides with "${seen.get(name)}". Rename one before importing.`,
      });
    } else {
      seen.set(name, header || `column ${index + 1}`);
    }

    const nullable = present.length < values.length;
    const unique = present.length > 0 && distinct.size === present.length;

    return {
      header: header || `(unnamed ${index + 1})`,
      name,
      ...type,
      nullable,
      unique,
      filled: present.length,
      total: values.length,
      distinct: distinct.size,
      samples: [...distinct].slice(0, 3),
      values,
    };
  });

  /* --- findings that matter for a real migration --- */

  columns.forEach((col) => {
    if (col.label === 'empty') {
      findings.push({
        level: 'warn',
        column: col.header,
        message: 'Entirely empty. Typed as text — confirm it is still needed at all.',
      });
    }

    if (col.total && col.filled / col.total < 0.5 && col.label !== 'empty') {
      const pct = Math.round((col.filled / col.total) * 100);
      findings.push({
        level: 'warn',
        column: col.header,
        message: `Only ${pct}% populated. Either it is optional, or the data was never captured consistently.`,
      });
    }

    /* A key candidate has to be identifier-shaped, not merely distinct. In a
       small sample almost every column is distinct, so uniqueness alone
       produces nonsense like "this money column is a primary key". */
    const idShaped =
      col.label === 'uuid' ||
      /(^|_)(id|code|key|ref|sku|number|no)(_|$)/i.test(col.name);
    const keyable = col.label === 'uuid' || col.label === 'integer' || col.label === 'text';

    if (col.unique && !col.nullable && col.filled >= 3 && idShaped && keyable) {
      findings.push({
        level: 'info',
        column: col.header,
        message: 'Distinct and always present — a natural primary key candidate.',
      });
    }

    /* Few distinct values repeated across many rows is a lookup table wanting
       to happen. Scaled to sample size so it still fires on a pasted excerpt. */
    if (
      !col.unique &&
      col.distinct >= 2 &&
      col.distinct <= 25 &&
      col.filled >= 4 &&
      col.distinct <= col.filled * 0.6 &&
      (col.label === 'text' || col.label === 'long text')
    ) {
      findings.push({
        level: 'info',
        column: col.header,
        message: `Only ${col.distinct} distinct values across ${col.filled} rows — this wants to be a lookup table with a foreign key, not a free-text column.`,
      });
    }

    if (/(date|time|day|month|created|updated|due|start|end)/i.test(col.header) && col.label === 'text') {
      findings.push({
        level: 'error',
        column: col.header,
        message: 'Named like a date but stored as text — the values do not share a format. This breaks sorting and range queries.',
      });
    }

    if (col.label === 'date' || col.label === 'timestamp') {
      const formats = dateFormatsUsed(col.values);
      if (formats.length > 1) {
        findings.push({
          level: 'error',
          column: col.header,
          message: `Mixed date notations in one column (${formats.join(', ')}). Slashed dates are ambiguous — 4/5/26 is April 5th or May 4th depending on who typed it. Decide before importing.`,
        });
      }
    }

    /* Only claim lost leading zeros when there is actual evidence of them, or
       when the field is one that is never legitimately arithmetic. Flagging
       every integer column whose header says "order" is a false positive. */
    if (col.label === 'integer') {
      const hasLeadingZero = col.values.some((v) => /^0\d/.test(String(v).trim()));
      const neverNumeric = /(phone|zip|postal|ssn|fax|mobile)/i.test(col.header);
      if (hasLeadingZero) {
        findings.push({
          level: 'error',
          column: col.header,
          message: 'Values carry leading zeros but read as a number — importing as an integer silently drops them. Emitted as text below.',
        });
        /* Emit what the advice says. A schema that contradicts its own
           findings is worse than no schema. */
        col.sqlType = 'text';
        col.label = 'text';
      } else if (neverNumeric) {
        findings.push({
          level: 'error',
          column: col.header,
          message: 'An identifier stored as a number. Nobody does arithmetic on these, and the first value with a leading zero or an extension will break. Emitted as text below.',
        });
        col.sqlType = 'text';
        col.label = 'text';
      }
    }
  });

  const widths = new Set(rows.map((r) => r.length));
  if (widths.size > 1) {
    findings.push({
      level: 'error',
      column: null,
      message: `Rows have inconsistent column counts (${[...widths].sort((a, b) => a - b).join(', ')}). Something is misquoted or the file has merged cells.`,
    });
  }

  const order = { error: 0, warn: 1, info: 2 };
  findings.sort((a, b) => order[a.level] - order[b.level]);

  return { columns, findings, rowCount: body.length };
}

/* ---------- emit ------------------------------------------------------- */

/** Render the analysed columns as Postgres DDL. */
export function toPostgres(columns, tableName = 'imported_table') {
  if (!columns.length) return '';

  const safeTable = toColumnName(tableName, 0) || 'imported_table';
  const names = [...columns.map((c) => c.name), 'id', 'imported_at'];
  const width = names.reduce((max, n) => Math.max(max, n.length), 0);
  const pad = (name) => name + ' '.repeat(width - name.length);

  const lines = columns.map((col) => {
    const nullable = col.nullable ? '' : ' not null';
    const note = col.label === 'empty' ? '  -- always empty in the sample' : '';
    return `  ${pad(col.name)}  ${col.sqlType}${nullable},${note}`;
  });

  return [
    `create table ${safeTable} (`,
    `  ${pad('id')}  bigint generated always as identity primary key,`,
    ...lines,
    `  ${pad('imported_at')}  timestamptz not null default now()`,
    `);`,
  ].join('\n');
}
