# Update robots.txt

Remove the "# Internal tools" and "# Prevent crawling of draft/unpublished content" sections from both robots.txt files.

## Files to update

- `E:\bne-agency\robots.txt`
- `E:\bne-agency\client\public\robots.txt`

## Target content

```
User-agent: *
Allow: /

# Core pages
Disallow: /members/
Disallow: /admin/

# Sitemaps and feeds
Sitemap: https://blacklisted.studio/sitemap.xml
Sitemap: https://blacklisted.studio/rss.xml
Sitemap: https://blacklisted.studio/feed.json
```

## Implementation notes

- Both files currently contain the target content plus two extra sections:
  - `# Internal tools` (3 Disallow rules for /tools/*)
  - `# Prevent crawling of draft/unpublished content` (2 Disallow rules for /*?* and /*#*)
- Update both files to match the target content exactly.
- Confirm line endings and trailing newlines match the existing style.
