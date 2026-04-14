import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-block">
              <Logo className="h-10 w-auto max-h-12 max-w-[180px] object-contain sm:h-11" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              SM Tech Solutions Private Limited — websites, apps, automation, bulk SMS,
              and WhatsApp marketing for businesses across India.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick links
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-brand-700">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-600 hover:text-brand-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-brand-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Email:{' '}
              <a
                href="mailto:adminsmtechsolution@gmail.com"
                className="font-medium text-brand-700 hover:underline"
              >
                adminsmtechsolution@gmail.com
              </a>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} SM Tech Solutions Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
