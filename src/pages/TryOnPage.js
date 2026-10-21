import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, TRYON, RESPONSE_PROMISE } from '../data/site';
import './TryOnPage.css';

const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(`${TRYON.name} pilot`)}`;

function TryOnPage() {
  return (
    <>
      <SEO
        title={TRYON.name}
        description="Live AR makeup try-on for beauty product pages. Runs in the browser on the camera or a selfie; nothing is uploaded."
        path="/tryon"
      />

      {/* ── Front: pitch and the live demo ─────────────────────────────── */}
      <section className="section tryon-front" aria-labelledby="tryon-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>{TRYON.name}</span>
            </p>
            <h1 className="h1" id="tryon-title">
              {TRYON.title}
            </h1>
            <p className="lede">{TRYON.lede}</p>
            <div className="cluster" role="group" aria-label="Try-on actions">
              <a className="btn btn--primary btn--lg" href={MAILTO}>
                Ask about a pilot
              </a>
              <a
                className="btn btn--ghost btn--lg"
                href={TRYON.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the demo full screen
              </a>
            </div>
          </Reveal>

          <Reveal className="tryon-demo" delay={120}>
            <iframe
              className="tryon-demo__frame"
              src={TRYON.demoUrl}
              title={`${TRYON.name} live demo`}
              allow="camera; fullscreen"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* ── 01 · What it does ─────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="tryon-what">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">01</span>
              <span>What it does</span>
            </p>
            <h2 className="h2" id="tryon-what">
              A makeup counter in the product page.
            </h2>
            <hr className="datum" />
          </Reveal>

          <ul className="grid grid--3 list--plain">
            {TRYON.features.map((feature, i) => (
              <Reveal as="li" className="card" key={feature.title} delay={i * 60}>
                <h3 className="card__title">{feature.title}</h3>
                <p className="card__body">{feature.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 02 · Integration ──────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="tryon-how">
        <div className="container">
          <div className="grid grid--split">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="ordinal">02</span>
                <span>Integration</span>
              </p>
              <h2 className="h2" id="tryon-how">
                A few lines of code.
              </h2>
              <hr className="datum" />
              <p className="body">
                Point it at a container, pick camera or photo, and pass in a shade. Swapping
                shades is one call, so it hooks straight into your color swatches.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <pre className="tryon-code">
                <code className="code">{TRYON.snippet}</code>
              </pre>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · Getting started ──────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="tryon-cta">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <p className="eyebrow">
              <span className="ordinal">03</span>
              <span>Getting started</span>
            </p>
            <h2 className="h2" id="tryon-cta">
              Start with a free pilot.
            </h2>
            <ol className="list list--num tryon-steps">
              {TRYON.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="cluster" role="group" aria-label="Contact options">
              <a className="btn btn--primary btn--lg" href={MAILTO}>
                Ask about a pilot
              </a>
              <a className="btn btn--ghost btn--lg" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
            <p className="body--sm muted">{RESPONSE_PROMISE}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default TryOnPage;
