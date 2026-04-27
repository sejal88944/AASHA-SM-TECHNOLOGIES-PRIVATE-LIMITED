import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from '../config/site'

type SeoConfig = {
  title: string
  description: string
}

const SITE_NAME = 'AASHA-SM TECHNOLOGIES PRIVATE LIMITED'
const HOME_TITLE =
  'SMS Automation India & Website Development India | AASHA-SM TECHNOLOGIES'
const DEFAULT_DESCRIPTION =
  'IT company Maharashtra businesses trust for SMS automation India and website development India. Get practical digital solutions for growth.'
const KEYWORDS =
  'SMS automation India, website development India, IT company Maharashtra'
const OG_IMAGE = `${SITE_ORIGIN}/logo.webp?v=4`
const OG_IMAGE_ALT = 'AASHA-SM TECHNOLOGIES logo'

const ROUTE_SEO: Record<string, SeoConfig> = {
  '/': {
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `About Us | IT Company Maharashtra | AASHA-SM TECHNOLOGIES`,
    description:
      `Learn about ${SITE_NAME}: website development Pune, SMS automation India, API integration, and how we work with clients across Maharashtra and beyond.`,
  },
  '/services': {
    title: `IT Services Pune & SMS Automation | AASHA-SM TECHNOLOGIES`,
    description:
      'Explore website development Pune, SMS automation India, integrations, and IT services from a Maharashtra-based technology partner.',
  },
  '/blog': {
    title: `Blog | SMS Automation India & Website Development India`,
    description:
      'Read practical guides on SMS automation India, website development India, and API integration services to improve business growth.',
  },
  '/contact': {
    title: `Contact | Website Development & SMS Automation | Pune`,
    description:
      `Contact ${SITE_NAME} for website development in Pune, SMS automation across India, API work, demos, and quotes.`,
  },
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname || '/'
}

export function Seo() {
  const { pathname } = useLocation()
  const path = normalizePath(pathname)
  const seo = ROUTE_SEO[path] ?? ROUTE_SEO['/']
  const canonical = `${SITE_ORIGIN}${path === '/' ? '/' : path}`

  useEffect(() => {
    document.title = seo.title

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', seo.description)

    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', KEYWORDS)

    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonical)

    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute('content', canonical)

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', seo.title)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.setAttribute('content', seo.description)

    let ogSite = document.querySelector('meta[property="og:site_name"]')
    if (!ogSite) {
      ogSite = document.createElement('meta')
      ogSite.setAttribute('property', 'og:site_name')
      document.head.appendChild(ogSite)
    }
    ogSite.setAttribute('content', SITE_NAME)

    let ogImage = document.querySelector('meta[property="og:image"]')
    if (!ogImage) {
      ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      document.head.appendChild(ogImage)
    }
    ogImage.setAttribute('content', OG_IMAGE)

    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]')
    if (!ogImageAlt) {
      ogImageAlt = document.createElement('meta')
      ogImageAlt.setAttribute('property', 'og:image:alt')
      document.head.appendChild(ogImageAlt)
    }
    ogImageAlt.setAttribute('content', OG_IMAGE_ALT)
  }, [canonical, seo.description, seo.title])

  return null
}
