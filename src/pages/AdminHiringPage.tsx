import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Seo } from '../components/seo/Seo'
import { APPLICATION_STATUSES, HIRING_ADMIN_SESSION_KEY } from '../data/applyFormOptions'
import { careerPositions } from '../data/careersPositions'

type Row = {
  id: string
  fullName: string
  email: string
  phone: string
  city: string
  position: string
  employmentType: string
  experienceLevel: string
  technicalSkills: string[]
  status: string
  applicationDate?: string
  resumeFileName?: string | null
}

export function AdminHiringPage() {
  const [secret, setSecret] = useState(() => sessionStorage.getItem(HIRING_ADMIN_SESSION_KEY) || '')
  const [input, setInput] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [position, setPosition] = useState('')
  const [skill, setSkill] = useState('')
  const [status, setStatus] = useState('')
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null)

  const authHeaders = (): Record<string, string> => (secret ? { Authorization: `Bearer ${secret}` } : {})

  const filtersRef = useRef({ q, position, skill, status })

  useEffect(() => {
    filtersRef.current = { q, position, skill, status }
  }, [q, position, skill, status])

  const load = useCallback(async () => {
    if (!secret) return
    setLoading(true)
    setError(null)
    const { q: fq, position: fp, skill: fs, status: fst } = filtersRef.current
    const params = new URLSearchParams()
    if (fq.trim()) params.set('q', fq.trim())
    if (fp.trim()) params.set('position', fp.trim())
    if (fs.trim()) params.set('skill', fs.trim())
    if (fst.trim()) params.set('status', fst.trim())
    params.set('limit', '50')
    try {
      const res = await fetch(`/api/applications?${params}`, { headers: { Authorization: `Bearer ${secret}` } })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
      setRows(data.items || [])
      setTotal(data.total ?? 0)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => {
    if (!secret) return undefined
    const timer = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [secret, load])

  const saveSecret = () => {
    const t = input.trim()
    setSecret(t)
    sessionStorage.setItem(HIRING_ADMIN_SESSION_KEY, t)
    setInput('')
  }

  const logout = () => {
    setSecret('')
    sessionStorage.removeItem(HIRING_ADMIN_SESSION_KEY)
    setRows([])
    setTotal(0)
  }

  async function openDetail(id: string) {
    setError(null)
    try {
      const res = await fetch(`/api/application/${id}`, { headers: authHeaders() })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
      setDetail(data.item || null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
  }

  async function updateStatus(id: string, next: string) {
    setError(null)
    try {
      const res = await fetch(`/api/application/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ status: next }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
      await load()
      if (detail && String(detail.id) === id) {
        setDetail({ ...detail, status: next })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed')
    }
  }

  async function downloadResume(id: string, fileName: string) {
    setError(null)
    try {
      const res = await fetch(`/api/application/${id}/resume`, { headers: authHeaders() })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || `HTTP ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName || 'resume'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed')
    }
  }

  const positionSuggestions = useMemo(() => {
    const titles = [...new Set(careerPositions.map((p) => p.title))]
    return titles.sort((a, b) => a.localeCompare(b))
  }, [])

  return (
    <>
      <Seo title="Hiring admin | AASHA-SM Technologies" description="Internal applicant review." noIndex canonicalPath="/admin/hiring" />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Hiring admin</h1>
        <p className="mt-2 text-sm text-slate-600">Authenticate with your server secret (Bearer token). Not indexed for search engines.</p>

        {!secret ? (
          <div className="mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-800">Admin access key</label>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="HIRING_ADMIN_SECRET"
            />
            <button type="button" className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={saveSecret}>
              Unlock dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" className="text-sm font-semibold text-slate-700 underline hover:text-slate-900" onClick={logout}>
                Lock / clear session
              </button>
              <button
                type="button"
                disabled={loading}
                className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
                onClick={() => void load()}
              >
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <span className="text-sm text-slate-600">
                {total} application{total === 1 ? '' : 's'}
              </span>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              <label className="block text-sm">
                <span className="font-medium text-slate-800">Search</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" placeholder="Name, email, role" />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-800">Role contains</span>
                <input list="role-opts" value={position} onChange={(e) => setPosition(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
                <datalist id="role-opts">
                  {positionSuggestions.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-800">Skill contains</span>
                <input value={skill} onChange={(e) => setSkill(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" placeholder="React.js" />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-800">Status</span>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm">
                  <option value="">Any</option>
                  {APPLICATION_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50" onClick={() => void load()}>
                Apply filters
              </button>
            </div>

            {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Position</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80">
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-600">{r.applicationDate ? new Date(r.applicationDate).toLocaleString() : '—'}</td>
                      <td className="px-3 py-2 font-medium text-slate-900">{r.fullName}</td>
                      <td className="max-w-[10rem] truncate px-3 py-2 text-slate-700">{r.email}</td>
                      <td className="max-w-[12rem] truncate px-3 py-2 text-slate-700">{r.position}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-slate-700">{r.employmentType}</td>
                      <td className="whitespace-nowrap px-3 py-2">
                        <select
                          value={r.status}
                          onChange={(e) => void updateStatus(r.id, e.target.value)}
                          className="rounded border border-slate-200 bg-white px-1 py-1 text-xs"
                        >
                          {APPLICATION_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="space-x-2 whitespace-nowrap px-3 py-2">
                        <button type="button" className="text-xs font-semibold text-cyan-800 hover:underline" onClick={() => void openDetail(r.id)}>
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-cyan-800 hover:underline"
                          onClick={() => void downloadResume(r.id, r.resumeFileName || 'resume.pdf')}
                        >
                          Resume
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!rows.length && !loading ? <p className="p-6 text-sm text-slate-600">No applications match your filters.</p> : null}
            </div>

            {detail ? (
              <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog">
                <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-900">Application detail</h2>
                    <button type="button" className="text-sm font-semibold text-slate-600 hover:text-slate-900" onClick={() => setDetail(null)}>
                      Close
                    </button>
                  </div>
                  <dl className="mt-4 space-y-2 text-sm">
                    {Object.entries(detail).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-semibold uppercase text-slate-500">{k}</dt>
                        <dd className="text-slate-800">{Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : String(v)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  )
}
