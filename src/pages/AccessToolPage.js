import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AccessToolPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';
import { analyseAccessFile, MAX_BYTES } from '../utils/accessReport';

const LEVEL_LABEL = { error: 'Load-bearing', warn: 'Worth knowing', info: 'Noted' };
const LEVEL_ORDER = { error: 0, warn: 1, info: 2 };

const ACCEPT = '.mdb,.accdb,.accde,.mde';

/* A database with more tables than this is worth talking about rather than
   scrolling through, and the schedule below is a summary either way. */
const MAX_TABLES = 60;

function plural(count, word) {
  if (count === 1) return `${count} ${word}`;
  return `${count} ${/[^aeiou]y$/.test(word) ? `${word.slice(0, -1)}ies` : `${word}s`}`;
}

export default function AccessToolPage() {
  const [state, setState] = useState({ status: 'idle' });
  const runId = useRef(0);

  const analyse = useCallback(async (file) => {
    if (!file) return;

    runId.current += 1;
    const run = runId.current;
    const current = () => runId.current === run;

    if (file.size > MAX_BYTES) {
      setState({
        status: 'error',
        name: file.name,
        message: `That file is ${Math.round(file.size / 1024 / 1024)}MB, which is more than a browser tab should hold. Send it over instead.`,
      });
      return;
    }

    setState({ status: 'reading', name: file.name });

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const report = analyseAccessFile(bytes);
      if (!current()) return;
      if (report.error) {
        setState({ status: 'error', name: file.name, message: report.error });
        return;
      }
      setState({ status: 'done', name: file.name, report });
    } catch (err) {
      if (!current()) return;
      setState({
        status: 'error',
        name: file.name,
        message: 'That file could not be read. It may be open in Access, or damaged.',
      });
    }
  }, []);

  const report = state.status === 'done' ? state.report : null;
  const findings = report
    ? [...report.findings].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
    : [];
  const counts = report
    ? report.findings.reduce((acc, f) => ({ ...acc, [f.level]: (acc[f.level] || 0) + 1 }), {})
    : {};

  const copySql = async () => {
    try {
      await navigator.clipboard.writeText(report.sql);
    } catch (err) {
      /* Clipboard is blocked in some browsers; the SQL is selectable. */
    }
  };

  return (
    <>
      <SEO
        title="What is actually in your Access database"
        description="Drop an .mdb or .accdb and see what a migration off Access really involves: the tables and their Postgres schema, the forms, reports, macros and modules that do not convert at all, and the type mismatches that break an import. Runs entirely in your browser — the file is never uploaded."
        path="/tools/access"
      />

      {/* The arrival. Someone lands here to open a database, so the page
          opens on the file control: the masthead is compressed to a single
          ruled strip and everything else is ranged beside the control, not
          stacked in front of it. */}
      <section className="section access-open" aria-labelledby="access-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="access-open__strip">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>A free tool</span>
            </p>
            <h1 id="access-title" className="h3 access-open__title">
              What is actually in your Access database.
            </h1>
          </Reveal>

          <hr className="datum access-open__rule" />

          <div className="access-open__grid">
            <div className="access-open__control">
              <div className="tool-field">
                <p className="tool-field__label">Open a database</p>

                <div className="tool-drop">
                  <p className="body hi">Drop the file here</p>
                  <p className="body--sm muted">or</p>
                  <label className="btn btn--primary tool-drop__button">
                    Choose a database
                    <input
                      className="tool-drop__input"
                      type="file"
                      accept={ACCEPT}
                      onChange={(event) => {
                        const file = event.target.files && event.target.files[0];
                        event.target.value = '';
                        analyse(file);
                      }}
                    />
                  </label>
                  <p className="body--sm muted">
                    .mdb and .accdb, Access 97 onwards, up to{' '}
                    {Math.round(MAX_BYTES / 1024 / 1024)}MB
                  </p>
                </div>
              </div>

              {state.status === 'reading' ? (
                <p className="body muted" aria-hidden="true">
                  Reading {state.name}…
                </p>
              ) : null}

              {state.status === 'error' ? (
                <p className="form-status form-status--error" role="alert">
                  {state.message}
                </p>
              ) : null}

              <p className="sr-only" role="status">
                {state.status === 'reading' ? `Reading ${state.name}.` : ''}
                {report
                  ? `${state.name}: ${report.verdict.title} ${plural(report.findings.length, 'finding')}.`
                  : ''}
              </p>
            </div>

            {/* Beside the control, never in front of it: what the tool is
                for, the way to hand the work to a person instead, and the
                undertaking — which has to be specific to be worth anything,
                because this asks someone to open a customer database on a
                web page. It is ruled in ink: the one accent fill in this
                viewport belongs to the control. */}
            <div className="access-open__brief">
              <p className="lede">
                Drop the .mdb or .accdb your business still runs on, and see what moving off it
                would really involve.
              </p>
              <Link className="btn btn--ghost" to="/contact">
                Start a project
              </Link>
              <p className="tool-note">
                The file is never uploaded, and the records are never read. This reads its
                catalogue — the table definitions, the column types, the row counts, and the list
                of forms, reports and modules. The only rows it reads are the two system tables
                that describe the database itself. Your customers, your invoices, your staff:
                never opened.
              </p>
            </div>
          </div>
        </div>
      </section>

      {report ? (
        <>
          <section className="section section--rule section--alt" aria-labelledby="access-verdict">
            <div className="container stack stack--lg">
              <div className="tool-head">
                <span className="ordinal">01</span>
                <p className="code tool-ident tool-ident--lo">
                  {state.name} · {report.version}
                </p>
                <h2 className="h2" id="access-verdict">
                  {report.verdict.title}
                </h2>
                <hr className="datum" />
                <p className="lede">{report.verdict.body}</p>
              </div>

              <dl className="tool-facts">
                <Fact label="Tables" value={report.tables.length} />
                <Fact label="Columns" value={report.columnCount} />
                <Fact label="Rows" value={report.rowTotal.toLocaleString()} />
                <Fact label="Relationships" value={report.relationships.length} />
              </dl>

              {findings.length ? (
                <>
                  <div className="cluster tool-counts">
                    {['error', 'warn', 'info'].map((level) =>
                      counts[level] ? (
                        <span key={level} className={`pill tool-pill tool-pill--${level}`}>
                          {counts[level]} {LEVEL_LABEL[level].toLowerCase()}
                        </span>
                      ) : null
                    )}
                  </div>

                  <ul className="tool-findings">
                    {findings.map((finding, index) => (
                      <li
                        key={`${finding.where}-${index}`}
                        className={`tool-finding tool-finding--${finding.level}`}
                      >
                        <span className={`tool-finding__level tool-finding__level--${finding.level}`}>
                          {LEVEL_LABEL[finding.level]}
                        </span>
                        <div className="stack stack--xs">
                          <p className="mono tool-finding__column">{finding.where}</p>
                          <p className="body">{finding.message}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </section>

          {report.tables.length ? (
            <section className="section section--rule" aria-labelledby="access-tables">
              <div className="container stack stack--lg">
                <div className="tool-head">
                  <span className="ordinal">02</span>
                  <h2 className="h3" id="access-tables">
                    The tables
                  </h2>
                  <hr className="datum" />
                  <p className="body muted">
                    Row counts come from each table&rsquo;s own definition, not from reading the
                    rows.
                  </p>
                </div>

                <div className="tool-table-wrap" tabIndex={0} role="region" aria-label="Tables">
                  <table className="tool-table">
                    <thead>
                      <tr>
                        <th scope="col">Table</th>
                        <th scope="col">Columns</th>
                        <th scope="col">Rows</th>
                        <th scope="col">Types</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.tables.slice(0, MAX_TABLES).map((table) => (
                        <tr key={table.name}>
                          <td className="mono tool-ident">{table.name}</td>
                          <td>{table.columns.length}</td>
                          <td>{table.rowCount == null ? '—' : table.rowCount.toLocaleString()}</td>
                          <td className="access-types">
                            {[...new Set(table.columns.map((column) => column.typeName))]
                              .slice(0, 6)
                              .join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {report.tables.length > MAX_TABLES ? (
                  <p className="body--sm muted">
                    and {report.tables.length - MAX_TABLES} more, all of them in the schema below.
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {report.relationships.length ? (
            <section className="section section--rule section--alt" aria-labelledby="access-rels">
              <div className="container stack stack--lg">
                <div className="tool-head">
                  <span className="ordinal">03</span>
                  <h2 className="h3" id="access-rels">
                    What joins to what
                  </h2>
                  <hr className="datum" />
                </div>
                <ul className="list list--plain access-rels">
                  {report.relationships.slice(0, 40).map((relationship, index) => (
                    <li key={`${relationship.from}-${index}`} className="mono access-rel">
                      {relationship.from}
                      {relationship.fromColumn ? `.${relationship.fromColumn}` : ''} →{' '}
                      {relationship.to}
                      {relationship.toColumn ? `.${relationship.toColumn}` : ''}
                      {relationship.enforced === false ? ' (not enforced)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {report.sql ? (
            <section className="section section--rule" aria-labelledby="access-sql">
              <div className="container stack stack--lg">
                <div className="tool-head tool-head--action">
                  <span className="ordinal">04</span>
                  <h2 className="h3" id="access-sql">
                    The schema it should become
                  </h2>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={copySql}>
                    Copy SQL
                  </button>
                  <hr className="datum" />
                </div>
                <pre className="tool-sql" tabIndex={0} role="region" aria-label="Generated schema">
                  <code>{report.sql}</code>
                </pre>
                <p className="body muted">
                  A starting point, not a finished migration: no keys, no indexes, and no
                  constraints, because Access does not record enough about them to generate
                  something you could trust without looking. What it does record is the shape.
                </p>
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      <section className="section section--rule" aria-labelledby="access-why">
        <div className="container container--narrow stack stack--lg">
          <div className="tool-head">
            <span className="tool-head__mark">
              <span className="ordinal">05</span>
              <span className="mono tool-head__tag">Why this exists</span>
            </span>
            <h2 className="h3" id="access-why">
              The data is the part everyone worries about, and the part that moves fine.
            </h2>
            <hr className="datum" />
          </div>
          <p className="body">
            Access quotes go wrong in a predictable way. Someone counts the tables, multiplies by a
            day, and produces a number. Then the work starts and it turns out the database was
            never the product — the forms people type into, the reports finance sends out, and the
            macros that hold the month-end together were the product, and none of that converts.
          </p>
          <p className="body">
            This reads the file and separates the two halves, so the conversation starts from what
            is actually in there rather than from a guess.
          </p>
          <div className="cta-block">
            <div className="cluster">
              <Link className="btn btn--primary" to="/contact">
                Talk about moving off Access
              </Link>
              <Link className="btn btn--ghost" to="/tools">
                The other free tools
              </Link>
            </div>
            <p className="body muted">
              Built by {SITE.founder}. The Jet and ACE reader is plain JavaScript with unit tests
              against a real database, and no dependencies —{' '}
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

function Fact({ label, value }) {
  return (
    <div className="tool-fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
