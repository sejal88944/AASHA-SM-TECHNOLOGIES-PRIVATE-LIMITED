export type ServiceIconId =
  | 'web'
  | 'crm'
  | 'mobile'
  | 'integration'
  | 'payment'
  | 'sms'
  | 'maps'

export type ServiceItem = {
  title: string
  /** One-line summary for home service cards */
  short: string
  /** Bullet points for the Services page */
  points: string[]
  icon: ServiceIconId
}

export const services: ServiceItem[] = [
  {
    title: 'Website Development',
    short:
      'Website development India businesses can rely on for speed, clarity, and lead generation.',
    points: [
      'We design and build business websites that are mobile-friendly, fast, and easy for customers to navigate.',
      'Every page is structured for clarity so your visitors understand your services quickly and contact you with confidence.',
      'Our website development India process includes launch support, updates, and practical recommendations for steady growth.',
    ],
    icon: 'web',
  },
  {
    title: 'SMS Automation',
    short:
      'SMS automation India workflows to send updates, reminders, and offers at the right time.',
    points: [
      'We set up SMS campaigns and triggered messages for confirmations, reminders, alerts, and promotional communication.',
      'Your team saves time by reducing manual follow-ups while customers receive consistent and timely updates.',
      'Our SMS automation India solutions can connect with your existing website or CRM as your operations scale.',
    ],
    icon: 'sms',
  },
  {
    title: 'API Integration',
    short:
      'API integration services that connect your apps, payments, CRM, and communication tools.',
    points: [
      'We build secure API integration services so your website and internal systems can share data automatically.',
      'When tools are connected, your team avoids duplicate entry and your business processes run faster with fewer errors.',
      'You receive clear documentation and dependable support, so your integrations stay stable as business needs change.',
    ],
    icon: 'integration',
  },
  {
    title: 'CRM / HRM / Billing Software',
    short: 'Manage your business data in one place',
    points: [
      'Manage your business data in one place',
      'Save time with automation and reduce manual work',
      'Track sales, employees, and performance easily',
    ],
    icon: 'crm',
  },
  {
    title: 'Mobile Application Development',
    short: 'Connect with customers directly on mobile',
    points: [
      'Connect with customers directly on mobile',
      'Improve user experience and engagement',
      'Grow your brand visibility and reach',
    ],
    icon: 'mobile',
  },
  {
    title: 'Payment Gateway Integration',
    short: 'Accept online payments easily and securely',
    points: [
      'Accept online payments easily and securely',
      'Provide multiple payment options to customers',
      'Improve trust and convenience for users',
    ],
    icon: 'payment',
  },
  {
    title: 'Google Maps Business Setup',
    short: 'Make your business visible on Google search',
    points: [
      'Make your business visible on Google search',
      'Attract nearby customers easily',
      'Build trust with reviews and location presence',
    ],
    icon: 'maps',
  },
]

export const whyChooseUs = [
  {
    title: 'Result-Focused Approach',
    description:
      'We do not just build websites or tools. We focus on outcomes like more leads, faster processes, and better customer engagement.',
  },
  {
    title: 'End-to-End Solutions',
    description:
      'From website development to SMS automation and API integration, we handle everything under one roof.',
  },
  {
    title: 'Direct Communication',
    description:
      'You work directly with the team that builds your project. No delays, no confusion, and no middle layers.',
  },
  {
    title: 'Affordable & Scalable',
    description:
      'Our solutions are cost-effective and designed to grow with your business.',
  },
  {
    title: 'Fast Delivery',
    description:
      'We respect your time and deliver projects quickly without compromising quality.',
  },
  {
    title: 'Reliable Support',
    description:
      'We provide ongoing support to keep your systems running smoothly after delivery.',
  },
]

export const workProcess = [
  { step: 'Requirement', text: 'Discovery, goals, and success criteria.' },
  { step: 'Planning', text: 'Scope, timeline, architecture, and milestones.' },
  { step: 'Development', text: 'Iterative build with reviews and demos.' },
  { step: 'Testing', text: 'QA, fixes, and performance checks.' },
  { step: 'Deployment', text: 'Go-live, monitoring, and handover.' },
]
