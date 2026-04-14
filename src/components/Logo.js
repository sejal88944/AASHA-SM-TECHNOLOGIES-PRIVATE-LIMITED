export default function Logo({ className = "h-10 w-auto", alt = "SM Tech logo" }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt={alt}
      className={className}
      decoding="async"
      loading="lazy"
    />
  );
}
