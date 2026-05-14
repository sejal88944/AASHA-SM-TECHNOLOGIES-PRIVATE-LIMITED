import { MongoClient } from 'mongodb'

const globalForMongo = globalThis

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
 * @param {NodeJS.ProcessEnv} env
 */
export async function getMongoClient(uri) {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri)
    await globalForMongo._mongoClient.connect()
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
