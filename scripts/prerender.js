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

/* path -> { title, description, canonical? }. Title is rendered as
   "<title> — LeDuc Systems", matching what src/components/SEO.js does at
   runtime. An optional `canonical` points the canonical link and og:url at a
   different path — used by routes that still exist and must still serve a
   200, but are no longer the canonical URL for their content. */
const ROUTES = {
  '/games': {
    title: 'Games',
    description:
      'Every game released on itch.io under the handle raxeris. Free to play, right in the browser.',
  },
  '/about': {
    title: 'About',
    description:
      'Tyler LeDuc makes small browser games under the handle raxeris on itch.io. Based in Phoenix, Arizona.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Say hi, report a bug, or leave feedback for LeDuc Systems. I reply within one business day.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'What LeDuc Systems collects through this website: contact form submissions delivered by EmailJS and Google Analytics traffic data. Nothing else, and nothing sold.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'The terms covering this site: what the contact form collects, no warranty of fitness, and a capped limitation of liability.',
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
  if (pattern.test(html)) return html.replace(pattern, `$1${attr(value)}$2`);

  /* CRA's template splits some meta tags across lines with content second. */
  const multiline = new RegExp(
    `(<meta\\s+${attrName}=["']${key}["'][\\s\\S]{0,40}?content=["'])[^"']*(["'])`,
    'i'
  );
  return multiline.test(html) ? html.replace(multiline, `$1${attr(value)}$2`) : html;
}

function render(template, routePath, meta) {
  const fullTitle = `${meta.title} — ${SITE_NAME}`;
  /* A route may declare a different canonical path when it exists only to
     redirect. Everything that points search engines at a page uses it. */
  const url = `${ORIGIN}${meta.canonical || routePath}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${attr(fullTitle)}</title>`);
  html = html.replace(
    /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'])/i,
    `$1${attr(url)}$2`
  );

  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:title', fullTitle);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', fullTitle);
  html = setMeta(html, 'name', 'twitter:description', meta.description);

  return html;
}

function main() {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('prerender: build/index.html not found — run the build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexPath, 'utf8');
  const written = [];

  Object.entries(ROUTES).forEach(([routePath, meta]) => {
    const dir = path.join(BUILD, ...routePath.split('/').filter(Boolean));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), render(template, routePath, meta), 'utf8');
    written.push(routePath);
  });

  console.log(`prerender: wrote ${written.length} routes — ${written.join(', ')}`);
}

/* Only when run as a script. The route-coverage test requires this file for
   its ROUTES table, and a module that writes files and calls process.exit
   the moment it is imported takes the whole test suite down with it when
   there is no build to write into. */
if (require.main === module) main();

module.exports = { ROUTES, render, setMeta, main };
