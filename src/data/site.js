/* =========================================================================
   LeDuc Systems — shared content
   Single source of truth for the words on this site. Pages import from here
   instead of duplicating strings.

   LeDuc Systems is Tyler LeDuc's software company: one developer building
   and selling focused software (office tools, retail apps, file converters)
   plus browser games on the side. The products live under /tools/.
   Two rules govern this file:
   1. Nothing here may claim a customer, testimonial, user count, rating,
      award, or press mention that is not real. No invented metrics.
   2. Voice is first person ("I"), not company "we" — this is one
      developer's work, not a team.

   Prices below are copied from the product pages under /tools/. If a price
   changes there, change it here too.
   ========================================================================= */

export const SITE = {
  name: 'LeDuc Systems',
  legalName: 'LeDuc Systems LLC',
  legalForm: 'an Arizona limited liability company',
  /* City level only: never publish a street address on this site. */
  phone: '(623) 320-5633',
  phoneHref: 'tel:+16233205633',
  founder: 'Tyler LeDuc',
  email: 'tyler@leducsystems.com',
  url: 'https://leducsystems.com',
  github: 'https://github.com/Tyler-LeDuc',
  githubHandle: 'Tyler-LeDuc',
  itchio: 'https://raxeris.itch.io',
  itchioHandle: 'raxeris',
  city: 'Phoenix',
  region: 'Arizona',
  regionShort: 'AZ',
  founded: 2026,
  tagline: 'Focused software, built and sold by one developer.',
  description:
    'LeDuc Systems is Tyler LeDuc’s software company. I build and sell focused software: Scan Relay keeps office copiers scanning to email on Microsoft 365, converters for retired file formats, and browser games.',
};

export const NAV = [
  /* Static pages from the leduc-tools repo, outside the router: render as a
     plain <a>, never <Link>, or the router serves its 404 page. */
  { label: 'Products', href: '/tools/', static: true },
  /* Games is linked from the footer (Company column), not the top nav. */
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

/* The home page's opening statement. */
export const HOME = {
  eyebrow: 'LeDuc Systems LLC · Phoenix, Arizona',
  title: 'Small software that does one job properly.',
  lede:
    'I build and sell focused software for problems with a deadline or a cost attached: copiers that stop scanning when Microsoft 365 drops basic auth, and files stranded when Publisher was retired. I also make browser games.',
};

/* The two products I'm actively selling, shown large on the home page.
   `facts` are short label/value pairs, each one stated on the product page. */
export const FEATURED_PRODUCTS = [
  {
    slug: 'scan-relay',
    visual: 'relay',
    name: 'Scan Relay',
    category: 'Office IT · Windows service',
    line: 'Keeps office copiers scanning to email after Microsoft 365 turns off SMTP basic authentication.',
    body: [
      'At the end of December 2026 Microsoft disables basic authentication for SMTP in Exchange Online, and older copiers that send through smtp.office365.com with a password stop sending. Scan Relay is a small Windows service on an office PC: the copier keeps sending plain SMTP to it, and it passes each scan on to Microsoft 365 with OAuth through Microsoft Graph.',
      'No firmware update, no static IP, no connector. Mail goes straight from the office to Microsoft 365, never through my servers.',
    ],
    facts: [
      ['Price', '$99 per office, one-time'],
      ['Dealers', 'Wholesale packs of 10, 25 and 100 offices'],
      ['Trial', '14 days free, no card'],
      ['Runs on', 'Any Windows PC in the office that stays on'],
    ],
    primary: { label: 'See Scan Relay', href: '/tools/scan-to-email-microsoft-365/' },
    secondary: { label: 'Pricing for copier dealers', href: '/tools/scan-relay-resellers/' },
  },
  {
    slug: 'publisher-converter',
    visual: 'convert',
    name: 'Publisher converter',
    category: 'Documents · Browser',
    line: 'Turns Microsoft Publisher .pub files into editable PowerPoint, Word and InDesign files.',
    body: [
      'Microsoft retired Publisher, and most other software can’t open a .pub file. Upload one and you see a free preview of every page; pay and you get the same document as PowerPoint, Word and InDesign (IDML) files, with text, pictures and layout still editable.',
      'Files are used only to make your download and are deleted automatically, within 24 hours (7 days if you paid).',
    ],
    facts: [
      ['Price', '$12 per file, or $19 for 30 days of files'],
      ['Preview', 'Free, every page, before you pay'],
      ['Refund', 'Full refund within 30 days, no questions asked'],
    ],
    primary: { label: 'Convert a .pub file', href: '/tools/publisher-converter/' },
    secondary: { label: 'Bulk converter', href: '/tools/bulk-publisher-converter/' },
  },
];

/* Everything else that is live, shown as a ruled register. */
export const MORE_PRODUCTS = [
  {
    slug: 'saguaro-hours',
    name: 'Saguaro Hours for Jira',
    category: 'Jira Cloud app',
    line: 'Weekly timesheets, team lead approval and billable reports on native Jira worklogs, with a Tempo import. Waiting for Atlassian Marketplace approval.',
    price: 'Free for up to 10 users, then from $2 per user a month',
    href: '/saguaro-hours/',
  },
  {
    slug: 'saguaro-hours-ado',
    name: 'Saguaro Hours for Azure DevOps',
    category: 'Azure DevOps extension',
    line: 'The same timesheets and approvals inside Azure DevOps. Coming soon: built and in testing.',
    price: 'Free for up to 5 people, then $4 per user a month',
    href: '/saguaro-hours/azure-devops/',
  },
  {
    slug: 'product-options',
    name: 'Product Options for Shopify',
    category: 'Shopify app',
    line: 'Engraving text, gift messages and required custom fields on product pages. Live on the Shopify App Store.',
    price: 'Free plan, Pro $9.99 a month',
    href: '/shopify/product-options/',
  },
  {
    slug: 'restock',
    name: 'Restock Alerts for Shopify',
    category: 'Shopify app',
    line: 'Back-in-stock emails to shoppers waiting on a sold-out product. In Shopify App Store review.',
    price: 'Free for 50 alerts a month, Pro $9.99 a month',
    href: '/restock/',
  },
  {
    slug: 'size-charts',
    name: 'Size Charts for Shopify',
    category: 'Shopify app',
    line: 'Size guides on product pages, started from templates. In Shopify App Store review.',
    price: 'Free for 2 size charts',
    href: '/size-charts/',
  },
  {
    slug: 'order-limits',
    name: 'Order Limits for Shopify',
    category: 'Shopify app',
    line: 'Minimum and maximum quantities per product, variant, collection or order, checked at checkout. In Shopify App Store review.',
    price: 'See the app page',
    href: '/order-limits/',
  },
  {
    slug: 'sold-out-sorter',
    name: 'Sold Out Sorter for Shopify',
    category: 'Shopify app',
    line: 'Moves sold-out products to the bottom of collections, and back when they are in stock again. In Shopify App Store review.',
    price: 'Free for 5 collections',
    href: '/sold-out-sorter/',
  },
  {
    slug: 'fire-to-iris',
    name: 'FIRE to IRIS 1099 converter',
    category: 'Tax filing',
    line: 'Turns a Publication 1220 (FIRE) 1099 file into IRIS Taxpayer Portal CSV files, now that the IRS is retiring FIRE.',
    price: '$49 per payer, free preview',
    href: '/tools/fire-to-iris-1099-converter/',
  },
  {
    slug: 'excel-to-iris',
    name: 'Excel to IRIS 1099-NEC CSV',
    category: 'Tax filing',
    line: 'Builds the IRIS 1099-NEC or 1099-MISC upload file from a spreadsheet or QuickBooks export, checking tax IDs and amounts.',
    price: 'Free for up to 5 forms',
    href: '/tools/excel-to-iris-1099-nec-csv/',
  },
  {
    slug: 'infopath-to-excel',
    name: 'InfoPath to Excel',
    category: 'SharePoint',
    line: 'Turns a library of filled-in InfoPath forms into one spreadsheet: a row per form, a column per field.',
    price: 'Free for up to 25 forms, then $49 once',
    href: '/tools/infopath-to-excel/',
  },
  {
    slug: 'mpp-viewer',
    name: 'MPP Viewer',
    category: 'Microsoft Project',
    line: 'Opens Microsoft Project .mpp files without Project, on Mac or Windows: Gantt chart, WBS task table and resources.',
    price: 'Free to view, $19 once for Excel, CSV and PDF export',
    href: '/tools/mpp-viewer/',
  },
  {
    slug: 'visio-viewer',
    name: 'Visio Viewer',
    category: 'Microsoft Visio',
    line: 'Opens Visio .vsdx and .vsd drawings without Visio, on Mac, Windows or a Chromebook. Every page shows in the browser.',
    price: 'Free to view, $19 once for PDF and PNG downloads',
    href: '/tools/visio-viewer/',
  },
  {
    slug: 'fax',
    name: 'Send a fax online',
    category: 'Fax',
    line: 'Fax a PDF or phone photos to any US or Canada number, with a cover page and a delivery confirmation. No subscription. Sending opens soon.',
    price: '$3.99 per fax, up to 25 pages',
    href: '/tools/fax/',
  },
  {
    slug: 'file-tools',
    name: 'PageMaker, Rhino and PowerPoint tools',
    category: 'File converters',
    line: 'Smaller tools for old PageMaker files, newer Rhino files in older Rhino, and text wrap in PowerPoint.',
    price: 'See each tool',
    href: '/tools/',
  },
];

export const LEGAL_NAV = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Refund Policy', path: '/refunds' },
];

