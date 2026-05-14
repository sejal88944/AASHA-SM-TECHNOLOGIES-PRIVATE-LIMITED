import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { services } from '../data/servicesContent'
import { ASSETS, COMPANY } from '../data/company'
import { breadcrumbSchema, organizationSchema, websiteSchema } from '../data/schema'

export function ServicesPage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  ]

  return (
    <>
      <Seo
        title="IT Services in Pune & India | Websites, SMS, WhatsApp, APIs, CRM & Mobile Apps"
        description="Explore AASHA-SM Technologies services: website development company India delivery, SMS automation India, WhatsApp marketing services India, API integration services India, CRM software development India, and mobile app development—engineered for performance, reliability, and integrations."
        canonicalPath="/services"
        jsonLd={jsonLd}
        keywords={[
          'IT company in Pune',
          'website development company India',
          'SMS automation India',
          'WhatsApp marketing services India',
          'API integration services India',
          'CRM software development India',
          'mobile app development',
        ]}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">Services overview</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Engineering, integrations, and go-to-market systems—delivered safely
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Messaging depends on APIs. APIs depend on clean data in your CRM and finance tools. Websites should turn that story
                into qualified conversations—without brittle manual work in between.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  to="/contact"
                >
                  Get Free Consultation
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  to="/blog"
                >
                  Read insights
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-xs shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <picture>
                <source srcSet={ASSETS.logoWebp} type="image/webp" />
                <img
                  src={ASSETS.logoJpeg}
                  width={320}
                  height={320}
                  className="mx-auto h-auto w-full max-w-[220px] rounded-lg object-contain"
                  loading="eager"
                  decoding="async"
                  alt={`${COMPANY.brandName} logo`}
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                <Link className="hover:underline" to={s.path}>
                  {s.shortTitle}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.subhead}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.relatedSlugs.map((slug) => {
                  const rel = services.find((x) => x.slug === slug)
                  if (!rel) return null
                  return (
                    <Link
                      key={slug}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                      to={rel.path}
                    >
                      Related: {rel.shortTitle}
                    </Link>
                  )
                })}
              </div>
              <div className="mt-6">
                <Link className="text-sm font-semibold text-slate-900 hover:underline" to={s.path}>
                  Open service page →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
