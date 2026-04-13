import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-slate-100 text-brand"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <Logo className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          <span className="hidden font-semibold text-slate-800 sm:inline">
            SM Tech
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-1 border-b border-slate-200 bg-white p-4 shadow-md md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>
            Services
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
