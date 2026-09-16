import { legalEn, legalMetaEn } from './legal-en.mjs';

export default {
  lang: 'en',
  htmlLang: 'en',
  locale: 'en_US',
  dir: 'ltr',

  meta: {
    home: {
      title: 'AiAnchor — AI consulting, voice agents & automations',
      description: 'AI consulting that starts with your numbers, then voice agents, chatbots, lead qualification and onboarding automations we run for you — all proven live in AiAnchor’s Command Hub.',
    },
    ...legalMetaEn,
    comingSoon: {
      title: 'Coming Soon | AiAnchor',
      description: 'Self-serve signup is almost ready. Until then, book a free demo and we will set everything up for you.',
    },
    bookDemo: {
      title: 'Book a free workflow review | AiAnchor',
      description: 'Tell us where your process feels slow, manual or disconnected. We will review the workflow, show you where it can improve, and explain what AiAnchor would implement.',
    },
  },

  comingSoon: {
    heading: 'Coming soon',
    body: 'Self-serve signup isn’t live yet. We’re still finishing AiAnchor’s Command Hub, the platform you log into. Until then, book a free demo and we’ll set your agents and automations up for you.',
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'Back to plans',
  },

  // Standalone /en/book-demo/ page. Every "book a demo" CTA on the site points here;
  // the form posts to /api/book-demo, which sends the Resend confirmation.
  bookDemo: {
    heading: 'Let’s look at how your business actually works.',
    subhead:
      'Tell us where the process feels slow, manual or disconnected. We’ll review the workflow, show you where it can be improved, and explain what we would implement.',
    bullets: [
      {
        icon: 'workflow',
        title: 'Your current workflow',
        desc: 'We look at how the work moves through your team today.',
      },
      {
        icon: 'clock',
        title: 'What is slowing things down',
        desc: 'Manual steps, repeated work, poor handoffs, missed follow-ups or disconnected tools.',
      },
      {
        icon: 'chart',
        title: 'What should change',
        desc: 'We show you where automation, software or AI could make sense.',
      },
      {
        icon: 'phone',
        title: 'How AiAnchor would fit',
        desc: 'We explain what we would build, manage and track through the AiAnchor Operations Platform.',
      },
    ],
    nextSteps: [
      { title: 'We review your setup', desc: 'We look at the information you send before the call.' },
      { title: 'We map the problem', desc: 'We identify where the workflow is breaking down or creating unnecessary work.' },
      { title: 'We show you the options', desc: 'We explain what could be improved and what we would actually implement.' },
    ],
    noPressureNote: 'No pressure to move forward. If we do not think there is a useful project there, we will tell you.',
    backLink: 'Back to the site',
    form: {
      heading: 'Tell us about the workflow',
      subheading: 'A bit of context helps us make the call useful from the start.',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Work email',
      phone: 'Phone',
      phoneOptional: 'optional',
      company: 'Company',
      companyOptional: 'optional',
      website: 'Website',
      websiteOptional: 'optional',
      websitePlaceholder: 'yourcompany.gr',
      websiteHint: 'Helps us understand your workflow before the call.',
      interest: 'What would you like to improve?',
      interestOptions: [
        'Lead handling',
        'Follow-up',
        'CRM / integrations',
        'Internal workflow',
        'Client onboarding',
        'Reporting / visibility',
        'AI agents',
        'Custom internal tool',
        'Not sure yet',
      ],
      message: 'What feels inefficient right now?',
      messagePlaceholder:
        'e.g. leads are followed up manually, information is spread across different tools, onboarding takes too many steps, or the team lacks visibility.',
      privacyNote: 'We use these details only to arrange your workflow review.',
      privacyLink: 'Privacy Policy',
      submit: 'Book a Free Workflow Review',
      submitting: 'Sending...',
      successTitle: 'Request received!',
      successBody:
        'Our team has received your workflow review request. A confirmation is on its way to your inbox and we’ll contact you shortly to fix a time.',
      sendAnother: 'Send another request',
      errorMessage: 'Something went wrong. Please try again, or email us at info@aianchor.online.',
      endpoint: '/api/book-demo/',
    },
  },

  skipLink: 'Skip to content',

  nav: {
    services: 'Services',
    // Labels the #consulting section (audit -> roadmap -> deploy) as "Process" in the nav.
    consulting: 'Process',
    voiceAgent: 'Voice & Automations',
    commandHub: 'Command Hub',
    pricing: 'Pricing',
    faq: 'FAQ',
    about: 'About',
    clientLogin: 'Client Login',
    cta: 'Book a discovery call',
    // Accessible label for the compact lang-switch pill (visible text is just "GR"/"EN"):
    langSwitchLabel: 'Ελληνικά',
  },

  hero: {
    headlineLine1: 'Anchor every lead.',
    headlineLine2: '',
    headlineLine3: 'Prove what it’s worth.',
    subhead: 'AI consulting that finds where AI actually pays in your business — then the voice agents, chatbots, lead qualification and onboarding automations we run for you, with every result proven live in AiAnchor’s Command Hub.',
    ctaPrimary: 'Book a free demo',
    ctaPrimaryHref: '/en/book-demo/',
    ctaSecondary: 'See pricing',
    ctaSecondaryHref: '#pricing',
    visualAlt: 'AiAnchor’s Command Hub, the live dashboard clients log into, showing call volume, revenue pipeline value and hours saved',
  },

  services: {
    heading: 'Find the gaps. We run the fix.',
    subhead: 'Missed calls, unanswered chats, qualification and onboarding done by hand, numbers scattered across five tools. We advise on what to fix first, then run it for you — and you watch it happen in AiAnchor’s Command Hub.',
    items: [
      {
        problemTag: 'Business Gap 01',
        problemTitle: 'Missed Leads',
        problem: 'Calls, chats, messages and web forms get lost when your team is busy, offline, or switching between tools.',
        impact: 'IMPACT: Lost revenue and slower response times',
        solutionTitle: 'Voice Agents & Chatbots',
        solution: 'A voice agent answers every call, 24/7, in multiple languages (with Greek and English as the primary setup), while chatbots handle your website and WhatsApp. They ask your qualifying questions, book the appointment and get the lead to the right person before it goes cold.',
        result: 'Every call and chat answered, qualified and visible in the Command Hub the moment it lands.',
        icon: 'phone',
        solutionIcon: 'workflow',
      },
      {
        problemTag: 'Business Gap 02',
        problemTitle: 'Too Much Manual Work',
        problem: 'Qualifying leads, chasing follow-ups, onboarding new clients and updating records eats your team’s day, one copy-paste at a time.',
        impact: 'IMPACT: Less time for sales, service, and growth',
        solutionTitle: 'Qualification & Onboarding Automations',
        solution: 'Lead qualification scores and routes every enquiry. Client onboarding collects details, sends the paperwork and books the kickoff on its own. Missed-call text-backs, follow-up sequences and reminders run across your CRM and calendar.',
        result: 'Less manual work, fewer dropped balls, and every action logged in the Command Hub.',
        icon: 'activity',
        solutionIcon: 'shield',
      },
      {
        problemTag: 'Business Gap 03',
        problemTitle: 'No Idea What AI Is Worth',
        problem: 'You keep hearing what AI could do, but nobody shows you where it pays in your business or what it actually returned.',
        impact: 'IMPACT: Guesswork instead of decisions',
        solutionTitle: 'Consulting + AiAnchor’s Command Hub',
        solution: 'We audit your lead flow, price every gap and hand you a ranked roadmap. Then every call answered, lead qualified and euro of pipeline lands in AiAnchor’s Command Hub as it happens — no spreadsheets to reconcile, no reporting to chase.',
        result: 'A clear plan up front, and one live view of what it’s returning.',
        icon: 'book',
        solutionIcon: 'chart',
      },
    ],
  },

  // AI consulting — the front half of the business. Same step-card layout the bespoke-build
  // section used to occupy; `focus` renders as the pill row under the steps.
  consulting: {
    heading: 'Start with consulting, not software.',
    lead: 'Before anything gets built, we work out where AI actually pays in your business — and where it doesn’t.',
    subhead: 'A short engagement that ends with a ranked roadmap, a business case in euros, and the first agents and automations live. Same team, same Command Hub.',
    steps: [
      {
        n: '1',
        title: 'Audit',
        desc: 'We map how leads reach you and what happens next: missed calls, unanswered chats, qualification by gut feel, onboarding done by hand, follow-ups nobody runs.',
        deliverables: 'Lead-flow audit, leak report, the cost of every gap.',
        timeline: '2–3 days',
      },
      {
        n: '2',
        title: 'Roadmap',
        desc: 'We rank every opportunity by revenue impact against effort, then agree exactly which voice agents, chatbots and automations get built first — and what each one has to return.',
        deliverables: 'Prioritised AI roadmap, business case, success metrics.',
        timeline: '2–3 days',
      },
      {
        n: '3',
        title: 'Deploy & optimise',
        desc: 'We build and launch what we agreed, wire it into your CRM and calendar, train your team on it, then keep tuning it against what the Command Hub reports.',
        deliverables: 'Live agents & automations, team training, monthly optimisation.',
        timeline: '7–14 days, then ongoing',
      },
    ],
    focusLabel: 'What we consult on',
    focus: [
      'AI voice agents',
      'Chatbots (site & WhatsApp)',
      'Lead qualification',
      'Client onboarding',
      'CRM & follow-up automation',
      'Command Hub reporting',
    ],
    // Secondary capability, deliberately understated: it's available when the roadmap calls
    // for it, but the AI work above is what we lead with.
    alsoNote: 'If the roadmap needs something built to sit behind it — a custom CRM, an internal tool, a website or a web app — we build those too, quoted separately.',
    bannerHtml: 'Most roadmaps land in <strong>under a week</strong>, and the first system is live inside two. Built on your numbers, not a generic template.',
    cta: 'Book a discovery call',
  },

  voiceSystems: {
    heading: 'AI voice agents & automations',
    subhead: 'The two engines we run for you: multilingual agents (Greek and English by default) that answer, qualify and book across phone and chat, and automations that carry every lead through qualification, onboarding and follow-up inside your CRM. Everything reports into the Command Hub.',
    voiceLabel: 'Voice agents',
    features: [
      { title: 'Instant call pickup', desc: 'Answers every call in multiple languages (Greek and English by default), day or night, so no opportunity ever reaches voicemail.' },
      { title: 'Smart discovery & booking', desc: 'Asks your qualifying questions, works out what the caller actually wants and books straight into your calendar.' },
      { title: 'Warm handover to your team', desc: 'Calls that need a person reach the right person, with the context already written up and the lead already logged.' },
      { title: 'Spam screened out', desc: 'Robocalls and time-wasters get filtered before they waste your agent’s minutes, or your team’s attention.' },
    ],
    autoLabel: 'Automations',
    autoHeading: 'Automations that pick up where the conversation ends',
    autoSubhead: 'Chatbots, qualification, onboarding and follow-up — built around your workflow and running without anyone on your team remembering to start them.',
    automations: [
      { icon: 'bot', title: 'Chatbots on site & WhatsApp', desc: 'A grounded chatbot answers from your services, pricing and policies, captures the lead and hands off to a human when it should.' },
      { icon: 'users', title: 'Lead qualification system', desc: 'Every enquiry is scored against your own criteria — budget, service, timeline, location — then routed to the right person or dropped politely.' },
      { icon: 'rocket', title: 'Client onboarding', desc: 'New client says yes and the automation takes over: details collected, documents sent, kickoff booked, CRM and team updated.' },
      { icon: 'zap', title: 'Missed-call text-back', desc: 'A call that slips through gets an instant text back with a booking link, so the lead is recovered before it calls a competitor.' },
      { icon: 'workflow', title: 'Follow-up sequences', desc: 'Multi-step follow-ups, reminders and review requests run on their own schedule until the lead replies or closes.' },
      { icon: 'calendar', title: 'CRM sync & reminders', desc: 'Every lead lands in the CRM you already use with the next step scheduled, so nothing sits in an inbox waiting to be noticed.' },
    ],
    stackHeading: 'Works with your stack',
    stack: ['Airtable', 'Google Sheets', 'Google Calendar', 'Cal.com', 'Outlook', 'HubSpot'],
  },

  about: {
    heading: 'Who We Are',
    lead: 'AiAnchor is an AI consultancy that also runs what it recommends: voice agents, chatbots, lead qualification and onboarding automations, all proven live in AiAnchor’s Command Hub.',
    leadBoldWords: ['an AI consultancy that also runs what it recommends', 'AiAnchor’s Command Hub'],
    tagline: 'We don’t hand you a strategy deck and wish you luck, and we don’t hand you a tool either. We find where AI pays, we build it, we run it, and we show you what it earned.',
    missionLabel: 'Our Mission',
    mission: 'To make AI a decision service businesses can justify in euros, not a leap of faith.',
    stats: [
      { stat: '24/7', desc: 'Calls and chats answered, leads qualified, clients onboarded and appointments booked, including nights, weekends and holidays.' },
      { stat: 'Live', desc: 'Every call, chat, lead, booking and euro of pipeline visible in the Command Hub the moment it happens.' },
    ],
    statCallout: 'The ROI is on screen, not in a slide deck.',
  },

  contact: {
    panelHeading: 'Ready to find out where AI actually pays in your business?',
    panelSubhead: 'Book a free demo. You’ll hear the agent handle a real call for your business, see the automations running and see what AiAnchor’s Command Hub reports back.',
    panelCta: 'Book a demo',
    formIntroHeading: 'Tell us what’s slipping through.',
    formIntroSubhead: 'Missed calls, unanswered chats, qualification by gut feel, onboarding by email. Tell us where it hurts and we’ll show you the fix running.',
    emailCard: { title: 'Email Us', value: 'info@aianchor.online' },
    linkedinCard: { title: 'LinkedIn', desc: 'See our updates' },
    instagramCard: { title: 'Instagram', desc: 'Behind the work' },
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      interest: 'Interest',
      interestOptions: [
        'AI consulting / AI audit',
        'AI voice agents',
        'Chatbot (website or WhatsApp)',
        'Lead qualification',
        'Client onboarding automation',
        'Follow-up & CRM automation',
        'Command Hub / ROI reporting',
        'Custom build (CRM, internal tool or web app)',
        'Other',
      ],
      message: 'Message',
      submit: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message Sent!',
      successBody: 'We’ve received your inquiry and will be in touch shortly.',
      sendAnother: 'Send another message',
      errorMessage: 'Something went wrong. Please try again later.',
      // FLAG: this is the original site's Formspree form ID — confirm it's still
      // wired to the right inbox in your Formspree dashboard, or replace it with
      // a new form's endpoint (https://formspree.io/f/YOUR_ID).
      endpoint: 'https://formspree.io/f/xnnzezlo',
    },
  },

  socialProof: {
    heading: 'Trusted by businesses across Greece',
    sub: 'Real estate agencies, clinics and service businesses run their front desk on AiAnchor.',
    testimonials: [
      { quote: 'PLACEHOLDER — drop in a real client quote here.', name: 'Client name', role: 'Owner', company: 'Company name' },
      { quote: 'PLACEHOLDER — drop in a real client quote here.', name: 'Client name', role: 'Manager', company: 'Company name' },
      { quote: 'PLACEHOLDER — drop in a real client quote here.', name: 'Client name', role: 'Director', company: 'Company name' },
    ],
  },

  howItWorks: {
    heading: 'How it works',
    subhead: 'From AI audit to proven return, in three steps.',
    steps: [
      {
        n: '01',
        title: 'We audit your lead flow and agree the plan',
        desc: 'Consulting first. We map where leads come from and where they die, price each gap, and rank which agents, chatbots and automations get built first.',
      },
      {
        n: '02',
        title: 'We build and run the agents & automations',
        desc: 'Done for you. Voice agents and chatbots answer in multiple languages (Greek and English as primary), qualification scores and routes every lead, and onboarding, text-backs and follow-up sequences run inside your CRM.',
      },
      {
        n: '03',
        title: 'You watch results and ROI live in AiAnchor’s Command Hub',
        desc: 'The Command Hub is the platform you log into. Every call, chat, lead and booking lands there the moment it happens, with the numbers to prove what it’s worth.',
      },
    ],
  },

  features: {
    heading: 'AiAnchor’s Command Hub',
    subhead: 'One platform you log into, where every agent and automation we run reports in real numbers: calls and chats answered, leads qualified, clients onboarded, bookings made and what they’re worth.',
    items: [
      { icon: 'phone', title: 'AI voice agents (multilingual)', desc: 'Natural, on-brand phone conversations across multiple languages (Greek and English by default), around the clock, with summaries and sentiment on every call.' },
      { icon: 'bot', title: 'Chatbots on site & WhatsApp', desc: 'Web chat and WhatsApp answered from your own services and pricing, capturing the lead in the same pipeline as your calls.' },
      { icon: 'users', title: 'Lead qualification & routing', desc: 'Every enquiry scored against your criteria and routed to the right person, so your team only touches the ones worth touching.' },
      { icon: 'calendar', title: 'Real bookings into your calendar', desc: 'Appointments land directly in the calendar you already use. No double-booking, no back-and-forth.' },
      { icon: 'workflow', title: 'Onboarding & follow-up automations', desc: 'Client onboarding, missed-call text-backs, follow-up sequences and review requests, built around how you actually work.' },
      { icon: 'chart', title: 'Revenue pipeline valuation', desc: 'Leads are valued against your real listings or services, so the roadmap you agreed can be checked against euros.' },
      { icon: 'activity', title: 'Live analytics & call recordings', desc: 'Full visibility into every conversation and automation run, with recordings available on request.' },
      { icon: 'book', title: 'Knowledge-base-grounded agents', desc: 'Your agents know your listings, services and policies. They don’t improvise.' },
    ],
  },

  // Three ways to work with us. No usage limits or self-serve tiers: every engagement starts with the workflow.
  // `cta.target` picks the destination in components/pricing.tsx (book = /book-demo/, contact = email).
  pricing: {
    heading: 'Pricing based on what you actually need',
    subhead: 'We start with the workflow, then recommend the right level of support.',
    vatNote: 'Prices before VAT.',
    plans: [
      {
        name: 'Workflow Review',
        price: 'Free',
        purpose: 'For companies that want to understand where their current processes could be improved.',
        body: 'We look at how your team works today, find the friction, repetitive work and weak handoffs, then outline where better systems could help.',
        items: ['Workflow review', 'Bottleneck identification', 'Improvement opportunities', 'Recommended next steps'],
        cta: { label: 'Book a Free Call', target: 'book' },
      },
      {
        name: 'Managed Systems',
        pricePrefix: 'From',
        price: '€349',
        priceSuffix: '/month',
        featured: true,
        purpose: 'For businesses that want AiAnchor to build, manage and improve selected systems and workflows.',
        body: 'Depending on what you need, that can mean automations, integrations, AI agents, reporting or the operational systems behind them.',
        items: ['System setup and management', 'Automation and integrations', 'AI agents where useful', 'Monitoring and support', 'Ongoing improvements', 'AiAnchor platform access where relevant'],
        cta: { label: 'Discuss Your Workflow', target: 'book' },
      },
      {
        name: 'Custom Projects',
        price: 'Tailored to scope',
        purpose: 'For larger or more specialised builds.',
        body: 'Scoped and quoted separately once we understand the work involved.',
        items: ['Internal tools and custom software', 'Custom dashboards and client portals', 'CRM improvements', 'Complex and multi-system workflows', 'Larger operational projects'],
        cta: { label: 'Contact Us', target: 'contact' },
      },
    ],
    note: 'Every business works differently. We scope the work after understanding the process, so the solution fits what you actually need.',
  },

  comparison: {
    heading: 'AiAnchor vs. the alternatives',
    subhead: 'See what you’re actually comparing before you decide.',
    cols: { feature: '', aianchor: 'AiAnchor', human: 'Human receptionist', basic: 'Basic AI answering service' },
    rows: [
      { label: 'Available 24/7', aianchor: true, human: false, basic: true },
      { label: 'Books real appointments', aianchor: true, human: true, basic: false },
      { label: 'Knows your listings / services', aianchor: true, human: true, basic: false },
      { label: 'Handles website chat & WhatsApp too', aianchor: true, human: false, basic: false },
      { label: 'Qualifies and routes every lead to your criteria', aianchor: true, human: false, basic: false },
      { label: 'Analyzes every call (summary, sentiment)', aianchor: true, human: false, basic: false },
      { label: 'Automates client onboarding', aianchor: true, human: false, basic: false },
      { label: 'Custom automations (follow-ups, text-back)', aianchor: true, human: false, basic: false },
      { label: 'Live ROI dashboard in AiAnchor’s Command Hub', aianchor: true, human: false, basic: false },
      { label: 'AI consulting: audit, roadmap & ongoing optimisation', aianchor: true, human: false, basic: false },
      { label: 'Connects your existing tools (CRM, calendar, chat)', aianchor: true, human: false, basic: false },
      { label: 'Monthly cost', aianchor: '€149–699+', human: '€800–1,500', basic: '€150–400' },
    ],
  },

  faq: {
    heading: 'Frequently Asked Questions',
    subhead: 'Everything you were going to email us about anyway.',
    items: [
      { q: 'What does AiAnchor actually do?', a: 'We map how your business currently works, find where time or opportunities are being lost, and implement the right solution using automation, software, AI or a mix of them.' },
      { q: 'Do you only build AI solutions?', a: 'No. AI is one tool we use when it makes sense. Some problems are better solved with automation, integrations, dashboards or custom software.' },
      { q: 'What does the workflow review include?', a: 'We look at how work moves through your team, which tools are involved, where handoffs break down, and which steps are taking unnecessary time.' },
      { q: 'Do you work with the tools we already use?', a: 'Yes. We normally build around your existing CRM, calendar, communication tools and internal systems rather than replacing everything.' },
      { q: 'What is the AiAnchor Operations Platform?', a: 'It gives you one place to track the systems we implement, including automations, AI agents, activity, leads, bookings and operational results.' },
      { q: 'Can I see whether the systems are actually working?', a: 'Yes. The platform is designed to give you visibility into activity, progress and the results generated by the systems running in your business.' },
      { q: 'Can you build custom systems as well?', a: 'Yes. Depending on the problem, that can include internal tools, dashboards, portals, integrations and custom workflows.' },
      { q: 'Do you also build voice agents and chat assistants?', a: 'Yes, where they are useful for the workflow. They are part of the wider system rather than the entire offer.' },
      { q: 'Can AiAnchor automate lead handling and follow-up?', a: 'Yes. Lead capture, qualification, follow-up, missed-call recovery and appointment booking are common use cases.' },
      { q: 'Can you improve client onboarding and internal operations too?', a: 'Yes. The same process can be applied to onboarding, admin, reporting, handoffs and other repetitive workflows.' },
      { q: 'How does pricing work?', a: 'It depends on the workflow and what needs to be implemented. We normally review the process first, then scope the right level of work and support.' },
      { q: 'How long does setup take?', a: 'It depends on complexity. A focused workflow can be implemented much faster than a larger system involving several tools or departments.' },
      { q: 'Do you offer ongoing support?', a: 'Yes. We can monitor, maintain and improve the systems after launch.' },
      { q: 'Can we start with one workflow first?', a: 'Yes. In many cases, starting with one clear process is the best way to prove the value before expanding further.' },
      { q: 'What happens if something needs a person?', a: 'We design the workflow so that human handoff happens at the right point, rather than trying to automate everything.' },
    ],
  },

  // First-visit consent wizard (templates/cookie-consent.mjs). Non-essential categories
  // start off and stay off until the visitor turns them on — "Reject" is one click, same
  // as "Accept", which is what the ePrivacy rules actually require.
  cookieConsent: {
    ariaLabel: 'Cookie consent',
    intro: {
      eyebrow: 'Your privacy',
      heading: 'We keep this site cookie-light',
      body: 'Only what the site needs to work is on by default. Anything that measures or markets stays off until you switch it on.',
      policyLink: 'Read the Cookie Policy',
      acceptAll: 'Accept all',
      rejectAll: 'Reject non-essential',
      customize: 'Customise',
    },
    prefs: {
      heading: 'Choose what you allow',
      body: 'You can change this any time from “Cookie Settings” in the footer.',
      back: 'Back',
      save: 'Save preferences',
      acceptAll: 'Accept all',
      alwaysOn: 'Always on',
      categories: [
        {
          id: 'necessary',
          title: 'Strictly necessary',
          desc: 'Remembers your language and this consent choice. The site cannot work properly without it.',
          locked: true,
        },
        {
          id: 'analytics',
          title: 'Analytics',
          desc: 'Anonymous page and traffic statistics, so we can see which parts of the site actually help.',
        },
        {
          id: 'marketing',
          title: 'Marketing',
          desc: 'Lets us measure our campaigns and show you relevant AiAnchor content on other platforms.',
        },
      ],
    },
  },

  // "Anchor" — the support assistant in the corner of every page (templates/chat-widget.mjs).
  // It answers from the copy in this file via /api/chat; see content/knowledge-base.mjs.
  assistant: {
    name: 'Anchor',
    launcher: 'Ask Anchor',
    openLabel: 'Open the AiAnchor assistant',
    closeLabel: 'Close the assistant',
    subtitle: 'AiAnchor support',
    status: 'AI support',
    disclosure: 'Anchor is an AI assistant and answers from this website. For anything it can’t cover, it will hand you to the team.',
    greeting: 'Hi — I’m Anchor. Ask me anything about the AI audit, voice agents, chatbots, automations, pricing or the Command Hub.',
    suggestionsLabel: 'Or start with one of these',
    suggestions: [
      'What does the AI audit cover?',
      'How does pricing work?',
      'Is there a free trial?',
      'How long does setup take?',
    ],
    inputLabel: 'Your message',
    placeholder: 'Ask about pricing, setup, GDPR…',
    send: 'Send',
    typing: 'Anchor is typing',
    transcriptLabel: 'Conversation with Anchor',
    reset: 'Clear chat',
    demoCta: 'Book a discovery call',
    errors: {
      generic: 'Something went wrong on our side. Try again, or email info@aianchor.online.',
      rateLimited: 'That’s a lot of questions at once — give it a minute, or email info@aianchor.online.',
      unavailable: 'The assistant is offline right now. Email info@aianchor.online and a person will answer.',
      refused: 'I can’t help with that one. Ask me about AiAnchor, or email info@aianchor.online.',
    },
    endpoint: '/api/chat/',
  },

  footer: {
    tagline: 'Managed AI operations for real estate teams.',
    columns: {
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
    },
    productLinks: { services: 'Services', consulting: 'Process', voiceAgent: 'Voice & Automations', commandHub: 'Command Hub', pricing: 'Pricing', faq: 'FAQ' },
    companyLinks: { about: 'About', contact: 'Contact', clientLogin: 'Client Login' },
    legalLinks: {
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      dpa: 'Data Processing (DPA)',
      cookies: 'Cookie Policy',
      aiPolicy: 'AI Disclosure',
      trust: 'Trust & Security',
      cookieSettings: 'Cookie Settings',
    },
    companyDetails: {
      heading: 'AiAnchor',
      // Registration details hidden until confirmed. Repopulate this array to show them again.
      lines: [],
    },
    contactEmail: 'info@aianchor.online',
    socials: { instagram: 'https://www.instagram.com/aianchor_/', linkedin: 'https://linkedin.com/company/aianchor' },
    copyright: (year) => `© ${year} AiAnchor. All rights reserved.`,
  },

  legal: legalEn,
};
