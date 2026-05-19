import assert from 'node:assert/strict'
import { test } from 'node:test'
import { Binary } from 'mongodb'
import { resumeDataToBuffer } from '../api/lib/apply-core.mjs'

test('resumeDataToBuffer preserves Node Buffer resume data', () => {
  const original = Buffer.from('resume-pdf-bytes')
  const normalized = resumeDataToBuffer(original)

  assert.ok(Buffer.isBuffer(normalized))
  assert.equal(normalized?.toString('utf8'), 'resume-pdf-bytes')
})

test('resumeDataToBuffer converts BSON Binary returned by MongoDB', () => {
  const binary = new Binary(Buffer.from('stored-docx-bytes'))
  const normalized = resumeDataToBuffer(binary)

  assert.ok(Buffer.isBuffer(normalized))
  assert.equal(normalized?.toString('utf8'), 'stored-docx-bytes')
})
