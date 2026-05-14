import { getApplicationResume } from '../../lib/apply-core.mjs'

export default async function handler(req, res) {
  const id = typeof req.query?.id === 'string' ? req.query.id : Array.isArray(req.query?.id) ? req.query.id[0] : ''
  if (!id) {
    return res.status(400).json({ ok: false, error: 'Missing id' })
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS')
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { status, json, binary, headers } = await getApplicationResume(req, process.env, id)
    if (binary && Buffer.isBuffer(binary)) {
      res.status(status)
      for (const [k, v] of Object.entries(headers || {})) {
        res.setHeader(k, v)
      }
      return res.end(binary)
    }
    return res.status(status).json(json)
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
}
