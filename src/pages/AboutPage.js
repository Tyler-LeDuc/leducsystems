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
        description={`${SITE.founder} makes small browser games under the handle ${SITE.itchioHandle} on itch.io. Based in ${SITE.city}, ${SITE.region}.`}
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
              <h1 className="about-block__h1">One person, a lot of small games.</h1>
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
                I write software for a living, and {SITE.name} is what happens to it after hours:
                small games, released under the handle {SITE.itchioHandle}.
              </p>
              <Link className="btn btn--primary" to="/#games">
                See the games
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
                Games are the part with no spec
              </h2>
              <hr className="datum" />
            </div>

            <p className="body">
              Most of what I build professionally is scoped by someone else before I ever touch
              it. A game gets to start from a single idea — one button, one feeling, something
              that happens in the first five seconds — and go from nothing to playable without a
              client, a stakeholder, or a deadline that isn&rsquo;t mine.
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
                {GAMES.length} games and counting, most of them built to a single constraint:
                small enough to finish before the idea gets boring. That keeps the failure rate
                low and the release rate high — if something doesn&rsquo;t work, the next one
                ships in days, not months.
              </p>
              <p className="body">
                Everything runs straight in the browser on itch.io. No installers, no account
                walls, no download standing between the idea and someone actually playing it.
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
              Say hi, or tell me what broke.
            </h2>
            <p className="lede">Comments are the best part of this job. I read all of them.</p>
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
