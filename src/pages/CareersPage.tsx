import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { PositionCard } from '../components/careers/PositionCard'
import { FaqSection } from '../components/sections/FaqSection'
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from '../data/schema'
import { COMPANY } from '../data/company'
import { careerPositions } from '../data/careersPositions'
import { careersFaqs } from '../data/careersFaqs'

const TECH_STACK = [
  'React.js',
  'Node.js',
  'JavaScript',
  'MongoDB',
  'SQL',
  'Python',
  'Java',
  'REST APIs',
  'Automation systems',
  'Cloud & web technologies',
]

const featuredIds = ['frontend-developer-intern', 'backend-developer-intern', 'hr-intern-executive', 'full-stack-developer-intern']

export function CareersPage() {
  const featured = featuredIds
    .map((id) => careerPositions.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    webPageSchema({
      name: 'Careers at AASHA-SM Technologies — IT company hiring Pune',
      description:
        'Startup-style careers for students and freshers: internships and roles across React, Node, mobile, QA, HR, and GTM—based in Pune with India-wide remote options where listed.',
      path: '/careers',
    }),
    faqSchema(careersFaqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
    ]),
  ]

  return (
    <>
      <Seo
        title="Careers | IT Company Hiring Pune — Internships & Jobs | AASHA-SM Technologies"
        description="Build your career with AASHA-SM TECHNOLOGIES PRIVATE LIMITED: software internship Pune, React developer internship Pune, Node.js internship India, startup company jobs Pune, and software company careers Maharashtra—with mentorship and live projects."
        canonicalPath="/careers"
        jsonLd={jsonLd}
        keywords={[
          'IT company hiring Pune',
          'software internship Pune',
          'web development internship India',
          'React developer internship Pune',
          'Node.js internship India',
          'startup company jobs Pune',
          'software company careers Maharashtra',
          'fresher software jobs India',
          'IT internship for students Pune',
        ]}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
          <p className="text-sm font-semibold text-cyan-200">Careers · Pune · Maharashtra · India</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">Build your career with {COMPANY.brandName}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Work on real-world software, automation, and digital transformation projects with a fast-growing team. We hire curious
            builders—students, interns, and freshers—who want startup internship with live projects Pune style depth, not slide-only
            training.
          </p>
          <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              to="/apply"
            >
              Apply Now
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
              to="/apply?employmentType=Internship"
            >
              Start Internship
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
              to="/jobs"
            >
              Explore opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why join us</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'Startup growth culture',
              d: 'Milestones, ownership, and direct access to senior engineers—so you learn how products actually ship in India’s competitive IT market.',
            },
            {
              t: 'Innovation & learning',
              d: 'Modern stacks (React, Node, MongoDB, APIs, automation) with code review and documentation habits that strengthen long-term employability.',
            },
            {
              t: 'Real project experience',
              d: 'We bias toward live systems, staging discipline, and client-safe delivery—aligned with software development internship for students India expectations.',
            },
            {
              t: 'Career development',
              d: 'Clear feedback loops, portfolio-worthy outcomes, and pathways toward full-time responsibilities when performance and business timing align.',
            },
            {
              t: 'Mentorship environment',
              d: 'Pairing, architecture discussions, and honest postmortems—so you build judgment, not only syntax knowledge.',
            },
            {
              t: 'Flexible work opportunities',
              d: 'Hybrid and remote-friendly roles where practical—always listed transparently on each posting for startup jobs for freshers clarity.',
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Technology stack you can grow into</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            Our client work spans website development, SMS automation, API integration, CRM / ERP, WhatsApp marketing, and mobile apps.
            Interns and trainees touch subsets of this stack based on role and maturity.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {TECH_STACK.map((t) => (
              <li
                key={t}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured openings</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              A sample of roles hiring now. Browse every position on the{' '}
              <Link className="font-semibold text-slate-900 hover:underline" to="/jobs">
                jobs board
              </Link>{' '}
              or jump to{' '}
              <Link className="font-semibold text-slate-900 hover:underline" to="/internship">
                internships
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <PositionCard key={p.id} position={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight">Explore the full hiring hub</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
            Internal linking helps candidates and search engines discover depth: services we deliver, stories on the blog, and how to
            reach our team in Pune for IT internships Maharashtra and software careers India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100" to="/jobs">
              All jobs
            </Link>
            <Link className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" to="/internship">
              Internships
            </Link>
            <Link className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" to="/services">
              Services
            </Link>
            <Link className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" to="/about">
              About
            </Link>
            <Link className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" to="/blog">
              Blog
            </Link>
            <Link className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        title="Careers FAQs"
        faqs={careersFaqs}
        subhead="Hiring FAQs for students, interns, and freshers exploring startup company internship opportunities Pune and India-wide remote-friendly roles."
      />
    </>
  )
}
