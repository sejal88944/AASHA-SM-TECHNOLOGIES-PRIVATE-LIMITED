import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { careerPositions } from '../../data/careersPositions'
import { APPLICATION_TECH_SKILLS, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from '../../data/applyFormOptions'

type Toast = { kind: 'success' | 'error'; message: string } | null

const endpoint = import.meta.env.VITE_APPLY_ENDPOINT || '/api/apply'

export function ApplicationForm() {
  const [searchParams] = useSearchParams()
  const defaultPosition = searchParams.get('position') || ''
  const employmentParam = searchParams.get('employmentType') || ''
  const defaultEmployment = (EMPLOYMENT_TYPES as readonly string[]).includes(employmentParam) ? employmentParam : 'Internship'

  const positionOptions = useMemo(() => {
    const titles = careerPositions.map((p) => p.title)
    const uniq = [...new Set(titles)]
    return uniq.sort((a, b) => a.localeCompare(b))
  }, [])

  const [toast, setToast] = useState<Toast>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setToast(null)
    const form = e.currentTarget
    const fd = new FormData(form)

    const resume = fd.get('resume')
    if (resume instanceof File && resume.size > 0 && resume.size > 2 * 1024 * 1024) {
      setToast({ kind: 'error', message: 'Resume must be 2MB or smaller (PDF or Word).' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(endpoint, { method: 'POST', body: fd })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; message?: string; id?: string } | null
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.message || `Request failed (${res.status})`)
      }
      setToast({
        kind: 'success',
        message: 'Application received. Check your email for confirmation—our HR team will review your profile shortly.',
      })
      form.reset()
      const pos = form.querySelector<HTMLSelectElement>('select[name="position"]')
      if (pos && defaultPosition) pos.value = defaultPosition
    } catch (err) {
      setToast({ kind: 'error', message: err instanceof Error ? err.message : 'Submission failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative">
      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-50 w-[min(100%,28rem)] -translate-x-1/2 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.kind === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
          role="status"
        >
          {toast.message}
        </div>
      ) : null}

      <form className="space-y-10" onSubmit={onSubmit} encType="multipart/form-data">
        <input type="hidden" name="pagePath" value={typeof window !== 'undefined' ? window.location.pathname : '/apply'} />

        {/* Honeypot — leave empty (spam bots often fill hidden fields) */}
        <div className="hidden" aria-hidden="true">
          <label>
            Company website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Basic information</h2>
          <p className="mt-1 text-sm text-slate-600">Tell us who you are and how to reach you in Pune, Maharashtra, or across India.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-slate-800">Full name *</span>
              <input
                name="fullName"
                required
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">Email *</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">Mobile number *</span>
              <input
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 …"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">City / location *</span>
              <input
                name="city"
                required
                placeholder="e.g. Pune, Mumbai, Remote"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Career information</h2>
          <p className="mt-1 text-sm text-slate-600">Align your profile with startup jobs for freshers, internships, or full-time roles.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">Position applying for *</span>
              <select
                name="position"
                required
                defaultValue={defaultPosition || ''}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {positionOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
                <option value="General application — open roles">General application — open roles</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">Internship / full-time *</span>
              <select
                name="employmentType"
                required
                defaultValue={defaultEmployment}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              >
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">Experience level *</span>
              <select name="experienceLevel" required className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4">
                <option value="" disabled>
                  Select
                </option>
                {EXPERIENCE_LEVELS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">Skills & tools (summary) *</span>
              <textarea
                name="skills"
                required
                rows={3}
                placeholder="Languages, frameworks, tools, coursework, or projects—keep it concise."
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">College / university</span>
              <input
                name="college"
                autoComplete="organization"
                placeholder="Optional but recommended for students"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Technical skills</h2>
          <p className="mt-1 text-sm text-slate-600">Tick everything you are comfortable with today—used for routing and mentorship.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATION_TECH_SKILLS.map((skill) => (
              <label key={skill} className="flex items-center gap-2 text-sm text-slate-800">
                <input type="checkbox" name="technicalSkills" value={skill} className="rounded border-slate-300 text-cyan-700 focus:ring-cyan-600" />
                {skill}
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Resume & links</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">Resume upload</span>
              <span className="mt-0.5 block text-xs text-slate-500">PDF or Word, max 2MB (recommended).</span>
              <input
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">LinkedIn</span>
              <input name="linkedIn" type="url" placeholder="https://linkedin.com/in/…" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-800">GitHub</span>
              <input name="github" type="url" placeholder="https://github.com/…" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4" />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">Portfolio website</span>
              <input name="portfolio" type="url" placeholder="https://…" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4" />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-800">Why do you want to join AASHA-SM Technologies? *</span>
              <textarea
                name="motivation"
                required
                rows={4}
                placeholder="What you want to learn, how you work, and what outcomes you care about."
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-4"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
          <p className="text-xs text-slate-500">
            By submitting, you agree we may contact you about this application. Data is stored securely for recruitment purposes.
          </p>
        </div>
      </form>
    </div>
  )
}
