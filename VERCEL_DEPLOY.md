# Vercel deployment guide (AASHA-SM Technologies)

This project is a React + Vite + TypeScript single-page application deployed to Vercel with static assets in `dist/` and optional serverless contact capture in `api/contact.mjs`.

> Note: This repo uses **Tailwind CSS v3 + PostCSS** (still “Tailwind CSS”, per requirements) with **Vite 5** for broad Windows/Node compatibility. Newer Tailwind v4/Vite 8 toolchains can require additional native optional dependencies on some machines; upgrade intentionally after verifying CI and local builds.

## Prerequisites

- A Vercel account and the Vercel CLI (optional but useful): `npm i -g vercel`
- Node.js 20+ locally for parity with Vercel defaults (your toolchain may warn on older Node versions)

## Configure environment variables (Production)

Set these in the Vercel project settings (Production environment):

- `SITE_URL`: canonical origin for `scripts/generate-seo-files.mjs` and SEO defaults (repo default: **`https://smtechsolutions.in`**). If you publish on **`https://www.smtechsolutions.in`**, set both env vars to that and redirect apex ↔ www with a single canonical.
- `VITE_SITE_URL`: same value as `SITE_URL`, exposed to the client at build time for canonical URLs and JSON-LD (Vite embeds `VITE_*` variables)

Optional:

- **`MONGODB_URI`**: MongoDB Atlas connection string (same as `h:\sejal pvt\backend\.env`). `POST /api/contact` saves each lead into the configured database (from `DB_NAME` / `MONGODB_DB_NAME`, or the URI path), collection **`sejal_contacts`** (override with `MONGODB_CONTACTS_COLLECTION` if needed). Configure either `MONGODB_URI` or `CONTACT_WEBHOOK_URL` so contact submissions have a durable destination.
- **`MONGODB_CONTACTS_COLLECTION`**: defaults to `sejal_contacts`.
- **`OFFICE_ADDRESS`**, **`OFFICE_MAPS_URL`**: optional fields stored on each document (same idea as the Express backend).
- `CONTACT_WEBHOOK_URL`: if set, `api/contact.mjs` also POSTs JSON payloads to your automation (in addition to MongoDB when `MONGODB_URI` is set).
- `VITE_CONTACT_ENDPOINT`: override the browser POST target (defaults to `/api/contact`).

Local note: `npm run dev` (Vite only) does **not** run `api/contact.mjs`. To test Mongo saves locally, use **`vercel dev`** or deploy to Vercel and submit the form there.

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
