/**
 * RSS Feed Generator for BNE Studio Blog
 * Generates rss.xml for search engine discovery and feed readers
 * Run: npx tsx scripts/seo/generate-rss.ts
 */

import { Feed } from 'feed';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Import blog articles
import { articles } from '../../client/src/data/blogArticles.js';

const SITE_URL = 'https://blacklisted.studio';
const OUTPUT_PATH = resolve(process.cwd(), 'dist/public/rss.xml');

// Create feed
const feed = new Feed({
  title: 'Blacklisted Studio',
  description: 'Expert guides on compliance, niche strategy, monetization, and operational security for adult content creators.',
  id: SITE_URL,
  link: SITE_URL,
  language: 'en',
  image: `${SITE_URL}/og-image.png`,
  favicon: `${SITE_URL}/favicon.ico`,
  copyright: '',
  updated: new Date(),
  generator: 'BNE Studio RSS Generator',
  feedLinks: {
    rss: `${SITE_URL}/rss.xml`,
    json: `${SITE_URL}/feed.json`,
  },
  author: {
    name: 'BNE Legal Team',
    link: SITE_URL,
  },
});

// Add all articles to feed
articles.forEach(article => {
  feed.addItem({
    title: article.title,
    id: `${SITE_URL}/blog/${article.slug}`,
    link: `${SITE_URL}/blog/${article.slug}`,
    description: article.excerpt,
    content: article.content.substring(0, 1000) + '...', // Truncated for feed
    author: [
      {
        name: article.author,
        link: SITE_URL,
      },
    ],
    contributor: article.tags.map(tag => ({
      name: `#${tag}`,
    })),
    date: new Date(article.publishedAt),
    category: [
      {
        name: article.category,
      },
      ...article.tags.map(tag => ({ name: tag })),
    ],
    image: article.graphics?.[0]?.url || `${SITE_URL}/og-image.png`,
  });
});

// Write RSS XML
writeFileSync(OUTPUT_PATH, feed.rss2());
console.log(`✅ RSS feed generated: ${OUTPUT_PATH}`);
console.log(`   Total articles: ${articles.length}`);

// Also generate JSON feed
writeFileSync(resolve(process.cwd(), 'dist/public/feed.json'), feed.json1());
console.log(`✅ JSON feed generated: dist/public/feed.json`);