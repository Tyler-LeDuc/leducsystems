import React from 'react';
import './ContactPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ContactForm from '../ContactForm';
import { SITE, PROCESS, RESPONSE_PROMISE } from '../data/site';

/* Commitments, not claims — see the content rules in data/site.js.
   The reply promise is no longer a row here: it is stamped on the masthead,
   where it is read before the form rather than after it. */
const NEXT_STEPS = [
  { title: 'A call', body: PROCESS[0].body },
  { title: 'A written scope, if it is a fit', body: PROCESS[1].body },
];

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description={`Start a project with ${SITE.name} in ${SITE.city}, ${SITE.region}. Describe what you are building and get a reply within one business day from the person who would do the work.`}
        path="/contact"
      />

      <section className="section contact-sheet" aria-labelledby="contact-title">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="contact-strip" delay={0}>
            <div className="contact-strip__line">
              <div className="contact-strip__head">
                <p className="eyebrow">
                  <span className="ordinal">00</span>
                  <span>Start a project</span>
                </p>
                <h1 className="hi contact-strip__title" id="contact-title">
                  Tell us what you are building
                </h1>
              </div>
              <p className="contact-strip__promise">{RESPONSE_PROMISE}</p>
            </div>
            <hr className="datum" />
          </Reveal>

          <div className="contact-body">
            <Reveal className="panel contact-form" delay={60}>
              <div className="contact-form__head">
                <p className="ordinal">01</p>
                <h2 className="contact-form__label">Project inquiry</h2>
              </div>
              <ContactForm embedded />
            </Reveal>

            <Reveal className="contact-aside" delay={120}>
              <p className="body muted contact-aside__lede">
                Describe what you are trying to do and what is in the way. It goes straight to an
                engineer — no intake team, no qualification queue.
              </p>

              <div className="contact-block">
                <h2 className="eyebrow contact-block__label">
                  <span className="ordinal">02</span>
                  <span>What happens next</span>
                </h2>
                <ol className="contact-steps">
                  {NEXT_STEPS.map((step) => (
                    <li key={step.title}>
                      <div className="contact-steps__text">
                        <p className="contact-steps__title">{step.title}</p>
                        <p className="contact-steps__body">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="contact-note">
                <p className="body">
                  Prefer plain email? Write to{' '}
                  <a className="link-underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>{' '}
                  and it reaches exactly the same place.
                </p>
                <p className="body muted">
                  A half-formed idea is a perfectly good starting point. You do not need a
                  specification, a budget, or a deck to send this.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
