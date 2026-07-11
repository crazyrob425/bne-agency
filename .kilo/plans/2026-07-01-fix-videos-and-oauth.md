# Plan — Fix Deployed Site Errors (Videos + OAuth)

## Problem Statement
Two production issues on https://blacklisted.studio:
1. Videos show 404 — hosted media is not loading on Render
2. Google login shows “invalid domain” — OAuth redirect URI mismatch

## Root Cause
- Videos failed because 400MB+ media files were committed to git and hit Render build/deploy limits during earlier deploys.
- OAuth login fails because the redirect URI sent to the OAuth portal does not match the authorized URI/domain configured there.

## Current State of Work
- `server/_core/index.ts` now supports `VITE_MEDIA_BASE_URL` and fetches `catalog.json` from that URL for the media catalog.
- `/media-files/*` redirects to the remote media base URL when `VITE_MEDIA_BASE_URL` is configured.
- `scripts/sync-to-r2.py` uploads media to Cloudflare R2 and generates/upload `catalog.json`.
- `server/_core/env.ts` and `server/_core/oauth.ts` use canonical `VITE_SITE_URL` for redirect validation.
- Code is pushed to GitHub and Render auto-deploys from `render.yaml`.

## What You Need To Do Now
1. **Get your real Cloudflare Account ID**
   - Open `https://dash.cloudflare.com/profile`
   - Copy the 32-character Account ID
   - Run: `notepad .env` in `E:\bne-agency`
   - Replace `R2_ACCOUNT_ID="changeme_account_id_here"` with your real ID

2. **Run the R2 sync**
   - `cd E:\bne-agency`
   - `python scripts/sync-to-r2.py`
   - Copy the printed `VITE_MEDIA_BASE_URL` and `R2_ACCOUNT_ID`

3. **Update Render Dashboard env vars**
   - Add/update: `VITE_MEDIA_BASE_URL`, `R2_ACCOUNT_ID`, `R2_BUCKET_NAME=blacklisted-studio-media`
   - Also ensure: `VITE_OAUTH_PORTAL_URL`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `JWT_SECRET`

4. **Fix OAuth “Invalid Domain”**
   - In your OAuth portal, add: `https://blacklisted.studio/api/oauth/callback`
   - In Firebase Console → Auth → Settings → Authorized Domains, add: `blacklisted.studio`

5. **Trigger a fresh deploy** in Render dashboard

## Risks
- Media files are still in git history; future pushes may warn about file size
- If `VITE_MEDIA_BASE_URL` is not set in Render, site will continue to return empty media catalog
- OAuth fix requires access to the OAuth portal and Firebase console
