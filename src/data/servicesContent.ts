import type { FaqItem } from './schema'

export type ServiceDefinition = {
  slug: string
  path: string
  /** Short label for navigation and cards (visible). */
  shortTitle: string
  title: string
  metaDescription: string
  h1: string
  subhead: string
  primaryKeyword: string
  intro: string[]
  highlights: string[]
  sections: { title: string; level: 2 | 3; paragraphs: string[] }[]
  faqs: FaqItem[]
  relatedSlugs: string[]
}

export const services: ServiceDefinition[] = [
  {
    slug: 'website-development',
    path: '/services/website-development',
    shortTitle: 'Website development',
    title: 'Website Development Company India | Fast, SEO-Ready Web Builds',
    metaDescription:
      'Website development for India-wide brands and Pune teams: performance-first builds, CMS options, analytics, forms, and integrations with CRM, SMS, and WhatsApp.',
    h1: 'Website development that stays fast, clear, and easy to operate',
    subhead:
      'We ship responsive experiences, solid information architecture, and integrations with the tools you already use—without locking your marketing team into developer tickets for every edit.',
    primaryKeyword: 'website development company India',
    intro: [
      'Your website is usually the first place buyers validate credibility. We design and build sites with performance budgets, accessible components, and conversion paths that match how people actually buy.',
      'Whether you need a marketing site, a product microsite, or a customer portal that will later connect to APIs, we plan structure, publishing workflows, and instrumentation early so you avoid expensive rework after launch.',
    ],
    highlights: [
      'Mobile-first UI with consistent design tokens and accessible patterns',
      'Metadata, canonical URLs, structured data, and sitemap-ready routing',
      'Lead capture wired to email, CRM, or webhooks—your choice of intake model',
      'Integration-ready architecture for SMS, WhatsApp, payments, and CRM',
    ],
    sections: [
      {
        title: 'What a typical delivery package includes',
        level: 2,
        paragraphs: [
          'Discovery workshops map audiences, offers, and proof points. We translate that into reusable templates and sections so your team can publish day-to-day changes safely.',
          'For B2B buyers, we emphasize clarity: services, industries, delivery model, security posture, and a single obvious next step—because ambiguity reduces qualified inquiries.',
        ],
      },
      {
        title: 'When web work should move in lockstep with integrations',
        level: 3,
        paragraphs: [
          'If lead forms must create CRM records, if pricing depends on live inventory, or if dashboards need authenticated APIs, we coordinate releases with shared error handling and monitoring.',
        ],
      },
      {
        title: 'Local presence without thin “doorway” pages',
        level: 2,
        paragraphs: [
          'We use honest service-area language where it helps humans, and we connect related capabilities with internal links so people (and crawlers) can explore depth without duplicate fluff.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you only build websites for companies in Pune?',
        answer:
          'No. We are based in Pune, Maharashtra and work with teams across the country. Pune is a strong engineering hub, but our builds are designed for nationwide audiences and multi-city operations.',
      },
      {
        question: 'Can you migrate our old site without losing search visibility?',
        answer:
          'Yes, with a disciplined migration plan: URL mapping, redirects, parity checks, Search Console validation, and structured data updates. We prioritize minimizing disruption during cutover.',
      },
      {
        question: 'Which stacks do you recommend for speed and maintainability?',
        answer:
          'We frequently ship React + Vite experiences for performance and clean reuse, paired with a CMS when marketing needs autonomy. The right choice depends on editor workflows, integration complexity, and your in-house skills.',
      },
    ],
    relatedSlugs: ['api-integration', 'crm-erp-software', 'whatsapp-marketing'],
  },
  {
    slug: 'sms-automation',
    path: '/services/sms-automation',
    shortTitle: 'SMS automation',
    title: 'SMS Automation India | Reliable Transactional & Campaign Delivery',
    metaDescription:
      'SMS automation India programs with queueing, retries, compliance-aware templates, vendor orchestration, and CRM-linked triggers for OTPs, reminders, and lifecycle messaging.',
    h1: 'SMS automation you can measure, retry, and trust',
    subhead:
      'Operational messaging should be observable and recoverable—not a fragile set of one-off scripts.',
    primaryKeyword: 'SMS automation India',
    intro: [
      'Strong SMS programs treat delivery as infrastructure: idempotent sends, dead-letter handling, structured logs, and dashboards business teams can rely on. We connect vendor APIs to your source systems so OTPs, order updates, and reminders arrive on time.',
      'When comparing vendors, weigh incident response and observability—not only per-message price.',
    ],
    highlights: [
      'Triggers for OTPs, appointment reminders, payments, and logistics updates',
      'Rate limits, retries, backoff, and failover patterns suited to peak traffic',
      'CRM-attributed reporting so marketing and support share one timeline',
      'Guidance on pairing SMS with WhatsApp where it improves customer experience',
    ],
    sections: [
      {
        title: 'Why integrations matter as much as the SMS gateway',
        level: 2,
        paragraphs: [
          'Most failures are not “SMS is down”—they are partial CRM updates, duplicate events, or webhook ordering bugs. We define contracts, error handling, and replay strategies before volume scales.',
        ],
      },
      {
        title: 'Automation your operations team can audit',
        level: 2,
        paragraphs: [
          'We build workflows with clear ownership: who approved a template, which audience received it, and what happened when delivery failed—so leadership reviews are straightforward.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you work with our existing SMS provider?',
        answer:
          'Yes. We integrate with major gateways and can abstract provider-specific details so you are less locked in when commercial terms or deliverability change.',
      },
      {
        question: 'How do you reduce duplicate messages?',
        answer:
          'We use idempotency keys, deduplication windows, and explicit state transitions in your CRM or order system so retries do not become duplicate customer messages.',
      },
      {
        question: 'Is WhatsApp a replacement for SMS?',
        answer:
          'They solve different jobs. SMS is strong for time-sensitive alerts; WhatsApp can be better for conversational support and richer updates. We help you design channel mix without fragmenting reporting.',
      },
    ],
    relatedSlugs: ['api-integration', 'whatsapp-marketing', 'crm-erp-software'],
  },
  {
    slug: 'api-integration',
    path: '/services/api-integration',
    shortTitle: 'API integration',
    title: 'API Integration Services India | CRM, Billing, Logistics & Custom Stacks',
    metaDescription:
      'API integration services India: secure connectors for CRM, ERP, payments, SMS/WhatsApp vendors, and internal microservices—with monitoring, versioning, and rollout playbooks.',
    h1: 'API integrations built for production reality',
    subhead:
      'We connect systems with explicit auth models, monitoring, and rollback paths—so failures become tickets, not mysteries.',
    primaryKeyword: 'API integration services India',
    intro: [
      'Reliable automation depends on data moving cleanly between CRMs, billing, inventory, support desks, messaging vendors, and internal tools. We implement integrations with disciplined pagination, backoff, and error taxonomies.',
      'For procurement-heavy evaluations, we document what breaks first, how you detect it, and how you roll back—before go-live.',
    ],
    highlights: [
      'OAuth, API keys, mTLS where required, and practical secrets handling guidance',
      'Webhook verification, signature rotation, and replay protection',
      'Mapping layers that prevent conflicting “sources of truth” between finance and CRM',
      'Operational metrics: success rates, latency, error classes, and queue depth',
    ],
    sections: [
      {
        title: 'CRM-aligned integration design',
        level: 2,
        paragraphs: [
          'CRM customization is only as trustworthy as the data feeding it. We align objects, lifecycle stages, and attribution fields so sales and marketing automation stay coherent as integrations evolve.',
        ],
      },
      {
        title: 'Shared cores for web and mobile',
        level: 3,
        paragraphs: [
          'When you have both a public website and a field app, duplicating integration logic increases drift. We prefer shared services so every surface consumes the same validated rules.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you integrate with legacy ERP systems?',
        answer:
          'Often, yes—via supported APIs, file-based interfaces, or middleware when needed. We start with a compatibility matrix and phased rollout to reduce disruption.',
      },
      {
        question: 'How do you handle vendor API versioning and deprecations?',
        answer:
          'We document supported versions, add compatibility tests, and schedule migrations ahead of vendor deadlines. Breaking changes should be caught in staging—not by customers.',
      },
      {
        question: 'Can integrations support high-volume peaks?',
        answer:
          'Yes, with queue-backed ingestion, scaling patterns where appropriate, and backpressure controls so spikes do not cascade into data issues.',
      },
    ],
    relatedSlugs: ['crm-erp-software', 'sms-automation', 'mobile-app-development'],
  },
  {
    slug: 'crm-erp-software',
    path: '/services/crm-erp-software',
    shortTitle: 'CRM & ERP software',
    title: 'CRM Software Development India | Custom CRM/ERP Modules & Automation',
    metaDescription:
      'CRM software development India: custom modules, workflows, role-based access, reporting, and integrations for sales, support, and operations—built for scale and auditability.',
    h1: 'CRM and ERP work that matches how your revenue team actually operates',
    subhead:
      'Off-the-shelf CRMs rarely match territory rules, approvals, and SLAs. We implement bespoke workflows where it matters—and integrate where you should not reinvent the wheel.',
    primaryKeyword: 'CRM software development India',
    intro: [
      'Successful CRM programs connect requirements to revenue operations: pipeline hygiene, escalations, partner portals, and leadership reporting. We implement guardrails that prevent “CRM chaos” as teams grow.',
      'ERP-adjacent needs—inventory touches, invoicing hooks, procurement approvals—are scoped with finance controls intact while customer-facing teams move faster.',
    ],
    highlights: [
      'Role-based access, audit trails, and admin tooling for operational safety',
      'Workflow automation aligned to approvals, escalations, and territory logic',
      'Reporting for funnel leakage, SLA breaches, and cohort trends',
      'Integrations across billing, SMS, WhatsApp, HR, and internal tools',
    ],
    sections: [
      {
        title: 'Messaging belongs in the same timeline as revenue',
        level: 2,
        paragraphs: [
          'If WhatsApp or SMS conversations are not attributable to accounts and opportunities, you cannot optimize. We model message events inside CRM timelines with consent notes that stay queryable.',
        ],
      },
      {
        title: 'Incremental ERP change beats big-bang rewrites',
        level: 2,
        paragraphs: [
          'We recommend stabilizing critical workflows first, instrumenting them, then expanding. Large ERP cutovers are a common source of downtime and user resistance.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you implement Salesforce, Zoho, HubSpot, or fully custom CRMs?',
        answer:
          'We work across mainstream platforms and custom stacks. The best choice depends on integration surface area, compliance needs, total cost of ownership, and internal admin capacity.',
      },
      {
        question: 'How do you prevent automation from creating duplicate leads?',
        answer:
          'We implement match-and-merge rules, source attribution, and integration keys so web, ads, events, and partner channels reconcile to a single customer record where possible.',
      },
      {
        question: 'Can CRM changes be released safely while teams are working?',
        answer:
          'Yes, with feature flags, sandbox validation, migration scripts, and rollback plans. We schedule releases to reduce peak-hour risk for distributed teams.',
      },
    ],
    relatedSlugs: ['api-integration', 'whatsapp-marketing', 'website-development'],
  },
  {
    slug: 'mobile-app-development',
    path: '/services/mobile-app-development',
    shortTitle: 'Mobile app development',
    title: 'Mobile App Development | Android, iOS & Integration-Ready Releases',
    metaDescription:
      'Mobile app development for customer portals, field teams, and partner workflows—secure auth, offline-aware UX, notifications, and integrations with CRM and backend APIs.',
    h1: 'Mobile apps for teams who work in the real world',
    subhead:
      'We build Android and iOS experiences that handle intermittent connectivity, practical auth patterns, and clear offline states—without compromising security.',
    primaryKeyword: 'mobile app development',
    intro: [
      'Mobile is most valuable when it matches operational reality: device fragmentation, OTP login flows, regional language needs, and field constraints. We integrate with your existing APIs instead of duplicating business logic in the client.',
      'We align release cadence, crash analytics, and store compliance checklists with your go-to-market schedule.',
    ],
    highlights: [
      'Auth patterns suited to business apps: SSO, MFA, and device guidance where needed',
      'Push strategies coordinated with SMS policies and user expectations',
      'Performance profiling on common mid-tier devices',
      'CI-ready builds, staged rollouts, and instrumentation for product decisions',
    ],
    sections: [
      {
        title: 'One integration core for web and app',
        level: 2,
        paragraphs: [
          'Duplicated validation rules between web and mobile create security risk. We prefer shared backend services and contract-tested APIs so workflows stay consistent across surfaces.',
        ],
      },
      {
        title: 'When mobile should lead—and when web is enough',
        level: 3,
        paragraphs: [
          'If users need persistent on-device identity, camera workflows, background GPS, or aggressive offline caches, mobile leads. If the journey is mostly informational with occasional forms, a fast website may deliver ROI sooner.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you build cross-platform apps?',
        answer:
          'Yes, where it fits performance and UX—often React Native or Flutter. Native modules are used when platform capabilities or performance require it.',
      },
      {
        question: 'Can you publish and maintain apps for an enterprise MDM environment?',
        answer:
          'We can align builds with enterprise distribution requirements and support separate release tracks for internal versus public users.',
      },
      {
        question: 'How do you secure data on devices?',
        answer:
          'We apply secure storage practices, token lifetimes, root/jailbreak detection where appropriate, and encryption for sensitive caches—scoped to your risk profile and regulatory context.',
      },
    ],
    relatedSlugs: ['api-integration', 'crm-erp-software', 'website-development'],
  },
  {
    slug: 'whatsapp-marketing',
    path: '/services/whatsapp-marketing',
    shortTitle: 'WhatsApp for business',
    title: 'WhatsApp Marketing Services India | Templates, Journeys & CRM Sync',
    metaDescription:
      'WhatsApp marketing services India: template strategy, chatbot flows, agent handoff, opt-in governance, and CRM-synced reporting integrated with your sales and support operations.',
    h1: 'WhatsApp programs with templates, journeys, and clean CRM sync',
    subhead:
      'Turn WhatsApp into a controlled service and growth channel—not an unmanaged inbox—with measurable outcomes and clear escalation paths.',
    primaryKeyword: 'WhatsApp marketing services India',
    intro: [
      'WhatsApp performs when messaging is relevant, timely, and connected to revenue systems. We implement template libraries, journey orchestration, and CRM-linked timelines so teams stop arguing about attribution.',
      'Pairing WhatsApp with SMS is common for reminders and confirmations; the key is consistent consent records and operational playbooks for failures and retries.',
    ],
    highlights: [
      'Template governance: categories, languages, and update workflows',
      'Agent handoff patterns for support-heavy businesses',
      'CRM object mapping for leads, tickets, and health signals',
      'Measurement: delivery, read rates, response latency, and pipeline influence',
    ],
    sections: [
      {
        title: 'Automation that reduces copy-paste between tools',
        level: 2,
        paragraphs: [
          'We connect WhatsApp events to CRM updates, ticketing triggers, and optional analytics warehouses so leadership dashboards reflect reality.',
        ],
      },
      {
        title: 'Enterprise expectations without feeling slow',
        level: 2,
        paragraphs: [
          'We design chat experiences that feel modern while preserving compliance expectations: restricted roles, audit logs, and documented change management for templates.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can WhatsApp integrate with our existing CRM?',
        answer:
          'In most cases, yes—via official APIs and middleware. The approach depends on your CRM platform, object model, and whether you need near-real-time sync or batch updates.',
      },
      {
        question: 'How do you prevent customers from feeling spammed?',
        answer:
          'Frequency caps, relevance checks, explicit opt-in flows, and easy human escalation. We also monitor block rates and complaints as early warning metrics.',
      },
      {
        question: 'Do you help with WhatsApp Business verification?',
        answer:
          'We guide you through Meta Business verification steps and technical prerequisites, coordinating with your legal and brand teams for consistent profile data.',
      },
    ],
    relatedSlugs: ['crm-erp-software', 'sms-automation', 'api-integration'],
  },
]

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceByPath(pathname: string): ServiceDefinition | undefined {
  return services.find((s) => s.path === pathname)
}
