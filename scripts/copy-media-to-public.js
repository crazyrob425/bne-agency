#!/usr/bin/env node
/**
 * Copy media files to client/public/media-files for production deployments
 * This ensures videos/print materials are available in dist/public
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const MEDIA_SOURCE = path.resolve(PROJECT_ROOT, 'media');
const PUBLIC_MEDIA_TARGET = path.resolve(PROJECT_ROOT, 'client', 'public', 'media-files');

console.log(`[Copy Media] Source: ${MEDIA_SOURCE}`);
console.log(`[Copy Media] Target: ${PUBLIC_MEDIA_TARGET}`);

// Ensure target directory exists
if (!fs.existsSync(PUBLIC_MEDIA_TARGET)) {
  fs.mkdirSync(PUBLIC_MEDIA_TARGET, { recursive: true });
}

// Copy all files from media to public media-files (only video and print assets)
let copiedCount = 0;
let skippedCount = 0;
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.webm', '.m4v', '.avi']);
const PRINT_EXTENSIONS = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.svg']);

if (fs.existsSync(MEDIA_SOURCE)) {
  const entries = fs.readdirSync(MEDIA_SOURCE, { withFileTypes: true });
  
  for (const entry of entries) {
    const ext = path.extname(entry.name).toLowerCase();
    
    // Only copy video and print files
    if (!VIDEO_EXTENSIONS.has(ext) && !PRINT_EXTENSIONS.has(ext)) {
      continue;
    }
    
    const sourcePath = path.join(MEDIA_SOURCE, entry.name);
    const targetPath = path.join(PUBLIC_MEDIA_TARGET, entry.name);
    
    if (entry.isFile()) {
      // Check if file already exists and compare sizes
      if (fs.existsSync(targetPath)) {
        const sourceStat = fs.statSync(sourcePath);
        const targetStat = fs.statSync(targetPath);
        if (sourceStat.size === targetStat.size) {
          skippedCount++;
          continue;
        }
      }
      
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
      console.log(`[Copy Media] Copied: ${entry.name}`);
    }
  }
  
  console.log(`[Copy Media] Done. Copied: ${copiedCount}, Skipped (unchanged): ${skippedCount}`);
} else {
  console.log(`[Copy Media] Source media folder not found, skipping copy`);
}