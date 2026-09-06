import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import {
  SITE,
  AGENCY,
  AGENCY_TERMS,
  AGENCY_WORK,
  AGENCY_NOT_A_FIT,
  RESPONSE_PROMISE,
} from '../data/site';
import './AgenciesPage.css';

/* Composed almost entirely from the shared class vocabulary in
   components.css; AgenciesPage.css carries a single layout rule. */

export default function AgenciesPage() {
  return (
    <>
      <SEO
        title="For agencies"
        description="White-label development capacity for digital agencies. Java and Spring Boot, native iOS and Android, React, and legacy migrations — under your brand, on your process, at $95/hr. Based in Phoenix, Arizona."
        path="/agencies"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="bg-glow" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">{AGENCY.eyebrow}</p>
            <h1 className="h1">{AGENCY.title}</h1>
            <p className="lede">{AGENCY.lede}</p>
          </Reveal>

          <Reveal className="cluster" delay={120}>
            <span className="pill pill--accent">
              <span className="dot" aria-hidden="true" />
              Taking on subcontract work
            </span>
            <span className="pill">{AGENCY.rate}</span>
            <span className="pill">
              {SITE.city}, {SITE.regionShort}
            </span>
          </Reveal>
        </div>
      </section>

      {/* ── What gets handed over ──────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="agency-work">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">The work</p>
            <h2 className="h2" id="agency-work">
              What agencies hand over most
            </h2>
            <p className="lede">Roughly in order of how hard it is to staff in-house.</p>
          </Reveal>

          <Reveal as="div" className="rows" delay={90}>
            {AGENCY_WORK.map((item, i) => (
              <div className="row" key={item.title}>
                <div className="agencies-work__label">
                  <span className="card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{item.title}</h3>
                </div>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Terms ──────────────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="agency-terms">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 className="h2" id="agency-terms">
              The parts agencies actually ask about
            </h2>
          </Reveal>

          <div className="grid grid--2">
            {AGENCY_TERMS.map((term, i) => (
              <Reveal as="article" className="card" key={term.title} delay={i * 80}>
                <h3 className="card__title">{term.title}</h3>
                <p className="card__body">{term.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rate and fit ───────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="agency-rate">
        <div className="container">
          <div className="grid grid--split">
            <Reveal className="stack stack--sm">
              <p className="eyebrow">Rate</p>
              <h2 className="h2" id="agency-rate">
                {AGENCY.rate}
              </h2>
              <p className="body">{AGENCY.rateNote}</p>
              <p className="body muted">
                Published for the same reason our project pricing is: you should be able to tell
                whether we fit your margin without booking a call.
              </p>
            </Reveal>

            <Reveal className="panel stack" delay={120}>
              <h3 className="h4 hi">Not a fit</h3>
              <ul className="list">
                {AGENCY_NOT_A_FIT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body body--sm muted">
                Said plainly so nobody spends a call finding out.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="agency-proof">
        <div className="container container--narrow stack stack--lg">
          <Reveal className="stack stack--sm">
            <p className="eyebrow">Judging the work</p>
            <h2 className="h2" id="agency-proof">
              Easiest way to find out is a small paid task
            </h2>
            <p className="body">
              Client work sits under NDA, so the fastest read on whether this is worth your time
              is four to eight hours of real work at rate. If it comes back badly, you are out
              half a day.
            </p>
            <p className="body">
              In the meantime, there is a working tool on this site you can try without talking
              to anyone, and the code behind this site is public.
            </p>
          </Reveal>

          <Reveal className="cluster" delay={100}>
            <Link className="btn btn--ghost" to="/tools/schema">
              Try the schema tool
            </Link>
            <a
              className="btn btn--ghost"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section section--tight section--rule">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <div className="section-head section-head--center">
              <p className="eyebrow eyebrow--bare">Next step</p>
              <h2 className="h2">Tell us what you need covered</h2>
              <p className="lede">
                Send the scope, the stack, and the deadline. You get a straight yes or no.
              </p>
            </div>
            <div className="cluster cluster--center" role="group" aria-label="Contact options">
              <a className="btn btn--primary btn--lg" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <Link className="btn btn--ghost btn--lg" to="/contact">
                Use the form
              </Link>
            </div>
            <p className="body--sm dim">{RESPONSE_PROMISE}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
