import React from 'react';
import { Link } from 'react-router-dom';
import LegalDocument from '../components/LegalDocument';
import { SITE } from '../data/site';

const LAST_UPDATED = 'November 11, 2026';

const MAILTO = `mailto:${SITE.email}`;
const CANCEL_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Cancel my try-on plan')}`;

/* Product terms here must match the product pages under /tools/ (prices,
   trial, refund windows) and the conversion server's Stripe descriptions. */
const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Who these terms are with',
    content: (
      <>
        <p>
          These terms are an agreement between you and {SITE.legalName}, an Arizona limited
          liability company run by {SITE.founder} (&ldquo;I&rdquo;, &ldquo;me&rdquo;). They cover
          this website, the tools under <span className="hi">leducsystems.com/tools/</span>, Scan
          Relay, the virtual try-on, and anything you buy from me. By using the site or buying a
          product, you agree to them. If you don&rsquo;t agree, don&rsquo;t use them.
        </p>
        <p>
          My products are for businesses and adults. You must be at least 18 (or the age of majority
          where you live) to buy, and if you buy for a company, you confirm you may bind it to these
          terms.
        </p>
      </>
    ),
  },
  {
    id: 'buying',
    title: 'Prices and payment',
    content: (
      <>
        <p>
          Every product page shows its price, in US dollars, before you pay, and the Stripe checkout
          page shows the total before you confirm. There are no hidden fees. Payments are taken by
          Stripe on its own checkout page; I never see your card number. Most tools let you try
          your own file or a free trial first, so you can check a product works before paying.
        </p>
      </>
    ),
  },
  {
    id: 'licenses',
    title: 'What each purchase gives you',
    content: (
      <>
        <ul className="list">
          <li>
            <strong>Publisher, PageMaker and PowerPoint converters:</strong> the converted files for
            the file you paid for, or, with a 30-day pass, unlimited conversions for 30 days. You
            can use the converted files however you like.
          </li>
          <li>
            <strong>Scan Relay:</strong> a lifetime license for one office (one PC), with free
            updates. Dealer packs give you that number of single-office licenses to install at your
            clients&rsquo; offices.
          </li>
          <li>
            <strong>FIRE to IRIS and spreadsheet to IRIS:</strong> a license for one payer (one
            business) for the 2027 filing season.
          </li>
          <li>
            <strong>InfoPath to Excel:</strong> a one-time license for as many forms as you need.
          </li>
        </ul>
        <p>
          A license key is for you (or, for dealer packs, your clients) and the use it was sold for.
          Don&rsquo;t publish, share or resell keys, and don&rsquo;t try to get around license
          checks, payment, or the limits on free use. The software itself stays mine; you get the
          right to use it, not ownership of it.
        </p>
      </>
    ),
  },
  {
    id: 'subscriptions',
    title: 'Try-on subscriptions',
    content: (
      <>
        <ul className="list">
          <li>
            Plans are billed monthly in advance by Stripe: Starter is $49 a month, Growth $149 a
            month, as shown on the try-on page.
          </li>
          <li>
            Every plan starts with a 14-day free trial. Stripe takes your card when you sign up and
            makes the first charge when the trial ends, unless you have cancelled.
          </li>
          <li>
            The plan renews every month until you cancel. To cancel, email{' '}
            <a className="link-underline" href={CANCEL_MAILTO}>
              {SITE.email}
            </a>{' '}
            from the address on the plan. I cancel it the same business day and confirm by email.
            Cancel during the trial and you are not charged at all.
          </li>
          <li>
            Cancelling stops all future charges. I don&rsquo;t refund part of a month already paid,
            except as the{' '}
            <Link className="link-underline" to="/refunds">
              Refund Policy
            </Link>{' '}
            says.
          </li>
          <li>
            If I change a plan&rsquo;s price, I will email you at least 30 days before the new price
            applies to you, so you can cancel first.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'tryon-license',
    title: 'Using the try-on on your store',
    content: (
      <>
        <ul className="list">
          <li>
            Each plan covers one store: the domain you signed up with and its subdomains. Using it on
            another domain needs its own plan.
          </li>
          <li>
            The try-on engine, the embed script and the keys it issues remain mine. You may embed it
            on your store while your plan is active; it stops working when the plan ends.
          </li>
          <li>
            Use it only to let shoppers preview products on your store. Don&rsquo;t copy, modify or
            reverse-engineer the engine, remove its license checks, or use it to capture, store or
            analyse shoppers&rsquo; faces.
          </li>
          <li>
            You are responsible for your store, for the notices and terms you give your shoppers, and
            for complying with the laws that apply to your store.
          </li>
          <li>The try-on is for business use by store owners, not for personal use.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'fax',
    title: 'Sending a fax',
    content: (
      <>
        <ul className="list">
          <li>
            A fax costs the price shown on the fax page (currently $3.99 for one fax of up to 25
            pages, cover page included), paid once by card. There is no subscription.
          </li>
          <li>
            The fax is sent only after Stripe confirms the payment. Busy or unanswered lines are
            retried up to 3 times. If the fax can&rsquo;t be delivered, the payment is refunded in
            full automatically. A delivered fax means the receiving fax machine accepted the pages,
            not that a person read them.
          </li>
          <li>
            Faxes go only to US and Canada numbers. Premium-rate and service numbers are refused,
            and each number can receive only a few faxes a day through this service.
          </li>
          <li>
            <strong>Don&rsquo;t send unsolicited advertisements.</strong> Faxing ads to people who
            haven&rsquo;t asked for them is illegal under the Telephone Consumer Protection Act as
            amended by the Junk Fax Prevention Act, and it isn&rsquo;t allowed here. You are
            responsible for having the right to send what you fax to the number you enter.
          </li>
          <li>
            The fax service is <strong>not HIPAA-certified</strong> and I don&rsquo;t sign business
            associate agreements. Covered entities must not use it to send protected health
            information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-files',
    title: 'Your files and information',
    content: (
      <>
        <p>
          Files you convert stay yours. You let me process them only to make your preview and
          download; how long they are kept is in the{' '}
          <Link className="link-underline" to="/privacy">
            Privacy Policy
          </Link>
          . Only upload files you have the right to use. You are responsible for checking a
          converted file before you rely on it, and for keeping your own copy of the original.
        </p>
        <p>
          The 1099 tools format data for the IRS IRIS system; they are not tax advice, and you are
          responsible for the accuracy of what you file. I am not affiliated with the IRS, Microsoft,
          Adobe, McNeel or any other company whose file formats my tools work with.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <>
        <p>
          Don&rsquo;t use the site or the tools to break the law, to upload malware or material you
          have no right to share, to overload or attack the servers, or to get around rate limits or
          payment. I may block access, or cancel a license or plan, that is used this way.
        </p>
        <p>
          That includes material that sexually exploits children, which I report to the National
          Center for Missing &amp; Exploited Children and to law enforcement as the law requires, and
          files that infringe someone else&rsquo;s copyright or other rights. I don&rsquo;t look
          through the files people convert, but I act on reports and on anything I become aware of:
          I can delete the file, block the account or address that uploaded it, and keep records
          when the law requires me to.
        </p>
      </>
    ),
  },
  {
    id: 'reporting',
    title: 'Reporting abuse and copyright notices',
    content: (
      <>
        <p>
          To report illegal content or abuse of the tools, email{' '}
          <a className="link-underline" href={MAILTO}>
            {SITE.email}
          </a>{' '}
          with what you found and, if you have it, the link or time it happened. I answer reports
          within two business days and act sooner on anything urgent.
        </p>
        <p>
          If you believe something processed or shown through this site infringes your copyright,
          send a notice to the same address with: your contact details; the work you say is
          infringed; where the material is, in enough detail for me to find it; a statement that you
          believe in good faith the use is not authorized by the owner, its agent or the law; a
          statement that your notice is accurate and, under penalty of perjury, that you are the
          owner or authorized to act for the owner; and your physical or electronic signature. If
          material of yours was removed and you believe that was a mistake, you can send a
          counter-notice with the same details. I end access for repeat infringers.
        </p>
      </>
    ),
  },
  {
    id: 'refunds',
    title: 'Refunds',
    content: (
      <>
        <p>
          Each product&rsquo;s refund promise is set out in the{' '}
          <Link className="link-underline" to="/refunds">
            Refund Policy
          </Link>
          . In short: Publisher and PageMaker conversions and passes are refunded in full within 30
          days, no questions asked; other paid tools and licenses are refunded in full within 30
          days if they don&rsquo;t work for you.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Other companies’ services',
    content: (
      <>
        <p>
          Payments are handled by Stripe, contact-form messages by EmailJS, and the games I link to
          are hosted on itch.io under{' '}
          <a
            className="link-underline"
            href="https://itch.io/docs/legal/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            itch.io&rsquo;s own terms
          </a>
          . Scan Relay works with your Microsoft 365 account under Microsoft&rsquo;s terms. I&rsquo;m
          not responsible for how those services run.
        </p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'This website',
    content: (
      <>
        <p>
          The text, design and logo on this site belong to {SITE.legalName}. Quoting or linking to it
          is welcome; copying it wholesale or presenting it as yours is not. Content on the site is
          general information, not professional advice.
        </p>
        <p>
          If anything on the site is hard to use with a keyboard, screen reader or other assistive
          technology, email me and I will fix it or help you another way.
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
          Apart from the refund promises in the Refund Policy, and to the fullest extent permitted by
          law, the website, the tools, Scan Relay and the try-on are provided &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo;, without warranties of any kind, express or implied, including
          warranties of merchantability, fitness for a particular purpose, title and
          non-infringement. I don&rsquo;t warrant that they will be uninterrupted, error-free, or work
          with every file, copier, browser or device.
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
          To the maximum extent permitted by law, {SITE.legalName} is not liable for lost profits,
          lost data, costs of substitute products, or any indirect, incidental, special,
          consequential or punitive damages arising from these terms or your use of (or inability to
          use) the site or products. My total liability for any claim is limited to the greater of
          $50 and the amount you paid me for the product concerned in the 12 months before the claim.
        </p>
        <p>
          Nothing in these terms limits liability that the law does not allow to be limited, or takes
          away rights you have as a consumer under the law where you live.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: 'Claims caused by your use',
    content: (
      <>
        <p>
          If someone makes a claim against me because you used a product in breach of these terms or
          the law (for example, by converting files you had no right to use, or by running the
          try-on on your store without the notices your shoppers need), you agree to cover my
          reasonable costs of dealing with it.
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
          These terms are governed by the laws of the State of Arizona and of the United States,
          without regard to conflict-of-law rules. Any dispute will be heard in the state or federal
          courts in Maricopa County, Arizona, except that either of us may bring a claim in small
          claims court where it qualifies. Before going to court, please email me: most problems
          are fixed faster that way.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and general terms',
    content: (
      <>
        <p>
          I may update these terms; the date at the top changes when I do, and the version in force
          when you bought something governs that purchase. If any part of these terms can&rsquo;t be
          enforced, the rest still applies. Not enforcing a term is not a waiver of it. These terms,
          the Privacy Policy and the Refund Policy are the whole agreement between us about the site
          and products. Notices between us can be given by email.
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
          {SITE.legalName}, {SITE.city}, {SITE.region}, United States. Email{' '}
          <a className="link-underline" href={MAILTO}>
            {SITE.email}
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      mark="B"
      title="Terms of Service"
      path="/terms"
      description="The terms for LeDuc Systems' website and products: prices and payment, licenses, try-on subscriptions, acceptable use, warranty, liability and Arizona law."
      lastUpdated={LAST_UPDATED}
      summary={
        <>
          {SITE.legalName} sells software to businesses and adults. Prices are shown before you pay,
          most products can be tried first, paid tools and licenses come with a 30-day refund, and try-on plans
          renew monthly until you cancel by email. Arizona law applies.
        </>
      }
      sections={SECTIONS}
      credit
    />
  );
}
