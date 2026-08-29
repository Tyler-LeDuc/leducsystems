/* =========================================================================
   Le Duc Systems — shared content
   Single source of truth for the words on this site. Pages import from here
   instead of duplicating strings. Nothing in this file may claim a past
   client, an outcome metric, a testimonial, a team, or an award.
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
  tagline: 'Your operation outgrew the spreadsheet. I build what replaces it.',
  description:
    'Le Duc Systems builds the internal software operations teams actually run on — dispatch and scheduling, inventory and asset tracking, reporting, and the aging Access database nobody wants to touch. One engineer, working with you directly, from the first call to the last deploy.',
};

export const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Free tool', path: '/tools/schema' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const LEGAL_NAV = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

/* Ordered by what the buyer came here for. AI is the third pillar, not the
   first two — it is how the work gets done and one thing among several that
   gets built, never the pitch itself. */
export const PILLARS = [
  {
    id: '01',
    title: 'Replace what you outgrew',
    summary:
      'The spreadsheet, the shared Access file, the tool someone built in 2014 and then left. It still works, mostly, and it is now the reason three people spend their mornings copying data between things.',
    deliverables: [
      'Internal tools and admin systems',
      'Scheduling, dispatch, and inventory',
      'Operational dashboards and reporting',
      'Full-stack web applications',
      'Roles, permissions, and audit trails',
    ],
  },
  {
    id: '02',
    title: 'Get the data out intact',
    summary:
      'Migrations are where these projects actually go wrong. Not the new system — the fifteen years of records with inconsistent dates, duplicate customers, and a notes field holding three different kinds of information.',
    deliverables: [
      'Migrations off Access, spreadsheets, and legacy databases',
      'Schema design, cleanup, and reconciliation',
      'Integrations with the systems you already run',
      'APIs and service integrations',
      'Reporting that replaces manual exports',
    ],
  },
  {
    id: '03',
    title: 'AI where it earns its place',
    summary:
      'Language-model features wired into your real data and your real workflows, plus the unglamorous engineering that keeps them working. I will tell you when the honest answer is a database query and a form rather than a model.',
    deliverables: [
      'Assistants and copilots scoped to your domain',
      'Retrieval over your own documents',
      'Document extraction and classification',
      'Evaluation harnesses and regression testing',
      'Guardrails, fallbacks, and human review paths',
    ],
  },
];

/* Honest differentiators — used everywhere a testimonial would normally go. */
export const DIFFERENTIATORS = [
  {
    title: 'You talk to the person building it',
    body:
      'No account manager, no handoff to a delivery team, no offshore contractors you never meet. The person on the first call is the person writing the code and the person who answers when something breaks.',
  },
  {
    title: 'Small first, always',
    body:
      'The first engagement is deliberately short and fixed in scope, so you can find out what working together is actually like before committing to anything large. If it goes badly, it goes badly cheaply.',
  },
  {
    title: 'You own everything',
    body:
      'Code in your repository, infrastructure in your cloud accounts, no proprietary runtime and no license to renew. If you decide to stop working with me, nothing stops working.',
  },
  {
    title: 'AI where it helps, and nowhere else',
    body:
      'I will tell you when the honest answer is a database query and a form rather than a model. That advice is free, and it comes up more often than the industry likes to admit.',
  },
  {
    title: 'Working software over decks',
    body:
      'You see running code on a real environment every week. Progress is something you click on, not something you read about in a status report.',
  },
];

/* The "we are new, and here is what that actually means" section. */
export const HONESTY = {
  eyebrow: 'Straight answer',
  title: 'No case studies yet.',
  body: [
    `Le Duc Systems started in ${SITE.founded} and I am taking on my first client engagements now. There is no wall of logos on this page because there is no wall of logos yet — and I would rather show you nothing than show you something invented.`,
    'What you can judge me on instead: how the work is structured, what the first engagement commits you to, and a real conversation about your problem.',
    'Early clients get the version of this that most consultancies stop offering once they scale — my full attention, a small first engagement, and a direct line.',
  ],
};

/* Engagement models. The Discovery Sprint price is public on purpose: a
   number bounds the risk for a buyer who has no track record to go on. */
