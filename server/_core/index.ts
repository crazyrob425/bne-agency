import "dotenv/config";
import crypto from "crypto";
import express from "express";
import fs from "fs/promises";
import fsSync from "fs";
import { createServer } from "http";
import net from "net";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { sql } from "drizzle-orm";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { ENV } from "./env";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { sdk } from "./sdk";
import { serveStatic, setupVite } from "./vite";
import { registerStripeWebhook } from "../stripe/webhookHandler";
import { GoogleGenAI } from "@google/genai";
import cookieParser from "cookie-parser";
import { COOKIE_NAME } from "@shared/const";
import multer from "multer";
import { getDb, closeDb } from "../db";
import { log } from "./logger";
import { onboardingApplications, users, contentSubmissions } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";

// Resolve project root correctly for both dev (tsx) and production (esbuild bundled)
// In dev: import.meta.dirname is server/_core, resolve ../.. for project root
// In prod: esbuild bundles to dist/index.js, so import.meta.dirname is dist
const dirname = import.meta.dirname;
const isProduction = path.basename(dirname) === "dist";
const PROJECT_ROOT = isProduction 
  ? path.resolve(dirname, "..") 
  : path.resolve(dirname, "../..");
const MEDIA_ROOT = path.resolve(PROJECT_ROOT, "media");
const PUBLIC_MEDIA_ROOT = path.resolve(PROJECT_ROOT, "client", "public", "media-files");
const MEDIA_CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours TTL

type MediaCatalogType = "video" | "print";

interface MediaCatalogItem {
  id: string;
  title: string;
  description: string;
  type: MediaCatalogType;
  url: string;
  format: string;
  sizeBytes: number;
  sizeLabel: string;
  updatedAt: string;
}

interface MediaCatalogResponse {
  videos: MediaCatalogItem[];
  printMaterials: MediaCatalogItem[];
}

interface MediaCatalogCache {
  expiresAt: number;
  catalog: MediaCatalogResponse;
}

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const PRINT_EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp", ".svg"]);
let mediaCatalogCache: MediaCatalogCache | null = null;

