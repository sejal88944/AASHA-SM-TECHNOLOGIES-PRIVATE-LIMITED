<<<<<<< HEAD
# Sejal — Business Website

A modern, responsive marketing site for **Sejal**, an IT startup. Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router**.

## Run locally

Prerequisites: **Node.js 18+** and npm.

```bash
cd sejal-web
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Project structure

```
sejal-web/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/
    │   └── services.ts          # Services, “why us”, work process copy
    ├── components/
    │   ├── Button.tsx
    │   ├── Footer.tsx
    │   ├── Layout.tsx
    │   ├── Navbar.tsx
    │   ├── SectionHeading.tsx
    │   ├── ServiceCard.tsx
    │   ├── ContactForm.tsx       # Contact form + POST /api/contact
    │   └── WhatsAppFloat.tsx    # Update WHATSAPP_PHONE for your number
    └── pages/
        ├── Home.tsx
        ├── Services.tsx
        └── Contact.tsx
```

## Customize

- **WhatsApp button:** edit `WHATSAPP_PHONE` in `src/components/WhatsAppFloat.tsx` (digits only, country code included, e.g. `91xxxxxxxxxx`).
- **Contact form:** submits `POST` JSON to **`/api/contact`** with `{ name, phone, email, message }` (see `src/components/ContactForm.tsx`).
  - **Default (no backend):** Vite’s **dev mock** only fakes success — **nothing is saved to MongoDB**. That is why Atlas looks empty.
  - **Save to MongoDB Atlas:** use the sibling folder **`../sejal-api`** (Express + Mongoose). Copy `sejal-api/.env.example` → `.env`, add your **Atlas connection string** and `MONGODB_DB_NAME`, then `npm install && npm start`. In **`sejal-web/.env`** set `VITE_CONTACT_MOCK=0`, restart `npm run dev`. Submissions appear in Atlas under that database, collection **`contacts`**.
  - **Production:** deploy `sejal-api` (or any server) with `POST /api/contact`, or set `VITE_CONTACT_API_URL` at build time.

**Note:** The **`dist`** folder is only the built static website (from `npm run build`). Form data is **not** stored inside `dist`; it lives in **MongoDB** after you connect a real API.

=======
# SM Tech Solutions — React website

## Run locally

Contact form submissions are saved to **MongoDB Atlas** via **`sejal-api`** (sibling folder).

1. **API + database** — in `sejal-api`, add `MONGODB_URI` in `.env` (see `sejal-api/.env.example`), then:

   ```bash
   cd ../sejal-api
   npm install
   npm start
   ```

   API listens on **http://localhost:4000** (default).

2. **Website** — in another terminal:

   ```bash
   cd sm-tech
   npm install
   npm start
   ```

Development uses `REACT_APP_API_URL=http://localhost:4000` from `.env.development`.

Open [http://localhost:3000](http://localhost:3000). Submissions appear in Atlas under the database from your URI (collection `sejal_contacts` by default, or `MONGODB_CONTACTS_COLLECTION`).

## Production (Vercel)

This app includes **`api/contact.js`** — a serverless handler on the same domain as the site (`POST /api/contact`). You do **not** need `REACT_APP_API_URL` if you deploy on Vercel and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | **Yes** | Same Atlas connection string as `sejal-api` |
| `MONGODB_DB_NAME` | No | Overrides DB name from URI |
| `MONGODB_CONTACTS_COLLECTION` | No | Defaults to `sejal_contacts` |
| `REACT_APP_API_URL` | No | Only if the contact API is hosted **elsewhere** (separate base URL, no trailing slash) |

After adding env vars, **redeploy** the project.

## Production API URL (optional)

If you host **`sejal-api`** on another host (e.g. Render) instead of using `api/contact.js`, set **`REACT_APP_API_URL`** to that API base (no trailing slash), e.g. `https://your-api.onrender.com`, then rebuild.

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this folder to GitHub (or GitLab / Bitbucket).
2. On [vercel.com](https://vercel.com), import the repository (root = `sm-tech` if the repo is only this app).
3. Framework preset: **Create React App**. Build command: `npm run build`, output: `build`.
4. Add **`MONGODB_URI`** (and optional vars above) in **Project → Settings → Environment Variables**.
5. Deploy.

## Configuration

- **Email:** edit `src/config.js` (`CONTACT_EMAIL`).
- **WhatsApp:** set `WHATSAPP_PHONE` to your country code + number (digits only, e.g. `919812345678`).
- **Logo:** replace `public/logo.png`.
- **Contact → MongoDB:** either Vercel `api/contact.js` + `MONGODB_URI`, or external `sejal-api` + `REACT_APP_API_URL`.
>>>>>>> 6ad3737da72a8b8fb38e5e7a7796410366c6b090
