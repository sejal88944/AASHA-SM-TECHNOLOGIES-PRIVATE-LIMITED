import { SectionHeading } from '../components/SectionHeading'
import { ServiceIcon } from '../components/ServiceIcons'
import { services, workProcess } from '../data/services'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function Services() {
  return (
    <div className="bg-white">
      <section className="border-b border-brand-100 bg-hero-mesh py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to go digital
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Detailed overview of our offerings. Each engagement is scoped to your
            workflows, security needs, and growth plans.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft ring-4 ring-brand-500/10 transition duration-300 group-hover:ring-brand-400/25">
                    <ServiceIcon id={s.icon} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.short}</p>
                  </div>
                </div>
                <ul className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-8 text-sm text-slate-700">
                  {s.points.map((line) => (
                    <li key={line} className="flex gap-3 leading-relaxed">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How we work"
            title="Work process"
            subtitle="A clear path from idea to production—with checkpoints you can trust."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {workProcess.map((w) => (
              <div
                key={w.step}
                className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition duration-300 hover:border-brand-200 hover:shadow-soft"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500" />
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{w.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500 lg:hidden">
            {workProcess.map((w) => w.step).join(' → ')}
          </p>
        </div>
      </section>
    </div>
  )
}
