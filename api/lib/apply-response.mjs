/**
 * Normalizes JSON returned by `/api/apply` for clients that expect `ok` and/or `success`.
 * @param {Record<string, unknown>} json
 */
export function formatApplyResult(json) {
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
