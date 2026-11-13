import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SHOPIFY_OPTIONS as P, SHOPIFY_OPTIONS_GUIDES as GUIDES, SITE } from '../data/site';
import './ShopifyOptionsPage.css';

/* One how-to guide for LeDuc Product Options, picked by slug from
   SHOPIFY_OPTIONS_GUIDES in src/data/site.js. */
function ShopifyGuidePage({ slug }) {
  const g = GUIDES.find((x) => x.slug === slug);
  const others = GUIDES.filter((x) => x.slug !== slug);

  return (
    <>
      <SEO
        fullTitle={g.seoTitle}
        description={g.seoDescription}
        path={g.path}
        imageAlt={`${SITE.name}: ${g.title}`}
      />

      <section className="page-head" aria-labelledby="pg-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer page-head__inner">
          <p className="eyebrow">
            <Link className="link-underline" to={P.path}>
              LeDuc Product Options
            </Link>{' '}
            · Shopify how-to
          </p>
          <h1 className="h1 page-head__title" id="pg-title">
            {g.title}
          </h1>
          <p className="lede page-head__lede">{g.lede}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container po-article">
          {g.sections.map((s) => (
            <div className="po-article__section" key={s.heading}>
              <h2 className="h3">{s.heading}</h2>
              {s.paragraphs &&
                s.paragraphs.map((p) => (
                  <p className="body" key={p}>
                    {p}
                  </p>
                ))}
              {s.steps && (
                <ol className="po-article__steps">
                  {s.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {s.code && (
                <pre className="po-code">
                  <code>{s.code}</code>
                </pre>
              )}
              {s.after &&
                s.after.map((p) => (
                  <p className="body" key={p}>
                    {p}
                  </p>
                ))}
            </div>
          ))}

          <div className="po-article__cta">
            <p className="body">
              LeDuc Product Options is my Shopify app for this. The Free plan covers 3 option sets with up to 10 fields
              each.
            </p>
            <div className="cluster">
              <a className="btn btn--primary" href={g.appUrl} rel="noopener">
                {P.ctaLabel}
              </a>
              <Link className="link-arrow" to={P.path}>
                About the app
              </Link>
            </div>
          </div>

          <div className="po-article__section">
            <h2 className="h3">Questions</h2>
            {g.faq.map((q) => (
              <div key={q.id}>
                <h3 className="po-article__q">{q.question}</h3>
                <p className="body">{q.answer}</p>
              </div>
            ))}
          </div>

          <div className="po-article__section">
            <h2 className="h3">More guides</h2>
            <ul className="po-guides">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link className="link-arrow" to={o.path}>
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="body muted">
              Questions? Email me at{' '}
              <a className="link-underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopifyGuidePage;
