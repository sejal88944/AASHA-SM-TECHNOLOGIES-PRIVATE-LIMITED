import { Link, Navigate, useLocation } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { LeadForm } from '../components/forms/LeadForm'
import { FaqSection } from '../components/sections/FaqSection'
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  websiteSchema,
} from '../data/schema'
import { SEO_LANDING_PAGES, getSeoLandingByPath } from '../data/seoLandings'
import { services } from '../data/servicesContent'

function relatedLinkLabel(path: string): string {
  const lp = SEO_LANDING_PAGES.find((x) => x.path === path)
  if (lp) return lp.shortNavTitle
  const svc = services.find((x) => x.path === path)
  if (svc) return svc.shortTitle
  return path.replace(/^\//, '')
}

export function SeoLandingPage() {
  const { pathname } = useLocation()
  const page = getSeoLandingByPath(pathname)

  if (!page) {
    return <Navigate to="/services" replace />
  }

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema({
      name: page.h1,
      description: page.metaDescription,
      path: page.path,
    }),
    serviceSchema({
      name: page.title,
      description: page.metaDescription,
      path: page.path,
      category: 'Information Technology Service',
    }),
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: page.shortNavTitle, path: page.path },
    ]),
  ]

  return (
    <>
      <Seo title={page.title} description={page.metaDescription} canonicalPath={page.path} jsonLd={jsonLd} keywords={page.keywords} />

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
            <span className="text-slate-900">{page.shortNavTitle}</span>
          </nav>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{page.h1}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
            AASHA-SM TECHNOLOGIES PRIVATE LIMITED · Pune, Maharashtra — delivery across India. This guide is written for buyers comparing
            vendors with serious integration and rollout requirements.
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
              to={page.servicePath}
            >
              View service hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <article className="min-w-0 lg:col-span-2">
            {page.sections.map((sec) => {
              const Tag = sec.level === 2 ? 'h2' : 'h3'
              return (
                <section key={sec.heading} className="mt-10 first:mt-0">
                  <Tag className={`font-semibold tracking-tight text-slate-900 ${sec.level === 2 ? 'text-xl' : 'text-lg'}`}>
                    {sec.heading}
                  </Tag>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {p}
                    </p>
                  ))}
                </section>
              )
            })}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-slate-900">Related guides & hubs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Strong internal linking helps buyers explore depth—and helps search engines understand topical relationships.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {page.relatedPaths.map((rp) => (
                  <li key={rp}>
                    <Link className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100" to={rp}>
                      {relatedLinkLabel(rp)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="min-w-0 lg:sticky lg:top-24">
            <LeadForm defaultInterest={`SEO guide: ${page.path}`} />
          </div>
        </div>
      </section>

      <FaqSection title="FAQs" faqs={page.faqs} />
    </>
  )
}
