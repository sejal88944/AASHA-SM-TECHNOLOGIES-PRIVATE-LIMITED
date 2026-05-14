/**
 * @param {unknown} v
 * @param {number} max
 */
export function sanitizeText(v, max = 8000) {
  return String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, max)
}

/**
 * @param {unknown} v
 * @param {number} max
 */
export function sanitizeShort(v, max = 200) {
  return sanitizeText(v, max)
}

/**
 * @param {unknown} v
 */
export function isValidEmail(v) {
  const s = String(v || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

/**
 * @param {unknown} v
 */
export function isReasonablePhone(v) {
  const digits = String(v || '').replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

const ALLOWED_STATUSES = ['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected']

/**
 * @param {unknown} v
 */
export function normalizeStatus(v) {
  const s = String(v || '').trim()
  return ALLOWED_STATUSES.includes(s) ? s : null
}

export { ALLOWED_STATUSES }

const ALLOWED_MIMES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

/**
 * @param {string} mime
 */
export function isAllowedResumeMime(mime) {
  return ALLOWED_MIMES.has(mime)
}

export const MAX_RESUME_BYTES = 2 * 1024 * 1024

const ALLOWED_TECH = [
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
]

/**
 * @param {unknown} arr
 */
export function normalizeTechnicalSkills(arr) {
  if (!Array.isArray(arr)) return []
  const out = []
  for (const x of arr) {
    const s = String(x || '').trim()
    if (ALLOWED_TECH.includes(s) && !out.includes(s)) out.push(s)
  }
  return out
}
