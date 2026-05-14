import { parsedFromWebFormData } from '../api/lib/multipart-from-formdata.mjs'
import {
  clientIpFromReq,
  getApplicationById,
  getApplicationResume,
  listApplications,
  patchApplicationStatus,
  submitApplicationFromMultipart,
} from '../api/lib/apply-core.mjs'
import { MAX_RESUME_BYTES } from '../api/lib/sanitize.mjs'

function readBodyBuffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

/**
 * @param {import('node:http').IncomingMessage} req
 */
async function readJsonBody(req) {
  const buf = await readBodyBuffer(req)
  const raw = buf.toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

/**
 * @param {Record<string, string>} env
 */
export function hiringApiDevMiddleware(env) {
  return async (req, res, next) => {
    const pathname = (req.url || '').split('?')[0] || ''
    const host = req.headers.host || 'localhost'
    const url = new URL(req.url || '/', `http://${host}`)

    const sendJson = (status, json) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(json))
    }

    try {
      if (pathname === '/api/apply' && req.method === 'OPTIONS') {
        res.statusCode = 204
        res.setHeader('Allow', 'POST, OPTIONS')
        return res.end()
      }

      if (pathname === '/api/apply' && req.method === 'POST') {
        try {
          const ref = String(req.headers.origin || req.headers.referer || env.SITE_URL || '')
          let origin = env.SITE_URL || 'https://smtechsolutions.in'
          try {
            if (ref) origin = new URL(ref).origin
          } catch {
            /* ignore */
          }
          const ct = req.headers['content-type'] || ''
          if (!String(ct).toLowerCase().includes('multipart/form-data')) {
            return sendJson(400, {
              ok: false,
              error: `Expected multipart/form-data; received: ${ct ? String(ct).slice(0, 80) : '(no Content-Type)'}`,
            })
          }
          const chunks = []
          for await (const c of req) chunks.push(c)
          const buf = Buffer.concat(chunks)
          if (!buf.length) {
            return sendJson(400, { ok: false, error: 'Empty request body' })
          }
          const applyUrl = `http://${host}${req.url || ''}`
          const webReq = new Request(applyUrl, {
            method: 'POST',
            headers: { 'content-type': String(ct) },
            body: buf,
          })
          const fd = await webReq.formData()
          const parsed = await parsedFromWebFormData(fd, MAX_RESUME_BYTES)
          const ip = clientIpFromReq(req)
          const { status, json } = await submitApplicationFromMultipart(parsed, env, { ip, origin })
          return sendJson(status, json)
        } catch (e) {
          console.error('[hiring-api-dev] apply', e)
          const msg = e instanceof Error ? e.message : ''
          const clientMsg =
            msg && (msg.includes('multipart') || msg.includes('Content-Type') || msg.includes('body') || msg.includes('bytes'))
              ? msg
              : 'Could not read application form.'
          return sendJson(400, { ok: false, error: clientMsg })
        }
      }

      if (pathname === '/api/applications' && req.method === 'OPTIONS') {
        res.statusCode = 204
        res.setHeader('Allow', 'GET, OPTIONS')
        return res.end()
      }

      if (pathname === '/api/applications' && req.method === 'GET') {
        try {
          const { status, json } = await listApplications(req, env, url.searchParams)
          return sendJson(status, json)
        } catch (e) {
          const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
          return sendJson(code, { ok: false, error: e instanceof Error ? e.message : 'Error' })
        }
      }

      const resumeMatch = pathname.match(/^\/api\/application\/([^/]+)\/resume$/)
      if (resumeMatch && req.method === 'GET') {
        const id = resumeMatch[1]
        try {
          const out = await getApplicationResume(req, env, id)
          if (out.binary && Buffer.isBuffer(out.binary)) {
            res.statusCode = out.status
            for (const [k, v] of Object.entries(out.headers || {})) {
              res.setHeader(k, v)
            }
            return res.end(out.binary)
          }
          return sendJson(out.status, out.json || { ok: false })
        } catch (e) {
          const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
          return sendJson(code, { ok: false, error: e instanceof Error ? e.message : 'Error' })
        }
      }

      const appMatch = pathname.match(/^\/api\/application\/([^/]+)$/)
      if (appMatch && req.method === 'OPTIONS') {
        res.statusCode = 204
        res.setHeader('Allow', 'GET, PATCH, OPTIONS')
        return res.end()
      }

      if (appMatch && req.method === 'GET') {
        const id = appMatch[1]
        try {
          const { status, json } = await getApplicationById(req, env, id)
          return sendJson(status, json)
        } catch (e) {
          const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
          return sendJson(code, { ok: false, error: e instanceof Error ? e.message : 'Error' })
        }
      }

      if (appMatch && req.method === 'PATCH') {
        const id = appMatch[1]
        try {
          const body = await readJsonBody(req)
          const { status, json } = await patchApplicationStatus(req, env, id, body)
          return sendJson(status, json)
        } catch (e) {
          const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
          return sendJson(code, { ok: false, error: e instanceof Error ? e.message : 'Error' })
        }
      }
    } catch (e) {
      console.error('[hiring-api-dev]', e)
      return sendJson(500, { ok: false, error: 'Hiring API error' })
    }

    next()
  }
}
