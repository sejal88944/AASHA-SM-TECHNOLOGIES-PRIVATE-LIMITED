import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Go to Home
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Contact Support
        </Link>
      </div>
    </section>
  )
}
