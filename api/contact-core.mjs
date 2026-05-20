import { getMongoClient, resolveDbName } from './lib/mongo-shared.mjs'

/**
 * @param {unknown} body
 * @param {NodeJS.ProcessEnv} env
 * @param {{ getMongoClient?: typeof getMongoClient }} [deps]
 * @returns {Promise<{ status: number; json: Record<string, unknown> }>}
 */
export async function executeContactForm(body, env, deps = {}) {
  if (!body || typeof body !== 'object') {
    return { status: 400, json: { ok: false, error: 'Invalid JSON body' } }
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  const phone = String(body.phone || '').trim()
  const company = String(body.company || '').trim()
  const interest = String(body.interest || '').trim()
  const page = String(body.page || '').trim()

  if (!name || !email || !message) {
    return { status: 400, json: { ok: false, error: 'Missing required fields' } }
  }
  if (!isEmail(email)) {
    return { status: 400, json: { ok: false, error: 'Invalid email' } }
  }

  const payload = {
    name,
    email,
    phone,
    company,
    interest,
    page,
    message,
    receivedAt: new Date().toISOString(),
  }

  const uri = env.MONGODB_URI?.trim()
  const webhookUrl = env.CONTACT_WEBHOOK_URL?.trim()
  if (!uri && !webhookUrl) {
    console.error('[contact] no persistence backend configured')
    return { status: 503, json: { ok: false, error: 'Contact form is temporarily unavailable. Try again later.' } }
  }

  if (uri) {
    try {
      await saveContactToMongo(uri, {
        name,
        phone,
        email,
        message,
        source: 'smtech_website',
        officeAddress: env.OFFICE_ADDRESS?.trim() || '',
        mapsUrl: env.OFFICE_MAPS_URL?.trim() || '',
        company,
        interest,
        page,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, env, deps.getMongoClient)
    } catch (err) {
      console.error('[contact] mongodb', err?.message || err)
      return { status: 500, json: { ok: false, error: 'Could not save message. Try again later.' } }
    }
  }

  if (webhookUrl) {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!r.ok) {
      return { status: 502, json: { ok: false, error: 'Downstream webhook failed' } }
    }
  }

  return { status: 200, json: { ok: true } }
}

async function saveContactToMongo(uri, doc, env, getClient = getMongoClient) {
  const client = await getClient(uri)
  const dbName = resolveDbName(env)
  const collectionName = env.MONGODB_CONTACTS_COLLECTION?.trim() || 'sejal_contacts'
  await client.db(dbName).collection(collectionName).insertOne(doc)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
