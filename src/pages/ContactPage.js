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
        description={`Questions about a product, a license, or a file that didn't convert, for ${SITE.name}. ${RESPONSE_PROMISE}`}
        path="/contact"
      />

      <section className="section contact-sheet" aria-labelledby="contact-title">
        <div className="bg-grid" aria-hidden="true" />

        <div className="container layer">
          <Reveal className="contact-strip" delay={0}>
            <div className="contact-strip__line">
              <div className="contact-strip__head">
                <p className="eyebrow">Contact</p>
                <h1 className="hi contact-strip__title" id="contact-title">
                  Ask about a product, a license or a file
                </h1>
              </div>
              <p className="contact-strip__promise">{RESPONSE_PROMISE}</p>
            </div>
            <hr className="datum" />
          </Reveal>

          <div className="contact-body">
            <Reveal className="panel contact-form" delay={60}>
              <div className="contact-form__head">
                <h2 className="contact-form__label">Message</h2>
              </div>
              <ContactForm embedded />
            </Reveal>

            <Reveal className="contact-aside" delay={120}>
              <p className="body muted contact-aside__lede">
                A question before you buy, a license for a dealer, a file that didn&rsquo;t come out
                right, or a refund: it all comes straight to me, the person who wrote the software.
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
                  Writing about a conversion? Attach the file if you can, so I can see exactly what
                  went wrong and fix it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
