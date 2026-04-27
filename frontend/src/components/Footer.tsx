import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <Link to="/" className="inline-block max-w-full">
              <Logo className="block h-10 w-auto max-h-12 max-w-[min(100%,300px)] object-contain object-left sm:h-11 sm:max-w-[340px]" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              AASHA-SM TECHNOLOGIES PRIVATE LIMITED — IT company Maharashtra; website
              development Pune; SMS automation India; plus apps, integrations, bulk SMS,
              and WhatsApp marketing for businesses.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-950 sm:text-sm">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-brand-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-brand-900">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-600 hover:text-brand-900"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-brand-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-950 sm:text-sm">
              Contact
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              Email:{' '}
              <a
                href="mailto:adminsmtechsolution@gmail.com"
                className="font-medium text-brand-900 hover:underline"
              >
                adminsmtechsolution@gmail.com
              </a>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} AASHA-SM TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
