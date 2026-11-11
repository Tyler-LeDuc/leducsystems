import React, { useCallback, useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { FORGE_MIGRATION as F, SITE, RESPONSE_PROMISE } from '../data/site';
import './ClaudeWorkflowPage.css';

/* Connect to Forge migration: a fixed-price service sold by email. All words
   live in FORGE_MIGRATION in src/data/site.js. Layout classes (cw-*) are
   shared with the Claude Workflow page. */
function ForgeMigrationPage() {
  const [openFaq, setOpenFaq] = useState([]);
  const toggleFaq = useCallback((id) => {
    setOpenFaq((open) => (open.includes(id) ? open.filter((x) => x !== id) : [...open, id]));
  }, []);

  return (
    <>
      <SEO
        fullTitle={F.seoTitle}
        description={F.seoDescription}
        path={F.path}
        imageAlt={`${SITE.name}: Connect to Forge migration`}
      />

      <section className="page-head" aria-labelledby="fm-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer page-head__inner">
          <p className="eyebrow">{F.eyebrow}</p>
          <h1 className="h1 page-head__title" id="fm-title">
            {F.title}
          </h1>
          <p className="lede page-head__lede">{F.lede}</p>
          <div className="cluster">
            <a className="btn btn--primary btn--lg" href={F.mailto}>
              {F.ctaLabel}
            </a>
            <a className="link-arrow" href="#fm-pricing">
              See pricing
            </a>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="fm-facts">
        <div className="container">
          <h2 className="sr-only" id="fm-facts">
            The terms in brief
          </h2>
          <dl className="cw-facts">
            {F.facts.map((fact) => (
              <div className="cw-facts__item" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="fm-why-title">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">The deadline</p>
            <h2 className="h2" id="fm-why-title">
              Connect support ends January 31, 2027.
            </h2>
          </Reveal>
          <Reveal className="stack" delay={80}>
            {F.intro.map((p) => (
              <p className="body" key={p}>
                {p}
              </p>
            ))}
            <p className="body muted">
              Sources:{' '}
              {F.sources.map((s, i) => (
                <React.Fragment key={s.href}>
                  {i > 0 ? ', ' : ''}
                  <a className="link-underline" href={s.href} rel="noopener noreferrer">
                    {s.label}
                  </a>
                </React.Fragment>
              ))}
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt section--rule" aria-labelledby="fm-me">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Experience</p>
            <h2 className="h2" id="fm-me">
              {F.whyTitle}
            </h2>
          </Reveal>
          <Reveal className="stack" delay={80}>
            {F.why.map((p) => (
              <p className="body" key={p}>
                {p}
              </p>
            ))}
            <a className="link-arrow" href={F.whyLink.href}>
              {F.whyLink.label}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="fm-included">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">What’s included</p>
            <h2 className="h2" id="fm-included">
              An audit first, then the port.
            </h2>
          </Reveal>
          <Reveal className="grid grid--2" delay={80}>
            {F.included.map((plan) => (
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
          <p className="body muted cw-plan-note">{F.paymentNote}</p>
        </div>
      </section>

      <section id="fm-pricing" className="section section--alt section--rule" aria-labelledby="fm-price">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="h2" id="fm-price">
              {F.priceTitle}
            </h2>
            <p className="body muted">{F.priceIntro}</p>
          </Reveal>
          <Reveal className="grid grid--3" delay={80}>
            {F.prices.map((plan) => (
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
          <p className="body muted cw-plan-note">{F.priceNote}</p>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="fm-how">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Process and timeline</p>
            <h2 className="h2" id="fm-how">
              From first email to release.
            </h2>
            <p className="body muted">{F.limitNote}</p>
          </Reveal>
          <Reveal as="ol" className="cw-steps" delay={80}>
            {F.steps.map((step, i) => (
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

      <section className="section section--tight section--alt section--rule" aria-labelledby="fm-faq">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="fm-faq" className="h2">
              Common questions.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            {F.faq.map((item) => {
              const isOpen = openFaq.includes(item.id);
              return (
                <div className="qa" data-open={isOpen ? 'true' : 'false'} key={item.id}>
                  <h3 className="qa__heading">
                    <button
                      type="button"
                      className="qa__q"
                      aria-expanded={isOpen}
                      aria-controls={`fm-answer-${item.id}`}
                      id={`fm-question-${item.id}`}
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
                    id={`fm-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`fm-question-${item.id}`}
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

      <section className="section section--tight section--rule" aria-labelledby="fm-cta">
        <div className="container">
          <Reveal className="cta-block">
            <h2 className="h2" id="fm-cta">
              {F.closeTitle}
            </h2>
            <p className="lede">
              {F.closeBody} {RESPONSE_PROMISE}
            </p>
            <div className="cluster">
              <a className="btn btn--primary btn--lg" href={F.mailto}>
                {F.ctaLabel}
              </a>
              <a className="link-underline" href={F.mailto}>
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ForgeMigrationPage;