/* How I build and sell. Every line is checkable on the product pages; do
   not add claims they do not back up. */
export const PRINCIPLES = {
  eyebrow: 'How I sell software',
  title: 'You can check every product before you pay for it.',
  items: [
    {
      title: 'Try it first',
      body: 'Scan Relay has a 14-day trial and the converters show a free preview of your own file.',
    },
    {
      title: 'Your data stays yours',
      body: 'The Rhino converter and the 1099 tools run in your browser. Scan Relay sends from your network straight to Microsoft 365. Uploaded files are deleted automatically within a day, or a week if you paid.',
    },
    {
      title: 'Refunds without a fight',
      body: 'Email me within 30 days of paying for a conversion and I refund it in full, no questions asked. Scan Relay and the other licenses get a full refund within 30 days if they don’t work for you.',
    },
    {
      title: 'You talk to the developer',
      body: 'Support email comes to me, the person who wrote the code. I reply within one business day.',
    },
  ],
};

/* Every game released on itch.io under the handle "raxeris" — all 47,
   in the order the live store page shows them. Facts only: title, slug,
   url, genre, and the one-line pitch from the store page. Do NOT add
   ratings, download counts, review quotes, or awards; those are outcome
   metrics, and this site does not publish them (see the file header
   above). `embedId` is the numeric id of the real itch.io embed widget for
   every game — pulled directly from each game's page (the `itch:path`
   meta tag, `games/<id>`), not guessed. Slugs and urls are likewise the
   real ones read off the live store, not inferred from the title. */
