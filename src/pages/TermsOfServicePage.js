import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, RESPONSE_PROMISE } from '../data/site';
import './LegalPage.css';

const LAST_UPDATED = 'September 30, 2026';

const MAILTO = `mailto:${SITE.email}`;

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of these terms',
    content: (
      <>
        <p>
          These terms apply to your use of the website at{' '}
          <span className="hi">leducsystems.com</span>, run by {SITE.founder} under the name{' '}
          {SITE.name}. By using the site, you agree to what is written here. If you do not, do
          not use the site.
        </p>
      </>
    ),
  },
  {
    id: 'games',
    title: 'The games',
    content: (
      <>
        <p>
          This site links to games released on itch.io under the handle{' '}
          <span className="hi">{SITE.itchioHandle}</span>. The games themselves are hosted and
          served by itch.io and covered by{' '}
          <a
            className="link-underline"
            href="https://itch.io/docs/legal/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            itch.io&rsquo;s own terms
          </a>
          , not this page. This site is not itch.io and is not responsible for itch.io&rsquo;s
          platform, payments, or account systems.
        </p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'Use of this website',
    content: (
      <>
        <p>
          The content on this site is general information about {SITE.name} and the games
          released under it. It is not professional advice of any kind, and reading it does not
          create any relationship beyond that of a visitor. I make no promise that the site will
          always be available or free of errors.
        </p>
        <p>
          The text, design, and marks on this site belong to {SITE.name}. Do not copy the site
          wholesale or present it as your own. Quoting or linking to it is welcome.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: 'No warranty',
    content: (
      <>
        <p className="legal-fineprint">
          To the maximum extent permitted by law, this website and the games it links to are
          provided without warranties of any kind, whether express or implied, including any
          implied warranty of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
        <p>
          I do not warrant that the site or the games will be uninterrupted, bug-free, or
          available on any particular device or browser.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: (
      <>
        <p className="legal-fineprint">
          To the maximum extent permitted by law, {SITE.name} is not liable for indirect,
          incidental, special, consequential, or punitive damages arising from your use of this
          site or the games it links to, however caused and regardless of the theory of
          liability.
        </p>
        <p>
          This site does not sell anything and takes no payment from visitors, so there is
          nothing to refund and nothing paid to recover. Nothing here limits liability that
          cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-party services on this site',
    content: (
      <>
        <p>
          The contact form is delivered by EmailJS, site traffic is measured with Google
          Analytics, and the games themselves are hosted on itch.io. Those services are operated
          by their own companies under their own terms, and I am not responsible for how they
          run. What EmailJS and Google Analytics receive and why is described in the{' '}
          <Link className="link-underline" to="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    content: (
      <>
        <p>
          These terms are governed by the laws of the United States and of the state in which{' '}
          {SITE.name} is established, without regard to conflict-of-law rules.
        </p>
      </>
    ),
  },
  {
    id: 'modifications',
    title: 'Changes to these terms',
    content: (
      <>
        <p>
          These terms may be updated, and the date at the top changes when they are. There is no
          archive of previous versions; the page you are reading is the current one.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <>
        <p>
          Questions about these terms go directly to me at{' '}
          <a className="link-underline" href={MAILTO}>
            {SITE.email}
          </a>
          . {RESPONSE_PROMISE}
        </p>
      </>
    ),
  },
];

const num = (index) => String(index + 1).padStart(2, '0');

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="The terms covering this site: what the contact form collects, no warranty of fitness, and a capped limitation of liability."
        path="/terms"
      />

      <section className="section legal-front">
        <div className="container">
          <Reveal className="legal-front__head">
            <p className="legal-mark">
              <span className="mono">Appendix</span>
              <span className="legal-mark__glyph">B</span>
            </p>
            <div className="legal-front__title">
              <h1 className="h2">Terms of Service</h1>
              <dl className="legal-front__fields">
                <div>
                  <dt className="mono">Issued by</dt>
                  <dd>{SITE.name}</dd>
                </div>
                <div>
                  <dt className="mono">Last updated</dt>
                  <dd>{LAST_UPDATED}</dd>
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

          <Reveal
            as="nav"
            className="legal-index"
            delay={60}
            aria-label="Sections of these terms"
          >
            <p className="mono legal-index__label">Contents</p>
            <ul className="legal-index__list">
              {SECTIONS.map((section, i) => (
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
              <strong>The short version:</strong> this is a personal site for games released on
              itch.io. There&rsquo;s nothing to buy here, nothing sold, and the games themselves
              run under itch.io&rsquo;s own terms. Use the site normally and it works out fine.
            </p>
          </Reveal>

          <Reveal as="article" className="legal-doc legal-body" delay={60}>
            {SECTIONS.map((section, i) => (
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
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-block legal-body">
            <p className="eyebrow">
              <span className="ordinal">{num(SECTIONS.length)}</span>
              <span>Next</span>
            </p>
            <h2 className="h2">Have a question about these terms?</h2>
            <p className="lede">
              Ask directly rather than guessing at what a policy page means. {RESPONSE_PROMISE}
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
              <Link className="link-underline" to="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
