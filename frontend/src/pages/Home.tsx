import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceIcon } from '../components/ServiceIcons'
import { services, whyChooseUs } from '../data/services'

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-brand-200/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Smart Digital Solutions for Modern Businesses
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              We help businesses grow with websites, apps, and automation tools.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/contact">Get in Touch</Button>
              <Button to="/services" variant="secondary">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                A modern approach to delivery
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                AASHA-SM TECHNOLOGIES PRIVATE LIMITED is built around clarity, speed, and outcomes.
                We combine thoughtful design with dependable engineering so your
                digital presence works as hard as your team does.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Our process is client-focused: we listen first, propose practical
                options, and ship in iterations you can review—so you always know
                what is being built and why.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 shadow-card">
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                  Transparent scope and timelines
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                  Quality-first development and testing
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                  Support for integrations you already use
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Services built for real business needs"
            subtitle="From customer-facing experiences to internal tools and integrations."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.title}
                title={s.title}
                description={s.short}
                icon={<ServiceIcon id={s.icon} />}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-b border-brand-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why us"
            title="Why choose us"
            subtitle="We build for longevity—not just launch day."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
