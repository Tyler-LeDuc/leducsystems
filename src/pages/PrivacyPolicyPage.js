import React from 'react';
import { Link } from 'react-router-dom';
import LegalDocument from '../components/LegalDocument';
import { SITE } from '../data/site';

const LAST_UPDATED = 'November 10, 2026';

const MAILTO = `mailto:${SITE.email}`;
const DELETE_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Privacy request')}`;

/* Every statement below describes what the code actually does. Sources:
   the contact form (src/ContactForm.js), the consent script (public/index.html
   and leduc-tools src/consent.js), and the conversion server
   (apps/pub-converter/pub2idml/server.py: KEEP_HOURS=24, paid files kept 7x,
   DATA/notify.jsonl, DATA/licenses, DATA/passes, DATA/tryon, request log lines
   with the client IP). If any of those change, change this page. */
const SECTIONS = [
  {
    id: 'scope',
    title: 'Who I am and what this covers',
    content: (
      <>
        <p>
          {SITE.legalName} is a one-person software company in {SITE.city}, {SITE.region}, run
          by {SITE.founder}. In this policy, &ldquo;I&rdquo; and &ldquo;me&rdquo; mean {SITE.legalName}.
          I am the controller of the personal information described here.
        </p>
        <p>
          This policy covers the website at <span className="hi">leducsystems.com</span>, the tools
          under <span className="hi">leducsystems.com/tools/</span>, the conversion and licensing
          server at <span className="hi">convert.leducsystems.com</span>, Scan Relay, the virtual
          try-on, the LeDuc File Opener browser extension, the LeDuc Systems connector for Claude,
          and email you exchange with me. It does not cover the games on itch.io, which
          itch.io runs under its own policy.
        </p>
      </>
    ),
  },
  {
    id: 'summary-table',
    title: 'What I collect, why, and for how long',
    content: (
      <>
        <ul className="list">
          <li>
            <strong>Contact form and email.</strong> Your name, email address, message, the
            product you name and any file you attach. Used to reply to you. Kept in my mailbox for
            as long as the conversation and normal business records need it, or until you ask me
            to delete it.
          </li>
          <li>
            <strong>Files you upload to a converter</strong> (Publisher, PageMaker, bulk converter,
            PowerPoint text wrap). Used only to make your preview and download. Deleted
            automatically within 24 hours, or within 7 days if you paid so you can download again.
          </li>
          <li>
            <strong>Server request logs.</strong> Time, your IP address, the address requested and
            short event notes (for example, a conversion&rsquo;s page count and duration, or the
            first characters of a license key that failed a check). Used to prevent abuse, limit
            how many conversions one address can run per hour, and fix problems. The logs are
            rotated by the server&rsquo;s operating system when they reach its size limit.
          </li>
          <li>
            <strong>Purchases.</strong> Stripe collects your card details, email address, name and
            billing country on its own checkout page. I receive your email, name, what you bought
            and whether the payment went through. I never see your full card number.
          </li>
          <li>
            <strong>License keys</strong> (Scan Relay, FIRE to IRIS and spreadsheet to IRIS,
            InfoPath to Excel) and <strong>30-day passes</strong>. The key, the product, the
            purchase time, the Stripe checkout ID and your email, kept on my server for as long as
            the key or pass can be used, so I can confirm it is valid and help you if you lose it.
          </li>
          <li>
            <strong>Try-on subscriptions.</strong> Your store&rsquo;s domain, plan, email, the name
            on the checkout, your Stripe customer and subscription IDs, and the subscription&rsquo;s
            status. Kept while the subscription runs and afterwards for my business records.
          </li>
          <li>
            <strong>&ldquo;Email me when it&rsquo;s ready&rdquo;.</strong> Your email, the product
            and the time. Used to send that one message. Ask me and I remove it.
          </li>
          <li>
            <strong>Analytics, only if you accept cookies.</strong> Pages viewed, referring site,
            approximate location from your IP address, device and browser type, and tool events
            such as &ldquo;file converted&rdquo; (never the file or its contents). See{' '}
            <a className="link-underline" href="#cookies">
              Cookies
            </a>
            .
          </li>
        </ul>
        <p>
          I don&rsquo;t ask for more than a product needs. There are no user accounts or passwords,
          and I don&rsquo;t buy data about you from anyone.
        </p>
      </>
    ),
  },
  {
    id: 'contact-form',
    title: 'The contact form',
    content: (
      <>
        <p>
          The form on the contact page is delivered by EmailJS, a form-delivery service, to my
          mailbox at <span className="hi">{SITE.email}</span>, which is hosted by Google Workspace.
          While you type, a draft is saved in your own browser (local storage, key{' '}
          <span className="hi">ldsContactDraft</span>) so a refresh doesn&rsquo;t lose it. The
          draft never leaves your device and is cleared when the message is sent.
        </p>
        <p>
          What you send is used only to reply to you. It is not added to a mailing list and not
          used for advertising.
        </p>
      </>
    ),
  },
  {
    id: 'tools',
    title: 'The tools and where your files go',
    content: (
      <>
        <p>
          <strong>Tools that run in your browser and upload nothing:</strong> the Rhino converter,
          FIRE to IRIS, spreadsheet to IRIS, InfoPath to Excel and the try-on demo. Your file stays
          on your computer. When you buy a license for one of them, the page asks my server whether
          the key is valid, and saves the key in your browser&rsquo;s local storage so you
          don&rsquo;t have to paste it again.
        </p>
        <p>
          <strong>Tools that upload your file:</strong> the Publisher and PageMaker converters, the
          bulk converter and PowerPoint text wrap need software that can&rsquo;t run in a browser,
          so your file is sent over HTTPS to <span className="hi">convert.leducsystems.com</span>,
          a server I rent from Hetzner Online in Germany. The file and its converted versions are
          used only to make your preview and download, and are deleted automatically within 24
          hours, or within 7 days if you paid. I don&rsquo;t open your files. If you send me a file
          by email because a conversion went wrong, I use it only to fix that problem.
        </p>
        <p>
          <strong>Scan Relay</strong> runs on your own Windows PC. Your scans go from the copier to
          that PC and then straight to Microsoft 365; they never pass through my servers. The
          Microsoft sign-in it uses is stored on that PC. The only thing Scan Relay sends me is
          your license key, to check that it is valid. The details, checked against its source
          code, are in{' '}
          <a className="link-underline" href="/tools/scan-relay-security/">
            How Scan Relay handles your mail
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'file-opener',
    title: 'The LeDuc File Opener browser extension',
    content: (
      <>
        <p>
          The extension collects nothing and sends nothing to me on its own. It has no analytics
          and no ads, and it runs no code from the internet. It looks at your browser&rsquo;s
          download list only to find Publisher, Project, Visio and InfoPath files, and it stores
          only your notification setting, in your browser.
        </p>
        <p>
          When you click &ldquo;Open in viewer&rdquo; (or &ldquo;Open with LeDuc viewer&rdquo; on a
          link), the extension reads that one file, from your disk if you have allowed file access,
          otherwise again from the site it was downloaded from, and hands it to the matching tool
          page on leducsystems.com. To read from a site, it asks your permission for that site
          first. From there the file is handled exactly as if you had dropped it on the page, as
          described above.
        </p>
      </>
    ),
  },
  {
    id: 'tryon',
    title: 'The virtual try-on',
    content: (
      <>
        <p>
          The try-on runs entirely in the shopper&rsquo;s browser. Face tracking and drawing the
          makeup happen on the device; no camera frames, photos or face measurements are sent to
          me or stored anywhere. On the leducsystems.com try-on pages, the face-tracking model
          files are served from this site.
        </p>
        <p>
          When a store adds the try-on to its own website, the store decides how it is used there
          and is responsible for the notices it gives its shoppers. The embed script loads from my
          server, which checks that the store&rsquo;s plan is active; like any web request, that
          request includes the shopper&rsquo;s IP address and the store&rsquo;s domain, which appear
          in the server request log described above.
        </p>
        <p>
          When a store signs up, I keep the details listed under{' '}
          <a className="link-underline" href="#summary-table">
            What I collect
          </a>{' '}
          (domain, plan, email, Stripe customer and subscription IDs) on my server to run the plan.
        </p>
      </>
    ),
  },
  {
    id: 'fax',
    title: 'Sending a fax',
    content: (
      <>
        <p>
          To send a fax, the files you add, the fax number and any cover page text are sent to my
          server, turned into one PDF and kept only to send it. Files you add but don&rsquo;t send
          are deleted after 24 hours, and unpaid faxes after 2 days. After a fax is sent (or fails
          for good), the document and the cover page text are deleted 7 days later. A short record
          (the fax number, page count, times, the outcome and the Stripe payment ID) is kept for 90
          days so the delivery confirmation and refunds work, then deleted.
        </p>
        <p>
          The fax is delivered through Telnyx, a telecom provider, which fetches the PDF from my
          server and transmits it to the number you entered. I don&rsquo;t read your faxes. The
          link to a fax&rsquo;s status page is kept in your browser&rsquo;s local storage so you can
          find recent faxes again; clear site data to remove it.
        </p>
      </>
    ),
  },
  {
    id: 'ai-visibility',
    title: 'AI visibility check',
    content: (
      <>
        <p>
          When you run the free AI visibility check, the business name, category, city, website and
          email address you enter are sent to my server. The business details and a few buyer-style
          questions built from them are sent to OpenAI to get ChatGPT&rsquo;s answers, and my server
          fetches the public pages of the website you entered. Your email address is not sent to
          OpenAI.
        </p>
        <p>
          The check&rsquo;s result is kept for 60 days so the report link works, then deleted. A short
          record of the request (the details above and the time) is kept so I can limit free checks
          and follow up with you once about the result, until you ask me to delete it. Email{' '}
          <a className="link-underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{' '}
          and I&rsquo;ll delete it.
        </p>
      </>
    ),
  },
  {
    id: 'claude-connector',
    title: 'The LeDuc Systems connector for Claude',
    content: (
      <>
        <p>
          <strong>What it receives.</strong> When you use my connector in Claude, Claude sends it
          only what the tool needs: the file (as a link, as file data, or through an upload link you
          open), the output format you asked for, and a license key if you give one. It does not
          receive your conversation, your Claude memory or your account details, and it
          doesn&rsquo;t ask for them.
        </p>
        <p>
          <strong>How files are handled.</strong> Files are converted on my server in Germany
          (Hetzner), the same one that runs the tools on this site, and the rules are the same:
        </p>
        <ul className="list">
          <li>
            Publisher and PageMaker files: converted and kept for 24 hours, or 7 days once paid, so
            you can download again. Then they are deleted automatically.
          </li>
          <li>Visio and Project files: read or rendered, then deleted before the answer is sent.</li>
          <li>InfoPath forms: read in memory on the connector server and not stored.</li>
          <li>
            Upload links: a file you upload through a link Claude gives you waits up to 30 minutes
            for Claude to use it, then is deleted. An unused link expires after 30 minutes.
          </li>
          <li>
            Licensed downloads (Visio PDF/PNG, Project Excel/CSV, InfoPath Excel/CSV): the converted
            file is held for up to 15 minutes or 5 downloads, whichever comes first, then deleted.
          </li>
        </ul>
        <p>
          I never open, read or share your files. Restarting the server deletes any files that are
          waiting.
        </p>
        <p>
          <strong>Logs.</strong> The connector logs which tool was used, whether it worked, how long
          it took, and the size of an upload. It does not log file names, file contents or anything
          you said to Claude. The convert server behind it keeps the same request log as for the
          website: time, the address requested (which includes a license key when one is checked)
          and short notes such as a page count. Rate limits use a scrambled (hashed) form of your
          network address or Claude session, not your IP. Logs are rotated by the server&rsquo;s
          operating system when they reach its size limit.
        </p>
        <p>
          <strong>Payments.</strong> Paid downloads use Stripe Checkout, which you complete in your
          browser. I never see your card details. Stripe&rsquo;s privacy policy applies to the
          payment.
        </p>
        <p>
          <strong>Third parties.</strong> Files are not shared with anyone. The only outside
          services involved are Hetzner (hosting) and Stripe (only if you buy something).
        </p>
        <p>
          <strong>Questions or deletion requests:</strong>{' '}
          <a className="link-underline" href={DELETE_MAILTO}>
            {SITE.email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and similar storage',
    content: (
      <>
        <p>
          The site uses Google Analytics (measurement ID <span className="hi">G-VPCZV3J5CQ</span>)
          to count visits, and only if you click Accept on the cookie banner. Until then, and if you
          click Decline, the Google Analytics script is not loaded at all. When it is loaded it sets
          these cookies:
        </p>
        <ul className="list">
          <li>
            <span className="hi">_ga</span> and <span className="hi">_ga_&lt;ID&gt;</span>: set by
            Google to tell one visitor&rsquo;s visits apart. They last up to two years unless you
            delete them. Advertising features are switched off: ad storage and ad personalisation
            are always denied.
          </li>
        </ul>
        <p>Things saved in your browser that are not used for tracking:</p>
        <ul className="list">
          <li>
            <span className="hi">ldsConsent</span>: your Accept or Decline choice, so the banner
            doesn&rsquo;t ask again.
          </li>
          <li>
            <span className="hi">ldsContactDraft</span>: the contact-form draft described above.
          </li>
          <li>License keys and 30-day passes you bought, so the tools remember them.</li>
        </ul>
        <p>
          To change your choice, use{' '}
          <button type="button" className="link-underline legal-inline-button" data-cookie-settings>
            Cookie settings
          </button>{' '}
          (also in the footer of every page). Declining after you had accepted stops Google
          Analytics and deletes its cookies for this site. You can also clear cookies in your
          browser. I do not respond to the &ldquo;Do Not Track&rdquo; browser signal, but I honour
          Decline.
        </p>
        <p>
          There are no advertising pixels, retargeting tags or session recording on this site. The
          fonts are served from this site, not from Google Fonts.
        </p>
      </>
    ),
  },
  {
    id: 'processors',
    title: 'Who else handles your information',
    content: (
      <>
        <p>I use these service providers, each only for the job named:</p>
        <ul className="list">
          <li>
            <strong>Stripe</strong> (payments and receipts). Stripe also uses payment data under
            its own privacy policy, for example to prevent fraud.
          </li>
          <li>
            <strong>Hetzner Online</strong> (the server at convert.leducsystems.com, in Germany).
          </li>
          <li>
            <strong>Telnyx</strong> (transmits faxes you send to the number you enter).
          </li>
          <li>
            <strong>OpenAI</strong> (answers the questions in the free AI visibility check).
          </li>
          <li>
            <strong>Google</strong>: Google Workspace for my email, and Google Analytics if you
            accept cookies.
          </li>
          <li>
            <strong>EmailJS</strong> (delivers contact-form messages to my mailbox).
          </li>
          <li>
            <strong>GitHub Pages</strong> (hosts this website). GitHub receives the ordinary request
            information needed to serve a page, such as your IP address; I don&rsquo;t receive those
            logs.
          </li>
        </ul>
        <p>
          I don&rsquo;t sell or rent personal information, and I don&rsquo;t share it for
          advertising. I disclose it otherwise only if the law requires it, to protect my rights or
          prevent fraud, or to a buyer of the business, who would be bound by this policy.
        </p>
      </>
    ),
  },
  {
    id: 'business-email',
    title: 'Emails to businesses',
    content: (
      <>
        <p>
          I sometimes email businesses directly about a product that solves a problem they are
          likely to have, using a business email address the company publishes. Each email says who
          I am, gives a postal address, and lets you opt out by replying STOP; I then stop emailing
          that address. You can also ask me what I hold about you and to delete it.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights and how to delete your data',
    content: (
      <>
        <p>Wherever you live, you can ask me to:</p>
        <ul className="list">
          <li>Tell you what personal information I hold about you and give you a copy</li>
          <li>Correct it</li>
          <li>Delete it</li>
          <li>Stop using it for a purpose you object to</li>
          <li>Stop emailing you</li>
        </ul>
        <p>
          <strong>To make a request,</strong> email{' '}
          <a className="link-underline" href={DELETE_MAILTO}>
            {SITE.email}
          </a>{' '}
          from the address you used with me, saying what you want. I reply within one business day
          and finish the request within 30 days, and I confirm when it&rsquo;s done. I may ask a
          question to confirm the request comes from you. If I have to keep something (for example,
          payment records that tax law requires me to keep), I&rsquo;ll tell you what and why.
          Records held by Stripe can also be requested from Stripe directly.
        </p>
        <p>
          <strong>In the UK and EEA</strong>, you also have the right to data portability, to
          restrict processing, and to complain to your data protection authority. The legal bases I
          rely on are: performing a contract with you (purchases, licenses, conversions,
          subscriptions, replying to you), my legitimate interests (preventing abuse, keeping
          business records, emailing businesses about relevant products), legal obligations (tax
          records), and your consent (analytics cookies, which you can withdraw at any time).
        </p>
        <p>
          <strong>In US states with privacy laws</strong> (such as California, Colorado, Connecticut,
          Virginia and others), you have the rights listed above and the right not to be
          discriminated against for using them. I don&rsquo;t sell personal information or share it
          for targeted advertising, and I don&rsquo;t use it for profiling or automated decisions
          with legal or similarly significant effects. If I turn down a request, you can appeal by
          replying to my answer.
        </p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'International transfers',
    content: (
      <>
        <p>
          I am based in the United States, and some of the providers above store data in the United
          States. If you are outside the US, your information will be processed there, where privacy
          law may differ from yours. Uploaded files are processed on my server in Germany.
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
          The site and the conversion server use HTTPS. Uploaded files are deleted on the schedule
          above, and the conversion software runs with restricted access on the server. No system
          is completely secure and I can&rsquo;t guarantee yours won&rsquo;t be affected by a
          breach, but if one affects your information I will tell you as the law requires.
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
          My products are for businesses and adults. They are not directed at children, and I do
          not knowingly collect personal information from anyone under 13 (or under 16 in the UK
          and EEA). If you believe a child has sent me information, email me and I will delete it.
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
          When what I do changes, this page changes with it and the date at the top is updated.
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
          {SITE.legalName}, {SITE.legalForm}, {SITE.city}, {SITE.region}, United States. Phone{' '}
          <a className="link-underline" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
          . Email{' '}
          <a className="link-underline" href={MAILTO}>
            {SITE.email}
          </a>{' '}
          or use the{' '}
          <Link className="link-underline" to="/contact">
            contact form
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      mark="A"
      title="Privacy Policy"
      path="/privacy"
      description="What LeDuc Systems collects, why, how long it keeps it, who processes it (Stripe, Hetzner, Google, EmailJS), and how to get your data deleted."
      lastUpdated={LAST_UPDATED}
      summary={
        <>
          I collect what each product needs and nothing more: what you send me, files you upload
          for conversion (deleted within a day, or a week if you paid), purchase and license
          records, and analytics only if you accept cookies. Nothing is sold. Email{' '}
          <a className="link-underline" href={DELETE_MAILTO}>
            {SITE.email}
          </a>{' '}
          and I&rsquo;ll send you a copy of your data or delete it.
        </>
      }
      sections={SECTIONS}
      credit
    />
  );
}
