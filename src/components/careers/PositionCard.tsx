import { Link } from 'react-router-dom'
import type { CareerPosition } from '../../data/careersPositions'
import { applyUrlForPosition } from '../../data/careersPositions'

export function PositionCard({ position: p }: { position: CareerPosition }) {
  return (
    <article id={p.id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{p.category === 'tech' ? 'Tech' : 'Business'}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{p.seoTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.shortDescription}</p>
      <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Key responsibilities</h4>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
        {p.responsibilities.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Required skills</h4>
      <p className="mt-1 text-sm text-slate-800">{p.skills.join(' · ')}</p>
      <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role type</dt>
          <dd className="mt-0.5 text-slate-800">{p.jobType}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Work mode</dt>
          <dd className="mt-0.5 text-slate-800">{p.workMode}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">Career growth: </span>
        {p.growth}
      </p>
      <Link
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
        to={applyUrlForPosition(p.title)}
      >
        Apply Now
      </Link>
    </article>
  )
}
