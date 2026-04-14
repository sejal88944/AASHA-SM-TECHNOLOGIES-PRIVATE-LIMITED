type LogoProps = {
  className?: string
}

export function Logo({ className = 'h-9 w-auto max-h-11 object-contain' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="SM TECH SOLUTIONS"
      className={className}
      width={160}
      height={72}
      loading="lazy"
      decoding="async"
    />
  )
}
