import { Link } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const base =
  'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900'

const variants = {
  primary:
    'bg-brand-900 text-white shadow-sm hover:bg-brand-800 active:bg-brand-950',
  secondary:
    'bg-white text-brand-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50',
  outline:
    'border border-brand-900 text-brand-900 hover:bg-slate-50 bg-white',
}

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
