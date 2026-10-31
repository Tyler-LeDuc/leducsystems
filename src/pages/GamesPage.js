import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, FEATURED_SLUGS } from '../data/site';
import './GamesPage.css';

/* The games are a side project next to the products. The two in
   FEATURED_SLUGS get a live itch.io embed; the rest link to their store
   pages, so the page doesn't stack dozens of iframes. */
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

      <section className="page-head" aria-labelledby="games-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer">
          <Reveal className="page-head__inner">
            <p className="eyebrow">Games · On the side</p>
            <h1 id="games-title" className="h1 page-head__title">
              Small browser games.
            </h1>
            <p className="lede page-head__lede">
              Next to the products, I make small games that run in the browser. All{' '}
              {GAMES.length} are free on itch.io under the name {SITE.itchioHandle}.
            </p>
            <div className="cluster">
              <a
                className="btn btn--primary"
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

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <Reveal className="section-head games-head">
            <p className="eyebrow">Featured</p>
            <h2 id="featured-title" className="h2">
              Play these two right here.
            </h2>
          </Reveal>

          <Reveal className="releases" delay={80}>
            {FEATURED.map((game) => (
              <article className="release" key={game.slug}>
                <div className="release__meta">
                  <span className="mono">{game.genre}</span>
                  <h3 className="release__title">
                    <a href={game.url} target="_blank" rel="noopener noreferrer">
                      {game.title}
                    </a>
                  </h3>
                  <p className="release__blurb">{game.blurb}</p>
                </div>
                <div className="release__embed">
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

      <section className="section section--alt section--rule" aria-labelledby="games-all">
        <div className="container">
          <Reveal className="section-head games-head">
            <p className="eyebrow">Catalogue</p>
            <h2 id="games-all" className="h2">
              Everything else.
            </h2>
          </Reveal>

          <Reveal as="ul" className="catalogue" delay={80}>
            {REST.map((game) => (
              <li className="catalogue__item" key={game.slug}>
                <a
                  className="catalogue__link"
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="catalogue__top">
                    <span className="catalogue__title">{game.title}</span>
                    <span className="mono">{game.genre}</span>
                  </span>
                  <span className="catalogue__blurb">{game.blurb}</span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
