import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import {
  SITE,
  PILLARS,
  DIFFERENTIATORS,
  ENGAGEMENTS,
  PRICING_NOTE,
  PROCESS,
  TECH,
  FAQ,
  RESPONSE_PROMISE,
} from '../data/site';
import './HomePage.css';

/* Stable anchors for the three lines of work, so one of them can be linked
   directly from a proposal or an email. These ids moved here when /services
   was folded into the home page — the public links point at them and the
   retired /services route redirects into them. Do not rename. */
const PILLAR_ANCHORS = {
  '01': 'ship-the-application',
  '02': 'rescue-the-data',
  '03': 'ai-that-earns-its-place',
};

/* The sheet's own index. Each ordinal is the number the section carries in
   its heading block, so the page numbers itself. */
const CONTENTS = [
  { ordinal: '01', href: '#offer', label: 'What gets built' },
  { ordinal: '02', href: '#why', label: 'Why Le Duc Systems' },
  { ordinal: '03', href: '#engagement', label: 'Engagement models' },
  { ordinal: '04', href: '#process', label: 'Process' },
  { ordinal: '05', href: '#technology', label: 'Technology' },
  { ordinal: '06', href: '#tools', label: 'Free tools' },
  { ordinal: '07', href: '#faq', label: 'Questions' },
];

/* Technology groups are a parts schedule rather than a sequence, so they are
   lettered instead of numbered. */
const LETTERS = 'ABCDEF';

/* Sample output from the workbook x-ray, split a line at a time so the band
   can set it as a numbered listing — an excerpt off a datasheet rather than a
   screenshot of one. The words are the tool's own; only the framing is ours.
   A line opening with a bracketed flag is a finding, and is set in ink. */
