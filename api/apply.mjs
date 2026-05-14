import { submitApplicationFromMultipart } from './lib/apply-core.mjs'
import { parsedFromWebFormData } from './lib/multipart-from-formdata.mjs'
import { formatApplyResult } from './lib/apply-response.mjs'
import { MAX_RESUME_BYTES } from './lib/sanitize.mjs'

function clientIpFromRequest(request) {
  const xf = request.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  return 'unknown'
}

/**
 * Vercel production: Web `Request` + `formData()` — reliable multipart on the platform.
 * (Classic `handler(req, res)` + `req` stream is often incompatible with Vercel body helpers.)
 */
export default {
  async fetch(request) {
    const url = request.url || ''

    if (request.method === 'GET') {
      return Response.json(
        formatApplyResult({
          ok: true,
          message: 'Apply API is reachable.',
          handler: 'fetch+formData',
          service: 'api/apply',
        }),
        { status: 200 },
      )
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          Allow: 'GET, POST, OPTIONS',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    if (request.method !== 'POST') {
      return Response.json(formatApplyResult({ ok: false, error: 'Method not allowed' }), { status: 405 })
    }

    const ref = request.headers.get('origin') || request.headers.get('referer') || process.env.SITE_URL || ''
    let origin = process.env.SITE_URL || 'https://smtechsolutions.in'
    try {
      if (ref) origin = new URL(ref).origin
    } catch {
      /* ignore */
    }

    console.log('[api/apply] POST begin', { url: url.slice(0, 120), hasMongoUri: Boolean(process.env.MONGODB_URI?.trim()) })

    try {
      const ct = request.headers.get('content-type') || ''
      if (!ct.toLowerCase().includes('multipart/form-data')) {
        return Response.json(
          formatApplyResult({
            ok: false,
            error: `Expected multipart/form-data; received: ${ct ? ct.slice(0, 80) : '(no Content-Type)'}`,
            message: 'Invalid request format',
            code: 'BAD_CONTENT_TYPE',
          }),
          { status: 400 },
        )
      }

      const fd = await request.formData()
      const parsed = await parsedFromWebFormData(fd, MAX_RESUME_BYTES)
      const ip = clientIpFromRequest(request)
      const { status, json } = await submitApplicationFromMultipart(parsed, process.env, { ip, origin })
      console.log('[api/apply] POST end', { status, ok: json?.ok === true })
      return Response.json(formatApplyResult(json), { status })
    } catch (e) {
      console.error('[api/apply] POST error', e instanceof Error ? e.message : e)
      console.error('[api/apply] stack', e instanceof Error ? e.stack : '')
      const msg = e instanceof Error ? e.message.slice(0, 400) : ''
      return Response.json(
        formatApplyResult({
          ok: false,
          success: false,
          error: msg || 'Unexpected error',
          message: 'Application submission failed',
          code: 'UNHANDLED',
        }),
        { status: 500 },
      )
    }
  },
}
