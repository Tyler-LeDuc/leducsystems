/* =========================================================================
   Le Duc Systems — shared content
   Single source of truth for the words on this site. Pages import from here
   instead of duplicating strings.

   Two rules govern this file:
   1. Nothing here may claim a client, testimonial, outcome metric, or award
      that does not exist.
   2. Nothing here may describe fleet management, logistics, dispatch, or
      multi-agent AI orchestration as a service line. See CLAUDE.md.

   Copy is deliberately tight. If a sentence can be cut without losing the
   point, cut it.
   ========================================================================= */

export const SITE = {
  name: 'Le Duc Systems',
  founder: 'Tyler LeDuc',
  email: 'tyler@leducsystems.com',
  url: 'https://leducsystems.com',
  github: 'https://github.com/tyler-leduc',
  linkedin: 'https://www.linkedin.com/in/tyler-l-60a9451a3/',
  city: 'Phoenix',
  region: 'Arizona',
  regionShort: 'AZ',
  founded: 2026,
  tagline: 'Custom software, shipped in weeks.',
  description:
    'Web and mobile applications, internal tools, and the migrations that get your data out of spreadsheets and legacy systems intact. Senior engineering, working software every week.',
};

export const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Free tools', path: '/tools' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

/* The free tools, in the order they are offered. Each one has to be useful
   on its own without a conversation, and none of them may upload anything —
   that is the whole proposition. Order is by how sharp the hook is, not by
   how much work each took. */
export const TOOLS = [
  {
    path: '/tools/workbook',
    name: 'Workbook x-ray',
    headline: 'What is running inside one workbook',
    summary:
      'Macros and what they reach, database connections, Power Query sources, links to someone else’s drive, sheets that cannot be unhidden from the menu.',
    input: 'One .xlsx or .xlsm',
  },
  {
    path: '/tools/folder',
    name: 'Spreadsheet map',
    headline: 'Which file the whole team depends on',
    summary:
      'Reads a folder and draws what links to what: the workbook a dozen reports pull from, links pointing at a machine that is not there, and the same model saved eleven times.',
    input: 'A folder of workbooks',
  },
  {
    path: '/tools/access',
    name: 'Access exit report',
    headline: 'What moving off Access would actually involve',
    summary:
      'Reads the catalogue of an .mdb or .accdb — never the records — and separates the tables, which convert, from the forms, reports and macros, which do not.',
    input: 'One .mdb or .accdb',
  },
  {
    path: '/tools/schema',
    name: 'Spreadsheet to schema',
    headline: 'The database a spreadsheet should have been',
    summary:
      'Paste a block of cells and get the Postgres table it should become, plus the data problems that would break the import.',
    input: 'Pasted cells',
  },
  {
    path: '/tools/outreach',
    name: 'Outreach pipeline',
    headline: 'Who to email today, and what to send them',
    summary:
      'Tracks a multi-touch cold sequence: who is due, which email they get next, and the draft with everything the row knows already filled in.',
    input: 'A CSV, or nothing',
  },
];

export const LEGAL_NAV = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

/* Three service lines. AI is third on purpose: it is one thing among several
   that gets built, never the pitch itself. */
export const PILLARS = [
  {
    id: '01',
    title: 'Ship the application',
    summary:
      'Web and mobile products, internal tools, and the integrations between systems that were never designed to talk to each other.',
    deliverables: [
      'Full-stack web applications',
      'Native iOS and Android apps',
      'Internal tools and admin systems',
      'Dashboards and reporting',
      'Roles, permissions, and audit trails',
    ],
  },
  {
    id: '02',
    title: 'Rescue the data',
    summary:
      'Migrations are where these projects actually break. Not the new system, the fifteen years of records behind it.',
    deliverables: [
      'Migrations off spreadsheets, Access, and legacy databases',
      'Schema design, cleanup, and reconciliation',
      'Integrations with the systems you already run',
      'REST and GraphQL APIs',
      'Reporting that replaces manual exports',
    ],
  },
  {
    id: '03',
    title: 'AI that earns its place',
    summary:
      'Language models wired into your real data and real workflows, plus a straight answer when a database query would do the job better.',
    deliverables: [
      'Assistants and copilots scoped to your domain',
      'Retrieval over your own documents',
      'Document extraction and classification',
      'Evaluation harnesses and regression testing',
      'Guardrails, fallbacks, and human review',
    ],
  },
];

