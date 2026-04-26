import { FormEvent, useState } from 'react'

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

type FieldErrors = Partial<Record<keyof FormState, string>>

function messageFromJson(data: unknown, fallback: string): string {
  if (data && typeof data === 'object' && data !== null && 'message' in data) {
    const m = (data as { message: unknown }).message
    if (typeof m === 'string' && m.trim()) return m
  }
  return fallback
}

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {}
  const name = values.name.trim()
  if (!name) errors.name = 'Name is required.'
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.'

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) errors.phone = 'Phone is required.'
  else if (digits.length !== 10)
    errors.phone = 'Enter a valid 10-digit phone number.'

  const email = values.email.trim()
  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Enter a valid email address.'

  const msg = values.message.trim()
  if (!msg) errors.message = 'Message is required.'
  else if (msg.length < 5) errors.message = 'Please write at least a few words.'

  return errors
}

const inputBase =
  'mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:ring-2 focus:ring-brand-500/25 motion-reduce:focus:translate-y-0'

const inputNormal = 'border-slate-200 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]'

const inputError =
  'border-red-300 focus:border-red-500 focus:ring-red-500/20'

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
    const v = validate(form)
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
      phone: form.phone.replace(/\D/g, ''),
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
      setStatus({
        type: 'success',
        text: messageFromJson(
          data,
          'Thank you! Your message has been received. We will get back to you shortly.'
        ),
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

  return (
    <div className="w-full max-w-lg">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Send a Message
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Fill in the form below and we will get back to you soon.
        </p>
      </div>

      {status && (
        <div
          role="alert"
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          {status.text}
        </div>
      )}

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={!!showError('name')}
            aria-describedby={showError('name') ? 'err-name' : undefined}
            className={`${inputBase} ${showError('name') ? inputError : inputNormal}`}
            placeholder="Your full name"
          />
          {showError('name') && (
            <p id="err-name" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-slate-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="text"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value.replace(/[^\d+\s-]/g, ''))}
            onBlur={() => handleBlur('phone')}
            aria-invalid={!!showError('phone')}
            aria-describedby={showError('phone') ? 'err-phone' : undefined}
            className={`${inputBase} ${showError('phone') ? inputError : inputNormal}`}
            placeholder="10-digit mobile number"
          />
          {showError('phone') && (
            <p id="err-phone" className="mt-1.5 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-slate-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={!!showError('email')}
            aria-describedby={showError('email') ? 'err-email' : undefined}
            className={`${inputBase} ${showError('email') ? inputError : inputNormal}`}
            placeholder="you@example.com"
          />
          {showError('email') && (
            <p id="err-email" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            aria-invalid={!!showError('message')}
            aria-describedby={showError('message') ? 'err-message' : undefined}
            className={`${inputBase} min-h-[120px] resize-y ${showError('message') ? inputError : inputNormal}`}
            placeholder="How can we help you?"
          />
          {showError('message') && (
            <p id="err-message" className="mt-1.5 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="relative w-full overflow-hidden rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className={loading ? 'invisible' : ''}>Send Message</span>
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
