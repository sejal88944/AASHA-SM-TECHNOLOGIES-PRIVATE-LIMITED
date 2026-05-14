# Internal linking map (crawl + UX)

This document summarizes the intentional internal link graph for Googlebot discovery and human navigation.

## Top-level hubs

- `/` Home links to: all service hubs (`/services/*`), `/services`, `/blog`, `/contact`, LinkedIn trust link, and map section.
- `/services` links to: each dedicated service page and `/blog` (authority content).
- `/blog` links to: each `/blog/:slug` article.
- Each `/blog/:slug` article links to: all six service hubs + `/services` + `/contact` (conversion path).

## Service hub mesh (bidirectional intent)

Each service page includes:

- Breadcrumb path: Home → Services → Service
- “Related hubs” chips linking to that service’s `relatedSlugs` in `src/data/servicesContent.ts`
- A link back to `/blog` as an authority hub
- Lead capture via `LeadForm` (service-specific default interest)

Cross-links by design (examples):

- Website development ↔ API integration ↔ CRM (systems-of-record and web surfaces)
- SMS automation ↔ WhatsApp marketing ↔ CRM (messaging + attribution)
- API integration ↔ CRM ↔ Mobile app development (shared integration cores)

## Footer and global navigation

- Header: Home, Services, About, Blog, Contact + primary CTA
- Footer: repeats all service URLs + latest blog URLs + CTA to `/contact` and `/services`

## Files to update when adding pages

- `src/data/routes.ts` (sitemap source list used conceptually; keep aligned with `scripts/generate-seo-files.mjs`)
- `scripts/generate-seo-files.mjs` PATHS array
- Add routes in `src/App.tsx`
