import { ASSETS, COMPANY } from '../data/company'

/** Wide mark (1024×170). Never use a square box with `object-cover` — it crops to a vertical slice. */
export function BrandLogo({
  variant,
  loading = 'lazy',
}: {
  variant: 'header' | 'footer'
  loading?: 'eager' | 'lazy'
}) {
  const shell =
    variant === 'header'
      ? 'h-10 w-[min(15rem,calc(100vw-7rem))] shrink-0 rounded-lg border border-slate-200/90 bg-white px-1.5 py-0.5 sm:w-60'
      : 'h-11 w-full max-w-full shrink-0 self-start rounded-lg border border-slate-700 bg-white px-2 py-0.5 xl:max-w-[min(240px,100%)]'

  return (
    <picture className={`block ${shell}`}>
      <source srcSet={ASSETS.logoWebp} type="image/webp" />
      <img
        src={ASSETS.logoJpeg}
        width={1024}
        height={170}
        className="h-full w-full object-contain object-left"
        loading={loading}
        decoding="async"
        alt={COMPANY.brandName}
      />
    </picture>
  )
}
