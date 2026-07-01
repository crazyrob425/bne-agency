/**
 * Combined SEO Post-Build Script
 * Runs after build to generate all SEO assets
 */

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runSeoTasks() {
  console.log("🚀 Running SEO post-build tasks...\n");

  try {
    // Generate sitemap
    console.log("📍 Generating sitemap...");
    await execAsync("tsx scripts/seo/generate-sitemap.ts");
    console.log("✅ Sitemap generated\n");

    // Generate RSS feed
    console.log("📍 Generating RSS feed...");
    await execAsync("tsx scripts/seo/generate-rss.ts");
    console.log("✅ RSS feed generated\n");

    console.log("🎉 All SEO assets generated successfully!");
  } catch (error) {
    console.error("❌ SEO generation failed:", error);
    process.exit(1);
  }
}

runSeoTasks();