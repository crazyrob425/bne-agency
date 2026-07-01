## Changes Made

### 1. Added Remote Media Support
- **Files:** `server/_core/index.ts`, `server/_core/env.ts`
- **Change:** Added support for `VITE_MEDIA_BASE_URL`. When set, the media catalog API returns URLs pointing to an external bucket (e.g., Cloudflare R2). This bypasses the 400MB+ video storage issue on Render.
- **Revert:** Remove `mediaBaseUrl` from `ENV` in `env.ts` and the `remoteBaseUrl` logic in `index.ts`.

### 2. Fixed OAuth "Invalid Domain" Error
- **Files:** `client/src/const.ts`, `bne-members/src/lib/firebase.ts`
- **Change:** Added `VITE_SITE_URL` override for the `redirectUri`. This ensures the redirect URI matches the authorized domain in the OAuth portal/Firebase regardless of how the user accesses the site (e.g., with or without `www`).
- **Revert:** Revert `redirectUri` to use `window.location.origin`.

### 3. Automated Media Sync
- **File:** `scripts/sync-to-r2.py` (NEW FILE)
- **Change:** Created a Python script for the user to sync their local `media/` folder to Cloudflare R2.
- **Revert:** Delete the file.

### 4. Added Deployment Verification Script
- **File:** `scripts/verify-deployment.py` (NEW FILE)
- **Change:** Created a script to validate environment variables and provide the exact strings for Authorized Redirect URIs and Authorized Domains.
- **Revert:** Delete the file.

### 5. Updated Render Configuration
- **File:** `render.yaml`
- **Change:** Added placeholders for all required OAuth and Storage environment variables to ensure they are visible in the Render dashboard.
- **Revert:** Remove the added keys from `envVars`.

## Revert Status
- [ ] Change 1 - Remote Media
- [ ] Change 2 - OAuth Domain Fix
- [ ] Change 3 - Sync Script
- [ ] Change 4 - Verify Script
- [ ] Change 5 - Render Config
