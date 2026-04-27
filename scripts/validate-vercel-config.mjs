import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))

assert.equal(
  config.installCommand,
  'cd frontend && npm install && cd ../api && npm install',
  'root Vercel deploy must install frontend and api dependencies'
)
assert.equal(
  config.buildCommand,
  'cd frontend && npm run build',
  'root Vercel deploy must build the frontend app'
)
assert.equal(
  config.outputDirectory,
  'frontend/dist',
  'root Vercel deploy must publish the frontend build output'
)

const rewrites = Array.isArray(config.rewrites) ? config.rewrites : []
assert.deepEqual(
  rewrites.slice(0, 2),
  [
    { source: '/sitemap.xml', destination: '/sitemap.xml' },
    { source: '/robots.txt', destination: '/robots.txt' },
  ],
  'sitemap.xml and robots.txt must be served as static files'
)

const spaFallback = rewrites.find((rewrite) => rewrite.destination === '/index.html')
assert.ok(spaFallback, 'SPA fallback rewrite is required')
assert.match(
  spaFallback.source,
  /api\//,
  'SPA fallback must not rewrite serverless API routes'
)
assert.match(
  spaFallback.source,
  /sitemap/,
  'SPA fallback must not rewrite sitemap.xml'
)
assert.match(
  spaFallback.source,
  /robots/,
  'SPA fallback must not rewrite robots.txt'
)
