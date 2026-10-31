import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, GAMES, RESPONSE_PROMISE } from '../data/site';
import './AboutPage.css';

/* What I have built, stated plainly. Every line here describes something
   that is live at a link on this site. */
const BUILT = [
  {
    name: 'Scan Relay',
    what: 'A Windows service that accepts SMTP from office copiers and sends each scan on to Microsoft 365 through Microsoft Graph, with a local queue so nothing is lost when the internet drops.',
    href: '/tools/scan-to-email-microsoft-365/',
  },
  {
    name: 'Virtual try-on',
    what: 'A WebGL makeup engine that puts a store’s exact shade on the shopper’s face from the camera, entirely in the browser.',
    href: '/tools/tryon/',
  },
  {
    name: 'File converters',
    what: 'Tools that read Publisher, PageMaker and Rhino files and write editable PowerPoint, Word, InDesign and older Rhino files.',
    href: '/tools/publisher-converter/',
  },
  {
    name: '1099 and InfoPath tools',
    what: 'Browser tools that turn FIRE files and spreadsheets into IRIS upload files, and InfoPath form libraries into Excel.',
    href: '/tools/fire-to-iris-1099-converter/',
  },
  {
    name: `${GAMES.length} browser games`,
    what: `Small games released free on itch.io under the name ${SITE.itchioHandle}.`,
    href: '/games',
    internal: true,
  },
];

const PROFILES = [
  {
    label: 'GitHub',
    handle: `github.com/${SITE.githubHandle}`,
    note: 'Code and public projects',
    href: SITE.github,
  },
  {
    label: 'itch.io',
    handle: `${SITE.itchioHandle}.itch.io`,
    note: 'Every game I’ve released',
    href: SITE.itchio,
  },
];

function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`${SITE.founder} is the developer behind ${SITE.name}, a one-person software company in ${SITE.city}, ${SITE.region}: Scan Relay, a virtual makeup try-on, file converters and browser games.`}
        path="/about"
      />

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="about-intro" aria-labelledby="about-title">
        <div className="bg-grid" aria-hidden="true" />
        <div className="container layer about-intro__grid">
          <Reveal className="about-intro__copy">
            <p className="eyebrow">About</p>
            <h1 className="h1 about-intro__title" id="about-title">
              I’m {SITE.founder}. I build software and sell it myself.
            </h1>
            <p className="lede about-intro__lede">
              {SITE.name} is my one-person software company in {SITE.city}. I pick a specific
              problem, build the whole product (the code, the payments, the support pages and the
              server it runs on), then answer the email about it.
            </p>
            <div className="cluster about-intro__links">
              <a className="btn btn--primary" href={SITE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn btn--ghost" href={SITE.itchio} target="_blank" rel="noopener noreferrer">
                Games on itch.io
              </a>
            </div>
          </Reveal>

          <Reveal as="figure" className="about-portrait" delay={100}>
            <img
              className="about-portrait__img"
              src="/images/tyler-leduc.jpg"
              alt={`Portrait of ${SITE.founder}`}
              width="660"
              height="660"
              decoding="async"
            />
            <figcaption className="about-portrait__caption">
              <span className="about-portrait__name">{SITE.founder}</span>
              <span className="mono">Founder, developer</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ── Facts ─────────────────────────────────────────────────────── */}
      <section className="section section--tight section--rule" aria-labelledby="about-facts">
        <div className="container">
          <h2 className="sr-only" id="about-facts">
            Company facts
          </h2>
          <Reveal as="dl" className="about-facts">
            <div className="about-facts__item">
              <dt>Company</dt>
              <dd>{SITE.legalName}</dd>
            </div>
            <div className="about-facts__item">
              <dt>Founded</dt>
              <dd>{SITE.founded}</dd>
            </div>
            <div className="about-facts__item">
              <dt>Based in</dt>
              <dd>
                {SITE.city}, {SITE.region}
              </dd>
            </div>
            <div className="about-facts__item">
              <dt>Email</dt>
              <dd>
                <a className="link-underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </dd>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What I've built ───────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-built">
        <div className="container about-split">
          <Reveal className="section-head">
            <p className="eyebrow">Work</p>
            <h2 className="h2" id="about-built">
              What I’ve built and shipped.
            </h2>
            <p className="body muted">
              Desktop software, browser apps, a graphics engine and games. All of it is live, and
              all of it is linked from this site.
            </p>
          </Reveal>

          <Reveal as="ul" className="built" delay={80}>
            {BUILT.map((item) => (
              <li className="built__item" key={item.name}>
                <h3 className="built__name">
                  {item.internal ? (
                    <Link to={item.href}>{item.name}</Link>
                  ) : (
                    <a href={item.href}>{item.name}</a>
                  )}
                </h3>
                <p className="built__what">{item.what}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── How I work ────────────────────────────────────────────────── */}
      <section className="section section--alt section--rule" aria-labelledby="about-how">
        <div className="container about-split">
          <Reveal className="section-head">
            <p className="eyebrow">How I work</p>
            <h2 className="h2" id="about-how">
              Small on purpose.
            </h2>
          </Reveal>

          <Reveal className="stack about-prose" delay={80}>
            <p className="body">
              Each product does one job. A copier that has stopped scanning, a .pub file nothing
              opens, a shopper who wants to see a shade before buying it: I would rather solve one
              of those completely than half-solve five.
            </p>
            <p className="body">
              You can check everything before paying: a trial, a free preview of your own file, or a
              live demo. When someone sends me a case a product got wrong, I fix the product for the
              next person.
            </p>
            <p className="body">
              Games are the other half of what I make. They are small, free, and the fastest way I
              know to try an idea and see whether people come back to it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Elsewhere ─────────────────────────────────────────────────── */}
      <section className="section section--rule" aria-labelledby="about-elsewhere">
        <div className="container">
          <Reveal className="section-head about-elsewhere__head">
            <p className="eyebrow">Elsewhere</p>
            <h2 className="h2" id="about-elsewhere">
              Where to find my work.
            </h2>
          </Reveal>

          <Reveal as="ul" className="profiles" delay={80}>
            {PROFILES.map((profile) => (
              <li key={profile.label}>
                <a className="profile" href={profile.href} target="_blank" rel="noopener noreferrer">
                  <span className="mono">{profile.label}</span>
                  <span className="profile__handle">{profile.handle}</span>
                  <span className="profile__note">{profile.note}</span>
                </a>
              </li>
            ))}
            <li>
              <a className="profile" href="/tools/">
                <span className="mono">Products</span>
                <span className="profile__handle">leducsystems.com/tools</span>
                <span className="profile__note">Everything I sell, with prices</span>
              </a>
            </li>
            <li>
              <Link className="profile" to="/games">
                <span className="mono">Games</span>
                <span className="profile__handle">leducsystems.com/games</span>
                <span className="profile__note">The catalogue, two playable here</span>
              </Link>
            </li>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <section className="section section--tight section--rule" aria-labelledby="about-cta">
        <div className="container">
          <Reveal className="cta-block">
            <h2 className="h2" id="about-cta">
              Want to ask me something?
            </h2>
            <p className="lede">Write to me directly. {RESPONSE_PROMISE}</p>
            <div className="cluster" role="group" aria-label="Contact options">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Get in touch
              </Link>
              <a className="link-arrow" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
