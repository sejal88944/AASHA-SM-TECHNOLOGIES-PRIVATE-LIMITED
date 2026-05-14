/**
 * @param {NodeJS.ProcessEnv} env
 * @param {import('http').IncomingMessage} req
 */
export function assertHiringAdmin(env, req) {
  const secret = env.HIRING_ADMIN_SECRET?.trim()
  if (!secret) {
    const err = new Error('HIRING_ADMIN_SECRET is not configured')
    err.statusCode = 503
    throw err
  }
  const auth = req.headers.authorization || ''
  const expected = `Bearer ${secret}`
  if (auth !== expected) {
    const err = new Error('Unauthorized')
    err.statusCode = 401
    throw err
  }
}
