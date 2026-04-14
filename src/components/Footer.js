import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CONTACT_EMAIL, OFFICE_ADDRESS, OFFICE_MAPS_URL } from "../config";
import { services } from "../data/services";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <Logo className="h-12 w-12 object-contain" />
            <span className="text-lg font-semibold text-slate-800">
              SM Tech Solutions Pvt Ltd
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Smart digital solutions for modern businesses in Pune and across India - websites,
            automation, bulk SMS, and WhatsApp marketing.
          </p>
          <p className="mt-3 text-sm text-slate-600">{OFFICE_ADDRESS}</p>
          <p className="mt-2 text-sm">
            <a
              href={OFFICE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              Open in Maps
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {services.slice(0, 7).map((s) => (
              <li key={s.title}>
                <Link to="/services" className="hover:text-brand transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-brand break-all transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand transition-colors">
                Send a message
              </Link>
            </li>
              <li>
                <Link to="/blog" className="hover:text-brand transition-colors">
                  SEO Blog
                </Link>
              </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <iframe
          title="SM Tech Solutions — Nanded area (431717)"
          src="https://www.google.com/maps?q=Nanded%2C%20Maharashtra%20431717&output=embed"
          className="h-52 w-full rounded-xl border border-slate-200"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="border-t border-slate-200 bg-slate-100/80 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SM Tech Solutions Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
