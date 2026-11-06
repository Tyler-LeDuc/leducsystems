#!/usr/bin/env node
/* =========================================================================
   Build an HTML site map at /site-map/ after the CRA build and prerender.

   Why: a human-readable page that links every product, guide and doc on the
   site gives crawlers one more path to pages that nothing else links to yet,
   and gives people an index. It is generated from the two XML sitemaps the
   build already ships (build/sitemap.xml and build/tools/sitemap.xml), using
   each page's own <title>, so it never drifts from what is deployed.

   It is a standalone static page, not a React route: anything inside the
   React root would be replaced by the router's 404 page.
   ========================================================================= */

const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');
const ORIGIN = 'https://leducsystems.com';
const OUT_PATH = '/site-map/';

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The URLs in a sitemap file, or [] if the file is missing. */
function sitemapUrls(file) {
  if (!fs.existsSync(file)) return [];
  const xml = fs.readFileSync(file, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/** A page's <title>, without the site-name suffix, read from the built file. */
function titleOf(urlPath) {
  const file = path.join(BUILD, ...urlPath.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  return m[1]
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s*(\||—)\s*(LeDuc Systems|Saguaro Hours( for Jira)?)\s*$/i, '')
    .trim();
}

const SHOPIFY = ['product-options', 'restock', 'size-charts', 'order-limits', 'sold-out-sorter', 'terms-checkbox'];

/* Each URL goes in the first group whose test matches. */
const GROUPS = [
  { title: 'LeDuc Systems', test: (p) => !p.includes('/', 1) || /^\/(about|contact|games|privacy|terms|refunds)\/$/.test(p) },
  { title: 'Saguaro Hours for Azure DevOps', test: (p) => p.startsWith('/saguaro-hours/azure-devops/') },
  { title: 'Team Calendar Pro for Azure DevOps', test: (p) => p.startsWith('/team-calendar/') },
  { title: 'PR Conflict Resolver for Azure DevOps', test: (p) => p.startsWith('/pr-conflict-resolver/') },
  { title: 'Sprint Goals for Azure DevOps', test: (p) => p.startsWith('/sprint-goals/') },
  { title: 'Saguaro Hours for Jira: documentation', test: (p) => p.startsWith('/saguaro-hours/docs/') },
  { title: 'Saguaro Hours for Jira', test: (p) => p.startsWith('/saguaro-hours/') },
  { title: 'Shopify apps', test: (p) => SHOPIFY.some((s) => p.startsWith(`/${s}/`)) },
  { title: 'Scan to email and Microsoft 365', test: (p) => /scan|microsoft-365|smtp|copier/.test(p) },
  { title: '1099s, FIRE and IRIS', test: (p) => /iris|fire|1099|1220|1098|w-2g/.test(p) },
  { title: 'Publisher and PageMaker files', test: (p) => /publisher|pagemaker|pub|pmd|newsletter|bulletin/.test(p) },
  { title: 'Virtual try-on', test: (p) => p.startsWith('/tools/tryon') },
  { title: 'InfoPath', test: (p) => /infopath/.test(p) },
  { title: 'Other tools and guides', test: () => true },
];

function main() {
  if (!fs.existsSync(path.join(BUILD, 'index.html'))) {
    console.error('site-map-page: build/index.html not found — run the build first.');
    process.exit(1);
  }
  const urls = [...sitemapUrls(path.join(BUILD, 'sitemap.xml')), ...sitemapUrls(path.join(BUILD, 'tools', 'sitemap.xml'))];
  const seen = new Set();
  const groups = GROUPS.map((g) => ({ ...g, items: [] }));
  for (const url of urls) {
    if (!url.startsWith(ORIGIN)) continue;
    const p = url.slice(ORIGIN.length) || '/';
    if (seen.has(p) || p === OUT_PATH) continue;
    seen.add(p);
    const title = p === '/' ? 'Home' : titleOf(p) || p;
    groups.find((g) => g.test(p)).items.push({ p, title });
  }
  const sections = groups
    .filter((g) => g.items.length)
    .map((g) => `<section>
<h2>${esc(g.title)}</h2>
<ul>
${g.items.map((i) => `  <li><a href="${esc(i.p)}">${esc(i.title)}</a></li>`).join('\n')}
</ul>
</section>`)
    .join('\n');
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site map — LeDuc Systems</title>
<meta name="description" content="Every product, guide and help page on leducsystems.com, in one list.">
<link rel="canonical" href="${ORIGIN}${OUT_PATH}">
<link rel="icon" href="/favicon.ico">
<style>
:root{--ink:#15130F;--paper:#FAF8F3;--muted:#5C574E;--line:rgba(21,19,15,.14);--accent:#E8365F}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 "IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif}
header,main,footer{max-width:960px;margin:0 auto;padding:0 20px}header{padding-top:28px}header img{height:28px;display:block}
h1{font:600 2.1rem/1.15 Fraunces,Georgia,serif;margin:36px 0 8px}h2{font:600 1.15rem/1.3 Fraunces,Georgia,serif;margin:28px 0 6px}
main{columns:2 360px;column-gap:40px}main>p,main>h1{column-span:all}section{break-inside:avoid}
ul{margin:0;padding-left:18px}li{margin:3px 0}a{color:var(--ink)}a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.muted{color:var(--muted)}footer{margin-top:48px;padding:16px 20px 40px;color:var(--muted);font-size:.9rem;border-top:1px solid var(--line)}
</style>
</head><body>
<header><a href="/"><img src="/leduc-logo.svg" alt="LeDuc Systems"></a></header>
<main>
<h1>Site map</h1>
<p class="muted">Every page on this site, ${count} in all, grouped by product.</p>
${sections}
</main>
<footer>LeDuc Systems LLC · Phoenix, Arizona · <a href="mailto:tyler@leducsystems.com">tyler@leducsystems.com</a></footer>
</body></html>
`;
  const dir = path.join(BUILD, ...OUT_PATH.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`site-map-page: ${count} pages in ${groups.filter((g) => g.items.length).length} groups -> ${OUT_PATH}`);
}

if (require.main === module) main();

module.exports = { GROUPS, titleOf, main };
