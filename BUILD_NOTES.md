# BUILD_NOTES.md

## Completed

Built a production-quality v1 web app in:
- `/root/.openclaw/workspace/ranger-guide-mpumalanga/app`

### Implemented features

1. **React (Vite) app structure**
   - Componentized UI (`EntryCard`, `DetailPanel`, `TrustStrip`, `ReferencePanel`)
   - Central seeded content model in `src/data/content.js`

2. **Mobile-first UX aligned to design review**
   - Simplified modes: **Ask / Protocols / Library**
   - Search-first workflow with category filter chips
   - Quick-answer-first detail layout
   - Persistent emergency CTA button

3. **Required content sections included**
   - Wildlife facts
   - Birds
   - Plants/Trees
   - Safety & Emergency
   - Conservation
   - Seasonal/weather notes
   - Guest FAQ scripts

4. **Talking points + trust model**
   - Every entry includes quick snippet + talking points + ranger notes
   - Compact trust strip: source tier, review age, verify-on-site chip

5. **Data source/reference traceability**
   - Source registry with tier labels and outbound links
   - Entry-level source linking through `sourceIds`

6. **Reserve + emergency modules**
   - Reserve-specific rule cards with effective date and verifier
   - Emergency contact templates with call scripts and tap-to-call links

7. **Offline-friendly v1 (PWA baseline)**
   - Added `vite-plugin-pwa`
   - Service worker generated on production build
   - Manifest included for installable behavior

8. **Docs**
   - Replaced app README with run/build/preview/deploy instructions and architecture notes

## Build verification

Executed successfully:
- `npm install`
- `npm run build`

Build output generated in `app/dist` with service worker and manifest.

## Assumptions

- Emergency numbers are templates/placeholders and must be replaced per reserve/lodge operations.
- Reserve rule sets are representative examples and require local operational verification.
- Sample factual content is realistic but should still go through formal reviewer workflow before field rollout.
- V1 uses local seeded data (no backend/CMS yet), by design for rapid offline-first baseline.
