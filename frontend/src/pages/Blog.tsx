import { Link } from 'react-router-dom'

type BlogPost = {
  slug: string
  title: string
  date: string
  content: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'sms-automation-india',
    title: 'How SMS Automation India Helps Businesses Respond Faster',
    date: '2026-04-27',
    content: [
      'SMS automation India helps businesses send instant updates for leads, reminders, and service alerts. Instead of manual follow-up, teams can automate recurring communication and save time every day.',
      'When response time improves, lead quality and conversion rates also improve. A simple automated SMS flow can reduce missed enquiries and keep customers engaged through each stage of the buying process.',
    ],
  },
  {
    slug: 'website-development-india',
    title: 'Website Development India: What Creates More Leads',
    date: '2026-04-27',
    content: [
      'A lead-focused website is not just design. It includes clear service messaging, fast loading speed, mobile-friendly layout, and a visible contact path. These basics increase trust and reduce drop-off.',
      'For most businesses, strong website development India strategy means better visibility on search and more qualified enquiries. Keep content clear, add CTA buttons, and connect forms to your sales process.',
    ],
  },
  {
    slug: 'api-integration-services',
    title: 'API Integration Services for Smoother Operations',
    date: '2026-04-27',
    content: [
      'API integration services connect your website, CRM, and communication tools so data moves automatically. This removes repeated manual entry and gives teams one reliable workflow.',
      'With connected systems, your business gets faster execution, fewer mistakes, and better reporting. Combined with automation, API integrations support long-term growth and a stronger customer experience.',
    ],
  },
]

export function Blog() {
  return (
    <div className="bg-white">
      <section
        className="border-b border-slate-200/80 bg-hero-mesh py-20 sm:py-24"
        aria-labelledby="blog-page-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-800 sm:text-sm">
              Blog
            </p>
            <h1
              id="blog-page-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-brand-950 sm:mt-4 sm:text-5xl"
            >
              Practical insights for business growth
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Short articles on SMS automation India, website development India, and API integration
              services to help you make better digital decisions.
            </p>
          </header>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-label="Blog posts">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-950">
                  {post.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {post.content.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-700">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <Link to="/services" className="font-medium text-brand-900 hover:underline">
                    Explore Services
                  </Link>
                  <span className="text-slate-400">|</span>
                  <Link to="/contact" className="font-medium text-brand-900 hover:underline">
                    Contact Team
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
