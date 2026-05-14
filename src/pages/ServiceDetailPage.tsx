import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { LeadForm } from '../components/forms/LeadForm'
import { FaqSection } from '../components/sections/FaqSection'
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema, websiteSchema } from '../data/schema'
import { getServiceBySlug, services } from '../data/servicesContent'
import { getSeoLandingForServiceSlug } from '../data/seoLandings'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const seoGuidePath = getSeoLandingForServiceSlug(service.slug)

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    serviceSchema({
      name: service.title,
      description: service.metaDescription,
      path: service.path,
      category: 'Information Technology Service',
    }),
    faqSchema(service.faqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.shortTitle, path: service.path },
    ]),
  ]

  return (
    <>
      <Seo
        title={service.title}
        description={service.metaDescription}
        canonicalPath={service.path}
        jsonLd={jsonLd}
        keywords={[service.primaryKeyword, 'IT company in Pune', 'software development company Maharashtra']}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="text-xs text-slate-600">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link className="hover:underline" to="/services">
              Services
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-900">{service.shortTitle}</span>
          </nav>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{service.h1}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-700 sm:text-base">{service.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800" to="/contact">
              Get Free Consultation
            </Link>
            <Link className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50" to="/services">
              Back to services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="min-w-0 lg:col-span-2">
            {service.intro.map((p, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                {p}
              </p>
            ))}

            <h2 className="mt-10 text-xl font-semibold tracking-tight text-slate-900">What we emphasize on delivery</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {service.sections.map((sec) => {
              const Tag = sec.level === 2 ? 'h2' : 'h3'
              return (
                <div key={sec.title} className="mt-10">
                  <Tag className={`font-semibold tracking-tight text-slate-900 ${sec.level === 2 ? 'text-xl' : 'text-lg'}`}>
                    {sec.title}
                  </Tag>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              )
            })}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Related services</h2>
              <p className="mt-2 text-sm text-slate-600">Explore adjacent capabilities that often ship together with this engagement.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.relatedSlugs.map((rs) => {
                  const rel = services.find((x) => x.slug === rs)
                  if (!rel) return null
                  return (
                    <Link key={rs} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100" to={rel.path}>
                      {rel.shortTitle}
                    </Link>
                  )
                })}
                <Link className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100" to="/blog">
                  Insights
                </Link>
              </div>
            </div>

            {seoGuidePath ? (
              <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Location & keyword guide</h2>
                <p className="mt-2 text-sm text-slate-700">
                  Long-form guide for buyers searching by geography and service intent—linked from this service hub for clearer internal
                  discovery.
                </p>
                <Link className="mt-3 inline-flex text-sm font-semibold text-cyan-800 hover:underline" to={seoGuidePath}>
                  Open SEO guide →
                </Link>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <LeadForm defaultInterest={`Service: ${service.shortTitle}`} />
          </div>
        </div>
      </section>

      <FaqSection title="FAQs" faqs={service.faqs} />
    </>
  )
}
