import assert from 'node:assert/strict'
import test from 'node:test'

import { executeContactForm } from '../api/contact-core.mjs'

const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Please contact me about a project.',
}

test('contact submissions fail closed when no persistence backend is configured', async () => {
  let mongoRequested = false

  const result = await executeContactForm(validBody, {}, {
    getMongoClient: async () => {
      mongoRequested = true
      throw new Error('unexpected mongo connection')
    },
  })

  assert.equal(result.status, 503)
  assert.equal(result.json.ok, false)
  assert.equal(mongoRequested, false)
})

test('contact submissions use the configured Mongo database and collection', async () => {
  const calls = []

  const result = await executeContactForm(
    validBody,
    {
      MONGODB_URI: 'mongodb+srv://user:pass@example.mongodb.net/default_db',
      DB_NAME: 'production_db',
      MONGODB_CONTACTS_COLLECTION: 'contact_leads',
    },
    {
      getMongoClient: async (uri) => {
        calls.push({ type: 'client', uri })
        return {
          db(dbName) {
            calls.push({ type: 'db', dbName })
            return {
              collection(collectionName) {
                calls.push({ type: 'collection', collectionName })
                return {
                  async insertOne(doc) {
                    calls.push({ type: 'insertOne', doc })
                    return { insertedId: 'lead-1' }
                  },
                }
              },
            }
          },
        }
      },
    },
  )

  assert.equal(result.status, 200)
  assert.equal(result.json.ok, true)
  assert.deepEqual(
    calls.map((call) => ({ type: call.type, dbName: call.dbName, collectionName: call.collectionName })),
    [
      { type: 'client', dbName: undefined, collectionName: undefined },
      { type: 'db', dbName: 'production_db', collectionName: undefined },
      { type: 'collection', dbName: undefined, collectionName: 'contact_leads' },
      { type: 'insertOne', dbName: undefined, collectionName: undefined },
    ],
  )
  assert.equal(calls[0].uri, 'mongodb+srv://user:pass@example.mongodb.net/default_db')
  assert.equal(calls[3].doc.email, validBody.email)
})
