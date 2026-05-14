import { Link, NavLink, Outlet } from 'react-router-dom'
import { BrandLogo } from '../BrandLogo'
import { COMPANY, SITE } from '../../data/company'
import { services } from '../../data/servicesContent'
import { blogPosts } from '../../data/blogPosts'

function cx(isActive: boolean): string {
  return [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
  ].join(' ')
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <BrandLogo variant="header" loading="eager" />
          <span className="sr-only">
            {COMPANY.brandName} — {COMPANY.region}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => cx(isActive)} end>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => cx(isActive)}>
            Services
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => cx(isActive)}>
            About
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => cx(isActive)}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => cx(isActive)}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={COMPANY.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 lg:inline-flex"
          >
            LinkedIn
          </a>
          <Link
            to="/contact"
            className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 sm:inline-flex"
          >
            Get Free Consultation
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <details className="relative lg:hidden">
      <summary className="list-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="flex flex-col p-2">
          <NavLink to="/" className={({ isActive }) => `${cx(isActive)}`} end>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => cx(isActive)}>
            Services
          </NavLink>
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Service pages</div>
          <div className="max-h-56 overflow-y-auto pr-1">
            {services.map((s) => (
              <NavLink key={s.slug} to={s.path} className={({ isActive }) => `${cx(isActive)} block`}>
                {s.shortTitle}
              </NavLink>
            ))}
          </div>
          <NavLink to="/about" className={({ isActive }) => cx(isActive)}>
            About
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => cx(isActive)}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => cx(isActive)}>
            Contact
          </NavLink>
          <a
            href={COMPANY.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(false)}
          >
            LinkedIn
          </a>
          <Link
            to="/contact"
            className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </details>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 [&>div]:min-w-0">
          <div className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-3">
              <BrandLogo variant="footer" />
              <div className="min-w-0 flex-1">
                <div className="break-words text-sm font-semibold text-white">{COMPANY.legalName}</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Websites, automation, APIs, CRM, and mobile apps—delivered with clear milestones and production-grade integrations.
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>
                <span className="text-slate-400">Phone: </span>
                <a className="font-medium text-white hover:underline" href={`tel:${COMPANY.phoneE164}`}>
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className="mt-1">
                <span className="text-slate-400">Email: </span>
                <a className="font-medium text-white hover:underline" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </div>
              <div className="mt-3">
                <a
                  className="text-sm font-semibold text-cyan-300 underline decoration-cyan-400/80 underline-offset-4 hover:text-cyan-200"
                  href={COMPANY.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={COMPANY.linkedinUrl}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">Services</div>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className="break-words text-slate-300 hover:text-white hover:underline" to={s.path}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">Insights</div>
            <ul className="mt-3 space-y-2 text-sm">
              {blogPosts.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link
                    className="break-words text-slate-300 hover:text-white hover:underline"
                    to={`/blog/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">Get started</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Tell us what you are building. We will propose milestones, risks, and a practical rollout sequence.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
                to="/contact"
              >
                Request Quote
              </Link>
              <Link
                className="rounded-lg border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-900"
                to="/services"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {COMPANY.legalName}. Pune, Maharashtra—serving clients across India.{' '}
          <a className="text-cyan-300 hover:underline" href={SITE.defaultOrigin} rel="noopener">
            smtechsolutions.in
          </a>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
