/** Simple in-memory rate limiter (best-effort; resets on cold starts in serverless). */

const buckets = new Map()

/**
 * @param {string} key
 * @param {{ windowMs: number; max: number }} opts
 * @returns {{ ok: true } | { ok: false; retryAfterSec: number }}
 */
export function rateLimitConsume(key, opts) {
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs })
    return { ok: true }
  }
  if (b.count >= opts.max) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) }
  }
  b.count += 1
  return { ok: true }
}

/**
 * @param {import('http').IncomingMessage} req
 */
export function clientIpFromReq(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) {
    return xf.split(',')[0].trim()
  }
  if (Array.isArray(xf) && xf[0]) {
    return xf[0].split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}
