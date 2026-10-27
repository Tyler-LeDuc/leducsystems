import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, FEATURED_SLUGS } from '../data/site';
import './HomePage.css';

/* The games are a side project now; the site is about the tools. This page
   keeps the catalogue reachable without it competing with them on the home
   page. It reuses the home page's head, release and grid styles. */
const FEATURED = GAMES.filter((game) => FEATURED_SLUGS.includes(game.slug));
const REST = GAMES.filter((game) => !FEATURED_SLUGS.includes(game.slug));

export default function GamesPage() {
  return (
    <>
      <SEO
        title="Games"
        description={`Small browser games I make on the side, released on itch.io under the handle ${SITE.itchioHandle}.`}
        path="/games"
      />

      <section className="home-hero" aria-labelledby="games-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="home-hero__head">
            <p className="eyebrow">
              <span className="ordinal">00</span>
              <span>On the side</span>
            </p>
            <h1 id="games-title" className="h1 home-hero__title">
              Small browser games.
            </h1>
            <hr className="datum" />
            <div className="home-hero__brief">
              <p className="lede home-hero__lede">
                Besides the tools, I make small games that run in the browser. They&rsquo;re free on
                itch.io under the handle {SITE.itchioHandle}.
              </p>
              <div className="cluster home-hero__actions">
                <a
                  className="btn btn--ghost btn--lg"
                  href={SITE.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE.itchioHandle} on itch.io
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule section--alt" aria-labelledby="featured-title">
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

      <section className="section section--rule" aria-labelledby="games-all">
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