export const GAMES = [
  {
    title: 'Skip a Stone',
    slug: 'skip-a-stone',
    url: 'https://raxeris.itch.io/skip-a-stone',
    genre: 'Sports',
    blurb: 'Skip a stone from a garden pond all the way across the ocean. One button, pure timing.',
    embedId: '5076895',
  },
  {
    title: 'FISH EATS EARTH',
    slug: 'fish-eats-earth',
    url: 'https://raxeris.itch.io/fish-eats-earth',
    genre: 'Simulation',
    blurb:
      'Start as a 5 mm fish in a puddle. Eat everything. Grow big enough to eat the Earth, the Sun, and the universe.',
    embedId: '5076873',
  },
  {
    title: 'Dig Through the Universe',
    slug: 'dig-through-the-universe',
    url: 'https://raxeris.itch.io/dig-through-the-universe',
    genre: 'Simulation',
    blurb:
      'Dig through the Moon, Mars, the Sun, a black hole and the whole universe. 12 worlds, one drill. Free in your browser.',
    embedId: '5076762',
  },
  {
    title: 'SKILL ISSUE',
    slug: 'skill-issue',
    url: 'https://raxeris.itch.io/skill-issue',
    genre: 'Simulation',
    blurb: '9 tests. 1 tilted doctor. 1 nurse cat. Find out exactly how bad your skill issue is, free in your browser.',
    embedId: '5075736',
  },
  {
    title: 'SHADE',
    slug: 'shade',
    url: 'https://raxeris.itch.io/shade',
    genre: 'Puzzle',
    blurb: "You don't move him. You move the sun.",
    embedId: '5072588',
  },
  {
    title: 'MURMUR',
    slug: 'murmur',
    url: 'https://raxeris.itch.io/murmur',
    genre: 'Action',
    blurb: 'Three skies. Three bosses. One river of a thousand paper birds against the ink.',
    embedId: '5072058',
  },
  {
    title: 'Starbreath 3D',
    slug: 'starbreath-3d',
    url: 'https://raxeris.itch.io/starbreath-3d',
    genre: 'Action',
    blurb: 'A lonely little star, one button, eight worlds in 3D. Breathe in, breathe out, go supernova.',
    embedId: '5072202',
  },
  {
    title: 'HORNET SAUNA',
    slug: 'hornet-sauna',
    url: 'https://raxeris.itch.io/hornet-sauna',
    genre: 'Action',
    blurb: 'Real bees cook murder hornets alive with body heat. Be the bees.',
    embedId: '5066338',
  },
  {
    title: 'DIG TO AUSTRALIA',
    slug: 'dig-to-australia',
    url: 'https://raxeris.itch.io/dig-to-australia',
    genre: 'Simulation',
    blurb: "Everyone says if you dig deep enough you'll reach Australia. 12,742 km. Hold to dig.",
    embedId: '5065945',
  },
  {
    title: "IT'S JUST MINESWEEPER",
    slug: 'its-just-minesweeper',
    url: 'https://raxeris.itch.io/its-just-minesweeper',
    genre: 'Puzzle',
    blurb: 'A perfectly normal game of Minesweeper. Six boards. Nothing is wrong. Please stop asking.',
    embedId: '5065747',
  },
  {
    title: 'Warm Little Room',
    slug: 'cozy',
    url: 'https://raxeris.itch.io/cozy',
    genre: 'Simulation',
    blurb: 'An idle clicker about making one rainy-night room as cozy as possible. Hearts, chimes, lo-fi, a purring cat.',
    embedId: '5065597',
  },
  {
    title: 'SIR THROWSALOT',
    slug: 'sir-throwsalot',
    url: 'https://raxeris.itch.io/sir-throwsalot',
    genre: 'Action',
    blurb: "The Chosen One loves the Dark Lord and won't fight. You're his angel: grab him and throw him at the bad guys.",
    embedId: '5065471',
  },
  {
    title: 'ONE OF THESE IS YOU',
    slug: 'one-of-these-is-you',
    url: 'https://raxeris.itch.io/one-of-these-is-you',
    genre: 'Puzzle',
    blurb: 'Every cursor moves when you move your mouse. Only one of them is you. 20 levels of mirrors, echoes and past selves.',
    embedId: '5065215',
  },
  {
    title: 'PEEPER',
    slug: 'peeper',
    url: 'https://raxeris.itch.io/peeper',
    genre: 'Puzzle',
    blurb: 'Throw your eyeball. See only where it lands. 14 levels of eyeless things that move when you look away.',
    embedId: '5065305',
  },
  {
    title: '99%',
    slug: '99',
    url: 'https://raxeris.itch.io/99',
    genre: 'Simulation',
    blurb: 'The loading bar is stuck at 99%. Click. It notices.',
    embedId: '5064863',
  },
  {
    title: 'Yeehaunt',
    slug: 'yeehaunt',
    url: 'https://raxeris.itch.io/yeehaunt',
    genre: 'Action',
    blurb: 'Lasso herds of cute ghosts before they escape through the spirit gates.',
    embedId: '5064308',
  },
  {
    title: 'CANCEL ANYTIME',
    slug: 'cancel-anytime',
    url: 'https://raxeris.itch.io/cancel-anytime',
    genre: 'Puzzle',
    blurb: 'You subscribed in one click. Now try to leave.',
    embedId: '5064256',
  },
  {
    title: 'FLY BRAIN GRAND PRIX',
    slug: 'fly-brain-grand-prix',
    url: 'https://raxeris.itch.io/fly-brain-grand-prix',
    genre: 'Racing',
    blurb: 'A real fruit-fly brain, 138,639 neurons firing live. Race with Giga Chad.',
    embedId: '5064015',
  },
  {
    title: 'Ice Cube Simulator',
    slug: 'ice-simulator',
    url: 'https://raxeris.itch.io/ice-simulator',
    genre: 'Simulation',
    blurb: "Ice cubes don't have eyes.",
    embedId: '5059764',
  },
  {
    title: 'Swarm Buster',
    slug: 'swarm-buster',
    url: 'https://raxeris.itch.io/swarm-buster',
    genre: 'Shooter',
    blurb: 'Crash-land. Get swarmed. BUST them all.',
    embedId: '5059455',
  },
  {
    title: 'Human In The Loop',
    slug: 'human-in-the-loop',
    url: 'https://raxeris.itch.io/human-in-the-loop',
    genre: 'Puzzle',
    blurb: 'You are the AI.',
    embedId: '5058691',
  },
  {
    title: 'You Have 3 Seconds',
    slug: 'you-have-3-seconds',
    url: 'https://raxeris.itch.io/you-have-3-seconds',
    genre: 'Action',
    blurb: "26 tiny games. 3 seconds each. One word tells you what to do. Don't think. GO.",
    embedId: '5058632',
  },
  {
    title: 'Itch.Oh Simulator',
    slug: 'itchoh-simulator',
    url: 'https://raxeris.itch.io/itchoh-simulator',
    genre: 'Simulation',
    blurb: 'Itch.io simulator. Real games.',
    embedId: '5058572',
  },
  {
    title: 'Spectra',
    slug: 'spectra',
    url: 'https://raxeris.itch.io/spectra',
    genre: 'Action',
    blurb: 'A symphony of liquid light you play with one swipe.',
    embedId: '5058381',
  },
  {
    title: 'One More Orbit',
    slug: 'one-more-orbit',
    url: 'https://raxeris.itch.io/one-more-orbit',
    genre: 'Action',
    blurb: 'One button. Endless space. Just one more.',
    embedId: '5058254',
  },
  {
    title: 'Vibe Coding Simulator',
    slug: 'vibe-coding-simulator',
    url: 'https://raxeris.itch.io/vibe-coding-simulator',
    genre: 'Simulation',
    blurb: 'An AI writes all the code. You press enter. 12 stories, 42 achievements, 1 button.',
    embedId: '5058098',
  },
  {
    title: 'Overkill',
    slug: 'overkill',
    url: 'https://raxeris.itch.io/overkill',
    genre: 'Adventure',
    blurb: 'A whole superhero world. Right in your browser.',
    embedId: '5054165',
  },
  {
    title: 'Sever',
    slug: 'sever',
    url: 'https://raxeris.itch.io/sever',
    genre: 'Action',
    blurb: 'One click. One cut.',
    embedId: '5054670',
  },
  {
    title: 'Number Go Up',
    slug: 'number-go-up',
    url: 'https://raxeris.itch.io/number-go-up',
    genre: 'Simulation',
    blurb: 'Click the button. The number goes up. Something notices.',
    embedId: '5051126',
  },
  {
    title: 'Full Send',
    slug: 'full-send',
    url: 'https://raxeris.itch.io/full-send',
    genre: 'Racing',
    blurb: "Granny's late for bingo. Time and space are in the way.",
    embedId: '5049723',
  },
  {
    title: 'Starbreath',
    slug: 'starbreath',
    url: 'https://raxeris.itch.io/starbreath',
    genre: 'Action',
    blurb: 'A lonely little star. Breathe in, breathe out, go supernova.',
    embedId: '5046631',
  },
  {
    title: 'Swingtop',
    slug: 'swingtop',
    url: 'https://raxeris.itch.io/swingtop',
    genre: 'Action',
    blurb: 'Swing across the carnival, then take down the Ringmaster.',
    embedId: '5041816',
  },
  {
    title: 'Dont Scroll Down',
    slug: 'dont-scroll-down',
    url: 'https://raxeris.itch.io/dont-scroll-down',
    genre: 'Action',
    blurb: 'A web page that begs you not to scroll. The whole game is scrolling.',
    embedId: '5045698',
  },
  {
    title: 'Saberbara',
    slug: 'saberbara',
    url: 'https://raxeris.itch.io/saberbara',
    genre: 'Action',
    blurb: 'Backflip. Slice a T-rex in half. Save the dinosaurs. One button.',
    embedId: '5045254',
  },
  {
    title: 'Parry God',
    slug: 'parry-god',
    url: 'https://raxeris.itch.io/parry-god',
    genre: 'Action',
    blurb: 'You have no gun. Only timing.',
    embedId: '5042339',
  },
  {
    title: 'Looper',
    slug: 'looper',
    url: 'https://raxeris.itch.io/looper',
    genre: 'Survival',
    blurb: 'Close the loop. Erase everything inside.',
    embedId: '5042109',
  },
  {
    title: 'Voidbloom',
    slug: 'voidbloom',
    url: 'https://raxeris.itch.io/voidbloom',
    genre: 'Shooter',
    blurb: '8 weapons that evolve, 3 bosses, 10 Abyss depths. Survive ten minutes of neon swarm, free in your browser.',
    embedId: '5041968',
  },
  {
    title: 'PLEASE CLOSE THIS TAB',
    slug: 'please-close-this-tab',
    url: 'https://raxeris.itch.io/please-close-this-tab',
    genre: 'Puzzle',
    blurb: 'A platformer where the only way out is through your browser.',
    embedId: '5041894',
  },
  {
    title: 'Glintwork',
    slug: 'glintwork',
    url: 'https://raxeris.itch.io/glintwork',
    genre: 'Puzzle',
    blurb: 'A zen puzzle about bending light, where every crystal wants exactly its own color.',
    embedId: '5041766',
  },
  {
    title: 'Wickfly',
    slug: 'wickfly',
    url: 'https://raxeris.itch.io/wickfly',
    genre: 'Survival',
    blurb: 'A tiny firefly in a very dark meadow. How long can you keep shining?',
    embedId: '5041534',
  },
  {
    title: 'Low Water',
    slug: 'low-water',
    url: 'https://raxeris.itch.io/low-water',
    genre: 'Platformer',
    blurb: 'A fast, surreal platformer across a drowned town at dusk.',
    embedId: '5041476',
  },
  {
    title: 'Gravelight',
    slug: 'gravelight',
    url: 'https://raxeris.itch.io/gravelight',
    genre: 'Survival',
    blurb: 'Your sword swings itself. Survive the graveyard, gather souls, and pick what you become.',
    embedId: '5039360',
  },
  {
    title: 'Emberleaf',
    slug: 'emberleaf',
    url: 'https://raxeris.itch.io/emberleaf',
    genre: 'Action',
    blurb: 'Fourteen bosses, one idea each, and nothing in between but a choice. Parry it, break it, take the opening.',
    embedId: '4964683',
  },
  {
    title: 'The Endless Descent',
    slug: 'the-endless-descent',
    url: 'https://raxeris.itch.io/the-endless-descent',
    genre: 'Action',
    blurb: 'Fall 10,000 metres through nine surreal zones. Thread the gaps, graze everything, dive for double points.',
    embedId: '4533077',
  },
  {
    title: 'Veilborne',
    slug: 'veilborne',
    url: 'https://raxeris.itch.io/veilborne',
    genre: 'Shooter',
    blurb: 'Sun and void, fired at point-blank.',
    embedId: '4530651',
  },
  {
    title: 'Dragon Match',
    slug: 'dragon-match',
    url: 'https://raxeris.itch.io/dragon-match',
    genre: 'Puzzle',
    blurb: 'A real-time memory duel: flip matching cards to cast spells at six dragons before their fuse burns down.',
    embedId: '4531158',
  },
  {
    title: 'Pegasomnia',
    slug: 'pegasomnia',
    url: 'https://raxeris.itch.io/pegasomnia',
    genre: 'Fighting',
    blurb: 'One dream boss, one button. Dash into her face, juggle her mid-air, and bat her hotdogs back. Free in your browser.',
    embedId: '4530940',
  },
];

