import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, FEATURED_SLUGS } from '../data/site';
import './GamesPage.css';

const FEATURED = GAMES.filter((game) => FEATURED_SLUGS.includes(game.slug));
const REST = GAMES.filter((game) => !FEATURED_SLUGS.includes(game.slug));

export default function GamesPage() {
  return (
    <>
      <SEO
        title="Games"
        description={`Every game released on itch.io under the handle ${SITE.itchioHandle}. Free to play, right in the browser.`}
        path="/games"
      />

      <section className="section games-front">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>Games</span>
            </p>
            <h1 className="display" id="games-title">
              {GAMES.length} games, one handle.
            </h1>
            <hr className="datum" />
            <p className="lede">
              Everything here is free to play, runs right in the browser, and lives on itch.io
              under{' '}
              <a
                className="link-underline"
                href={SITE.itchio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.itchioHandle}
              </a>
              , in the order the store shows them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured ────────────────────────────────────────────────────────
          Real itch.io embed widgets for the two best-performing releases,
          by itch.io's own analytics (views/ratings/collections — see
          FEATURED_SLUGS in site.js). Every game below has a real embed id
          too — the rest link out to avoid a page of 47 stacked iframes,
          not because the embed is missing. */}
      <section className="section section--rule" aria-labelledby="games-featured">
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">01</span>
              <span>Featured</span>
            </p>
            <h2 className="h2" id="games-featured">
              Play these two right here.
            </h2>
            <hr className="datum" />
          </Reveal>

          <Reveal className="games-releases" delay={80}>
            {FEATURED.map((game, index) => (
              <article className="games-release" key={game.slug}>
                <div className="games-release__meta">
                  <span className="ordinal">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="games-release__title">
                    <a
                      className="link-underline"
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {game.title}
                    </a>
                  </h3>
                  <p className="games-release__genre">{game.genre}</p>
                  <p className="games-release__blurb">{game.blurb}</p>
                </div>
                <div className="games-release__embed">
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

      {/* ── Everything else ─────────────────────────────────────────────── */}
      <section
        className="section section--rule section--alt"
        aria-labelledby="games-all"
      >
        <div className="container stack stack--lg">
          <Reveal className="section-head">
            <p className="eyebrow">
              <span className="ordinal">02</span>
              <span>Everything else</span>
            </p>
            <h2 className="h2" id="games-all">
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

      <section className="home-close" aria-labelledby="games-close">
        <div className="container">
          <Reveal className="cta-block">
            <h2 id="games-close" className="h2">
              See everything, always current, on itch.io.
            </h2>
            <p className="lede">
              This page is a mirror of the store — the store is the source of truth.
            </p>
            <div className="cluster">
              <a
                className="btn btn--primary btn--lg"
                href={SITE.itchio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {SITE.itchioHandle} on itch.io
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
