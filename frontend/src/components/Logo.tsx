import { publicAsset } from '../config/publicAssets'

type LogoProps = {
  className?: string
}

/** Source asset is a wide wordmark (~1024×170). Intrinsic size keeps aspect ratio; CSS constrains height. */
export function Logo({
  className = 'block h-9 w-auto max-h-10 object-contain object-left sm:h-10 sm:max-h-11',
}: LogoProps) {
  return (
    <img
      src={publicAsset('/logo.jpeg')}
      alt="AASHA-SM TECHNOLOGIES PRIVATE LIMITED"
      className={className}
      width={1024}
      height={170}
      loading="eager"
      decoding="async"
    />
  )
}
