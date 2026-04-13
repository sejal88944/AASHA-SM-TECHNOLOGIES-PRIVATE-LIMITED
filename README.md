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
