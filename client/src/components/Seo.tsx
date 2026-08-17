import { Helmet } from "react-helmet-async";
import {
  SeoMetadata,
  baseMetadata,
  pageSeoConfig,
  breadcrumbSchema,
} from "../seo.config";

interface SeoProps {
  // ── New config-driven API ──
  pageKey?: string;
  customMetadata?: Partial<SeoMetadata>;
  breadcrumbItems?: { name: string; url: string }[];

  // ── Legacy direct-prop API (kept for backward compatibility) ──
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schema?: Record<string, any> | Record<string, any>[];

  // ── Article-specific metadata ──
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

export default function Seo({
  pageKey,
  customMetadata = {},
  breadcrumbItems,
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex,
  noFollow,
  schema,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags,
}: SeoProps) {
  // Base metadata from the config-driven API (if a matching pageKey exists).
  const configMeta: Partial<SeoMetadata> = pageKey ? pageSeoConfig[pageKey] ?? {} : {};

  // Build an overrides object from any legacy direct props that were passed.
  const directMeta: Partial<SeoMetadata> = {};
  if (title !== undefined) directMeta.title = title;
  if (description !== undefined) directMeta.description = description;
  if (canonical !== undefined) directMeta.canonical = canonical;
  if (keywords !== undefined) directMeta.keywords = keywords;
  if (ogTitle !== undefined) directMeta.ogTitle = ogTitle;
  if (ogDescription !== undefined) directMeta.ogDescription = ogDescription;
  if (ogImage !== undefined) directMeta.ogImage = ogImage;
  if (ogType !== undefined) directMeta.ogType = ogType;
  if (twitterCard !== undefined) directMeta.twitterCard = twitterCard;
  if (twitterTitle !== undefined) directMeta.twitterTitle = twitterTitle;
  if (twitterDescription !== undefined) directMeta.twitterDescription = twitterDescription;
  if (twitterImage !== undefined) directMeta.twitterImage = twitterImage;
  if (noIndex !== undefined) directMeta.noIndex = noIndex;
  if (noFollow !== undefined) directMeta.noFollow = noFollow;

  // Final merged metadata: config < direct props < explicit customMetadata.
  const meta: Partial<SeoMetadata> = {
    ...configMeta,
    ...directMeta,
    ...customMetadata,
  };

  const resolvedTitle = meta.title || baseMetadata.defaultTitle;
  const resolvedDescription = meta.description || baseMetadata.defaultDescription;
  const url = `${baseMetadata.siteUrl}${meta.canonical || ""}`;
  const image = meta.ogImage || baseMetadata.defaultImage;

  const hasArticleData = !!(
    articlePublishedTime ||
    articleModifiedTime ||
    articleAuthor ||
    articleSection ||
    (articleTags && articleTags.length)
  );
  const resolvedOgType = meta.ogType || (hasArticleData ? "article" : "website");

  // Combine robots flags into a single meta tag.
  const robots = [meta.noIndex && "noindex", meta.noFollow && "nofollow"]
    .filter(Boolean)
    .join(",");

  // Collect JSON-LD schemas.
  const jsonLdSchemas: Record<string, any>[] = [];
  if (meta.jsonLd) {
    jsonLdSchemas.push(meta.jsonLd);
  }
  if (schema) {
    if (Array.isArray(schema)) {
      jsonLdSchemas.push(...schema);
    } else {
      jsonLdSchemas.push(schema);
    }
  }
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    jsonLdSchemas.push(breadcrumbSchema(breadcrumbItems));
  }

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {robots && <meta name="robots" content={robots} />}

      <link rel="canonical" href={url} />

      <meta property="og:title" content={meta.ogTitle || resolvedTitle} />
      <meta property="og:description" content={meta.ogDescription || resolvedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={resolvedOgType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={baseMetadata.siteName} />

      <meta name="twitter:card" content={meta.twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={meta.twitterTitle || resolvedTitle} />
      <meta name="twitter:description" content={meta.twitterDescription || resolvedDescription} />
      <meta name="twitter:image" content={meta.twitterImage || image} />
      {baseMetadata.twitterHandle && (
        <meta name="twitter:site" content={baseMetadata.twitterHandle} />
      )}

      {hasArticleData && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
          {articleSection && (
            <meta property="article:section" content={articleSection} />
          )}
          {articleTags &&
            articleTags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {jsonLdSchemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(
            jsonLdSchemas.length === 1 ? jsonLdSchemas[0] : jsonLdSchemas
          )}
        </script>
      )}
    </Helmet>
  );
}
