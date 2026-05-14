import { COMPANY } from '../../data/company'

const waNumber = COMPANY.phoneE164.replace('+', '')

export function WhatsAppFloat() {
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello ${COMPANY.brandName}, I'd like a free consultation about a project.`
  )}`

  return (
    <a
      href={href}
      className="fixed bottom-4 right-4 z-50 inline-flex max-w-[calc(100vw-1.25rem)] items-center gap-2 rounded-full bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-sm"
      rel="noopener noreferrer"
      target="_blank"
      aria-label="Chat on WhatsApp"
    >
      <span aria-hidden>💬</span>
      <span className="truncate sm:max-w-none">WhatsApp</span>
    </a>
  )
}
