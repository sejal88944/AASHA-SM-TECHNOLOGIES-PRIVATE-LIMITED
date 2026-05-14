import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { PositionCard } from '../components/careers/PositionCard'
import { FaqSection } from '../components/sections/FaqSection'
import {
  breadcrumbSchema,
  faqSchema,
  jobPostingSchema,
  localBusinessSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from '../data/schema'
import {
  CAREERS_DATE_POSTED,
  CAREERS_VALID_THROUGH,
  jobDescriptionPlain,
  positionsInPool,
} from '../data/careersPositions'
import { careersFaqs } from '../data/careersFaqs'

export function InternshipPage() {
  const interns = positionsInPool('internship')

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema({
      name: 'Internships — software internship Pune & web development internship India',
      description:
        'Internship programs at AASHA-SM TECHNOLOGIES PRIVATE LIMITED for students and freshers: React, Node, mobile, QA, HR, content, and more—with hybrid and remote options where listed.',
      path: '/internship',
    }),
    faqSchema(careersFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: 'Internship', path: '/internship' },
    ]),
    ...interns.map((p) =>
      jobPostingSchema({
        title: p.seoTitle,
        description: jobDescriptionPlain(p),
        identifier: p.id,
        employmentType: p.employmentType,
        datePosted: CAREERS_DATE_POSTED,
        validThrough: CAREERS_VALID_THROUGH,
      }),
    ),
  ]

  return (
    <>
      <Seo
        title="Internships | Software Internship Pune & React Developer Internship | AASHA-SM"
        description="Software internship Pune, React developer internship Pune, Node.js internship India, frontend developer internship, backend developer internship, HR internship Pune, and startup internship with live projects—apply via AASHA-SM TECHNOLOGIES PRIVATE LIMITED."
        canonicalPath="/internship"
        jsonLd={jsonLd}
        keywords={[
          'software internship Pune',
          'React developer internship Pune',
          'web development internship India',
          'Node.js internship India',
          'frontend developer internship',
          'backend developer internship',
          'full stack developer internship',
          'HR internship Pune',
          'startup internship with live projects Pune',
          'software development internship for students India',
        ]}
      />

      <section className="border-b border-slate-200 bg-gradient-to-b from-cyan-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <nav className="text-xs text-slate-600">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link className="hover:underline" to="/careers">
              Careers
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-900">Internship</span>
          </nav>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Internships built around live delivery—not slide decks only
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
            We welcome students and freshers across India who want structured mentorship on real engineering and GTM workstreams. If
            you are exploring full stack internship with real projects or website development internship in Maharashtra, start here—then
            use Apply Now on any card to pre-fill your interest for our team in Pune.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800" to="/jobs">
              View all jobs board
            </Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50" to="/careers">
              Careers home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Current internship-friendly openings</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Includes dedicated internships and selected trainee tracks. Full-time executive roles live on the{' '}
          <Link className="font-semibold text-slate-900 hover:underline" to="/jobs">
            jobs
          </Link>{' '}
          page.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {interns.map((p) => (
            <PositionCard key={p.id} position={p} />
          ))}
        </div>
      </section>

      <FaqSection
        title="Internship FAQs"
        faqs={careersFaqs}
        subhead="Covers remote options, live projects, training, and who can apply for IT internship for students Pune and India-wide."
      />
    </>
  )
}
