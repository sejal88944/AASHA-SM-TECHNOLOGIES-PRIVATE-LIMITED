import test from 'node:test'
import assert from 'node:assert/strict'
import { Binary } from 'mongodb'
import { resumeDataToBuffer } from '../api/lib/apply-core.mjs'

test('resumeDataToBuffer normalizes BSON Binary resume data', () => {
  const binary = new Binary(Buffer.from('resume bytes'))
  const out = resumeDataToBuffer(binary)

  assert.ok(Buffer.isBuffer(out))
  assert.equal(out.toString('utf8'), 'resume bytes')
})

test('resumeDataToBuffer keeps existing Buffers streamable', () => {
  const original = Buffer.from('pdf')
  const out = resumeDataToBuffer(original)

  assert.strictEqual(out, original)
})

test('resumeDataToBuffer rejects missing data', () => {
  assert.equal(resumeDataToBuffer(null), null)
  assert.equal(resumeDataToBuffer('not binary'), null)
})
