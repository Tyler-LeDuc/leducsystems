import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import {
  SITE,
  PILLARS,
  HONESTY,
  PROCESS,
  DIFFERENTIATORS,
  TECH,
  FAQ,
  RESPONSE_PROMISE,
} from '../data/site';
import './HomePage.css';

/* The three questions a stranger asks first. The rest live on /services. */
const TEASER_IDS = ['new', 'ai-code', 'ownership'];
const TEASER_FAQ = TEASER_IDS.map((id) => FAQ.find((entry) => entry.id === id)).filter(Boolean);

export default function HomePage() {
  const [openId, setOpenId] = useState(TEASER_FAQ.length ? TEASER_FAQ[0].id : null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <>
      <SEO
        title="Software consultancy built around AI"
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
              <Link className="btn btn--ghost btn--lg" to="/services">
                See how I work
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
            <p className="eyebrow">The offer</p>
            <h2 id="offer-title" className="h2">
              Three parts, one practice.
            </h2>
            <p className="lede">
              AI shows up three times in this business: in how the software gets built, in what
              the software does once it is in front of users, and in the engineering that keeps
              that second part honest.
            </p>
          </Reveal>

          <div className="grid grid--3">
            {PILLARS.map((pillar, i) => (
              <Reveal
                as="article"
                className="card card--interactive home-pillar"
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

      {/* ── The honest section ─────────────────────────────────────────── */}
      <section className="section section--alt" aria-labelledby="honest-title">
        <div className="container">
          <Reveal className="home-honest">
            <div className="stack stack--lg">
              <div className="stack">
                <p className="eyebrow">{HONESTY.eyebrow}</p>
                <h2 id="honest-title" className="h1 home-honest__title">
                  {HONESTY.title}
                </h2>
              </div>

              <div className="home-honest__body">
                {HONESTY.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="cluster cluster--lg">
                <Link className="link-arrow" to="/services">
                  How the work is structured
                </Link>
                <Link className="link-arrow" to="/about">
                  Why this company exists
                </Link>
                <Link className="link-arrow" to="/contact">
                  Have the conversation
                </Link>
              </div>

              <p className="home-honest__sign">
                <strong>{SITE.founder}</strong>
                <span aria-hidden="true">·</span>
                {SITE.name}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How I work ─────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="process-title">
        <div className="container stack stack--xl">
          <Reveal className="section-head">
            <p className="eyebrow">How I work</p>
            <h2 id="process-title" className="h2">
              From the first call to the handover.
            </h2>
            <p className="lede">
              Every engagement runs the same four steps. You always know what happens next, what
              it costs, and what you walk away with if it stops here.
            </p>
          </Reveal>

          <ol className="home-process">
            {PROCESS.map((step, i) => (
              <Reveal as="li" className="home-step" key={step.step} delay={i * 90}>
                <p className="card__index">{step.step}</p>
                <h3 className="h4">{step.title}</h3>
                <p className="card__body">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why this instead of an agency ──────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="diff-title">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">Why this instead of an agency</p>
            <h2 id="diff-title" className="h2">
              What one person is actually better at.
            </h2>
            <p className="lede">
              Not everything — a large program of work wants a large team. These are the places
              where the small version wins outright.
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

      {/* ── FAQ teaser ─────────────────────────────────────────────────── */}
      <section className="section section--alt" aria-labelledby="faq-title">
        <div className="container grid grid--sidebar">
          <Reveal className="sticky-col">
            <div className="stack">
              <p className="eyebrow">Straight answers</p>
              <h2 id="faq-title" className="h2">
                The questions that come up first.
              </h2>
              <p className="body muted">
                These are the real objections to hiring a one-person shop. The rest of them,
                including scheduling and what happens if we stop, are answered on the services
                page.
              </p>
              <p>
                <Link className="link-arrow" to="/services">
                  Read the rest
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal as="div" delay={120}>
            {TEASER_FAQ.map((entry) => {
              const open = openId === entry.id;
              return (
                <div className="qa" data-open={open ? 'true' : 'false'} key={entry.id}>
                  <h3 className="qa__heading">
                    <button
                      type="button"
                      className="qa__q"
                      id={`faq-q-${entry.id}`}
                      aria-expanded={open}
                      aria-controls={`faq-a-${entry.id}`}
                      onClick={() => toggle(entry.id)}
                    >
                      <span>{entry.question}</span>
                      <span className="qa__sign" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className="qa__a"
                    id={`faq-a-${entry.id}`}
                    role="region"
                    aria-labelledby={`faq-q-${entry.id}`}
                    aria-hidden={!open}
                  >
                    <div>
                      <p>{entry.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── Closing call to action ─────────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="bg-glow" aria-hidden="true" />

        <div className="container container--narrow layer">
          <Reveal className="cta-block">
            <h2 id="close-title" className="h2">
              Tell me what you are trying to build.
            </h2>
            <p className="lede">
              Thirty minutes, no charge, and a straight answer about whether I am the right
              person for it. If I am not, I will say so on the call.
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
