import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, FEATURED_SLUGS, PHILOSOPHY, FAQ } from '../data/site';
import './HomePage.css';

const FEATURED = GAMES.filter((game) => FEATURED_SLUGS.includes(game.slug));
const REST = GAMES.filter((game) => !FEATURED_SLUGS.includes(game.slug));

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
              <span>{SITE.itchioHandle} on itch.io</span>
            </p>

            <h1 id="hero-title" className="display home-hero__title">
              {SITE.tagline}
            </h1>

            <hr className="datum" />

            <div className="home-hero__brief">
              <p className="lede home-hero__lede">{SITE.description}</p>

              <div className="cluster home-hero__actions">
                <Link className="btn btn--primary btn--lg" to="/#games">
                  See all {GAMES.length} games
                </Link>
                <a
                  className="btn btn--ghost btn--lg"
                  href={SITE.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play on itch.io
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · What these are ────────────────────────────────────────── */}
      <section id="what" className="section section--rule" aria-labelledby="what-title">
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">01</span>
              <span>{PHILOSOPHY.eyebrow}</span>
            </p>
            <h2 id="what-title" className="h2 home-head__title">
              {PHILOSOPHY.title}
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="home-clauses" delay={80}>
            {PHILOSOPHY.body.map((line) => (
              <p className="home-clause" key={line.slice(0, 24)}>
                {line}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 02 · Featured ──────────────────────────────────────────────── */}
      <section
        id="featured"
        className="section section--rule section--alt"
        aria-labelledby="latest-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">02</span>
              <span>Featured</span>
            </p>
            <h2 id="latest-title" className="h2 home-head__title">
              Play these two right here.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="home-releases" delay={80}>
            {FEATURED.map((game, index) => (
              <article className="home-release" key={game.slug}>
                <div className="home-release__meta">
                  <span className="ordinal">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="home-release__title">
                    <a
                      className="link-underline"
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {game.title}
                    </a>
                  </h3>
                  <p className="home-release__genre">{game.genre}</p>
                </div>
                <div className="home-release__embed">
                  <iframe
                    title={`${game.title} on itch.io`}
                    src={`https://itch.io/embed/${game.embedId}`}
                    height="167"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 03 · Everything else ──────────────────────────────────────────
          Full catalogue, moved here from the old standalone /games page —
          this is now one scrolling page, not two. */}
      <section
        id="games"
        className="section section--rule section--alt"
        aria-labelledby="games-all"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">03</span>
              <span>Everything else</span>
            </p>
            <h2 id="games-all" className="h2 home-head__title">
              The rest of the catalogue.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal as="ul" className="games-grid" delay={80}>
            {REST.map((game) => (
              <li className="card games-card" key={game.slug}>
                <span className="pill games-card__genre">{game.genre}</span>
                <h3 className="card__title games-card__title">{game.title}</h3>
                <p className="card__body games-card__blurb">{game.blurb}</p>
                <a
                  className="link-arrow games-card__link"
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play on itch.io
                </a>
              </li>
            ))}
          </Reveal>
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
              <span className="ordinal">04</span>
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

      {/* ── 05 · Closing call to action ────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="container">
          <Reveal className="cta-block">
            <p className="ordinal">05</p>
            <h2 id="close-title" className="h2">
              Say hi, or tell me what broke.
            </h2>
            <p className="lede">Comments are the best part of this job. I read all of them.</p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Get in touch
              </Link>
              <a
                className="btn btn--ghost btn--lg"
                href={SITE.itchio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.itchioHandle} on itch.io
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
