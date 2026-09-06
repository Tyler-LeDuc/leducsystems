import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FolderToolPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';
import {
  probeWorkbook,
  buildMap,
  layoutGraph,
  WORKBOOK_PATTERN,
  MAX_FILES,
  PARTS_READ,
} from '../utils/folderScan';

/* Files are probed a few at a time: enough to keep the scan moving, few
   enough that a folder of hundreds does not open hundreds of reads at once. */
const CONCURRENCY = 6;

const GRAPH_WIDTH = 720;
const GRAPH_HEIGHT = 420;

function plural(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

function megabytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(bytes > 100 * 1024 * 1024 ? 0 : 1)}MB`;
}

export default function FolderToolPage() {
  const [state, setState] = useState({ status: 'idle' });
  const runId = useRef(0);

  const scan = useCallback(async (fileList) => {
    const all = [...(fileList || [])];
    const workbooks = all.filter((file) => WORKBOOK_PATTERN.test(file.name) && !file.name.startsWith('~$'));

    if (!workbooks.length) {
      setState({
        status: 'error',
        message: all.length
          ? `That folder has ${plural(all.length, 'file')} in it, but no .xlsx or .xlsm workbooks.`
          : 'No files came through. Pick a folder rather than a single file.',
      });
      return;
    }

    runId.current += 1;
    const run = runId.current;
    const current = () => runId.current === run;

    const capped = workbooks.slice(0, MAX_FILES);
    setState({ status: 'scanning', done: 0, total: capped.length });

    const records = [];
    let cursor = 0;
    let done = 0;

    const worker = async () => {
      for (;;) {
        const index = cursor;
        cursor += 1;
        if (index >= capped.length || !current()) return;

        const file = capped[index];
        /* eslint-disable-next-line no-await-in-loop */
        const record = await probeWorkbook(file, file.webkitRelativePath || file.name);
        if (record) records.push(record);

        done += 1;
        if (done % 5 === 0 && current()) setState({ status: 'scanning', done, total: capped.length });
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    if (!current()) return;

    setState({
      status: 'done',
      map: buildMap(records),
      skipped: workbooks.length - capped.length,
      unreadable: capped.length - records.length,
    });
  }, []);

  const map = state.status === 'done' ? state.map : null;

  /* Only the files that actually reference one another are worth drawing;
     on a real shared drive most files have no links at all and would be a
     field of unconnected dots. */
  const graph = useMemo(() => {
    if (!map) return null;
    const linked = map.edges.filter((edge) => edge.to);
    if (!linked.length) return null;

    const ids = new Set();
    linked.forEach((edge) => {
      ids.add(edge.from);
      ids.add(edge.to);
    });

    const nodes = [...ids].map((id) => ({
      id,
      label: id.split('/').pop(),
      weight: map.inDegree.get(id) || 0,
    }));

    return { nodes: layoutGraph(nodes, linked, GRAPH_WIDTH, GRAPH_HEIGHT), edges: linked };
  }, [map]);

  const positions = useMemo(
    () => (graph ? new Map(graph.nodes.map((node) => [node.id, node])) : new Map()),
    [graph]
  );

  return (
    <>
      <SEO
        title="Map the spreadsheets your team runs on"
        description="Point this at a folder of Excel workbooks and see the dependency map nobody has drawn: which file a dozen reports read from, which links point at a machine that is not there, which workbook exists in eleven copies, and which one person has ever saved it. Reads four small parts per file, entirely in your browser."
        path="/tools/folder"
      />

      <section className="tool-hero" aria-labelledby="folder-title">
        <div className="bg-glow" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="stack stack--lg">
            <div className="stack stack--sm">
              <p className="eyebrow">A free tool</p>
              <h1 id="folder-title" className="display folder-title">
                Map the spreadsheets your team runs on.
              </h1>
              <p className="lede">
                Point this at the folder your operation actually lives in, and see which files
                everything else depends on.
              </p>
            </div>

            {/* The privacy claim is the loudest thing on the page on purpose:
                this asks someone to point a website at their company's
                shared drive, and a vague reassurance would not be enough. */}
            <div className="panel folder-promise stack stack--sm">
              <p className="body hi">Nothing is uploaded. Nothing is even read in full.</p>
              <p className="body--sm muted">
                A workbook is a ZIP file. This opens each one and reads {PARTS_READ.length} small
                XML parts out of it — never the cells, never the contents:
              </p>
              <ul className="list list--plain folder-parts">
                {PARTS_READ.map((part) => (
                  <li key={part} className="mono folder-part">
                    {part}
                  </li>
                ))}
              </ul>
              <p className="body--sm muted">
                A 40MB model costs a few kilobytes of reading. There is no server here to send
                anything to — the whole scan happens in this page.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="folder-input">
        <div className="container stack stack--lg">
          <h2 className="h3" id="folder-input">
            Point it at a folder
          </h2>

          <div className="tool-drop">
            <p className="body hi">Pick the folder your team keeps its spreadsheets in</p>
            <label className="btn btn--primary tool-drop__button">
              Choose a folder
              <input
                className="tool-drop__input"
                type="file"
                /* Non-standard attributes, but the only way to pick a folder
                   from a file input; supported in every desktop browser. */
                webkitdirectory=""
                directory=""
                multiple
                onChange={(event) => {
                  /* The FileList is live: clearing the input empties it, so
                     the files have to be copied out before the reset that
                     lets the same folder be picked again. */
                  const files = [...event.target.files];
                  event.target.value = '';
                  scan(files);
                }}
              />
            </label>
            <p className="body--sm dim">
              Subfolders included. Up to {MAX_FILES.toLocaleString()} workbooks.
            </p>
          </div>

          {state.status === 'scanning' ? (
            <p className="body muted" aria-hidden="true">
              Reading {state.done} of {state.total}…
            </p>
          ) : null}

          {state.status === 'error' ? (
            <p className="form-status form-status--error" role="alert">
              {state.message}
            </p>
          ) : null}

          <p className="sr-only" role="status">
            {state.status === 'scanning' ? `Reading ${state.done} of ${state.total} workbooks.` : ''}
            {map ? `Scanned ${plural(map.counts.files, 'workbook')}. ${plural(map.dependedOn.length, 'file')} are read by others.` : ''}
          </p>
        </div>
      </section>

      {map ? (
        <>
          <section className="section section--rule section--alt" aria-labelledby="folder-summary">
            <div className="container stack stack--lg">
              <h2 className="h2" id="folder-summary">
                {map.counts.files === 0
                  ? 'Nothing readable in that folder.'
                  : `${plural(map.counts.files, 'workbook')}, ${megabytes(map.counts.bytes)}.`}
              </h2>

              <dl className="tool-facts">
                <Fact label="Read by another file" value={map.dependedOn.length} />
                <Fact label="Link out of the folder" value={map.counts.outside} />
                <Fact label="Carry macros" value={map.counts.withMacros} />
                <Fact label="Hold a live connection" value={map.counts.withConnections} />
              </dl>

              {state.skipped > 0 || state.unreadable > 0 ? (
                <p className="body--sm dim">
                  {state.skipped > 0
                    ? `${plural(state.skipped, 'workbook')} past the ${MAX_FILES.toLocaleString()} cap were not read. `
                    : ''}
                  {state.unreadable > 0
                    ? `${plural(state.unreadable, 'file')} could not be opened — an old .xls, or corrupt.`
                    : ''}
                </p>
              ) : null}
            </div>
          </section>

          {graph ? (
            <section className="section section--rule" aria-labelledby="folder-graph">
              <div className="container stack stack--lg">
                <div className="stack stack--sm">
                  <h2 className="h3" id="folder-graph">
                    What reads from what
                  </h2>
                  <p className="body muted">
                    An arrow points from a workbook to the one it pulls numbers out of. Only the{' '}
                    {plural(graph.nodes.length, 'file')} with links are drawn.
                  </p>
                </div>

                <div className="folder-graph-wrap" tabIndex={0} role="region" aria-label="Dependency graph">
                  <svg
                    className="folder-graph"
                    viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
                    role="img"
                    aria-label={`${plural(graph.edges.length, 'link')} between ${plural(graph.nodes.length, 'workbook')}`}
                  >
                    <defs>
                      <marker
                        id="folder-arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                      </marker>
                    </defs>

                    {graph.edges.map((edge, index) => {
                      const from = positions.get(edge.from);
                      const to = positions.get(edge.to);
                      if (!from || !to) return null;
                      return (
                        <line
                          key={`${edge.from}-${edge.to}-${index}`}
                          className={`folder-edge folder-edge--${edge.confidence === 'exact' ? 'exact' : 'guess'}`}
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          markerEnd="url(#folder-arrow)"
                        />
                      );
                    })}

                    {graph.nodes.map((node) => (
                      <g key={node.id} className="folder-node">
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={5 + Math.min(10, node.weight * 3)}
                          className={node.weight ? 'folder-dot folder-dot--hub' : 'folder-dot'}
                        />
                        <text x={node.x} y={node.y - 10 - Math.min(10, node.weight * 3)} textAnchor="middle">
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                <p className="body--sm dim">
                  A solid arrow is a link this tool resolved exactly. A faint one was matched on
                  filename alone, because the workbook stores an absolute path that is not inside
                  the folder you picked — treat those as likely, not certain.
                </p>
              </div>
            </section>
          ) : null}

          {map.dependedOn.length ? (
            <Section id="folder-hubs" title="If one of these goes, other files break">
              <div className="tool-table-wrap" tabIndex={0} role="region" aria-label="Files read by other files">
                <table className="tool-table">
                  <thead>
                    <tr>
                      <th scope="col">File</th>
                      <th scope="col">Read by</th>
                      <th scope="col">Last saved by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map.dependedOn.slice(0, 25).map(({ record, dependents }) => (
                      <tr key={record.path}>
                        <td className="mono">{record.path}</td>
                        <td>{plural(dependents, 'file')}</td>
                        <td>{record.lastModifiedBy || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          ) : null}

          {map.outside.length ? (
            <Section
              id="folder-outside"
              title="Links pointing somewhere else"
              lede="These read from a file that is not in the folder you picked. Some are on a server; some are on one person's machine."
              alt
            >
              <ul className="list list--plain folder-links">
                {map.outside.slice(0, 25).map((link, index) => (
                  <li key={`${link.from}-${index}`} className="folder-link">
                    <p className="mono folder-link__from">{link.from}</p>
                    <p className="mono folder-link__to">{link.target}</p>
                  </li>
                ))}
              </ul>
              {map.outside.length > 25 ? (
                <p className="body--sm dim">and {map.outside.length - 25} more.</p>
              ) : null}
            </Section>
          ) : null}

          {map.versions.length ? (
            <Section
              id="folder-versions"
              title="One workbook, several copies"
              lede="Same filename underneath the version suffixes, and the same sheets inside. Only the newest is likely to be the real one."
            >
              <div className="stack stack--sm">
                {map.versions.slice(0, 8).map((cluster) => (
                  <div key={cluster.key} className="panel stack stack--xs">
                    <p className="body hi">
                      {cluster.members.length} copies of “{cluster.key}”
                    </p>
                    <ul className="list list--plain folder-versions">
                      {cluster.members.map((member) => {
                        /* Only label a newest when one actually is newest.
                           Copied files often share a timestamp, and picking
                           an arbitrary winner would be a confident guess
                           about which one people should be using. */
                        const isNewest =
                          cluster.datedNewest && member.path === cluster.newest.path;
                        return (
                          <li
                            key={member.path}
                            className={`mono folder-version${isNewest ? ' folder-version--newest' : ''}`}
                          >
                            {member.path}
                            {isNewest ? ' — newest' : ''}
                          </li>
                        );
                      })}
                    </ul>
                    {cluster.datedNewest ? null : (
                      <p className="body--sm dim">
                        These all carry the same modified date, so which one is current is not
                        something the files can tell you.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {map.oneAuthor.length || map.applications.length || map.stale.length ? (
            <Section id="folder-risk" title="Worth knowing" alt>
              <ul className="tool-findings">
                {map.oneAuthor.length ? (
                  <Finding level="error" where="Key person">
                    {plural(map.oneAuthor.length, 'file')} that other files depend on{' '}
                    {map.oneAuthor.length === 1 ? 'was' : 'were'} created and last saved by the same
                    name: {[...new Set(map.oneAuthor.map((f) => f.lastModifiedBy))].join(', ')}. No
                    second name appears in their properties.
                  </Finding>
                ) : null}

                {map.applications.length ? (
                  <Finding level="error" where="Not documents">
                    {plural(map.applications.length, 'workbook')}{' '}
                    {map.applications.length === 1 ? 'carries' : 'carry'} macros and{' '}
                    {map.applications.length === 1 ? 'reaches' : 'reach'} a database or{' '}
                    {map.applications.length === 1 ? 'feeds' : 'feed'} other files.{' '}
                    {map.applications.length === 1 ? 'That is an application' : 'Those are applications'},
                    and replacing {map.applications.length === 1 ? 'it' : 'them'} is a build.
                  </Finding>
                ) : null}

                {map.stale.length ? (
                  <Finding level="warn" where="Stale but load-bearing">
                    {plural(map.stale.length, 'file')} other workbooks still read from{' '}
                    {map.stale.length === 1 ? 'has' : 'have'} not been touched in over two years.
                  </Finding>
                ) : null}
              </ul>
            </Section>
          ) : null}
        </>
      ) : null}

      <section className="section section--rule" aria-labelledby="folder-why">
        <div className="container container--narrow stack stack--lg">
          <div className="stack stack--sm">
            <p className="eyebrow">Why this exists</p>
            <h2 className="h3" id="folder-why">
              Nobody drew this map, and everybody relies on it.
            </h2>
          </div>
          <p className="body">
            Shared drives grow the way cities do. One workbook starts pulling a number from
            another, someone copies it to make a version for a client, a report gets built on top,
            and five years later a dozen files quietly depend on one spreadsheet nobody has opened
            since the person who made it left.
          </p>
          <p className="body">
            Excel can show you the links in one open workbook. It cannot show you the shape of the
            whole folder, which is the only view that tells you what would actually break. This
            reads the folder and draws it.
          </p>
          <div className="cluster">
            <Link className="btn btn--primary" to="/contact">
              Talk about consolidating this
            </Link>
            <Link className="btn btn--ghost" to="/tools/workbook">
              Look inside one workbook
            </Link>
          </div>
          <p className="body muted">
            Built by {SITE.founder}. The scanner and the graph are plain JavaScript with unit tests
            and no dependencies —{' '}
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
      </section>
    </>
  );
}

/* ---------- small presentational pieces --------------------------------- */

function Fact({ label, value }) {
  return (
    <div className="tool-fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Section({ id, title, lede, alt, children }) {
  return (
    <section className={`section section--rule${alt ? ' section--alt' : ''}`} aria-labelledby={id}>
      <div className="container stack stack--lg">
        <div className="stack stack--sm">
          <h2 className="h3" id={id}>
            {title}
          </h2>
          {lede ? <p className="body muted">{lede}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

const LEVEL_LABEL = { error: 'Load-bearing', warn: 'Worth knowing', info: 'Noted' };

function Finding({ level, where, children }) {
  return (
    <li className={`tool-finding tool-finding--${level}`}>
      <span className={`tool-finding__level tool-finding__level--${level}`}>{LEVEL_LABEL[level]}</span>
      <div className="stack stack--xs">
        <p className="mono tool-finding__column">{where}</p>
        <p className="body">{children}</p>
      </div>
    </li>
  );
}
