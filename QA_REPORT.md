# QA Report — Mpumalanga Ranger Guide App

**Scope:** `/root/.openclaw/workspace/ranger-guide-mpumalanga/app`  
**Date:** 2026-03-05 (UTC)  
**QA Type:** Static code/UX review + build/lint verification

## Executive Summary
**Release verdict: NOT READY**

The app builds successfully, but it is not release-ready due to at least one blocking quality issue (lint failure) and several important accessibility/trust gaps that affect field reliability.

---

## What was tested
1. Static review of React components, CSS, and content model.
2. Project scripts and runtime packaging.
3. `npm run lint` and `npm run build`.
4. UX/a11y/content-trust risk analysis from code.

> Note: Browser automation service was unavailable during this QA pass, so interactive visual validation in-browser could not be completed.

---

## Command results
- **Lint:** `npm run lint` ❌ failed
  - Error: `react-hooks/purity` in `src/components/TrustStrip.jsx` for `Date.now()` during render.
- **Build:** `npm run build` ✅ passed (Vite + PWA assets generated)
- **Tests:** No test script/config found in `package.json`.

---

## Prioritized issues

### P0 (must fix before release)

1. **Lint/quality gate fails (build pipeline risk)**
   - **Where:** `src/components/TrustStrip.jsx`
   - **Issue:** `Date.now()` called directly in render; violates React purity rule enforced by ESLint.
   - **Impact:** CI/release checks fail; unstable render-time output.
   - **Fix:** Compute “days ago” outside render impurity path.
     - Option A: pass `currentDate` from parent once per render cycle.
     - Option B: precompute review age in data preprocessing.
     - Option C: memoize against a stable timestamp captured once (e.g., `const nowRef = useRef(Date.now())`).

---

### P1 (high priority)

2. **Incorrect ARIA semantics for category filters**
   - **Where:** `src/App.jsx` (`.filters` uses `role="tablist"`, buttons are plain buttons)
   - **Issue:** Declared as tablist but missing tab semantics (`role="tab"`, `aria-selected`, keyboard arrow behavior).
   - **Impact:** Screen reader/navigation mismatch; accessibility non-compliance.
   - **Fix:**
     - Either convert to real tabs (with `role="tab"`, `aria-selected`, roving tabindex + keyboard support),
     - or remove `role="tablist"` and use toggle-button semantics (`aria-pressed`).

3. **Emergency dial links include formatted numbers with spaces**
   - **Where:** `src/App.jsx` + `src/data/content.js`
   - **Issue:** `tel:` links are built from numbers like `+27 13 000 1001`.
   - **Impact:** Some mobile dialers parse inconsistently; critical emergency call flow reliability risk.
   - **Fix:** Store normalized E.164 numbers for hrefs (e.g., `+27130001001`) and show formatted label separately.

4. **Content trust risk: emergency contacts are explicitly templates/placeholders**
   - **Where:** `src/data/content.js` (`Operations Desk (Template)`, `On-Call Medic (Template)`)
   - **Issue:** Production-facing UI can present non-live contacts.
   - **Impact:** High operational/safety risk if deployed without replacement.
   - **Fix:** Add environment/content validation gate that blocks production when placeholder contacts exist.

---

### P2 (medium priority)

5. **No automated test coverage**
   - **Where:** `package.json` (no `test` script)
   - **Impact:** Regressions likely in search/filtering, emergency link behavior, and content rendering.
   - **Fix:** Add minimal test suite (Vitest + React Testing Library):
     - filter/search behavior,
     - mode switching,
     - emergency link href normalization,
     - empty state rendering.

6. **Potential installability/UX quality issue in PWA icons**
   - **Where:** `vite.config.js` manifest uses `vite.svg` for both 192/512 icons.
   - **Impact:** App icon may render poorly or fail platform expectations on some devices.
   - **Fix:** Provide real PNG icons at 192x192 and 512x512.

7. **Keyboard focus visibility not explicitly styled for key controls**
   - **Where:** `src/App.css`
   - **Issue:** No clear `:focus-visible` styles for buttons/links.
   - **Impact:** Reduced keyboard usability/accessibility.
   - **Fix:** Add strong visible focus ring for interactive controls (tabs, filter chips, entry cards, emergency links).

8. **Potential stale-content ambiguity in trust metadata**
   - **Where:** `TrustStrip` + entry metadata
   - **Issue:** “Reviewed Xd ago” is dynamic but no explicit stale threshold/warning.
   - **Impact:** Users may trust outdated field guidance.
   - **Fix:** Add threshold badges (e.g., >30 days warning, >90 days stale) and prioritize stale items in UI.

---

## Required fixes before release
1. Resolve lint purity error in `TrustStrip` (P0).
2. Correct filter accessibility semantics (P1).
3. Normalize emergency `tel:` numbers and separate display vs dial values (P1).
4. Replace or block placeholder emergency contacts in production (P1).

## Recommended for next iteration
- Add automated tests.
- Improve PWA icon assets.
- Add focus-visible styles and stale-content warning thresholds.

---

## Final verdict
**NOT READY FOR RELEASE** until P0 + listed P1 items are fixed and re-verified.