export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('allow', 'POST, OPTIONS')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  const phone = String(body.phone || '').trim()
  const company = String(body.company || '').trim()
  const interest = String(body.interest || '').trim()
  const page = String(body.page || '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' })
  }

  // Hook for email providers (Resend/SendGrid/etc). Keep logs minimal in production.
  const payload = {
    name,
    email,
    phone,
    company,
    interest,
    page,
    message,
    receivedAt: new Date().toISOString(),
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    const r = await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!r.ok) {
      return res.status(502).json({ ok: false, error: 'Downstream webhook failed' })
    }
  } else {
    // Default: accept and log server-side (Vercel function logs). Replace with email integration.
    console.log('[contact]', JSON.stringify(payload))
  }

  return res.status(200).json({ ok: true })
}

function safeJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