export const DIFFERENTIATORS = [
  {
    title: 'You talk to the engineer',
    body:
      'The person on your first call is the person writing the code, and the person who answers when something breaks.',
  },
  {
    title: 'Start small',
    body:
      'The first engagement is short and fixed in scope, so you can judge the work before committing to a build.',
  },
  {
    title: 'You own everything',
    body:
      'Your repository, your cloud accounts, no proprietary runtime and no license to renew.',
  },
  {
    title: 'Working software, weekly',
    body:
      'You see running code on a real environment every week. Progress is something you click, not something you read about.',
  },
];

/* Sits where a testimonial wall would normally go. Leads with what is
   committed rather than with what is missing. */
export const APPROACH = {
  eyebrow: 'How the work runs',
  title: 'Judge the work, not the deck.',
  body: [
    'Every engagement opens with a short, fixed-price sprint that ends in a technical plan you own outright, useful whether or not you continue.',
    'From there you see running code on a real environment every week, in your repository, through to handover.',
    'And when the honest answer is that you should not build something, you hear it on the call rather than after the invoice.',
  ],
};

/* The Discovery Sprint price is public on purpose: a number lets a buyer
   bound their risk before booking a call. */
export const ENGAGEMENTS = [
  {
    id: '01',
    name: 'Discovery Sprint',
    duration: 'About 1 week',
    price: '$3,500 fixed',
    shape: 'Fixed scope',
    summary: 'Find out whether the idea is real before anyone commits to building it.',
    includes: [
      'A look at your actual data and what it takes to move it',
      'A technical plan you can hand to any engineer',
      'An architecture decision with the reasoning written down',
      'A scoped estimate for the build',
    ],
    outcome:
      'Ends in a clear recommendation, including a recommendation not to build when that is the answer.',
  },
  {
    id: '02',
    name: 'Build',
    duration: 'Typically 4–12 weeks',
    price: 'From $12,000, quoted after Discovery',
    shape: 'Fixed scope, phased',
    summary: 'Design and ship the thing.',
    includes: [
      'Scope agreed up front and broken into phases',
      'A demo on a real environment every week',
      'Deployed to your infrastructure, in your accounts',
      'Handover with documentation and a runbook',
    ],
    outcome: 'You end with software in production and everything needed to keep running it.',
  },
  {
    id: '03',
    name: 'Ongoing',
    duration: 'Monthly',
    price: 'From $4,000 / month',
    shape: 'Month to month',
    summary: 'For teams that have shipped and need to keep moving.',
    includes: [
      'Iteration and new features',
      'Tuning and evaluation of AI features already live',
      'Maintenance and dependency upkeep',
      'An engineer on call for architecture questions',
    ],
    outcome: 'Month to month. Cancel whenever.',
  },
];

export const PRICING_NOTE =
  'Discovery is a fixed price so you can tell whether we are in your range without booking a call. Build work is quoted after Discovery, when the scope is actually known.';

export const PROCESS = [
  {
    step: '01',
    title: 'Call',
    body:
      'Thirty minutes, no charge. What you are building, what is in the way, and whether this is the right fit.',
  },
  {
    step: '02',
    title: 'Scope',
    body:
      'A written proposal: what gets built, what explicitly does not, the timeline, and the price. Nothing starts until it is agreed.',
  },
  {
    step: '03',
    title: 'Build',
    body:
      'Weekly demos on a real environment, with repository access the whole time. Scope changes get re-quoted before the work, not after.',
  },
  {
    step: '04',
    title: 'Hand over',
    body:
      'Your repository, your infrastructure, your accounts, plus documentation and a walkthrough. Ongoing support only if you want it.',
  },
];

/* Ordered by depth of production experience, not by what sounds current. */
export const TECH = [
  {
    group: 'Backend',
    items: [
      'Java & Spring Boot',
      'Node & TypeScript',
      'Python',
      'REST & GraphQL APIs',
      'Background jobs & schedulers',
    ],
  },
  {
    group: 'Mobile',
    items: ['iOS (Swift)', 'Android (Kotlin)', 'App Store & Play releases'],
  },
  {
    group: 'Data',
    items: [
      'PostgreSQL',
      'Schema design & migrations',
      'Redis',
      'ETL and integrations',
      'pgvector',
    ],
  },
  {
    group: 'Web',
    items: ['React', 'Next.js', 'TypeScript', 'Accessible, responsive UI'],
  },
  {
    group: 'Infrastructure',
    items: [
      'Docker',
      'AWS',
      'Linux',
      'CI/CD with GitHub Actions',
      'Infrastructure as code',
      'Monitoring, logging, tracing',
    ],
  },
  {
    group: 'AI',
    items: [
      'Claude & OpenAI APIs',
      'RAG and retrieval pipelines',
      'Structured output & tool use',
      'Evaluation harnesses',
    ],
  },
];

