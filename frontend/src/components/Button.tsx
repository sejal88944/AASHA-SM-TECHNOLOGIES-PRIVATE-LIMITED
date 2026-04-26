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
  'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'

const variants = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-white text-brand-700 shadow-soft ring-1 ring-brand-200 hover:bg-brand-50',
  outline:
    'border-2 border-brand-600 text-brand-700 hover:bg-brand-50 bg-white/80',
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
