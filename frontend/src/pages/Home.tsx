import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'

export function Home() {
  return (
    <>
      <section
        className="relative border-b border-slate-200/80 bg-hero-mesh"
        aria-labelledby="home-hero-heading"
      >
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <header className="max-w-3xl">
            <h1
              id="home-hero-heading"
              className="text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl lg:text-6xl"
            >
              Website Development & SMS Automation Services in India
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              AASHA-SM TECHNOLOGIES PRIVATE LIMITED helps businesses get more leads with clear,
              fast, and reliable digital solutions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              We provide website development, SMS automation, and API integration to improve
              customer engagement and business growth.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+919579592684"
                className="inline-flex items-center justify-center rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
              >
                Call Now
              </a>
              <Button to="/services" variant="secondary">
                View Services
              </Button>
            </div>
          </header>
        </div>
      </section>

      <section
        className="bg-white py-20 sm:py-24"
        aria-labelledby="home-services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="home-services-heading"
            eyebrow="Services"
            title="Core services for business growth"
            subtitle="Simple solutions focused on leads, automation, and faster operations."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">Website Development</h3>
              <p className="mt-2 text-sm text-slate-600">Professional websites that build trust and generate quality leads.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">SMS Automation</h3>
              <p className="mt-2 text-sm text-slate-600">Automated SMS for reminders, updates, and better customer response.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">API Integration</h3>
              <p className="mt-2 text-sm text-slate-600">Connected systems that reduce manual work and improve team speed.</p>
            </article>
          </div>
        </div>
      </section>

    </>
  )
}
