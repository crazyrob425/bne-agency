import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Decode the state to get the original redirect URI
      let redirectUri: string;
      try {
        redirectUri = atob(state);
      } catch {
        redirectUri = "/";
      }

      // Validate decoded redirect URI against the expected site URL to prevent open redirects.
      // If it doesn't match, fall back to the canonical site root.
      const expectedSiteUrl = ENV.siteUrl?.replace(/\/+$/, "") || "";
      if (expectedSiteUrl && redirectUri !== "/" && !redirectUri.startsWith(`${expectedSiteUrl}/`) && redirectUri !== expectedSiteUrl) {
        console.warn(`[OAuth] Redirect URI mismatch: expected under ${expectedSiteUrl}, got ${redirectUri}`);
        redirectUri = expectedSiteUrl;
      }

      // If redirect URI is for the members portal, send there
      // Otherwise default to root
      const finalRedirect = redirectUri.includes('/members') ? '/members/' : redirectUri;
      res.redirect(302, finalRedirect);
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });

  // Session check endpoint for the members portal
  app.get("/api/oauth/session", async (req: Request, res: Response) => {
    const sessionCookie = req.cookies[COOKIE_NAME];
    
    if (!sessionCookie) {
      return res.status(401).json({ authenticated: false });
    }

    try {
      const session = await sdk.verifySession(sessionCookie);
      if (!session) {
        return res.status(401).json({ authenticated: false });
      }

      const user = await db.getUserByOpenId(session.openId);
      if (!user) {
        return res.status(401).json({ authenticated: false });
      }

      res.json({
        authenticated: true,
        openId: session.openId,
        email: user.email,
        name: session.name,
      });
    } catch (error) {
      console.error("[OAuth] Session check failed", error);
      res.status(401).json({ authenticated: false });
    }
  });

  // Logout endpoint
  app.post("/api/oauth/logout", (_req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME, { path: "/", httpOnly: true, sameSite: "none", secure: true });
    res.json({ success: true });
  });
}
