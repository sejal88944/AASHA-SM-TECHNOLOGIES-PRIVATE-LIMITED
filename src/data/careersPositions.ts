/** Where this opening appears in the site IA */
export type CareerPool = 'jobs' | 'internship'

export type CareerPosition = {
  id: string
  category: 'tech' | 'non-tech'
  /** SEO-friendly card title */
  seoTitle: string
  title: string
  shortDescription: string
  responsibilities: string[]
  skills: string[]
  jobType: string
  workMode: 'Hybrid' | 'Remote' | 'On-site'
  growth: string
  pools: CareerPool[]
  /** Google JobPosting employmentType */
  employmentType: 'INTERN' | 'FULL_TIME' | 'CONTRACTOR'
}

const DATE_POSTED = '2026-05-01'
const VALID_THROUGH = '2026-12-31'

export const CAREERS_DATE_POSTED = DATE_POSTED
export const CAREERS_VALID_THROUGH = VALID_THROUGH

export const careerPositions: CareerPosition[] = [
  {
    id: 'frontend-developer-intern',
    category: 'tech',
    seoTitle: 'Frontend Developer Intern (React.js) — Pune / Hybrid',
    title: 'Frontend Developer Intern',
    shortDescription:
      'Ship UI components for real client and internal products while learning modern React patterns, accessibility, and performance budgets—ideal for students exploring web development internship India pathways.',
    responsibilities: [
      'Build and refine UI in React with guidance from senior engineers',
      'Participate in code reviews, story breakdowns, and QA handoffs',
      'Collaborate on responsive layouts, forms, and integration-ready pages',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    jobType: 'Paid internship (stipend / certificate — discussed at interview)',
    workMode: 'Hybrid',
    growth: 'Path toward React developer roles, full stack exposure, and client demo participation',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'backend-developer-intern',
    category: 'tech',
    seoTitle: 'Backend Developer Intern (Node.js, MongoDB) — India',
    title: 'Backend Developer Intern',
    shortDescription:
      'Learn production API design with Node.js and MongoDB: validation, auth patterns, logging, and safe deployments—aligned with Node.js internship India and startup internship with live projects Pune expectations.',
    responsibilities: [
      'Implement REST endpoints and webhook handlers with tests',
      'Work with databases, migrations, and environment configuration',
      'Pair on incident triage and documentation for handover',
    ],
    skills: ['Node.js', 'REST APIs', 'MongoDB', 'JavaScript'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Progress toward backend / full stack responsibilities on shipping teams',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'full-stack-developer-intern',
    category: 'tech',
    seoTitle: 'Full Stack Developer Intern (React + Node) — Maharashtra',
    title: 'Full Stack Developer Intern',
    shortDescription:
      'Own small vertical slices across React and Node for internal tools and client work—strong fit for full stack internship with real projects and fresher software jobs India pipelines.',
    responsibilities: [
      'Deliver end-to-end features with clear acceptance criteria',
      'Coordinate with design and QA for release-ready increments',
      'Maintain readable code and integration notes',
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Exposure to CRM integrations, automation, and release discipline',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'software-developer-trainee',
    category: 'tech',
    seoTitle: 'Software Developer Trainee (Python / Java / SQL)',
    title: 'Software Developer Trainee',
    shortDescription:
      'Structured trainee track for freshers who want depth in Python, Java, or SQL with mentorship—supports software company careers Maharashtra and startup jobs for freshers narratives without overpromising titles.',
    responsibilities: [
      'Complete onboarding modules and supervised coding tasks',
      'Contribute to internal utilities and test suites',
      'Document decisions for team learning',
    ],
    skills: ['Python', 'Java', 'SQL'],
    jobType: 'Trainee (evaluation window before full-time consideration)',
    workMode: 'Hybrid',
    growth: 'Specialization toward backend, data, or integration pods based on fit',
    pools: ['jobs', 'internship'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'mobile-app-developer-intern',
    category: 'tech',
    seoTitle: 'Mobile App Developer Intern (React Native / Android basics)',
    title: 'Mobile App Developer Intern',
    shortDescription:
      'Work on mobile surfaces connected to APIs and CRM-backed journeys—great for candidates searching mobile app development Pune and IT internship for students Pune.',
    responsibilities: [
      'Implement screens, navigation, and state management patterns',
      'Integrate APIs with error handling and analytics hooks',
      'Test on real devices and document release notes',
    ],
    skills: ['React Native', 'Android basics', 'JavaScript', 'REST'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Mobile release ownership and deeper integration with web + API teams',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'ui-ux-design-intern',
    category: 'tech',
    seoTitle: 'UI/UX Design Intern (Figma) — Pune startup',
    title: 'UI/UX Design Intern',
    shortDescription:
      'Translate product requirements into usable flows and high-fidelity UI in Figma, working closely with engineering for feasible handoffs.',
    responsibilities: [
      'Produce wireframes, prototypes, and design specs',
      'Run lightweight usability checks with internal stakeholders',
      'Maintain component libraries aligned to dev constraints',
    ],
    skills: ['Figma', 'UI design', 'Prototyping', 'Design systems'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Portfolio-ready case studies from live or internal products',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'qa-testing-intern',
    category: 'tech',
    seoTitle: 'QA / Testing Intern — manual + automation basics',
    title: 'QA / Testing Intern',
    shortDescription:
      'Learn disciplined testing: test plans, regression suites, bug triage, and introductory automation hooks for web and API surfaces.',
    responsibilities: [
      'Author and execute test cases tied to acceptance criteria',
      'Log reproducible defects with evidence',
      'Support release checklists and smoke runs',
    ],
    skills: ['Testing', 'Debugging', 'Documentation', 'API basics'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Progress toward automation and CI-aware quality practices',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'api-integration-intern',
    category: 'tech',
    seoTitle: 'API Integration Intern (REST, automation) — India',
    title: 'API Integration Intern',
    shortDescription:
      'Shadow integration projects: vendor APIs, webhooks, retries, and observability—aligned with API integration services India learning goals.',
    responsibilities: [
      'Build and test integration stubs in staging environments',
      'Validate payloads and document edge cases',
      'Assist with monitoring dashboards and runbooks',
    ],
    skills: ['REST APIs', 'Automation', 'JSON', 'HTTP'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Path toward integration engineer responsibilities',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'seo-digital-marketing-intern',
    category: 'tech',
    seoTitle: 'SEO & Digital Marketing Intern',
    title: 'SEO & Digital Marketing Intern',
    shortDescription:
      'Support ethical SEO, content structure, analytics, and campaign measurement for B2B IT offerings—no black-hat shortcuts.',
    responsibilities: [
      'Assist with on-page audits, internal linking, and content briefs',
      'Track performance in analytics with clean UTM hygiene',
      'Coordinate with engineering for technical SEO fixes',
    ],
    skills: ['SEO', 'Content', 'Analytics', 'Marketing basics'],
    jobType: 'Paid internship',
    workMode: 'Remote',
    growth: 'Ownership of small campaigns and reporting packs',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'wordpress-website-intern',
    category: 'tech',
    seoTitle: 'WordPress / Website Management Intern',
    title: 'WordPress / Website Management Intern',
    shortDescription:
      'Maintain CMS-driven sites: updates, backups, forms, and performance hygiene—supports website development internship in Maharashtra learning loops.',
    responsibilities: [
      'Publish and QA content updates with versioning discipline',
      'Coordinate plugin updates and security patches',
      'Support migration and redirect checklists when needed',
    ],
    skills: ['WordPress', 'CMS', 'HTML/CSS', 'Website handling'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Exposure to headless and React marketing sites alongside CMS work',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'hr-intern-executive',
    category: 'non-tech',
    seoTitle: 'HR Intern / HR Executive — startup hiring Pune',
    title: 'HR Intern / HR Executive',
    shortDescription:
      'Support IT company hiring Pune operations: scheduling, candidate experience, records, and coordination with leadership—includes HR internship Pune eligible tracks.',
    responsibilities: [
      'Coordinate interviews and candidate communications',
      'Maintain structured records and compliant documentation',
      'Assist with onboarding checklists and policy communication',
    ],
    skills: ['Communication', 'Scheduling', 'Documentation', 'Stakeholder empathy'],
    jobType: 'Internship or entry executive (role discussed at interview)',
    workMode: 'Hybrid',
    growth: 'Expanded ownership in talent operations and employer branding',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'business-development-executive',
    category: 'non-tech',
    seoTitle: 'Business Development Executive — B2B IT services',
    title: 'Business Development Executive',
    shortDescription:
      'Research prospects, craft outreach, and support proposals for software and automation programs across Maharashtra and India.',
    responsibilities: [
      'Qualify inbound leads and maintain CRM hygiene',
      'Support demos and follow-ups with clear notes',
      'Track pipeline metrics with honest forecasting',
    ],
    skills: ['B2B sales', 'CRM basics', 'Written English', 'Research'],
    jobType: 'Full-time / performance plan',
    workMode: 'Hybrid',
    growth: 'Account ownership and partner-channel exposure',
    pools: ['jobs'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'accounts-finance-assistant',
    category: 'non-tech',
    seoTitle: 'Accounts & Finance Assistant',
    title: 'Accounts & Finance Assistant',
    shortDescription:
      'Support invoicing, reconciliations, and vendor payments with accuracy—includes accounts internship India eligible pathways for students.',
    responsibilities: [
      'Maintain records aligned to invoices and contracts',
      'Assist month-end checklists with audit-friendly trails',
      'Coordinate with operations on purchase documentation',
    ],
    skills: ['Tally / spreadsheets', 'Attention to detail', 'GST basics', 'Communication'],
    jobType: 'Full-time or internship (discussed at interview)',
    workMode: 'On-site',
    growth: 'Deeper finance operations as company scale increases',
    pools: ['jobs', 'internship'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'operations-executive',
    category: 'non-tech',
    seoTitle: 'Operations Executive',
    title: 'Operations Executive',
    shortDescription:
      'Keep delivery programs organized: trackers, meeting cadence, and cross-team follow-ups for Pune-led India delivery.',
    responsibilities: [
      'Maintain project visibility artifacts and RAID logs',
      'Coordinate vendor access and calendar discipline',
      'Support leadership reporting with clean summaries',
    ],
    skills: ['Organization', 'Stakeholder management', 'Tools (Sheets/Notion)', 'Follow-through'],
    jobType: 'Full-time',
    workMode: 'Hybrid',
    growth: 'Program coordination and customer success adjacent roles',
    pools: ['jobs'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'customer-support-executive',
    category: 'non-tech',
    seoTitle: 'Customer Support Executive',
    title: 'Customer Support Executive',
    shortDescription:
      'Help clients with structured tickets, escalation paths, and CRM-linked timelines for messaging and integration programs.',
    responsibilities: [
      'Respond with clear reproduction steps and ownership',
      'Coordinate with engineering for defect triage',
      'Improve macros and knowledge base articles',
    ],
    skills: ['Written communication', 'CRM basics', 'Patience', 'Problem solving'],
    jobType: 'Full-time',
    workMode: 'Hybrid',
    growth: 'Technical support and success engineering exposure',
    pools: ['jobs'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'social-media-manager',
    category: 'non-tech',
    seoTitle: 'Social Media Manager — B2B tech brand',
    title: 'Social Media Manager',
    shortDescription:
      'Grow responsible brand presence on LinkedIn and aligned channels with engineering-accurate messaging.',
    responsibilities: [
      'Plan editorial calendar tied to launches and blogs',
      'Coordinate creatives with compliance constraints',
      'Report engagement with learning loops',
    ],
    skills: ['LinkedIn', 'Copywriting', 'Scheduling tools', 'Analytics'],
    jobType: 'Full-time or contract',
    workMode: 'Remote',
    growth: 'Employer branding and demand-gen collaboration',
    pools: ['jobs'],
    employmentType: 'CONTRACTOR',
  },
  {
    id: 'content-writer-intern',
    category: 'non-tech',
    seoTitle: 'Content Writer Intern — technical marketing',
    title: 'Content Writer Intern',
    shortDescription:
      'Write clear service pages, case outlines, and blog drafts that engineers can validate—supports startup company internship opportunities Pune.',
    responsibilities: [
      'Research topics and produce structured drafts',
      'Collaborate on outlines with SEO and technical reviewers',
      'Maintain tone and factuality for B2B readers',
    ],
    skills: ['English writing', 'Research', 'SEO awareness', 'Editing'],
    jobType: 'Paid internship',
    workMode: 'Remote',
    growth: 'Portfolio of published technical content with mentorship',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'sales-marketing-intern',
    category: 'non-tech',
    seoTitle: 'Sales & Marketing Intern',
    title: 'Sales & Marketing Intern',
    shortDescription:
      'Assist campaigns, events, and partner outreach for IT services across India—great for sales & marketing intern resumes.',
    responsibilities: [
      'Support outreach sequences and list hygiene',
      'Track experiments and weekly metrics',
      'Coordinate collateral updates with technical reviewers',
    ],
    skills: ['Communication', 'CRM basics', 'Campaign ops', 'Curiosity'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Pipeline contribution and GTM tooling exposure',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
  {
    id: 'admin-assistant',
    category: 'non-tech',
    seoTitle: 'Admin Assistant — Pune',
    title: 'Admin Assistant',
    shortDescription:
      'Keep the office and leadership calendar running: documentation, travel, and vendor coordination for a growing team.',
    responsibilities: [
      'Manage schedules and meeting logistics',
      'Maintain filing and compliance-friendly records',
      'Support HR and ops with repeatable checklists',
    ],
    skills: ['Organization', 'MS Office / Google Workspace', 'Discretion', 'Multitasking'],
    jobType: 'Full-time',
    workMode: 'On-site',
    growth: 'Expanded EA/operations responsibilities',
    pools: ['jobs'],
    employmentType: 'FULL_TIME',
  },
  {
    id: 'recruiter-talent-acquisition-intern',
    category: 'non-tech',
    seoTitle: 'Recruiter / Talent Acquisition Intern',
    title: 'Recruiter / Talent Acquisition Intern',
    shortDescription:
      'Source and engage candidates for engineering and GTM roles; learn structured hiring for startup company jobs Pune.',
    responsibilities: [
      'Screen profiles and coordinate interview loops',
      'Maintain ATS hygiene and candidate communications',
      'Support employer brand content with HR',
    ],
    skills: ['Sourcing', 'Communication', 'ATS basics', 'Structured notes'],
    jobType: 'Paid internship',
    workMode: 'Hybrid',
    growth: 'Full-cycle recruiting mentorship',
    pools: ['jobs', 'internship'],
    employmentType: 'INTERN',
  },
]

export function jobDescriptionPlain(p: CareerPosition): string {
  return [
    p.shortDescription,
    '',
    'Key responsibilities:',
    ...p.responsibilities.map((r) => `• ${r}`),
    '',
    `Required skills: ${p.skills.join(', ')}`,
    '',
    `Role type: ${p.jobType}. Work mode: ${p.workMode}.`,
    '',
    `Career growth: ${p.growth}`,
  ].join('\n')
}

export function positionsInPool(pool: CareerPool): CareerPosition[] {
  return careerPositions.filter((p) => p.pools.includes(pool))
}

export function applyUrlForPosition(title: string): string {
  const q = new URLSearchParams()
  q.set('position', title)
  return `/apply?${q.toString()}`
}
