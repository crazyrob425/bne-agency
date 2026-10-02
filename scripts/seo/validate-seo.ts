/**
 * SEO Validation Script
 * Validates generated SEO assets after build
 */

import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "dist/public");

async function validateSEO() {
  console.log("🔍 Validating SEO assets...\n");

  const checks: { name: string; status: "✅" | "❌" | "⚠️"; message: string }[] = [];

  // Check sitemap.xml
  const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, "utf-8");
    const urlCount = (sitemap.match(/<loc>/g) || []).length;
    checks.push({
      name: "sitemap.xml",
      status: urlCount >= 15 ? "✅" : "⚠️",
      message: `${urlCount} URLs found (min: 15 for blog articles)`,
    });
  } else {
    checks.push({ name: "sitemap.xml", status: "❌", message: "Not found" });
  }

  // Check RSS
  const rssPath = path.join(PUBLIC_DIR, "rss.xml");
  if (fs.existsSync(rssPath)) {
    const rss = fs.readFileSync(rssPath, "utf-8");
    const itemCount = (rss.match(/<item>/g) || []).length;
    checks.push({
      name: "rss.xml",
      status: itemCount >= 12 ? "✅" : "⚠️",
      message: `${itemCount} articles found (min: 12)`,
    });
  } else {
    checks.push({ name: "rss.xml", status: "❌", message: "Not found" });
  }

  // Check manifest.json
  const manifestPath = path.join(PUBLIC_DIR, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    checks.push({ name: "manifest.json", status: "✅", message: "PWA manifest exists" });
  } else {
    checks.push({ name: "manifest.json", status: "❌", message: "Not found (optional)" });
  }

  // Check index.html for critical SEO tags
  const indexPath = path.join(PUBLIC_DIR, "index.html");
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, "utf-8");
    const hasThemeColor = html.includes('theme-color');
    const hasManifest = html.includes('manifest.json');
    checks.push({
      name: "index.html meta",
      status: hasThemeColor && hasManifest ? "✅" : "⚠️",
      message: `theme-color: ${hasThemeColor ? "✓" : "✗"}, manifest: ${hasManifest ? "✓" : "✗"}`,
    });
  }

  // Print results
  console.log("📊 Validation Results:\n");
  for (const check of checks) {
    console.log(`${check.status} ${check.name}: ${check.message}`);
  }

  const failed = checks.filter(c => c.status === "❌").length;
  const warnings = checks.filter(c => c.status === "⚠️").length;

  console.log(`\n📈 Summary: ${checks.length - failed - warnings} passed, ${warnings} warnings, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

validateSEO().catch(console.error);