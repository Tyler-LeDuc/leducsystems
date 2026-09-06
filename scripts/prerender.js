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
const SITE_NAME = 'Le Duc Systems';
const ORIGIN = 'https://leducsystems.com';

/* path -> { title, description }. Title is rendered as "<title> — Le Duc
   Systems", matching what src/components/SEO.js does at runtime. */
const ROUTES = {
  '/services': {
    title: 'Services',
    description:
      'Three lines of work: shipping web and mobile applications, migrating data off spreadsheets and legacy systems intact, and building AI features where they earn their place. Engagement models, pricing, process, and technology.',
  },
  '/agencies': {
    title: 'For agencies',
    description:
      'White-label development capacity for digital agencies. Java and Spring Boot, native iOS and Android, React, and legacy migrations — under your brand, on your process, at $95/hr. Based in Phoenix, Arizona.',
  },
  '/about': {
    title: 'About',
    description:
      'Le Duc Systems builds custom web and mobile software. Founded 2026 by Tyler LeDuc in Phoenix, Arizona.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Start a project with Le Duc Systems in Phoenix, Arizona. Describe what you are building and get a reply within one business day from the person who would do the work.',
  },
  '/tools': {
    title: 'Free tools',
    description:
      'Free tools for looking at the systems an operation already runs on: what is inside one workbook, which file a whole folder depends on, what moving off Access would involve, and the database a spreadsheet should have been. All of them run entirely in your browser and upload nothing.',
  },
  '/tools/schema': {
    title: 'Spreadsheet to database schema',
    description:
      'Paste a spreadsheet and get a Postgres schema plus the data problems that would break the import: mixed date formats, identifiers stored as numbers, columns that should be lookup tables. Runs entirely in your browser.',
  },
  '/tools/workbook': {
    title: 'What is running inside your spreadsheet',
    description:
      "Drop an Excel workbook and see the software hiding in it: macro code and what it reaches, database connections, Power Query sources, links to other people's machines, and sheets that cannot be unhidden from the menu. Runs entirely in your browser — the file is never uploaded.",
  },
  '/tools/folder': {
    title: 'Map the spreadsheets your team runs on',
    description:
      'Point this at a folder of Excel workbooks and see the dependency map nobody has drawn: which file a dozen reports read from, which links point at a machine that is not there, which workbook exists in eleven copies, and which one person has ever saved it. Reads four small parts per file, entirely in your browser.',
  },
  '/tools/access': {
    title: 'What is actually in your Access database',
    description:
      'Drop an .mdb or .accdb and see what a migration off Access really involves: the tables and their Postgres schema, the forms, reports, macros and modules that do not convert at all, and the type mismatches that break an import. Runs entirely in your browser — the file is never uploaded.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'What Le Duc Systems collects through this website: contact form submissions delivered by EmailJS and Google Analytics traffic data. Nothing else, and nothing sold.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'The terms covering work by Le Duc Systems: written scope up front, work-for-hire deliverables you own on payment, no warranty of fitness, and a capped limitation of liability.',
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
  const url = `${ORIGIN}${routePath}`;

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
