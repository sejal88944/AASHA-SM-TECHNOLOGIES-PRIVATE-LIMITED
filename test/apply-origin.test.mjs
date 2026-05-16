import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveTrustedSiteOrigin } from '../api/lib/apply-core.mjs'
import { adminNotificationHtml } from '../api/lib/email-hiring.mjs'

test('admin email origin ignores client-controlled request origin when SITE_URL is configured', () => {
  const origin = resolveTrustedSiteOrigin(
    { SITE_URL: 'https://smtechsolutions.in/' },
    { origin: 'https://evil.example' },
  )

  assert.equal(origin, 'https://smtechsolutions.in')
  const html = adminNotificationHtml({ _id: 'app-1' }, origin)
  assert.match(html, /https:\/\/smtechsolutions\.in\/admin\/hiring/)
  assert.doesNotMatch(html, /evil\.example/)
})

test('admin email origin falls back to production default instead of request origin', () => {
  assert.equal(
    resolveTrustedSiteOrigin({}, { origin: 'https://evil.example' }),
    'https://smtechsolutions.in',
  )
})

test('admin email origin rejects invalid configured URL', () => {
  assert.equal(resolveTrustedSiteOrigin({ SITE_URL: 'javascript:alert(1)' }), 'https://smtechsolutions.in')
})
