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
import { CAREERS_DATE_POSTED, CAREERS_VALID_THROUGH, careerPositions, jobDescriptionPlain } from '../data/careersPositions'
import { careersFaqs } from '../data/careersFaqs'

export function JobsPage() {
  const tech = careerPositions.filter((p) => p.category === 'tech')
  const nonTech = careerPositions.filter((p) => p.category === 'non-tech')

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema({
      name: 'Jobs — startup company jobs Pune & software company careers Maharashtra',
      description:
        'Open roles at AASHA-SM TECHNOLOGIES PRIVATE LIMITED: engineering interns, trainees, and business roles across Pune, Maharashtra, and India.',
      path: '/jobs',
    }),
    faqSchema(careersFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: 'Jobs', path: '/jobs' },
    ]),
    ...careerPositions.map((p) =>
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
        title="Jobs | Startup Company Jobs Pune & Fresher Software Jobs India | AASHA-SM"
        description="Browse open roles: frontend developer internship Pune, backend Node.js internships, full stack internship with real projects, HR internship Pune, BD, operations, and more—AASHA-SM TECHNOLOGIES PRIVATE LIMITED."
        canonicalPath="/jobs"
        jsonLd={jsonLd}
        keywords={[
          'startup company jobs Pune',
          'fresher software jobs India',
          'software company careers Maharashtra',
          'React.js trainee jobs',
          'Node.js fresher internship',
          'IT company hiring Pune',
        ]}
      />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="text-xs text-slate-600">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link className="hover:underline" to="/careers">
              Careers
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-900">Jobs</span>
          </nav>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Open roles — build with us</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Every listing includes responsibilities, skills, work mode, and growth notes. Applications open through our contact form—no
            separate ATS required for your first introduction. For internship-first tracks, also see{' '}
            <Link className="font-semibold text-slate-900 hover:underline" to="/internship">
              /internship
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Tech positions</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Engineering, design, QA, and growth-tech tracks aligned with website development internship in Maharashtra and API integration
          learning paths.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {tech.map((p) => (
            <PositionCard key={p.id} position={p} />
          ))}
        </div>

        <h2 className="mt-16 text-xl font-semibold tracking-tight text-slate-900">Non-tech positions</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          HR, finance, operations, sales, and content roles that keep delivery teams focused and clients supported across India.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {nonTech.map((p) => (
            <PositionCard key={p.id} position={p} />
          ))}
        </div>
      </section>

      <FaqSection title="Hiring FAQs" faqs={careersFaqs} subhead="Answers for candidates comparing IT internships Maharashtra and startup hiring options." />
    </>
  )
}
