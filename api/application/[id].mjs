import { getApplicationById, patchApplicationStatus } from '../lib/apply-core.mjs'

/**
 * @param {import('http').IncomingMessage} req
 */
async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  const id = typeof req.query?.id === 'string' ? req.query.id : Array.isArray(req.query?.id) ? req.query.id[0] : ''
  if (!id) {
    return res.status(400).json({ ok: false, error: 'Missing id' })
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    return res.status(204).end()
  }

  if (req.method === 'GET') {
    try {
      const { status, json } = await getApplicationById(req, process.env, id)
      return res.status(status).json(json)
    } catch (e) {
      const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
      return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const body = await readJsonBody(req)
      const { status, json } = await patchApplicationStatus(req, process.env, id, body)
      return res.status(status).json(json)
    } catch (e) {
      const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
      return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}
