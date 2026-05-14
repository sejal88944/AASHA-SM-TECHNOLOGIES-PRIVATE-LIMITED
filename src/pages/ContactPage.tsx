import { Seo } from '../components/seo/Seo'
import { LeadForm } from '../components/forms/LeadForm'
import { ASSETS, COMPANY } from '../data/company'
import { breadcrumbSchema, faqSchema, localBusinessSchema, organizationSchema, websiteSchema } from '../data/schema'
import type { FaqItem } from '../data/schema'

const contactFaqs: FaqItem[] = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer:
      'We typically respond within one business day for qualified B2B inquiries. For urgent production issues from existing clients, use the phone line and your agreed escalation channel.',
  },
  {
    question: 'Can you sign an NDA before we share architecture details?',
    answer:
      'Yes. NDAs are common for integration and CRM workflow reviews. We can align to your legal template or propose a balanced mutual NDA.',
  },
  {
    question: 'Do you offer retainers or fixed-scope projects?',
    answer:
      'Both. Early-stage discovery is often fixed-scope. Ongoing enhancements commonly move to a retainer with a prioritized backlog and agreed SLAs.',
  },
]

export function ContactPage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    faqSchema(contactFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ]

  return (
    <>
      <Seo
        title="Contact AASHA-SM Technologies | Request Quote & Free Consultation (Pune / India)"
        description="Contact AASHA-SM TECHNOLOGIES PRIVATE LIMITED for website development, SMS automation, WhatsApp marketing, API integration, CRM software, and mobile apps. Request a quote with clear next steps for India-wide delivery."
        canonicalPath="/contact"
        jsonLd={jsonLd}
        keywords={['IT company in Pune', 'Request Quote', 'Get Free Consultation', 'Contact Us']}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Contact / Request a quote</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Use the form for structured intake—especially helpful for CRM and integration-heavy scopes. For a faster conversation,
              WhatsApp is available; phone is best for time-sensitive production issues.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[200px] shrink-0">
            <picture>
              <source srcSet={ASSETS.logoWebp} type="image/webp" />
              <img
                src={ASSETS.logoJpeg}
                width={200}
                height={200}
                className="w-full rounded-2xl border border-slate-200 object-contain shadow-sm"
                loading="eager"
                decoding="async"
                alt={`${COMPANY.brandName} logo`}
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Business details</h2>
              <p className="mt-1 text-xs text-slate-500">Use the same name, address, phone, and email everywhere you list the business.</p>
              <div className="mt-3 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{COMPANY.legalName}</div>
                <div className="mt-2">{COMPANY.streetAddress}</div>
                <div className="mt-1">
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
                title="Pune map"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Pune%2C%20Maharashtra%2C%20India&output=embed"
              />
            </div>
          </div>

          <LeadForm defaultInterest="Contact page inquiry" />
        </div>

        <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {contactFaqs.map((f) => (
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
      </section>
    </>
  )
}
