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
    'LeDuc Systems is Tyler LeDuc’s software company. I build and sell focused software: Scan Relay keeps office copiers scanning to email on Microsoft 365, a virtual makeup try-on for beauty stores, converters for retired file formats, and browser games.',
};

export const NAV = [
  /* Static pages from the leduc-tools repo, outside the router: render as a
     plain <a>, never <Link>, or the router serves its 404 page. */
  { label: 'Products', href: '/tools/', static: true },
  { label: 'Games', path: '/games' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

/* The home page's opening statement. */
export const HOME = {
  eyebrow: 'LeDuc Systems LLC · Phoenix, Arizona',
  title: 'Small software that does one job properly.',
  lede:
    'I build and sell focused software for problems with a deadline or a cost attached: copiers that stop scanning when Microsoft 365 drops basic auth, beauty stores whose shoppers can’t try a shade online, files stranded when Publisher was retired. I also make browser games.',
};

/* The three products I'm actively selling, shown large on the home page.
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
    slug: 'tryon',
    visual: 'tryon',
    name: 'Virtual try-on',
    category: 'Retail · In-browser AR',
    line: 'Lets beauty-store shoppers see your exact shade on their own face, live, on the product page.',
    body: [
      'One script tag on a Shopify or WooCommerce product page. The shopper taps “Try it on”, the camera opens, and your lipstick, blush or shadow shade sits on her own face in her own light.',
      'It runs on my own WebGL engine, entirely in the shopper’s browser. Nothing is uploaded.',
    ],
    facts: [
      ['Starter', '$49 a month, up to 25 shades'],
      ['Growth', '$149 a month, unlimited shades'],
      ['Works with', 'Shopify and WooCommerce'],
      ['Privacy', 'The camera image never leaves the device'],
    ],
    primary: { label: 'Try the live demo', href: '/tools/tryon/demo/' },
    secondary: { label: 'Try-on for stores', href: '/tools/tryon/' },
  },
  {
    slug: 'publisher-converter',
    visual: 'convert',
    name: 'Publisher converter',
    category: 'Documents · Browser',
    line: 'Turns Microsoft Publisher .pub files into editable PowerPoint, Word and InDesign files.',
    body: [
      'Microsoft retired Publisher, and nothing else opens a .pub file. Upload one and you see a free preview of every page; pay and you get the same document as PowerPoint, Word and InDesign (IDML) files, with text, pictures and layout still editable.',
      'Files are used only to make your download and are deleted automatically.',
    ],
    facts: [
      ['Price', '$12 per file, or $29 for 30 days of files'],
      ['Preview', 'Free, every page, before you pay'],
      ['Refund', '30 days, if a result doesn’t work for you'],
    ],
    primary: { label: 'Convert a .pub file', href: '/tools/publisher-converter/' },
    secondary: { label: 'Bulk converter', href: '/tools/bulk-publisher-converter/' },
  },
];

/* Everything else that is live, shown as a ruled register. */
export const MORE_PRODUCTS = [
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
];

/* How I build and sell. Every line is checkable on the product pages; do
   not add claims they do not back up. */
export const PRINCIPLES = {
  eyebrow: 'How I sell software',
  title: 'You can check every product before you pay for it.',
  items: [
    {
      title: 'Try it first',
      body: 'Scan Relay has a 14-day trial, the try-on has a live demo, and the converters show a free preview of your own file.',
    },
    {
      title: 'Your data stays yours',
      body: 'The try-on and the 1099 tools run in your browser. Scan Relay sends from your network straight to Microsoft 365. Uploaded files are deleted after conversion.',
    },
    {
      title: 'Refunds without a fight',
      body: 'If Scan Relay or a conversion doesn’t work for you, email me within 30 days for a full refund.',
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
      'My software company, LeDuc Systems LLC. I’m Tyler LeDuc, a developer in Phoenix, and I build and sell focused software: Scan Relay, a virtual makeup try-on, file converters and 1099 tools, plus browser games.',
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
      'Each product page shows its price before you start, and you can try every product before paying. Scan Relay and the converters have a 30-day refund if they don’t work for you.',
  },
  {
    id: 'files',
    question: 'What happens to my files and data?',
    answer:
      'The try-on, the Rhino converter and the 1099 tools run in your browser, so nothing leaves your device. Scan Relay sends straight from your office to Microsoft 365. The Publisher and PageMaker converters use your file only to make the download, then delete it.',
  },
  {
    id: 'games',
    question: 'Why are there games on a software company’s site?',
    answer:
      'I make small browser games on the side. They’re free on itch.io, and they’re where I try out ideas quickly.',
  },
];

export const RESPONSE_PROMISE = 'I reply to every message within one business day.';
