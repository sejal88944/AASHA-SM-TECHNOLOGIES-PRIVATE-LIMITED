import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtmlPath = join(distDir, 'index.html')
const siteOrigin = 'https://smtechsolutions.in'

const routes = {
  '/about': {
    title: 'About Us | IT Company Maharashtra | AASHA-SM TECHNOLOGIES',
    description:
      'Learn about AASHA-SM TECHNOLOGIES PRIVATE LIMITED: website development Pune, SMS automation India, API integration, and how we work with clients across Maharashtra and beyond.',
  },
  '/services': {
    title: 'Website Development Pune & SMS Automation India Services',
    description:
      'Explore website development Pune, SMS automation India, and API integration services from a Maharashtra-based technology partner.',
  },
  '/blog': {
    title: 'Blog | SMS Automation India & Website Development India',
    description:
      'Read practical guides on SMS automation India, website development India, and API integration services to improve business growth.',
  },
  '/contact': {
    title: 'Contact | Website Development & SMS Automation | Pune',
    description:
      'Contact AASHA-SM TECHNOLOGIES PRIVATE LIMITED for website development in Pune, SMS automation across India, API work, demos, and quotes.',
  },
}

function setTagContent(html, pattern, value) {
  if (pattern.test(html)) {
    return html.replace(pattern, value)
  }
  return html
}

function buildHtmlForRoute(baseHtml, routePath, meta) {
  const canonical = `${siteOrigin}${routePath}`
  let html = baseHtml

  html = setTagContent(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${meta.title}</title>`,
  )
  html = setTagContent(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`,
  )
  html = setTagContent(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  )
  html = setTagContent(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${meta.title}" />`,
  )
  html = setTagContent(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${meta.description}" />`,
  )
  return html
}

function writeRouteHtml(routePath, html) {
  const routeDir = join(distDir, routePath.replace(/^\//, ''))
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
}

function main() {
  const baseHtml = readFileSync(baseHtmlPath, 'utf8')
  Object.entries(routes).forEach(([routePath, meta]) => {
    const routeHtml = buildHtmlForRoute(baseHtml, routePath, meta)
    writeRouteHtml(routePath, routeHtml)
  })

  console.log(
    `Generated static route HTML for: ${Object.keys(routes).join(', ')}`,
  )
}

main()
