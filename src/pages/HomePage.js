import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import {
  SITE,
  PILLARS,
  DIFFERENTIATORS,
  TECH,
  RESPONSE_PROMISE,
} from '../data/site';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Custom software, web and mobile applications"
        description={SITE.description}
        path="/"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="bg-glow" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="stack stack--lg">
            <div className="stack">
              <p className="pill pill--accent">
                <span className="dot" aria-hidden="true" />
                Taking on new projects
              </p>

              <h1 id="hero-title" className="display home-hero__title">
                {SITE.tagline}
              </h1>

              <p className="lede home-hero__lede">{SITE.description}</p>
            </div>

            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
              </Link>
              {/* The tools are the cheapest way for a stranger to judge the
                  work before talking to anyone. Give them hero billing. */}
              <Link className="btn btn--ghost btn--lg" to="/tools/workbook">
                Try the free tool
              </Link>
            </div>
          </Reveal>

          <Reveal as="ul" className="home-hero__keys" delay={160}>
            {TECH.map((group) => (
              <li className="home-hero__key" key={group.group}>
                <span className="home-hero__key-label">{group.group}</span>
                <span className="home-hero__key-items">
                  {group.items.slice(0, 3).join(' · ')}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── The three-part offer ───────────────────────────────────────── */}
      <section className="section" aria-labelledby="offer-title">
        <div className="container stack stack--xl">
          <Reveal className="section-head">
            <p className="eyebrow">What gets built</p>
            <h2 id="offer-title" className="h2">
              Three lines of work.
            </h2>
            <p className="lede">
              Most projects are some mix of all three.
            </p>
          </Reveal>

          <div className="grid grid--3">
            {PILLARS.map((pillar, i) => (
              <Reveal
                as="article"
                className="card home-pillar"
                key={pillar.id}
                delay={i * 90}
              >
                <p className="card__index">{pillar.id}</p>
                <h3 className="card__title">{pillar.title}</h3>
                <p className="card__body">{pillar.summary}</p>
                <ul className="list home-pillar__list">
                  {pillar.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The tool ───────────────────────────────────────────────────── */}
      <section className="section section--alt" aria-labelledby="tool-band-title">
        <div className="container">
          <Reveal className="home-tool">
            <div className="stack stack--sm home-tool__copy">
              <p className="eyebrow">Free tools</p>
              <h2 id="tool-band-title" className="h2">
                Find out what your spreadsheet is really doing.
              </h2>
              <p className="body">
                One reads the macros, database connections and broken links hiding inside a
                workbook. The other turns a pasted spreadsheet into the Postgres schema it should
                have been. Both run in your browser — nothing is uploaded.
              </p>
              <div className="cluster">
                <Link className="btn btn--primary" to="/tools/workbook">
                  X-ray a workbook
                </Link>
                <Link className="btn btn--ghost" to="/tools/schema">
                  Spreadsheet to schema
                </Link>
              </div>
            </div>

            <pre className="home-tool__preview" aria-hidden="true">
              <code>{`This is an application.

[load-bearing] VBA project
  2,412 lines of code across
  9 modules.

[load-bearing] VBA project
  Talks to a database.

[load-bearing] External link
  Reads from a local drive.`}</code>
            </pre>
          </Reveal>
        </div>
      </section>

      {/* ── Why this instead of an agency ──────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="diff-title">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">Why Le Duc Systems</p>
            <h2 id="diff-title" className="h2">
              Built to move faster than an agency.
            </h2>
            <p className="lede">
              No account managers, no handoffs, no status decks.
            </p>
          </Reveal>

          <Reveal as="div" className="rows" delay={90}>
            {DIFFERENTIATORS.map((item, i) => (
              <div className="row" key={item.title}>
                <div className="home-diff__label">
                  <span className="card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{item.title}</h3>
                </div>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Closing call to action ─────────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="bg-glow" aria-hidden="true" />

        <div className="container container--narrow layer">
          <Reveal className="cta-block">
            <h2 id="close-title" className="h2">
              Tell us what you are trying to build.
            </h2>
            <p className="lede">
              Thirty minutes, no charge, and a straight answer about fit.
            </p>
            <div className="cluster cluster--center">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
              </Link>
            </div>
            <p className="body--sm muted">
              Or skip the form:{' '}
              <a className="link-underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
            <p className="body--sm dim">{RESPONSE_PROMISE}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
