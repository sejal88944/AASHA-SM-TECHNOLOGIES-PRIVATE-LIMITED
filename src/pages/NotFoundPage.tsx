import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | AASHA-SM Technologies"
        description="The page you requested could not be found. Use the links below to continue browsing IT services, service hubs, and blog content."
        noIndex
      />
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">404 — page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          This URL is not part of the published site structure. If you followed an old link, tell us which page you expected—we can set up redirects.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800" to="/">
            Go home
          </Link>
          <Link className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
