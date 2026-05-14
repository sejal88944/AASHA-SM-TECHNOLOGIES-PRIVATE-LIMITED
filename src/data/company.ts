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
  linkedinUrl: 'https://www.linkedin.com/company/aashasm-technologies',
  foundingYear: 2020,
  priceCurrency: 'INR',
  geo: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  hours: ['Mo-Fr 09:30-19:00', 'Sa 10:00-14:00'],
} as const

/** Static assets in `/public` */
export const ASSETS = {
  logoWebp: '/logo.webp',
  logoJpeg: '/logo.jpeg',
  faviconJpeg: '/favicon.jpg',
} as const

export const SITE = {
  defaultOrigin: 'https://www.aashasmtechnologies.com',
} as const
