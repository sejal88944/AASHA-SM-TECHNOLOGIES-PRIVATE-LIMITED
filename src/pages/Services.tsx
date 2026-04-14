import { SectionHeading } from '../components/SectionHeading'
import { services, workProcess } from '../data/services'

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
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Detailed overview of our offerings. Each engagement is scoped to your
            workflows, security needs, and growth plans.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((s, index) => (
              <div
                key={s.title}
                className="grid gap-6 border-b border-brand-100 pb-12 last:border-0 last:pb-0 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <span className="text-sm font-medium text-brand-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-slate-600">{s.short}</p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="space-y-3 text-slate-700">
                    {s.points.map((line) => (
                      <li key={line} className="flex gap-3 leading-relaxed">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
            {workProcess.map((w, i) => (
              <div
                key={w.step}
                className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {w.step}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{w.text}</p>
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