/* The two best-performing releases, by itch.io's own creator-dashboard
   analytics (views/downloads/ratings/collections), checked 2026-09-30.
   DIG TO AUSTRALIA and 99% are not close — each has roughly 10x the views
   of the next tier and far more ratings/collections than anything else in
   the catalogue. These are the ones that get the large embed treatment on
   the games page; every other game in GAMES above has a real embedId too,
   so the rest linking out instead is a layout choice (avoiding a page of
   47 stacked iframes), not a data limitation. Re-check analytics before
   changing this list — don't swap in a game because it "feels" like a
   flagship without the numbers behind it. */
export const FEATURED_SLUGS = ['dig-to-australia', '99'];

export const FAQ = [
  {
    id: 'name',
    question: 'What is LeDuc Systems?',
    answer:
      'My software company, LeDuc Systems LLC. I’m Tyler LeDuc, a developer in Phoenix, and I build and sell focused software: Scan Relay, file converters and 1099 tools, plus browser games.',
  },
  {
    id: 'who',
    question: 'Is it really one person?',
    answer:
      'Yes. I write the code, run the servers and answer the email. That is why each product does one job: I would rather ship one thing that works than five that half work.',
  },
  {
    id: 'cost',
    question: 'How do I pay, and what if it doesn’t work?',
    answer:
      'Each product page shows its price before you start, and you can try every product before paying. Publisher and PageMaker conversions are refunded within 30 days, no questions asked; Scan Relay and the other licenses within 30 days if they don’t work for you.',
  },
  {
    id: 'files',
    question: 'What happens to my files and data?',
    answer:
      'The Rhino converter and the 1099 tools run in your browser, so nothing leaves your device. Scan Relay sends straight from your office to Microsoft 365. The Publisher and PageMaker converters use your file only to make the download and delete it automatically within 24 hours (7 days if you paid).',
  },
  {
    id: 'games',
    question: 'Why are there games on a software company’s site?',
    answer:
      'I make small browser games on the side. They’re free on itch.io, and they’re where I try out ideas quickly.',
  },
];

export const RESPONSE_PROMISE = 'I reply to every message within one business day.';

/* Claude Workflow Setup: a fixed-price, async service page at
   /services/claude-workflow-setup. Every claim here is a term of the offer;
   no case studies, testimonials or invented numbers. No em dashes. */
const WORKFLOW_SUBJECT = 'Claude workflow setup';
const WORKFLOW_BODY = [
  'The task (the steps, or attach a screen recording of you doing it once):',
  '',
  'How often it happens:',
  '',
  'Which tools and files are involved:',
  '',
  'A sample (one example input and the finished result; dummy data is fine):',
  '',
].join('\n');

export const CLAUDE_WORKFLOW = {
  path: '/services/claude-workflow-setup',
  seoTitle: 'Claude Workflow Setup for Small Businesses | LeDuc Systems',
  seoDescription:
    'Send me one repetitive task by email. I cut the steps that shouldn’t exist and turn the rest into a Claude skill you run yourself. $349, delivered in 5 business days, no calls.',
  eyebrow: 'Service · Fixed price · By email',
  title: 'Claude Workflow Setup',
  lede:
    'Send me one repetitive task your business does by hand. I audit the steps, cut the ones that shouldn’t exist, and turn the clean process into a Claude skill you run yourself.',
  ctaLabel: 'Describe your task',
  mailto: `mailto:${SITE.email}?subject=${encodeURIComponent(WORKFLOW_SUBJECT)}&body=${encodeURIComponent(WORKFLOW_BODY)}`,
  facts: [
    { label: 'Price', value: '$349 per workflow' },
    { label: 'Delivery', value: 'Within 5 business days' },
    { label: 'Calls', value: 'None needed' },
    { label: 'Changes', value: 'One round within 14 days' },
    { label: 'Refund', value: 'In full if I can’t deliver' },
  ],
  steps: [
    {
      title: 'You describe the task',
      body: 'Email me the steps, written out or as a screen recording, with a sample of the files involved.',
    },
    {
      title: 'I confirm it’s a fit',
      body: 'I reply in writing to say I can build it, or why I can’t. If it fits, I send an invoice.',
    },
    {
      title: 'I audit the steps',
      body: 'Before building anything, I cut the steps that only exist because of how the work grew, like typing the same value into two places.',
    },
    {
      title: 'I build the skill',
      body: 'The clean process becomes a Claude skill, or a Claude project with instructions if that suits the task better.',
    },
    {
      title: 'You get the files',
      body: 'Within 5 business days of getting your description and sample files, you get the skill files and a short written setup guide. One round of changes is included within 14 days.',
    },
  ],
  plans: [
    {
      name: 'One workflow',
      price: '$349',
      unit: 'per workflow',
      points: [
        'One task turned into one Claude skill',
        'Skill files and a short written setup guide',
        'One round of changes within 14 days',
        'Full refund if I can’t deliver a working skill',
      ],
    },
    {
      name: 'Monthly',
      price: '$790',
      unit: 'per month',
      points: [
        'Up to 3 new workflows a month',
        'Fixes to the workflows I’ve built for you',
        'Same delivery and refund terms per workflow',
        'Cancel anytime',
      ],
    },
  ],
  planNote:
    'I invoice you after I confirm the task is a fit, so there is nothing to pay up front. You need your own Claude Pro or Team plan. If your business uses ChatGPT instead, I can set the workflow up there.',
  goodFits: [
    'Turning intake emails into a filled spreadsheet row',
    'Drafting quotes from your price list',
    'A weekly report built from exported CSV files',
    'Cleaning up and renaming the data from scanned files',
    'First-draft replies to the questions customers ask most',
  ],
  notFits: [
    'Anything that needs access to bank accounts',
    'Anything involving medical records',
    'Tasks that must run unattended on a server. A skill runs when someone starts it in Claude.',
  ],
  template: [
    { label: 'The task', body: 'What you do, step by step, or a screen recording of you doing it once.' },
    { label: 'How often', body: 'Daily, weekly, or once per customer or order.' },
    { label: 'Tools and files', body: 'Which programs, spreadsheets, folders or inboxes are involved.' },
    { label: 'A sample', body: 'One example input and the finished result. Dummy data is fine.' },
  ],
  faq: [
    {
      id: 'call',
      question: 'Do we need a call?',
      answer:
        'No. Everything happens by email. If something in your description is unclear, I ask in writing.',
    },
    {
      id: 'need',
      question: 'What do I need?',
      answer:
        'A Claude Pro or Team plan, a description of the task, and one or more sample files. If your business uses ChatGPT, I can set the workflow up there instead.',
    },
    {
      id: 'skill',
      question: 'What is a Claude skill?',
      answer:
        'A folder of instructions, and sometimes templates or small scripts, that Claude uses when you start the task, so it follows your process the same way each time.',
    },
    {
      id: 'data',
      question: 'Is my data safe?',
      answer:
        'I only see the samples you send me. If you prefer, send dummy data with the same layout as the real thing. I delete your samples after delivery.',
    },
    {
      id: 'refund',
      question: 'What if it doesn’t work?',
      answer: 'If I can’t deliver a working skill for your task, I refund you in full.',
    },
    {
      id: 'more',
      question: 'Can you do more than one?',
      answer:
        'Yes. Each workflow is $349, or the monthly plan covers up to 3 new workflows a month plus fixes for $790 a month. You can cancel it anytime.',
    },
  ],
};

/* Copier scan-to-email migration, done for you: a fixed-price service at
   /services/scan-to-email-migration. Every claim here is a term of the offer.
   Microsoft timeline wording must match the Exchange Team blog (Jan 27, 2026):
   disabled by default at the end of December 2026, admins can re-enable,
   final removal date to come in the second half of 2027. No em dashes. */
const MIGRATION_SUBJECT = 'Scan-to-email migration';
const MIGRATION_BODY = [
  'How many offices:',
  '',
  'Copier or MFP make and model at each office:',
  '',
  'Do they use Microsoft 365 for email? (yes / not sure):',
  '',
  'Is there a Windows PC at each office that stays on during work hours?',
  '',
].join('\n');

