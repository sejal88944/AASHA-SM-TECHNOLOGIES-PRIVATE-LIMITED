export type ServiceItem = {
  title: string
  /** One-line summary for home service cards */
  short: string
  /** Bullet points for the Services page */
  points: string[]
}

export const services: ServiceItem[] = [
  {
    title: '💻 Website Development (Static & Dynamic)',
    short: 'Build a strong online presence for your business',
    points: [
      'Build a strong online presence for your business',
      'Attract more customers with a modern design',
      'Increase inquiries and showcase your services',
    ],
  },
  {
    title: '⚙️ CRM / HRM / Billing Software',
    short: 'Manage your business data in one place',
    points: [
      'Manage your business data in one place',
      'Save time with automation and reduce manual work',
      'Track sales, employees, and performance easily',
    ],
  },
  {
    title: '📱 Mobile Application Development',
    short: 'Connect with customers directly on mobile',
    points: [
      'Connect with customers directly on mobile',
      'Improve user experience and engagement',
      'Grow your brand visibility and reach',
    ],
  },
  {
    title: '📲 WhatsApp API Integration',
    short: 'Automate replies and customer communication',
    points: [
      'Automate replies and customer communication',
      'Send offers, updates, and notifications instantly',
      'Increase sales with direct customer interaction',
    ],
  },
  {
    title: '💳 Payment Gateway Integration',
    short: 'Accept online payments easily and securely',
    points: [
      'Accept online payments easily and securely',
      'Provide multiple payment options to customers',
      'Improve trust and convenience for users',
    ],
  },
  {
    title: '📩 SMS Automation',
    short: 'Send bulk messages quickly to customers',
    points: [
      'Send bulk messages quickly to customers',
      'Share offers, alerts, and important updates',
      'Stay connected even without internet',
    ],
  },
  {
    title: '📍 Google Maps Business Setup',
    short: 'Make your business visible on Google search',
    points: [
      'Make your business visible on Google search',
      'Attract nearby customers easily',
      'Build trust with reviews and location presence',
    ],
  },
]

export const whyChooseUs = [
  {
    title: 'Modern',
    description:
      'Current tools and UX patterns so your product feels fresh and stays maintainable.',
  },
  {
    title: 'Scalable',
    description:
      'Architecture that grows with traffic, data, and new product capabilities.',
  },
  {
    title: 'Reliable',
    description:
      'Clear milestones, disciplined testing, and predictable releases you can plan around.',
  },
  {
    title: 'Client-focused',
    description:
      'We align engineering decisions with your outcomes—not the other way around.',
  },
]

export const workProcess = [
  { step: 'Requirement', text: 'Discovery, goals, and success criteria.' },
  { step: 'Planning', text: 'Scope, timeline, architecture, and milestones.' },
  { step: 'Development', text: 'Iterative build with reviews and demos.' },
  { step: 'Testing', text: 'QA, fixes, and performance checks.' },
  { step: 'Deployment', text: 'Go-live, monitoring, and handover.' },
]
