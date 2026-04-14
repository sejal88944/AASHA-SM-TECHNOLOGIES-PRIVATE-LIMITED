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

