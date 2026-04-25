import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(cors())
app.use(express.json())

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    message: { type: String, required: true },
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
      const { name, phone, email, message, officeAddress, mapsUrl } = req.body || {}
      if (!name?.trim() || !phone?.trim() || !message?.trim()) {
        return res.status(400).json({
          message: 'Name, phone, and message are required.',
        })
      }

      await Contact.create({
        name: name.trim(),
        phone: String(phone).replace(/\D/g, ''),
        email: (email && String(email).trim()) || '',
        message: message.trim(),
        officeAddress: (officeAddress && String(officeAddress).trim()) || DEFAULT_OFFICE_ADDRESS,
        mapsUrl: (mapsUrl && String(mapsUrl).trim()) || DEFAULT_MAPS_URL,
      })

      return res.status(200).json({
        ok: true,
        message: 'Thank you! Your message has been saved.',
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Could not save message. Try again later.' })
    }
  })

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
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
