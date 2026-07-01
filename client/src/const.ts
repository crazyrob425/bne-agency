export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  if (!oauthPortalUrl || !appId) {
    if (import.meta.env.DEV) {
      console.warn("Missing OAuth env vars (VITE_OAUTH_PORTAL_URL / VITE_APP_ID). Login link unavailable.");
    }
    return "/";
  }

  // Ensure redirect URI uses the canonical site URL to avoid "invalid domain" errors in production
  const redirectUri = `${siteUrl.replace(/\/+$/, "")}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
