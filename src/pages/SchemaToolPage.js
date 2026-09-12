import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './SchemaToolPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';
import {
  parseDelimited,
  detectDelimiter,
  analyse,
  toPostgres,
} from '../utils/inferSchema';

/* A short, deliberately messy example: mixed date formats, a phone number
   with leading zeros, a status column that wants to be a lookup table, and
   a mostly-empty notes column. Every one of these is a finding. */
const EXAMPLE = [
  'Invoice ID\tCustomer\tIssue Date\tPhone\tStatus\tAmount\tNotes',
  '1001\tAcme Dental\t2026-01-04\t0212345678\tpaid\t$1,240.00\t',
  '1002\tBorden Property Group\t4/5/26\t0219876543\tpaid\t$880.50\t',
  '1003\tAcme Dental\t2026-01-06\t0215551234\tpending\t$2,100.00\tsplit across two POs',
  '1004\tCrossway Interiors\t2026-01-09\t0217654321\tpaid\t$430.25\t',
  '1005\tBorden Property Group\t12/1/26\t0212223333\tcancelled\t$0.00\t',
  '1006\tAcme Dental\t2026-01-14\t0219998888\tpending\t$1,675.75\t',
].join('\n');

const LEVEL_LABEL = { error: 'Breaks the import', warn: 'Worth checking', info: 'Opportunity' };
const LEVEL_ORDER = { error: 0, warn: 1, info: 2 };

