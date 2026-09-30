# LeDuc Systems — indie game site

Public repo. Personal site for **LeDuc Systems**, Tyler LeDuc's indie game studio, live at
<https://leducsystems.com>. `README.md` carries the technical contract — stack, design system,
routes, content model, contact form, build and deploy. Read it before writing code.

This file carries the content and business guardrails.

---

## Positioning

LeDuc Systems is the site for the games Tyler LeDuc releases on itch.io under the handle
**raxeris**. It is a personal project, not a company with clients or a service line. There is no
consulting business, no pricing, no engagement model, and no second audience (agencies, clients,
subcontractors) — that content was retired in September 2026 when the site pivoted from software
consulting to indie game development. **Do not reintroduce it.**

The games themselves are small, fast, one-button browser games — see the itch.io bio quoted in
`PHILOSOPHY` in `src/data/site.js`. Everything runs free, in the browser, on itch.io. This site
does not host or sell the games; it showcases and links to the real store pages.

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

**Nothing on this site may claim a rating, review quote, download count, award, or press mention
that is not real.** The itch.io embeds and store links already show the real numbers for each
game (ratings, downloads, comments) — this site's own copy never restates or paraphrases them as
a claim. Concretely, never add:

- Fabricated review quotes, star ratings, or download/player counts
- Named or implied press coverage, awards, or "featured on itch.io" claims that did not happen
- A team, studio staff, or "we" language implying more than one person makes these games
- Manufactured scarcity or urgency ("limited time", "before it's gone")

The only numbers permitted are facts that are checkable against the real itch.io store: the
count of games, genres, and the founding year. If a section needs to feel more substantial, add
another real game to `GAMES` in `src/data/site.js`, or link to the itch.io profile directly —
never invent a metric.

Contact address everywhere is **tyler@leducsystems.com**.

---

## Where content lives

`src/data/site.js` is the single source of truth for the words on this site. Change headlines,
the games list, FAQ answers, and the contact email there — not in page components. Long-form
legal prose is the exception and lives in `PrivacyPolicyPage.js` / `TermsOfServicePage.js`.

Exports: `SITE` · `NAV` · `LEGAL_NAV` · `PHILOSOPHY` · `GAMES` · `FEATURED_SLUGS` · `FAQ` ·
`RESPONSE_PROMISE`

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
