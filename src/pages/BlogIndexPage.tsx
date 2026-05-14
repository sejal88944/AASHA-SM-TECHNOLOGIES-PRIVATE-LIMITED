import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { blogPosts } from '../data/blogPosts'
import { breadcrumbSchema, organizationSchema, websiteSchema } from '../data/schema'

export function BlogIndexPage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ]

  return (
    <>
      <Seo
        title="Blog | IT Services, Automation, APIs, CRM & SEO Playbooks — AASHA-SM Technologies"
        description="Practical articles on website development company India delivery, SMS automation India, API integration services India, WhatsApp marketing services India, and CRM software development India—written for founders and procurement teams."
        canonicalPath="/blog"
        jsonLd={jsonLd}
        keywords={[
          'website development company India',
          'SMS automation India',
          'API integration services India',
          'WhatsApp marketing services India',
          'CRM software development India',
        ]}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Insights & playbooks</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Practical notes on delivery, integrations, messaging, and CRM—written for teams who need clarity before they buy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {blogPosts.map((p) => (
            <article key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {p.dateModified} • {p.readMinutes} min read
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                <Link className="hover:underline" to={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.description}</p>
              <div className="mt-6">
                <Link className="text-sm font-semibold text-slate-900 hover:underline" to={`/blog/${p.slug}`}>
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
