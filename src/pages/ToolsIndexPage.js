import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, TOOLS } from '../data/site';

/* A contents page — so it opens on the contents. The tools are a numbered
   datasheet table, readable and clickable before anything is scrolled, and
   the title block is compressed to a single ruled line that carries the
   primary call to action beside it. The prose that used to sit in front of
   the list now sits under it, where it costs the arrival nothing. Composed
   entirely from the shared class vocabulary; this page has no CSS file of
   its own on purpose.

   The table is driven by TOOLS in data/site.js, so adding or removing a
   tool there is the whole change — nothing here counts them. */
export default function ToolsIndexPage() {
  return (
    <>
      <SEO
        title="Free tools"
        description="Free tools that run entirely in your browser: what is inside one workbook, which file a whole folder depends on, what moving off Access would involve, and the database a spreadsheet should have been. Nothing is uploaded."
        path="/tools"
      />

      <section className="section section--tight" aria-labelledby="tools-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer stack">
          {/* The title strip: ordinal, h1 and the call to action on one line.
              The h1 is deliberately not the largest thing here — the table is. */}
          <Reveal className="stack stack--sm">
            <div className="cluster cluster--between">
              <div className="cluster">
                <span className="ordinal">00</span>
                <h1 id="tools-title" className="h3">
                  Look at what you already have.
                </h1>
              </div>
              <Link className="btn btn--primary" to="/contact">
                Start a project
              </Link>
            </div>
            <hr className="datum" />
          </Reveal>

          {/* The payload. A drawing sheet's schedule: callout number, the
              thing, what it eats, what it tells you — one line each. */}
          <Reveal
            className="tool-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="The tools"
            delay={60}
          >
            <table className="tool-table tool-table--compact">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Number</span>
                    <span aria-hidden="true">#</span>
                  </th>
                  <th scope="col">Tool</th>
                  <th scope="col">Takes</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool, index) => (
                  <tr key={tool.path}>
                    <td className="mono">{String(index + 1).padStart(2, '0')}</td>
                    <th scope="row">
                      <Link className="link-arrow" to={tool.path}>
                        {tool.name}
                      </Link>
                    </th>
                    <td className="mono tool-ident">{tool.input}</td>
                    <td>{tool.headline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <p className="body">
            Tools built for our own work and left running in the browser — all of them for
            reading the systems an operation already runs on.
          </p>

          <p className="tool-note">
            Nothing is uploaded and there is no server to upload it to. Every one of them is
            plain JavaScript with unit tests, in the same repository as this site.
          </p>
        </div>
      </section>

      <section className="section section--rule section--alt" aria-labelledby="tools-why">
        <div className="container container--narrow stack stack--lg">
          <div className="tool-head">
            <span className="tool-head__mark">
              <span className="ordinal">01</span>
              <span className="mono tool-head__tag">Why these exist</span>
            </span>
            <h2 className="h3" id="tools-why">
              The first thing any of this work needs is a look at what is already there.
            </h2>
            <hr className="datum" />
          </div>

          <p className="body">
            Every project that starts with “we should replace the spreadsheet” runs into the same
            question a week later: what is actually in it, and what else depends on it. These are
            the checks we run at the start of that work, so it seemed worth making them something
            you can run yourself before deciding whether to call anyone.
          </p>
        </div>
      </section>

      {/* The closing band gets a section of its own, the way every other page
          on the site ends. .cta-block draws its own --line-heavy rule, and
          the section above has already spent its one datum. */}
      <section className="section section--tight section--rule">
        <div className="container container--narrow">
          <div className="cta-block">
            <div className="cluster">
              <Link className="btn btn--primary" to="/contact">
                Start a project
              </Link>
              <Link className="btn btn--ghost" to="/#engagement">
                How the work is structured
              </Link>
            </div>
            <p className="body muted">
              Built by {SITE.founder} —{' '}
              <a
                className="link-underline"
                href={`${SITE.github}/leducsystems`}
                target="_blank"
                rel="noopener noreferrer"
              >
                read the source on GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
