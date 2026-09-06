/* =========================================================================
   Access exit report.

   Turns the catalogue into the thing someone leaving Access actually needs:
   the schema their data should land in, and an honest account of what does
   not come with it.

   The second half is the part that matters. Tables and columns convert
   mechanically. Forms, reports, macros and VBA modules do not convert at
   all — they are the application, and a migration plan that does not say so
   is a plan that runs out of money halfway.
   ========================================================================= */

import { readAccessFile, COLUMN_TYPES, MAX_BYTES } from './accessFile';

export { MAX_BYTES };

const RESERVED = new Set([
  'order', 'user', 'group', 'table', 'select', 'from', 'where', 'default',
  'check', 'column', 'constraint', 'primary', 'references', 'end', 'desc',
  'limit', 'offset', 'grant', 'union', 'all', 'case', 'when', 'then',
]);

/** Access identifiers allow spaces and punctuation; Postgres ones do not. */
export function toIdentifier(name, index = 0) {
  const base = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!base) return `column_${index + 1}`;
  const prefixed = /^\d/.test(base) ? `t_${base}` : base;
  return RESERVED.has(prefixed) ? `${prefixed}_` : prefixed;
}

function sqlType(column) {
  const mapped = COLUMN_TYPES[column.type];
  if (!mapped || !mapped.sql) return null;
  if (mapped.sql === 'varchar') {
    /* Access stores text length in bytes of UTF-16. */
    const chars = Math.max(1, Math.floor((column.length || 510) / 2));
    return `varchar(${Math.min(chars, 4000)})`;
  }
  return mapped.sql;
}

/** Postgres DDL for one table, with the unmappable columns commented out. */
export function toPostgres(table) {
  const used = new Map();
  const lines = [];

  table.columns.forEach((column, index) => {
    /* "Total $" and "Total %" both reduce to `total`. Suffixing counts up
       until the name is free, so a table that already has a `total_2`
       cannot be handed two columns with the same name. */
    const base = toIdentifier(column.name, index);
    let name = base;
    let suffix = 1;
    while (used.has(name)) {
      suffix += 1;
      name = `${base}_${suffix}`;
    }
    used.set(name, true);

    const type = sqlType(column);
    if (!type) {
      lines.push(`  -- ${name}: ${column.typeName} has no column type. It becomes a child table.`);
      return;
    }
    lines.push(`  ${name} ${type},`);
  });

  const body = lines.join('\n').replace(/,(\s*)$/, '$1');
  return `create table ${toIdentifier(table.name)} (\n${body}\n);`;
}

export function toPostgresAll(tables) {
  return tables.map(toPostgres).join('\n\n');
}

/* ---------- findings ------------------------------------------------------ */

/* "query" does not pluralise by adding an s, and neither does anything else
   this report counts that ends in a consonant plus y. */
function plural(count, word) {
  if (count === 1) return `${count} ${word}`;
  const suffix = /[^aeiou]y$/.test(word) ? `${word.slice(0, -1)}ies` : `${word}s`;
  return `${count} ${suffix}`;
}

