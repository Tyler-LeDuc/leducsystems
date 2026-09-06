import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import {
  SITE,
  PILLARS,
  ENGAGEMENTS,
  PRICING_NOTE,
  PROCESS,
  TECH,
  FAQ,
  RESPONSE_PROMISE,
} from '../data/site';

/* Stable anchors for the three pillars, so an individual line of work can be
   linked directly from a proposal or an email. */
const PILLAR_ANCHORS = {
  '01': 'ship-the-application',
  '02': 'rescue-the-data',
  '03': 'ai-that-earns-its-place',
};

/* When each pillar is the right call, and when it plainly is not. */
const PILLAR_FIT = {
  '01': {
    fit:
      'When you know roughly what has to exist — an internal tool, a customer-facing app, an integration between two systems that do not talk — and the constraint is engineering capacity.',
    notFit:
      'When requirements are still moving week to week, or nobody has decided what the software is for. Start with a Discovery Sprint instead.',
  },
  '02': {
    fit:
      'When the new system is not the hard part — the fifteen years of records are. Inconsistent dates, duplicate customers, a notes field holding three kinds of information. Also when two systems you already pay for have never been able to talk.',
    notFit:
      'When the data is small enough and clean enough that a careful afternoon would do it. Migration work earns its cost at volume and at mess.',
  },
  '03': {
    fit:
      'When a repetitive judgement call is buried in your operations — reading documents, triaging requests, drafting a first pass a human then edits — and the data a model needs already exists somewhere reachable. Also when a demo now has to survive real users.',
    notFit:
      'When the task has one correct answer that a query, a rule, or a well-designed form would produce. It is also premature if the underlying data is not accessible yet — that is a data project first.',
  },
};

/* Detail that does not fit on the home page version of the process. */
const PROCESS_DETAIL = {
  '01':
    'Bring whatever exists — a document, a spreadsheet, a half-built prototype, three paragraphs in an email. None of it needs to be tidy. You leave with an opinion about what to do next either way.',
  '02':
    'The proposal names the phases, what is explicitly out of scope, and what is needed from you and by when: access, data, decisions, and someone who can answer questions. Most projects that slip, slip on that last list.',
  '03':
    'Repository access from day one and a working environment you can click through every week. Anything harder than scoped gets raised the week it is found, with options, and re-quoted before the work happens.',
  '04':
    'Documentation written for whoever inherits it, a runbook for the things that fail at three in the morning, and a walkthrough with the person who will own it. Credentials and infrastructure were always yours.',
};

