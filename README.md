# Le Duc Systems

Marketing site for **LeDuc Systems LLC**. Live at <https://leducsystems.com>.

The site is a small static React app: eleven routes, a shared design system, one working
contact form, and three free tools that run entirely in the browser. There is no CMS, no
backend, and no database — content lives in a single JavaScript module and the form posts
directly to EmailJS from the browser.

`CLAUDE.md` carries the business guardrails and is authoritative where the two disagree.

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
/                 Home
/services         Services — the three-part offer, engagement models, tech, process
/agencies         For agencies — white-label capacity
/about            About — why the company exists, principles
/contact          Contact — the form, embedded
/tools            Free tools — the index
/tools/workbook   Free tool — reads what is running inside an Excel workbook
/tools/folder     Free tool — maps the dependencies across a folder of workbooks
/tools/schema     Free tool — pasted spreadsheet to Postgres schema
/privacy          Privacy Policy
/terms            Terms of Service
*                 404
```

Every route except `/` and `*` must also appear in `scripts/prerender.js`, which writes a
real HTML file per route after the build so crawlers get a 200 instead of the GitHub Pages
404 stub. `src/prerender.test.js` fails if the two lists drift.

`public/404.html` performs the standard GitHub Pages SPA redirect so deep links resolve.

---

## Design system

Styles are a five-layer cascade, imported in this exact order by `src/index.css`:

| File | Role |
|---|---|
| `src/styles/tokens.css` | CSS custom properties only — color, type scale, spacing, radii, motion, layout widths |
| `src/styles/base.css` | Reset and base element typography, focus states, `prefers-reduced-motion` |
| `src/styles/components.css` | The shared class vocabulary every page composes from — `.section`, `.container`, `.panel`, `.btn`, `.eyebrow`, `.reveal`, and so on |
| `src/styles/tools.css` | Shared vocabulary for the free tools — `.tool-finding`, `.tool-table`, `.tool-sql`, `.xray-drop`, the paste-field chrome. Every tool page composes from it |
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
| `src/utils/inferSchema.js` | Delimited-text parsing and type inference behind `/tools/schema` |
| `src/utils/ooxml.js` | Shared XML-part helpers both workbook tools use — parse, tag lookup, attribute, text |
| `src/utils/zipReader.js` | ZIP central-directory reader; inflates with the platform's `DecompressionStream`, no library. `openZipFromBlob` slices a File instead of loading it |
| `src/utils/compoundFile.js` | MS-CFB (OLE compound file) reader — the container `vbaProject.bin` is stored in |
| `src/utils/vbaProject.js` | MS-OVBA decompression and the VBA module table; recovers macro source |
| `src/utils/workbookXray.js` | Turns those parsers into the findings shown at `/tools/workbook` |
| `src/utils/folderScan.js` | Probes a folder of workbooks, builds the dependency graph, and lays it out for `/tools/folder` |
| `src/utils/accessFile.js` | Jet 3/4 and ACE reader — pages, table definitions, and the catalogue rows that name every object |
| `src/utils/accessReport.js` | Turns that catalogue into Postgres DDL and the findings shown at `/tools/access` |

---

## Where content lives

**`src/data/site.js` is the single source of truth for the words on this site.** Pages
import from it rather than duplicating strings. It exports:

`SITE` (name, founder, email, url, founded, tagline, description) · `NAV` · `LEGAL_NAV` ·
`PILLARS` (the three-part offer) · `DIFFERENTIATORS` · `APPROACH` · `ENGAGEMENTS` ·
`PRICING_NOTE` · `PROCESS` · `TECH` · `FAQ` · `RESPONSE_PROMISE` · `TOOLS` · `AGENCY` ·
`AGENCY_TERMS` · `AGENCY_WORK` · `AGENCY_NOT_A_FIT`

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

The honesty rules are defined in `CLAUDE.md` and that file is authoritative. In short:
nothing on this site may claim a client, testimonial, outcome metric, team member, award,
or partnership that does not exist, and headcount is not a topic the site discusses in
either direction. The only numbers permitted are commitments — timelines, engagement
prices, the one-business-day reply promise, and the founding year.

There is also a hard positioning constraint in `CLAUDE.md` covering a pending patent.
Read it before writing any copy, including tool example data and meta descriptions.

Contact address everywhere is **tyler@leducsystems.com**.

---

## Free tools

Three pages that do real work in the visitor's browser, listed at `/tools` from the `TOOLS`
export in `site.js`. They are lead assets: each must be genuinely useful on its own, and
none of them may upload anything.

### `/tools/access` — what moving off Access would involve

Takes an `.mdb` or `.accdb` and reads its catalogue: the tables, their columns and types, the
row counts, the relationships, and the inventory of forms, reports, macros and modules. Emits
Postgres DDL for the tables and a list of what does not convert. Reader in
`src/utils/accessFile.js`, report in `src/utils/accessReport.js`.

Access is a paged database, not a document, and the format is undocumented by Microsoft in
practice. The layout here was derived from real files rather than from memory — the offsets
in `TDEF` and the row format were each anchored against a fixture whose contents were known,
which is the only way to be sure a byte offset is right. One parser covers Jet 3, Jet 4 and
ACE; the page layouts are identical and only the header version byte and Jet 3's narrow
strings differ.

**It never reads the user's data, and the page says so.** The only tables whose rows are read
are `MSysObjects` and `MSysRelationships`, which describe the database rather than contain
anyone's records. Everything else comes from table definitions. That claim is the reason
someone would drop a customer database onto a web page at all, so it must stay true: if a
change here starts reading user tables, the copy on the page becomes a lie.

The DDL is deliberately partial — no keys, no indexes, no constraints — because Access does
not record enough about them to generate something trustworthy. The page says that too.

### `/tools/schema` — spreadsheet to Postgres schema

Paste delimited text, get a `create table` plus the data problems that would break a real
import. Logic in `src/utils/inferSchema.js`.

### `/tools/folder` — map a whole shared drive

Takes a folder (via `webkitdirectory`) and builds the dependency graph across it: which
workbook a dozen reports read from, which links point outside the folder, which model exists
in four copies, and which depended-on file only one person has ever saved. Logic in
`src/utils/folderScan.js`, drawn with a deterministic force-directed layout in the same file.

Two things make it possible in a tab. It reads through `openZipFromBlob`, which slices the
central directory and the four parts it needs out of each file rather than loading it — a
40MB model costs kilobytes. And it never opens a worksheet: everything comes from
`xl/workbook.xml`, the `externalLinks` rels, `xl/connections.xml` and `docProps/core.xml`.
That list is printed on the page, because "we only read four parts" is checkable in a way
that "it stays local" is not.

Match confidence is part of the output, not hidden. A relative link resolves to an exact
path; an absolute one can only be matched on filename, and the graph draws those differently
and says so. Where two files share a name it reports the link as ambiguous rather than
picking one.

### `/tools/workbook` — what is running inside a workbook

Takes an `.xlsx`/`.xlsm` and reports the software hiding in it: VBA modules and their
recovered source, what that code reaches (databases, files, mail, the shell, the network),
`connections.xml` data sources, Power Query M sources, external links pointing at local
drives and network shares, very-hidden sheets, `#REF!` named ranges, and authorship.

