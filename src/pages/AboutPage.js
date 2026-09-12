import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, APPROACH, RESPONSE_PROMISE, GAMES } from '../data/site';
import './AboutPage.css';

const CLIENT_TERMS = [
  'A first engagement small enough that walking away costs a week, not a quarter.',
  'Direct access to the engineer writing the code, for the whole engagement.',
  'Everything produced is yours from the first commit — repository, infrastructure, accounts.',
  RESPONSE_PROMISE,
];

function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`${SITE.name} builds custom web and mobile software. Founded ${SITE.founded} by ${SITE.founder} in ${SITE.city}, ${SITE.region}.`}
        path="/about"
      />

      {/* ── Front matter ───────────────────────────────────────────────────
          The arrival is the identity block itself: a drawing-sheet title
          block with the portrait in the left cell and the ruled facts, the
          compressed title and the primary action in the right. No headline
          screenful in front of it. */}
      <section className="section about-front">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="about-block">
            <figure className="about-block__portrait">
              <img
                className="about-block__photo"
                src="/images/tyler-leduc.jpg"
                alt={SITE.founder}
                width="660"
                height="660"
                decoding="async"
              />
              <figcaption className="about-block__id">
                <span className="about-block__name">{SITE.founder}</span>
                <span className="mono">Founder</span>
              </figcaption>
            </figure>

            <div className="about-block__title">
              <p className="eyebrow">
                <span className="ordinal">00</span>
                <span>About</span>
              </p>
              <h1 className="about-block__h1">
                Senior engineering, without the agency overhead.
              </h1>
              <hr className="datum" />

              <dl className="about-block__facts">
                <div className="about-block__fact">
                  <dt>Company</dt>
                  <dd>{SITE.name}</dd>
                </div>
                <div className="about-block__fact">
                  <dt>Founded</dt>
                  <dd>{SITE.founded}</dd>
                </div>
                <div className="about-block__fact">
                  <dt>Direct</dt>
                  <dd>
                    <a className="link-underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="about-block__fact">
                  <dt>Elsewhere</dt>
                  <dd className="cluster">
                    <a
                      className="link-underline"
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      className="link-underline"
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </dd>
                </div>
                <div className="about-block__fact about-block__fact--wide">
                  <dt>Working</dt>
                  <dd>
                    {SITE.city}, {SITE.region} — remote-first, across US time zones
                  </dd>
                </div>
              </dl>
            </div>

            <div className="about-block__foot">
              <p className="about-block__lede">
                {SITE.name} builds custom web and mobile software for companies that need it
                shipped, not staffed.
              </p>
              <Link className="btn btn--primary" to="/contact">
                Start a project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · Who ─────────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-who">
        <div className="container stack stack--lg">
          <Reveal className="grid grid--split">
            <div className="section-head">
              <p className="eyebrow">
                <span className="ordinal">01</span>
                <span>Who you are hiring</span>
              </p>
              <h2 className="h2" id="about-who">
                No handoff between the pitch and the build
              </h2>
              <hr className="datum" />
            </div>

            <p className="body">
              At most firms, the person who understands your problem best is the person who
              sold you the work, and that person writes none of the code. Everything they
              learned has to survive a handoff. Most of it does not. Here, you explain the
              problem once, to the engineer who builds it.
            </p>
          </Reveal>

          <Reveal className="rows" delay={80}>
            <div className="row">
              <div className="row__label">
                <span className="ordinal">A</span>
                <h3 className="about-rowhead">What gets built</h3>
              </div>
              <div className="stack stack--sm">
                <p className="row__body">
                  Full-stack: the interface, the application behind it, the data model
                  underneath, and the infrastructure it runs on. Java and Spring Boot, React
                  and TypeScript, native iOS and Android, PostgreSQL, deployed on cloud
                  accounts you own — with the monitoring and pipelines that keep it
                  maintainable after handover.
                </p>
                <p className="row__body">
                  AI is one line of work among several: assistants, retrieval over your own
                  documents, extraction and classification, and the harder part behind them —
                  evaluations, guardrails, fallbacks, and a human review path for the cases a
                  model should not decide alone.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="row__label">
                <span className="ordinal">B</span>
                <h3 className="about-rowhead">How the work runs</h3>
              </div>
              <p className="row__body">
                Scope goes in writing before anything starts, including what is explicitly
                out. Work runs in short phases with something running on a real environment
                at the end of each week. You have repository access the entire time, and
                scope changes get re-quoted before the work happens.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · Why this exists ───────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="about-why">
        <div className="container">
          <div className="grid grid--split">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="ordinal">02</span>
                <span>Why this exists</span>
              </p>
              <h2 className="h2" id="about-why">
                The leverage is real. This passes it on.
              </h2>
              <hr className="datum" />
              <p className="about-statement">
                Software costs what it costs largely because of the organization delivering it.
              </p>
            </Reveal>

            <Reveal className="stack" delay={120}>
              <p className="body">
                Modern tooling has genuinely changed how much a focused engineering effort can
                carry — not by writing software on its own, but by removing the parts of the job
                that were never the hard part. The judgment, the architecture, and the decision
                about what not to build are unchanged, and still where projects succeed or fail.
              </p>
              <p className="body">
                Most firms that adopted these tools kept the difference. {SITE.name} hands it to
                you instead, as smaller engagements, shorter timelines, and a direct line to the
                person doing the work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · How the work runs ─────────────────────────────────────────
          The approach set as three clauses across a lattice — read at a
          glance, not down a column. */}
      <section className="section section--rule" aria-labelledby="about-approach">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">03</span>
              <span>{APPROACH.eyebrow}</span>
            </p>
            <h2 className="h2" id="about-approach">
              {APPROACH.title}
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="about-clauses" delay={80}>
            {APPROACH.body.map((paragraph) => (
              <p className="about-clause" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="about-terms" delay={120}>
            <h3 className="about-terms__title">What every client gets</h3>
            <ul className="list list--num about-terms__list">
              {CLIENT_TERMS.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Side work ─────────────────────────────────────────────────
          Shipped games, listed as a register of releases. The itch.io embeds
          are the real store widgets — the entry beside each one carries only
          facts (title, handle, link). No ratings or download counts: those
          would be outcome metrics, which this site does not publish. */}
      <section className="section section--rule section--alt" aria-labelledby="about-side">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">04</span>
              <span>Side work</span>
            </p>
            <h2 className="h2" id="about-side">
              Games, shipped under another name
            </h2>
            <hr className="datum" />
            <p className="lede">
              Small games released on itch.io as <span className="code">raxeris</span>. Not
              consultancy work, but the same habit: finish it and put it where people can
              actually play it.
            </p>
          </Reveal>

          <Reveal className="about-releases" delay={80}>
            {GAMES.map((game, index) => (
              <article className="about-release" key={game.slug}>
                <div className="about-release__meta">
                  <span className="ordinal">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="about-release__title">
                    <a className="link-underline" href={game.url}>
                      {game.title}
                    </a>
                  </h3>
                  <p className="about-release__handle">itch.io / raxeris</p>
                </div>
                <div className="about-release__embed">
                  <iframe
                    title={`${game.title} on itch.io`}
                    src={`https://itch.io/embed/${game.embedId}`}
                    height="167"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 05 · CTA ───────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-cta">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <p className="eyebrow">
              <span className="ordinal">05</span>
              <span>Next step</span>
            </p>
            <h2 className="h2" id="about-cta">
              Tell us what you are trying to build
            </h2>
            <p className="lede">Thirty minutes, no charge, and a straight answer about fit.</p>
            <div className="cluster" role="group" aria-label="Contact options">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
              </Link>
              <a className="btn btn--ghost btn--lg" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
