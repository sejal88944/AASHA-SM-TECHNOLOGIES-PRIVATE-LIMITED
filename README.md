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

## Production API URL

For `npm run build` or Vercel, set **`REACT_APP_API_URL`** to your deployed API base (no trailing slash), e.g. `https://your-api.onrender.com`.

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this folder to GitHub (or GitLab / Bitbucket).
2. On [vercel.com](https://vercel.com), import the repository.
3. Framework preset: **Create React App**. Build command: `npm run build`, output: `build`.
4. Deploy.
5. Add environment variable **`REACT_APP_API_URL`** with your live contact API URL.

## Configuration

- **Email:** edit `src/config.js` (`CONTACT_EMAIL`).
- **WhatsApp:** set `WHATSAPP_PHONE` to your country code + number (digits only, e.g. `919812345678`).
- **Logo:** replace `public/logo.png`.
- **Contact → MongoDB:** `REACT_APP_API_URL` must point at the server that exposes `POST /api/contact` (`sejal-api`).
# SM-Tech-Solutions-Pvt-Ltd
# SM-Tech-Solutions-Pvt-Ltd
