/** Replace with your WhatsApp number: country code + digits only (e.g. 91 + 10 digits). */
export const WHATSAPP_PHONE = "919999999999";

export const CONTACT_EMAIL = "wattamwarsejal@gmail.com";

/** Base URL of sejal-api (no trailing slash). Set in .env — see .env.development */
export function getContactApiUrl() {
  const base = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
  if (!base) return null;
  return `${base}/api/contact`;
}

export function getWhatsAppUrl() {
  const phone = WHATSAPP_PHONE.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hello SM Tech Solutions, I would like to know more about your services."
  );
  return `https://wa.me/${phone}?text=${text}`;
}
