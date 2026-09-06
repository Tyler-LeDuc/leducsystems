# Le Duc Systems — marketing site

Public repo. Marketing site for **LeDuc Systems LLC**, live at <https://leducsystems.com>.
`README.md` carries the technical contract — stack, design system, routes, content model,
contact form, build and deploy. Read it before writing code.

This file carries the business guardrails.

---

## HARD CONSTRAINT — patent conflict

There is a **pending patent assigned to Accelevate Solutions** (Tyler's employer) covering
**fleet management, logistics, and multi-agent AI orchestration**. LeDuc Systems cannot
compete or take contracts in that domain, and **must not market itself into it**.

Nothing on this site may describe as a service, capability, or example:

- Fleet, vehicle, telematics, or GPS tracking
- Logistics, freight, shipping, routing, last-mile, or **dispatch**
- Multi-agent AI orchestration — agent swarms, agent-to-agent protocols, orchestrator
  frameworks. Single assistants, RAG, retrieval, and tool-use are fine. Networks of
  coordinating agents are not.

This language was removed from the site in September 2026 — earlier copy led with "dispatch
and scheduling" for operations teams. **Do not reintroduce it**, including in SEO copy, meta
descriptions, structured data, or the schema tool's examples.

---

## Positioning

LeDuc Systems sells **custom software delivery**: web and mobile applications, internal
tools, and data migrations off spreadsheets and legacy systems, with AI as a third line of
work rather than the pitch.

Tech emphasis, in order: Java/Spring Boot, native iOS & Android, React/TypeScript,
PostgreSQL, AWS.

Do **not** re-narrow the site to "internal software for operations teams". That framing is
retired — it is both too narrow for the current strategy and too close to the patent domain.

---

## Two audiences

Most of the site sells to **end clients**: project pricing, Discovery Sprints, builds.

`/agencies` sells to a **second audience** — small dev and design agencies buying
subcontract capacity. Different buying question, so the copy there is blunter and the
pricing is an hourly sub rate (`$95/hr`), not project pricing. That gap between $95/hr and
a $12,000 build is normal (sub rate vs. retail) and does not need reconciling — but **never
put both pricing models in the same section**.

`/agencies` is deliberately **not in the main nav** (`NAV`). It is reachable from the footer,
the sitemap, and direct links in outreach. Adding it to the top nav would push a
capacity-for-hire pitch at end clients, which weakens the main offer.

Adding any route means updating **three** places or the build's drift test fails:
`src/App.js`, `scripts/prerender.js` (`ROUTES`), and `public/sitemap.xml`.

---

## Voice and copy rules

1. **Company voice is "we".** Do not write "I" in marketing copy. (The legal pages —
   `PrivacyPolicyPage.js`, `TermsOfServicePage.js` — still use first person as their defined
   party. That is deliberate and separate; leave it unless doing a full legal rewrite.)
2. **Never state or imply headcount.** No "one person", "one engineer", "solo", "small shop",
   "Headcount: one", and equally no invented team, bench, or departments. Headcount simply is
   not a topic this site discusses.
3. **Short.** The site was cut hard in September 2026 because it was unreadably wordy. If a
   sentence can go without losing the point, it goes. Section ledes are one sentence. Card
   bodies are one or two.
4. No "passionate", "cutting-edge", "world-class", "seamless", "leverage" as a verb.

---

## Honesty rules — non-negotiable

**Nothing on this site may claim a client, testimonial, outcome metric, team member, or award
that does not exist.** Concretely, never add:

- Client testimonials, quotes, names, initials, or logos
- Named or implied past clients, or case studies
- Outcome metrics ("reduced X by 37%", "99.9% uptime", "15x faster")
- Teams, departments, headcount, or "decades of combined experience"
- Awards, certifications, partnerships, years in business, projects-shipped counts
- Manufactured scarcity ("only 2 slots left")

The only permitted numbers are **commitments**, not claims: timelines ("about 1 week",
"4–12 weeks"), engagement prices, the one-business-day reply promise, and the founding year.

Rule 2 above and this rule are not in tension. Declining to advertise that the company is one
person is allowed. Claiming it is more than one person is not.

If a section feels like it needs proof, use **capability** (what can be built), **process**
(how the work runs), or **commitment** (what is guaranteed).

Contact address everywhere is **tyler@leducsystems.com**.

---

## Where content lives

`src/data/site.js` is the single source of truth for the words on this site. Change headlines,
engagement models, FAQ answers, and the contact email there — not in page components. Long-form
legal prose is the exception.

Exports: `SITE` · `NAV` · `LEGAL_NAV` · `PILLARS` · `DIFFERENTIATORS` · `APPROACH` ·
`ENGAGEMENTS` · `PRICING_NOTE` · `PROCESS` · `TECH` · `FAQ` · `RESPONSE_PROMISE` ·
`AGENCY` · `AGENCY_TERMS` · `AGENCY_WORK` · `AGENCY_NOT_A_FIT`

(`APPROACH` replaced the former `HONESTY` export in September 2026. The old block led with
"No case studies yet." — it was removed as actively harmful to sales.)

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

Client acquisition work — target lists, cold email drafts, pipeline tracking — lives in the
**private** `../leducsystems-bizdev` repo. **Never commit outreach material here.** This repo
is public.
