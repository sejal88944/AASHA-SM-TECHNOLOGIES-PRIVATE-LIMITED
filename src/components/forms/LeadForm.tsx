import { useState, type FormEvent } from 'react'
import { COMPANY } from '../../data/company'

type LeadFormProps = {
  defaultInterest?: string
  /** Shorter variant for sidebars */
  variant?: 'full' | 'compact'
}

export function LeadForm({ defaultInterest = 'General inquiry', variant = 'full' }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      company: String(fd.get('company') || ''),
      interest: String(fd.get('interest') || defaultInterest),
      message: String(fd.get('message') || ''),
      page: window.location.pathname,
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `Request failed (${res.status})`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not submit right now.')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Request Quote</h3>
          <p className="mt-1 text-sm text-slate-600">
            Share context—we respond with next steps. For urgent requests, call{' '}
            <a className="font-semibold text-slate-900 hover:underline" href={`tel:${COMPANY.phoneE164}`}>
              {COMPANY.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <input type="hidden" name="interest" value={defaultInterest} />

        <div className={`grid gap-4 ${variant === 'full' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          <label className="block text-sm">
            <span className="font-medium text-slate-800">Full name</span>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              name="name"
              required
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-800">Work email</span>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </label>
        </div>

        <div className={`grid gap-4 ${variant === 'full' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          <label className="block text-sm">
            <span className="font-medium text-slate-800">Phone</span>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-800">Company</span>
            <input className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4" name="company" autoComplete="organization" />
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-slate-800">Project details</span>
          <textarea
            className="mt-1 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
            name="message"
            required
            placeholder="Goals, timelines, systems involved, and any compliance constraints."
          />
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit inquiry'}
        </button>

        {status === 'success' ? (
          <p className="text-sm font-medium text-emerald-700" role="status">
            Received. Our team will contact you shortly.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {error}{' '}
            <span className="block pt-2 text-slate-600">
              Tip: on local Vite dev, the contact API is not served—use <span className="font-mono">vercel dev</span> or deploy to
              Vercel, or email{' '}
              <a className="font-semibold text-slate-900 hover:underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </form>
    </div>
  )
}
