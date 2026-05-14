import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin, type Connect } from 'vite'

/** Read POST body from Connect / Node request */
function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

/** Serves hiring APIs during dev (multipart apply + admin JSON). */
function hiringApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'hiring-api-dev',
    async configureServer(server) {
      // @ts-expect-error — dev-only ESM middleware (no ambient types)
      const { hiringApiDevMiddleware } = await import('./scripts/hiring-vite-middleware.mjs')
      server.middlewares.use(hiringApiDevMiddleware(env))
    },
  }
}

/** Serves POST /api/contact during `npm run dev` using the same logic as `api/contact.mjs` + `.env` */
function contactApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || '').split('?')[0] || ''
        if (pathname !== '/api/contact') {
          return next()
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.setHeader('Allow', 'POST, OPTIONS')
          return res.end()
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
        }

        let raw: string
        try {
          raw = await readBody(req)
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: false, error: 'Could not read body' }))
        }

        let parsed: unknown
        try {
          parsed = raw ? JSON.parse(raw) : null
        } catch {
          parsed = null
        }

        try {
          // @ts-expect-error — sibling ESM handler; not part of app tsconfig paths
          const { executeContactForm } = await import('./api/contact-core.mjs')
          const { status, json } = await executeContactForm(parsed, env)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(json))
        } catch (e) {
          console.error('[contact-api-dev]', e)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: false, error: 'Contact handler failed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [hiringApiDevPlugin(env), contactApiDevPlugin(env), react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react-vendor'
            }
            if (id.includes('node_modules/react-router')) {
              return 'router'
            }
            if (id.includes('node_modules/react-helmet-async')) {
              return 'helmet'
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  }
})
