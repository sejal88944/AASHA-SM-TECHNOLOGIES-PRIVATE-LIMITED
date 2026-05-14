import { listApplications } from './lib/apply-core.mjs'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const host = req.headers.host || 'localhost'
  const url = new URL(req.url || '/', `http://${host}`)

  try {
    const { status, json } = await listApplications(req, process.env, url.searchParams)
    return res.status(status).json(json)
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
}
