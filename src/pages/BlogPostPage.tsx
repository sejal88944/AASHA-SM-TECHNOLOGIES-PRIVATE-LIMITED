import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { getPostBySlug } from '../data/blogPosts'
import { articleSchema, breadcrumbSchema, faqSchema, organizationSchema, websiteSchema } from '../data/schema'
import type { FaqItem } from '../data/schema'
import { ASSETS } from '../data/company'

const blogFaqs: FaqItem[] = [
  {
    question: 'Why do these articles link to service pages?',
    answer:
      'So readers can go from an idea to the right service page quickly—without hunting through the site.',
  },
  {
    question: 'Can we republish this content on Medium or LinkedIn?',
    answer:
      'Canonical tags protect this site as the primary source. If you syndicate, use canonical references or materially unique summaries to avoid duplicate indexing issues.',
  },
]

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const path = `/blog/${post.slug}`
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    articleSchema({
      headline: post.title,
      description: post.description,
      path,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: post.author,
    }),
    faqSchema(blogFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path },
    ]),
  ]

  return (
    <>
      <Seo
        title={`${post.title} | AASHA-SM Technologies Blog`}
        description={post.description}
        canonicalPath={path}
        ogType="article"
        jsonLd={jsonLd}
        keywords={post.keywords}
        articlePublishedTime={`${post.datePublished}T08:00:00+05:30`}
        articleModifiedTime={`${post.dateModified}T08:00:00+05:30`}
      />

      <article className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <nav className="text-xs text-slate-600">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link className="hover:underline" to="/blog">
              Blog
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-900">{post.title}</span>
          </nav>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Updated {post.dateModified} • {post.readMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{post.description}</p>
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <picture>
          <source srcSet={ASSETS.logoWebp} type="image/webp" />
          <img
            className="w-full rounded-2xl border border-slate-200 bg-white object-contain p-2"
            src={ASSETS.logoJpeg}
            width={1024}
            height={170}
            loading="lazy"
            decoding="async"
            alt={post.heroAlt}
          />
        </picture>

        <div className="prose prose-slate mt-10 max-w-none">
          {post.sections.map((sec) => {
            const Tag = sec.level === 2 ? 'h2' : 'h3'
            return (
              <section key={sec.heading}>
                <Tag className="mt-10 text-xl font-semibold tracking-tight text-slate-900 first:mt-0">{sec.heading}</Tag>
                {sec.body.map((p, idx) => (
                  <p key={idx} className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {p}
                  </p>
                ))}
              </section>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recommended next pages</h2>
          <p className="mt-2 text-sm text-slate-600">
            Move from reading to evaluation with service hubs aligned to this topic.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-semibold text-slate-900">
            <li>
              <Link className="hover:underline" to="/services/website-development">
                Website Development
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/services/sms-automation">
                SMS Automation
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/services/api-integration">
                API Integration
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/services/crm-erp-software">
                CRM / ERP Software
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/services/whatsapp-marketing">
                WhatsApp Marketing
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/services/mobile-app-development">
                Mobile App Development
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {blogFaqs.map((f) => (
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

        <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
          <p className="text-sm font-semibold">{post.cta}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100" to="/contact">
              Request Quote
            </Link>
            <Link className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" to="/services">
              Services overview
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