function buildFindings(report) {
  const findings = [];
  const add = (level, where, message) => findings.push({ level, where, message });

  const { tables, inventory, relationships } = report;

  /* The application half. This is the finding that changes the size of the
     project, so it leads. */
  const appObjects = ['form', 'report', 'macro', 'module'].reduce(
    (sum, kind) => sum + (inventory[kind] || 0),
    0
  );
  if (appObjects) {
    const parts = ['form', 'report', 'macro', 'module']
      .filter((kind) => inventory[kind])
      .map((kind) => plural(inventory[kind], kind));
    add(
      'error',
      'Not the data',
      `${parts.join(', ')}. None of these convert. They are the application built on top of the data, and they are what has to be rebuilt.`
    );
  }

  if (inventory.query) {
    add(
      'warn',
      'Queries',
      `${plural(inventory.query, 'saved query')}. These are business logic in a place nobody looks. Each one is either a view, a report, or a rule that has to move somewhere.`
    );
  }

  ['linked table', 'linked table (ODBC)'].forEach((kind) => {
    if (inventory[kind]) {
      add(
        'error',
        'Linked tables',
        `${plural(inventory[kind], kind)}. The data for these is somewhere else, so this file is not the whole picture.`
      );
    }
  });

  /* Column-level hazards, counted across the whole database rather than
     repeated per table. */
  const hazards = new Map();
  tables.forEach((table) => {
    table.columns.forEach((column) => {
      const mapped = COLUMN_TYPES[column.type];
      if (!mapped || !mapped.hazard) return;
      if (!hazards.has(mapped.name)) hazards.set(mapped.name, { hazard: mapped.hazard, count: 0, sql: mapped.sql });
      hazards.get(mapped.name).count += 1;
    });
  });

  hazards.forEach(({ hazard, count, sql }, name) => {
    add(sql ? 'warn' : 'error', `${name} columns`, `${plural(count, 'column')}. ${hazard}`);
  });

  const noColumns = tables.filter((table) => table.unreadable);
  if (noColumns.length) {
    add(
      'info',
      'Tables',
      `${plural(noColumns.length, 'table')} could not be read past the name: ${noColumns
        .map((table) => table.name)
        .join(', ')}.`
    );
  }

  const awkward = tables.filter((table) => /[^A-Za-z0-9_]/.test(table.name));
  if (awkward.length) {
    add(
      'warn',
      'Names',
      `${plural(awkward.length, 'table name')} contain spaces or punctuation and have to be renamed. Every query and report that mentions them changes too.`
    );
  }

  if (!relationships.length && tables.length > 1) {
    add(
      'error',
      'Relationships',
      'No relationships are defined. The joins exist in the queries and the forms instead, so nothing in the file records how these tables relate.'
    );
  } else {
    const unenforced = relationships.filter((relationship) => relationship.enforced === false);
    if (unenforced.length) {
      add(
        'warn',
        'Relationships',
        `${plural(unenforced.length, 'relationship')} of ${relationships.length} do not enforce referential integrity, so the data may already contain orphans a foreign key will reject.`
      );
    }
  }

  const empty = tables.filter((table) => table.rowCount === 0);
  if (empty.length) {
    add('info', 'Tables', `${plural(empty.length, 'table')} hold no rows at all.`);
  }

  const biggest = tables.reduce((max, table) => ((table.rowCount || 0) > (max.rowCount || 0) ? table : max), tables[0] || {});
  if (biggest && biggest.rowCount > 500000) {
    add(
      'info',
      'Volume',
      `The largest table, ${biggest.name}, holds about ${biggest.rowCount.toLocaleString()} rows. Worth planning the load rather than running it once and hoping.`
    );
  }

  return findings;
}

function verdict(report) {
  const appObjects = ['form', 'report', 'macro', 'module'].reduce(
    (sum, kind) => sum + (report.inventory[kind] || 0),
    0
  );
  const tableCount = report.tables.length;

  if (!tableCount) {
    return {
      title: 'No tables of your own in here.',
      body: 'Every table in this file is one Access created for itself. Whatever this database is for, the data is somewhere else.',
    };
  }

  if (appObjects >= 20) {
    return {
      title: 'This is an application, and the data is the easy part.',
      body: `${plural(tableCount, 'table')} convert mechanically. The ${appObjects} forms, reports, macros and modules on top of them do not convert at all — that is the project.`,
    };
  }

  if (appObjects) {
    return {
      title: 'Mostly a database, with an application growing on it.',
      body: `${plural(tableCount, 'table')} of data, and ${appObjects} objects built over them that would have to be rebuilt rather than moved.`,
    };
  }

  return {
    title: 'This one really is just data.',
    body: `${plural(tableCount, 'table')}, no forms, no reports, no code. A migration here is a schema and a load, which is the good case.`,
  };
}

/* ---------- entry point --------------------------------------------------- */

export function analyseAccessFile(bytes) {
  if (bytes && bytes.length > MAX_BYTES) {
    return {
      error: `That file is over ${Math.round(MAX_BYTES / 1024 / 1024)}MB, which is more than a browser tab should hold. Send it over instead.`,
    };
  }

  const report = readAccessFile(bytes);
  if (report.error) return report;

  report.findings = buildFindings(report);
  report.verdict = verdict(report);
  report.sql = toPostgresAll(report.tables);
  report.columnCount = report.tables.reduce((sum, table) => sum + table.columns.length, 0);
  report.rowTotal = report.tables.reduce((sum, table) => sum + (table.rowCount || 0), 0);

  return report;
}
