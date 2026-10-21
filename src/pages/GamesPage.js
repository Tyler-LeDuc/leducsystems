import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, FEATURED_SLUGS, PHILOSOPHY } from '../data/site';
import './HomePage.css';

const FEATURED = GAMES.filter((game) => FEATURED_SLUGS.includes(game.slug));
const REST = GAMES.filter((game) => !FEATURED_SLUGS.includes(game.slug));

export default function GamesPage() {
  return (
    <>
      <SEO
        title="Games"
        description={`${GAMES.length} small, fast, one-button browser games by ${SITE.founder}, free on itch.io under the handle ${SITE.itchioHandle}.`}
        path="/games"
      />

      {/* ── 00 · What these are ────────────────────────────────────────── */}
      <section className="section games-front" aria-labelledby="games-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">00</span>
              <span>{SITE.itchioHandle} on itch.io</span>
            </p>
            <h1 id="games-title" className="h1 home-head__title">
              {PHILOSOPHY.title}
            </h1>
            <hr className="datum" />
          </Reveal>

          <Reveal className="home-clauses" delay={80}>
            {PHILOSOPHY.body.map((line) => (
              <p className="home-clause" key={line.slice(0, 24)}>
                {line}
              </p>
            ))}
          </Reveal>

          <div className="cluster">
            <a
              className="btn btn--primary btn--lg"
              href={SITE.itchio}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play on itch.io
            </a>
          </div>
        </div>
      </section>

      {/* ── 01 · Featured ──────────────────────────────────────────────── */}
      <section
        id="featured"
        className="section section--rule section--alt"
        aria-labelledby="featured-title"
      >
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">01</span>
              <span>Featured</span>
            </p>
            <h2 id="featured-title" className="h2 home-head__title">
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

      {/* ── 02 · Everything else ───────────────────────────────────────── */}
      <section id="all" className="section section--rule" aria-labelledby="games-all">
        <div className="container stack stack--lg">
          <Reveal className="home-head">
            <p className="eyebrow home-head__meta">
              <span className="ordinal">02</span>
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
    </>
  );
}
