/**
 * @param {import('nodemailer').Transporter | null} transporter
 * @param {{ from: string; to: string; subject: string; html: string; text: string }} opts
 */
export async function sendMailSafe(transporter, opts) {
  if (!transporter) return { sent: false }
  await transporter.sendMail(opts)
  return { sent: true }
}

/**
 * @param {NodeJS.ProcessEnv} env
 */
export async function createMailerAsync(env) {
  const user = env.EMAIL_USER?.trim()
  const pass = env.EMAIL_PASS?.trim()
  if (!user || !pass) return null
  const nodemailer = await import('nodemailer')
  const host = env.EMAIL_HOST?.trim() || 'smtp.gmail.com'
  const port = Number(env.EMAIL_PORT || 587)
  const secure = String(env.EMAIL_SECURE || '').toLowerCase() === 'true' || port === 465
  return nodemailer.default.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

/**
 * @param {string} s
 */
export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {Record<string, unknown>} doc
 * @param {string} origin
 */
export function adminNotificationHtml(doc, origin) {
  const id = String(doc._id || '')
  const link = `${origin}/admin/hiring`
  return `
  <h2>New job application</h2>
  <p><strong>Name:</strong> ${escapeHtml(doc.fullName)}</p>
  <p><strong>Email:</strong> ${escapeHtml(doc.email)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(doc.phone)}</p>
  <p><strong>Position:</strong> ${escapeHtml(doc.position)}</p>
  <p><strong>Type:</strong> ${escapeHtml(doc.employmentType)}</p>
  <p><strong>Status:</strong> ${escapeHtml(doc.status)}</p>
  <p><strong>ID:</strong> ${escapeHtml(id)}</p>
  <p><a href="${escapeHtml(link)}">Open hiring admin</a></p>
  `
}

/**
 * @param {Record<string, unknown>} doc
 */
export function candidateConfirmationHtml(doc) {
  return `
  <p>Hi ${escapeHtml(doc.fullName)},</p>
  <p>Thanks for applying to <strong>AASHA-SM TECHNOLOGIES PRIVATE LIMITED</strong>. We received your application for <strong>${escapeHtml(
    doc.position,
  )}</strong>.</p>
  <p>Our HR team will review your profile and reach out if there is a fit. If you listed Pune / Maharashtra / remote preferences, we will align conversations accordingly.</p>
  <p>— Hiring team</p>
  `
}
