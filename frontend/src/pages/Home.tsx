import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceIcon } from '../components/ServiceIcons'
import { services, whyChooseUs } from '../data/services'

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
              AASHA-SM TECHNOLOGIES PRIVATE LIMITED
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
              Website development and automation solutions for growing businesses
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              We are an IT company Maharashtra businesses trust for practical digital growth.
              Our team plans and builds solutions that are easy to use, easy to manage, and
              designed around your goals.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              From website development India projects to SMS automation India campaigns, we help
              you reach customers faster and run operations with less manual work.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/contact">Get in Touch</Button>
              <Button to="/services" variant="secondary">
                View Services
              </Button>
            </div>
          </header>
        </div>
      </section>

      <section
        className="bg-white py-20 sm:py-24"
        aria-labelledby="home-about-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2
                id="home-about-heading"
                className="text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl"
              >
                Your technology partner for clear outcomes
              </h2>
              <h3 className="mt-8 text-lg font-semibold tracking-tight text-brand-900 sm:text-xl">
                Simple process, business-focused delivery
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                We start by understanding your business model, target audience, and current
                bottlenecks. Then we suggest a solution that matches your budget and growth stage.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                You get transparent timelines, regular updates, and support after launch, so your
                team can confidently scale without technical confusion.
              </p>
              <h3 className="mt-8 text-lg font-semibold tracking-tight text-brand-900 sm:text-xl">
                IT company Maharashtra with national delivery
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                We work with clients across states, including teams looking for website development
                India support, SMS automation India workflows, and API integration services.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Learn more <Link to="/about" className="font-medium text-brand-900 hover:underline">about our team</Link>, explore full{' '}
                <Link to="/services" className="font-medium text-brand-900 hover:underline">service details</Link>, or{' '}
                <Link to="/contact" className="font-medium text-brand-900 hover:underline">contact us</Link> for a custom plan.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-8 lg:p-10">
              <ul className="space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-900" />
                  Transparent scope and timelines
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-900" />
                  Quality-first development and testing
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-900" />
                  Support for integrations you already use
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200/80 bg-white py-20 sm:py-24"
        aria-labelledby="home-services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="home-services-heading"
            eyebrow="What we do"
            title="Services built for real business needs"
            subtitle="From customer-facing experiences to internal tools and integrations."
          />
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-brand-900 sm:text-xl">
            Services overview
          </h3>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Our core focus includes Website Development, SMS Automation, and API Integration. Each
            service is designed to improve customer communication, reduce manual effort, and support
            long-term growth.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you need a new business website, reliable SMS workflows, or API integration
            services between your tools, we deliver practical implementation with measurable results.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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

      <section
        className="border-t border-slate-200/80 bg-slate-50/50 py-20 sm:py-24"
        aria-labelledby="home-why-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="home-why-heading"
            eyebrow="Why us"
            title="Why choose us"
            subtitle="We build for longevity—not just launch day."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {whyChooseUs.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200/90 bg-white p-7"
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
    </>
  )
}
