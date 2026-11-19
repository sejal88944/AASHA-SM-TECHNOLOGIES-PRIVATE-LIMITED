/**
 * Normalizes JSON returned by `/api/apply` for clients that expect `ok` and/or `success`.
 * @param {Record<string, unknown> | null | undefined} json
 */
export function formatApplyResult(json) {
  if (!json || typeof json !== 'object') {
    return {
      ok: false,
      success: false,
      error: 'Invalid server response',
      message: 'Application submission failed',
      code: 'BAD_RESPONSE',
    }
  }
  const ok = json.ok === true
  if (ok && json.id) {
    return {
      ...json,
      success: true,
      message: typeof json.message === 'string' ? json.message : 'Application submitted successfully.',
    }
  }
  if (ok) {
    return {
      ...json,
      success: true,
      message: typeof json.message === 'string' ? json.message : 'Submitted.',
    }
  }
  const err = typeof json.error === 'string' ? json.error : 'Request failed'
  return {
    ...json,
    success: false,
    message: typeof json.message === 'string' ? json.message : err,
    error: err,
  }
}
