import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'

const focusAreas = [
  {
    title: 'Website development',
    description:
      'We build sites and web apps that load fast, read clearly on mobile, and make it easy for customers to take the next step.',
  },
  {
    title: 'SMS automation',
    description:
      'From campaigns to transactional alerts, we help you reach people by SMS with workflows that fit how your team already works.',
  },
  {
    title: 'API integration',
    description:
      'We connect your stack—payments, messaging, maps, and internal tools—so data moves once, not three times.',
  },
]

export function About() {
  return (
    <div className="bg-white">
      <section
        className="border-b border-slate-200/80 bg-hero-mesh py-20 sm:py-24"
        aria-labelledby="about-page-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-800 sm:text-sm">
              About
            </p>
            <h1
              id="about-page-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-brand-950 sm:mt-4 sm:text-5xl"
            >
              Technology that supports your business—not the other way around
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              AASHA-SM TECHNOLOGIES PRIVATE LIMITED is an IT company Maharashtra businesses trust
              for website development India, SMS automation India, and API integration services.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Explore our{' '}
              <Link to="/services" className="font-semibold text-brand-900 hover:underline">
                Website Development & SMS Automation Services
              </Link>{' '}
              or{' '}
              <Link to="/contact" className="font-semibold text-brand-900 hover:underline">
                Contact Us for Business Solutions
              </Link>
              .
            </p>
          </header>
        </div>
      </section>

      <section
        className="bg-slate-50/50 py-20 sm:py-24"
        aria-labelledby="about-focus-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="about-focus-heading"
            eyebrow="Focus areas"
            title="Where we spend most of our time"
            subtitle="Three core services with clear business benefits."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {focusAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200/90 bg-white p-7 lg:p-8"
              >
                <h3 className="text-base font-semibold text-brand-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white py-20 sm:py-24" aria-labelledby="about-cta-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-8 py-14 text-center sm:px-12">
            <h2
              id="about-cta-heading"
              className="text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl"
            >
              Ready to talk through your project?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Browse what we offer, or send a short note—we will respond with clear next steps.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/services" variant="secondary">
                View services
              </Button>
              <Button to="/contact">Contact us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
