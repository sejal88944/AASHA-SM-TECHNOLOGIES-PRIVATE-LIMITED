import assert from 'node:assert/strict'
import test from 'node:test'
import { Binary } from 'mongodb'
import { resumeDataToBuffer, trustedSiteOrigin } from '../api/lib/apply-core.mjs'

test('resumeDataToBuffer streams BSON Binary resume data from MongoDB', () => {
  const stored = new Binary(Buffer.from('resume-bytes'))

  const out = resumeDataToBuffer(stored)

  assert.ok(Buffer.isBuffer(out))
  assert.equal(out.toString('utf8'), 'resume-bytes')
})

test('resumeDataToBuffer keeps existing buffers streamable', () => {
  const stored = Buffer.from('already-buffer')

  const out = resumeDataToBuffer(stored)

  assert.ok(Buffer.isBuffer(out))
  assert.equal(out.toString('utf8'), 'already-buffer')
})

test('resumeDataToBuffer rejects unsupported payloads', () => {
  assert.equal(resumeDataToBuffer('not-binary'), null)
})

test('trustedSiteOrigin ignores request-controlled origins', () => {
  assert.equal(
    trustedSiteOrigin({
      SITE_URL: 'https://smtechsolutions.in/careers',
      VITE_SITE_URL: 'https://preview.example.test',
      ORIGIN: 'https://attacker.example',
    }),
    'https://smtechsolutions.in',
  )
})
