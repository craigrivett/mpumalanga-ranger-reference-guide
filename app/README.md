# Mpumalanga Ranger Reference Guide (V1)

Mobile-first React + Vite web app for field rangers in Mpumalanga.

## What this v1 includes

- **Mode-based UX:** Ask / Protocols / Library
- **Fast search + category filters** across seeded ranger content
- **Key knowledge sections:**
  - Wildlife facts
  - Birds
  - Plants/Trees
  - Safety & Emergency
  - Conservation
  - Seasonal/weather notes
  - Guest FAQ scripts
- **Quick talking points cards** for guest-facing explanations
- **Traceable references panel** with source tiers and links
- **Reserve rules panel** with verification metadata
- **Emergency templates** with call scripts and tap-to-call actions
- **Offline-friendly PWA behavior** via service worker (`vite-plugin-pwa`)

## Tech stack

- React 19
- Vite 7
- Plain CSS (mobile-first)
- Vite PWA plugin

## Local development

```bash
cd /root/.openclaw/workspace/ranger-guide-mpumalanga/app
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
cd /root/.openclaw/workspace/ranger-guide-mpumalanga/app
npm run build
```

Build output is generated in `dist/`.

## Preview production build

```bash
npm run preview
```

## Deploy

This app is static and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CDN, etc.).

Typical flow:
1. Run `npm run build`
2. Upload/deploy `dist/`
3. Ensure SPA fallback to `index.html` is enabled on your host

## Content notes

- Seed data is currently stored in:
  - `src/data/content.js`
- References are mapped to each fact/protocol entry using `sourceIds`.
- Dynamic and local-policy content is flagged with **Verify on-site**.

## Accessibility and field use

- High-contrast UI and large tap targets
- Critical emergency action remains quickly reachable
- Information hierarchy prioritizes **Quick Answer** before deep detail
