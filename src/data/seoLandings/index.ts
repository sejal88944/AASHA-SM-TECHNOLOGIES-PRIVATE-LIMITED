import { apiIntegrationServices } from './apiIntegrationServices'
import { crmSoftwareDevelopmentIndia } from './crmSoftwareDevelopmentIndia'
import { mobileAppDevelopmentPune } from './mobileAppDevelopmentPune'
import { smsAutomationIndia } from './smsAutomationIndia'
import { websiteDevelopmentPune } from './websiteDevelopmentPune'
import { whatsappMarketingIndia } from './whatsappMarketingIndia'
import type { SeoLandingPageDef } from './types'

export type { SeoLandingPageDef } from './types'

export const SEO_LANDING_PAGES: SeoLandingPageDef[] = [
  websiteDevelopmentPune,
  smsAutomationIndia,
  apiIntegrationServices,
  crmSoftwareDevelopmentIndia,
  mobileAppDevelopmentPune,
  whatsappMarketingIndia,
]

export const SEO_LANDING_PATHS = SEO_LANDING_PAGES.map((p) => p.path)

export function getSeoLandingByPath(pathname: string): SeoLandingPageDef | undefined {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return SEO_LANDING_PAGES.find((p) => p.path === normalized)
}

export function getSeoLandingForServiceSlug(slug: string): string | undefined {
  const map: Record<string, string> = {
    'website-development': '/website-development-pune',
    'sms-automation': '/sms-automation-india',
    'api-integration': '/api-integration-services',
    'crm-erp-software': '/crm-software-development-india',
    'mobile-app-development': '/mobile-app-development-pune',
    'whatsapp-marketing': '/whatsapp-marketing-india',
  }
  return map[slug]
}
