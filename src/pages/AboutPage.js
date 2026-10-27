import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, RESPONSE_PROMISE } from '../data/site';
import './AboutPage.css';

function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`${SITE.founder} is the developer behind ${SITE.name}: software tools that open and convert files other software won't. Based in ${SITE.city}, ${SITE.region}.`}
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
                <span className="mono">Developer</span>
              </figcaption>
            </figure>

            <div className="about-block__title">
              <p className="eyebrow">
                <span className="ordinal">00</span>
                <span>About</span>
              </p>
              <h1 className="about-block__h1">One developer, a few sharp tools.</h1>
              <hr className="datum" />

              <dl className="about-block__facts">
                <div className="about-block__fact">
                  <dt>Company</dt>
                  <dd>{SITE.name} LLC</dd>
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
                I&rsquo;m {SITE.founder}, a software developer. {SITE.name} is my company: I
                build and sell tools that rescue files other software can&rsquo;t open.
              </p>
              <a className="btn btn--primary" href="/tools/">
                See the tools
              </a>
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
                Files outlive the software that made them
              </h2>
              <hr className="datum" />
            </div>

            <p className="body">
              Microsoft retired Publisher. PageMaker has been gone for years. Rhino moves its file
              format forward with every release. Each time, people are left holding files they
              made and can no longer open. I find those dead ends and build the tool that gets
              them out.
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
                Each tool does one job and runs in the browser: no installer, no account, no
                subscription. You see a free preview of your own file before you pay, and if a
                paid result doesn&rsquo;t work for you, I refund it.
              </p>
              <p className="body">
                When someone sends me a file a tool got wrong, I fix the tool for the next person.
                On the side I also make{' '}
                <Link className="link-underline" to="/games">
                  small browser games
                </Link>
                .
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
              Got a file nothing will open?
            </h2>
            <p className="lede">Tell me about it. Every message comes straight to me.</p>
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