export const SCAN_MIGRATION = {
  path: '/services/scan-to-email-migration',
  seoTitle: 'Copier Scan-to-Email Migration for Microsoft 365, Done for You | LeDuc Systems',
  seoDescription:
    'Microsoft 365 disables SMTP basic authentication by default at the end of December 2026. I move each office’s copier scan to email to modern sign-in for $149 per office, and you pay only after scans arrive.',
  eyebrow: 'Service · Fixed price · Microsoft 365',
  title: 'Copier scan to email, moved off SMTP basic auth for you',
  lede:
    'At the end of December 2026, Microsoft 365 disables SMTP basic authentication by default, and most copiers still scan to email that way. I move each office over for a fixed price, and you pay only after the scans arrive.',
  ctaLabel: 'Email me your offices',
  mailto: `mailto:${SITE.email}?subject=${encodeURIComponent(MIGRATION_SUBJECT)}&body=${encodeURIComponent(MIGRATION_BODY)}`,
  facts: [
    { label: 'Price', value: '$149 per office' },
    { label: '10 or more', value: '$99 per office' },
    { label: 'Includes', value: 'A lifetime Scan Relay license' },
    { label: 'You pay', value: 'After scans arrive' },
    { label: 'Calls', value: 'None needed' },
  ],
  intro: [
    'Microsoft has announced that SMTP AUTH with basic authentication is disabled by default for existing Microsoft 365 organizations at the end of December 2026. Copiers that send scans through smtp.office365.com with a mailbox password stop emailing unless an admin turns it back on, and Microsoft says it will announce a final removal date in the second half of 2027.',
    'Many older copiers can’t do the OAuth sign-in that replaces it. Fixing them one office at a time is slow work for an IT provider in December. Send me the list and I do the setup work for each office.',
  ],
  sources: [
    {
      label: 'Microsoft Exchange Team blog',
      href: 'https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835',
    },
  ],
  whyTitle: 'I built the tool this runs on',
  why: [
    'Each office gets Scan Relay, a small Windows service I wrote. The copier sends scans to a PC at the office, and Scan Relay passes them on to Microsoft 365 with modern sign-in. It works with any copier brand, with no firmware updates, static IP or DNS changes.',
    'Because I wrote it, I can read its logs and fix problems directly, without a support queue in between.',
  ],
  whyLink: { label: 'See Scan Relay', href: '/tools/scan-to-email-microsoft-365/' },
  priceTitle: 'One price per office, paid after it works.',
  priceIntro: 'The license is included, so there is nothing else to buy.',
  prices: [
    {
      name: 'One office',
      price: '$149',
      unit: 'per office',
      points: [
        'Settings written for that exact copier model',
        'Scan Relay set up and signed in to Microsoft 365',
        'Test scans checked until they arrive',
        'A lifetime Scan Relay license for that office',
      ],
    },
    {
      name: '10 or more offices',
      price: '$99',
      unit: 'per office',
      points: [
        'Everything in one office, for each office',
        'One spreadsheet tracking every office’s status',
        'Offices done in the order you choose',
        'For IT providers and copier dealers',
      ],
    },
    {
      name: 'Just the license',
      price: '$99',
      unit: 'or $29 each in a 10-pack',
      points: [
        'If your techs would rather do the setup themselves',
        'Same software, with my written guides',
        '14-day free trial first',
        'Bought on the Scan Relay pages',
      ],
    },
  ],
  priceNote:
    'I send a Stripe invoice once test scans from an office arrive in the inbox. If I can’t get an office’s scans working, you don’t pay for that office.',
  limitNote:
    'Everything happens by email. Someone at the office needs about 15 minutes for the steps that have to happen on site.',
  steps: [
    {
      title: 'You send the list',
      body: 'Email me each office’s copier make and model and whether it uses Microsoft 365. I reply within one business day with what each office needs.',
    },
    {
      title: 'I write the settings',
      body: 'For each office you get a one-page sheet: where to install Scan Relay, and the exact menu path and values to enter on that copier model.',
    },
    {
      title: 'Someone runs the installer',
      body: 'A tech or the office manager runs the installer on a PC that stays on, and a Microsoft 365 admin approves the sign-in. This is the part that has to happen at the office.',
    },
    {
      title: 'I test until scans arrive',
      body: 'We send test scans, and I fix whatever stops them, by email, until they land in the inbox.',
    },
    {
      title: 'Then you pay',
      body: 'Once scans arrive, I send the invoice for that office and its license key.',
    },
  ],
  faq: [
    {
      id: 'remote',
      question: 'Do you need remote access to the office?',
      answer:
        'No. I write the steps and someone at the office or your tech follows them. If your tech prefers, they can share a screen with me during setup, but it isn’t required.',
    },
    {
      id: 'which',
      question: 'Which copiers does this work with?',
      answer:
        'Any copier or MFP that can scan to email through an SMTP server address you give it, which covers nearly all office models from Ricoh, Canon, Xerox, Konica Minolta, Sharp, Kyocera, HP, Brother, Toshiba, Lexmark and Epson. Send me the model and I’ll confirm before any work starts.',
    },
    {
      id: 'pc',
      question: 'What if the office has no PC that stays on?',
      answer:
        'Scan Relay needs a Windows PC that is on whenever people scan. If there isn’t one, tell me and I’ll say plainly whether another route, like an SMTP relay connector in Microsoft 365, suits that office better.',
    },
    {
      id: 'prompts',
      question: 'Will anything look scary during setup?',
      answer:
        'Two prompts, both expected. Windows may show a SmartScreen notice for the installer, and a Microsoft 365 admin approves Scan Relay once when it first signs in. My setup steps show both, so nobody is surprised.',
    },
    {
      id: 'reenable',
      question: 'Can’t we just turn SMTP AUTH back on?',
      answer:
        'For now, yes. Microsoft has said admins can re-enable it after December, but it leaves a password-only sign-in open, security defaults and Conditional Access often block it, and Microsoft plans to announce a final removal date in the second half of 2027.',
    },
    {
      id: 'pay',
      question: 'Is there anything to pay up front?',
      answer:
        'No. I invoice each office after its test scans arrive. If I can’t get an office working, there is no charge for it.',
    },
    {
      id: 'resell',
      question: 'Can I resell this to my clients?',
      answer:
        'Yes. Charge your clients whatever you like. I work with you or your techs and never contact your clients unless you ask me to.',
    },
  ],
  closeTitle: 'Send me your list of offices.',
  closeBody: 'Copier models and office count are enough to start.',
};

/* Connect to Forge migration: a fixed-price service page at
   /services/forge-migration. Every claim here is a term of the offer;
   no case studies, testimonials or invented numbers. No em dashes. */
