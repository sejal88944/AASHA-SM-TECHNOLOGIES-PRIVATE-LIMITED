import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { LeadForm } from '../components/forms/LeadForm'
import type { FaqItem } from '../data/schema'
import { breadcrumbSchema, faqSchema, localBusinessSchema, organizationSchema, websiteSchema } from '../data/schema'
import { ASSETS, COMPANY } from '../data/company'
import { services } from '../data/servicesContent'

const homeFaqs: FaqItem[] = [
  {
    question: 'Do you work with clients outside Pune and Maharashtra?',
    answer:
      'Yes. AASHA-SM TECHNOLOGIES PRIVATE LIMITED is based in Pune with delivery leadership here, and we support engagements across the country. We focus on clear communication, milestones, and integration discipline regardless of location.',
  },
  {
    question: 'How do you roll out automation without breaking operations?',
    answer:
      'We start with workflow mapping, data ownership, and rollback plans. Automation ships incrementally with monitoring so failures are detectable and reversible—especially for CRM-linked journeys and customer messaging.',
  },
  {
    question: 'What should we prepare before requesting a proposal?',
    answer:
      'Share goals, timelines, current systems (CRM/ERP, SMS/WhatsApp vendors), sample user journeys, and compliance constraints. If documentation is incomplete, we can run a short discovery workshop to define a fixed scope.',
  },
  {
    question: 'Do you work with startups as well as larger enterprises?',
    answer:
      'Yes. We ship quickly for early-stage teams while keeping engineering hygiene—logging, access control, and integration boundaries—scaled to your stage and risk profile.',
  },
]

