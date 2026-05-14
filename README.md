# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# AASHA-SM-TECHNOLOGIES-PRIVATE-LIMITED

## Hiring API (applications + admin)

- **Candidate form:** `/apply` (multipart POST to `/api/apply`).
- **Admin dashboard:** `/admin/hiring` (requires `HIRING_ADMIN_SECRET` as Bearer token; stored only in session until you lock).
- **Vercel:** `api/apply.mjs` uses the Web **`fetch(request)`** handler and **`request.formData()`** so `multipart/form-data` is not broken by legacy Node body helpers on the platform. Other hiring routes remain as `api/applications.mjs` and `api/application/...`.
- **Local dev:** Vite serves the same routes via `scripts/hiring-vite-middleware.mjs` (no separate process).
- **Standalone Node:** `npm run hiring-server` runs `server/hiring-server.mjs` (Express + Multer) on port `HIRING_SERVER_PORT` or `5050`.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Atlas connection string |
| `DB_NAME` or `MONGODB_DB_NAME` | Database name (defaults to name in URI path) |
| `MONGODB_APPLICATIONS_COLLECTION` | Collection name (default `applications`) |
| `HIRING_ADMIN_SECRET` | Bearer secret for admin list/detail/resume/status APIs |
| `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_HOST`, `EMAIL_PORT` | Nodemailer (optional; apps still save without email) |
| `ADMIN_NOTIFY_EMAIL` | Inbox for new-application alerts |
| `EMAIL_FROM_NAME` | Display name on outbound mail |

Never commit real secrets. Optional: `VITE_APPLY_ENDPOINT` if the apply API is hosted on another origin.
