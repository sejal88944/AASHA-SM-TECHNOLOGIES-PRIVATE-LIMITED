import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-slate-100 text-brand-900'
      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-900'
  }`

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex shrink-0 items-center py-0.5"
          onClick={() => setOpen(false)}
        >
          <Logo
            priority
            className="block h-9 w-auto max-h-10 max-w-[min(72vw,280px)] object-contain object-left sm:h-10 sm:max-h-11 sm:max-w-[320px]"
          />
        </NavLink>

        <ul className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          <li>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-900 hover:bg-slate-50 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
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
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1" aria-label="Mobile primary">
            <li>
              <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