const JUMP_LINKS = [
  { href: '#offer', label: 'What we build' },
  { href: '#engagement', label: 'Engagement models' },
  { href: '#process', label: 'How it runs' },
  { href: '#technology', label: 'Technology' },
  { href: '#faq', label: 'Questions' },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState([]);

  const toggleFaq = useCallback((id) => {
    setOpenFaq((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  return (
    <>
      <SEO
        title="Services"
        description="Three lines of work: shipping web and mobile applications, migrating data off spreadsheets and legacy systems intact, and building AI features where they earn their place. Engagement models, pricing, process, and technology."
        path="/services"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="bg-glow" aria-hidden="true" />
        <div className="container layer stack stack--lg">
          <Reveal className="stack">
            <span className="eyebrow">Services</span>
            <h1 className="h1">A deliberately narrow offer</h1>
            <p className="lede">
              Three lines of work: ship the application, rescue the data, and add AI only where
              it earns its place. If what you need sits outside that, you will hear it on the
              first call.
            </p>
          </Reveal>

          <Reveal as="nav" className="services-jump" delay={90} aria-label="Sections on this page">
            <ul className="cluster">
              {JUMP_LINKS.map((link) => (
                <li key={link.href}>
                  <a className="pill services-jump__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── What I build ───────────────────────────────────────────────── */}
      <section id="offer" className="section section--rule services-anchor">
        <div className="container stack stack--xl">
          <Reveal className="section-head">
            <span className="eyebrow">What we build</span>
            <h2 className="h2">Three lines of work</h2>
            <p className="lede">
              Most engagements are the first two. The third comes up less often than the industry
              would like you to believe.
            </p>
          </Reveal>

          <div className="rows">
            {PILLARS.map((pillar, index) => (
              <Reveal
                as="article"
                key={pillar.id}
                id={PILLAR_ANCHORS[pillar.id]}
                className="row services-anchor"
                delay={index * 80}
              >
                <div className="sticky-col services-pillar__meta">
                  <span className="card__index">{pillar.id}</span>
                  <h3 className="h3">{pillar.title}</h3>
                </div>

                <div className="stack">
                  <p className="body">{pillar.summary}</p>

                  <div className="grid grid--2">
                    <div className="stack stack--sm">
                      <h4 className="mono">Deliverables</h4>
                      <ul className="list">
                        {pillar.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="stack stack--sm">
                      <h4 className="mono">Right fit when</h4>
                      <p className="body body--sm muted">{PILLAR_FIT[pillar.id].fit}</p>
                      <h4 className="mono">Not the right fit when</h4>
                      <p className="body body--sm muted">{PILLAR_FIT[pillar.id].notFit}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement models ──────────────────────────────────────────── */}
      <section id="engagement" className="section section--rule section--alt services-anchor">
        <div className="container stack stack--xl">
          <Reveal className="section-head">
            <span className="eyebrow">Engagement models</span>
            <h2 className="h2">Three ways to work together</h2>
            <p className="lede">
              Most work starts at 01. Nothing about starting there obliges you to continue
              to the next one, and each model ends at a point where stopping is a normal
              outcome rather than a negotiation.
            </p>
          </Reveal>

          <div className="grid grid--3">
            {ENGAGEMENTS.map((model, index) => (
              <Reveal
                as="article"
                key={model.id}
                className="card card--feature"
                delay={index * 80}
              >
                <span className="card__index">{model.id}</span>
                <h3 className="card__title">{model.name}</h3>

                <div className="cluster">
                  <span className="pill pill--accent">{model.duration}</span>
                  <span className="pill">{model.shape}</span>
                </div>

                <p className="services-engagement__price">{model.price}</p>

                <p className="card__body">{model.summary}</p>

                <div className="stack stack--sm">
                  <h4 className="mono">What you get</h4>
                  <ul className="list">
                    {model.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="stack stack--xs mt-auto services-engagement__end">
                  <h4 className="mono">Ends with</h4>
                  <p className="card__body">{model.outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="aside" className="panel stack" delay={120} aria-labelledby="pricing-title">
            <span className="eyebrow">Pricing</span>
            <h3 className="h3" id="pricing-title">
              Why some of these are numbers and some are not
            </h3>
            <p className="body">{PRICING_NOTE}</p>
            <p className="body muted">
              A fixed number for the build would have to be either high enough to cover the worst
              version of a project or low enough to be meaningless. Scope, the state of your data,
              how many decisions are already made, and how much of the integration surface you
              control move that figure far more than any feature list does.
            </p>
            <p className="body muted">
              So the exchange is simple. Describe what you are trying to do, and you get a
              written estimate with the scope it is attached to: what is included, what is
              not, and what would change it. If the honest answer is that the work does not
              need doing, that goes in writing too.
            </p>
            <div className="cluster">
              <Link className="link-arrow" to="/contact">
                Ask for a written estimate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────── */}
      <section id="process" className="section section--rule services-anchor">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <span className="eyebrow">Process</span>
            <h2 className="h2">How an engagement runs</h2>
            <p className="lede">
              The same four steps, in the same order, every time. The point of the order is
              that you can stop after any of them and still be holding something useful.
            </p>
          </Reveal>

          <div className="grid grid--2">
            {PROCESS.map((step, index) => (
              <Reveal
                as="article"
                key={step.step}
                className="card"
                delay={index * 70}
              >
                <span className="card__index">{step.step}</span>
                <h3 className="card__title">{step.title}</h3>
                <p className="card__body">{step.body}</p>
                <p className="card__body dim">{PROCESS_DETAIL[step.step]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology ─────────────────────────────────────────────────── */}
      <section id="technology" className="section section--rule section--alt services-anchor">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <span className="eyebrow">Technology</span>
            <h2 className="h2">What we work with</h2>
            <p className="lede">
              Choices are made per project against what you already run, and the boring,
              well-understood option wins by default.
            </p>
          </Reveal>

          <div className="grid grid--2">
            {TECH.map((group, index) => (
              <Reveal key={group.group} className="stack stack--sm" delay={index * 70}>
                <h3 className="h4">{group.group}</h3>
                <ul className="cluster">
                  {group.items.map((item) => (
                    <li className="pill" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section id="faq" className="section section--rule services-anchor">
        <div className="container container--narrow stack stack--lg">
          <Reveal className="section-head">
            <span className="eyebrow">Questions</span>
            <h2 className="h2">The objections worth raising early</h2>
            <p className="lede">
              The questions worth asking anyone you are about to hire.
            </p>
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

      {/* ── Call to action ─────────────────────────────────────────────── */}
      <section className="section section--tight section--rule">
        <div className="container">
          <Reveal className="panel cta-block">
            <span className="eyebrow eyebrow--bare">Next step</span>
            <h2 className="h2">Tell us what you are trying to build</h2>
            <p className="lede">
              Thirty minutes, no charge, no deck. If a Discovery Sprint is the right place to
              start, we will scope one. If the honest answer is that you do not need it, you
              will get that instead.
            </p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
              </Link>
              <a className="btn btn--ghost btn--lg" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
            <p className="cluster services-cta__note body--sm muted">
              <span className="dot" aria-hidden="true" />
              {RESPONSE_PROMISE}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
