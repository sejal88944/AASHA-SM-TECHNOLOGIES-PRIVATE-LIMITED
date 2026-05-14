import faviconUrl from '../assets/favicon.jpg'
import logoJpegUrl from '../assets/logo.jpeg'
import logoWebpUrl from '../assets/logo.webp'

/**
 * NAP: keep address/phone/email aligned with Google Business Profile and invoices.
 */
export const COMPANY = {
  legalName: 'AASHA-SM TECHNOLOGIES PRIVATE LIMITED',
  brandName: 'AASHA-SM Technologies',
  tagline: 'Enterprise-grade delivery with startup speed',
  region: 'Pune, Maharashtra, India',
  addressLocality: 'Pune',
  addressRegion: 'MH',
  addressCountry: 'IN',
  streetAddress: 'Pune (service delivery across Maharashtra & India)',
  postalCode: '411045',
  phoneDisplay: '+91 95299 98320',
  phoneE164: '+919529998320',
  email: 'adminsmtechsolution@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/company/aasha-sm-technologies',
  foundingYear: 2020,
  priceCurrency: 'INR',
  geo: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  hours: ['Mo-Fr 09:30-19:00', 'Sa 10:00-14:00'],
  /** Google Maps embed (no API key) — Pune / Maharashtra service area */
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Pune%2C+Maharashtra%2C+India&hl=en&z=11&output=embed',
} as const

/** Resolved asset URLs (Vite — always emitted under /assets/ in dist). */
export const ASSETS = {
  logoWebp: logoWebpUrl,
  logoJpeg: logoJpegUrl,
  faviconJpeg: faviconUrl,
} as const

export const SITE = {
  /** Canonical origin (no trailing slash). Set VITE_SITE_URL on Vercel; use https://www.smtechsolutions.in if you prefer www + redirect apex → www. */
  defaultOrigin: 'https://smtechsolutions.in',
} as const
