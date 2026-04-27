import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * In dev, answers POST /api/contact so the contact form works without a separate backend.
 * Disable with VITE_CONTACT_MOCK=0 if you use a real API (see README).
 */
function contactApiDevMock(): Plugin {
  return {
    name: 'contact-api-dev-mock',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (path !== '/api/contact' || req.method !== 'POST') {
          next()
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8')
          try {
            if (raw) JSON.parse(raw)
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: 'Invalid JSON body.' }))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              ok: true,
              message:
                'Thank you! Your message has been received. We will get back to you shortly.',
            })
          )
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useContactMock =
    mode === 'development' && env.VITE_CONTACT_MOCK !== '0'

  const apiPort = env.VITE_API_PORT || '4000'
  const proxyToApi =
    mode === 'development' && env.VITE_CONTACT_MOCK === '0'

  const prod = mode === 'production'

  return {
    plugins: [react(), ...(useContactMock ? [contactApiDevMock()] : [])],
    esbuild: prod
      ? { legalComments: 'none', drop: ['console', 'debugger'] as const }
      : undefined,
    build: {
      target: 'es2020',
      cssMinify: true,
      minify: 'esbuild',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/react/')
            ) {
              return 'react-vendor'
            }
          },
        },
      },
    },
    server: {
      // When VITE_CONTACT_MOCK=0, forward /api to sejal-api (see ../sejal-api).
      proxy: proxyToApi
        ? {
            '/api': {
              target: `http://localhost:${apiPort}`,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  }
})
