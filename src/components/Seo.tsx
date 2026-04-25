import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from '../config/site'

type SeoConfig = {
  title: string
  description: string
}

const ROUTE_SEO: Record<string, SeoConfig> = {
  '/': {
    title: 'SM Tech Solutions Private Limited | IT & Digital Services in India',
    description:
      'SM Tech Solutions Private Limited — websites, automation, bulk SMS, WhatsApp marketing and software for businesses across India.',
  },
  '/services': {
    title: 'Services | SM Tech Solutions Private Limited',
    description:
      'Explore digital services from SM Tech Solutions Private Limited: development, integrations, SMS, WhatsApp and more for Indian businesses.',
  },
  '/contact': {
    title: 'Contact | SM Tech Solutions Private Limited',
    description:
      'Contact SM Tech Solutions Private Limited for demos, quotes and support. Serving clients across India.',
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
  }, [canonical, seo.description, seo.title])

  return null
}
