import { Helmet } from 'react-helmet-async'
import { ASSETS, SITE } from '../../data/company'

export type SeoProps = {
  title: string
  description: string
  /** If omitted, canonical + og:url tags are skipped (useful for true 404 pages). */
  canonicalPath?: string
  ogType?: 'website' | 'article'
  /** Additional JSON-LD graphs to embed as separate script tags */
  jsonLd?: ReadonlyArray<Record<string, unknown>>
  noIndex?: boolean
  keywords?: string[]
  /** ISO 8601 for articles */
  articlePublishedTime?: string
  articleModifiedTime?: string
}

function origin(): string {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return (env?.replace(/\/$/, '') || SITE.defaultOrigin).replace(/\/$/, '')
}

export function Seo({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  jsonLd,
  noIndex = false,
  keywords,
  articlePublishedTime,
  articleModifiedTime,
}: SeoProps) {
  const siteUrl = origin()
  const path = canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : ''
  const canonical = canonicalPath ? `${siteUrl}${path === '/' ? '' : path}` : ''
  const ogImage = `${siteUrl}${ASSETS.logoWebp}`

  return (
    <Helmet htmlAttributes={{ lang: 'en-IN' }} prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(', ')} /> : null}

      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:site_name" content="AASHA-SM Technologies" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {articlePublishedTime ? <meta property="article:published_time" content={articlePublishedTime} /> : null}
      {articleModifiedTime ? <meta property="article:modified_time" content={articleModifiedTime} /> : null}

      {jsonLd?.map((obj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}
