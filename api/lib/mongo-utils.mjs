/**
 * Remove `undefined` values so MongoDB inserts never carry invalid BSON fields.
 * @param {Record<string, unknown>} obj
 */
export function stripUndefined(obj) {
  /** @type {Record<string, unknown>} */
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v
  }
  return out
}

/**
 * Map Mongo / network errors to a safe client-facing string (details stay in logs).
 * @param {unknown} e
 */
export function mongoErrorToClientMessage(e) {
  const m = String(e instanceof Error ? e.message : e || '')
  if (/MONGODB_URI is not configured/i.test(m)) return 'Server configuration error. Please contact support.'
  if (/ECONNREFUSED|ENOTFOUND|getaddrinfo|timed out|Server selection|SSL|TLS|authentication failed/i.test(m)) {
    return 'Database temporarily unavailable. Please try again in a few minutes.'
  }
  if (/too large|maximum.*size|BSON|16793/i.test(m)) return 'Attachment or form data is too large. Try a smaller resume.'
  return 'Could not save application. Please try again later.'
}