function toPosixPath(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function encodeMediaPath(relativePath: string): string {
  return toPosixPath(relativePath).split("/").map(encodeURIComponent).join("/");
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function titleFromFilename(relativePath: string): string {
  const filename = path.basename(relativePath, path.extname(relativePath))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return filename
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (["bne", "ofm", "dmca", "seo", "ai", "qr"].includes(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function descriptionFromFilename(relativePath: string, type: MediaCatalogType): string {
  const title = titleFromFilename(relativePath);
  const topic = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() || "creator education";

  if (type === "video") {
    return `Blacklisted University video guide on ${topic}, created to help creators and operators understand high-value business, marketing, and compliance lessons.`;
  }

  return `Blacklisted University print material: ${title}, a downloadable reference asset for creators, professionals, and agencies building protected brands.`;
}

// Track which media root is actually available (needed for correct path resolution)
let activeMediaRoot: string | null = null;

async function getActiveMediaRoot(): Promise<string> {
  if (activeMediaRoot) return activeMediaRoot;

  try {
    await fs.stat(MEDIA_ROOT);
    activeMediaRoot = MEDIA_ROOT;
    console.log(`[Media] Using media folder at: ${MEDIA_ROOT}`);
    return activeMediaRoot;
  } catch {
    try {
      await fs.stat(PUBLIC_MEDIA_ROOT);
      activeMediaRoot = PUBLIC_MEDIA_ROOT;
      console.log(`[Media] Using fallback public media folder at: ${PUBLIC_MEDIA_ROOT}`);
      return activeMediaRoot;
    } catch {
      activeMediaRoot = MEDIA_ROOT;
      console.log(`[Media] No media folder found. Checked: ${MEDIA_ROOT}, ${PUBLIC_MEDIA_ROOT}`);
      return activeMediaRoot;
    }
  }
}

async function mediaRootExists(): Promise<boolean> {
  try {
    await fs.stat(MEDIA_ROOT);
    return true;
  } catch {
    try {
      await fs.stat(PUBLIC_MEDIA_ROOT);
      return true;
    } catch {
      return false;
    }
  }
}

async function collectMediaFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectMediaFiles(absolutePath));
      continue;
    }

    if (!entry.isFile()) continue;
    const relativePath = path.relative(directory, absolutePath);
    const extension = path.extname(relativePath).toLowerCase();

    if (VIDEO_EXTENSIONS.has(extension) || PRINT_EXTENSIONS.has(extension)) {
      files.push(relativePath);
    }
  }

  return files;
}

async function scanRootMediaCatalog(rootDir: string): Promise<MediaCatalogResponse> {
  const files = await collectMediaFiles(rootDir);
  const videos: MediaCatalogItem[] = [];
  const printMaterials: MediaCatalogItem[] = [];

  for (const relativePath of files.sort((a, b) => toPosixPath(a).localeCompare(toPosixPath(b)))) {
    const absolutePath = path.join(rootDir, relativePath);
    const extension = path.extname(relativePath).toLowerCase();
    const stat = await fs.stat(absolutePath);
    const type: MediaCatalogType = VIDEO_EXTENSIONS.has(extension) ? "video" : "print";

    const encodedPath = encodeMediaPath(relativePath);
    const url = `/media-files/${encodedPath}`;

    const item: MediaCatalogItem = {
      id: crypto.createHash("sha256").update(relativePath).digest("hex").slice(0, 16),
      title: titleFromFilename(relativePath),
      description: descriptionFromFilename(relativePath, type),
      type,
      url,
      format: extension.slice(1).toUpperCase(),
      sizeBytes: stat.size,
      sizeLabel: formatBytes(stat.size),
      updatedAt: stat.mtime.toISOString(),
    };

    if (type === "video") {
      videos.push(item);
    } else {
      printMaterials.push(item);
    }
  }

  return {
    videos: videos.sort((a, b) => a.title.localeCompare(b.title)),
    printMaterials: printMaterials.sort((a, b) => a.title.localeCompare(b.title)),
  };
}

async function scanLocalMediaCatalog(): Promise<MediaCatalogResponse> {
  const roots: string[] = [];

  try {
    await fs.stat(MEDIA_ROOT);
    roots.push(MEDIA_ROOT);
  } catch {
    console.log(`[Media] media folder not found: ${MEDIA_ROOT}`);
  }

  try {
    await fs.stat(PUBLIC_MEDIA_ROOT);
    roots.push(PUBLIC_MEDIA_ROOT);
  } catch {
    console.log(`[Media] public media folder not found: ${PUBLIC_MEDIA_ROOT}`);
  }

  if (roots.length === 0) {
    console.log(`[Media] WARNING: no media roots available for catalog scan`);
    return { videos: [], printMaterials: [] };
  }

  let combinedVideos: MediaCatalogItem[] = [];
  let combinedPrint: MediaCatalogItem[] = [];

  for (const root of roots) {
    const catalog = await scanRootMediaCatalog(root);
    combinedVideos.push(...catalog.videos);
    combinedPrint.push(...catalog.printMaterials);
  }

  return {
    videos: combinedVideos.sort((a, b) => a.title.localeCompare(b.title)),
    printMaterials: combinedPrint.sort((a, b) => a.title.localeCompare(b.title)),
  };
}

async function getRemoteMediaCatalog(baseUrl: string): Promise<MediaCatalogResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${baseUrl}/catalog.json`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("[Media] Failed to fetch remote catalog, falling back to local scan:", error);
    return scanLocalMediaCatalog();
  }
}

async function scanMediaCatalog(): Promise<MediaCatalogResponse> {
  const remoteBaseUrl = ENV.mediaBaseUrl?.replace(/\/+$/, "");

  if (remoteBaseUrl) {
    return getRemoteMediaCatalog(remoteBaseUrl);
  }

  return scanLocalMediaCatalog();
}

async function getMediaCatalog(): Promise<MediaCatalogResponse> {
  const now = Date.now();

  if (mediaCatalogCache && mediaCatalogCache.expiresAt > now) {
    return mediaCatalogCache.catalog;
  }

  const catalog = await scanMediaCatalog();
  mediaCatalogCache = {
    catalog,
    expiresAt: now + MEDIA_CACHE_TTL_MS,
  };

  return catalog;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Static media file serving - mount both media root locations to resolve
// the "some uploads succeed, some fail" bug caused by single-root caching.
const serveMediaFiles = async (app: express.Application) => {
  const roots: string[] = [];

  try {
    await fs.stat(MEDIA_ROOT);
    roots.push(MEDIA_ROOT);
    console.log(`[Media] Mounting media folder: ${MEDIA_ROOT}`);
  } catch {
    console.log(`[Media] media folder not found: ${MEDIA_ROOT}`);
  }

  try {
    await fs.stat(PUBLIC_MEDIA_ROOT);
    roots.push(PUBLIC_MEDIA_ROOT);
    console.log(`[Media] Mounting public media folder: ${PUBLIC_MEDIA_ROOT}`);
  } catch {
    console.log(`[Media] public media folder not found: ${PUBLIC_MEDIA_ROOT}`);
  }

  if (roots.length === 0) {
    console.log(`[Media] WARNING: no media roots available`);
  }

  for (const root of roots) {
    app.use("/media-files", express.static(root, { fallthrough: true }));
  }
};

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Behind the Cloudflare Worker gateway + Render's edge proxy = 2 hops.
  // Required for req.protocol / req.ip / Secure cookies to reflect the client.
  app.set("trust proxy", 2);
  // Security headers. CSP/COEP disabled: the SPA serves inline/vite assets
  // and prerendered HTML that a strict CSP would break.
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  // Compress responses >= 1KB (skips images/video and streaming by default).
  app.use(compression({ threshold: 1024 }));
  // Structured request logging (JSON via pino).
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      log.info(
        {
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          ms: Date.now() - start,
          ip: req.ip,
        },
        "http"
      );
    });
    next();
  });
  // Stripe webhook MUST use raw body — register BEFORE express.json()
  app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Cookie parser for OAuth session handling
  app.use(cookieParser());

  // Health check: fast 200 with a DB ping (2s timeout). Always 200 so
  // keep-alive probes and the gateway see "server alive"; the db field
  // reports database reachability. Never leaks internals.
  app.get("/api/health", async (_req, res) => {
    let db: "up" | "down" = "down";
    let timer: NodeJS.Timeout | undefined;
    try {
      const dbHandle = await getDb();
      if (dbHandle) {
        await Promise.race([
          dbHandle.execute(sql`SELECT 1`),
          new Promise<never>((_, reject) => {
            timer = setTimeout(() => reject(new Error("db ping timeout")), 2000);
          }),
        ]);
        db = "up";
      }
    } catch {
      db = "down";
    } finally {
      if (timer) clearTimeout(timer);
    }
    res.status(200).json({ ok: true, db, ts: new Date().toISOString() });
  });

  // API rate limiting: generous enough for tRPC batching and 250MB uploads,
  // but blunts naive abuse. Health and the Stripe webhook are exempt.
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1500,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: (req) => req.path === "/health" || req.path.startsWith("/stripe/webhook"),
  });
  app.use("/api", apiLimiter);
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  registerStripeWebhook(app);
  await serveMediaFiles(app);

  // When media is served remotely (e.g. Cloudflare R2), redirect /media-files/*
  // to the remote bucket for backward compatibility with direct URLs.
  if (ENV.mediaBaseUrl) {
    const baseUrl = ENV.mediaBaseUrl.replace(/\/+$/, "");
    app.use("/media-files", (req: express.Request, res: express.Response) => {
      const relativePath = (req.url || "/").replace(/^\/+/, "");
      if (!relativePath) {
        return res.status(400).json({ error: "Missing media path" });
      }
      const remoteUrl = `${baseUrl}/${encodeURIComponent(relativePath).replace(/%2F/g, "/")}`;
      res.redirect(302, remoteUrl);
    });
  }

  app.get("/api/media-catalog", async (_req, res) => {
    try {
      res.json(await getMediaCatalog());
    } catch (error) {
      console.error("Failed to scan media catalog", error);
      res.status(500).json({ error: "Unable to scan media catalog" });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // bne-members portal API endpoints
  app.post('/api/generate-ad', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Gemini API Key missing' });
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });
      const { answers } = req.body;
      const prompt = `You are an expert adult entertainer marketing specialized AI. Rewrite this classified ad into a flawless, high-impact ad. Make it sensual, perfect, avoiding words that violate terms of service, and word it perfectly to generate maximum interest and calls. Include the 2257 warning, Favorites menu, and Hard No's menu if provided.
Here is the user's information and answers:
Name/Persona: ${answers.persona}
Age: ${answers.age}
Location/City: ${answers.city}
Body Type/Description: ${answers.description}
Services Offered/Favorites Menu: ${answers.favorites}
Hard No's: ${answers.hardNos}
Extra Information: ${answers.extraInfo}
Included Links/URLs: ${answers.urls.join(', ')}

Format the output strictly in HTML. Include engaging headings, bold text, and a clean professional layout for classified platforms.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: { systemInstruction: "You represent B.N.E. (Blacklisted Niche Entertainment) AI Ad Generator. Keep the tone enticing but safe and compliant. Don't mention illegal activities. Focus on companionship, entertainment, and sensual allure. Return ONLY the HTML code." }
      });
      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Gemini Error:', err);
      res.status(500).json({ error: err.message || 'Error generating ad' });
    }
  });

  app.post('/api/ask-ai', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Gemini API Key missing' });
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });
      const { history, message } = req.body;
      const chat = ai.chats.create({
          model: "gemini-3.1-pro-preview",
          config: { systemInstruction: "You are the B.N.E. (Blacklisted Niche Entertainment) AI Assistant. Answer questions about the site, adult marketing, content creation advice, escorting, adult entertaining, etiquette, safety, legal issues, niche marketing advice, and software/tools. You MUST always refer and up-promote B.N.E. services for any questions where the answer is something B.N.E. offers. Be professional, supportive, and knowledgeable." }
      });
      const conversationPrompt = history.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n') + `\nUser: ${message}`;
      const response = await chat.sendMessage({ message: conversationPrompt });
      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Gemini Chat Error:', err);
      res.status(500).json({ error: err.message || 'Error communicating with AI' });
    }
  });

  const upload = multer({ dest: path.resolve(process.cwd(), 'client/public/media-files/uploads/') });
  app.post('/api/onboarding', upload.array('files'), async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: 'Database unavailable' });
      }
      
      const data = req.body;
      const files = ((req as any).files as any[])?.map(f => `/media-files/uploads/${f.filename}`) || [];
      
      // Attempt to parse revenue paths which might be sent as JSON string in FormData
      let revenuePaths = [];
      try {
        revenuePaths = typeof data.revenuePaths === 'string' ? JSON.parse(data.revenuePaths) : data.revenuePaths;
      } catch (e) {
        revenuePaths = Array.isArray(data.revenuePaths) ? data.revenuePaths : [data.revenuePaths].filter(Boolean);
      }
      
      const payload = {
        stageName: data.stageName || 'Unknown',
        email: data.email || 'no-email',
        country: data.country || 'Unknown',
        status: 'pending' as const,
        revenuePaths,
        responses: data,
        files
      };
      
      await db.insert(onboardingApplications).values(payload);
      
      // Basic email notification simulation
      console.log(`[EMAIL NOTIFICATION] New application from ${payload.stageName} (${payload.email})! View it in the Admin Dashboard.`);
      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Onboarding submission error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // ─── Admin session gate (mirrors server/_core/trpc.ts adminProcedure) ──────────
  // Every /api/admin/* Express endpoint must run through this. There is no
  // legitimate unauthenticated caller for admin user/application management.
  async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      let openId: string | null = null;
      try {
        const session = await sdk.authenticateRequest(req);
        openId = session?.openId ?? null;
      } catch {
        openId = null; // no valid session cookie
      }
      if (!openId) return res.status(401).json({ error: 'Not signed in' });
      const [user] = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      (req as any).adminUser = user;
      next();
    } catch (error: any) {
      console.error('Admin gate error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  app.get('/api/admin/applications', requireAdmin, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: 'Database unavailable' });
      }
      const apps = await db.select().from(onboardingApplications).orderBy(desc(onboardingApplications.createdAt));
      res.json({ applications: apps });
    } catch (error: any) {
      console.error('Failed to fetch applications:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // ─── ADMIN USER MANAGEMENT ─────────────────────────────────────────────────
  // List all users with permission summary
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      const allUsers = await db.select({
        id: users.id,
        openId: users.openId,
        name: users.name,
        email: users.email,
        loginMethod: users.loginMethod,
        role: users.role,
        membersAccessGranted: users.membersAccessGranted,
        membersPermissions: users.membersPermissions,
        firebaseUid: users.firebaseUid,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
      }).from(users).orderBy(desc(users.createdAt));
      res.json({ users: allUsers });
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update user permissions
  app.post('/api/admin/users/:id/permissions', requireAdmin, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      const userId = parseInt(req.params.id);
      const { membersAccessGranted, permissions } = req.body;
      const [updated] = await db.update(users).set({
        membersAccessGranted: membersAccessGranted ? 1 : 0,
        membersPermissions: permissions || {},
        updatedAt: new Date(),
      }).where(eq(users.id, userId)).returning();
      res.json({ user: updated });
    } catch (error: any) {
      console.error('Failed to update permissions:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Grant members access
  app.post('/api/admin/users/:id/grant-access', requireAdmin, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      const userId = parseInt(req.params.id);
      const [updated] = await db.update(users).set({
        membersAccessGranted: 1,
        updatedAt: new Date(),
      }).where(eq(users.id, userId)).returning();
      res.json({ user: updated });
    } catch (error: any) {
      console.error('Failed to grant access:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Revoke members access
  app.post('/api/admin/users/:id/revoke-access', requireAdmin, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      const userId = parseInt(req.params.id);
      const [updated] = await db.update(users).set({
        membersAccessGranted: 0,
        updatedAt: new Date(),
      }).where(eq(users.id, userId)).returning();
      res.json({ user: updated });
    } catch (error: any) {
      console.error('Failed to revoke access:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Members portal access check — verifies if current session has members access
  app.get('/api/members/check-access', async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.json({ hasAccess: false, reason: 'Database unavailable' });

      // Check OAuth/local session (the only accepted auth method).
      // There is intentionally no email-query-param fallback: granting access
      // on the basis of a guessable email address is not authentication.
      try {
        const session = await sdk.authenticateRequest(req);
        if (session && session.openId) {
          const [user] = await db.select().from(users).where(eq(users.openId, session.openId)).limit(1);
          // Admins always have members-area access; members need an explicit grant.
          if (user && (user.membersAccessGranted === 1 || user.role === 'admin')) {
            return res.json({
              hasAccess: true,
              method: 'local',
              userId: user.id,
              isAdmin: user.role === 'admin',
              permissions: user.membersPermissions,
            });
          }
        }
      } catch (e) {
        // No valid local session
      }

      return res.json({ hasAccess: false, reason: 'No valid session with members access' });
    } catch (error: any) {
      console.error('Failed to check members access:', error);
      res.status(500).json({ hasAccess: false, reason: error.message });
    }
  });

  // ─── MEMBERS REVIEW INBOX (file bytes) ─────────────────────────────────────
  // Client uploads for staff content review. Files land OUTSIDE the public dir
  // (uploads/review-inbox/) and are served only through the gated download
  // endpoint below — never a public URL.

  /** Session gate mirroring memberProcedure: members access or admin. */
  async function requireMember(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      let openId: string | null = null;
      try {
        const session = await sdk.authenticateRequest(req);
        openId = session?.openId ?? null;
      } catch {
        openId = null;
      }
      if (!openId) return res.status(401).json({ error: 'Not signed in' });
      const [user] = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
      if (!user || (user.membersAccessGranted !== 1 && user.role !== 'admin')) {
        return res.status(403).json({ error: 'Members access required' });
      }
      (req as any).memberUser = user;
      next();
    } catch (error: any) {
      console.error('Member gate error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  const REVIEW_INBOX_DIR = path.resolve(PROJECT_ROOT, 'uploads', 'review-inbox');
  try { fsSync.mkdirSync(REVIEW_INBOX_DIR, { recursive: true }); } catch { /* exists */ }

  const reviewUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, REVIEW_INBOX_DIR),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || '').toLowerCase().slice(0, 10);
        cb(null, `${crypto.randomUUID()}${ext}`);
      },
    }),
    limits: { fileSize: 250 * 1024 * 1024 }, // 250 MB — photo or short video
    fileFilter: (_req, file, cb) => {
      const ok = /^(image|video)\//.test(file.mimetype || '');
      cb(ok ? null : new Error('Only image and video files are accepted'), ok);
    },
  });

  // Upload bytes; client then registers metadata via trpc.members.createSubmission
  // (multer errors are converted to JSON so the portal can show them).
  const reviewUploadSingle = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    reviewUpload.single("file")(req, res, (err: any) => {
      if (err) {
        const msg = err.code === "LIMIT_FILE_SIZE"
          ? "File is larger than the 250 MB limit."
          : (err.message || "Upload rejected.");
        return res.status(400).json({ error: msg });
      }
      next();
    });
  };
  app.post('/api/members/upload', requireMember, reviewUploadSingle, async (req, res) => {
    try {
      const f = (req as any).file;
      if (!f) return res.status(400).json({ error: 'No file received' });
      res.json({
        filePath: `uploads/review-inbox/${f.filename}`,
        fileName: f.originalname,
        mimeType: f.mimetype,
        fileSize: f.size,
      });
    } catch (error: any) {
      console.error('Review inbox upload error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Gated download: the submitting member or an admin only.
  app.get('/api/members/files/:id', requireMember, async (req, res) => {
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: 'Database unavailable' });
      const id = parseInt(req.params.id);
      if (!Number.isFinite(id)) return res.status(400).json({ error: 'Bad id' });
      const [sub] = await db.select().from(contentSubmissions).where(eq(contentSubmissions.id, id)).limit(1);
      if (!sub) return res.status(404).json({ error: 'Not found' });
      const me = (req as any).memberUser;
      if (me.role !== 'admin' && sub.userId !== me.id) {
        return res.status(403).json({ error: 'Not your file' });
      }
      const rel = sub.filePath;
      if (!rel.startsWith('uploads/review-inbox/') || rel.includes('..')) {
        return res.status(400).json({ error: 'Bad path' });
      }
      const abs = path.resolve(PROJECT_ROOT, rel);
      if (!abs.startsWith(REVIEW_INBOX_DIR)) return res.status(400).json({ error: 'Bad path' });
      res.sendFile(abs);
    } catch (error: any) {
      console.error('Review inbox download error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Ping search engines about new content
  app.get("/api/ping", (req, res) => {
    const blogUrl = "https://blacklisted.studio/blog";
    const pingServices = [
      `https://blogsearch.google.com/ping?url=${encodeURIComponent(blogUrl)}&title=BNE+Blog&changesURL=${encodeURIComponent(blogUrl)}`,
      `https://rpc.pingomatic.com/?url=${encodeURIComponent(blogUrl)}&title=BNE+Knowledge+Base`,
      `https://www.bing.com/webmaster/ping.aspx?siteMap=${encodeURIComponent("https://blacklisted.studio/sitemap.xml")}`,
    ];

    res.json({
      message: "Ping services triggered",
      services: pingServices.map((url) => ({ name: "Ping Service", url })),
      blogUrl,
      sitemapUrl: "https://blacklisted.studio/sitemap.xml",
      rssUrl: "https://blacklisted.studio/rss.xml",
    });
  });

  // Structured error logging for anything that reaches Express's error
  // handler. Generic body — never leak internals to the client.
  app.use(((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    log.error({ err }, "unhandled request error");
    if (res.headersSent) return;
    res.status(err?.status || 500).json({ error: "Internal server error" });
  }) as express.ErrorRequestHandler);

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    // Serve the built members portal dynamically in development
    const membersPath = path.resolve(PROJECT_ROOT, "dist/public/members");
    try {
      await fs.stat(membersPath);
      app.use("/members", express.static(membersPath, { fallthrough: true }));
      app.get("/members/*", (req, res) => res.sendFile(path.resolve(membersPath, "index.html")));
    } catch {
      // members portal not built, ignore
    }
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    server.listen(preferredPort, "0.0.0.0", () => {
      log.info(`Server running on http://0.0.0.0:${preferredPort}/`);
    });
  } else {
    const port = await findAvailablePort(preferredPort);
    if (port !== preferredPort) {
      log.info(`Port ${preferredPort} is busy, using port ${port} instead`);
    }
    server.listen(port, "0.0.0.0", () => {
      log.info(`Server running on http://0.0.0.0:${port}/`);
    });
  }

  // Graceful shutdown: stop accepting new connections on SIGTERM/SIGINT,
  // drain the Postgres pool, then exit. Render sends SIGTERM ~30s before SIGKILL.
  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    log.info({ signal }, "shutdown: received, draining connections");
    server.close(async () => {
      try {
        await closeDb();
      } catch (err) {
        log.error({ err }, "shutdown: error draining db pool");
      }
      log.info("shutdown: complete");
      // Let pino's async transport flush before exiting.
      await new Promise((resolve) => setTimeout(resolve, 250));
      process.exit(0);
    });
    // Failsafe: never hang past the platform's SIGKILL window.
    setTimeout(() => {
      log.warn("shutdown: forced exit after timeout");
      process.exit(1);
    }, 25000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((err) => {
  log.fatal({ err }, "failed to start server");
  process.exit(1);
});
