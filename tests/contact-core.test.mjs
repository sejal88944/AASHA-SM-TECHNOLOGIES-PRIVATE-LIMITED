import assert from 'node:assert/strict'
import { test } from 'node:test'
import { executeContactForm } from '../api/contact-core.mjs'

const validLead = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'I need help with an implementation.',
}

test('contact form fails loudly when no persistence backend is configured', async () => {
  const result = await executeContactForm(validLead, {})

  assert.equal(result.status, 503)
  assert.equal(result.json.ok, false)
})