export const ENGAGEMENTS = [
  {
    id: '01',
    name: 'Discovery Sprint',
    duration: 'About 1 week',
    price: '$3,500 fixed',
    shape: 'Fixed scope',
    summary:
      'The cheapest way to find out whether the idea is real before anyone commits to building it.',
    includes: [
      'A look at your actual data, and what it will take to move it',
      'A technical plan you can hand to any engineer',
      'An architecture and stack decision with the reasoning written down',
      'A scoped estimate for the build',
      'Where it settles a question faster than a document, a working prototype of the risky part',
    ],
    outcome:
      'Ends with a clear recommendation — including "do not build this" if that is the answer.',
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
      'A demo on a real environment at the end of each week',
      'Deployed to your infrastructure, in your accounts',
      'Handover with documentation, a runbook, and a walkthrough for whoever maintains it next',
    ],
    outcome:
      'You end with software in production and everything needed to keep running it without me.',
  },
  {
    id: '03',
    name: 'Ongoing',
    duration: 'Monthly',
    price: 'From $4,000 / month',
    shape: 'Month to month',
    summary:
      'For teams that have shipped and now need to keep moving.',
    includes: [
      'Iteration and new features',
      'Evaluation and tuning of AI features already live',
      'Maintenance and dependency upkeep',
      'An engineer on call for architecture questions',
    ],
    outcome: 'Month to month. Cancel whenever.',
  },
];

export const PRICING_NOTE =
  'The Discovery Sprint is a fixed price because you should be able to tell whether I am in your range without booking a call. Build work is quoted after Discovery, when the scope is actually known — a number before that would be a guess, and you would be the one absorbing it if the guess was wrong.';

export const PROCESS = [
  {
    step: '01',
    title: 'Call',
    body:
      'Thirty minutes, no charge. What you are trying to do, what is in the way, and whether I am the right person for it. Sometimes the answer is no, and I will say so.',
  },
  {
    step: '02',
    title: 'Scope',
    body:
      'A written proposal: what gets built, what explicitly does not, the timeline, the price, and what I need from you. Nothing starts until it is agreed.',
  },
  {
    step: '03',
    title: 'Build',
    body:
      'Weekly demos on a real environment. You can see the repository the whole time. Changes in scope get re-quoted before the work happens, not after.',
  },
  {
    step: '04',
    title: 'Hand over',
    body:
      'Your repository, your infrastructure, your accounts. Documentation and a walkthrough for whoever owns it next. Ongoing support only if you want it.',
  },
];

/* Ordered by depth of production experience, not by what sounds current.
   Java and Spring Boot lead because that is where the most shipped systems
   are, and burying them to look like a frontend shop would be a lie of
   emphasis. */
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
    id: 'new',
    question: 'You are brand new — why should I take that risk?',
    answer:
      'Because the risk is small and bounded by design. You start with a one-week Discovery Sprint, you own everything from day one, and you walk away with a usable technical plan whether or not you continue. Compare that to a large agency engagement signed off a slide deck.',
  },
  {
    id: 'ai-code',
    question: 'Do you use AI to write my code?',
    answer:
      'Yes, deliberately, and it is part of why a one-person shop can move at this speed. Every line is reviewed, tested, and understood before it ships — I am accountable for the output exactly as I would be if I had typed every character. If that is a dealbreaker for your compliance posture, say so on the first call and we will talk about what your constraints allow.',
  },
  {
    id: 'ownership',
    question: 'Who owns the code?',
    answer:
      'You do. It lives in your repository, on your infrastructure, in your cloud accounts, under a normal work-for-hire agreement. No proprietary runtime, no license to renew, nothing that stops working if we part ways.',
  },
  {
    id: 'exit',
    question: 'What if we start and it is not working out?',
    answer:
      'Engagements are phased for exactly this reason. There is a natural exit at the end of every phase and you keep everything produced up to that point. Retainers are month to month.',
  },
  {
    id: 'need-ai',
    question: 'Do I actually need AI for this?',
    answer:
      'Often, no. A lot of what gets pitched as an AI problem is a data problem, a workflow problem, or a missing feature. I will tell you that during the call rather than after the invoice.',
  },
  {
    id: 'start',
    question: 'How fast can you start?',
    answer:
      'It depends on what is already in flight. Ask, and you will get a real date rather than "soon".',
  },
  {
    id: 'location',
    question: 'Where are you based, and do you work remotely?',
    answer:
      'Based in Phoenix, Arizona. Remote-first, and comfortable working across US time zones.',
  },
];

export const RESPONSE_PROMISE = 'Every message gets a reply within one business day.';
