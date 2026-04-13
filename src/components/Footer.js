import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CONTACT_EMAIL } from "../config";
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
            Smart digital solutions for modern businesses—websites, apps, and automation.
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
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-100/80 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SM Tech Solutions Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
