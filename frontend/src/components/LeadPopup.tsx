import { FormEvent, useEffect, useState } from 'react'

type LeadState = {
  name: string
  phone: string
  email: string
  query: string
}

const emptyLead: LeadState = { name: '', phone: '', email: '', query: '' }
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LeadPopup() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')
  const [lead, setLead] = useState<LeadState>(emptyLead)
  const apiUrl =
    (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ?? '/api/contact'

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem('lead-popup-dismissed')
    if (dismissed === '1') return
    const id = window.setTimeout(() => setOpen(true), 9000)
    return () => window.clearTimeout(id)
  }, [])

  function closePopup() {
    setOpen(false)
    window.sessionStorage.setItem('lead-popup-dismissed', '1')
  }

  function validate(): string {
    const phoneDigits = lead.phone.replace(/\D/g, '')
    if (!lead.name.trim()) return 'Please enter your name.'
    if (phoneDigits.length !== 10) return 'Please enter a valid 10-digit phone number.'
    if (!lead.email.trim() || !EMAIL_REGEX.test(lead.email.trim())) {
      return 'Please enter a valid email address.'
    }
    if (lead.query.trim().length < 8) return 'Please add a short query.'
    return ''
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('')
    const err = validate()
    if (err) {
      setStatus(err)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name.trim(),
          phone: lead.phone.replace(/\D/g, ''),
          email: lead.email.trim(),
          message: lead.query.trim(),
          source: 'popup_lead',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { message?: string }
      if (!res.ok) {
        setStatus(data.message || 'Could not submit. Please try again.')
        return
      }
      setStatus('Thank you! We will contact you shortly.')
      setLead(emptyLead)
      window.setTimeout(closePopup, 1200)
    } catch {
      setStatus('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-950">Get Consultation</h3>
            <p className="mt-1 text-sm text-slate-600">
              Share your query. Our team will call you back quickly.
            </p>
          </div>
          <button
            type="button"
            onClick={closePopup}
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close lead popup"
          >
            ×
          </button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-900"
            placeholder="Name"
            value={lead.name}
            onChange={(e) => setLead((v) => ({ ...v, name: e.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-900"
            placeholder="Phone"
            value={lead.phone}
            onChange={(e) =>
              setLead((v) => ({ ...v, phone: e.target.value.replace(/[^\d+\s-]/g, '') }))
            }
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-900"
            placeholder="Email"
            value={lead.email}
            onChange={(e) => setLead((v) => ({ ...v, email: e.target.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-900"
            rows={3}
            placeholder="Query"
            value={lead.query}
            onChange={(e) => setLead((v) => ({ ...v, query: e.target.value }))}
          />
          {status && <p className="text-sm text-slate-700">{status}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
