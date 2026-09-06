import React from 'react';
import './ContactPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ContactForm from '../ContactForm';
import { SITE, PROCESS, RESPONSE_PROMISE } from '../data/site';

/* Commitments, not claims — see the content rules in data/site.js. */
const NEXT_STEPS = [
  { title: 'A reply', body: RESPONSE_PROMISE },
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

      <section className="section contact-hero" aria-labelledby="contact-title">
        <div className="bg-glow" aria-hidden="true" />

        <div className="container layer">
          <div className="grid grid--sidebar">
            <Reveal className="stack stack--lg" delay={0}>
              <div className="stack stack--sm">
                <p className="eyebrow">Start a project</p>
                <h1 className="h1 hi" id="contact-title">
                  Tell us what you are building
                </h1>
                <p className="lede">
                  Describe what you are trying to do and what is in the way. It goes straight to
                  an engineer — no intake team, no qualification queue.
                </p>
              </div>

              <div className="stack stack--sm">
                <h2 className="h4 hi">What happens next</h2>
                <ol className="contact-steps">
                  {NEXT_STEPS.map((step) => (
                    <li key={step.title}>
                      <div className="stack stack--xs">
                        <p className="contact-steps__title">{step.title}</p>
                        <p className="body body--sm muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="stack stack--sm">
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

            <Reveal className="panel" delay={120}>
              <div className="stack">
                <div className="stack stack--xs">
                  <h2 className="h3 hi">Project inquiry</h2>
                  <p className="body body--sm muted">
                    Name, email, and a description of the work are all that is required. The rest
                    just saves us a round trip.
                  </p>
                </div>
                <ContactForm embedded />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
