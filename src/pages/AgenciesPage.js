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

/* /agencies is a rate card, so it opens on the rate. The first screenful is
   one bordered sheet: a title-block strip of standing facts, the figure at
   display scale in mono, and the h1 set small beside it with the lede and
   the contact action. Everything a buying agency needs to price us is above
   the fold; the sections below it are the detail, not the pitch.

   Almost all of it composes from the shared vocabulary in components.css.
   AgenciesPage.css adds only the parts a rate card needs that no other page
   does. */

export default function AgenciesPage() {
  return (
    <>
      <SEO
        title="For agencies"
        description="White-label development capacity for digital agencies. Java and Spring Boot, native iOS and Android, React, and legacy migrations — under your brand, on your process, at $95/hr. Based in Phoenix, Arizona."
        path="/agencies"
      />

      {/* ── The rate card ──────────────────────────────────────────────── */}
      <section className="section agencies-masthead">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="agencies-sheet">
            <ul className="agencies-stamp">
              <li className="eyebrow">
                <span className="ordinal">00</span>
                <span>{AGENCY.eyebrow}</span>
              </li>
              <li>Taking on subcontract work</li>
              <li>
                {SITE.city}, {SITE.regionShort}
              </li>
            </ul>

            <div className="agencies-sheet__body">
              <div className="agencies-rate">
                <p className="agencies-rate__figure">{AGENCY.rate}</p>
                <p className="agencies-rate__note">{AGENCY.rateNote}</p>
                <p className="agencies-rate__why">
                  Published for the same reason our project pricing is: you should be able to
                  tell whether we fit your margin without booking a call.
                </p>
              </div>

              <div className="agencies-sheet__title">
                <h1 className="agencies-sheet__h1">{AGENCY.title}</h1>
                <p className="lede agencies-sheet__lede">{AGENCY.lede}</p>
                <div className="cluster">
                  <Link className="btn btn--primary" to="/contact">
                    Start a project
                  </Link>
                  <a className="btn btn--ghost" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What gets handed over, and what does not ───────────────────── */}
      <section
        className="section section--tight section--rule"
        aria-labelledby="agency-work"
      >
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">01</span>
              <span>The work</span>
            </p>
            <h2 className="h2" id="agency-work">
              What agencies hand over most
            </h2>
            <hr className="datum" />
            <p className="body--sm muted">
              Roughly in order of how hard it is to staff in-house.
            </p>
          </Reveal>

          <div className="agencies-scope">
            <Reveal as="div" className="rows" delay={80}>
              {AGENCY_WORK.map((item, i) => (
                <div className="row" key={item.title}>
                  <div className="row__label">
                    <span className="ordinal ordinal--boxed">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="h4">{item.title}</h3>
                  </div>
                  <p className="row__body">{item.body}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="agencies-fit" delay={140}>
              <h3 className="h4 hi">Not a fit</h3>
              <ul className="list agencies-fit__list">
                {AGENCY_NOT_A_FIT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="body--sm muted">
                Said plainly so nobody spends a call finding out.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Terms ──────────────────────────────────────────────────────── */}
      <section
        className="section section--tight section--rule section--alt"
        aria-labelledby="agency-terms"
      >
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">02</span>
              <span>How it works</span>
            </p>
            <h2 className="h2" id="agency-terms">
              The parts agencies actually ask about
            </h2>
            <hr className="datum" />
          </Reveal>

          <div className="grid grid--2 agencies-terms">
            {AGENCY_TERMS.map((term, i) => (
              <Reveal as="article" className="card" key={term.title} delay={i * 60}>
                <span className="card__index">{String.fromCharCode(65 + i)}</span>
                <h3 className="card__title">{term.title}</h3>
                <p className="card__body">{term.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next step, with the trial run beside it ────────────────────── */}
      <section className="section section--tight section--rule">
        <div className="container">
          <div className="grid grid--split agencies-close">
            <Reveal className="cta-block">
              <div className="section-head">
                <p className="eyebrow">
                  <span className="ordinal">03</span>
                  <span>Next step</span>
                </p>
                <h2 className="h2">Tell us what you need covered</h2>
                <p className="lede">
                  Send the scope, the stack, and the deadline. You get a straight yes or no.
                </p>
              </div>
              <div className="cluster" role="group" aria-label="Contact options">
                <a className="btn btn--primary btn--lg" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                <Link className="btn btn--ghost btn--lg" to="/contact">
                  Use the form
                </Link>
              </div>
              <p className="body--sm muted">{RESPONSE_PROMISE}</p>
            </Reveal>

            <Reveal className="agencies-trial" delay={100}>
              <h3 className="h4 hi">Easiest way to find out is a small paid task</h3>
              <p className="body--sm muted">
                Client work sits under NDA, so the fastest read on whether this is worth your
                time is four to eight hours of real work at rate. If it comes back badly, you
                are out half a day.
              </p>
              <p className="body--sm muted">
                In the meantime, there is a working tool on this site you can try without
                talking to anyone, and the code behind this site is public.
              </p>
              <div className="cluster">
                <Link className="btn btn--ghost btn--sm" to="/tools/schema">
                  Try the schema tool
                </Link>
                <a
                  className="btn btn--ghost btn--sm"
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
