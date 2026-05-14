import type { FaqItem } from '../schema'

export type SeoLandingPageDef = {
  path: string
  /** Short label for breadcrumbs and UI */
  shortNavTitle: string
  title: string
  metaDescription: string
  h1: string
  keywords: string[]
  /** Primary service hub for internal links */
  servicePath: string
  sections: { heading: string; level: 2 | 3; paragraphs: string[] }[]
  faqs: FaqItem[]
  relatedPaths: string[]
}
