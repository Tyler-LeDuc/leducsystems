import React, { useCallback, useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { CLAUDE_WORKFLOW as W, SITE, RESPONSE_PROMISE } from '../data/site';
import './ClaudeWorkflowPage.css';

/* Claude Workflow Setup: a fixed-price service sold by email. All words live
   in CLAUDE_WORKFLOW in src/data/site.js. */
function ClaudeWorkflowPage() {
  const [openFaq, setOpenFaq] = useState([]);
  const toggleFaq = useCallback((id) => {
    setOpenFaq((open) => (open.includes(id) ? open.filter((x) => x !== id) : [...open, id]));
  }, []);

  return (
    <>
      <SEO
        fullTitle={W.seoTitle}
        description={W.seoDescription}
        path={W.path}
        imageAlt={`${SITE.name}: ${W.title}`}
      />

      {/* ── Head ──────────────────────────────────────────────────────── */}
      <section className="page-head" aria-labelledby="cw-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer page-head__inner">
          <p className="eyebrow">{W.eyebrow}</p>
          <h1 className="h1 page-head__title" id="cw-title">
            {W.title}
          </h1>
          <p className="lede page-head__lede">{W.lede}</p>
          <div className="cluster">
            <a className="btn btn--primary btn--lg" href={W.mailto}>
              {W.ctaLabel}
            </a>
            <a className="link-arrow" href="#cw-pricing">
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── Facts ─────────────────────────────────────────────────────── */}
      <section className="section section--tight" aria-labelledby="cw-facts">
        <div className="container">
          <h2 className="sr-only" id="cw-facts">
            The terms in brief
          </h2>
          <dl className="cw-facts">
            {W.facts.map((fact) => (
              <div className="cw-facts__item" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="cw-how">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 className="h2" id="cw-how">
              One task in, one skill out.
            </h2>
            <p className="body muted">All of it happens by email. No calls or meetings.</p>
          </Reveal>

          <Reveal as="ol" className="cw-steps" delay={80}>
            {W.steps.map((step, i) => (
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

      {/* ── Pricing ───────────────────────────────────────────────────── */}
      <section id="cw-pricing" className="section section--alt section--rule" aria-labelledby="cw-price">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">Pricing</p>
            <h2 className="h2" id="cw-price">
              A fixed price per workflow.
            </h2>
          </Reveal>

          <Reveal className="grid grid--2" delay={80}>
            {W.plans.map((plan) => (
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

          <p className="body muted cw-plan-note">{W.planNote}</p>
        </div>
      </section>

      {/* ── Fit ───────────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="cw-fit">
        <div className="container">
          <Reveal className="section-head cw-head">
            <p className="eyebrow">Fit</p>
            <h2 className="h2" id="cw-fit">
              What works well, and what doesn’t.
            </h2>
          </Reveal>

          <Reveal className="grid grid--split" delay={80}>
            <div className="stack stack--sm">
              <h3 className="cw-fit__title">Good fits</h3>
              <ul className="list">
                {W.goodFits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="stack stack--sm">
              <h3 className="cw-fit__title">Not a fit</h3>
              <ul className="list">
                {W.notFits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Describe your task ────────────────────────────────────────── */}
      <section className="section section--alt section--rule" aria-labelledby="cw-describe">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Start</p>
            <h2 className="h2" id="cw-describe">
              Describe your task.
            </h2>
            <p className="body muted">
              Email me these four things. {RESPONSE_PROMISE}
            </p>
            <a className="btn btn--primary btn--lg" href={W.mailto}>
              {W.ctaLabel}
            </a>
            <a className="link-underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </Reveal>

          <Reveal className="rows" delay={80}>
            {W.template.map((item) => (
              <div className="row" key={item.label}>
                <div className="row__label">
                  <span className="mono">{item.label}</span>
                </div>
                <p className="row__body">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Questions ─────────────────────────────────────────────────── */}
      <section className="section section--tight section--rule" aria-labelledby="cw-faq">
        <div className="container cw-split">
          <Reveal className="section-head">
            <p className="eyebrow">Questions</p>
            <h2 id="cw-faq" className="h2">
              Common questions.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            {W.faq.map((item) => {
              const isOpen = openFaq.includes(item.id);
              return (
                <div className="qa" data-open={isOpen ? 'true' : 'false'} key={item.id}>
                  <h3 className="qa__heading">
                    <button
                      type="button"
                      className="qa__q"
                      aria-expanded={isOpen}
                      aria-controls={`cw-answer-${item.id}`}
                      id={`cw-question-${item.id}`}
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
                    id={`cw-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`cw-question-${item.id}`}
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

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <section className="section section--tight section--rule" aria-labelledby="cw-cta">
        <div className="container">
          <Reveal className="cta-block">
            <h2 className="h2" id="cw-cta">
              Have a task in mind?
            </h2>
            <p className="lede">
              Send me the steps and a sample. I’ll tell you in writing whether it’s a fit before you
              pay anything.
            </p>
            <div className="cluster">
              <a className="btn btn--primary btn--lg" href={W.mailto}>
                {W.ctaLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ClaudeWorkflowPage;
