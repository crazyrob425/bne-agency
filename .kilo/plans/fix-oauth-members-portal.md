# Fix OAuth Login for Members Portal on Render.com

## Problem

The members portal at `blacklisted.studio/members` fails with "Domain not authorized in Firebase" error when users attempt Google OAuth login.

## Root Cause

The `bne-members` portal has two authentication modes:
1. **OAuth Redirect Mode** (preferred): Redirects to `/api/oauth/callback` when `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID` are configured
2. **Firebase Popup Fallback**: Falls back to Firebase popup auth when OAuth env vars are missing

On Render.com, `render.yaml` has `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID` set to `sync: false` (unconfigured), causing fallback to Firebase. The Firebase project (`gen-lang-client-0360447688`) doesn't have `blacklisted.studio` authorized.

## Architecture Context

- Members portal is built into `/members/` path on the main `blacklisted.studio` server
- The main server (`server/_core/index.ts`) already serves OAuth routes at `/api/oauth/callback`, `/api/oauth/session`, `/api/oauth/logout`
- The AuthContext in `bne-members` already checks `/api/oauth/session` on mount (line 37)
- Per `bne-members/.env.example`: "When running as part of the main bne-agency server, this should be the same origin"

## Solution

Configure the members portal to use the main server's OAuth by setting environment variables in Render.

### Changes Required

1. **Update `render.yaml`** - Change OAuth env vars from `sync: false` to configured values:
   - `VITE_OAUTH_PORTAL_URL`: Remove or set to self-same-origin
   - `VITE_APP_ID`: Set to the actual application ID for Manus OAuth
   - `OAUTH_SERVER_URL`: Set to the Manus OAuth server base URL

### Option A: Configure OAuth Environment Variables (Recommended)

Update `render.yaml` to provide proper OAuth configuration:

```yaml
envVars:
  - key: VITE_OAUTH_PORTAL_URL
    value: https://blacklisted.studio
  - key: VITE_APP_ID
    sync: false  # Must be set in Render dashboard
  - key: OAUTH_SERVER_URL
    sync: false  # Must be set in Render dashboard
```

### Option B: Add Domain to Firebase Authorized Domains (Fallback)

If using Firebase popup fallback is acceptable:
1. Go to Firebase Console → Project `gen-lang-client-0360447688` → Authentication → Settings → Authorized domains
2. Add `blacklisted.studio` to the list

## Validation Steps

1. After configuring env vars, verify `/api/oauth/session` responds correctly at `https://blacklisted.studio/api/oauth/session`
2. Test Google OAuth login flow:
   - Click login on members portal
   - Should redirect to OAuth portal (not Firebase popup)
   - Should return to `/members/` after successful auth
3. Verify cookie `app_session_id` is set and valid

## Risks

- If `VITE_APP_ID` or `OAUTH_SERVER_URL` are incorrect, OAuth redirect will fail with HTTP 500 errors
- Session cookies require HTTPS in production (already configured with `secure: true` in `server/_core/oauth.ts`)

## Notes

- The members portal already has infrastructure to support OAuth via the main server
- No code changes required if env vars are properly configured
- The Firebase config in `bne-members/firebase-applet-config.json` is only used as fallback