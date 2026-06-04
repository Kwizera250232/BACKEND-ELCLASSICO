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

### Web (GitHub Pages — automatic)

Pushes to `main` deploy the homepage via GitHub Actions:

**https://kwizera250232.github.io/BACKEND-ELCLASSICO/**

### API (Render — one-time setup)

1. Open [Deploy to Render](https://render.com/deploy?repo=https://github.com/Kwizera250232/BACKEND-ELCLASSICO)
2. Approve the blueprint (`render.yaml` creates API + PostgreSQL)
3. After deploy, set repo variable `PUBLIC_API_URL` to your Render API URL (e.g. `https://el-classico-api.onrender.com/api`) and re-run the Pages workflow

## Security

- Global request throttling (`@nestjs/throttler`)
- Stricter limit on boat booking POST
- Validation pipe (whitelist, forbid unknown fields)
- Security headers middleware on API
- Next.js security headers on web
- Input length limits on booking DTOs