export const FAQ = [
  {
    id: 'ownership',
    question: 'Who owns the code?',
    answer:
      'You do. It lives in your repository, on your infrastructure, under a normal work-for-hire agreement. No proprietary runtime, nothing that stops working if we part ways.',
  },
  {
    id: 'ai-code',
    question: 'Do you use AI to write my code?',
    answer:
      'Yes, deliberately, and it is part of why the work moves at this speed. Every line is reviewed, tested, and understood before it ships. If that conflicts with your compliance posture, raise it on the first call.',
  },
  {
    id: 'exit',
    question: 'What if we start and it is not working out?',
    answer:
      'Engagements are phased for exactly this reason. There is a natural exit at the end of every phase, and you keep everything produced up to that point.',
  },
  {
    id: 'need-ai',
    question: 'Do I actually need AI for this?',
    answer:
      'Often, no. A lot of what gets pitched as an AI problem is a data problem or a missing feature. You will hear that during the call rather than after the invoice.',
  },
  {
    id: 'start',
    question: 'How fast can you start?',
    answer:
      'It depends on what is already in flight. Ask, and you get a real date rather than a vague "soon".',
  },
  {
    id: 'location',
    question: 'Where are you based?',
    answer: 'Phoenix, Arizona. Remote-first, and comfortable working across US time zones.',
  },
];

export const RESPONSE_PROMISE = 'Every message gets a reply within one business day.';

/* =========================================================================
   Agency subcontracting — /agencies

   A second audience with a different buying question. Agencies do not need
   convincing that custom software is worth building; they need to know the
   rate, the stack, and whether the work stays under their brand. Copy here
   is blunter and shorter than the rest of the site on purpose.

   This page is deliberately absent from the main nav. It is linked from the
   footer and sent directly in outreach.
   ========================================================================= */

export const AGENCY = {
  eyebrow: 'For agencies',
  title: 'Development capacity, under your brand.',
  lede:
    'You win the work and stay client-facing. We build it. Backend, native mobile, and the migrations nobody on your team wants to take.',
  rate: '$95/hr',
  rateNote: 'Or fixed-bid against a defined scope, whichever is easier on your margin.',
};

export const AGENCY_TERMS = [
  {
    title: 'Your brand, start to finish',
    body:
      'Work ships under your name. White-label by default, and happy to stay invisible to the end client entirely.',
  },
  {
    title: 'Your process, not ours',
    body:
      'Your repo, your board, your standups, your definition of done. No parallel process to manage.',
  },
  {
    title: 'You keep the relationship',
    body:
      'No approaching your clients, during or after. Non-solicit in writing if you want it, and NDAs signed same day.',
  },
  {
    title: 'US-based, your timezone',
    body:
      'Phoenix, Arizona. Overlapping hours across every US zone, and no handoff lag waiting on a reply overnight.',
  },
];

/* The work most often handed to a subcontractor, ordered by how hard it is
   for a small agency to staff internally. */
export const AGENCY_WORK = [
  {
    title: 'Backend and APIs',
    body:
      'Java and Spring Boot, Node and TypeScript, Python. The service behind someone else’s front end, built to a spec or from a wireframe.',
  },
  {
    title: 'Native mobile',
    body:
      'iOS in Swift, Android in Kotlin, through App Store and Play release. The usual reason a web shop has to refer a project out.',
  },
  {
    title: 'Legacy migrations',
    body:
      'Off Access, spreadsheets, and legacy databases. Schema design, cleanup, reconciliation, and the integrations between systems that never talked.',
  },
  {
    title: 'Full-stack overflow',
    body:
      'React and TypeScript front to back when a build slips or a client moves a date up.',
  },
];

/* Named plainly so nobody wastes a call. The domain exclusions are a
   standing commercial constraint — see CLAUDE.md. Do not explain them here;
   "not a fit" is a complete answer to an agency. */
export const AGENCY_NOT_A_FIT = [
  'Fleet, logistics, freight, and dispatch systems',
  'Multi-agent AI orchestration frameworks',
  'Staff augmentation through a third-party recruiter or marketplace',
  'Anything requiring on-site presence outside Phoenix',
];
