/**
 * Standalone Express server for hiring APIs (VPS / Docker / PM2).
 * Same routes as Vercel `api/*.mjs`. Run: `node server/hiring-server.mjs`
 * Set PORT (default 5050). Use reverse proxy from your domain /api → this server.
 */
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import rateLimit from 'express-rate-limit'
import {
  clientIpFromReq,
  getApplicationById,
  getApplicationResume,
  listApplications,
  patchApplicationStatus,
  submitApplicationFromMultipart,
} from '../api/lib/apply-core.mjs'
import { MAX_RESUME_BYTES } from '../api/lib/sanitize.mjs'

const app = express()
const port = Number(process.env.HIRING_SERVER_PORT || process.env.PORT || 5050)

app.set('trust proxy', 1)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
)

const applyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES, files: 1 },
})

app.post('/api/apply', applyLimiter, upload.single('resume'), async (req, res) => {
  try {
    /** @type {Record<string, string | string[]>} */
    const fields = {}
    for (const [k, v] of Object.entries(req.body || {})) {
      if (v === undefined || v === null) continue
      fields[k] = Array.isArray(v) ? v.map(String) : String(v)
    }
    const files = []
    if (req.file) {
      files.push({
        buffer: req.file.buffer,
        mime: req.file.mimetype,
        originalname: req.file.originalname,
      })
    }
    const { status, json } = await submitApplicationFromMultipart({ fields, files }, process.env, {
      ip: clientIpFromReq(req),
    })
    return res.status(status).json(json)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
})

app.get('/api/applications', async (req, res) => {
  try {
    const url = new URL(req.originalUrl || '/', `http://${req.headers.host || 'localhost'}`)
    const { status, json } = await listApplications(req, process.env, url.searchParams)
    return res.status(status).json(json)
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
})

app.get('/api/application/:id', async (req, res) => {
  try {
    const { status, json } = await getApplicationById(req, process.env, req.params.id)
    return res.status(status).json(json)
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
})

app.patch('/api/application/:id', express.json(), async (req, res) => {
  try {
    const { status, json } = await patchApplicationStatus(req, process.env, req.params.id, req.body)
    return res.status(status).json(json)
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
})

app.get('/api/application/:id/resume', async (req, res) => {
  try {
    const out = await getApplicationResume(req, process.env, req.params.id)
    if (out.binary && Buffer.isBuffer(out.binary)) {
      res.status(out.status)
      for (const [k, v] of Object.entries(out.headers || {})) {
        res.setHeader(k, v)
      }
      return res.end(out.binary)
    }
    return res.status(out.status).json(out.json || { ok: false })
  } catch (e) {
    const code = /** @type {{ statusCode?: number }} */ (e).statusCode || 500
    return res.status(code).json({ ok: false, error: e instanceof Error ? e.message : 'Error' })
  }
})

app.listen(port, () => {
  console.log(`[hiring-server] listening on http://127.0.0.1:${port}`)
})