export const FORGE_MIGRATION = {
  path: '/services/forge-migration',
  seoTitle: 'Connect to Forge Migration for Atlassian Apps | LeDuc Systems',
  seoDescription:
    'Fixed-price ports of Atlassian Connect apps to Forge before Connect end of support on January 31, 2027. Starts with a $500 readiness audit that is credited toward the port.',
  eyebrow: 'Service · Fixed price · Jira and Confluence',
  title: 'Connect to Forge migration, at a fixed price',
  lede:
    'Atlassian ends support for Connect on January 31, 2027. I port Connect apps to Forge for a fixed price, so you know the cost before any work starts.',
  ctaLabel: 'Email me about an audit',
  mailto: `mailto:${SITE.email}?subject=${encodeURIComponent('Forge audit')}`,
  facts: [
    { label: 'Audit', value: '$500, credited in full' },
    { label: 'Audit time', value: 'About 5 business days' },
    { label: 'Port price', value: 'Fixed quote, $3,000 to $10,000' },
    { label: 'Port time', value: 'Usually 2 to 6 weeks' },
    { label: 'Payment', value: '50% to start, 50% on delivery' },
  ],
  intro: [
    'After January 31, 2027, Atlassian says Connect gets only critical and security fixes, and Connect modules can be deprecated with little notice. If your Marketplace app or in-house Jira or Confluence app still runs on Connect, it needs to move to Forge.',
    'Start with a $500 Forge readiness audit. If you go ahead with the port, the full $500 is credited toward it.',
  ],
  sources: [
    {
      label: 'Atlassian announcement',
      href: 'https://community.developer.atlassian.com/t/connect-end-of-support-extended-to-january-31-2027/102002',
    },
    {
      label: 'Atlassian blog',
      href: 'https://www.atlassian.com/blog/developer/announcing-connect-end-of-support-timeline-and-next-steps',
    },
  ],
  whyTitle: 'Why me',
  why: [
    'I build on Forge. Saguaro Hours for Jira is a time tracking and timesheet app I built on Forge from scratch: Custom UI on four surfaces (global page, issue panel, admin page, dashboard gadget), product event and scheduled triggers, Forge storage, Forge licensing for a paid Marketplace listing, personal data reporting, and 386 automated tests. It is in Atlassian Marketplace review now.',
    'That means I have already been through the parts of Forge that slow teams down: the manifest and scopes, the storage and invocation limits, the licensing checks, Marketplace security requirements, and the review process.',
    'I am a small studio, so you work with me directly, not an account manager.',
  ],
  whyLink: { label: 'See Saguaro Hours', href: '/saguaro-hours/' },
  included: [
    {
      name: 'Readiness audit',
      price: '$500',
      unit: 'about 5 business days',
      points: [
        'A module-by-module map of your Connect descriptor to Forge modules, with every gap flagged (modules with no direct Forge equivalent, or that behave differently)',
        'A scope and egress review: which Forge scopes you need, and what changing them means for your customers’ admins',
        'A recommended path: Forge Remote (keep your backend, replace the Connect JWT handshake) or a move to Forge-hosted compute and storage (needed for Atlassian’s “Runs on Atlassian” badge)',
        'A data plan for existing installs, saved settings, entity properties, custom field values and macro bodies',
        'A fixed quote and a timeline for the port',
        'You keep the audit report whether or not you hire me',
      ],
    },
    {
      name: 'The port',
      price: 'Fixed quote',
      unit: 'after the audit',
      points: [
        'Forge app registered against your existing app, so it can upgrade in place on the same listing using Atlassian’s path for moving Connect apps to Forge',
        'Modules rebuilt on Forge (UI Kit or Custom UI), auth moved off Connect JWT, lifecycle and webhook handling moved to Forge equivalents',
        'Data migration for existing installs',
        'Automated tests for the migrated code, and a test run on a development site and a staging install',
        'Help with the Marketplace side: the new version, the release notes, and the migration plan Atlassian asks vendors to share with customers',
        'Two weeks of fixes after release at no extra cost for anything inside the agreed scope',
      ],
    },
  ],
  paymentNote:
    'Payment: the $500 audit is paid upfront and credited in full toward the port. The port is 50% to start and 50% on delivery.',
  priceTitle: 'Price ranges',
  priceIntro:
    'Every port gets a fixed quote after the audit. These ranges show where most apps land.',
  prices: [
    {
      name: 'Small',
      price: '$3,000 to $4,500',
      unit: 'fixed price',
      points: ['1 to 3 simple modules (a page, a panel, a gadget)', 'Forge Remote', 'Little stored data'],
    },
    {
      name: 'Medium',
      price: '$5,000 to $7,000',
      unit: 'fixed price',
      points: [
        'Several modules',
        'Admin configuration',
        'Entity properties or webhooks',
        'A real data migration',
      ],
    },
    {
      name: 'Large',
      price: '$8,000 to $10,000',
      unit: 'fixed price',
      points: [
        'Custom fields, Confluence macros with saved content, or JSM portal modules',
        'Or a move to Forge-hosted storage',
      ],
    },
  ],
  priceNote: 'Bigger apps are split into phases, each with its own fixed price.',
  steps: [
    {
      title: 'Email me',
      body: 'Send your app’s Marketplace link (or descriptor, for a private app). I reply within one business day.',
    },
    {
      title: 'Audit',
      body: 'You give me read access to the code. I deliver the report and the fixed quote in about 5 business days.',
    },
    {
      title: 'Agreement',
      body: 'A short statement of work with the scope, price, timeline and payment schedule: 50% to start, 50% on delivery.',
    },
    {
      title: 'Port',
      body: 'Usually 2 to 6 weeks, depending on size. You get a development build to try early and progress updates each week.',
    },
    {
      title: 'Release',
      body: 'Staged rollout, release notes, and the customer migration plan.',
    },
    {
      title: 'Support',
      body: 'Two weeks of in-scope fixes after release.',
    },
  ],
  limitNote: 'Ports are scheduled in the order audits finish.',
  faq: [
    {
      id: 'code',
      question: 'Do you need access to our source code?',
      answer:
        'Yes, read access for the audit and write access for the port. I am happy to sign your NDA first.',
    },
    {
      id: 'reinstall',
      question: 'Will our customers have to reinstall?',
      answer:
        'In most cases no. Atlassian supports moving a Connect app to Forge so existing installs upgrade to the Forge version. If the new version needs new permissions, site admins may be asked to approve the update. The audit tells you if that applies to you.',
    },
    {
      id: 'backend',
      question: 'Do we have to give up our backend?',
      answer:
        'No. Forge Remote lets the Forge app call your existing servers, which is usually the fastest path. Moving fully onto Atlassian-hosted compute and storage is optional and takes longer, but it is what the “Runs on Atlassian” badge requires.',
    },
    {
      id: 'diy',
      question: 'What if the audit shows we can do it ourselves?',
      answer: 'Then you have a clear plan and keep the report. The $500 is the full cost.',
    },
    {
      id: 'private',
      question: 'Do you port in-house (private) Connect apps too?',
      answer:
        'Yes. Custom Connect apps that companies built for their own Jira or Confluence sites are covered by the same end of support, and the process is the same without the Marketplace steps.',
    },
    {
      id: 'dc',
      question: 'Do you work on Data Center apps?',
      answer:
        'This service covers Cloud apps moving from Connect to Forge. Data Center apps are not affected by the Connect end of support.',
    },
    {
      id: 'who',
      question: 'Who does the work?',
      answer: 'I do. LeDuc Systems is my studio.',
    },
  ],
  closeTitle: 'Get started',
  closeBody:
    'Email me your app’s Marketplace link and I will tell you whether the audit makes sense for it.',
};

/* =========================================================================
   LeDuc Product Options for Shopify: landing page and how-to guides.
   Facts come from the live App Store listing and the app repo
   (apps/le-duc-product-options: app/lib/plan.ts, templates.ts, engraving.ts,
   extensions/product-options/assets/ldpo.js). No ratings, reviews or install
   counts: the listing has none yet. Price add-ons and file upload are not
   live, so they are not claimed.
   ========================================================================= */
const PO_APP_URL = 'https://apps.shopify.com/leduc-product-options';
const poAppLink = (from) => `${PO_APP_URL}?utm_source=leducsystems&utm_medium=site&utm_campaign=${from}`;

/* A Dawn-style Custom Liquid snippet. Dawn names the product form
   "product-form-" plus the section id. */
const poField = (lines) =>
  ["{%- assign form_id = 'product-form-' | append: section.id -%}", ...lines].join('\n');

