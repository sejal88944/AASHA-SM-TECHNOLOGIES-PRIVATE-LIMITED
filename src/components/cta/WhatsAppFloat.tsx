import { COMPANY } from '../../data/company'

const waNumber = COMPANY.phoneE164.replace('+', '')

export function WhatsAppFloat() {
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello ${COMPANY.brandName}, I'd like a free consultation about a project.`
  )}`

  return (
    <a
      href={href}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-500"
      rel="noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp"
    >
      <span aria-hidden>💬</span>
      WhatsApp
    </a>
  )
}
