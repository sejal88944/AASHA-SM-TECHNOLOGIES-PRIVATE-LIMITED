# Vercel deployment guide (AASHA-SM Technologies)

This project is a React + Vite + TypeScript single-page application deployed to Vercel with static assets in `dist/` and optional serverless contact capture in `api/contact.mjs`.

> Note: This repo uses **Tailwind CSS v3 + PostCSS** (still “Tailwind CSS”, per requirements) with **Vite 5** for broad Windows/Node compatibility. Newer Tailwind v4/Vite 8 toolchains can require additional native optional dependencies on some machines; upgrade intentionally after verifying CI and local builds.

## Prerequisites

- A Vercel account and the Vercel CLI (optional but useful): `npm i -g vercel`
- Node.js 20+ locally for parity with Vercel defaults (your toolchain may warn on older Node versions)

## Configure environment variables (Production)

Set these in the Vercel project settings (Production environment):

- `SITE_URL`: canonical origin used by `scripts/generate-seo-files.mjs` during build (production: `https://www.smtechsolutions.in`, or your apex URL if you standardize on `https://smtechsolutions.in` with redirects)
- `VITE_SITE_URL`: same value as `SITE_URL`, exposed to the client at build time for canonical URLs and JSON-LD (Vite embeds `VITE_*` variables)

Optional:

- `CONTACT_WEBHOOK_URL`: if set, `api/contact.mjs` POSTs JSON payloads to your automation (Zapier/Make/Slack webhook, internal intake API, etc.). If unset, submissions are accepted and logged server-side (replace with email provider integration as you scale).
- `VITE_CONTACT_ENDPOINT`: override the browser POST target (defaults to `/api/contact`)

## Build command

Vercel should use:

- Install: `npm install`
- Build: `npm run build`
- Output directory: `dist`

`prebuild` generates `public/sitemap.xml` and `public/robots.txt` using `SITE_URL`.

## Preview deployments and indexing

`vercel.json` adds `X-Robots-Tag: noindex, nofollow` for hosts matching `*.vercel.app` to reduce preview URL indexing risk. Your production custom domain should not match this rule.

## Prerender / static HTML notes

This app uses `react-helmet-async` for head tags. Google generally renders JavaScript; for additional prerendering options (optional), consider a prerender plugin or a migration to a framework with first-class SSG—evaluate based on crawl needs and release complexity.

## Post-launch SEO checklist

- Replace placeholder NAP fields in `src/data/company.ts` with verified legal address and phone numbers that match Google Business Profile.
- Submit `sitemap.xml` in Google Search Console.
- Validate structured data with Google’s Rich Results Test.
- Add real case studies, certifications, and leadership bios to strengthen EEAT.
