import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
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
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Explore{' '}
              <Link to="/services" className="font-semibold text-brand-900 hover:underline">
                Website Development & SMS Automation Services
              </Link>{' '}
              , learn{' '}
              <Link to="/about" className="font-semibold text-brand-900 hover:underline">
                About Our IT Company
              </Link>
              , or{' '}
              <Link to="/contact" className="font-semibold text-brand-900 hover:underline">
                Contact Us for Business Solutions
              </Link>
              .
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/services" variant="secondary">
                View Services
              </Button>
              <Button to="/about" variant="secondary">
                About Us
              </Button>
              <Button to="/contact" variant="outline">
                Get in Touch
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
            title="Our Services"
            subtitle="Simple solutions focused on leads, automation, and faster operations for growing businesses."
          />
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
            We deliver SMS automation India solutions, website development Pune focused on
            conversions, and reliable API integration services for smooth operations.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">
                <Link to="/services" className="transition hover:text-brand-800 hover:underline">
                  Website Development
                </Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Professional websites that build trust and generate quality leads.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">
                <Link to="/services" className="transition hover:text-brand-800 hover:underline">
                  SMS Automation
                </Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Automated SMS for reminders, updates, and better customer response.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">
                <Link to="/services" className="transition hover:text-brand-800 hover:underline">
                  API Integration
                </Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Connected systems that reduce manual work and improve team speed.
              </p>
            </article>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="text-sm font-semibold text-brand-900 transition hover:text-brand-700 hover:underline"
            >
              View complete service details
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24" aria-labelledby="home-why-choose-us-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="home-why-choose-us-heading"
            eyebrow="Why us"
            title="Why Choose Us"
            subtitle="We keep execution practical, communication clear, and delivery focused on business outcomes."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">Business-first approach</h3>
              <p className="mt-2 text-sm text-slate-600">Solutions are planned around leads, automation, and measurable growth.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">Simple implementation</h3>
              <p className="mt-2 text-sm text-slate-600">Clean execution with minimal complexity so your team can adopt quickly.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-brand-950">Reliable support</h3>
              <p className="mt-2 text-sm text-slate-600">Continuous updates and support to keep your website and workflows stable.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-20 sm:py-24" aria-labelledby="home-contact-us-heading">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            id="home-contact-us-heading"
            eyebrow="Next step"
            title="Contact Us"
            subtitle="Tell us your requirement and we will share a practical action plan for your business."
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary">
              Contact Us for Business Solutions
            </Button>
            <Button to="/about" variant="outline">
              About Our IT Company
            </Button>
          </div>
        </div>
      </section>

    </>
  )
}
