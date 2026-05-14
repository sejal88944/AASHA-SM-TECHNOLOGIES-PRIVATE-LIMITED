import { ASSETS, COMPANY, SITE } from './company'

function siteOrigin(): string {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return (env?.replace(/\/$/, '') || SITE.defaultOrigin).replace(/\/$/, '')
}

export function organizationSchema() {
  const url = siteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: COMPANY.legalName,
    alternateName: COMPANY.brandName,
    url,
    logo: `${url}${ASSETS.logoWebp}`,
    email: COMPANY.email,
    telephone: COMPANY.phoneE164,
    foundingDate: String(COMPANY.foundingYear),
    areaServed: ['IN', 'Maharashtra', 'Pune'],
    sameAs: [COMPANY.linkedinUrl],
    description:
      'AASHA-SM TECHNOLOGIES PRIVATE LIMITED delivers website development, SMS automation, WhatsApp marketing, API integration, CRM software, and mobile app development for teams in Pune, Maharashtra, and across India.',
    knowsAbout: [
      'Website development',
      'SMS automation',
      'WhatsApp Business API',
      'API integration',
      'CRM software',
      'Mobile app development',
      'Business automation',
    ],
  }
}

export function websiteSchema() {
  const url = siteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name: COMPANY.brandName,
    publisher: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function webPageSchema(input: { name: string; description: string; path: string }) {
  const url = siteOrigin()
  const pageUrl = `${url}${input.path.startsWith('/') ? input.path : `/${input.path}`}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: input.name,
    description: input.description,
    isPartOf: { '@id': `${url}/#website` },
    about: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function localBusinessSchema() {
  const url = siteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#localbusiness`,
    name: COMPANY.brandName,
    image: `${url}${ASSETS.logoWebp}`,
    url,
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    priceRange: '₹₹',
    description:
      'IT services company based in Pune, Maharashtra: websites, SMS and WhatsApp automation, API integrations, CRM implementations, and mobile apps — serving clients across India.',
    hasMap: COMPANY.mapsEmbedUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    openingHours: [...COMPANY.hours],
    areaServed: [
      { '@type': 'City', name: 'Pune' },
      { '@type': 'State', name: 'Maharashtra' },
      { '@type': 'Country', name: 'India' },
    ],
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
  category?: string
}) {
  const url = siteOrigin()
  const serviceUrl = `${url}${input.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: serviceUrl,
    provider: { '@id': `${url}/#organization` },
    areaServed: ['India', 'Maharashtra', 'Pune'],
    serviceType: input.category ?? 'Information Technology',
    brand: { '@id': `${url}/#organization` },
  }
}

export type FaqItem = { question: string; answer: string }

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const url = siteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${url}${it.path.startsWith('/') ? it.path : `/${it.path}`}`,
    })),
  }
}

export function articleSchema(input: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified: string
  author: string
}) {
  const url = siteOrigin()
  const articleUrl = `${url}${input.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { '@type': 'Organization', name: input.author },
    publisher: { '@id': `${url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    inLanguage: 'en-IN',
  }
}
