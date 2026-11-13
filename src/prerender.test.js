/* Guards the prerender route list against drifting from the router.

   The build writes one static HTML file per route so crawlers get a 200
   instead of GitHub Pages' 404 stub. A route added to App.js but not to
   scripts/prerender.js would silently go back to being unindexable, which
   is exactly the failure this is meant to prevent. */

import fs from 'fs';
import path from 'path';

const { ROUTES, render: toHtml, setMeta, loadSiteData } = require('../scripts/prerender');

const appSource = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');

/* Every concrete path in the router, ignoring "/" (served by index.html)
   and the "*" catch-all (served by 404.html, which must stay a 404). */
function routerPaths() {
  const paths = [];
  const re = /<Route\s+path="([^"]+)"/g;
  let match = re.exec(appSource);
  while (match) {
    if (match[1] !== '/' && match[1] !== '*') paths.push(match[1]);
    match = re.exec(appSource);
  }
  return paths;
}

describe('prerender route coverage', () => {
  it('finds routes in App.js at all', () => {
    expect(routerPaths().length).toBeGreaterThan(0);
  });

  it('prerenders every routable path', () => {
    const missing = routerPaths().filter((p) => !(p in ROUTES));
    expect(missing).toEqual([]);
  });

  it('does not prerender paths the router cannot serve', () => {
    const known = routerPaths();
    const extra = Object.keys(ROUTES).filter((p) => !known.includes(p));
    expect(extra).toEqual([]);
  });
});

describe('prerender output', () => {
  const template = [
    '<html><head>',
    '<title>LeDuc Systems &mdash; original</title>',
    '<meta name="description" content="original" />',
    '<link rel="canonical" href="https://leducsystems.com/" />',
    '<meta property="og:title" content="original" />',
    '<meta property="og:url" content="https://leducsystems.com/" />',
    '<meta name="twitter:title" content="original" />',
    '</head><body></body></html>',
  ].join('\n');

  const html = toHtml(template, '/about', { title: 'About', description: 'About the practice.' });

  it('rewrites the title in the SEO component format', () => {
    expect(html).toContain('<title>About — LeDuc Systems</title>');
  });

  it('rewrites the canonical to the route, with the trailing slash GitHub Pages serves', () => {
    expect(html).toContain('href="https://leducsystems.com/about/"');
  });

  it('rewrites description and open graph tags', () => {
    expect(html).toContain('content="About the practice."');
    expect(html).toContain('content="About — LeDuc Systems"');
    expect(html).toContain('content="https://leducsystems.com/about/"');
  });

  it('escapes quotes so a description cannot break out of the attribute', () => {
    const out = toHtml(template, '/about', {
      title: 'About',
      description: 'He said "no" & left',
    });
    expect(out).toContain('content="He said &quot;no&quot; &amp; left"');
  });

  it('leaves html untouched when a tag is absent', () => {
    expect(setMeta('<html></html>', 'name', 'description', 'x')).toBe('<html></html>');
  });
});

describe('prerendered service content', () => {
  const data = loadSiteData();
  const template =
    '<html><head><title>x</title></head><body><div id="root"><nav aria-label="Site"><a href="/">Home</a></nav></div></body></html>';
  const route = '/services/scan-to-email-migration';
  const html = toHtml(template, route, ROUTES[route], data);

  it('puts the h1, price and CTA address in the static HTML', () => {
    expect(html).toContain(`<h1>${data.SCAN_MIGRATION.title}</h1>`);
    expect(html).toContain('$149');
    expect(html).toContain('>tyler@leducsystems.com</a>');
    expect(html).toContain('<a href="/">Home</a>');
  });

  it('includes FAQ text and FAQPage and Service JSON-LD with a USD price', () => {
    expect(html).toContain(`<h3>${data.SCAN_MIGRATION.faq[0].question}</h3>`);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"price":"149","priceCurrency":"USD"');
  });

  it('has no replace artifacts from "$" in prices', () => {
    expect(html).not.toMatch(/\$[&`'$]|\$\d(?!\d)/);
    expect(html).toContain('$149 per office');
    expect(html).not.toContain('$&');
    expect(html).not.toContain('$`');
    expect(html.match(/<div id="root">/g)).toHaveLength(1);
  });

  it('adds content to every content route and leaves others alone', () => {
    ['/services/claude-workflow-setup', '/services/forge-migration'].forEach((r) => {
      expect(toHtml(template, r, ROUTES[r], data)).toContain('<h1>');
    });
    expect(toHtml(template, '/about', ROUTES['/about'], data)).not.toContain('<h1>');
  });
});
