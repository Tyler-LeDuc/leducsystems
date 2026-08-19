import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE, RESPONSE_PROMISE } from '../data/site';
import './LegalPage.css';

const LAST_UPDATED = 'August 19, 2026';

const MAILTO = `mailto:${SITE.email}`;

const SECTIONS = [
  {
    id: 'scope',
    title: 'Who this policy covers',
    content: (
      <>
        <p>
          {SITE.name} is a one-person software consultancy run by {SITE.founder}. This policy
          describes what happens to information collected through the website at{' '}
          <span className="hi">leducsystems.com</span>, including anything you send through the
          contact form on that site.
        </p>
        <p>
          Work performed for a client is governed by the written agreement for that engagement,
          not by this page. Where that agreement says something different about handling your
          data, the agreement controls.
        </p>
      </>
    ),
  },
  {
    id: 'contact-form',
    title: 'What the contact form collects',
    content: (
      <>
        <p>
          The contact form is the only place on this site where you are asked to type anything.
          When you submit it, the following is sent to me:
        </p>
        <ul className="list">
          <li>Your name and email address</li>
          <li>Your company name and, if you provide it, your phone number</li>
          <li>Company size, project type, and timeline, where you select them</li>
          <li>The description of what you are trying to build</li>
          <li>Any file you choose to attach</li>
        </ul>
        <p>
          That message is delivered to <span className="hi">{SITE.email}</span> through EmailJS, a
          third-party form-delivery service. EmailJS processes the submission in order to send the
          email and is the only service that handles the contents of your message besides my email
          provider.
        </p>
        <p>
          Everything you send is used for one purpose: to reply to you and to have the
          conversation you started. It is not added to a mailing list, not used for advertising,
          and not passed to anyone else.
        </p>
      </>
    ),
  },
  {
    id: 'local-drafts',
    title: 'Drafts saved in your own browser',
    content: (
      <>
        <p>
          While you are filling in the contact form, what you have typed so far is saved in your
          browser&rsquo;s local storage so that a refresh or a closed tab does not lose it. That
          draft stays on your device. It is not transmitted anywhere, and it is cleared once the
          form is submitted. Clearing your browser&rsquo;s site data removes it immediately.
        </p>
      </>
    ),
  },
  {
    id: 'analytics',
    title: 'Analytics',
    content: (
      <>
        <p>
          This site uses Google Analytics (measurement ID{' '}
          <span className="hi">G-VPCZV3J5CQ</span>, loaded via Google&rsquo;s gtag.js script) to
          understand which pages people read and how they arrived. What that records is standard
          web analytics data: pages viewed, referring site, approximate location derived from your
          IP address, and general device and browser information.
        </p>
        <p>
          I look at this in aggregate. It is not used to build a profile of you, and it is not
          connected to anything you submit through the contact form.
        </p>
        <p>
          This site sets no cookies of its own. Google Analytics sets its own cookies in order to
          tell one visit apart from another. You can block them with your browser&rsquo;s settings,
          with any content blocker, or with Google&rsquo;s official Analytics opt-out browser
          add-on, and the site will keep working normally.
        </p>
      </>
    ),
  },
  {
    id: 'hosting',
    title: 'Hosting',
    content: (
      <>
        <p>
          The site is a static site served by GitHub Pages. Like any web host, GitHub receives the
          ordinary request information required to deliver a page to you, including your IP address
          and browser user agent. I do not have access to those server logs, and I do not maintain
          logs of my own.
        </p>
      </>
    ),
  },
  {
    id: 'not-collected',
    title: 'What this site does not do',
    content: (
      <>
        <p>Stated plainly, so there is no ambiguity about it:</p>
        <ul className="list">
          <li>There are no user accounts, logins, or passwords</li>
          <li>No payments are taken through this site, so no payment details are collected</li>
          <li>There are no advertising pixels, retargeting tags, or ad networks</li>
          <li>There is no session recording, heatmapping, or screen capture</li>
          <li>Your information is never sold, rented, or traded</li>
          <li>
            Nothing is shared with anyone beyond the services named in this policy, except where I
            am legally required to disclose it
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long information is kept',
    content: (
      <>
        <p>
          Messages you send stay in my email account for as long as they are useful to the
          conversation and to normal business records. If you ask me to delete a message and
          anything attached to it, I will, and I will confirm when it is done.
        </p>
        <p>
          Analytics data is held by Google under the retention setting configured in that product
          and is deleted by Google on that schedule. I hold no separate copy of it.
        </p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content: (
      <>
        <p>You can, at any time and without explaining why:</p>
        <ul className="list">
          <li>Ask for a copy of everything you have sent me</li>
          <li>Ask me to correct something</li>
          <li>Ask me to delete your messages and any attachments</li>
          <li>Opt out of analytics using your browser settings or a blocker</li>
          <li>
            Skip the form entirely and email me at{' '}
            <a className="link-underline" href={MAILTO}>
              {SITE.email}
            </a>
          </li>
        </ul>
        <p>
          Requests go to <span className="hi">{SITE.email}</span> and get a reply within one
          business day.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <>
        <p>
          The site is served over HTTPS, and form submissions are encrypted in transit. Messages
          land in an ordinary email account. No system is beyond compromise, and I am not going to
          claim otherwise, but nothing sensitive needs to be sent through this form. If you have
          something confidential to share, say so first and we will agree on a sensible way to
          send it.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <>
        <p>
          This site is aimed at businesses and is not directed at children under 13. I do not
          knowingly collect information from them. If you believe a child has sent something
          through the form, email me and I will delete it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <>
        <p>
          If what this site does changes, this page changes with it and the date at the top is
          updated. There is no archive of previous versions; the page you are reading is the
          current one.
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
          Questions about this policy, or about anything you have sent through the site, go
          directly to me at{' '}
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="What Le Duc Systems collects through this website: contact form submissions delivered by EmailJS and Google Analytics traffic data. Nothing else, and nothing sold."
        path="/privacy"
      />

      <section className="section legal-hero">
        <div className="bg-glow" aria-hidden="true" />
        <div className="container container--narrow layer stack stack--lg">
          <Reveal className="stack">
            <p className="eyebrow">Legal</p>
            <h1 className="h1">Privacy Policy</h1>
            <div className="legal-hero__meta">
              <span className="pill">Last updated: {LAST_UPDATED}</span>
              <span className="mono">{SITE.name}</span>
            </div>
            <div className="note legal-summary">
              <p>
                <strong>The short version:</strong> this site collects nothing except what you
                choose to type into the contact form, plus ordinary traffic statistics from Google
                Analytics. Your message is emailed to me and used to reply to you. Nothing is sold,
                nothing is shared beyond the two services named below, and you can have anything
                you sent me deleted by asking.
              </p>
            </div>
          </Reveal>

          <Reveal className="legal-toc" delay={90} as="nav" aria-label="Sections of this policy">
            <p className="mono">Contents</p>
            <ul className="legal-toc__list">
              {SECTIONS.map((section, i) => (
                <li key={section.id}>
                  <a className="legal-toc__link" href={`#${section.id}`}>
                    <span className="legal-toc__num">{num(i)}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--rule section--tight">
        <div className="container container--narrow">
          <Reveal as="article" className="legal-doc" delay={60}>
            {SECTIONS.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 className="h3 legal-section__title" id={`${section.id}-title`}>
                  <span className="legal-section__num">{num(i)}</span>
                  <span>{section.title}</span>
                </h2>
                {section.content}
              </section>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--rule section--tight">
        <div className="container container--narrow">
          <Reveal className="stack">
            <p className="eyebrow">Next</p>
            <h2 className="h2">Still have a question about your data?</h2>
            <p className="lede">
              Ask me directly rather than guessing at what a policy page means. {RESPONSE_PROMISE}
            </p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
              </Link>
              <a className="link-arrow" href={MAILTO}>
                Email {SITE.email}
              </a>
            </div>
            <p className="body--sm dim">
              See also the{' '}
              <Link className="link-underline" to="/terms">
                Terms of Service
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
