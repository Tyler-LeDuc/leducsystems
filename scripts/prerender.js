#!/usr/bin/env node
/* =========================================================================
   Emit a real HTML file per route after the CRA build.

   Why this exists: GitHub Pages has no server-side routing. Without these
   files every URL except "/" is served by 404.html — with an HTTP 404 status
   and a body containing only the redirect stub. Browsers recover via the
   redirect, but crawlers and link unfurlers see a 404 and an empty page, so
   every URL in sitemap.xml was effectively unindexable.

   Each generated file is the real index.html with route-specific title,
   description, canonical and Open Graph tags substituted in, so a crawler
   gets a 200 and correct metadata without running JavaScript. React still
   boots normally and renders the right route.

   The metadata below mirrors the <SEO> props on each page. If a page's SEO
   props change, change them here too — there is a test that fails when the
   route list drifts from the router.
   ========================================================================= */

const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');
const SITE_NAME = 'LeDuc Systems';
const ORIGIN = 'https://leducsystems.com';

/* src/data/site.js is an ES module with no imports; this script is CommonJS and runs
   under plain node. Evaluate the source with the `export` keywords stripped so the
   static content is generated from the very same data the React pages render. */
function loadSiteData() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'site.js'), 'utf8');
  const names = [];
  const body = source.replace(/^export const (\w+)/gm, (m, name) => {
    names.push(name);
    return `const ${name}`;
  });
  // eslint-disable-next-line no-new-func
  return new Function(`${body}\nreturn { ${names.join(', ')} };`)();
}

/* Routes that also get real page content (not just meta) inside <div id="root">. */
const CONTENT_ROUTES = {
  '/services/scan-to-email-migration': 'SCAN_MIGRATION',
  '/services/claude-workflow-setup': 'CLAUDE_WORKFLOW',
  '/services/forge-migration': 'FORGE_MIGRATION',
};

/* path -> { title, description, canonical?, fullTitle?, imageAlt? }. Title is rendered as
   "<title> — LeDuc Systems", matching what src/components/SEO.js does at
   runtime. An optional `canonical` points the canonical link and og:url at a
   different path — used by routes that still exist and must still serve a
   200, but are no longer the canonical URL for their content. */
const ROUTES = {
  '/about': {
    title: 'About',
    description:
      'Tyler LeDuc is the developer behind LeDuc Systems, a one-person software company in Phoenix, Arizona: Scan Relay, file converters and browser games.',
  },
  '/contact': {
    title: 'Contact',
    description:
      "Questions about a product, a license, or a file that didn't convert, for LeDuc Systems. I reply to every message within one business day.",
  },
  '/games': {
    title: 'Games',
    description: 'Small browser games I make on the side, released on itch.io under the handle raxeris.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'What LeDuc Systems collects, why, how long it keeps it, who processes it (Stripe, Hetzner, Google, EmailJS), and how to get your data deleted.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      "The terms for LeDuc Systems' website and products: prices and payment, licenses, acceptable use, warranty, liability and Arizona law.",
  },
  '/services/claude-workflow-setup': {
    title: 'Claude Workflow Setup',
    /* Used whole, without the em-dash suffix: this page's copy has none. */
    fullTitle: 'Claude Workflow Setup for Small Businesses | LeDuc Systems',
    imageAlt: 'LeDuc Systems: Claude Workflow Setup',
    description:
      'Send me one repetitive task by email. I cut the steps that shouldn’t exist and turn the rest into a Claude skill you run yourself. $349, delivered in 5 business days, no calls.',
  },
  '/services/scan-to-email-migration': {
    title: 'Copier Scan-to-Email Migration',
    fullTitle: 'Copier Scan-to-Email Migration for Microsoft 365, Done for You | LeDuc Systems',
    imageAlt: 'LeDuc Systems: copier scan-to-email migration',
    description:
      'Microsoft 365 disables SMTP basic authentication by default at the end of December 2026. I move each office’s copier scan to email to modern sign-in for $149 per office, and you pay only after scans arrive.',
  },
  '/services/forge-migration': {
    title: 'Connect to Forge Migration',
    fullTitle: 'Connect to Forge Migration for Atlassian Apps | LeDuc Systems',
    imageAlt: 'LeDuc Systems: Connect to Forge migration',
    description:
      'Fixed-price ports of Atlassian Connect apps to Forge before Connect end of support on January 31, 2027. Starts with a $500 readiness audit that is credited toward the port.',
  },
  '/refunds': {
    title: 'Refund Policy',
    description:
      'LeDuc Systems refunds: 30 days on the converters, Scan Relay, the 1099 tools and InfoPath to Excel.',
  },
};

