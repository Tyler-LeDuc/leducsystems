import React from 'react';
import './ContactPage.css';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ContactForm from '../ContactForm';
import { SITE, RESPONSE_PROMISE } from '../data/site';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description={`Say hi, report a bug, or leave feedback for ${SITE.name}. ${RESPONSE_PROMISE}`}
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
                  <span>Say hi</span>
                </p>
                <h1 className="hi contact-strip__title" id="contact-title">
                  Tell me what broke, or what you liked
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
                <h2 className="contact-form__label">Message</h2>
              </div>
              <ContactForm embedded />
            </Reveal>

            <Reveal className="contact-aside" delay={120}>
              <p className="body muted contact-aside__lede">
                Bug reports, feedback, an idea for a game, or just a comment — it goes straight to
                me. Comments are the best part of this job. I read all of them.
              </p>

              <div className="contact-note">
                <p className="body">
                  Prefer plain email? Write to{' '}
                  <a className="link-underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>{' '}
                  and it reaches exactly the same place.
                </p>
                <p className="body muted">
                  Playing a specific game and found a bug? A comment on that game&rsquo;s itch.io
                  page works just as well and helps other players too.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
