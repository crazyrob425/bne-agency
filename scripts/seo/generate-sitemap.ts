/**
 * Dynamic Sitemap Generator for BNE Studio
 * Generates complete sitemap.xml including all blog articles
 * Run: npx tsx scripts/seo/generate-sitemap.ts
 */

import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';

// Import blog articles
import { articles } from '../../client/src/data/blogArticles.js';

const SITE_URL = 'https://blacklisted.studio';
const OUTPUT_PATH = resolve(process.cwd(), 'dist/public/sitemap.xml');

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/home', changefreq: 'weekly', priority: 0.9 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/inperson-services', changefreq: 'monthly', priority: 0.8 },
  { url: '/tiers', changefreq: 'monthly', priority: 0.7 },
  { url: '/niche-matcher', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools', changefreq: 'monthly', priority: 0.7 },
  { url: '/university', changefreq: 'weekly', priority: 0.8 },
  { url: '/onboarding', changefreq: 'monthly', priority: 0.6 },
];

// Generate sitemap
async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });

  // Add static pages
  for (const page of staticPages) {
    sitemapStream.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString().split('T')[0],
    });
  }

  // Add blog listing page
  sitemapStream.write({
    url: '/blog',
    changefreq: 'daily',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0],
  });

  // Add all blog articles
  for (const article of articles) {
    sitemapStream.write({
      url: `/blog/${article.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: article.publishedAt,
      img: article.graphics?.map(g => ({
        url: g.url,
        caption: g.caption,
        title: g.alt,
      })),
    });
  }

  // End the stream
  sitemapStream.end();

  // Write to file
  const writeStream = createWriteStream(OUTPUT_PATH);
  await pipeline(sitemapStream, writeStream);

  console.log(`✅ Sitemap generated: ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${staticPages.length + articles.length + 1}`);
}

generateSitemap().catch(console.error);