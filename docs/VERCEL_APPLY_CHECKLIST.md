# Vercel + `/api/apply` production checklist

Use this for **https://smtechsolutions.in** (or any Vercel deployment of this repo).

## 1. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Required | Notes |
|----------|----------|--------|
| `MONGODB_URI` | **Yes** for saving applications | Atlas SRV string. Must be set on **Production** (and Preview if you test there). |
| `DB_NAME` or `MONGODB_DB_NAME` | Optional | Defaults to database name in the URI path. |
| `MONGODB_APPLICATIONS_COLLECTION` | Optional | Default `applications`. |
| `SITE_URL` | Recommended | e.g. `https://smtechsolutions.in` (used in emails / absolute links). |
| `EMAIL_USER`, `EMAIL_PASS` | Optional | If wrong, mail fails but **apply still returns 200** after DB save. |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE` | Optional | SMTP tuning; Gmail often uses port 587. |
| `ADMIN_NOTIFY_EMAIL` | Optional | HR inbox for new-application alerts. |
| `HIRING_ADMIN_SECRET` | For `/admin/hiring` + admin APIs | Long random string. |

**Not used by this codebase:** `CLOUDINARY_URL` (resumes are stored in MongoDB as binary, max 2MB).

## 2. MongoDB Atlas

1. **Network Access** → allow **`0.0.0.0/0`** (or Vercel’s documented egress ranges) so serverless functions can connect.
2. **Database user** must have read/write on the target database.
3. Confirm the **database name** in the URI matches `DB_NAME` if you override it.

## 3. After changing env vars

Redeploy (or **Redeploy** from the latest deployment) so functions pick up new variables.

## 4. Debugging a 500 on `POST /api/apply`

1. **Vercel** → Project → **Logs** → filter function **`api/apply`**.
2. Look for:
   - `[api/apply] POST begin` — confirms the handler ran.
   - `[mongodb] connect failed` / `[apply] insert failed` — Atlas URI, IP allowlist, or auth.
3. **GET** `https://smtechsolutions.in/api/apply` — should return JSON with `handler: "fetch+formData"` when the route is live.

## 5. Implementation notes (this repo)

- **`api/apply.mjs`** uses **`export default { fetch(request) }`** and **`request.formData()`** so multipart works on Vercel (Node `IncomingMessage` + multer-style streaming is not used here).
- **`server/hiring-server.mjs`** is optional for a **separate** Node host; Vercel uses **`api/`** only.
- Contact form reuses the same **`getMongoClient`** pool from **`api/lib/mongo-shared.mjs`**.