export const SHOPIFY_OPTIONS = {
  path: '/shopify/product-options',
  appUrl: poAppLink('landing'),
  seoTitle: 'LeDuc Product Options: Custom Fields for Shopify Product Pages | LeDuc Systems',
  seoDescription:
    'Add engraving text, gift messages and required custom fields to Shopify product pages. Engraving limits with a live preview, one-click templates, no theme code. Free plan, Pro $9.99 a month.',
  eyebrow: 'Shopify app · Free plan · Pro $9.99 a month',
  title: 'Custom fields for Shopify product pages',
  lede:
    'LeDuc Product Options adds engraving text, gift messages, names, dates and choices to your product pages, and every answer lands on the order.',
  ctaLabel: 'Get it on the Shopify App Store',
  facts: [
    { label: 'Free plan', value: '3 option sets, 10 fields each' },
    { label: 'Pro', value: '$9.99 a month, 14-day trial' },
    { label: 'Setup', value: 'About two minutes' },
    { label: 'Theme code', value: 'None' },
    { label: 'Answers', value: 'Cart, checkout and order' },
  ],
  features: [
    {
      title: 'Engraving rules with a live preview',
      body: 'Set the lines, characters per line, allowed characters and UPPERCASE. Shoppers see exactly what will be engraved, with a count on each line. Free.',
    },
    {
      title: 'Required fields on the Free plan',
      body: 'Add to cart waits until the shopper answers. On products with a required field, Buy it now is hidden and quick add buttons send the shopper to the product page.',
    },
    {
      title: 'One-click templates',
      body: 'Engraving text, Gift message, Name + font and Delivery date. A template goes on one product first, so you can preview it before choosing which products get it.',
    },
    {
      title: 'Every common field type',
      body: 'Text, multi-line text, number, date, dropdown, radio buttons, checkbox and checkbox group. Color swatches are on Pro.',
    },
    {
      title: 'Show-when rules (Pro)',
      body: 'Show a field only when another answer matches, like the engraving box only after the shopper ticks "Add engraving".',
    },
    {
      title: 'No theme code edits',
      body: 'Fields come from a theme app embed or block, and the storefront script is about 4 KB. Uninstall and your theme is exactly as it was.',
    },
  ],
  plans: [
    {
      name: 'Free',
      price: '$0',
      unit: 'no time limit',
      points: [
        '3 option sets, up to 10 fields each',
        'All field types except color swatches',
        'Required fields and character limits',
        'Engraving rules with a live preview',
        'Assign by product, collection, tag or all products',
        'Email support from the developer',
      ],
    },
    {
      name: 'Pro',
      price: '$9.99',
      unit: 'a month, 14-day free trial',
      points: ['Everything in Free', 'Unlimited option sets and fields', 'Show-when conditional rules', 'Color swatch fields'],
    },
  ],
  planNote: 'Plans are billed through Shopify in USD. Options cannot change the price yet.',
  steps: [
    { title: 'Install', body: 'Add LeDuc Product Options from the Shopify App Store.' },
    {
      title: 'Switch it on in your theme',
      body: 'On the app’s home page, click Turn on automatic embed and save your theme. Fields appear above Add to cart. For exact placement, use Add block to product page instead.',
    },
    {
      title: 'Pick a template or build a set',
      body: 'Start from a template, or click Create option set and add your own fields. Then choose the products, collections or tags that get it.',
    },
    {
      title: 'Place a test order',
      body: 'Each answer shows under the line item in the cart, at checkout and on the order in your Shopify admin.',
    },
  ],
  faq: [
    {
      id: 'where',
      question: 'Where do I see what the shopper typed?',
      answer:
        'On the order in your Shopify admin, under each line item. Answers are saved as line item properties, so they also show in the cart and at checkout.',
    },
    {
      id: 'theme',
      question: 'Does it work with my theme?',
      answer:
        'It works with Online Store 2.0 themes, including Dawn and the other free Shopify themes. If the fields do not appear on your theme, email me and I will fix it.',
    },
    {
      id: 'price',
      question: 'Can an option add to the price, like $10 for engraving?',
      answer:
        'Not yet. Until it can, the usual way is a variant for it, for example an "Engraving: Yes" variant priced $10 higher.',
    },
    {
      id: 'buynow',
      question: 'What about the Buy it now button?',
      answer:
        'Buy it now skips the cart, so the app hides it on products with a required field. You can hide it on other products too, and if it stays visible the app stops it while an answer is invalid.',
    },
    {
      id: 'uninstall',
      question: 'What happens if I uninstall?',
      answer: 'The fields disappear from your store and no theme code is left behind. Past orders keep their answers.',
    },
    {
      id: 'who',
      question: 'Who supports it?',
      answer: 'I do. I built the app, and support emails come straight to me.',
    },
  ],
  closeTitle: 'Try it on the Free plan',
  closeBody: 'Install it, pick the Engraving text template and check the preview on one product. No card needed.',
};

/* Each guide gives the theme-code route first (free, and honest about its
   gaps), then the app as the no-code route. Sections render in order;
   `code` is shown as a block, `after` as paragraphs below it. */
