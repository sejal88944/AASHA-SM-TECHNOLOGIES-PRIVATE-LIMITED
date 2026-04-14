/** Replace with your WhatsApp number: country code + digits only (e.g. 91 + 10 digits). */
export const WHATSAPP_PHONE = "8446218623";

export const CONTACT_EMAIL = "adminsmtechsolution@gmail.com";

const DEFAULT_DEV_API = "http://localhost:4000";

/**
 * Contact POST URL. Order:
 * 1) REACT_APP_API_URL (from .env / Vercel / Render build env)
 * 2) Production: same origin /api/contact — Vercel serverless `api/contact.js`
 * 3) Development fallback: sejal-api on port 4000
 */
export function getContactApiUrl() {
  const explicit = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
  if (explicit) return `${explicit}/api/contact`;

  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined" && window.location?.origin) {
      return `${window.location.origin}/api/contact`;
    }
    return "/api/contact";
  }

  const devBase = DEFAULT_DEV_API.replace(/\/$/, "");
  return `${devBase}/api/contact`;
}

export function getWhatsAppUrl() {
  const phone = WHATSAPP_PHONE.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hello SM Tech Solutions, I would like to know more about your services."
  );
  return `https://wa.me/${phone}?text=${text}`;
}
