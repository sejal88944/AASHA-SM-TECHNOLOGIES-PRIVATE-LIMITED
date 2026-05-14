import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'
import { ApplicationForm } from '../components/careers/ApplicationForm'
import { breadcrumbSchema, organizationSchema, webPageSchema, websiteSchema } from '../data/schema'
import { COMPANY } from '../data/company'

export function ApplyPage() {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      name: 'Apply — software internship Pune & startup hiring India',
      description:
        'Submit your application for internships and roles at AASHA-SM TECHNOLOGIES PRIVATE LIMITED: React developer internship Pune, Node.js internship India, HR internship Pune, and fresher software jobs India—with resume upload and structured hiring workflow.',
      path: '/apply',
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: 'Apply', path: '/apply' },
    ]),
  ]

  return (
    <>
      <Seo
        title="Apply | Software Internship Pune — IT Company Hiring Maharashtra | AASHA-SM Technologies"
        description="Professional application form for startup company jobs Pune, web development internship India, full stack internship with real projects, and software company careers Maharashtra—based in Pune with hybrid and remote options where listed."
        canonicalPath="/apply"
        jsonLd={jsonLd}
        keywords={[
          'software internship Pune',
          'IT internship for students Pune',
          'React developer internship Pune',
          'Node.js internship India',
          'startup company jobs Pune',
          'fresher software jobs India',
          'software company careers Maharashtra',
          'startup internship with live projects Pune',
        ]}
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <p className="text-sm font-semibold text-cyan-200">Hiring · Pune · Maharashtra · India</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Submit your application</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Join {COMPANY.brandName} for startup-style learning: mentorship, live delivery discipline, and modern stacks. This form feeds our
            secure hiring pipeline—{COMPANY.legalName}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 font-semibold hover:bg-white/15" to="/careers">
              Back to careers
            </Link>
            <Link className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 font-semibold hover:bg-white/15" to="/jobs">
              Browse jobs
            </Link>
            <Link className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 font-semibold hover:bg-white/15" to="/internship">
              Internships
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <ApplicationForm />
      </div>
    </>
  )
}