export const SHOPIFY_OPTIONS_GUIDES = [
  {
    slug: 'engraving',
    path: '/shopify/product-options/how-to-add-engraving-field-shopify',
    appUrl: poAppLink('guide-engraving'),
    seoTitle: 'How to Add an Engraving Field to a Shopify Product | LeDuc Systems',
    seoDescription:
      'Add an engraving text box to a Shopify product page so the text lands on the order: a free theme code method with a character limit, and a no-code app with a live preview.',
    title: 'How to add an engraving field to a Shopify product',
    lede:
      'Shopify products have no engraving box out of the box. Here is how to add one with a few lines of theme code, and how I do it with my app if you would rather not touch code.',
    sections: [
      {
        heading: 'What an engraving field needs',
        paragraphs: [
          'An engraving field is a text input inside the product form whose name starts with properties[. Shopify saves its value as a line item property and carries it to the cart, checkout and the order, so you see the text when you fulfill.',
          'It also needs a limit, so a shopper cannot order more text than fits on the item.',
        ],
      },
      {
        heading: 'Method 1: theme code (free)',
        steps: [
          'In your Shopify admin, go to Online Store, then Themes, and click Customize. Open a product page.',
          'In the Product information section, click Add block and choose Custom Liquid. Drag it above the Buy buttons. Custom Liquid is built into Dawn and most Online Store 2.0 themes, so you do not edit any theme files.',
          'Paste the code below and save. The form attribute ties the input to the product form, so its value goes with Add to cart. maxlength stops typing after 20 characters.',
          'Add the product to your cart. The cart line should show "Engraving:" with the text. Place a test order and check it under the line item.',
        ],
        code: poField([
          '<p class="engraving-field">',
          '  <label for="engraving-{{ section.id }}">Engraving text</label>',
          '  <input id="engraving-{{ section.id }}" type="text" name="properties[Engraving]"',
          '    form="{{ form_id }}" maxlength="20" autocomplete="off">',
          '</p>',
        ]),
        after: [
          'Dawn names the product form "product-form-" plus the section id. If your theme uses another name, find the form that posts to /cart/add on the product page and use its id.',
          'What this does not cover: the field shows on every product that uses the template, maxlength counts the whole field rather than each line, nothing stops emoji or characters your engraver cannot cut, the shopper gets no preview, and the Buy it now button can send them to checkout without the field. Untick "Show dynamic checkout buttons" in the Buy buttons block if you rely on the field.',
        ],
      },
      {
        heading: 'Method 2: LeDuc Product Options (no code)',
        steps: [
          'Install LeDuc Product Options from the Shopify App Store. The Free plan covers 3 option sets.',
          'On the app’s home page, click Turn on automatic embed and save your theme.',
          'Under Start from a template, pick Engraving text. It creates a required field of 2 lines with 20 characters each and a live preview, on one product so you can check it first.',
          'Open the field’s Engraving rules to change the lines (1 to 4), characters per line, allowed characters or UPPERCASE. Then choose which products get it: specific products, collections, tags or all products.',
          'Place a test order. The order shows the engraving text exactly as the preview showed it, with curly quotes straightened and extra spaces trimmed.',
        ],
      },
    ],
    faq: [
      {
        id: 'where',
        question: 'Where does the engraving text show up?',
        answer: 'Under the line item in the cart, at checkout and on the order in your Shopify admin.',
      },
      {
        id: 'price',
        question: 'Can I charge extra for engraving?',
        answer:
          'Line item properties do not change the price. The usual way is a product option such as "Engraving: Yes / No" with a higher price on the Yes variant. My app cannot add a price yet.',
      },
      {
        id: 'code',
        question: 'Does the app change my theme code?',
        answer: 'No. It uses a theme app embed or block, and removing the app leaves your theme as it was.',
      },
    ],
  },
  {
    slug: 'gift-message',
    path: '/shopify/product-options/how-to-add-gift-message-shopify',
    appUrl: poAppLink('guide-gift-message'),
    seoTitle: 'How to Add a Gift Message Box in Shopify | LeDuc Systems',
    seoDescription:
      'Three ways to collect a gift message in Shopify: the built-in cart note, a gift message box on the product page with theme code, or a no-code app with a ready-made template.',
    title: 'How to add a gift message box in Shopify',
    lede:
      'Shopify gives you one free spot for a message, the cart note. For a message on the product page, or one message per item, you need a line item property. Here are all three ways.',
    sections: [
      {
        heading: 'Method 1: the cart note (built in)',
        paragraphs: [
          'Most themes can show a note box in the cart. In Dawn, open Customize, go to Theme settings, then Cart, and tick Enable cart note. Other themes put the setting in the cart page or cart drawer section.',
          'The note appears on the order under Notes. It is one note for the whole order, it sits in the cart where shoppers often miss it, and Dawn labels it "Order special instructions". You can rename that label under Edit default theme content.',
        ],
      },
      {
        heading: 'Method 2: a gift message on the product page (theme code)',
        steps: [
          'In Customize, open a product page and add a Custom Liquid block to the Product information section, above the Buy buttons.',
          'Paste the code below and save. The message is saved with that item as a line item property, so two gifts in one order can carry two messages.',
          'Add the product to your cart with a message and check the cart line.',
        ],
        code: poField([
          '<p class="gift-message">',
          '  <label for="gift-{{ section.id }}">Gift message (optional)</label>',
          '  <textarea id="gift-{{ section.id }}" name="properties[Gift message]"',
          '    form="{{ form_id }}" maxlength="250" rows="3"></textarea>',
          '</p>',
        ]),
        after: [
          'If your theme does not name its product form "product-form-" plus the section id like Dawn does, use the id of the form that posts to /cart/add.',
        ],
      },
      {
        heading: 'Method 3: LeDuc Product Options (no code)',
        steps: [
          'Install LeDuc Product Options from the Shopify App Store and click Turn on automatic embed on the app’s home page.',
          'Under Start from a template, pick Gift message. It adds an optional multi-line message of up to 250 characters, on one product so you can preview it.',
          'Choose which products get it, for example a Gifts collection or a gift tag.',
          'On Pro, add a "This is a gift" checkbox and a show-when rule so the message box only appears once it is ticked.',
        ],
      },
    ],
    faq: [
      {
        id: 'where',
        question: 'Where do I see the gift message?',
        answer:
          'A cart note shows under Notes on the order. A product page message shows under its line item, in the cart, at checkout and on the order.',
      },
      {
        id: 'free',
        question: 'Is the gift message template free?',
        answer: 'Yes. It fits the Free plan, which covers 3 option sets of up to 10 fields each.',
      },
    ],
  },
  {
    slug: 'required',
    path: '/shopify/product-options/how-to-make-custom-field-required-shopify',
    appUrl: poAppLink('guide-required'),
    seoTitle: 'How to Make a Custom Field Required in Shopify | LeDuc Systems',
    seoDescription:
      'Make a Shopify product page field required so Add to cart waits for an answer: the HTML required attribute, the gaps it leaves (Buy it now, quick add), and a free no-code option.',
    title: 'How to make a custom field required in Shopify',
    lede:
      'A required field stops Add to cart until the shopper fills it in, so you never get an engraving order with no text. Here is the theme code way, where it leaks, and how my app closes the gaps.',
    sections: [
      {
        heading: 'Method 1: the required attribute (theme code)',
        steps: [
          'Add your field in a Custom Liquid block on the product page, inside the Product information section.',
          'Add the required attribute to the input, as below. When the shopper clicks Add to cart with the field empty, the browser shows its own "Please fill out this field" message and does not submit.',
          'Test it in your theme. Some themes add to cart with JavaScript in a way that skips the browser’s check, so try an empty field before you rely on it.',
        ],
        code: poField([
          '<label for="name-{{ section.id }}">Name to print</label>',
          '<input id="name-{{ section.id }}" type="text" name="properties[Name]"',
          '  form="{{ form_id }}" maxlength="20" required>',
        ]),
      },
      {
        heading: 'Where the required attribute leaks',
        paragraphs: [
          'The Buy it now button goes straight to checkout and does not wait for your field. Untick "Show dynamic checkout buttons" in the Buy buttons block on products that need an answer.',
          'Quick add buttons on collection and home pages add the product without opening the product page, so the shopper never sees the field. Turn quick add off in the product grid settings, or accept that those orders arrive without an answer.',
        ],
      },
      {
        heading: 'Method 2: LeDuc Product Options (no code, free)',
        steps: [
          'Install LeDuc Product Options from the Shopify App Store and click Turn on automatic embed.',
          'Click Create option set, add a field, and tick Required. Required fields are on the Free plan.',
          'Choose which products get the set. On those products, Add to cart waits for an answer and shows a message next to the field.',
          'The app also hides Buy it now on products with a required field, and quick add buttons on collection pages send the shopper to the product page instead of adding the item without an answer.',
        ],
      },
    ],
    faq: [
      {
        id: 'message',
        question: 'Can I change the "required" message?',
        answer:
          'With the HTML attribute, the message comes from the browser and is hard to change. The app shows its own message next to the field.',
      },
      {
        id: 'some',
        question: 'Can a field be required only sometimes?',
        answer:
          'Yes, on Pro. A field with a show-when rule is only required while it is showing, for example engraving text only after "Add engraving" is ticked.',
      },
    ],
  },
  {
    slug: 'character-limit',
    path: '/shopify/product-options/how-to-limit-characters-shopify-personalization',
    appUrl: poAppLink('guide-character-limit'),
    seoTitle: 'How to Limit Characters in a Shopify Personalization Field | LeDuc Systems',
    seoDescription:
      'Limit characters in a Shopify personalization field: maxlength, allowed characters with pattern, per-line limits and uppercase, by theme code or with a free no-code app.',
    title: 'How to limit characters in a Shopify personalization field',
    lede:
      'A personalization field needs limits that match what you can make: total characters, characters per line, which characters, and sometimes uppercase only. Here is what plain HTML can do and where it stops.',
    sections: [
      {
        heading: 'Method 1: maxlength and pattern (theme code)',
        steps: [
          'Add the field in a Custom Liquid block on the product page, in the Product information section.',
          'maxlength stops typing at a number of characters. pattern lists the characters you accept, and the browser blocks Add to cart if the text has anything else. title is the hint the browser shows.',
          'Test with an emoji and a curly apostrophe from a phone keyboard. This pattern rejects both, which is usually what an engraver wants, so say so next to the field.',
        ],
        code: poField([
          '<label for="text-{{ section.id }}">Personalization (20 characters)</label>',
          '<input id="text-{{ section.id }}" type="text" name="properties[Personalization]"',
          '  form="{{ form_id }}" maxlength="20" pattern="[A-Za-z0-9 .,\'!?]*"',
          '  title="Letters, numbers, spaces and . , \' ! ? only">',
        ]),
      },
      {
        heading: 'Where plain HTML stops',
        paragraphs: [
          'A textarea has maxlength but no pattern, and its maxlength counts the whole box, line breaks included. "2 lines of 15 characters" needs JavaScript.',
          'CSS text-transform: uppercase only changes how the text looks. The order still gets what the shopper typed, in lowercase if that is how they typed it.',
          'Shoppers cannot see how their text will lay out, so a long line that fits the limit can still surprise them.',
        ],
      },
      {
        heading: 'Method 2: LeDuc Product Options (no code, free)',
        steps: [
          'Install LeDuc Product Options from the Shopify App Store and click Turn on automatic embed.',
          'For a simple limit, add a text field and set Maximum characters.',
          'For engraving-style limits, tick Engraving rules on the field. Choose 1 to 4 lines, characters per line, and allowed characters: letters only, letters and numbers, letters, numbers and basic punctuation, or only the characters you list.',
          'Tick Engrave in UPPERCASE if you need it. The order gets the uppercase text, not just an uppercase look.',
          'Shoppers see a live preview of exactly what will be saved, one row per line with a character count, and Add to cart waits until every line fits.',
        ],
      },
    ],
    faq: [
      {
        id: 'free',
        question: 'Are engraving rules on the Free plan?',
        answer: 'Yes. Line limits, allowed characters, UPPERCASE and the live preview are all free.',
      },
      {
        id: 'emoji',
        question: 'How are emoji counted?',
        answer:
          'The browser’s maxlength can count one emoji as two characters. With the app, an allowed characters rule rejects emoji entirely, so the count never surprises anyone.',
      },
    ],
  },
];
