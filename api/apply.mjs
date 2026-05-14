import { parseMultipartForm } from './lib/parse-multipart.mjs'
import { clientIpFromReq, submitApplicationFromMultipart } from './lib/apply-core.mjs'
import { MAX_RESUME_BYTES } from './lib/sanitize.mjs'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const ref = String(req.headers.origin || req.headers.referer || process.env.SITE_URL || '')
  let origin = process.env.SITE_URL || 'https://smtechsolutions.in'
  try {
    if (ref) origin = new URL(ref).origin
  } catch {
    /* keep default */
  }

  try {
    const parsed = await parseMultipartForm(req, { maxFileBytes: MAX_RESUME_BYTES })
    const ip = clientIpFromReq(req)
    const { status, json } = await submitApplicationFromMultipart(parsed, process.env, { ip, origin })
    return res.status(status).json(json)
  } catch (e) {
    console.error('[api/apply]', e)
    return res.status(400).json({ ok: false, error: 'Could not read application form.' })
  }
}
