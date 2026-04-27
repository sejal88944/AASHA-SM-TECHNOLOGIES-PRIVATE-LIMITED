import { publicAsset } from '../config/publicAssets'

type LogoProps = {
  className?: string
  /** LCP: eager load + high fetch priority (e.g. header). Omit in footer. */
  priority?: boolean
}

/** Wordmark; WebP when supported with JPEG fallback. Layout classes belong on `<picture>`. */
export function Logo({
  className = 'block h-9 w-auto max-h-10 object-contain object-left sm:h-10 sm:max-h-11',
  priority = false,
}: LogoProps) {
  const alt =
    'AASHA-SM TECHNOLOGIES — website development Pune, SMS automation India, IT company Maharashtra'
  const jpeg = publicAsset('/logo.jpeg')
  const webp = publicAsset('/logo.webp')

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} sizes="(max-width: 640px) 72vw, 320px" />
      <img
        src={jpeg}
        alt={alt}
        className="h-full w-auto max-w-full object-contain object-left"
        width={1024}
        height={170}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        sizes="(max-width: 640px) 72vw, 320px"
      />
    </picture>
  )
}
