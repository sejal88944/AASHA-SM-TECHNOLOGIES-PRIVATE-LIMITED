/**
 * Vercel serverless: POST /api/contact — same contract as sejal-api.
 * Set MONGODB_URI (and optional MONGODB_DB_NAME, MONGODB_CONTACTS_COLLECTION) in Vercel project env.
 */
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

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

  if (!global._mongooseContactCache) {
    global._mongooseContactCache = { conn: null, promise: null };
  }
  const cache = global._mongooseContactCache;

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

    const { name, phone, email, message } = req.body || {};
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await Contact.create({
      name: name.trim(),
      phone: String(phone).replace(/\D/g, ""),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(200).json({
      ok: true,
      message: "Thank you! Your message has been saved.",
    });
  } catch (err) {
    console.error(err);
    const code = err.statusCode || 500;
    if (code === 500 && err.message?.includes("MONGODB_URI")) {
      return res.status(500).json({
        message:
          "Database URL is missing on the server. In Vercel: Project → Settings → Environment Variables → add MONGODB_URI (same value as Atlas), tick Production (and Preview if you test preview URLs), Save, then Redeploy. Name must be exactly MONGODB_URI or MONGO_URL.",
      });
    }
    return res.status(500).json({
      message: "Could not save message. Try again later.",
    });
  }
};
