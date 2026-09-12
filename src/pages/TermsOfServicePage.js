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
    id: 'acceptance',
    title: 'Acceptance of these terms',
    content: (
      <>
        <p>
          These terms apply to your use of the website at{' '}
          <span className="hi">leducsystems.com</span> and to consulting services provided by{' '}
          {SITE.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;), a software consultancy operated by{' '}
          {SITE.founder}. By using the site or engaging me for work, you agree to what is written
          here. If you do not, do not use the site and do not engage me.
        </p>
      </>
    ),
  },
  {
    id: 'precedence',
    title: 'What controls if documents disagree',
    content: (
      <>
        <p>
          Every engagement starts with a written proposal or statement of work that describes the
          specific job: what gets built, what explicitly does not, the timeline, the price, and
          what I need from you. That document is the agreement between us.
        </p>
        <p>
          Where a signed proposal, statement of work, or master services agreement says something
          different from this page, that document controls and this page fills in the rest.
        </p>
      </>
    ),
  },
  {
    id: 'services',
    title: 'Services',
    content: (
      <>
        <p>Work offered under these terms includes:</p>
        <ul className="list">
          <li>Custom software design, development, and deployment</li>
          <li>Language-model and other AI features built into your product</li>
          <li>Evaluation, testing, guardrails, and observability for those features</li>
          <li>Technical planning, architecture, and consulting</li>
          <li>Ongoing iteration, maintenance, and support</li>
        </ul>
        <p>
          The scope of any particular engagement is whatever the written proposal for it says,
          and nothing more.
        </p>
      </>
    ),
  },
  {
    id: 'changes-in-scope',
    title: 'Scope and changes',
    content: (
      <>
        <p>
          Scope is agreed before work starts. If you want something outside it, that is fine and
          normal: it gets estimated and agreed in writing before it is built, not discovered on an
          invoice afterwards. Nothing outside the agreed scope is owed until it has been agreed.
        </p>
      </>
    ),
  },
  {
    id: 'your-responsibilities',
    title: 'What I need from you',
    content: (
      <>
        <p>Delivery depends on your side of the work as much as mine. You are responsible for:</p>
        <ul className="list">
          <li>Timely access to the systems, accounts, data, and people the work requires</li>
          <li>Decisions and feedback within the timeframes set out in the proposal</li>
          <li>
            Having the right to give me any data, content, or credentials you provide, and for that
            data being lawful to process
          </li>
          <li>Your own infrastructure costs and third-party service fees</li>
        </ul>
        <p>
          Where a delay on your side moves the schedule, the schedule moves. I will tell you when
          that is happening rather than quietly absorbing it.
        </p>
      </>
    ),
  },
  {
    id: 'fees',
    title: 'Fees and payment',
    content: (
      <>
        <p>
          Fees, invoicing schedule, and payment terms are set out in the written proposal for the
          engagement. No prices are published on this site, because a real number depends on real
          scope.
        </p>
        <p>
          Cancellation, pausing, and any refund of prepaid amounts are handled the way the
          engagement agreement describes. Engagements are phased so that there is a natural stopping
          point at the end of each phase.
        </p>
      </>
    ),
  },
  {
    id: 'ownership',
    title: 'Ownership of the work',
    content: (
      <>
        <p>
          Work produced for you under an engagement is done on a work-for-hire basis. On full
          payment for the phase in which it was produced, all right, title, and interest in the
          deliverables &mdash; source code, configuration, documentation, and designs created
          specifically for you &mdash; belongs to you. To the extent anything does not qualify as
          work made for hire by law, it is assigned to you at that point.
        </p>
        <p>
          You keep everything you already owned and brought to the engagement. I keep no license to
          your material beyond what is needed to do the work.
        </p>
        <p>
          I retain my general skills, knowledge, techniques, and any generic tooling or boilerplate
          that is not specific to your project, and I may reuse those elsewhere. Third-party and
          open-source components remain under their own licenses; the proposal identifies any that
          the work depends on.
        </p>
        <p>
          There is no proprietary runtime, no license to renew, and nothing that stops working if
          we stop working together. I will not reference you publicly as a client without your
          written permission.
        </p>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    content: (
      <>
        <p>
          Each of us will keep the other&rsquo;s non-public information confidential and use it only
          for the engagement. That covers business plans, technical specifications, source code,
          customer data, and financial information.
        </p>
        <p>
          It does not cover information that is already public, that was already known without a
          duty of confidence, that is independently developed, or that must be disclosed by law
          &mdash; and in that last case I will tell you first where I am permitted to. These
          obligations continue for five years after the engagement ends.
        </p>
      </>
    ),
  },
  {
    id: 'ai-tools',
    title: 'Use of AI tools in delivery',
    content: (
      <>
        <p>
          I use AI development tools as part of how the work gets done, and it is part of why the
          work moves at this pace. Every line that ships is reviewed, tested, and
          understood, and I am accountable for the result exactly as I would be if I had typed
          every character.
        </p>
        <p>
          If your compliance posture restricts how AI tools may be used on your code or your data,
          tell me before the engagement starts so the constraints go into the agreement rather than
          coming up afterwards.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: 'No warranty of fitness, no guaranteed outcome',
    content: (
      <>
        <p>
          I will do the work with reasonable skill and care, and I will fix defects in the
          deliverables that are reported during the warranty window stated in the engagement
          agreement.
        </p>
        <p className="legal-fineprint">
          Beyond that, and to the maximum extent permitted by law, the website, the services, and
          the deliverables are provided without warranties of any kind, whether express or implied,
          including any implied warranty of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
        <p>
          I do not warrant that software will be uninterrupted or error-free, and I do not
          guarantee any particular business, financial, or performance outcome. Where a deliverable
          uses a language model, its output is probabilistic and can be wrong; you are responsible
          for deciding where human review is required before that output is relied on.
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
          incidental, special, consequential, or punitive damages, or for lost profits, lost
          revenue, lost data, loss of goodwill, or business interruption, however caused and
          regardless of the theory of liability.
        </p>
        <p>
          Total aggregate liability arising out of or relating to an engagement will not exceed the
          amount you actually paid for the services that gave rise to the claim in the twelve months
          before it arose. Nothing here limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: 'Indemnification',
    content: (
      <>
        <p>
          You agree to cover claims, damages, and reasonable expenses arising from content, data,
          or credentials you provide, from your use or modification of the deliverables after
          handover, and from your breach of these terms or of applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    content: (
      <>
        <p>
          Either of us may end an engagement with written notice on the terms set out in the
          engagement agreement. On termination you pay for work completed up to that point, I hand
          over everything produced and paid for, and each of us returns or destroys the
          other&rsquo;s confidential information on request.
        </p>
        <p>
          Support after termination is only provided under a separate agreement. Monthly
          arrangements can be cancelled at the end of any month.
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
          The content on this site is general information about how I work. It is not legal,
          financial, or technical advice for your situation, and reading it does not create a
          client relationship. I make no promise that the site will always be available or free of
          errors.
        </p>
        <p>
          The text, design, and marks on this site belong to {SITE.name}. Do not copy the site
          wholesale or present it as your own. Quoting or linking to it is welcome.
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
          The contact form is delivered by EmailJS and site traffic is measured with Google
          Analytics. Those services are operated by their own companies under their own terms, and
          I am not responsible for how they run. What they receive and why is described in the{' '}
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
    title: 'Governing law and disputes',
    content: (
      <>
        <p>
          These terms are governed by the laws of the United States and of the state in which{' '}
          {SITE.name} is established, without regard to conflict-of-law rules. The specific
          jurisdiction and venue that apply to an engagement are named in that engagement&rsquo;s
          written agreement.
        </p>
        <p>
          If a dispute comes up, the first step is a direct conversation in good faith. Most things
          that look like disputes are misunderstandings about scope, and they are cheaper to fix by
          talking. Any formal process that follows is the one set out in the engagement agreement.
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
          These terms may be updated, and the date at the top changes when they are. Updates apply
          to use of the site from the date they are posted and to engagements agreed after that
          date. They do not retroactively change an agreement already signed.
        </p>
      </>
    ),
  },
  {
    id: 'entire-agreement',
    title: 'Entire agreement and severability',
    content: (
      <>
        <p>
          These terms, together with the proposal or statement of work for an engagement, are the
          whole agreement between us on their subject and replace anything discussed beforehand. If
          any provision is held unenforceable, the rest stays in force. Not enforcing something
          straight away does not waive it.
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
        description="The terms covering work by Le Duc Systems: written scope up front, work-for-hire deliverables you own on payment, no warranty of fitness, and a capped limitation of liability."
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
                Start a project
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
              <strong>The short version:</strong> I do the work described in a written proposal,
              you pay for it, and once you have paid you own everything built for you. I do not
              promise a specific business outcome, and what I can be liable for is capped at what
              you paid me. If the proposal you signed disagrees with this page, the proposal wins.
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
              {/* The closing clause of the sheet, so it takes the number
                  after the last one rather than a mark of its own. */}
              <span className="ordinal">{num(SECTIONS.length)}</span>
              <span>Next</span>
            </p>
            <h2 className="h2">Want to see this applied to a real scope?</h2>
            <p className="lede">
              Tell me what you are trying to build and you will get a written proposal that says
              exactly what these terms are attached to. {RESPONSE_PROMISE}
            </p>
            <div className="cluster">
              <Link className="btn btn--primary btn--lg" to="/contact">
                Start a project
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
