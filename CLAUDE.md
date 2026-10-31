# LeDuc Systems — software tools site

Public repo. Site for **LeDuc Systems** (LeDuc Systems LLC), Tyler LeDuc's software company, live
at <https://leducsystems.com>. `README.md` carries the technical contract — stack, design system,
routes, content model, contact form, build and deploy. Read it before writing code.

This file carries the content and business guardrails.

---

## Positioning

**Redesigned October 30, 2026 (Tyler's call, supersedes the Oct 27 tools-first positioning):**
LeDuc Systems is a small software company (one developer, Tyler LeDuc) that builds and sells its own
products: tools, apps and games. The home page presents the company and its portfolio. Scan Relay,
the virtual try-on and the Publisher converter are featured, then the smaller tools (1099/IRIS,
InfoPath, PageMaker, Rhino, text wrap), then games. The look is a restrained product studio: warm
off-white, near-black, IBM Plex Sans/Mono, the logo's red dot as the only accent; no gradients, glass
or template-style cards. Don't revert to the old tools-only home page or the pink rounded style.

The tools are static pages built in `C:\Users\Tyler\apps\leduc-tools` and copied into
`public/tools/` by that repo's `npm run export`. Don't edit `public/tools/` by hand. They're
outside the React router, so link to them with plain `<a href>`, never `<Link>`. They have their
own sitemap at `/tools/sitemap.xml`, listed in `robots.txt`. They share this site's header and
footer through a static copy in that repo's `src/chrome.js` + `src/chrome.css`; keep the two in
step when the nav or footer changes.

This is a product company, not a consultancy: no client services, engagement models or "hire
me" pitches (the old consulting content was retired in September 2026 — don't bring it back).
The home page shows each featured product's price (hardcoded in `src/data/site.js`). When a price
changes on a tool page or the server, change it there too.

Games are in the main nav and get one band on the home page; the full catalogue lives on `/games`.
The About page links to GitHub (Tyler-LeDuc) and itch.io (raxeris); no LinkedIn.

Adding any route means updating **three** places or the build's drift test fails:
`src/App.js`, `scripts/prerender.js` (`ROUTES`), and `public/sitemap.xml`.

---

## Voice and copy rules

1. **Voice is first person, "I".** This is one person's site about their own work, not a company
   speaking as "we". (The legal pages — `PrivacyPolicyPage.js`, `TermsOfServicePage.js` — already
   use first person; keep that consistent everywhere else too.)
2. **Short.** Section ledes are one sentence. Card bodies are one or two.
3. No "passionate", "cutting-edge", "world-class", "seamless", "leverage" as a verb.

---

## Honesty rules — non-negotiable

**Nothing on this site may claim a customer, testimonial, rating, review quote, user or download
count, award, or press mention that is not real.** Claims about the tools must match what the tool
pages themselves say (free preview, 30-day refund, how files are handled). Concretely, never add:

- Fabricated review quotes, star ratings, or download/player counts
- Named or implied press coverage, awards, or "featured on itch.io" claims that did not happen
- Invented customers, logos, case studies, or usage numbers for the tools
- A team, studio staff, or "we" language implying more than one person does this work
- Manufactured scarcity or urgency ("limited time", "before it's gone")

The only numbers permitted are checkable facts: the founding year, the number of tools, what a
tool page itself states, and (on `/games`) the count of games. Never invent a metric.

Contact address everywhere is **tyler@leducsystems.com**.

---

## Where content lives

`src/data/site.js` is the single source of truth for the words on this site. Change headlines,
the tools list, the games list, FAQ answers, and the contact email there — not in page components. Long-form
legal prose is the exception and lives in `PrivacyPolicyPage.js` / `TermsOfServicePage.js`.

Exports: `SITE` · `NAV` · `TOOLS` · `LEGAL_NAV` · `PRINCIPLES` · `GAMES` · `FEATURED_SLUGS` ·
`FAQ` · `RESPONSE_PROMISE`

`GAMES` is the full catalogue released under the handle **raxeris**, in the order the live store
page shows them (not a verified chronological order — itch.io's own grid ordering, not
recomputed). Every entry has a real `embedId`, pulled from that game's `itch:path` meta tag on
itch.io, never fabricated. `FEATURED_SLUGS` (currently DIG TO AUSTRALIA and 99%) picks which two
get the large embed treatment on the games page, based on real itch.io creator-dashboard
analytics (views, downloads, ratings, collections) — not which games "feel" like the flagships.
Re-check `itch.io/dashboard/analytics` before changing it. Every other entry in `GAMES` links to
its own store page instead of embedding, to avoid a page of dozens of stacked iframes, not
because the embed is missing.

---

## Definition of done

A change ships when:

- `npm run build` completes with **no errors and no warnings**
- `npm test` passes
- No unused imports, no `console.log`
- Every internal link resolves to a route that exists
- Usable at 360px, 768px, 1280px, 1920px with no horizontal scroll

`npm run deploy` is the only deploy path. `public/CNAME` must survive every deploy.

---

## Related

The **private** `../leducsystems-bizdev` repo tracked client outreach for the old consulting
business. It is now stale — that pipeline no longer applies to this site — and is left alone
rather than deleted or repurposed here.
