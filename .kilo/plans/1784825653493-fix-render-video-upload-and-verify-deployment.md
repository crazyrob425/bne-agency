# Plan — Fix Render Video Upload Issue + Verify Full Deployment

## Problem
- Video/media uploads on Render are inconsistent: some succeed, others fail.
- Root cause: the media stack is in a mixed state — local files in `media/` and `client/public/media-files/`, partial R2 sync, and a server bug in `getActiveMediaRoot()` that makes path resolution unreliable.
- Must not break the existing 40+ pages that were just added.

## What is Already Done
- Added 40+ dedicated page files under `client/src/pages/` and wired them in `App.tsx`.
- Updated `Navigation.tsx` mega-menu hrefs to point to the new routes.
- Added `getInfographicByKeyword` to `useMediaCatalog.ts` so infographic lookups compile.
- Fixed missing `useState` imports in new pages.
- Production build (`npm run build`) passes successfully.

## What Is Still Broken / At Risk
1. **Server bug in `server/_core/index.ts`** — `getActiveMediaRoot()` has a missing early return, making media root resolution flaky in production. Some requests may get `undefined` as the static root.
2. **Media files are not reliably available on Render** — `client/public/media-files/` and `media/` are gitignored, and even though some files are still in git history, Render deployment timeouts can occur with large videos. The intended fix is hosting on Cloudflare R2 via `VITE_MEDIA_BASE_URL`, but that env var is currently empty and the R2 sync has not been executed.
3. **Subdirectory media files** — `fonts/`, `legal/`, `niche-cards/` exist under `media/` but may not be present in `client/public/media-files/`, causing 404s when the server falls back to the public root.
4. **Render env vars** — `render.yaml` has placeholders for `R2_*` and `VITE_MEDIA_BASE_URL`, but they are marked `sync: false`. If not set in the Render dashboard, the remote catalog / redirect logic never activates.

## Execution Plan

### Task 1: Fix the media root resolution bug
- Edit `server/_core/index.ts`:
  - Refactor `getActiveMediaRoot()` so both `MEDIA_ROOT` and `PUBLIC_MEDIA_ROOT` are always mounted to `/media-files` when they exist, instead of caching a single root.
  - Ensure `fs.existsSync` check uses a correctly imported `fs` module (not `fsSync`).
- Run `npx tsc --noEmit` in `client/` and verify server compiles.

### Task 2: Make the media-catalog aware of both roots
- Update `scanLocalMediaCatalog()` / `collectMediaFiles()` so it scans both `media/` and `client/public/media-files/` and merges results, instead of scanning only one cached root.
- This fixes the “some videos load, some 404” because files dropped in either folder are visible.

### Task 3: Execute the R2 sync
- From `E:\bne-agency`, run:
  - `python scripts/sync-to-r2.py` (or `py scripts/sync-to-r2.py`)
  - Take the printed `Public URL` and set `.env`:
    - `VITE_MEDIA_BASE_URL=<printed public URL>`
- Upload `catalog.json` to R2 (the script already does this).

### Task 4: Update Render environment variables
- In Render dashboard → `bne-agency-api` → Environment:
  - Set `VITE_MEDIA_BASE_URL` to the R2 public URL
  - Set `R2_ACCOUNT_ID` = `df51268806e8c23ac9ca55742055acc4`
  - Set `R2_BUCKET_NAME` = `blacklisted-studio-media`
  - Ensure `VITE_SITE_URL` = `https://blacklisted.studio`
  - Ensure `VITE_OAUTH_PORTAL_URL` and `OAUTH_SERVER_URL` are correct
  - Ensure `JWT_SECRET` is set
- Trigger a manual deploy in Render after env vars are updated.

### Task 5: Verify deployment
- Check `/api/media-catalog` on production returns the full catalog.
- Spot-check 10+ new routes render without 404.
- Spot-check video playback on:
  - `/monetization-systems`
  - `/security-measures`
  - `/2257-compliance`
  - `/success-stories`
  - `/backend-management`
- Spot-check infographic modal on:
  - `/business-strategy`
  - `/compliance-standards`
  - `/growth-examples`

## Rollback / Safety
- No database schema changes.
- No destructive file operations.
- If R2 sync fails, local static serving still covers files present in both roots.
- Render has auto-deploy from `render.yaml`; manual deploy can be re-triggered.

## Open Questions for User
- Do you want me to build an admin media-upload endpoint, or is the existing R2 sync sufficient for your workflow?
- Should `client/public/media-files/` and `media/` be removed from the repo entirely after R2 sync to prevent future deployment timeouts?
