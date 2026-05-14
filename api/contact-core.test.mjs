import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { executeContactForm } from './contact-core.mjs'

const originalFetch = globalThis.fetch
const originalConsoleError = console.error

afterEach(() => {
  globalThis.fetch = originalFetch
  console.error = originalConsoleError
})

const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Please help with a new project.',
}

test('rejects valid submissions when no delivery sink is configured', async () => {
  const errors = []
  console.error = (...args) => errors.push(args)
  globalThis.fetch = async () => {
    throw new Error('fetch should not be called without a webhook URL')
  }

  const result = await executeContactForm(validBody, {})

  assert.equal(result.status, 503)
  assert.equal(result.json.ok, false)
  assert.match(String(result.json.error), /not configured/i)
  assert.equal(errors.length, 1)
})

test('accepts a submission after a configured webhook succeeds', async () => {
  const requests = []
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options })
    return new Response(null, { status: 204 })
  }

  const result = await executeContactForm(
    { ...validBody, name: '  Ada Lovelace  ', company: 'Example Co' },
    { CONTACT_WEBHOOK_URL: ' https://hooks.example.test/leads ' },
  )

  assert.deepEqual(result, { status: 200, json: { ok: true } })
  assert.equal(requests.length, 1)
  assert.equal(requests[0].url, 'https://hooks.example.test/leads')
  assert.equal(requests[0].options.method, 'POST')
  assert.equal(requests[0].options.headers['content-type'], 'application/json')
  assert.equal(JSON.parse(requests[0].options.body).name, 'Ada Lovelace')
})

test('reports webhook failure when it is the only configured delivery sink', async () => {
  const errors = []
  console.error = (...args) => errors.push(args)
  globalThis.fetch = async () => new Response('nope', { status: 500 })

  const result = await executeContactForm(validBody, {
    CONTACT_WEBHOOK_URL: 'https://hooks.example.test/leads',
  })

  assert.equal(result.status, 502)
  assert.equal(result.json.ok, false)
  assert.match(String(result.json.error), /webhook/i)
  assert.equal(errors.length, 1)
})