export function HomePage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    faqSchema(homeFaqs),
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
  ]

  return (
    <>
      <Seo
        title="IT Company in Pune | Website Development, SMS, WhatsApp, APIs & CRM — AASHA-SM Technologies"
        description="AASHA-SM TECHNOLOGIES PRIVATE LIMITED is an IT company in Pune delivering website development company India outcomes, SMS automation India, WhatsApp marketing services India, API integration services India, and CRM software development India—built for speed, SEO, and measurable leads."
        canonicalPath="/"
        jsonLd={jsonLd}
        keywords={[
          'IT company in Pune',
          'website development company India',
          'software development company Maharashtra',
          'SMS automation India',
          'WhatsApp marketing services India',
          'API integration services India',
          'CRM software development India',
          'business automation solutions India',
          'startup IT company Pune',
        ]}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold text-cyan-200">Based in Pune · Serving teams across India</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Software, integrations, and customer journeys—built for speed you can operate
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Websites, messaging automation, APIs, CRM, and mobile apps—delivered with clear milestones, production-grade
              integrations, and UX your sales team will actually use.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explore services
              </Link>
              <a
                href={COMPANY.linkedinUrl}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>

            <dl className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">Delivery</dt>
                <dd className="mt-2 text-sm text-slate-100">
                  Milestone-based releases, clear acceptance criteria, and documentation your team can rely on after handover.
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">Performance</dt>
                <dd className="mt-2 text-sm text-slate-100">
                  Fast mobile layouts, sensible caching, and lightweight pages so first interactions feel instant—not bloated.
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">Lead capture</dt>
                <dd className="mt-2 text-sm text-slate-100">
                  Clear CTAs, service-specific forms, WhatsApp handoff, and CRM-friendly fields for faster follow-up.
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <picture>
                <source srcSet={ASSETS.logoWebp} type="image/webp" />
                <img
                  src={ASSETS.logoJpeg}
                  width={440}
                  height={440}
                  className="mx-auto h-auto w-full max-w-[280px] rounded-xl object-contain"
                  loading="eager"
                  decoding="async"
                  alt={`${COMPANY.brandName} logo`}
                />
              </picture>
              <p className="mt-4 text-center text-xs text-slate-300">{COMPANY.legalName}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Services that ship—and stay integrated</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Each service page includes FAQs and practical guidance. Use the links below to explore the capability that matches your
            next milestone.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                <Link className="hover:underline" to={s.path}>
                  {s.shortTitle}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.subhead}</p>
              <div className="mt-4">
                <Link className="text-sm font-semibold text-slate-900 hover:underline" to={s.path}>
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why teams choose {COMPANY.brandName}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">Integration-first delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We assume your stack is mixed: CRMs, billing, SMS gateways, WhatsApp vendors, and internal tools.{' '}
                <Link className="font-semibold text-slate-900 hover:underline" to="/services/api-integration">
                  API integration
                </Link>{' '}
                is treated as production infrastructure—not one-off scripts.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">Clean information architecture</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Clear routes, helpful internal links, and structured data where it clarifies what you offer—without turning pages into
                repetitive keyword walls.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">Conversion-focused UX</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Strong CTAs, disciplined spacing, and fast mobile layouts reduce friction—especially for high-intent journeys like{' '}
                <Link className="font-semibold text-slate-900 hover:underline" to="/services/whatsapp-marketing">
                  WhatsApp for business
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Automation your team can govern</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Automation fails when workflows are unclear. We document triggers, owners, failure handling, and reporting—so{' '}
          <Link className="font-semibold text-slate-900 hover:underline" to="/services/sms-automation">
            SMS
          </Link>{' '}
          and CRM updates do not silently drift out of sync.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900">Outcomes we optimize for</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Faster first response on customer messaging programs</li>
              <li>Higher CRM match rates between web leads and accounts</li>
              <li>Fewer integration incidents during peak campaign windows</li>
              <li>Clear audit trails for template and consent changes</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900">When CRM becomes the control tower</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              The goal is not “more fields”—it is reliable attribution and sensible automation boundaries. We connect CRM design to
              messaging and revenue reporting so leadership can trust the dashboard.
            </p>
            <div className="mt-4">
              <Link className="text-sm font-semibold text-slate-900 hover:underline" to="/services/crm-erp-software">
                Explore CRM & ERP →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-slate-100">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Client outcomes (illustrative)</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Examples of measurable improvements—company names withheld for confidentiality.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-sm leading-relaxed text-slate-200">
                “Cut duplicate OTP SMS after idempotency and CRM state fixes; improved delivery SLA reporting for compliance reviews.”
              </blockquote>
              <figcaption className="mt-4 text-xs text-slate-400">B2C fintech · transactional SMS · 10-week program</figcaption>
            </figure>
            <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-sm leading-relaxed text-slate-200">
                “Merged web leads into CRM with match keys; reduced manual CSV imports and shortened sales follow-up time.”
              </blockquote>
              <figcaption className="mt-4 text-xs text-slate-400">SaaS vendor · integration sprint</figcaption>
            </figure>
            <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-sm leading-relaxed text-slate-200">
                “Launched WhatsApp support templates with agent handoff; improved first-response time without losing CRM attribution.”
              </blockquote>
              <figcaption className="mt-4 text-xs text-slate-400">Services business · messaging rollout</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Location & contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Keep your public business details consistent everywhere you list them (website, maps profile, invoices, and
              directories).
            </p>
            <div className="mt-5 text-sm text-slate-800">
              <div className="font-semibold">{COMPANY.legalName}</div>
              <div className="mt-1 text-slate-700">{COMPANY.streetAddress}</div>
              <div className="mt-1 text-slate-700">
                {COMPANY.addressLocality}, {COMPANY.addressRegion} {COMPANY.postalCode}, India
              </div>
              <div className="mt-3">
                Phone:{' '}
                <a className="font-semibold text-slate-900 hover:underline" href={`tel:${COMPANY.phoneE164}`}>
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className="mt-1">
                Email:{' '}
                <a className="font-semibold text-slate-900 hover:underline" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Pune, Maharashtra map"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Pune%2C%20Maharashtra%2C%20India&output=embed"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Tell us what “done” looks like</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Share timelines, integrations, compliance needs, and success metrics. We will respond with a practical plan—even if
                the best next step is smaller than you expected.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  to="/contact"
                >
                  Contact Us
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  to="/blog"
                >
                  Read insights
                </Link>
              </div>
            </div>
            <LeadForm defaultInterest="Homepage consultation" />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQs</h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {homeFaqs.map((f) => (
              <details key={f.question} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none">
                  <span className="inline-flex w-full items-center justify-between gap-3">
                    {f.question}
                    <span className="text-slate-400 group-open:rotate-180">▾</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
