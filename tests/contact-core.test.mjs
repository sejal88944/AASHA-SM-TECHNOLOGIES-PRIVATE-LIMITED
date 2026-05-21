import test from 'node:test'
import assert from 'node:assert/strict'

import { executeContactForm } from '../api/contact-core.mjs'

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'Please contact me about a project.',
}

test('contact submissions fail closed when no durable sink is configured', async () => {
  const originalError = console.error
  console.error = () => {}
  try {
    const result = await executeContactForm(validBody, {})

    assert.equal(result.status, 503)
    assert.equal(result.json.ok, false)
  } finally {
    console.error = originalError
  }
})

test('contact Mongo writes honor DB_NAME overrides', async () => {
  const calls = []
  globalThis._mongoClient = {
    db(dbName) {
      calls.push({ dbName })
      return {
        collection(collectionName) {
          calls[calls.length - 1].collectionName = collectionName
          return {
            async insertOne(doc) {
              calls[calls.length - 1].doc = doc
              return { insertedId: 'contact-1' }
            },
          }
        },
      }
    },
  }

  try {
    const result = await executeContactForm(validBody, {
      MONGODB_URI: 'mongodb://localhost:27017/from-uri',
      DB_NAME: 'configured-db',
      MONGODB_CONTACTS_COLLECTION: 'contacts',
    })

    assert.equal(result.status, 200)
    assert.equal(result.json.ok, true)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].dbName, 'configured-db')
    assert.equal(calls[0].collectionName, 'contacts')
    assert.equal(calls[0].doc.email, validBody.email)
  } finally {
    delete globalThis._mongoClient
  }
})