/** Escape the few characters that would break out of an HTML attribute. */
function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Replace the value of a meta tag identified by one of its attributes.
 * Returns the html unchanged if the tag is absent, so a template change
 * cannot crash the build.
 */
function setMeta(html, attrName, key, value) {
  const pattern = new RegExp(
    `(<meta[^>]*\\s${attrName}=["']${key}["'][^>]*\\scontent=["'])[^"']*(["'])`,
    'i'
  );
  if (pattern.test(html)) return html.replace(pattern, (m, a, b) => `${a}${attr(value)}${b}`);

  /* CRA's template splits some meta tags across lines with content second. */
  const multiline = new RegExp(
    `(<meta\\s+${attrName}=["']${key}["'][\\s\\S]{0,40}?content=["'])[^"']*(["'])`,
    'i'
  );
  return multiline.test(html) ? html.replace(multiline, (m, a, b) => `${a}${attr(value)}${b}`) : html;
}

const esc = (value) => attr(value).replace(/'/g, '&#39;');

function ul(items) {
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

function priceBlocks(list) {
  return list
    .map(
      (plan) =>
        `<article class="card card--feature"><h3>${esc(plan.name)}</h3>` +
        `<p class="cw-price"><span class="cw-price__amount">${esc(plan.price)}</span> ` +
        `<span class="cw-price__unit">${esc(plan.unit)}</span></p>${ul(plan.points)}</article>`
    )
    .join('');
}

/* Plain semantic HTML for a service page, built from its data object. React replaces
   it on load (createRoot, not hydrate), so it only has to be readable without JS. */
function contentHtml(d, site, promise) {
  const out = [];
  out.push('<main class="container">');
  out.push(`<p class="eyebrow">${esc(d.eyebrow)}</p><h1>${esc(d.title)}</h1><p class="lede">${esc(d.lede)}</p>`);
  out.push(`<p><a class="btn btn--primary" href="${esc(d.mailto)}">${esc(d.ctaLabel)}</a></p>`);
  out.push(
    '<h2>The terms in brief</h2><dl>' +
      d.facts.map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`).join('') +
      '</dl>'
  );
  if (d.intro) {
    out.push(d.intro.map((p) => `<p>${esc(p)}</p>`).join(''));
    out.push(
      '<p>Sources: ' +
        d.sources.map((s) => `<a href="${esc(s.href)}" rel="noopener noreferrer">${esc(s.label)}</a>`).join(', ') +
        '.</p>'
    );
  }
  if (d.why) {
    out.push(`<h2>${esc(d.whyTitle)}</h2>${d.why.map((p) => `<p>${esc(p)}</p>`).join('')}`);
    out.push(`<p><a href="${esc(d.whyLink.href)}">${esc(d.whyLink.label)}</a></p>`);
  }
  if (d.included) {
    out.push(`<h2>What is included</h2><div class="grid">${priceBlocks(d.included)}</div>`);
    if (d.paymentNote) out.push(`<p>${esc(d.paymentNote)}</p>`);
  }
  if (d.prices) {
    out.push(
      `<h2>${esc(d.priceTitle)}</h2>${d.priceIntro ? `<p>${esc(d.priceIntro)}</p>` : ''}` +
        `<div class="grid">${priceBlocks(d.prices)}</div>`
    );
    if (d.priceNote) out.push(`<p>${esc(d.priceNote)}</p>`);
  }
  if (d.plans) {
    out.push(`<h2>Pricing</h2><div class="grid">${priceBlocks(d.plans)}</div>`);
    if (d.planNote) out.push(`<p>${esc(d.planNote)}</p>`);
  }
  if (d.limitNote) out.push(`<p>${esc(d.limitNote)}</p>`);
  if (d.goodFits) {
    out.push(`<h2>Good fits</h2>${ul(d.goodFits)}<h2>Not a fit</h2>${ul(d.notFits)}`);
  }
  out.push(
    '<h2>How it works</h2><ol>' +
      d.steps.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`).join('') +
      '</ol>'
  );
  out.push(
    '<h2>Common questions</h2>' +
      d.faq.map((q) => `<h3>${esc(q.question)}</h3><p>${esc(q.answer)}</p>`).join('')
  );
  if (d.closeTitle) out.push(`<h2>${esc(d.closeTitle)}</h2><p>${esc(`${d.closeBody} ${promise}`)}</p>`);
  out.push(`<p><a href="${esc(d.mailto)}">${esc(site.email)}</a></p>`);
  out.push('</main>');
  return out.join('');
}

/* Escape "<" so a JSON-LD string can never close its script tag. */
function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
}

