/** Checkbox values must match `api/lib/sanitize.mjs` ALLOWED_TECH normalization. */
export const APPLICATION_TECH_SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'React.js',
  'Node.js',
  'MongoDB',
  'SQL',
  'Python',
  'Java',
  'APIs',
  'SEO',
  'Figma',
] as const

export const EXPERIENCE_LEVELS = ['Student', 'Fresher', '0–1 years', '1–3 years', '3+ years'] as const

export const EMPLOYMENT_TYPES = ['Internship', 'Full-time'] as const

export const APPLICATION_STATUSES = ['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected'] as const

export const HIRING_ADMIN_SESSION_KEY = 'hiringAdminBearer'
