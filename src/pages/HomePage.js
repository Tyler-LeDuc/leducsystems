import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, PRINCIPLES, FAQ, TOOLS } from '../data/site';
import './HomePage.css';

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
              <span>Software by {SITE.founder}</span>
            </p>

            <h1 id="hero-title" className="display home-hero__title">
              {SITE.tagline}
            </h1>

            <hr className="datum" />

            <div className="home-hero__brief">
              <p className="lede home-hero__lede">{SITE.description}</p>

              <div className="cluster home-hero__actions">
                <a className="btn btn--primary btn--lg" href="/tools/">
                  Browse the tools
                </a>
                <Link className="btn btn--ghost btn--lg" to="/#how">
                  How they work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · Tools ─────────────────────────────────────────────────
          Static pages under /tools/, so plain <a> links, not <Link>. */}
      <section id="tools" className="section section--rule" aria-labelledby="tools-title">
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">01</span>
              <span>Tools</span>
            </p>
            <h2 id="tools-title" className="h2 home-head__title">
              Pick the file problem you have.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal as="ul" className="games-grid" delay={80}>
            {TOOLS.map((tool) => (
              <li className="card games-card" key={tool.slug}>
                <span className="pill games-card__genre">{tool.tag}</span>
                <h3 className="card__title games-card__title">
                  <a href={tool.url}>{tool.title}</a>
                </h3>
                <p className="card__body tools-card__problem">{tool.problem}</p>
                <p className="card__body games-card__blurb">{tool.blurb}</p>
                <a className="link-arrow games-card__link" href={tool.url}>
                  Open the tool
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal className="home-more" delay={120}>
            <a className="btn btn--ghost" href="/tools/">
              All tools and guides
            </a>
            <p className="body body--sm muted">
              Step-by-step guides for Publisher, PageMaker and PowerPoint live there too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · How they work ─────────────────────────────────────────── */}
      <section
        id="how"
        className="section section--rule section--alt"
        aria-labelledby="how-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">02</span>
              <span>{PRINCIPLES.eyebrow}</span>
            </p>
            <h2 id="how-title" className="h2 home-head__title">
              {PRINCIPLES.title}
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="home-clauses" delay={80}>
            {PRINCIPLES.body.map((line) => (
              <p className="home-clause" key={line.slice(0, 24)}>
                {line}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 05 · Questions ─────────────────────────────────────────────── */}
      <section
        id="faq"
        className="section section--tight section--rule"
        aria-labelledby="faq-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">03</span>
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
                      {item.id === 'games' && (
                        <p>
                          <Link
                            className="link-underline"
                            to="/games"
                            tabIndex={isOpen ? undefined : -1}
                          >
                            See the games
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Closing call to action ────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="container">
          <Reveal className="cta-block">
            <p className="ordinal">04</p>
            <h2 id="close-title" className="h2">
              Got a file nothing will open?
            </h2>
            <p className="lede">
              Tell me what it is, or what broke in one of the tools. Every message comes straight to
              me.
            </p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Get in touch
              </Link>
              <a className="btn btn--ghost btn--lg" href="/tools/">
                Browse the tools
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
