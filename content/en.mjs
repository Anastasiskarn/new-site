import { legalEn, legalMetaEn } from './legal-en.mjs';

export default {
  "lang": "en",
  "htmlLang": "en",
  "locale": "en_US",
  "dir": "ltr",
  "meta": { home: {
  "title": "AiAnchor | Better workflows, automation & AI for businesses",
  "description": "We map how your business works, find what slows it down and implement the right solution using automation, AI or custom software. Track progress and activity in the AiAnchor Operations Platform."
}, ...legalMetaEn, comingSoon: {
  "title": "Coming Soon | AiAnchor",
  "description": "Self-serve signup is not available yet. Book a free discovery call to discuss what you need and how we can build it."
}, bookDemo: {
  "title": "Book a discovery call | AiAnchor",
  "description": "Tell us what slows your work down. In a free call, we review the process, identify what could improve and discuss the implementation."
} },
  "comingSoon": {
    "heading": "Coming soon",
    "body": "Self-serve signup is not available yet. We are preparing the AiAnchor Operations Platform, where you can see the systems we have implemented, their activity and the progress of our work together. Until then, book a free discovery call to discuss what you want to improve.",
    "ctaPrimary": "Book a discovery call",
    "ctaSecondary": "Back to plans"
  },
  "bookDemo": {
    "heading": "What would you like to improve?",
    "subhead": "Tell us which process is getting in the way. In a free call, we look at how it works, where it gets stuck and which solution is worth exploring.",
    "bullets": [
      {
        "icon": "workflow",
        "title": "How you work today",
        "desc": "We look at the steps your team follows and the tools it uses."
      },
      {
        "icon": "workflow",
        "title": "What slows you down",
        "desc": "Copy-paste, duplicate entries, forgotten follow-ups and information that never reaches the next person."
      },
      {
        "icon": "chart",
        "title": "What is worth changing",
        "desc": "We identify what needs a better process, what can be automated and where AI or a custom tool makes sense."
      },
      {
        "icon": "clock",
        "title": "What we take on",
        "desc": "We agree what to implement, how it connects to your tools and how you will track progress in the AiAnchor Operations Platform."
      }
    ],
    "nextSteps": [
      {
        "title": "We review your setup",
        "desc": "We look at the information you send before the call."
      },
      {
        "title": "We map the problem",
        "desc": "We identify where the workflow is breaking down or creating unnecessary work."
      },
      {
        "title": "We show you the options",
        "desc": "We explain what could be improved and what we would actually implement."
      }
    ],
    "noPressureNote": "No pressure to move forward. If we do not think there is a useful project there, we will tell you.",
    "backLink": "Back to the site",
    "form": {
      "heading": "Tell us what you need",
      "subheading": "A bit of context helps us make the call useful from the start.",
      "firstName": "First name",
      "lastName": "Last name",
      "email": "Work email",
      "phone": "Phone",
      "phoneOptional": "optional",
      "company": "Company",
      "companyOptional": "optional",
      "website": "Website",
      "websiteOptional": "optional",
      "websitePlaceholder": "yourcompany.gr",
      "websiteHint": "Helps us understand your workflow before the call.",
      "interest": "Where is your team losing time?",
      "interestIntro": "Select all that apply. You can add the details in the next step.",
      "interestOptions": [
        "Leads & follow-up",
        "Calls & customer enquiries",
        "Client onboarding",
        "Disconnected tools",
        "Internal processes",
        "Reporting & visibility",
        "A tool we don’t have",
        "Not sure yet"
      ],
      "interestHints": [
        "Enquiries wait too long, or nobody follows up.",
        "Missed calls, repeat questions and manual booking.",
        "Too many forms, emails and steps for each new client.",
        "Copying data between a CRM, spreadsheets and inboxes.",
        "Manual approvals, handovers and repetitive admin.",
        "No clear view of what’s happening or what’s working.",
        "Work lives in spreadsheets because the right tool doesn’t exist.",
        "Something slows us down, but we haven’t pinned down what."
      ],
      "message": "What feels inefficient right now?",
      "messagePlaceholder": "e.g. leads are followed up manually, information is spread across different tools, onboarding takes too many steps, or the team lacks visibility.",
      "privacyNote": "We use these details only to arrange your workflow review.",
      "privacyLink": "Privacy Policy",
      "submit": "Book a discovery call",
      "submitting": "Sending...",
      "successTitle": "Request received!",
      "successBody": "Our team has received your workflow review request. A confirmation is on its way to your inbox and we’ll contact you shortly to fix a time.",
      "sendAnother": "Send another request",
      "errorMessage": "Something went wrong. Please try again, or email us at info@aianchor.online.",
      "endpoint": "/api/book-demo/"
    }
  },
  "skipLink": "Skip to content",
  "nav": {
    "services": "Services",
    "consulting": "How we work",
    "voiceAgent": "Voice & Automations",
    "commandHub": "Operations Platform",
    "pricing": "Pricing",
    "faq": "FAQ",
    "about": "About",
    "clientLogin": "Client Login",
    "cta": "Book a discovery call",
    "langSwitchLabel": "Ελληνικά"
  },
  "hero": {
    "headlineLine1": "Better systems, built around",
    "headlineLine2": "",
    "headlineLine3": "how a business already works.",
    "subhead": "AiAnchor maps how a business already operates, then builds only the automation, AI or software it actually needs. What goes live stays in one place, where its activity and results remain visible.",
    "ctaPrimary": "Book a discovery call",
    "ctaPrimaryHref": "/en/book-demo/",
    "ctaSecondary": "See how we work",
    "ctaSecondaryHref": "#consulting",
    "visualAlt": "The AiAnchor Operations Platform, where clients see implemented systems, activity and key results"
  },
  "services": {
    "heading": "Where does everyday work get stuck?",
    "subhead": "Duplicate entries, information spread across tools, forgotten follow-ups and processes that rely on copy-paste. We find what is worth changing first and make it work better.",
    "items": [
      {
        "problemTag": "Point 01",
        "problemTitle": "Information gets lost along the way",
        "problem": "An enquiry starts in email, moves to a spreadsheet, then into your CRM. Somewhere along the way, someone has to remember the next step. Every manual handoff is another chance for work to fall behind.",
        "impact": "THE RESULT: Delays, mistakes and a patchy view of the work",
        "solutionTitle": "Connected tools and better workflows",
        "solution": "We connect the tools you already use and design the workflow so information reaches the right place without unnecessary steps in between.",
        "result": "See system activity and progress in the AiAnchor Operations Platform.",
        "icon": "phone",
        "solutionIcon": "workflow"
      },
      {
        "problemTag": "Point 02",
        "problemTitle": "Your team repeats the same work",
        "problem": "Moving information, sending the same reminders, updating files and chasing outstanding tasks. Each job seems small, but together they take hours.",
        "impact": "THE RESULT: Hours spent on work that could run automatically",
        "solutionTitle": "Automation around your workflow",
        "solution": "We automate repetitive steps using your business rules. That can include follow-up, onboarding, CRM updates, documents, notifications and internal approvals.",
        "result": "Less copy-paste and a clear view of what runs and when.",
        "icon": "activity",
        "solutionIcon": "shield"
      },
      {
        "problemTag": "Point 03",
        "problemTitle": "You are not sure what to fix first",
        "problem": "There are plenty of tools, automations and AI solutions. Choosing technology is only part of the job. First, you need to know which problem is worth solving.",
        "impact": "THE RESULT: More tools without a clear purpose",
        "solutionTitle": "Workflow mapping, design and measurement",
        "solution": "We map the process, identify what costs time or creates friction and put the changes in order. Then you track implementation and activity in the AiAnchor Operations Platform.",
        "result": "Know what we are changing, why and what result we expect to see.",
        "icon": "book",
        "solutionIcon": "chart"
      },
      {
        "problemTag": "Point 04",
        "problemTitle": "You cannot see what is working",
        "problem": "Systems, activity and results live in different tools. To find out what is happening, you have to check each one separately.",
        "impact": "THE RESULT: Progress and opportunities to improve are hard to see",
        "solutionTitle": "The AiAnchor Operations Platform",
        "solution": "See what we have implemented, what is running now and how our work together is progressing. One clear dashboard for your systems, their activity and their results.",
        "result": "See what is working and what needs improvement.",
        "icon": "chart",
        "solutionIcon": "activity"
      }
    ]
  },
  "consulting": {
    "heading": "We start with your work.",
    "lead": "Before we recommend anything, we map how your team works today.",
    "subhead": "Then we identify what needs a better process, what can be automated and where AI or custom software is useful. We design the solution, implement it and keep improving it.",
    "steps": [
      {
        "n": "1",
        "title": "Map the process",
        "desc": "We look at how a task starts, which tools it passes through, who owns each step and where delays, duplicate work or mistakes appear.",
        "deliverables": "Process map, points of friction and priorities.",
        "timeline": "2-3 days"
      },
      {
        "n": "2",
        "title": "Design the right solution",
        "desc": "We choose the smallest solution that solves the problem properly. That could be an integration, an automation, an AI agent, a dashboard or a custom internal tool.",
        "deliverables": "Implementation plan, scope, cost and a way to measure the result.",
        "timeline": "2-3 days"
      },
      {
        "n": "3",
        "title": "Implement and monitor",
        "desc": "We build the solution, connect it to your existing tools and put it into real use. Then we monitor activity and improve it where needed.",
        "deliverables": "Working system, team training and ongoing improvements.",
        "timeline": "7-14 days, then ongoing"
      }
    ],
    "focusLabel": "Where we can help",
    "focus": [
      "AI agents and voice agents",
      "Chat assistants",
      "Leads and follow-up",
      "Tool integrations",
      "CRM and operational workflows",
      "Dashboards and reporting"
    ],
    "alsoNote": "We use the tools the process needs. If automation, an integration, a dashboard or custom software is the right solution, that is what we recommend.",
    "bannerHtml": "Small improvements can go live quickly. Larger projects are split into stages so you can see progress as each part is delivered.",
    "cta": "Book a discovery call"
  },
  "voiceSystems": {
    "heading": "AI agents, voice agents and automation",
    "subhead": "When a process needs AI, we use it where it adds value. Voice agents, chat assistants, qualification and follow-up can connect to the tools your team already uses.",
    "voiceLabel": "Voice agents",
    "features": [
      {
        "title": "Answers around the clock",
        "desc": "The agent answers calls day and night, in multiple languages. The primary setup includes Greek and English."
      },
      {
        "title": "Questions that lead to the next step",
        "desc": "It asks the questions you define, records what the caller needs and books an appointment in your calendar."
      },
      {
        "title": "Handover to your team",
        "desc": "When a person is needed, it transfers the call to the right team member with the context and lead details."
      },
      {
        "title": "Spam call filtering",
        "desc": "It filters spam and unwanted calls to reduce the time they take from the agent and your team."
      }
    ],
    "autoLabel": "Automations",
    "autoHeading": "The conversation ends. The work continues.",
    "autoSubhead": "We connect chatbots, lead qualification, onboarding and follow-up to your process. The next steps run using the rules we agree together.",
    "automations": [
      {
        "icon": "bot",
        "title": "Chatbots on site and WhatsApp",
        "desc": "They answer from your services, prices and policies, capture interest and hand over to your team when needed."
      },
      {
        "icon": "users",
        "title": "Lead qualification",
        "desc": "Define criteria such as budget, service, timing and area. The system evaluates each lead and routes it to the right person or sends the agreed response."
      },
      {
        "icon": "rocket",
        "title": "Tool integrations",
        "desc": "After an agreement, the automation collects details, sends documents and books the first meeting. Your CRM and team are updated."
      },
      {
        "icon": "zap",
        "title": "SMS after a missed call",
        "desc": "It sends a text with a booking link after a missed call, giving the caller an easy way to continue the conversation."
      },
      {
        "icon": "workflow",
        "title": "Scheduled follow-up",
        "desc": "Messages, reminders and review requests follow the schedule we define. The workflow adjusts when a lead replies or closes."
      },
      {
        "icon": "calendar",
        "title": "CRM sync and reminders",
        "desc": "Leads enter the CRM you already use with the next step scheduled. Your team can see what needs to happen."
      }
    ],
    "stackHeading": "Connects to your tools",
    "stack": [
      "Airtable",
      "Google Sheets",
      "Google Calendar",
      "Cal.com",
      "Outlook",
      "HubSpot"
    ]
  },
  "about": {
    "heading": "A team that designs and implements",
    "lead": "At AiAnchor, we start with the process. We work out what is needed and take care of implementation, from the initial design through to a working system.",
    "leadBoldWords": [
      "start with the process",
      "take care of implementation"
    ],
    "tagline": "One partner for mapping, design, implementation and ongoing improvement. You have one team to work with across the project.",
    "missionLabel": "Why we do it",
    "mission": "To help businesses work more clearly and efficiently, using technology that solves real problems and earns its place in the workflow.",
    "stats": [
      {
        "stat": "24/7",
        "desc": "Agents and automations available for calls, chat, lead qualification, onboarding and appointment booking, including evenings, weekends and holidays."
      },
      {
        "stat": "In one place",
        "desc": "Systems, activity, progress and key results together in the AiAnchor Operations Platform."
      }
    ],
    "statCallout": "See what is working and what needs improvement."
  },
  "contact": {
    "panelHeading": "Let's see what could work better.",
    "panelSubhead": "Book a free discovery call. Show us how your business works today and we will look at which part is worth improving first.",
    "panelCta": "Book a discovery call",
    "formIntroHeading": "Tell us what you would like to improve.",
    "formIntroSubhead": "A slow process? Tools that do not connect? Repetitive work? Tell us what is happening and we will look at where to start.",
    "emailCard": {
      "title": "Email Us",
      "value": "info@aianchor.online"
    },
    "linkedinCard": {
      "title": "LinkedIn",
      "desc": "See our updates"
    },
    "instagramCard": {
      "title": "Instagram",
      "desc": "Behind the work"
    },
    "form": {
      "firstName": "First Name",
      "lastName": "Last Name",
      "email": "Email Address",
      "interest": "What would you like to improve?",
      "interestOptions": [
        "Workflow mapping",
        "AI agents and voice agents",
        "Chatbots on site or WhatsApp",
        "Leads and follow-up",
        "Client onboarding",
        "CRM and automation",
        "Operations Platform and reporting",
        "Custom software or internal tools",
        "Other"
      ],
      "message": "Message",
      "submit": "Send Message",
      "submitting": "Sending...",
      "successTitle": "Message Sent!",
      "successBody": "We’ve received your inquiry and will be in touch shortly.",
      "sendAnother": "Send another message",
      "errorMessage": "Something went wrong. Please try again later.",
      "endpoint": "https://formspree.io/f/xnnzezlo"
    }
  },
  "socialProof": {
    "heading": "Built around real processes",
    "sub": "Each implementation starts with a real business process and is designed around your tools, people and the way your team already works.",
    "testimonials": [
      {
        "quote": "PLACEHOLDER — drop in a real client quote here.",
        "name": "Client name",
        "role": "Owner",
        "company": "Company name"
      },
      {
        "quote": "PLACEHOLDER — drop in a real client quote here.",
        "name": "Client name",
        "role": "Manager",
        "company": "Company name"
      },
      {
        "quote": "PLACEHOLDER — drop in a real client quote here.",
        "name": "Client name",
        "role": "Director",
        "company": "Company name"
      }
    ]
  },
  "howItWorks": {
    "heading": "How it works",
    "subhead": "From the first problem to a system that works in practice.",
    "steps": [
      {
        "n": "01",
        "title": "Show us how you work",
        "desc": "We look at where leads come from and what happens next. We map the process, estimate the cost of the gaps and agree what to build first."
      },
      {
        "n": "02",
        "title": "We design and implement",
        "desc": "We design the solution around your work and connect it to the systems you already use. Automation, AI or custom software, depending on what is needed."
      },
      {
        "n": "03",
        "title": "Track progress in the Operations Platform",
        "desc": "See what has been implemented, which systems are running, their activity and key results. You can follow the work after the system goes live."
      }
    ]
  },
  "features": {
    "heading": "The AiAnchor Operations Platform",
    "subhead": "See what we have implemented, what is running now and how our work together is progressing. One clear dashboard for your systems, their activity and their results.",
    "items": [
      {
        "icon": "phone",
        "title": "Voice agents in multiple languages",
        "desc": "Phone conversations around the clock, with Greek and English in the primary setup. See a summary and sentiment analysis for each call."
      },
      {
        "icon": "bot",
        "title": "Chatbots on site and WhatsApp",
        "desc": "Answers based on your services and prices. Chat leads join the same workflow as leads from calls."
      },
      {
        "icon": "users",
        "title": "Lead qualification and routing",
        "desc": "Leads are evaluated against your criteria and sent to the right person. Your team knows where to focus first."
      },
      {
        "icon": "calendar",
        "title": "Appointments in your calendar",
        "desc": "Booking connects to your existing calendar and checks availability to reduce double bookings and back-and-forth messages."
      },
      {
        "icon": "workflow",
        "title": "Onboarding and follow-up",
        "desc": "Client details, SMS after a missed call, scheduled follow-up and review requests, configured around your process."
      },
      {
        "icon": "chart",
        "title": "Estimated opportunity value",
        "desc": "Lead valuation uses your properties or services. You get a view of their potential value to help evaluate the plan."
      },
      {
        "icon": "activity",
        "title": "Activity and recordings",
        "desc": "Follow conversations and automation runs. Call recordings are available on request."
      },
      {
        "icon": "book",
        "title": "Answers from your knowledge base",
        "desc": "Agents use the information you provide about your properties, services and policies as the basis for their answers."
      }
    ]
  },
  "pricing": {
    "heading": "We start with what your work needs.",
    "subhead": "First we review the process. Then we build the solution and keep it running after go-live.",
    "vatNote": "Prices before VAT.",
    "plans": [
      {
        "name": "Initial review",
        "price": "Free",
        "purpose": "A first conversation to map the process, the tools involved and the result that matters.",
        "body": "If there is a clear opportunity, the scope and next step are laid out.",
        "items": [
          "Process and friction points",
          "Possible solutions",
          "Rough scope and setup estimate",
          "A clear next step"
        ],
        "cta": {
          "label": "Book a discovery call",
          "target": "book"
        }
      },
      {
        "name": "Setup",
        "price": "Quoted to scope",
        "priceSuffix": "one-time",
        "purpose": "A one-time build to design the solution, connect it to existing tools and put it into real use.",
        "body": "Priced by scope, from a single workflow to a multi-system setup.",
        "items": [
          "Process mapping and solution design",
          "Automations, AI agents and integrations",
          "CRM connection and configuration",
          "Operations Platform setup",
          "Testing and go-live"
        ],
        "cta": {
          "label": "Tell us about your project",
          "target": "contact"
        }
      },
      {
        "name": "Monthly operation and improvement",
        "pricePrefix": "From",
        "price": "€349",
        "priceSuffix": "/month",
        "featured": true,
        "purpose": "Runs after go-live: monitoring, support and ongoing improvements, plus access to the Operations Platform.",
        "body": "",
        "items": [
          "Operations Platform access (leads, calls, bookings, results)",
          "Monitoring and management",
          "Automation and integration support",
          "AI agent support where used",
          "Ongoing improvements",
          "Technical support"
        ],
        "cta": {
          "label": "Book a discovery call",
          "target": "book"
        }
      }
    ],
    "note": "Every engagement is a one-time setup plus a monthly operation fee. Larger or more complex builds are quoted to scope."
  },
  "comparison": {
    "heading": "What does each option include?",
    "subhead": "Compare the capabilities before deciding what fits your work.",
    "cols": {
      "feature": "",
      "aianchor": "AiAnchor",
      "human": "Human receptionist",
      "basic": "Basic AI answering service"
    },
    "rows": [
      {
        "label": "Available 24/7",
        "aianchor": true,
        "human": false,
        "basic": true
      },
      {
        "label": "Books real appointments",
        "aianchor": true,
        "human": true,
        "basic": false
      },
      {
        "label": "Knows your listings / services",
        "aianchor": true,
        "human": true,
        "basic": false
      },
      {
        "label": "Handles website chat & WhatsApp too",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Qualifies and routes every lead to your criteria",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Analyzes every call (summary, sentiment)",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Automates client onboarding",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Custom automations (follow-ups, text-back)",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Live dashboard in the AiAnchor Operations Platform",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "AI consulting: audit, roadmap & ongoing optimisation",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Connects your existing tools (CRM, calendar, chat)",
        "aianchor": true,
        "human": false,
        "basic": false
      },
      {
        "label": "Monthly support",
        "aianchor": "From €349",
        "human": "Varies",
        "basic": "Varies"
      }
    ]
  },
  "faq": {
    "heading": "Frequently Asked Questions",
    "subhead": "Everything you were going to email us about anyway.",
    "items": [
      {
        "q": "What does AiAnchor actually do?",
        "a": "We map how your business currently works, find where time or opportunities are being lost, and implement the right solution using automation, software, AI or a mix of them."
      },
      {
        "q": "Do you only build AI solutions?",
        "a": "No. AI is one tool we use when it makes sense. Some problems are better solved with automation, integrations, dashboards or custom software."
      },
      {
        "q": "What does the workflow review include?",
        "a": "We look at how work moves through your team, which tools are involved, where handoffs break down, and which steps are taking unnecessary time."
      },
      {
        "q": "Do you work with the tools we already use?",
        "a": "Yes. We normally build around your existing CRM, calendar, communication tools and internal systems rather than replacing everything."
      },
      {
        "q": "What is the AiAnchor Operations Platform?",
        "a": "It gives you one place to track the systems we implement, including automations, AI agents, activity, leads, bookings and operational results."
      },
      {
        "q": "Can I see whether the systems are actually working?",
        "a": "Yes. The platform is designed to give you visibility into activity, progress and the results generated by the systems running in your business."
      },
      {
        "q": "Can you build custom systems as well?",
        "a": "Yes. Depending on the problem, that can include internal tools, dashboards, portals, integrations and custom workflows."
      },
      {
        "q": "Do you also build voice agents and chat assistants?",
        "a": "Yes, where they are useful for the workflow. They are part of the wider system rather than the entire offer."
      },
      {
        "q": "Can AiAnchor automate lead handling and follow-up?",
        "a": "Yes. Lead capture, qualification, follow-up, missed-call recovery and appointment booking are common use cases."
      },
      {
        "q": "Can you improve client onboarding and internal operations too?",
        "a": "Yes. The same process can be applied to onboarding, admin, reporting, handoffs and other repetitive workflows."
      },
      {
        "q": "How does pricing work?",
        "a": "It depends on the workflow and what needs to be implemented. We normally review the process first, then scope the right level of work and support."
      },
      {
        "q": "How long does setup take?",
        "a": "It depends on complexity. A focused workflow can be implemented much faster than a larger system involving several tools or departments."
      },
      {
        "q": "Do you offer ongoing support?",
        "a": "Yes. We can monitor, maintain and improve the systems after launch."
      },
      {
        "q": "Can we start with one workflow first?",
        "a": "Yes. In many cases, starting with one clear process is the best way to prove the value before expanding further."
      },
      {
        "q": "What happens if something needs a person?",
        "a": "We design the workflow so that human handoff happens at the right point, rather than trying to automate everything."
      }
    ]
  },
  "cookieConsent": {
    "ariaLabel": "Cookie consent",
    "intro": {
      "eyebrow": "Your privacy",
      "heading": "We keep this site cookie-light",
      "body": "Only what the site needs to work is on by default. Anything that measures or markets stays off until you switch it on.",
      "policyLink": "Read the Cookie Policy",
      "acceptAll": "Accept all",
      "rejectAll": "Reject non-essential",
      "customize": "Customise"
    },
    "prefs": {
      "heading": "Choose what you allow",
      "body": "You can change this any time from “Cookie Settings” in the footer.",
      "back": "Back",
      "save": "Save preferences",
      "acceptAll": "Accept all",
      "alwaysOn": "Always on",
      "categories": [
        {
          "id": "necessary",
          "title": "Strictly necessary",
          "desc": "Remembers your language and this consent choice. The site cannot work properly without it.",
          "locked": true
        },
        {
          "id": "analytics",
          "title": "Analytics",
          "desc": "Anonymous page and traffic statistics, so we can see which parts of the site actually help."
        },
        {
          "id": "marketing",
          "title": "Marketing",
          "desc": "Lets us measure our campaigns and show you relevant AiAnchor content on other platforms."
        }
      ]
    }
  },
  "assistant": {
    "name": "Anchor",
    "launcher": "Ask Anchor",
    "openLabel": "Open the AiAnchor assistant",
    "closeLabel": "Close the assistant",
    "subtitle": "AiAnchor support",
    "status": "AI support",
    "disclosure": "Anchor is an AI assistant and answers from this website. For anything it can’t cover, it will hand you to the team.",
    "greeting": "Hi, I am Anchor. Ask me about our process, automation, AI agents, custom solutions, pricing or the Operations Platform.",
    "suggestionsLabel": "Or start with one of these",
    "suggestions": [
      "How does a project start?",
      "How does pricing work?",
      "Can we start with one workflow?",
      "How long does setup take?"
    ],
    "inputLabel": "Your message",
    "placeholder": "Ask about pricing, setup, GDPR…",
    "send": "Send",
    "typing": "Anchor is typing",
    "transcriptLabel": "Conversation with Anchor",
    "reset": "Clear chat",
    "demoCta": "Book a discovery call",
    "errors": {
      "generic": "Something went wrong on our side. Try again, or email info@aianchor.online.",
      "rateLimited": "That’s a lot of questions at once — give it a minute, or email info@aianchor.online.",
      "unavailable": "The assistant is offline right now. Email info@aianchor.online and a person will answer.",
      "refused": "I can’t help with that one. Ask me about AiAnchor, or email info@aianchor.online."
    },
    "endpoint": "/api/chat/"
  },
  "footer": {
    "tagline": "We design and implement better ways of working with automation, AI and software.",
    "columns": {
      "product": "Product",
      "company": "Company",
      "legal": "Legal"
    },
    "productLinks": {
      "services": "Services",
      "consulting": "How we work",
      "voiceAgent": "Voice & Automations",
      "commandHub": "Operations Platform",
      "pricing": "Pricing",
      "faq": "FAQ"
    },
    "companyLinks": {
      "about": "About",
      "contact": "Contact",
      "clientLogin": "Client Login"
    },
    "legalLinks": {
      "terms": "Terms of Service",
      "privacy": "Privacy Policy",
      "dpa": "Data Processing (DPA)",
      "cookies": "Cookie Policy",
      "aiPolicy": "AI Disclosure",
      "trust": "Trust & Security",
      "cookieSettings": "Cookie Settings"
    },
    "companyDetails": {
      "heading": "AiAnchor",
      "lines": []
    },
    "contactEmail": "info@aianchor.online",
    "socials": {
      "instagram": "https://www.instagram.com/aianchor_/",
      "linkedin": "https://linkedin.com/company/aianchor"
    },
    "copyright": (year) => `© ${year} AiAnchor. All rights reserved.`
  },
  "legal": legalEn
};
