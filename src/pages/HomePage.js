import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, MAKES, FAQ, TRYON } from '../data/site';
import { track } from '../analytics';
import './HomePage.css';

const PILOT_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(`${TRYON.name} pilot`)}`;

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState([]);

  const toggleFaq = useCallback((id) => {
    setOpenFaq((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  return (
    <>
      <SEO path="/" />

      {/* ── 00 · Masthead ──────────────────────────────────────────────── */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="home-hero__head">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>{SITE.founder} · {SITE.city}, {SITE.regionShort}</span>
            </p>

            <h1 id="hero-title" className="display home-hero__title">
              {SITE.tagline}
            </h1>

            <hr className="datum" />

            <div className="home-hero__brief">
              <p className="lede home-hero__lede">{SITE.description}</p>

              <div className="cluster home-hero__actions">
                <Link className="btn btn--primary btn--lg" to="/tryon">
                  See Leduc Try-On
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/games">
                  Play the games
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · What I make ──────────────────────────────────────────── */}
      <section id="what" className="section section--rule" aria-labelledby="what-title">
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">01</span>
              <span>What I make</span>
            </p>
            <h2 id="what-title" className="h2 home-head__title">
              Two things, both in the browser.
            </h2>
            <hr className="datum" />
          </Reveal>

          <ul className="grid grid--2 list--plain">
            {MAKES.map((item, i) => (
              <Reveal as="li" className="card home-make" key={item.slug} delay={i * 80}>
                <p className="eyebrow">{item.eyebrow}</p>
                <h3 className="h3 card__title">{item.title}</h3>
                <p className="card__body">{item.body}</p>
                <Link className="link-arrow" to={item.path}>
                  {item.cta}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 04 · Questions ─────────────────────────────────────────────── */}
      <section
        id="faq"
        className="section section--tight section--rule"
        aria-labelledby="faq-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">02</span>
              <span>Questions</span>
            </p>
            <h2 id="faq-title" className="h2 home-head__title">
              The usual questions.
            </h2>
            <hr className="datum" />
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

      {/* ── 03 · Closing call to action ────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="container">
          <Reveal className="cta-block">
            <p className="ordinal">03</p>
            <h2 id="close-title" className="h2">
              Want try-on on your product pages?
            </h2>
            <p className="lede">{TRYON.steps[1]} Or just say hi — I read everything.</p>
            <div className="cluster">
              <a
                className="btn btn--primary btn--lg"
                href={PILOT_MAILTO}
                onClick={() => track('tryon_pilot_click', { location: 'home_close' })}
              >
                Ask about a pilot
              </a>
              <Link className="btn btn--ghost btn--lg" to="/contact">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
