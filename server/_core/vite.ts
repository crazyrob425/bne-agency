import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

function loadEnv(root: string) {
  const envPath = path.resolve(root, ".env");
  const values: Record<string, string | undefined> = {};

  if (!fs.existsSync(envPath)) return values;

  const text = fs.readFileSync(envPath, "utf-8");
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    values[key] = value;
  }
  return values;
}

function replacePlaceholders(html: string, env: Record<string, string | undefined>) {
  let result = html.replace(/%[A-Z][A-Z0-9_]*%/g, (token) => {
    const key = token.slice(1, -1);
    return env[key] ?? token;
  });

  if (!env.VITE_ANALYTICS_ENDPOINT && !env.VITE_ANALYTICS_WEBSITE_ID) {
    result = result.replace(
      /\n\s*<script(\s[^>]*)?\sdefer[^>]*>\s*<\/script>/,
      ""
    );
  }

  return result;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    // Skip Vite module/static requests - only serve index.html for HTML page routes
    const ext = path.extname(req.originalUrl).toLowerCase();
    if (ext && ext !== ".html") {
      return next();
    }

    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const env = loadEnv(path.resolve(import.meta.dirname, "../.."));
      template = replacePlaceholders(template, env);

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Trust & security headers (cheap, no breakage risk)
  app.use((_req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });

  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve build-time prerendered per-route HTML (dist/public/<route>/index.html)
  // directly at the clean URL — no trailing-slash 301, so the canonical
  // (e.g. /home) matches the served URL exactly.
  app.get("*", (req, res, next) => {
    const urlPath = req.path;
    if (urlPath.startsWith("/api/")) return next();
    if (/\.[a-zA-Z0-9]+$/.test(urlPath)) return next(); // assets, not pages
    const normalized = urlPath.length > 1 ? urlPath.replace(/\/+$/, "") : urlPath;
    const candidate = path.join(distPath, normalized, "index.html");
    if (candidate.startsWith(distPath) && fs.existsSync(candidate)) {
      return res.sendFile(candidate);
    }
    next();
  });

  app.use(express.static(distPath, { redirect: false }));

  const membersPath = path.resolve(distPath, "members");
  const membersIndexPath = path.resolve(membersPath, "index.html");
  const hasMembers = fs.existsSync(membersIndexPath);

  if (hasMembers) {
    app.use("/members", express.static(membersPath, { fallthrough: true }));
    app.get("/members/*", async (_req, res) => {
      const html = await fs.promises.readFile(membersIndexPath, "utf-8");
      res.set({ "Content-Type": "text/html" }).send(html);
    });
  }

  app.use("*", async (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const html = await fs.promises.readFile(indexPath, "utf-8");

    const env = loadEnv(process.cwd());
    const replaced = replacePlaceholders(html, env);

    res.set({ "Content-Type": "text/html" }).send(replaced);
  });
}