# El Classico — Backend & Web

NestJS API and Next.js homepage for El Classico Beach & Lake Resort.

## Homepage sections (in order)

1. **Apartment Rooms** — $50, $60, $70 per night (Standard, Classic, Prestige)
2. **Book Boats** — priced boat cards + secure booking form
3. **Gallery of Book** — boat booking photo gallery only
4. **Garden** — Ubukwe, Palm Lounge, Terrace Garden
5. **Events**
6. **Magazine** — published blog posts

## Quick start

### API

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

API runs at `http://localhost:4001` with prefix `/api`.

### Web

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

Web runs at `http://localhost:3001`.

## Key endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/homepage` | All homepage sections in one response |
| GET | `/api/apartments/rooms` | Apartment rooms |
| GET | `/api/boats` | Bookable boats |
| POST | `/api/boats/bookings` | Submit boat booking (rate-limited) |
| GET | `/api/gallery/boats` | Boat booking gallery |
| GET | `/api/gardens` | Garden venues |
| GET | `/api/events` | Events |
| GET | `/api/blog` | Magazine / blog posts |

## Deploy

### Frontend (Vercel — recommended)

Use the `frontend/` app (same as [Elclassicobeach-Frontent](https://github.com/Kwizera250232/Elclassicobeach-Frontent)):

1. [Vercel Dashboard](https://vercel.com/kwizera-jean-de-dieus-projects) → import **BACKEND-ELCLASSICO** or **Elclassicobeach-Frontent**
2. Root directory: `frontend` (if using this repo) or `.` (if using the Frontent repo)
3. Environment variable: `NEXT_PUBLIC_API_URL` = your Render API URL + `/api`
4. Deploy

### Web (GitHub Pages — legacy)

Every push to `main` builds the site and publishes to the `gh-pages` branch.

**Enable the site once** (repo admin):

1. Open [Pages settings](https://github.com/Kwizera250232/BACKEND-ELCLASSICO/settings/pages)
2. **Build and deployment → Source:** Deploy from a branch
3. **Branch:** `gh-pages` / **Folder:** `/ (root)` → Save

Live URL: **https://kwizera250232.github.io/BACKEND-ELCLASSICO/**

### API (Render)

1. Open [Deploy to Render](https://render.com/deploy?repo=https://github.com/Kwizera250232/BACKEND-ELCLASSICO)
2. Approve the blueprint (`render.yaml` provisions API + PostgreSQL)
3. In GitHub → **Settings → Secrets and variables → Actions → Variables**, add `PUBLIC_API_URL` = `https://<your-service>.onrender.com/api`
4. Re-run the **Deploy Web to GitHub Pages** workflow so the frontend points at your API

## Security

- Global request throttling (`@nestjs/throttler`)
- Stricter limit on boat booking POST
- Validation pipe (whitelist, forbid unknown fields)
- Security headers middleware on API
- Next.js security headers on web
- Input length limits on booking DTOs
