import { MongoClient } from 'mongodb'

const globalForMongo = globalThis

/** Serverless-friendly driver settings (small pool, bounded timeouts). */
const CLIENT_OPTIONS = {
  maxPoolSize: 10,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
}

/**
 * @param {string} uri
 * @returns {string | undefined}
 */
export function defaultDbNameFromUri(uri) {
  const base = uri.split('?')[0] || ''
  const parts = base.split('/')
  const last = parts[parts.length - 1] || ''
  if (!last || last.includes('@')) return undefined
  return decodeURIComponent(last)
}

/**
 * @param {NodeJS.ProcessEnv} env
 */
export function resolveDbName(env) {
  const raw = env.DB_NAME?.trim() || env.MONGODB_DB_NAME?.trim()
  if (raw) return raw
  const uri = env.MONGODB_URI?.trim()
  if (!uri) return 'test'
  return defaultDbNameFromUri(uri) || 'test'
}

/**
 * Shared MongoClient for Atlas (cached on `globalThis` across warm Vercel invocations).
 * @param {string} uri
 */
export async function getMongoClient(uri) {
  if (!globalForMongo._mongoClient) {
    const client = new MongoClient(uri, CLIENT_OPTIONS)
    try {
      await client.connect()
      globalForMongo._mongoClient = client
      console.log('[mongodb] client connected (applications/contact pool)')
    } catch (e) {
      console.error('[mongodb] connect failed', e instanceof Error ? e.message : e)
      console.error('[mongodb] stack', e instanceof Error ? e.stack : '')
      globalForMongo._mongoClient = undefined
      throw e
    }
  }
  return globalForMongo._mongoClient
}

/**
 * @param {NodeJS.ProcessEnv} env
 */
export async function getApplicationsCollection(env) {
  const uri = env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }
  const client = await getMongoClient(uri)
  const dbName = resolveDbName(env)
  const collName = env.MONGODB_APPLICATIONS_COLLECTION?.trim() || 'applications'
  return client.db(dbName).collection(collName)
}
