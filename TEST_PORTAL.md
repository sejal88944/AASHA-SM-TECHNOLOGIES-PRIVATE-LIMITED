# Internship Selection Test Portal

A self-contained module inside this repository for running MCQ + Coding
screening tests for college internship-hiring drives, with a full Admin
Panel and a Student registration/test-taking portal.

## Why this isn't literally "Next.js API routes"

The rest of this repository is a **Vite + React (react-router-dom) SPA using
Firebase**, not Next.js — there is no `pages/api`/`app/api`, no server
runtime, and no PostgreSQL/Prisma anywhere else in the project. Since secure
grading, a tamper-proof timer, and hiding correct answers all require a real
server trust boundary, this module adds one as a new `server/` Node.js API
(Express + Prisma + PostgreSQL) living in this same repository, and the
existing React app gets new routes that talk to it. Everything ships from one
repo and (in production) can be served from one domain.

## Architecture

```
Tech-Website/
├── server/                     # New Node.js API (Express + Prisma + PostgreSQL)
│   ├── prisma/schema.prisma    # Full data model
│   ├── prisma/seed.js          # Creates the first admin login + demo data
│   └── src/                    # Routes, middleware, grading/shuffling logic
└── src/testPortal/             # New frontend module (plugs into the existing React app)
    ├── api/client.js           # Fetch wrapper for both admin + student APIs
    ├── admin/                  # Admin panel (own login, own layout shell)
    ├── student/                # Registration → waiting → timed attempt → submitted
    └── routes/                 # Mounted from src/App.jsx
```

Routes added to the existing app (`src/App.jsx`):
- `/aashasm-portal/test-portal/*` — Admin panel (its own login, independent of
  the existing `/aashasm-portal` admin auth)
- `/test/:testId` — Student registration → `/waiting` → `/attempt` → `/submitted`

Tailwind CSS was added for this module only. **Preflight is disabled**
(`tailwind.config.js`) so it cannot change the look of the existing site —
Tailwind utility classes only apply inside `src/testPortal/**`.

## One-time setup

```bash
# 1. Start a local Postgres (or point DATABASE_URL at your own instance)
cd server
docker compose up -d

# 2. Install backend deps and configure environment
npm install
copy .env.example .env        # (or `cp` on macOS/Linux) — then edit values if needed

# 3. Create the database schema
npm run prisma:migrate

# 4. Create the first admin login + a small demo test
npm run db:seed
```

The seed script prints/uses the admin login from `server/.env`
(`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`, defaults to
`admin@aashasm.com` / `ChangeMe123!`) — **change the password after first
login** (there's no UI for that yet; update it directly via Prisma Studio
`npm run prisma:studio` or a future admin-profile screen).

## Running it

Two processes, in two terminals, from the repo root (`Tech-Website/`):

```bash
npm run server:dev     # API on http://localhost:4000
npm run dev            # Vite frontend on http://localhost:5173 (proxies /api to the server)
```

Then visit:
- Admin: `http://localhost:5173/aashasm-portal/test-portal/login`
- Student (after activating a test from the admin panel): `http://localhost:5173/test/<testId>`
  — the admin Tests page has a "Copy Student Link" button for this.

## Production deployment notes

- Run `server/` as a persistent Node process (e.g. PM2/systemd/a container).
- Reverse-proxy `/api/*` on your main domain to that Node process (the
  existing site already ships a `.htaccess`, so if you're on Apache this can
  be a `ProxyPass` rule; on Nginx a simple `location /api { proxy_pass ... }`
  block). This keeps the admin cookie and the browser's fetch calls
  same-origin, exactly like local dev via the Vite proxy.
- Set real values for `DATABASE_URL`, `JWT_SECRET`, and `CORS_ORIGIN` in
  `server/.env` — never commit `.env` (it's already git-ignored).
- Run `npm run server:migrate` → actually use `prisma migrate deploy`
  (`npm --prefix server run prisma:deploy`) in production instead of
  `migrate dev`.

## Key design decisions

- **Shuffling & fixed attempts**: On "Start Test", the server randomly
  selects `questionsToServe` questions out of the full pool, randomizes their
  order and (for MCQ) each question's option order, and immediately persists
  that exact snapshot as a `TestAttempt` + `AttemptQuestion` rows. Every
  later read (reload, resume, poll) returns that same persisted snapshot —
  nothing reshuffles after the first "Start".
- **Timer authority**: `TestAttempt.startedAt` + `durationMinutes` are the
  only source of truth. Remaining time is always computed server-side as
  `startedAt + duration − now`. There's no background job — every
  read/write endpoint calls a shared `ensureFreshness()` helper first, which
  lazily auto-submits and grades any attempt whose time has already run out,
  so it's caught on the very next request no matter when that happens.
- **Answers never leak**: The only place question data is serialized for the
  student is `sanitizeAttemptQuestion()` in `server/src/utils/attempt.js`,
  which never includes `isCorrect`, the correct option, or the reference
  answer. Grading happens only in `gradeAttempt()`, server-side, after
  submit/expiry.
- **Coding grading**: Sørensen–Dice bigram text similarity
  (`server/src/utils/similarity.js`) between the student's code and the
  admin's reference answer, dependency-free. `>= 75%` ⇒ correct + full
  marks. This is a text comparison only — no code is compiled or executed.
- **One email per test**: enforced both at the API layer and with a DB
  unique constraint on `(email, testId)`, so it holds even under concurrent
  requests.
- **"Cannot start twice" + resume**: `TestAttempt.studentId` is unique, and
  "Start Test" is get-or-create — the first call creates the shuffled
  snapshot, every later call (including after closing the tab) just returns
  the same attempt with a freshly computed `remainingSeconds`.
- **Anti-cheat**: right-click/copy/text-selection are disabled specifically
  on rendered question/option text (`AntiCheatText.jsx`), and common
  dev-tools keyboard shortcuts are intercepted (`useCopyProtection.js`). This
  is explicitly a deterrent, not a security boundary — real protection comes
  from answers/grading never being sent to the browser in the first place.
- **Admin auth**: real bcrypt password hashing + httpOnly JWT cookie
  sessions (`server/src/routes/admin.auth.routes.js`), independent of the
  existing site's admin login.

## Admin panel feature map

| Area | Where |
|---|---|
| Colleges (add/edit/deactivate) | Sidebar → Colleges |
| Interested Fields (add/edit/deactivate) | Sidebar → Interested Fields |
| Question Bank (MCQ + Coding, per test) | Tests → "Manage Questions" |
| Test Configuration incl. **Active/Inactive** + Registration Open/Closed toggles | Sidebar → Tests |
| Registrations & Scoreboard, filters (college/name/PRN/roll/marks), sorted by marks by default | Tests → "Registrations & Scoreboard", or Sidebar → All Registrations |
| Student drill-down (profile + question-by-question breakdown) | Click any row in Registrations |
| Timestamps (registered at / started at) | Shown in the registrations table and the student drill-down |
| PDF / Excel export of the current filtered list | Buttons on the Registrations page |
