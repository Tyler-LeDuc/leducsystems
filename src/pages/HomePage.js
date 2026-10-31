import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ProductVisual from '../components/ProductVisual';
import {
  SITE,
  HOME,
  FEATURED_PRODUCTS,
  MORE_PRODUCTS,
  PRINCIPLES,
  FAQ,
  GAMES,
  RESPONSE_PROMISE,
} from '../data/site';
import './HomePage.css';

/* Product pages are static files under /tools/, outside the router, so every
   link to them is a plain <a href>, never <Link>. */

/* The hero's index of everything live, in the order the page presents it. */
const REGISTER = [
  ...FEATURED_PRODUCTS.map((p) => ({
    key: p.slug,
    name: p.name,
    category: p.category.split(' · ')[0],
    href: `#${p.slug}`,
  })),
  { key: 'tax', name: '1099 IRIS tools', category: 'Tax filing', href: '#more' },
  { key: 'infopath', name: 'InfoPath to Excel', category: 'SharePoint', href: '#more' },
  { key: 'games', name: `${GAMES.length} browser games`, category: 'Games', href: '#games' },
];

function FeaturedProduct({ product, index }) {
  const headingId = `product-${product.slug}`;
  return (
    <article
      id={product.slug}
      className={`product${index % 2 === 1 ? ' product--flip' : ''}`}
      aria-labelledby={headingId}
    >
      <Reveal className="product__text">
        <p className="eyebrow">
          <span className="ordinal">{String(index + 1).padStart(2, '0')}</span>
          <span>{product.category}</span>
        </p>
        <h3 className="product__name" id={headingId}>
          {product.name}
        </h3>
        <p className="product__line">{product.line}</p>
        {product.body.map((paragraph) => (
          <p className="body product__body" key={paragraph.slice(0, 32)}>
            {paragraph}
          </p>
        ))}

        <dl className="facts">
          {product.facts.map(([label, value]) => (
            <div className="facts__row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="cluster">
          <a className="btn btn--primary" href={product.primary.href}>
            {product.primary.label}
          </a>
          <a className="link-arrow" href={product.secondary.href}>
            {product.secondary.label}
          </a>
        </div>
      </Reveal>

      <Reveal className="product__visual" delay={100}>
        <ProductVisual kind={product.visual} />
      </Reveal>
    </article>
  );
}

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

      {/* ── Hero: the company, then an index of what it ships ─────────── */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer home-hero__grid">
          <Reveal className="home-hero__copy">
            <p className="eyebrow">{HOME.eyebrow}</p>
            <h1 id="hero-title" className="display home-hero__title">
              {HOME.title}
            </h1>
            <p className="lede home-hero__lede">{HOME.lede}</p>
            <div className="cluster">
              <a className="btn btn--primary btn--lg" href="#products">
                See the products
              </a>
              <Link className="btn btn--ghost btn--lg" to="/about">
                Who builds them
              </Link>
            </div>
          </Reveal>

          <Reveal as="aside" className="register" delay={120} aria-labelledby="register-title">
            <div className="register__head">
              <h2 className="register__title" id="register-title">
                Shipping now
              </h2>
              <span className="mono">{REGISTER.length} live</span>
            </div>
            <ol className="register__list">
              {REGISTER.map((item, i) => (
                <li key={item.key}>
                  <a className="register__row" href={item.href}>
                    <span className="register__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="register__name">{item.name}</span>
                    <span className="register__cat">{item.category}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────────── */}
      <section id="products" className="section" aria-labelledby="products-title">
        <div className="container">
          <Reveal className="section-head home-section-head">
            <p className="eyebrow">Products</p>
            <h2 id="products-title" className="h2">
              Three products I sell to businesses.
            </h2>
            <p className="lede">
              Each one exists because something changed under people’s feet: an authentication
              cutoff, a retired app, a store that can’t let shoppers test a shade.
            </p>
          </Reveal>

          <div className="products">
            {FEATURED_PRODUCTS.map((product, index) => (
              <FeaturedProduct key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Everything else ──────────────────────────────────────────── */}
      <section id="more" className="section section--alt section--rule" aria-labelledby="more-title">
        <div className="container home-split">
          <Reveal className="section-head">
            <p className="eyebrow">Also live</p>
            <h2 id="more-title" className="h2">
              Smaller tools for specific jobs.
            </h2>
            <p className="body muted">
              Mostly the leftovers of retired software and changed government systems: the IRS
              moving 1099 filing from FIRE to IRIS, InfoPath reaching end of life.
            </p>
            <a className="link-arrow" href="/tools/">
              All products and guides
            </a>
          </Reveal>

          <Reveal as="ul" className="more-list" delay={80}>
            {MORE_PRODUCTS.map((item) => (
              <li key={item.slug} className="more-item">
                <a className="more-item__link" href={item.href}>
                  <span className="more-item__cat mono">{item.category}</span>
                  <span className="more-item__name">{item.name}</span>
                  <span className="more-item__line">{item.line}</span>
                  <span className="more-item__price">{item.price}</span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Games ────────────────────────────────────────────────────── */}
      <section id="games" className="section section--tight section--rule" aria-labelledby="games-title">
        <div className="container">
          <Reveal className="games-band">
            <div className="games-band__text">
              <p className="eyebrow">On the side</p>
              <h2 id="games-title" className="h3">
                {GAMES.length} small browser games, free on itch.io.
              </h2>
              <p className="body muted">
                Released under the name {SITE.itchioHandle}. Games are where I try ideas quickly:
                rendering, input, and what makes someone keep playing.
              </p>
            </div>
            <div className="cluster games-band__actions">
              <Link className="btn btn--ghost" to="/games">
                Browse the games
              </Link>
              <a className="link-arrow" href={SITE.itchio} target="_blank" rel="noopener noreferrer">
                {SITE.itchioHandle} on itch.io
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How I sell ───────────────────────────────────────────────── */}
      <section id="how" className="section section--rule" aria-labelledby="how-title">
        <div className="container">
          <Reveal className="section-head home-section-head">
            <p className="eyebrow">{PRINCIPLES.eyebrow}</p>
            <h2 id="how-title" className="h2">
              {PRINCIPLES.title}
            </h2>
          </Reveal>

          <Reveal as="ol" className="principles" delay={80}>
            {PRINCIPLES.items.map((item, i) => (
              <li className="principle" key={item.title}>
                <span className="principle__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="principle__title">{item.title}</h3>
                <p className="principle__body">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Questions ────────────────────────────────────────────────── */}
      <section id="faq" className="section section--tight section--rule" aria-labelledby="faq-title">
        <div className="container home-split">
          <Reveal className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title" className="h2">
              Common questions.
            </h2>
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

      {/* ── Close ────────────────────────────────────────────────────── */}
      <section className="home-close" aria-labelledby="close-title">
        <div className="container">
          <Reveal className="home-close__inner">
            <div>
              <h2 id="close-title" className="h2">
                Questions before you buy?
              </h2>
              <p className="lede">
                Write to me directly. {RESPONSE_PROMISE}
              </p>
            </div>
            <div className="cluster">
              <Link className="btn btn--light btn--lg" to="/contact">
                Get in touch
              </Link>
              <a className="home-close__mail" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
