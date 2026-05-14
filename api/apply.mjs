import { submitApplicationFromMultipart } from './lib/apply-core.mjs'
import { parsedFromWebFormData } from './lib/multipart-from-formdata.mjs'
import { MAX_RESUME_BYTES } from './lib/sanitize.mjs'

function clientIpFromRequest(request) {
  const xf = request.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  return 'unknown'
}

/**
 * Vercel: use Web `Request` + `formData()` so multipart is not broken by the
 * legacy Node `IncomingMessage` body helpers / stream consumption.
 * @see https://vercel.com/docs/functions/runtimes/node-js#node.js-request-and-response-objects
 */
export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          Allow: 'POST, OPTIONS',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    if (request.method !== 'POST') {
      return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 })
    }

    const ref = request.headers.get('origin') || request.headers.get('referer') || process.env.SITE_URL || ''
    let origin = process.env.SITE_URL || 'https://smtechsolutions.in'
    try {
      if (ref) origin = new URL(ref).origin
    } catch {
      /* ignore */
    }

    try {
      const ct = request.headers.get('content-type') || ''
      if (!ct.toLowerCase().includes('multipart/form-data')) {
        return Response.json(
          { ok: false, error: `Expected multipart/form-data; received: ${ct ? ct.slice(0, 80) : '(no Content-Type)'}` },
          { status: 400 },
        )
      }

      const fd = await request.formData()
      const parsed = await parsedFromWebFormData(fd, MAX_RESUME_BYTES)
      const ip = clientIpFromRequest(request)
      const { status, json } = await submitApplicationFromMultipart(parsed, process.env, { ip, origin })
      return Response.json(json, { status })
    } catch (e) {
      console.error('[api/apply]', e)
      const msg = e instanceof Error ? e.message : ''
      return Response.json(
        { ok: false, error: msg ? msg.slice(0, 400) : 'Could not read application form.' },
        { status: 400 },
      )
    }
  },
}
