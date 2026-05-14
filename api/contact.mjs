import { executeContactForm } from './contact-core.mjs'

/** Reuse client across warm Vercel invocations */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('allow', 'POST, OPTIONS')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body
  const { status, json } = await executeContactForm(body, process.env)
  return res.status(status).json(json)
}

function safeJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
