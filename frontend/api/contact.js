/**
 * Vercel serverless: POST /api/contact — same contract as sejal-api.
 * If Vercel Root Directory is repo root, ../../api/contact.js is the copy to sync.
 * Set MONGODB_URI in Vercel → Environment Variables (Production).
 */
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    message: { type: String, required: true },
    source: { type: String, default: "contact_form" },
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
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function normalizePhoneDigits(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

function validatePayload(body) {
  const out = {};
  const source = String(body?.source || "contact_form").trim();
  out.source = source === "popup_lead" ? "popup_lead" : "contact_form";
  const name = String(body?.name || "").trim();
  if (name.length < 2 || name.length > 120) {
    return { message: "Name must be between 2 and 120 characters." };
  }
  out.name = name;

  const phone = normalizePhoneDigits(body?.phone);
  if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
    return { message: "Please enter a valid 10-digit mobile number." };
  }
  out.phone = phone;

  const email = String(body?.email || "").trim();
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { message: "Please enter a valid email address." };
  }
  out.email = email;

  const message = String(body?.message || "").trim();
  if (message.length < 10 || message.length > 4000) {
    return { message: "Message must be between 10 and 4000 characters." };
  }
  out.message = message;

  return { out };
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

    const checked = validatePayload(req.body);
    if (!checked.out) return res.status(400).json({ message: checked.message });
    const { name, phone, email, message, source } = checked.out;

    await Contact.create({
      name,
      phone,
      email,
      message,
      source,
      officeAddress: DEFAULT_OFFICE_ADDRESS,
      mapsUrl: DEFAULT_MAPS_URL,
    });

    return res.status(200).json({
      ok: true,
      message:
        "Thank you! Your message has been received. We will get back to you shortly.",
    });
  } catch (err) {
    console.error("contact_api_error", {
      message: err?.message,
      code: err?.code,
      name: err?.name,
    });
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