export default function SchemaToolPage() {
  const [text, setText] = useState('');
  const [tableName, setTableName] = useState('invoices');
  const [copyState, setCopyState] = useState('idle');

  const result = useMemo(() => {
    if (!text.trim()) return null;
    const delimiter = detectDelimiter(text);
    const rows = parseDelimited(text, delimiter.char);
    return { ...analyse(rows), delimiter };
  }, [text]);

  const sql = useMemo(
    () => (result ? toPostgres(result.columns, tableName) : ''),
    [result, tableName]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopyState('done');
    } catch {
      /* Blocked in insecure contexts and by permission policy; the block
         is still selectable, so say so rather than doing nothing. */
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  const counts = result
    ? result.findings.reduce((acc, f) => ({ ...acc, [f.level]: (acc[f.level] || 0) + 1 }), {})
    : {};

  /* Array#sort is stable, so within a severity the analyser's column order
     is preserved. */
  const findings = result
    ? [...result.findings].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
    : [];

  return (
    <>
      <SEO
        title="Spreadsheet to database schema"
        description="Paste a spreadsheet and get a Postgres schema plus the data problems that would break the import: mixed date formats, identifiers stored as numbers, columns that should be lookup tables. Runs entirely in your browser."
        path="/tools/schema"
      />

      {/* The arrival. The masthead is compressed to a single ruled strip so
          the paste field is what you land on, with the explanation ranged
          beside it rather than stacked in front of it. Same skeleton as the
          workbook tool — the two are one pair of instruments. */}
      <section className="section schema-open" aria-labelledby="tool-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="schema-open__strip">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>A free tool</span>
            </p>
            <h1 id="tool-title" className="h3 schema-open__title">
              Spreadsheet to schema.
            </h1>
          </Reveal>

          <hr className="datum schema-open__rule" />

          <div className="schema-open__grid">
            <div className="schema-open__control">
              {/* Label and controls share one rule, so the whole thing reads
                  as a field on a printed form rather than a chat box with a
                  toolbar. "Load an example" is the accent fill in this
                  viewport: it is the one press that makes the tool show its
                  own output without the reader finding a file first. */}
              <div className="schema-input">
                <div className="schema-input__bar">
                  <label className="mono schema-input__label" htmlFor="schema-data">
                    Paste your data
                  </label>
                  <div className="cluster">
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => setText(EXAMPLE)}
                    >
                      Load an example
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => setText('')}
                      disabled={!text}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <textarea
                  id="schema-data"
                  className="tool-textarea"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder={'Invoice ID\tCustomer\tIssue Date\n1001\tAcme Dental\t2026-01-04'}
                  spellCheck="false"
                  rows={10}
                />
              </div>

              <p className="schema-open__hint">
                Copy a block of cells straight out of Excel or Google Sheets, including the header
                row. Tabs, commas, semicolons, and pipes all work.
              </p>

              {/* One live region that stays mounted for the life of the page,
                  so a result that arrives is actually announced. */}
              <p className="sr-only" role="status">
                {result && result.columns.length
                  ? `${result.columns.length} columns read from ${result.rowCount} rows. ${result.findings.length} findings.`
                  : ''}
              </p>
            </div>

            {/* Beside the control, never in front of it: what the tool is
                for, the way to hand the work to a person instead, and the
                undertaking that nothing leaves the browser. */}
            <div className="schema-open__brief">
              <p className="lede">
                Paste the spreadsheet your operation actually runs on. You get the Postgres table
                it should become, and — more usefully — the list of things in the data that would
                break the import.
              </p>
              <Link className="btn btn--ghost" to="/contact">
                Talk about your migration
              </Link>
              <p className="tool-note">
                It runs entirely in your browser. Nothing is uploaded, nothing is stored, and
                there is no server to send it to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {result && result.columns.length ? (
        <>
          <section className="section section--rule section--alt" aria-labelledby="tool-findings">
            <div className="container stack stack--lg">
              <div className="tool-head">
                <span className="ordinal">01</span>
                <h2 className="h3" id="tool-findings">
                  What is wrong with this data
                </h2>
                <hr className="datum" />
                {/* The instrument reading, set as one: mono, tabular, terse. */}
                <p className="schema-readout">
                  {result.rowCount} rows, {result.columns.length} columns, read as{' '}
                  {result.delimiter.name}-separated.
                </p>
                <p className="body muted">
                  {findings.length
                    ? `${findings.length} thing${findings.length === 1 ? '' : 's'} worth knowing about.`
                    : 'Nothing obviously broken — unusual, and a good sign.'}
                </p>
              </div>

              {findings.length ? (
                <div className="cluster tool-counts">
                  {['error', 'warn', 'info'].map((level) =>
                    counts[level] ? (
                      <span key={level} className={`pill tool-pill tool-pill--${level}`}>
                        {counts[level]} {LEVEL_LABEL[level].toLowerCase()}
                      </span>
                    ) : null
                  )}
                </div>
              ) : null}

              <ul className="tool-findings">
                {findings.map((finding, index) => (
                  <li key={`${finding.column}-${index}`} className={`tool-finding tool-finding--${finding.level}`}>
                    <span className={`tool-finding__level tool-finding__level--${finding.level}`}>
                      {LEVEL_LABEL[finding.level]}
                    </span>
                    <div className="stack stack--xs">
                      {finding.column ? (
                        <p className="mono tool-finding__column">{finding.column}</p>
                      ) : (
                        <p className="mono tool-finding__column">Whole file</p>
                      )}
                      <p className="body">{finding.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section section--rule" aria-labelledby="tool-columns">
            <div className="container stack stack--lg">
              <div className="tool-head">
                <span className="ordinal">02</span>
                <h2 className="h3" id="tool-columns">
                  Columns as read
                </h2>
                <hr className="datum" />
              </div>
              <div
                className="tool-table-wrap schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Columns as read"
              >
                <table className="tool-table schema-table">
                  <thead>
                    <tr>
                      <th scope="col">Header</th>
                      <th scope="col">Column</th>
                      <th scope="col">Type</th>
                      <th scope="col" className="schema-table__num">Filled</th>
                      <th scope="col" className="schema-table__num">Distinct</th>
                      <th scope="col">Sample</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.columns.map((col) => (
                      <tr key={col.name}>
                        <td className="schema-table__header">{col.header}</td>
                        <td className="mono">{col.name}</td>
                        <td className="mono tool-table__type">{col.sqlType}</td>
                        <td className="schema-table__num">
                          {col.filled}/{col.total}
                        </td>
                        <td className="schema-table__num">{col.distinct}</td>
                        <td>
                          <span className="tool-table__sample">
                            {col.samples.join(', ') || '—'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section section--rule section--alt" aria-labelledby="tool-sql">
            <div className="container stack stack--lg">
              <div className="tool-head tool-head--action">
                <span className="ordinal">03</span>
                <h2 className="h3" id="tool-sql">
                  The table it should become
                </h2>
                <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
                  {copyState === 'done' ? 'Copied' : copyState === 'failed' ? 'Select and copy' : 'Copy SQL'}
                </button>
                <hr className="datum" />
              </div>

              {/* The name lives with the DDL it renames, not three sections up. */}
              <div className="schema-input schema-input--inline">
                <div className="schema-input__bar">
                  <label className="mono schema-input__label" htmlFor="schema-table-name">
                    Table name
                  </label>
                </div>
                <input
                  id="schema-table-name"
                  className="tool-input"
                  value={tableName}
                  onChange={(event) => setTableName(event.target.value)}
                  spellCheck="false"
                />
              </div>

              <pre className="tool-sql schema-sql" tabIndex={0} role="region" aria-label="Generated SQL">
                <code>{sql}</code>
              </pre>
              <p className="body muted">
                Postgres syntax. The surrogate key and <span className="code">imported_at</span>{' '}
                column are added deliberately — you want a stable identifier that is not one of
                your business fields, and you want to know when a row arrived.
              </p>
            </div>
          </section>
        </>
      ) : null}

      <section className="section section--rule" aria-labelledby="tool-why">
        <div className="container container--narrow stack stack--lg">
          <div className="tool-head">
            <span className="tool-head__mark">
              <span className="ordinal">04</span>
              <span className="mono tool-head__tag">Why this exists</span>
            </span>
            <h2 className="h3" id="tool-why">
              The schema is the easy part.
            </h2>
            <hr className="datum" />
          </div>
          <p className="body">
            Every spreadsheet-to-database migration looks like a one-day job until someone opens
            the data. Dates entered three different ways. Phone numbers that lost their leading
            zero the moment Excel decided they were numbers. A status column with four real values
            and eleven spellings of them. That is where the weeks go, not the{' '}
            <span className="code">create table</span>.
          </p>
          <p className="body">
            This tool finds the common ones in a few seconds so you can see the size of the job
            before committing to it. It is the first thing we run on a migration, so it seemed
            worth making it something you can run yourself.
          </p>
          <div className="cta-block">
            <div className="cluster">
              <Link className="btn btn--primary" to="/contact">
                Talk about your migration
              </Link>
              <Link className="btn btn--ghost" to="/tools">
                The other free tools
              </Link>
            </div>
            <p className="body muted">
              Built by {SITE.founder}. The inference logic is plain JavaScript with unit tests —{' '}
              <a
                className="link-underline"
                href={`${SITE.github}/leducsystems`}
                target="_blank"
                rel="noopener noreferrer"
              >
                read it on GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