const TOOL_SAMPLE = [
  'This is an application.',
  '',
  '[load-bearing] VBA project',
  '  2,412 lines of code across',
  '  9 modules.',
  '',
  '[load-bearing] VBA project',
  '  Talks to a database.',
  '',
  '[load-bearing] External link',
  '  Reads from a local drive.',
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState([]);

  const toggleFaq = useCallback((id) => {
    setOpenFaq((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  return (
    <>
      <SEO
        title="Custom software delivery, pricing, and process"
        description="Web and mobile applications, internal tools, and migrations off spreadsheets and legacy systems. Engagement models, prices, process, and the stack."
        path="/"
      />

      {/* ── 00 · Masthead ──────────────────────────────────────────────────
          The whole offer in one screenful: the statement, the way in, the
          three lines of work as a ruled strip, and the sheet's own index.
          Nothing here waits for a scroll. */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="home-hero__head">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>Taking on new projects</span>
            </p>

            <h1 id="hero-title" className="display home-hero__title">
              {SITE.tagline}
            </h1>

            <hr className="datum" />

            <div className="home-hero__brief">
              <p className="lede home-hero__lede">{SITE.description}</p>

              {/* The way in sits beside the statement, not at the foot of
                  the page. It is the first thing reachable after the title. */}
              <div className="cluster home-hero__actions">
                <Link className="btn btn--primary btn--lg" to="/contact">
                  Start a project
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/tools/workbook">
                  Try the free tool
                </Link>
              </div>
            </div>
          </Reveal>

          {/* The offer, at a glance: three numbered cells of one lattice,
              each one a link into its own clause below. */}
          <Reveal as="ul" className="home-offer" delay={110}>
            {PILLARS.map((pillar) => (
              <li key={pillar.id}>
                <a className="home-offer__link" href={`#${PILLAR_ANCHORS[pillar.id]}`}>
                  <span className="ordinal home-offer__num">{pillar.id}</span>
                  <span className="home-offer__label">{pillar.title}</span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal as="nav" delay={170} aria-label="Sections on this page">
            <ul className="home-contents">
              {CONTENTS.map((entry) => (
                <li key={entry.href}>
                  <a className="home-contents__link" href={entry.href}>
                    <span className="ordinal home-contents__num">{entry.ordinal}</span>
                    <span className="home-contents__label">{entry.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · What gets built ───────────────────────────────────────────
          Three ruled rows with boxed callouts, not three floating cards. */}
      <section id="offer" className="section home-anchor" aria-labelledby="offer-title">
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">01</span>
              <span>What gets built</span>
            </p>
            <h2 id="offer-title" className="h2 home-head__title">
              Three lines of work.
            </h2>
            <hr className="datum" />
            <p className="lede home-head__lede">
              Most projects are some mix of all three.
            </p>
          </Reveal>

          <div className="rows">
            {PILLARS.map((pillar, i) => (
              <Reveal
                as="article"
                className="row home-pillar home-anchor--row"
                key={pillar.id}
                id={PILLAR_ANCHORS[pillar.id]}
                delay={i * 60}
              >
                <div className="row__label">
                  <span className="ordinal ordinal--boxed">{pillar.id}</span>
                  <h3 className="h3">{pillar.title}</h3>
                </div>

                <div className="home-pillar__body">
                  <p className="row__body home-pillar__summary">{pillar.summary}</p>
                  <ul className="list home-pillar__list">
                    {pillar.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · Why Le Duc Systems ────────────────────────────────────────
          Four claims, four cells, one line of the lattice each. */}
      <section
        id="why"
        className="section section--tight section--rule home-anchor"
        aria-labelledby="why-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">02</span>
              <span>Why Le Duc Systems</span>
            </p>
            <h2 id="why-title" className="h2 home-head__title">
              Built to move faster than an agency.
            </h2>
            <hr className="datum" />
            <p className="lede home-head__lede">
              No account managers, no handoffs, no status decks.
            </p>
          </Reveal>

          <Reveal as="ul" className="home-cells home-cells--4" delay={80}>
            {DIFFERENTIATORS.map((item, i) => (
              <li className="home-cell" key={item.title}>
                <span className="ordinal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="home-cell__title">{item.title}</h3>
                <p className="home-cell__body">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 03 · Engagement models ─────────────────────────────────────────
          A ruled comparison table. Price, term and contents line up down a
          column so the three models can be read against each other rather
          than one after the other. */}
      <section
        id="engagement"
        className="section section--rule section--alt home-anchor"
        aria-labelledby="engagement-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">03</span>
              <span>Engagement models</span>
            </p>
            <h2 id="engagement-title" className="h2 home-head__title">
              Three ways to work together.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal delay={80}>
            {/* The roles are the native ones. They are written out because the
                table stacks to blocks below 860px, and display:block would
                otherwise strip the row and cell semantics with it. */}
            <table className="home-eng" role="table">
              {/* The rowgroup roles duplicate the implicit ones, which is
                  the point: below 860px the table stacks to blocks, and
                  display:block would otherwise take the rowgroup out of the
                  chain that makes the rows belong to the table. */}
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <thead role="rowgroup">
                <tr role="row">
                  <th role="columnheader" scope="col">Model</th>
                  <th role="columnheader" scope="col">Price</th>
                  <th role="columnheader" scope="col">Term</th>
                  <th role="columnheader" scope="col">What you get</th>
                </tr>
              </thead>
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <tbody role="rowgroup">
                {ENGAGEMENTS.map((model) => (
                  <tr role="row" key={model.id}>
                    <th role="rowheader" scope="row" data-label="Model">
                      <span className="home-eng__model">
                        <span className="ordinal ordinal--boxed">{model.id}</span>
                        <span className="home-eng__name">{model.name}</span>
                        <span className="home-eng__summary">{model.summary}</span>
                      </span>
                    </th>

                    <td role="cell" data-label="Price">
                      <span className="home-eng__price">{model.price}</span>
                    </td>

                    <td role="cell" data-label="Term">
                      <span className="home-eng__term">
                        <span className="mono home-eng__term-lead">{model.duration}</span>
                        <span className="mono">{model.shape}</span>
                      </span>
                    </td>

                    <td role="cell" data-label="What you get">
                      <ul className="list">
                        {model.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="home-eng__end">
                        <span className="mono">Ends with</span>
                        {model.outcome}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="home-pricing" delay={120}>
            <span className="ordinal">03.1</span>
            <div className="home-pricing__body">
              <p className="body">{PRICING_NOTE}</p>
              <Link className="link-arrow" to="/contact">
                Ask for a written estimate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Process ───────────────────────────────────────────────────
          Four steps across one line of the lattice, not four paragraphs. */}
      <section
        id="process"
        className="section section--tight section--rule home-anchor"
        aria-labelledby="process-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">04</span>
              <span>Process</span>
            </p>
            <h2 id="process-title" className="h2 home-head__title">
              How an engagement runs.
            </h2>
            <hr className="datum" />
            {/* One sentence, per the copy rules. The second one used to say
                you can stop after any step and keep what you have — which is
                the "exit" answer in the FAQ below, said twice. */}
            <p className="lede home-head__lede">
              The same four steps, in the same order, every time.
            </p>
          </Reveal>

          <Reveal as="ol" className="home-cells home-cells--4" delay={80}>
            {PROCESS.map((step) => (
              <li className="home-cell" key={step.step}>
                <span className="ordinal">{step.step}</span>
                <h3 className="home-cell__title">{step.title}</h3>
                <p className="home-cell__body">{step.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 05 · Technology ────────────────────────────────────────────────
          A parts schedule: lettered field, mono value, six cells of one
          lattice. Not a logo wall. */}
      <section
        id="technology"
        className="section section--tight section--rule home-anchor"
        aria-labelledby="tech-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">05</span>
              <span>Technology</span>
            </p>
            <h2 id="tech-title" className="h2 home-head__title">
              What we work with.
            </h2>
            <hr className="datum" />
            <p className="lede home-head__lede">
              Choices are made per project against what you already run, and the boring,
              well-understood option wins by default.
            </p>
          </Reveal>

          <Reveal as="ul" className="home-cells home-cells--3" delay={80}>
            {TECH.map((group, i) => (
              <li className="home-cell" key={group.group}>
                <span className="ordinal">{LETTERS[i]}</span>
                <h3 className="home-cell__title">{group.group}</h3>
                <p className="code home-cell__items">{group.items.join(' · ')}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 06 · The tools ─────────────────────────────────────────────────
          The pitch on the left, a numbered excerpt of real output on the
          right, so the claim is checkable without clicking through. */}
      <section
        id="tools"
        className="section section--tight section--rule section--alt home-anchor"
        aria-labelledby="tool-band-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">06</span>
              <span>Free tools</span>
            </p>
            <h2 id="tool-band-title" className="h2 home-head__title">
              Find out what your spreadsheet is really doing.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="home-tool" delay={80}>
            <div className="home-tool__copy">
              {/* The count and the list are the ones the /tools page itself
                  publishes. They said "three" here after a fourth tool
                  shipped, which is the kind of number this site cannot get
                  wrong — so both now read off the same description. */}
              <p className="body">
                Free tools that run entirely in your browser: what is inside one workbook, which
                file a whole folder depends on, what moving off Access would involve, and the
                database a spreadsheet should have been. Nothing is uploaded.
              </p>
              <div className="cluster">
                <Link className="btn btn--primary" to="/tools/workbook">
                  X-ray a workbook
                </Link>
                <Link className="btn btn--ghost" to="/tools">
                  All four tools
                </Link>
              </div>
            </div>

            <div className="home-spec" aria-hidden="true">
              {/* Lines repeat and carry no id, so position is the key. */}
              <ol className="home-spec__listing">
                {TOOL_SAMPLE.map((line, i) => (
                  <li
                    className="home-spec__line"
                    data-flag={line.startsWith('[') ? 'true' : undefined}
                    key={i}
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 · Questions ─────────────────────────────────────────────────
          Collapsed by default. The page has already made its case; this is
          the appendix for the reader who wants the objections answered. */}
      <section
        id="faq"
        className="section section--tight section--rule home-anchor"
        aria-labelledby="faq-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">07</span>
              <span>Questions</span>
            </p>
            <h2 id="faq-title" className="h2 home-head__title">
              The objections worth raising early.
            </h2>
            <hr className="datum" />
            {/* No lede. The one that was here — "the questions worth asking
                anyone you are about to hire" — restated the heading above it
                in different words, and the rows below answer for themselves. */}
          </Reveal>

          <Reveal delay={80}>
            {FAQ.map((item) => {
              const isOpen = openFaq.includes(item.id);
              return (
                <div className="qa" data-open={isOpen ? 'true' : 'false'} key={item.id}>
                  <h3 className="qa__heading">
                    <button
                      type="button"
                      className="qa__q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      id={`faq-question-${item.id}`}
                      onClick={() => toggleFaq(item.id)}
                    >
                      <span>{item.question}</span>
                      <span className="qa__sign" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className="qa__a"
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    aria-hidden={!isOpen}
                  >
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── 08 · Closing call to action ────────────────────────────────────
          A left-ranged band opened by its own heavy rule. */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="container">
          <Reveal className="cta-block">
            <p className="ordinal">08</p>
            <h2 id="close-title" className="h2">
              Tell us what you are trying to build.
            </h2>
            <p className="lede">
              Thirty minutes, no charge, and a straight answer about fit.
            </p>
            <div className="cluster">
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
            <p className="body--sm muted">{RESPONSE_PROMISE}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
