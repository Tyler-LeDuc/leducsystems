import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, DIFFERENTIATORS, HONESTY, RESPONSE_PROMISE } from '../data/site';
import './AboutPage.css';

const EARLY_CLIENT_TERMS = [
  'A first engagement small enough that walking away costs you a week, not a quarter.',
  'Direct access to the person writing the code, for the whole engagement.',
  'Everything produced is yours from the first commit — repository, infrastructure, accounts.',
  RESPONSE_PROMISE,
];

function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`${SITE.name} is a one-person software consultancy founded in ${SITE.founded} by ${SITE.founder}. One engineer, direct access, and no invented credentials.`}
        path="/about"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="bg-glow" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">About</p>
            <h1 className="h1">
              One engineer. Founded {SITE.founded}.
            </h1>
            <p className="lede">
              {SITE.name} is one person: {SITE.founder}. That is not a stage the company is
              trying to grow out of — it is the product. You talk to whoever writes the code,
              from the first call to the last deploy.
            </p>
          </Reveal>

          <Reveal className="cluster" delay={120}>
            <span className="pill">Headcount: one</span>
            <span className="pill">Founded {SITE.founded}</span>
            <span className="pill">Remote-first, US-based</span>
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
                <p className="mono">Founder, and the engineer</p>
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
                  <dt>Headcount</dt>
                  <dd>One</dd>
                </div>
                <div>
                  <dt>Working</dt>
                  <dd>Remote-first, US-based, across US time zones</dd>
                </div>
                <div>
                  <dt>Direct</dt>
                  <dd>
                    <a className="link-underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="stack" delay={100}>
              <div className="stack stack--sm">
                <p className="eyebrow">Who you are hiring</p>
                <h2 className="h2" id="about-who">
                  I am the whole company, on purpose
                </h2>
              </div>

              <p className="body">
                There is no delivery team behind me and no bench of contractors introduced after
                the contract is signed. When you buy software from a firm, the person who
                understands your problem best is usually the person who sold you the work, and
                that person writes none of the code. Everything they learned about your business
                has to survive a handoff. Most of it does not.
              </p>
              <p className="body">
                I removed that gap by removing the layer that creates it. You explain the problem
                once, to the person who will be building the thing, and the same person is
                accountable for what happens when it meets real users.
              </p>

              <h3 className="h4 hi">What I actually do</h3>
              <p className="body">
                I work across the whole stack rather than one slice of it: the interface, the
                application behind it, the data model underneath, the infrastructure it runs on,
                and the language-model features wired through all of it. In practice that is
                TypeScript and React on the front, Node and Python behind it, PostgreSQL and
                vector stores for data, and deployment on cloud infrastructure you own, with the
                monitoring and pipelines that make it maintainable after I leave.
              </p>
              <p className="body">
                The AI work is not a separate department either. I build assistants, retrieval
                over a company&rsquo;s own documents, extraction and classification, and agents
                that complete multi-step tasks — and then the harder part: evaluations,
                guardrails, fallbacks, cost and latency control, and a human review path for the
                cases a model should not decide alone.
              </p>

              <h3 className="h4 hi">How I work</h3>
              <p className="body">
                Scope goes in writing before anything starts, including what is explicitly out.
                Work runs in short phases, and there is something running on a real environment
                at the end of each week rather than a status document. You have access to the
                repository the entire time. When scope changes, it gets re-quoted before the work
                happens.
              </p>
              <p className="body">
                I use AI tooling heavily and deliberately, which is a large part of why one
                person can move at this pace. I read, test, and understand every line before it
                ships. I am accountable for the output exactly as I would be if I had typed every
                character of it.
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
                The leverage is real. This is an attempt to pass it on.
              </h2>
              <p className="about-statement">
                One accountable engineer can now deliver what used to take a team. Someone should
                price that honestly.
              </p>
            </Reveal>

            <Reveal className="stack" delay={120}>
              <p className="body">
                Most companies buying software get a sales team first, and then a rotating cast of
                engineers they never chose and never interviewed. The relationship they were sold
                is not the relationship they get. Cost is set by the size of the organization
                delivering the work, and a lot of that organization exists to coordinate itself.
              </p>
              <p className="body">
                Meanwhile, AI has genuinely changed how much one competent engineer can carry.
                Not by writing software on its own — that is still not what happens — but by
                removing the parts of the job that were never the hard part. The judgment, the
                architecture, the decision about what not to build: those are unchanged, and they
                are still where projects succeed or fail.
              </p>
              <p className="body">
                Firms that adopted these tools mostly kept the difference. {SITE.name} is an
                attempt to hand it to the client instead, as smaller engagements, shorter
                timelines, and a direct line to the person doing the work. If that stops being
                true, the reason to hire me stops with it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The honest state of things ─────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-honest">
        <div className="container container--narrow stack stack--lg">
          <Reveal className="stack">
            <div className="stack stack--sm">
              <p className="eyebrow">{HONESTY.eyebrow}</p>
              <h2 className="h2" id="about-honest">
                {HONESTY.title}
              </h2>
            </div>

            {HONESTY.body.map((paragraph) => (
              <p className="body" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}

            <p className="body">
              I am aware of how that reads next to a page of logos. I am also aware that a
              meaningful share of those pages are decorated with work the firm barely touched, and
              that every consultancy that now has a portfolio spent a stretch not having one. This
              is that stretch, described accurately.
            </p>
          </Reveal>

          <Reveal className="panel stack" delay={120}>
            <h3 className="h4 hi">What an early client gets in exchange</h3>
            <ul className="list">
              {EARLY_CLIENT_TERMS.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
            <p className="body body--sm muted">
              None of that is a discount for being patient with a beginner. It is the shape of the
              company, and it is the part most consultancies stop offering once they are big enough
              to stop needing to.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-principles">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">Principles</p>
            <h2 className="h2" id="about-principles">
              Commitments, not values
            </h2>
            <p className="lede">
              These are the things you can hold me to. Each one is checkable during an engagement,
              which is the only kind of principle worth publishing.
            </p>
          </Reveal>

          <div className="rows">
            {DIFFERENTIATORS.map((item, index) => (
              <Reveal className="row" key={item.title} delay={80 + index * 60}>
                <div className="stack stack--xs">
                  <span className="card__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h4 hi">{item.title}</h3>
                </div>
                <p className="body">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="about-cta">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <div className="section-head section-head--center">
              <p className="eyebrow eyebrow--bare">Next step</p>
              <h2 className="h2" id="about-cta">
                Tell me what you are trying to build
              </h2>
              <p className="lede">
                Thirty minutes, no charge, and a straight answer about whether I am the right
                person for it. Sometimes the answer is no, and you will hear that too.
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
