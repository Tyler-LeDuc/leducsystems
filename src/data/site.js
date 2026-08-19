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
  founded: 2024,
  tagline: 'Software that ships. Built with AI, and built to use it.',
  description:
    'Le Duc Systems is a one-person software consultancy. I design, build, and ship production software — and I build the AI features inside it. You work with me directly, from the first call to the last deploy.',
};

export const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const LEGAL_NAV = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

/* The three-part offer: we use AI, we develop it, and we develop with it. */
export const PILLARS = [
  {
    id: '01',
    title: 'Build with AI',
    summary:
      'The practice runs on modern AI tooling, which is why a one-person shop can ship at a pace that used to require a team. The work itself is ordinary, careful software engineering — the tooling just removes the parts that were never the hard part.',
    deliverables: [
      'Full-stack web applications',
      'Internal tools and admin systems',
      'Operational dashboards and reporting',
      'APIs and service integrations',
      'Migrations off legacy systems',
    ],
  },
  {
    id: '02',
    title: 'Build AI in',
    summary:
      'Language-model features inside your product that do real work, wired into your actual data and your actual workflows rather than bolted on as a chat box in the corner.',
    deliverables: [
      'Assistants and copilots scoped to your domain',
      'Retrieval and RAG over your own documents',
      'Document extraction and classification',
      'Summarization pipelines',
      'Agents that complete multi-step tasks',
      'Natural-language search over structured data',
    ],
  },
  {
    id: '03',
    title: 'Build it to last',
    summary:
      'The unglamorous engineering that decides whether an AI feature survives contact with real users. A demo takes an afternoon. Something you can put in front of customers takes this.',
    deliverables: [
      'Evaluation harnesses for model output',
      'Prompt and output regression testing',
      'Guardrails and graceful fallbacks',
      'Token cost and latency control',
      'Observability and request tracing',
      'Human-in-the-loop review paths',
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

/* Engagement models. No prices, ever. */
export const ENGAGEMENTS = [
  {
    id: '01',
    name: 'Discovery Sprint',
    duration: 'About 1 week',
    shape: 'Fixed scope',
    summary:
      'The cheapest way to find out whether the idea is real before anyone commits to building it.',
    includes: [
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
  'Pricing depends on scope, and I would rather quote something real than post a number I would have to walk back. Tell me what you are trying to do and you will get a written estimate.';

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

export const TECH = [
  {
    group: 'Product & web',
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'Node',
      'Python',
      'REST & GraphQL APIs',
    ],
  },
  {
    group: 'Data',
    items: [
      'PostgreSQL',
      'Redis',
      'Vector stores (pgvector, Pinecone)',
      'ETL',
      'Data modeling',
    ],
  },
  {
    group: 'AI',
    items: [
      'Claude API',
      'OpenAI API',
      'Structured output & tool use',
      'RAG and retrieval pipelines',
      'Embeddings',
      'Evaluation harnesses',
      'Prompt versioning',
      'Agent frameworks',
    ],
  },
  {
    group: 'Delivery',
    items: [
      'AWS',
      'Vercel',
      'Docker',
      'GitHub Actions',
      'Infrastructure as code',
      'Monitoring and tracing',
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
      'Remote-first and US-based, comfortable working across US time zones.',
  },
];

export const RESPONSE_PROMISE = 'Every message gets a reply within one business day.';
