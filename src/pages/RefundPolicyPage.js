import React from 'react';
import LegalDocument from '../components/LegalDocument';
import { SITE } from '../data/site';

const LAST_UPDATED = 'October 31, 2026';

const REFUND_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Refund request')}`;
const CANCEL_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Cancel my try-on plan')}`;

/* Each promise here is copied from the product's own page under /tools/ and
   the Stripe product description on the conversion server. If a product page
   changes its promise, change it here too. */
const SECTIONS = [
  {
    id: 'how',
    title: 'How to get a refund',
    content: (
      <>
        <p>
          Email{' '}
          <a className="link-underline" href={REFUND_MAILTO}>
            {SITE.email}
          </a>{' '}
          from the address you paid with (or include your Stripe receipt), and say which product it
          is. If a file didn&rsquo;t convert well, attaching it helps me fix the tool for the next
          person, but it isn&rsquo;t required.
        </p>
        <p>
          I refund the full amount through Stripe to the card you paid with. Banks usually show it
          within 5 to 10 business days. There is no restocking fee and no charge for asking.
        </p>
      </>
    ),
  },
  {
    id: 'converters',
    title: 'Publisher, PageMaker and PowerPoint converters',
    content: (
      <>
        <ul className="list">
          <li>
            <strong>Per-file conversions, PDFs and 30-day passes:</strong> email me within 30 days
            of paying and I refund you in full, no questions asked.
          </li>
          <li>
            <strong>Bulk converter:</strong> if many files fail or the results aren&rsquo;t usable,
            email me within 30 days for a full refund.
          </li>
          <li>
            <strong>PowerPoint text wrap:</strong> if it doesn&rsquo;t work for your file, email me
            within 30 days for a refund.
          </li>
        </ul>
        <p>Every converter shows a free preview of your own file before you pay.</p>
      </>
    ),
  },
  {
    id: 'licenses',
    title: 'Scan Relay, 1099 tools and InfoPath to Excel',
    content: (
      <>
        <ul className="list">
          <li>
            <strong>Scan Relay:</strong> use the 14-day free trial first. After buying, a full
            refund within 30 days if it doesn&rsquo;t work with your copier.
          </li>
          <li>
            <strong>Scan Relay dealer packs:</strong> unused licenses are refunded within 30 days.
          </li>
          <li>
            <strong>FIRE to IRIS and spreadsheet to IRIS:</strong> a full refund within 30 days if
            it doesn&rsquo;t work for your file.
          </li>
          <li>
            <strong>InfoPath to Excel:</strong> a full refund within 30 days if it doesn&rsquo;t
            work for your forms.
          </li>
          <li>
            <strong>Claude Workflow Setup:</strong> I invoice only after I confirm the task is a
            fit. If I can&rsquo;t deliver a working skill for it, I refund you in full. Monthly
            plans can be cancelled anytime; months already paid aren&rsquo;t refunded in part.
          </li>
          <li>
            <strong>Pre-orders</strong> (a product paid for before it ships): a full refund any
            time before it ships, then the product&rsquo;s own 30-day refund after.
          </li>
        </ul>
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
            Every plan starts with a 14-day free trial. Cancel during the trial and you are never
            charged.
          </li>
          <li>
            Cancel any time by emailing{' '}
            <a className="link-underline" href={CANCEL_MAILTO}>
              {SITE.email}
            </a>
            . I cancel it the same business day and no further charges are made.
          </li>
          <li>
            Months already paid aren&rsquo;t refunded in part. If the try-on doesn&rsquo;t work on
            your store, email me and we&rsquo;ll sort it out.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'free',
    title: 'Free tools',
    content: (
      <>
        <p>
          Free previews, free trials and the free tiers of the 1099 and InfoPath tools cost nothing,
          so there is nothing to refund. Questions about them are still welcome.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your legal rights',
    content: (
      <>
        <p>
          These promises are in addition to any rights you have under the law where you live; they
          don&rsquo;t take any away.
        </p>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      mark="C"
      title="Refund Policy"
      path="/refunds"
      description="LeDuc Systems refunds: 30 days on the converters, Scan Relay, the 1099 tools and InfoPath to Excel; try-on plans cancel by email with no charge in the trial."
      lastUpdated={LAST_UPDATED}
      summary={
        <>
          Try before you pay, and if a paid tool or license doesn&rsquo;t work for you, email me
          within 30 days for a full refund. Try-on plans have a 14-day free trial and cancel by email
          the same day.
        </>
      }
      sections={SECTIONS}
    />
  );
}
