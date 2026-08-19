# Le Duc Systems

Marketing site for **Le Duc Systems**, a one-person software consultancy run by Tyler LeDuc.
Live at <https://leducsystems.com>.

The site is a small static React app: seven routes, a shared design system, one working
contact form. There is no CMS, no backend, and no database — content lives in a single
JavaScript module and the form posts directly to EmailJS from the browser.

---

## Stack

| Piece | What it is |
|---|---|
| Build | Create React App 5 (`react-scripts`) |
| UI | React 19 |
| Routing | `react-router-dom` v6 (`BrowserRouter`) |
| Email | `@emailjs/browser` (client-side send, no server) |
| Styling | Plain CSS files with custom properties — no CSS-in-JS |
| Hosting | GitHub Pages, custom domain via `public/CNAME` |

No UI framework, no styled-components, no Tailwind. **Do not add npm dependencies** without
a concrete reason; the site is deliberately dependency-light.

---

## Routes

```
/          Home
/services  Services — the three-part offer, engagement models, tech, process
/about     About — Tyler, why the company exists, principles
/contact   Contact — the form, embedded
/privacy   Privacy Policy
/terms     Terms of Service
*          404
```

`public/404.html` performs the standard GitHub Pages SPA redirect so deep links resolve.

---

## Design system

Styles are a four-layer cascade, imported in this exact order by `src/index.css`:

| File | Role |
|---|---|
| `src/styles/tokens.css` | CSS custom properties only — color, type scale, spacing, radii, motion, layout widths |
| `src/styles/base.css` | Reset and base element typography, focus states, `prefers-reduced-motion` |
| `src/styles/components.css` | The shared class vocabulary every page composes from — `.section`, `.container`, `.panel`, `.btn`, `.eyebrow`, `.reveal`, and so on |
| `src/styles/chrome.css` | Header, footer, mobile menu, contact form chrome |

**Read `components.css` before writing JSX.** It is the contract — most layouts are
already expressible with existing classes.

Rules that keep this from rotting:

1. **No inline `style={{...}}` objects.** The only permitted inline style is a CSS custom
   property that must be dynamic, e.g. `style={{ '--reveal-delay': '120ms' }}`.
2. Page-specific CSS that genuinely cannot be composed goes in a co-located file
   (`src/pages/HomePage.css`) imported at the top of the component, with classes prefixed
   by the page: `.home-hero__title`. Keep these small.
3. Semantic HTML, one `<h1>` per page, `<button>` for actions and `<Link>` for navigation,
   labelled form controls, `aria-current="page"` on the active nav link.
4. Responsive down to 360px, no horizontal scroll at any width. Breakpoints in use:
   960px, 860px, 720px, 620px.
5. Scroll motion uses the `.reveal` class with the shared `useReveal` hook, not a
   motion library.

### Shared code

| File | Purpose |
|---|---|
| `src/hooks/useReveal.js` | IntersectionObserver hook; adds `is-visible` on entry, unobserves after firing, no-ops if the API is unavailable |
| `src/components/Reveal.js` | Thin wrapper: `<Reveal as="section" delay={120}>` renders with `className="reveal …"` and the hook's ref |
| `src/components/SEO.js` | Sets `document.title`, meta description, and OG tags per page in `useEffect` — no `react-helmet` |
| `src/components/Header.js` / `Footer.js` | Site chrome, nav, mobile menu, legal links |
| `src/App.js` | Router, `ScrollToTop`, EmailJS init. Exports `AppShell` (everything inside the router) so tests can mount it in a `MemoryRouter` |

---

## Where content lives

**`src/data/site.js` is the single source of truth for the words on this site.** Pages
import from it rather than duplicating strings. It exports:

`SITE` (name, founder, email, url, founded, tagline, description) · `NAV` · `LEGAL_NAV` ·
`PILLARS` (the three-part offer) · `DIFFERENTIATORS` · `HONESTY` · `ENGAGEMENTS` ·
`PRICING_NOTE` · `PROCESS` · `TECH` · `FAQ` · `RESPONSE_PROMISE`

To change a headline, an engagement model, a FAQ answer, or the contact email, edit
`site.js` — not the page components. Long-form legal prose is the exception and lives in
`PrivacyPolicyPage.js` / `TermsOfServicePage.js`.

---

## Contact form

`src/ContactForm.js` sends through **EmailJS** straight from the browser. There is no
server and no secret — the EmailJS public key is publishable by design.

- Public key `HIVHympEPP7sMQ_Pl`, initialised once in `src/App.js`
- Service `service_zeogjbm`, template `template_mfizbds`
- `templateParams`: `from_name`, `from_email`, `subject`, `message`, `to_email`,
  `reply_to`, plus optional `attachment` (data URL) and `attachment_name`

Two modes from the same component:

```jsx
<ContactForm embedded />                              // /contact page
<ContactForm isOpen={open} onClose={close} />         // modal from the header CTA
```

The modal closes on Escape and backdrop click, traps focus, and locks body scroll while
open. Both modes keep client-side validation with inline errors, phone formatting as you
type, a `localStorage` draft under the key `ldsContactDraft`, and explicit submitting /
success / error states. A plain `mailto:tyler@leducsystems.com` link sits near the form as
a fallback if EmailJS is blocked.

If the template IDs or the `templateParams` shape change, they must change in the EmailJS
dashboard at the same time or delivery silently breaks.

---

## Running it

```bash
npm install
npm start        # dev server at http://localhost:3000
npm test         # Jest + React Testing Library
npm run build    # production bundle into build/
npm run deploy   # builds, then publishes build/ to the gh-pages branch
```

`npm run deploy` pushes to the GitHub Pages branch of the site repository and is the only
deploy path — there is no CI pipeline. `public/CNAME` carries the custom domain and must
survive every deploy.

A change is done when `npm run build` completes with **no errors and no warnings**, there
are no unused imports and no `console.log`, every internal link resolves to a route that
exists, and the site is usable at 360px, 768px, 1280px, and 1920px.

---

## Content rules

This site describes a consultancy that is early and says so. That honesty is the point,
and it is enforced here because it is easy to erode.

**Nothing on this site may claim a client, testimonial, metric, or team member that does
not exist.** Concretely, do not add:

- Client testimonials, quotes, names, initials, or logos
- Named or implied past clients
- Outcome metrics ("reduced X by 37%", "99.9% uptime", "15x faster")
- Case studies or a portfolio of delivered work
- Teams, departments, headcount, or "decades of combined experience" — it is one person
- Awards, certifications, partnerships, years in business, or projects-shipped counts
- Manufactured scarcity ("only 2 slots left")

The only numbers permitted are commitments rather than claims: timelines ("about 1 week",
"4–12 weeks"), the promised reply time (one business day), and the founding year 2024.

If a section feels like it needs proof, use **capability** (what can be built),
**process** (how the work runs), or **commitment** (what is guaranteed) — never invented
evidence. Contact address everywhere is **tyler@leducsystems.com**.
