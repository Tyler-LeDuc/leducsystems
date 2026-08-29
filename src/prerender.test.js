/* Guards the prerender route list against drifting from the router.

   The build writes one static HTML file per route so crawlers get a 200
   instead of GitHub Pages' 404 stub. A route added to App.js but not to
   scripts/prerender.js would silently go back to being unindexable, which
   is exactly the failure this is meant to prevent. */

import fs from 'fs';
import path from 'path';

const { ROUTES, render: toHtml, setMeta } = require('../scripts/prerender');

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
    '<title>Le Duc Systems &mdash; original</title>',
    '<meta name="description" content="original" />',
    '<link rel="canonical" href="https://leducsystems.com/" />',
    '<meta property="og:title" content="original" />',
    '<meta property="og:url" content="https://leducsystems.com/" />',
    '<meta name="twitter:title" content="original" />',
    '</head><body></body></html>',
  ].join('\n');

  const html = toHtml(template, '/about', { title: 'About', description: 'About the practice.' });

  it('rewrites the title in the SEO component format', () => {
    expect(html).toContain('<title>About — Le Duc Systems</title>');
  });

  it('rewrites the canonical to the route', () => {
    expect(html).toContain('href="https://leducsystems.com/about"');
  });

  it('rewrites description and open graph tags', () => {
    expect(html).toContain('content="About the practice."');
    expect(html).toContain('content="About — Le Duc Systems"');
    expect(html).toContain('content="https://leducsystems.com/about"');
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