function faqLd(d) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/* Offers come from the per-office price cards (the license-only card is sold on
   the Scan Relay pages, not by this service). */
function serviceLd(d, site) {
  const offers = d.prices
    .filter((p) => /^\$\d+$/.test(p.price) && p.name !== 'Just the license')
    .map((p) => ({
      '@type': 'Offer',
      name: `${p.name} (${p.unit})`,
      price: p.price.slice(1),
      priceCurrency: 'USD',
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: d.title,
    description: d.seoDescription,
    url: `${ORIGIN}${d.path}/`,
    provider: { '@type': 'Organization', name: site.legalName, url: site.url, email: site.email },
    offers,
  };
}

/* Put the content inside <div id="root">, after the static nav, and the JSON-LD
   before </head>. Replacer functions keep "$" in prices literal. */
function injectContent(html, routePath, data) {
  const key = CONTENT_ROUTES[routePath];
  const d = key && data[key];
  const rootRe = /(<div id="root">[\s\S]*?)(<\/div>)/i;
  if (!d || !rootRe.test(html)) return html;
  const content = contentHtml(d, data.SITE, data.RESPONSE_PROMISE);
  let out = html.replace(rootRe, (m, a, b) => `${a}${content}${b}`);
  const ld = [jsonLd(faqLd(d))];
  if (key === 'SCAN_MIGRATION') ld.push(jsonLd(serviceLd(d, data.SITE)));
  return out.replace(/<\/head>/i, () => `${ld.join('')}</head>`);
}

function render(template, routePath, meta, data) {
  const fullTitle = meta.fullTitle || `${meta.title} — ${SITE_NAME}`;
  /* A route may declare a different canonical path when it exists only to
     redirect. Everything that points search engines at a page uses it. */
  /* GitHub Pages serves each prerendered route as a folder, so /about answers with a
     redirect to /about/. The canonical (and og:url) must name the URL that answers 200. */
  const canonicalPath = meta.canonical || routePath;
  const url = `${ORIGIN}${canonicalPath.endsWith('/') ? canonicalPath : `${canonicalPath}/`}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${attr(fullTitle)}</title>`);
  html = html.replace(
    /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'])/i,
    (m, a, b) => `${a}${attr(url)}${b}`
  );

  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:title', fullTitle);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', fullTitle);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  if (meta.imageAlt) html = setMeta(html, 'property', 'og:image:alt', meta.imageAlt);

  return data ? injectContent(html, routePath, data) : html;
}

function main() {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('prerender: build/index.html not found — run the build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexPath, 'utf8');
  const data = loadSiteData();
  const written = [];

  Object.entries(ROUTES).forEach(([routePath, meta]) => {
    const dir = path.join(BUILD, ...routePath.split('/').filter(Boolean));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), render(template, routePath, meta, data), 'utf8');
    written.push(routePath);
  });

  console.log(`prerender: wrote ${written.length} routes — ${written.join(', ')}`);
}

/* Only when run as a script. The route-coverage test requires this file for
   its ROUTES table, and a module that writes files and calls process.exit
   the moment it is imported takes the whole test suite down with it when
   there is no build to write into. */
if (require.main === module) main();

module.exports = { ROUTES, render, setMeta, main, loadSiteData };
