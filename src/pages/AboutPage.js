import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, APPROACH, RESPONSE_PROMISE } from '../data/site';
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

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="bg-glow" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">About</p>
            <h1 className="h1">Senior engineering, without the agency overhead.</h1>
            <p className="lede">
              {SITE.name} builds custom web and mobile software for companies that need it
              shipped, not staffed. You work directly with the engineer building it.
            </p>
          </Reveal>

          <Reveal className="cluster" delay={120}>
            <span className="pill">Founded {SITE.founded}</span>
            <span className="pill">
              {SITE.city}, {SITE.region}
            </span>
            <span className="pill">Remote across US time zones</span>
          </Reveal>
        </div>
      </section>

      {/* ── Who ────────────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-who">
        <div className="container">
          <div className="grid grid--sidebar">
            <Reveal
              as="aside"
              className="card card--feature sticky-col about-identity"
              aria-label={SITE.founder}
            >
              <img
                className="about-identity__photo"
                src="/images/tyler-leduc.jpg"
                alt={SITE.founder}
                width="660"
                height="660"
                loading="lazy"
                decoding="async"
              />
              <div className="stack stack--xs">
                <p className="about-identity__name">{SITE.founder}</p>
                <p className="mono">Founder</p>
              </div>
              <hr className="divider" />
              <dl className="about-identity__facts">
                <div>
                  <dt>Company</dt>
                  <dd>{SITE.name}</dd>
                </div>
                <div>
                  <dt>Founded</dt>
                  <dd>{SITE.founded}</dd>
                </div>
                <div>
                  <dt>Working</dt>
                  <dd>
                    {SITE.city}, {SITE.region} — remote-first, across US time zones
                  </dd>
                </div>
                <div>
                  <dt>Direct</dt>
                  <dd>
                    <a className="link-underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
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
              </dl>
            </Reveal>

            <Reveal className="stack" delay={100}>
              <div className="stack stack--sm">
                <p className="eyebrow">Who you are hiring</p>
                <h2 className="h2" id="about-who">
                  No handoff between the pitch and the build
                </h2>
              </div>

              <p className="body">
                At most firms, the person who understands your problem best is the person who
                sold you the work, and that person writes none of the code. Everything they
                learned has to survive a handoff. Most of it does not. Here, you explain the
                problem once, to the engineer who builds it.
              </p>

              <h3 className="h4 hi">What gets built</h3>
              <p className="body">
                Full-stack: the interface, the application behind it, the data model underneath,
                and the infrastructure it runs on. Java and Spring Boot, React and TypeScript,
                native iOS and Android, PostgreSQL, deployed on cloud accounts you own — with the
                monitoring and pipelines that keep it maintainable after handover.
              </p>
              <p className="body">
                AI is one line of work among several: assistants, retrieval over your own
                documents, extraction and classification, and the harder part behind them —
                evaluations, guardrails, fallbacks, and a human review path for the cases a model
                should not decide alone.
              </p>

              <h3 className="h4 hi">How the work runs</h3>
              <p className="body">
                Scope goes in writing before anything starts, including what is explicitly out.
                Work runs in short phases with something running on a real environment at the end
                of each week. You have repository access the entire time, and scope changes get
                re-quoted before the work happens.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why this exists ────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="about-why">
        <div className="container">
          <div className="grid grid--split">
            <Reveal className="stack stack--sm">
              <p className="eyebrow">Why this exists</p>
              <h2 className="h2" id="about-why">
                The leverage is real. This passes it on.
              </h2>
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

      {/* ── How the work runs ──────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-approach">
        <div className="container container--narrow stack stack--lg">
          <Reveal className="stack">
            <div className="stack stack--sm">
              <p className="eyebrow">{APPROACH.eyebrow}</p>
              <h2 className="h2" id="about-approach">
                {APPROACH.title}
              </h2>
            </div>

            {APPROACH.body.map((paragraph) => (
              <p className="body" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="panel stack" delay={120}>
            <h3 className="h4 hi">What every client gets</h3>
            <ul className="list">
              {CLIENT_TERMS.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="about-cta">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <div className="section-head section-head--center">
              <p className="eyebrow eyebrow--bare">Next step</p>
              <h2 className="h2" id="about-cta">
                Tell us what you are trying to build
              </h2>
              <p className="lede">
                Thirty minutes, no charge, and a straight answer about fit.
              </p>
            </div>
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
