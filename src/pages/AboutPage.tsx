import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { LeadForm } from '../components/forms/LeadForm'
import { ASSETS, COMPANY } from '../data/company'
import { breadcrumbSchema, faqSchema, organizationSchema, websiteSchema } from '../data/schema'
import type { FaqItem } from '../data/schema'

const aboutFaqs: FaqItem[] = [
  {
    question: 'What does “AASHA-SM” reflect in how you work?',
    answer:
      'Clear commitments, documented assumptions, and measurable milestones. We pair ambition for outcomes with disciplined execution—especially when integrations, messaging, and CRM workflows must stay reliable under load.',
  },
  {
    question: 'How do you build trust with new clients?',
    answer:
      'Specificity: integration patterns, failure handling, compliance-aware messaging guidance, and realistic timelines. We keep contact details consistent everywhere we publish them, and we prefer proof over buzzwords—architecture notes, test evidence, and runbooks where appropriate.',
  },
]

export function AboutPage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    faqSchema(aboutFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ]

  return (
    <>
      <Seo
        title={`About ${COMPANY.brandName} | Pune IT Services, Delivery Model & Trust Signals`}
        description={`Learn about ${COMPANY.legalName}: a Pune-based IT services company delivering website development, SMS automation, WhatsApp marketing, API integration, and CRM software for India-wide clients—with governance-minded engineering.`}
        canonicalPath="/about"
        jsonLd={jsonLd}
        keywords={['IT company in Pune', 'startup IT company Pune', 'software development company Maharashtra']}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            About {COMPANY.legalName}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            We are a private limited company built for procurement-friendly delivery: contracts, invoicing, governance, and long-term
            maintenance. Our team is anchored in Pune, Maharashtra, and we work with clients across India on web, automation,
            integrations, CRM, and mobile initiatives.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How we work with procurement and founders</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              We translate goals into milestones: discovery, architecture, implementation, hardening, and handover. For CRM and
              automation programs, we emphasize operational safety—roles, approvals, and auditability—so speed does not create hidden
              risk.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-slate-900">Local team, national delivery</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Pune is a strong engineering hub. We keep public business information accurate and consistent, and we scope service pages
              around real buyer needs—not thin duplicate “location” pages.
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900">Credentials & proof</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                As you grow, add leadership bios, certifications, and client references where you can disclose them. Until then, the
                strongest signal is delivery specificity: integrations, monitoring, QA, and incident response—plus a maintained
                LinkedIn presence.
              </p>
              <a
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 hover:underline"
                href={COMPANY.linkedinUrl}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn →
              </a>
            </div>
          </div>
          <div>
            <picture>
              <source srcSet={ASSETS.logoWebp} type="image/webp" />
              <img
                className="w-full rounded-2xl border border-slate-200 object-contain shadow-sm"
                src={ASSETS.logoJpeg}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                alt={`${COMPANY.brandName} logo`}
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQs</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {aboutFaqs.map((f) => (
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

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Next step</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              If you are comparing vendors for{' '}
              <Link className="font-semibold text-slate-900 hover:underline" to="/services/sms-automation">
                SMS automation
              </Link>{' '}
              or{' '}
              <Link className="font-semibold text-slate-900 hover:underline" to="/services/api-integration">
                API integration
              </Link>
              , send diagrams, sample payloads, and vendor names—we will respond with the questions that matter.
            </p>
          </div>
          <LeadForm defaultInterest="About page inquiry" />
        </div>
      </section>
    </>
  )
}
