/**
 * BNE Agency — Image Sitemap Generator
 * Scans /public and /media directories for images and generates sitemap-images.xml
 * Run: npx tsx scripts/generate-image-sitemap.ts
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

const SITE_URL = 'https://blacklisted.studio';
const PUBLIC_DIR = join(process.cwd(), 'public');
const MEDIA_DIR = join(process.cwd(), 'media');
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);

interface ImageEntry {
  pageUrl: string;
  imageUrl: string;
  title: string;
}

function scanDir(dir: string, baseUrl: string): ImageEntry[] {
  const entries: ImageEntry[] = [];
  try {
    const files = readdirSync(dir, { recursive: true }) as string[];
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (IMAGE_EXTS.has(ext)) {
        const encoded = encodeURIComponent(file.replace(/\\/g, '/')).replace(/%2F/g, '/');
        const imageUrl = `${SITE_URL}/${encoded}`;
        const title = file
          .replace(/[-_]/g, ' ')
          .replace(ext, '')
          .split('/')
          .pop() || file;
        entries.push({ pageUrl: baseUrl, imageUrl, title });
      }
    }
  } catch {
    // Directory may not exist — skip silently
  }
  return entries;
}

const images: ImageEntry[] = [
  ...scanDir(PUBLIC_DIR, SITE_URL),
  ...scanDir(MEDIA_DIR, `${SITE_URL}/media`),
  // Key brand assets mapped to their primary pages
  { pageUrl: `${SITE_URL}/home`, imageUrl: `${SITE_URL}/BNE%20logo2.png`, title: 'B.N.E. Studio Logo' },
  { pageUrl: `${SITE_URL}/home`, imageUrl: `${SITE_URL}/banner.png`, title: 'B.N.E. Studio Banner' },
];

function buildXml(entries: ImageEntry[]): string {
  const rows = entries.map(img => [
    '  <url>',
    `    <loc>${img.pageUrl}</loc>`,
    '    <image:image>',
    `      <image:loc>${img.imageUrl}</image:loc>`,
    `      <image:title>${img.title}</image:title>`,
    '    </image:image>',
    '  </url>',
  ].join('\n')).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    rows,
    '</urlset>',
  ].join('\n');
}

const outPath = join(process.cwd(), 'sitemap-images.xml');
writeFileSync(outPath, buildXml(images));
console.log(`✅ Generated sitemap-images.xml with ${images.length} image entries → ${outPath}`);
