import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SHOPIFY_OPTIONS as P, SHOPIFY_OPTIONS_GUIDES as GUIDES, SITE } from '../data/site';
import './ClaudeWorkflowPage.css';
import './ShopifyOptionsPage.css';

/* Landing page for the LeDuc Product Options Shopify app. All words live in
   SHOPIFY_OPTIONS in src/data/site.js; layout classes (cw-*) are shared with
   the service pages. The CTA goes to the Shopify App Store listing. */
function ShopifyOptionsPage() {
  const [openFaq, setOpenFaq] = useState([]);
  const toggleFaq = useCallback((id) => {
    setOpenFaq((open) => (open.includes(id) ? open.filter((x) => x !== id) : [...open, id]));
  }, []);

  return (
    <>
      <SEO
        fullTitle={P.seoTitle}
        description={P.seoDescription}
        path={P.path}
        imageAlt={`${SITE.name}: Product Options for Shopify`}
      />

      <section className="page-head" aria-labelledby="po-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer page-head__inner">
          <p className="eyebrow">{P.eyebrow}</p>
          <h1 className="h1 page-head__title" id="po-title">
            {P.title}
          </h1>
          <p className="lede page-head__lede">{P.lede}</p>
          <div className="cluster">
            <a className="btn btn--primary btn--lg" href={P.appUrl} rel="noopener">
              {P.ctaLabel}
            </a>
            <a className="link-arrow" href="#po-guides">
              How-to guides
            </a>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="po-facts">
        <div className="container">
          <h2 className="sr-only" id="po-facts">
            The app in brief
          </h2>
          <dl className="cw-facts">
            {P.facts.map((fact) => (
              <div className="cw-facts__item" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="po-features">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">What it does</p>
            <h2 className="h2" id="po-features">
              Personalization fields that reach the order.
            </h2>
          </Reveal>
          <Reveal className="grid grid--3" delay={80}>
            {P.features.map((f) => (
              <article className="card card--feature" key={f.title}>
                <h3 className="card__title">{f.title}</h3>
                <p className="body">{f.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt section--rule" aria-labelledby="po-pricing">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="h2" id="po-pricing">
              Start free. Upgrade for unlimited sets and rules.
            </h2>
          </Reveal>
          <Reveal className="grid grid--2" delay={80}>
            {P.plans.map((plan) => (
              <article className="card card--feature" key={plan.name}>
                <h3 className="card__title">{plan.name}</h3>
                <p className="cw-price">
                  <span className="cw-price__amount">{plan.price}</span>
                  <span className="cw-price__unit">{plan.unit}</span>
                </p>
                <ul className="list">
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <p className="body muted cw-plan-note">{P.planNote}</p>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="po-how">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Setup</p>
            <h2 className="h2" id="po-how">
              From install to first answer.
            </h2>
          </Reveal>
          <Reveal as="ol" className="cw-steps" delay={80}>
            {P.steps.map((step, i) => (
              <li className="cw-steps__item" key={step.title}>
                <span className="ordinal">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="cw-steps__title">{step.title}</h3>
                  <p className="cw-steps__body">{step.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="po-guides" className="section section--alt section--rule" aria-labelledby="po-guides-title">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Guides</p>
            <h2 className="h2" id="po-guides-title">
              How-to guides.
            </h2>
          </Reveal>
          <Reveal as="ul" className="po-guides" delay={80}>
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link className="link-arrow" to={g.path}>
                  {g.title}
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight section--rule" aria-labelledby="po-faq">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="po-faq" className="h2">
              Common questions.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            {P.faq.map((item) => {
              const isOpen = openFaq.includes(item.id);
              return (
                <div className="qa" data-open={isOpen ? 'true' : 'false'} key={item.id}>
                  <h3 className="qa__heading">
                    <button
                      type="button"
                      className="qa__q"
                      aria-expanded={isOpen}
                      aria-controls={`po-answer-${item.id}`}
                      id={`po-question-${item.id}`}
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
                    id={`po-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`po-question-${item.id}`}
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

      <section className="section section--tight section--alt section--rule" aria-labelledby="po-cta">
        <div className="container">
          <Reveal className="cta-block">
            <h2 className="h2" id="po-cta">
              {P.closeTitle}
            </h2>
            <p className="lede">{P.closeBody}</p>
            <div className="cluster">
              <a className="btn btn--primary btn--lg" href={P.appUrl} rel="noopener">
                {P.ctaLabel}
              </a>
              <a className="link-underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ShopifyOptionsPage;
