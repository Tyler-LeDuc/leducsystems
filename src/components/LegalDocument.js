import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import Reveal from './Reveal';
import { SITE, RESPONSE_PROMISE, LEGAL_NAV } from '../data/site';
import '../pages/LegalPage.css';

const MAILTO = `mailto:${SITE.email}`;

const num = (index) => String(index + 1).padStart(2, '0');

/* The General Legal credit. Parts of the Privacy Policy and Terms are adapted
   from General Legal's CC0 templates (github.com/General-Legal/legal-templates),
   and they ask that this footnote stays with any adaptation. */
export const GENERAL_LEGAL_CREDIT =
  'Parts of this document are adapted from a template prepared and made publicly available by General Legal, PC ("General Legal"). It is provided for general reference purposes only and does not constitute, and should not be construed as, legal advice, or an endorsement or review of any particular transaction in which it is used. Use of this template does not create an attorney-client relationship with General Legal. General Legal has not reviewed, and takes no position on, any modifications made to this document or the deal terms it is used to document.';

/**
 * The shared sheet for /privacy, /terms and /refunds: an appendix mark, a
 * title block, a contents index, a plain-language summary, the numbered
 * clauses, and a closing contact block.
 */
export default function LegalDocument({
  mark,
  title,
  path,
  description,
  lastUpdated,
  summary,
  sections,
  credit = false,
}) {
  const others = LEGAL_NAV.filter((item) => item.path !== path);

  return (
    <>
      <SEO title={title} description={description} path={path} />

      <section className="section legal-front">
        <div className="container">
          <Reveal className="legal-front__head">
            <p className="legal-mark">
              <span className="mono">Appendix</span>
              <span className="legal-mark__glyph">{mark}</span>
            </p>
            <div className="legal-front__title">
              <h1 className="h2">{title}</h1>
              <dl className="legal-front__fields">
                <div>
                  <dt className="mono">Issued by</dt>
                  <dd>
                    {SITE.legalName}, {SITE.city}, {SITE.region}
                  </dd>
                </div>
                <div>
                  <dt className="mono">Last updated</dt>
                  <dd>{lastUpdated}</dd>
                </div>
              </dl>
            </div>
            <div className="legal-front__act">
              <Link className="btn btn--primary" to="/contact">
                Get in touch
              </Link>
              <a className="link-arrow" href={MAILTO}>
                Email {SITE.email}
              </a>
            </div>
          </Reveal>

          <hr className="datum legal-front__datum" />

          <Reveal as="nav" className="legal-index" delay={60} aria-label={`Sections of the ${title}`}>
            <p className="mono legal-index__label">Contents</p>
            <ul className="legal-index__list">
              {sections.map((section, i) => (
                <li className="legal-index__item" key={section.id}>
                  <a className="legal-index__link" href={`#${section.id}`}>
                    <span className="legal-index__num">{num(i)}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule section--tight">
        <div className="container">
          <Reveal className="note legal-summary legal-body">
            <p>
              <strong>The short version:</strong> {summary}
            </p>
          </Reveal>

          <Reveal as="article" className="legal-doc legal-body" delay={60}>
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-clause"
                aria-labelledby={`${section.id}-title`}
              >
                <span className="legal-clause__num" aria-hidden="true">
                  {num(i)}
                </span>
                <h2 className="h3 legal-clause__title" id={`${section.id}-title`}>
                  {section.title}
                </h2>
                <div className="legal-clause__body">{section.content}</div>
              </section>
            ))}
            {credit ? <p className="legal-fineprint body--sm muted">{GENERAL_LEGAL_CREDIT}</p> : null}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-block legal-body">
            <p className="eyebrow">
              {/* The closing clause of the sheet takes the number after the last one. */}
              <span className="ordinal">{num(sections.length)}</span>
              <span>Next</span>
            </p>
            <h2 className="h2">Still have a question?</h2>
            <p className="lede">
              Ask me directly rather than guessing at what a policy page means. {RESPONSE_PROMISE}
            </p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Get in touch
              </Link>
              <a className="link-arrow" href={MAILTO}>
                Email {SITE.email}
              </a>
            </div>
            <p className="body--sm muted">
              See also the{' '}
              {others.map((item, i) => (
                <React.Fragment key={item.path}>
                  {i > 0 ? (i === others.length - 1 ? ' and ' : ', ') : null}
                  <Link className="link-underline" to={item.path}>
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
