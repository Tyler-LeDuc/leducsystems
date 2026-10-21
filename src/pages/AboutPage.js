import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, RESPONSE_PROMISE } from '../data/site';
import './AboutPage.css';

function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`${SITE.founder} builds Leduc Try-On, AR makeup try-on for beauty brands, and small browser games. Based in ${SITE.city}, ${SITE.region}.`}
        path="/about"
      />

      {/* ── Front matter ───────────────────────────────────────────────────
          The arrival is the identity block itself: a drawing-sheet title
          block with the portrait in the left cell and the ruled facts, the
          compressed title and the primary action in the right. */}
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
                <span className="mono">{SITE.itchioHandle}</span>
              </figcaption>
            </figure>

            <div className="about-block__title">
              <p className="eyebrow">
                <span className="ordinal">00</span>
                <span>About</span>
              </p>
              <h1 className="about-block__h1">One person, building for the browser.</h1>
              <hr className="datum" />

              <dl className="about-block__facts">
                <div className="about-block__fact">
                  <dt>Ships as</dt>
                  <dd>{SITE.name}</dd>
                </div>
                <div className="about-block__fact">
                  <dt>Since</dt>
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
                      href={SITE.itchio}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      itch.io
                    </a>
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
                  <dt>Based in</dt>
                  <dd>
                    {SITE.city}, {SITE.region}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="about-block__foot">
              <p className="about-block__lede">
                I write software for a living, and {SITE.name} is what I ship on my own: Leduc
                Try-On for beauty brands, and small games under the handle {SITE.itchioHandle}.
              </p>
              <Link className="btn btn--primary" to="/tryon">
                See Leduc Try-On
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · Why ─────────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-why">
        <div className="container stack stack--lg">
          <Reveal className="grid grid--split">
            <div className="section-head">
              <p className="eyebrow">
                <span className="ordinal">01</span>
                <span>Why</span>
              </p>
              <h2 className="h2" id="about-why">
                Things I can finish myself
              </h2>
              <hr className="datum" />
            </div>

            <p className="body">
              Most of what I build professionally is scoped by someone else before I ever touch
              it. Here I get to own the whole thing: Leduc Try-On is my own AR makeup engine,
              and the games start from a single idea — one button, one
              feeling — and go from nothing to playable without a deadline that isn&rsquo;t mine.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · How ─────────────────────────────────────────────────────── */}
      <section className="section section--rule section--alt" aria-labelledby="about-how">
        <div className="container">
          <div className="grid grid--split">
            <Reveal className="section-head">
              <p className="eyebrow">
                <span className="ordinal">02</span>
                <span>How</span>
              </p>
              <h2 className="h2" id="about-how">
                Small on purpose.
              </h2>
              <hr className="datum" />
            </Reveal>

            <Reveal className="stack" delay={120}>
              <p className="body">
                Everything I make runs straight in the browser. No installers, no account walls,
                no download standing between the idea and someone actually using it.
              </p>
              <p className="body">
                For Try-On that also means privacy: the face tracking runs on the shopper&rsquo;s
                device, so nothing is uploaded. For the games it means {GAMES.length} of them,
                each small enough to finish before the idea gets boring.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · CTA ───────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-cta">
        <div className="container container--narrow">
          <Reveal className="cta-block">
            <p className="eyebrow">
              <span className="ordinal">03</span>
              <span>Next step</span>
            </p>
            <h2 className="h2" id="about-cta">
              Ask about Try-On, or just say hi.
            </h2>
            <p className="lede">I read every message myself.</p>
            <div className="cluster" role="group" aria-label="Contact options">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Get in touch
              </Link>
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

export default AboutPage;