It is built from four dependency-free parsers, in this order:

1. `zipReader.js` — an `.xlsx` is a ZIP of XML parts. Reads the central directory and
   inflates with the browser's own `DecompressionStream('deflate-raw')`.
2. `compoundFile.js` — `xl/vbaProject.bin` is not XML; it is an OLE compound file, a small
   FAT filesystem. Both the sector chain and the mini-stream allocation are needed, because
   VBA module streams are usually under the 4096-byte cutoff.
3. `vbaProject.js` — module source is compressed with MS-OVBA, a run-length format whose
   copy-token bit split changes as each 4096-byte chunk fills. The `dir` stream is walked
   from the `PROJECTMODULES` anchor rather than from the start, because `PROJECTVERSION`
   misreports its own size and desynchronises a naive record walk.
4. `workbookXray.js` — turns all of that into findings and a one-line verdict.

**Constraints when changing them.** No npm dependencies — the point is that this runs
anywhere with nothing installed. Never assert something about the user's file that the
parse does not actually support; a false positive costs more credibility than a missed
finding. Errors are returned as `{ error }` for the page to explain, never thrown.

**Every read is bounded, and the bounds are load-bearing.** This code parses a file chosen
by a stranger, in their tab, with no server to absorb the damage. Both container formats
amplify violently, and both did so in review before the caps went in:

| Bound | Where | Why |
|---|---|---|
| Inflate stops past `min(32MB, declared × 2)` — 64MB for `vbaProject.bin` | `zipReader.js` | A ZIP entry can declare 512 bytes and expand to a gigabyte |
| Central-directory names deduplicated | `zipReader.js` | 85-byte duplicate headers made the scanners re-inflate one part hundreds of times |
| Decompressed chunk capped at 4096 bytes; 32MB per module, 64MB per project | `vbaProject.js` | One copy token restates 4098 bytes from two bytes of input |
| Directory walk is iterative, with a visited set | `compoundFile.js` | A long sibling chain overflowed the stack and threw past the caller's error handling |
| DIFAT walk bounded by real sector count, with a visited set | `compoundFile.js` | A self-referencing DIFAT sector is an infinite loop |
| 512 modules, 4MB of scanned source | `vbaProject.js` | Bounds the per-file work |

When a cap truncates, **say so in the output** — `scan.sourceTruncated` becomes a finding.
A partial scan that looks like a clean one is the same lie as a false positive.

Verify layout changes with same-origin iframes, not `--window-size`: headless Chrome on
Windows will not set a viewport below roughly 500px, so media queries silently evaluate at
the wrong width and a page looks broken when it is not.

Tests live in `src/utils/workbookXray.test.js` and cover the parsers against
`src/utils/__fixtures__/SimpleMacro.xlsm`, a real macro workbook from the Apache POI
project (Apache-2.0, attributed in that folder's README). `src/utils/buildTestWorkbook.js`
assembles real ZIPs in memory for the XML paths. `jsdom` lacks `DecompressionStream` and
the text codecs, so `src/setupTests.js` borrows Node's.
