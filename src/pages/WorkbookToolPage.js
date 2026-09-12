import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './WorkbookToolPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';
import { xrayWorkbook, MAX_BYTES } from '../utils/workbookXray';

const LEVEL_LABEL = { error: 'Load-bearing', warn: 'Worth knowing', info: 'Noted' };

const LEVEL_ORDER = { error: 0, warn: 1, info: 2 };

const ACCEPT = '.xlsx,.xlsm,.xltm,.xltx';

/* A real workbook has tens of modules and a handful of connections. The cap
   is a guard against a file built to render a hundred thousand rows. */
const MAX_ROWS = 200;

function plural(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

/* Excel records editing time in minutes. Anything under an hour has to stay
   in minutes or it renders as "0 hours". */
function editingTime(minutes) {
  if (minutes < 60) return plural(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  return `${hours.toLocaleString()} hour${hours === 1 ? '' : 's'}`;
}

export default function WorkbookToolPage() {
  const [state, setState] = useState({ status: 'idle' });
  const [dragging, setDragging] = useState(false);
  const runId = useRef(0);

  const analyse = useCallback(async (file) => {
    if (!file) return;

    /* Two files can be in flight at once — drop a large one, then a small
       one — and the slower analysis would otherwise land last and replace
       the newer result. Only the most recent run may write state. */
    runId.current += 1;
    const run = runId.current;
    const current = () => runId.current === run;

    /* Checked before the read, not after: arrayBuffer() on a 2GB file has
       already cost the memory by the time a byte-length check could run. */
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
      const report = await xrayWorkbook(bytes);
      if (!current()) return;
      if (report.error) {
        setState({ status: 'error', name: file.name, message: report.error });
        return;
      }
      setState({ status: 'done', name: file.name, size: file.size, report });
    } catch (err) {
      if (!current()) return;
      setState({
        status: 'error',
        name: file.name,
        message: 'That file could not be read. It may be encrypted, or still open in Excel.',
      });
    }
  }, []);

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    analyse(event.dataTransfer.files && event.dataTransfer.files[0]);
  };

  const onDragLeave = (event) => {
    /* dragleave bubbles from children; only a leave that actually exits
       the zone should clear the state. */
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setDragging(false);
  };

  const report = state.status === 'done' ? state.report : null;
  const counts = report
    ? report.findings.reduce((acc, f) => ({ ...acc, [f.level]: (acc[f.level] || 0) + 1 }), {})
    : {};

  /* Array#sort is stable, so within a severity the parsers' discovery order
     — which is the file's own structure — is preserved. */
  const findings = report
    ? [...report.findings].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
    : [];

  return (
    <>
      <SEO
        title="What is running inside your spreadsheet"
        description="Drop an Excel workbook and see the software hiding in it: macro code and what it reaches, database connections, Power Query sources, links to other people's machines, and sheets that cannot be unhidden from the menu. Runs entirely in your browser — the file is never uploaded."
        path="/tools/workbook"
      />

      {/* The arrival. The title is compressed to a single ruled strip so the
          drop zone — the whole reason the page exists — is the thing you
          land on, with the explanation ranged beside it rather than in
          front of it. */}
      <section className="section xray-open" aria-labelledby="xray-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="xray-open__strip">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>A free tool</span>
            </p>
            <h1 id="xray-title" className="h3 xray-open__title">
              What is running inside your spreadsheet.
            </h1>
          </Reveal>

          <hr className="datum xray-open__rule" />

          <div className="xray-open__grid">
            <div className="xray-open__control">
              <div className="tool-field">
                <p className="tool-field__label">Choose a workbook</p>

                {/* The drop zone is decoration around a real file input. The
                    wrapping label gives the input its accessible name, and
                    the focus ring is drawn on that label via :focus-within —
                    the input itself is transparent, so an outline on it would
                    be painted at zero alpha and the keyboard path would be
                    invisible. */}
                <div
                  className={`tool-drop${dragging ? ' tool-drop--over' : ''}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <p className="body hi">Drag a workbook here</p>
                  <p className="body--sm muted">or</p>
                  <label className="btn btn--primary tool-drop__button">
                    Choose a file
                    <input
                      className="tool-drop__input"
                      type="file"
                      accept={ACCEPT}
                      onChange={(event) => {
                        const file = event.target.files && event.target.files[0];
                        /* Cleared so that choosing the same file again fires a
                           fresh change event — otherwise a re-check after
                           fixing the file in Excel silently does nothing. */
                        event.target.value = '';
                        analyse(file);
                      }}
                    />
                  </label>
                  <p className="body--sm muted">
                    .xlsx and .xlsm, up to {Math.round(MAX_BYTES / 1024 / 1024)}MB
                  </p>
                </div>
              </div>

              {/* The read is fast on a small file and long on a 40MB one, so
                  the wait gets a real indeterminate rule rather than a word
                  that might flash past. */}
              {state.status === 'reading' ? (
                <div className="xray-reading" aria-hidden="true">
                  <p className="code xray-reading__line">Reading {state.name}…</p>
                  <span className="xray-progress" />
                </div>
              ) : null}

              {state.status === 'error' ? (
                <p className="form-status form-status--error" role="alert">
                  {state.message}
                </p>
              ) : null}

              {/* One live region that stays mounted for the life of the page.
                  Announcing from a node that unmounts the moment the report
                  arrives means the result is never read out at all. */}
              <p className="sr-only" role="status">
                {state.status === 'reading' ? `Reading ${state.name}.` : ''}
                {report ? `${state.name}: ${report.verdict.title} ${plural(report.findings.length, 'finding')}.` : ''}
              </p>
            </div>

            {/* Beside the control, never in front of it: what the tool is
                for, the way to hand the file to a person instead, and the
                undertaking that nothing leaves the browser. */}
            <div className="xray-open__brief">
              <p className="lede">
                Somewhere in your organization is a workbook that stopped being a workbook years
                ago — drop it here and see what it actually does.
              </p>
              <Link className="btn btn--ghost" to="/contact">
                Talk about replacing it
              </Link>
              <p className="tool-note">
                It runs entirely in your browser. The file is never uploaded, and there is no
                server to upload it to — the parsing happens in the page you are reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {report ? (
        <>
          <section className="section section--rule section--alt" aria-labelledby="xray-verdict">
            <div className="container stack stack--lg">
              {/* The report's title block: ordinal in the margin, the file
                  name set as the identifier it is, the verdict as the
                  headline, and the datum ruling the whole thing off. */}
              <div className="tool-head">
                <span className="ordinal">01</span>
                <p className="code tool-ident tool-ident--lo">{state.name}</p>
                <h2 className="h2" id="xray-verdict">
                  {report.verdict.title}
                </h2>
                <hr className="datum" />
              </div>
              <p className="lede">{report.verdict.body}</p>

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
              ) : (
                <p className="body muted xray-clear">
                  {report.vba
                    ? 'Nothing further to report — but see the verdict above.'
                    : 'Nothing to report. No macros, no connections, no external links, nothing hidden.'}
                </p>
              )}
            </div>
          </section>

          {report.vba && report.vba.modules.length ? (
            <section className="section section--rule" aria-labelledby="xray-code">
              <div className="container stack stack--lg">
                <div className="tool-head">
                  <span className="ordinal">02</span>
                  <h2 className="h3" id="xray-code">
                    The code
                  </h2>
                  <hr className="datum" />
                  <p className="body muted">
                    {plural(report.vba.scan.codeLines, 'line')} of VBA across{' '}
                    {plural(report.vba.scan.modulesWithCode, 'module')} that carry code, and{' '}
                    {plural(report.vba.scan.procedures, 'procedure')}. Read out of the file here in
                    the page — none of it left your machine.
                  </p>
                </div>

                <div className="tool-table-wrap" tabIndex={0} role="region" aria-label="VBA modules">
                  <table className="tool-table tool-table--compact">
                    <thead>
                      <tr>
                        <th scope="col">Module</th>
                        <th scope="col">Kind</th>
                        <th scope="col">Code lines</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.vba.modules.slice(0, MAX_ROWS).map((module, index) => (
                        <tr key={`${module.name}-${index}`}>
                          <td className="mono">{module.name}</td>
                          <td>{module.kind}</td>
                          <td>{module.recovered ? module.codeLines.toLocaleString() : 'not decoded'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {report.vba.scan.paths.length ? (
                  <div className="stack stack--sm">
                    <h3 className="h4">Paths written into the code</h3>
                    <ul className="list list--plain xray-paths">
                      {report.vba.scan.paths.slice(0, 12).map((path) => (
                        <li key={path} className="mono xray-path">
                          {path}
                        </li>
                      ))}
                    </ul>
                    {report.vba.scan.paths.length > 12 ? (
                      <p className="body--sm muted">
                        and {report.vba.scan.paths.length - 12} more.
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {report.connections.length || report.powerQuery ? (
            <section className="section section--rule section--alt" aria-labelledby="xray-systems">
              <div className="container stack stack--lg">
                <div className="tool-head">
                  <span className="ordinal">03</span>
                  <h2 className="h3" id="xray-systems">
                    What it connects to
                  </h2>
                  <hr className="datum" />
                </div>

                {/* Each source is a ruled entry lettered down the margin, not
                    a card: the same shape a schedule takes on a drawing. */}
                <ol className="xray-sources">
                  {report.connections.slice(0, MAX_ROWS).map((connection, index) => (
                    <li key={`${connection.name}-${index}`} className="xray-source">
                      <p className="mono tool-ident">{connection.name}</p>
                      <p className="body">
                        {connection.provider ? `${connection.provider} · ` : ''}
                        {connection.server || 'unnamed source'}
                        {connection.database ? ` · ${connection.database}` : ''}
                      </p>
                      {connection.command ? (
                        <pre className="tool-sql xray-query" tabIndex={0} role="region" aria-label={`Query behind ${connection.name}`}>
                          <code>{connection.command}</code>
                        </pre>
                      ) : null}
                    </li>
                  ))}

                  {report.powerQuery ? (
                    <li className="xray-source">
                      <p className="mono tool-ident">Power Query</p>
                      <p className="body">
                        {report.powerQuery.queries.length
                          ? `${plural(report.powerQuery.queries.length, 'query')}: ${report.powerQuery.queries.join(', ')}`
                          : 'Present, with no named queries.'}
                      </p>
                      {report.powerQuery.sources.length ? (
                        <p className="body muted">Reading from {report.powerQuery.sources.join(', ')}.</p>
                      ) : null}
                    </li>
                  ) : null}
                </ol>
              </div>
            </section>
          ) : null}

          <section className="section section--rule" aria-labelledby="xray-structure">
            <div className="container stack stack--lg">
              <div className="tool-head">
                <span className="ordinal">04</span>
                <h2 className="h3" id="xray-structure">
                  The file itself
                </h2>
                <hr className="datum" />
              </div>
              <dl className="tool-facts">
                <div className="tool-fact">
                  <dt>Sheets</dt>
                  <dd>
                    {report.sheets.length}
                    {report.sheets.filter((sheet) => sheet.state !== 'visible').length
                      ? ` (${report.sheets.filter((sheet) => sheet.state !== 'visible').length} hidden)`
                      : ''}
                  </dd>
                </div>
                <div className="tool-fact">
                  <dt>Named ranges</dt>
                  <dd>{report.definedNames.length}</dd>
                </div>
                <div className="tool-fact">
                  <dt>Parts in the file</dt>
                  <dd>{report.partCount}</dd>
                </div>
                {report.props.lastModifiedBy ? (
                  <div className="tool-fact">
                    <dt>Last saved by</dt>
                    <dd>{report.props.lastModifiedBy}</dd>
                  </div>
                ) : null}
                {report.props.revision ? (
                  <div className="tool-fact">
                    <dt>Revisions</dt>
                    <dd>{report.props.revision}</dd>
                  </div>
                ) : null}
                {report.props.editingMinutes ? (
                  <div className="tool-fact">
                    <dt>Time spent editing</dt>
                    {/* Rounding to hours turns every short-lived workbook
                        into "0 hours", which reads as a bug. */}
                    <dd>{editingTime(report.props.editingMinutes)}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </section>
        </>
      ) : null}

      <section className="section section--rule" aria-labelledby="xray-why">
        <div className="container container--narrow stack stack--lg">
          <div className="tool-head">
            <span className="tool-head__mark">
              <span className="ordinal">05</span>
              <span className="mono tool-head__tag">Why this exists</span>
            </span>
            <h2 className="h3" id="xray-why">
              The spreadsheet stopped being a spreadsheet years ago.
            </h2>
            <hr className="datum" />
          </div>
          <p className="body">
            Nobody decides to build critical software in Excel. It happens one macro at a time,
            over a decade, usually by someone who was solving a real problem quickly and well. The
            trouble comes later, when the file is running a process nobody has read, against a
            database nobody documented, on a path that points at a laptop that was replaced in
            2019.
          </p>
          <p className="body">
            This tool reads the parts of the file Excel does not show you and puts a name to what
            is in there. It does not judge the code. It tells you how much of it there is, what it
            reaches, and whose name the file carries — which is the information you need before
            deciding whether to replace it.
          </p>
          <div className="cta-block">
            <div className="cluster">
              <Link className="btn btn--primary" to="/contact">
                Talk about replacing it
              </Link>
              <Link className="btn btn--ghost" to="/tools/folder">
                Map a whole folder
              </Link>
            </div>
            <p className="body muted xray-credit">
              Built by {SITE.founder}. The workbook, compound file, and VBA decoders are plain
              JavaScript with unit tests and no dependencies —{' '}
              <a
                className="link-underline"
                href={`${SITE.github}/leducsystems`}
                target="_blank"
                rel="noopener noreferrer"
              >
                read them on GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
