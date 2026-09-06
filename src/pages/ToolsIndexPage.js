import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, TOOLS } from '../data/site';

/* Composed entirely from the shared class vocabulary — this page has no
   CSS file of its own on purpose. */
export default function ToolsIndexPage() {
  return (
    <>
      <SEO
        title="Free tools"
        description="Three free tools for looking at the spreadsheets an operation runs on: what is running inside one workbook, which file a whole folder depends on, and the database a spreadsheet should have been. All three run entirely in your browser and upload nothing."
        path="/tools"
      />

      <section className="tool-hero" aria-labelledby="tools-title">
        <div className="bg-glow" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="stack stack--lg">
            <div className="stack stack--sm">
              <p className="eyebrow">Free tools</p>
              <h1 id="tools-title" className="display">
                Look at what you already have.
              </h1>
              <p className="lede">
                Three tools for reading the spreadsheets an operation actually runs on, all of
                them running entirely in your browser.
              </p>
              <p className="body muted">
                Nothing is uploaded and there is no server to upload it to. Every one of them is
                plain JavaScript with unit tests, in the same repository as this site.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="tools-list">
        <div className="container stack stack--lg">
          <h2 className="sr-only" id="tools-list">
            The tools
          </h2>

          <div className="grid grid--3">
            {TOOLS.map((tool, index) => (
              <Reveal as="article" className="card card--interactive" key={tool.path} delay={index * 90}>
                <p className="card__index">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="card__title">{tool.headline}</h3>
                <p className="card__body">{tool.summary}</p>
                <p className="mono dim">Takes: {tool.input}</p>
                <Link className="link-arrow mt-auto" to={tool.path}>
                  {tool.name}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--rule section--alt" aria-labelledby="tools-why">
        <div className="container container--narrow stack stack--lg">
          <div className="stack stack--sm">
            <p className="eyebrow">Why these exist</p>
            <h2 className="h3" id="tools-why">
              The first thing any of this work needs is a look at what is already there.
            </h2>
          </div>
          <p className="body">
            Every project that starts with “we should replace the spreadsheet” runs into the same
            question a week later: what is actually in it, and what else depends on it. These are
            the checks we run at the start of that work, so it seemed worth making them something
            you can run yourself before deciding whether to call anyone.
          </p>
          <div className="cluster">
            <Link className="btn btn--primary" to="/contact">
              Start a project
            </Link>
            <Link className="btn btn--ghost" to="/services">
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
      </section>
    </>
  );
}
