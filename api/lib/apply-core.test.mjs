import assert from 'node:assert/strict'
import { test } from 'node:test'
import { Binary } from 'mongodb'
import { resumeDataToBuffer } from './apply-core.mjs'

test('resumeDataToBuffer returns existing Buffer values unchanged', () => {
  const input = Buffer.from('resume bytes')

  const out = resumeDataToBuffer(input)

  assert.strictEqual(out, input)
})

test('resumeDataToBuffer converts BSON Binary values returned by MongoDB', () => {
  const input = new Binary(Buffer.from('resume bytes'))

  const out = resumeDataToBuffer(input)

  assert.ok(Buffer.isBuffer(out))
  assert.equal(out.toString('utf8'), 'resume bytes')
})

test('resumeDataToBuffer converts Uint8Array values', () => {
  const input = new Uint8Array([114, 101, 115, 117, 109, 101])

  const out = resumeDataToBuffer(input)

  assert.ok(Buffer.isBuffer(out))
  assert.equal(out.toString('utf8'), 'resume')
})

test('resumeDataToBuffer rejects missing or unsupported values', () => {
  assert.equal(resumeDataToBuffer(null), null)
  assert.equal(resumeDataToBuffer('resume bytes'), null)
})
