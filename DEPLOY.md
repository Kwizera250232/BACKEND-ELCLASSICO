# Live deployment

## Full app (premium frontend)

The Cloud Agent can start a public preview with Cloudflare Tunnel (`trycloudflare.com`). Ask the agent to redeploy if you need a fresh preview URL.

## Permanent hosting (automatic on git push)

Every push to `main` updates the `gh-pages` branch with the static homepage.

To get a permanent `github.io` URL, enable Pages once (repo owner):

https://github.com/Kwizera250232/BACKEND-ELCLASSICO/settings/pages

→ **Deploy from branch** → `gh-pages` → `/ (root)`

Then visit: **https://kwizera250232.github.io/BACKEND-ELCLASSICO/**

## Vercel (your project)

https://vercel.com/kwizera-jean-de-dieus-projects

Connect repo `BACKEND-ELCLASSICO`, root directory `frontend`, set `NEXT_PUBLIC_API_URL`.

## API (Render)

https://render.com/deploy?repo=https://github.com/Kwizera250232/BACKEND-ELCLASSICO
