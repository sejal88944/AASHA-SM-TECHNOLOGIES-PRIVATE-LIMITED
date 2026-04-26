/**
 * Vercel serverless: POST /api/contact — same contract as sejal-api.
 * Set MONGODB_URI in Vercel → Environment Variables (Production).
 */
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    message: { type: String, required: true },
    officeAddress: { type: String, default: "" },
    mapsUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const DEFAULT_OFFICE_ADDRESS =
  process.env.OFFICE_ADDRESS?.trim() || "Nanded Dist., Maharashtra 431717";
const DEFAULT_MAPS_URL =
  process.env.OFFICE_MAPS_URL?.trim() ||
  "https://www.google.com/maps/search/?api=1&query=Nanded%2C%20Maharashtra%20431717";

const CONTACTS_COLLECTION =
  process.env.MONGODB_CONTACTS_COLLECTION || "sejal_contacts";

function getMongoUri() {
  return (
    process.env.MONGODB_URI?.trim() ||
    process.env.MONGO_URL?.trim() ||
    process.env.MONGO_URI?.trim() ||
    ""
  );
}

async function connect() {
  const uri = getMongoUri();
  if (!uri) {
    const err = new Error("MONGODB_URI is not configured");
    err.statusCode = 500;
    throw err;
  }

  if (!globalThis._mongooseContactCache) {
    globalThis._mongooseContactCache = { conn: null, promise: null };
  }
  const cache = globalThis._mongooseContactCache;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const extra = {};
    if (process.env.MONGODB_DB_NAME?.trim()) {
      extra.dbName = process.env.MONGODB_DB_NAME.trim();
    }
    cache.promise = mongoose.connect(uri, extra);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connect();
    const Contact =
      mongoose.models.Contact ||
      mongoose.model("Contact", contactSchema, CONTACTS_COLLECTION);

    const { name, phone, email, message, officeAddress, mapsUrl } = req.body || {};
    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "Name, phone, and message are required.",
      });
    }

    await Contact.create({
      name: name.trim(),
      phone: String(phone).replace(/\D/g, ""),
      email: (email && String(email).trim()) || "",
      message: message.trim(),
      officeAddress:
        (officeAddress && String(officeAddress).trim()) || DEFAULT_OFFICE_ADDRESS,
      mapsUrl: (mapsUrl && String(mapsUrl).trim()) || DEFAULT_MAPS_URL,
    });

    return res.status(200).json({
      ok: true,
      message:
        "Thank you! Your message has been received. We will get back to you shortly.",
    });
  } catch (err) {
    console.error(err);
    const code = err.statusCode || 500;
    if (code === 500 && err.message?.includes("MONGODB_URI")) {
      return res.status(500).json({
        message:
          "Database is not configured. In Vercel add MONGODB_URI (MongoDB Atlas) and redeploy.",
      });
    }
    return res.status(500).json({
      message: "Could not save message. Try again later.",
    });
  }
};
