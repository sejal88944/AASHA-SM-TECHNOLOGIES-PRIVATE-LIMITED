import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed by CORS'))
    },
  })
)
app.use(express.json({ limit: '64kb' }))

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRate = new Map()

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    message: { type: String, required: true },
    source: { type: String, default: 'contact_form' },
    officeAddress: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

const DEFAULT_OFFICE_ADDRESS =
  process.env.OFFICE_ADDRESS?.trim() || 'Nanded Dist., Maharashtra 431717'
const DEFAULT_MAPS_URL =
  process.env.OFFICE_MAPS_URL?.trim() ||
  'https://www.google.com/maps/search/?api=1&query=Nanded%2C%20Maharashtra%20431717'

/** Collection name for Sejal company contact form messages (inside database from URI, e.g. carbook). */
const CONTACTS_COLLECTION = process.env.MONGODB_CONTACTS_COLLECTION || 'sejal_contacts'

function normalizePhoneDigits(raw) {
  let d = String(raw || '').replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return d
}

function validatePayload(body) {
  const out = {}
  const source = String(body?.source || 'contact_form').trim()
  out.source = source === 'popup_lead' ? 'popup_lead' : 'contact_form'
  const name = String(body?.name || '').trim()
  if (name.length < 2 || name.length > 120) {
    return { message: 'Name must be between 2 and 120 characters.' }
  }
  out.name = name

  const phone = normalizePhoneDigits(body?.phone)
  if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
    return { message: 'Please enter a valid 10-digit mobile number.' }
  }
  out.phone = phone

  const email = String(body?.email || '').trim()
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { message: 'Please enter a valid email address.' }
  }
  out.email = email

  const message = String(body?.message || '').trim()
  if (message.length < 10 || message.length > 4000) {
    return { message: 'Message must be between 10 and 4000 characters.' }
  }
  out.message = message

  return { out }
}

function checkRateLimit(req) {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const key = String(ip)
  const now = Date.now()
  const prev = phoneRate.get(key) || { count: 0, start: now }
  if (now - prev.start > 15 * 60 * 1000) {
    phoneRate.set(key, { count: 1, start: now })
    return true
  }
  if (prev.count >= 8) return false
  prev.count += 1
  phoneRate.set(key, prev)
  return true
}

async function main() {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    console.error(`
Missing MONGODB_URI in sejal-api/.env

1. Open MongoDB Atlas → Cluster → Connect → Drivers → Node.js
2. Copy the connection string and paste your database user password
3. Put it in this file on one line:
   MONGODB_URI=mongodb+srv://...
4. Save, then run: npm start
`)
    process.exit(1)
  }

  // Database name comes from the URI path (e.g. .../carbook?...)
  const extra = {}
  if (process.env.MONGODB_DB_NAME?.trim()) {
    extra.dbName = process.env.MONGODB_DB_NAME.trim()
  }
  await mongoose.connect(uri, extra)

  const dbLabel = mongoose.connection.db?.databaseName ?? '(connected)'
  console.log(
    `MongoDB connected — database: ${dbLabel}, collection: ${CONTACTS_COLLECTION}`
  )

  const Contact = mongoose.model('Contact', contactSchema, CONTACTS_COLLECTION)

  app.post('/api/contact', async (req, res) => {
    try {
      if (!checkRateLimit(req)) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' })
      }

      const checked = validatePayload(req.body)
      if (!checked.out) return res.status(400).json({ message: checked.message })
      const { name, phone, email, message, source } = checked.out

      await Contact.create({
        name,
        phone,
        email,
        message,
        source,
        officeAddress: DEFAULT_OFFICE_ADDRESS,
        mapsUrl: DEFAULT_MAPS_URL,
      })

      return res.status(200).json({
        ok: true,
        message:
          'Thank you! Your message has been received. We will get back to you shortly.',
      })
    } catch (err) {
      console.error('contact_api_error', {
        message: err?.message,
        code: err?.code,
        name: err?.name,
      })
      return res.status(500).json({ message: 'Could not save message. Try again later.' })
    }
  })

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      dbState: mongoose.connection.readyState,
      dbName: mongoose.connection.db?.databaseName || null,
      collection: CONTACTS_COLLECTION,
    })
  })

  const port = Number(process.env.PORT) || 4000
  const server = app.listen(port, () => {
    console.log(`Contact API listening on http://localhost:${port}`)
  })
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`
Port ${port} is already in use — usually another "npm start" is still running.

Fix (pick one):
  • Close the other terminal where sejal-api is running, then run npm start again
  • Or use another port:  PORT=4001 npm start   (Git Bash)
  • Windows kill:  netstat -ano | findstr :${port}   then  taskkill /PID <pid> /F
`)
    } else {
      console.error(err)
    }
    process.exit(1)
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
