const SITE_URL = (process.env.SITE_URL || 'https://smtechsolutions.in').replace(/\/$/, '')

const PATHS = [
  '/',
  '/services',
  '/about',
  '/contact',
  '/blog',
  '/services/website-development',
  '/services/sms-automation',
  '/services/api-integration',
  '/services/crm-erp-software',
  '/services/mobile-app-development',
  '/services/whatsapp-marketing',
  '/blog/website-development-cost-india',
  '/blog/sms-automation-compliance-india',
  '/blog/api-integration-playbook',
  '/blog/whatsapp-marketing-customer-care',
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((p) => {
  const loc = `${SITE_URL}${p}`
  const changefreq = p.startsWith('/blog') ? 'weekly' : 'monthly'
  const priority = p === '/' ? '1.0' : p.startsWith('/services/') ? '0.9' : p.startsWith('/blog/') ? '0.8' : '0.85'
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')}
</urlset>
`

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Block common junk paths (tune as needed)
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8')

console.log(`[seo] wrote sitemap + robots for SITE_URL=${SITE_URL}`)
