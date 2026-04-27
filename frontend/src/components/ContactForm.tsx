import { FormEvent, useRef, useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormState = {
  name: string
  phone: string
  email: string
  message: string
}

const emptyForm: FormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const LIMITS = {
  name: 120,
  message: 4000,
} as const

type FieldErrors = Partial<Record<keyof FormState, string>>

function messageFromJson(data: unknown, fallback: string): string {
  if (data && typeof data === 'object' && data !== null && 'message' in data) {
    const m = (data as { message: unknown }).message
    if (typeof m === 'string' && m.trim()) return m
  }
  return fallback
}

/** Digits only, 10-digit Indian mobile after optional +91 / leading 0. */
function normalizePhoneDigits(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return d
}

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {}
  const name = values.name.trim()
  if (!name) errors.name = 'Name is required.'
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.'
  else if (name.length > LIMITS.name)
    errors.name = `Name must be at most ${LIMITS.name} characters.`

  const digits = normalizePhoneDigits(values.phone)
  if (!values.phone.trim()) errors.phone = 'Phone is required.'
  else if (digits.length !== 10) errors.phone = 'Enter a valid 10-digit mobile number.'
  else if (!/^[6-9]/.test(digits))
    errors.phone = 'Enter a valid Indian mobile number (starts with 6–9).'

  const email = values.email.trim()
  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Enter a valid email address.'
  else if (email.length > 254) errors.email = 'Email is too long.'

  const msg = values.message.trim()
  if (!msg) errors.message = 'Message is required.'
  else if (msg.length < 10)
    errors.message = 'Please write at least 10 characters so we can help you.'
  else if (msg.length > LIMITS.message)
    errors.message = `Message must be at most ${LIMITS.message} characters.`

  return errors
}

const labelCls = 'mb-2 block text-sm font-medium text-brand-950'

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-900/15'

const inputNormal =
  'border-slate-200 focus:border-brand-900 focus:shadow-[0_0_0_3px_rgba(23,37,84,0.08)]'

const inputError =
  'border-red-300 focus:border-red-500 focus:ring-red-500/20'

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {}
  )
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<
    { type: 'success'; text: string } | { type: 'error'; text: string } | null
  >(null)

  const successRef = useRef<HTMLDivElement>(null)

  const apiUrl =
    (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ?? '/api/contact'

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setStatus(null)
    setErrors((e) => {
      if (!e[field]) return e
      const next = { ...e }
      delete next[field]
      return next
    })
  }

  function handleBlur(field: keyof FormState) {
    setTouched((t) => ({ ...t, [field]: true }))
    let nextForm = form
    if (field === 'email') {
      const trimmed = form.email.trim()
      if (trimmed !== form.email) {
        nextForm = { ...form, email: trimmed }
        setForm(nextForm)
      }
    }
    const v = validate(nextForm)
    setErrors((prev) => {
      const next = { ...prev }
      if (v[field]) next[field] = v[field]
      else delete next[field]
      return next
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(null)

    const validation = validate(form)
    setErrors(validation)
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    })

    if (Object.keys(validation).length > 0) return

    setLoading(true)
    const payload = {
      name: form.name.trim(),
      phone: normalizePhoneDigits(form.phone),
      email: form.email.trim(),
      message: form.message.trim(),
    }

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const text = await res.text()
      let data: unknown = null
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = null
      }

      if (!res.ok) {
        setStatus({
          type: 'error',
          text: messageFromJson(
            data,
            `Something went wrong (${res.status}). Please try again.`
          ),
        })
        return
      }

      setForm(emptyForm)
      setErrors({})
      setTouched({})
      const successText = messageFromJson(
        data,
        'Thank you! Your message has been received. We will get back to you shortly.'
      )
      setStatus({ type: 'success', text: successText })
      queueMicrotask(() => {
        successRef.current?.focus()
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    } catch {
      setStatus({
        type: 'error',
        text:
          'Unable to reach the server. Check your connection or try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  const showError = (field: keyof FormState) =>
    Boolean(touched[field] && errors[field])

  const inputCls = (field: keyof FormState) =>
    `${inputBase} ${showError(field) ? inputError : inputNormal}`

  return (
    <div className="w-full max-w-lg">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-950">
          Send a message
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          All fields are required. We usually reply within one business day.
        </p>
      </div>

      {status?.type === 'success' && (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mt-8 rounded-xl border border-emerald-200/90 bg-emerald-50/90 px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
        >
          <div className="flex gap-3">
            <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <p className="font-semibold text-emerald-950">Message sent</p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-900/90">
                {status.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {status?.type === 'error' && (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {status.text}
        </div>
      )}

      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="contact-name" className={labelCls}>
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              aria-invalid={!!showError('name')}
              aria-describedby={showError('name') ? 'err-name' : undefined}
              className={inputCls('name')}
              placeholder="Full name"
            />
            {showError('name') && (
              <p id="err-name" className="mt-1.5 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="contact-phone" className={labelCls}>
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              value={form.phone}
              onChange={(e) =>
                update('phone', e.target.value.replace(/[^\d+\s-]/g, ''))
              }
              onBlur={() => handleBlur('phone')}
              aria-invalid={!!showError('phone')}
              aria-describedby={showError('phone') ? 'err-phone' : undefined}
              className={inputCls('phone')}
              placeholder="10-digit mobile"
            />
            {showError('phone') && (
              <p id="err-phone" className="mt-1.5 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={!!showError('email')}
            aria-describedby={showError('email') ? 'err-email' : undefined}
            className={inputCls('email')}
            placeholder="you@company.com"
          />
          {showError('email') && (
            <p id="err-email" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelCls}>
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            aria-invalid={!!showError('message')}
            aria-describedby={
              showError('message')
                ? 'err-message'
                : 'contact-message-hint'
            }
            className={`${inputCls('message')} min-h-[132px] resize-y`}
            placeholder="Tell us about your project or question…"
          />
          <div className="mt-1 flex justify-end">
            <span
              id="contact-message-hint"
              className="text-xs text-slate-500"
            >
              {form.message.length} / {LIMITS.message}
            </span>
          </div>
          {showError('message') && (
            <p id="err-message" className="mt-1.5 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="relative w-full rounded-lg bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className={loading ? 'invisible' : ''}>Send message</span>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending…
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
