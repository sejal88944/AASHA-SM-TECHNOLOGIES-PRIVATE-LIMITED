import { Link } from 'react-router-dom'
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
      <section
        className="border-b border-slate-200/80 bg-hero-mesh py-20 sm:py-24"
        aria-labelledby="services-page-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-800 sm:text-sm">
              Services
            </p>
            <h1
              id="services-page-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-brand-950 sm:mt-4 sm:text-5xl"
            >
              Services for business growth
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              AASHA-SM TECHNOLOGIES PRIVATE LIMITED offers client-focused digital services with
              clear planning, clean execution, and ongoing support.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              As an IT company Maharashtra businesses work with for long-term value, we focus on
              Website Development, SMS Automation, and API Integration.
            </p>
          </header>
        </div>
      </section>

      <section
        className="bg-white py-20 sm:py-24"
        aria-labelledby="services-catalogue-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="services-catalogue-heading"
            className="text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl"
          >
            Core services
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            These services are designed to improve customer experience, increase operational speed,
            and support measurable business growth.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We keep communication simple, timelines transparent, and implementation aligned with
            your business priorities.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Know more <Link to="/about" className="font-medium text-brand-900 hover:underline">about our working style</Link> or{' '}
            <Link to="/contact" className="font-medium text-brand-900 hover:underline">contact us</Link> to request a plan for your business.
          </p>
          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {services.map((s) => (
              <article
                key={s.title}
                className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-8 transition-colors duration-200 hover:border-brand-900/20 hover:shadow-card lg:p-10"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-900 text-white shadow-sm sm:h-11 sm:w-11">
                    <ServiceIcon id={s.icon} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-brand-950 sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                      {s.short}
                    </p>
                  </div>
                </div>
                <ul className="mt-8 flex flex-1 flex-col gap-4 border-t border-slate-200/90 pt-8 text-sm leading-relaxed text-slate-700">
                  {s.points.map((line) => (
                    <li key={line} className="flex gap-3">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-900" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200/80 bg-slate-50/50 py-20 sm:py-24"
        aria-labelledby="services-process-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="services-process-heading"
            eyebrow="How we work"
            title="Work process"
            subtitle="A clear path from idea to production—with checkpoints you can trust."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {workProcess.map((w) => (
              <article
                key={w.step}
                className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-6 transition-colors hover:border-brand-900/15"
              >
                <div className="h-0.5 w-8 rounded-full bg-brand-900" />
                <h3 className="mt-5 text-base font-semibold text-brand-950">{w.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500 lg:hidden">
            {workProcess.map((w) => w.step).join(' → ')}
          </p>
        </div>
      </section>
    </div>
  )
}
