import { Helmet } from "react-helmet-async";
import { SeoMetadata, baseMetadata, pageSeoConfig, breadcrumbSchema } from '../seo.config';

interface SeoProps {
  pageKey: string;
  customMetadata?: Partial<SeoMetadata>;
  breadcrumbItems?: { name: string; url: string }[];
}

export default function Seo({
  pageKey,
  customMetadata = {},
  breadcrumbItems,
}: SeoProps) {
  const config = pageSeoConfig[pageKey];
  if (!config) {
    console.warn(`No SEO config found for pageKey: ${pageKey}`);
    return null;
  }

  const meta = { ...config, ...customMetadata };
  const title = meta.title || baseMetadata.defaultTitle;
  const description = meta.description || baseMetadata.defaultDescription;
  const url = `${baseMetadata.siteUrl}${meta.canonical || ""}`;
  const image = meta.ogImage || baseMetadata.defaultImage;

  const jsonLdSchemas = [];
  if (meta.jsonLd) {
    jsonLdSchemas.push(meta.jsonLd);
  }
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    jsonLdSchemas.push(breadcrumbSchema(breadcrumbItems));
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.noIndex && <meta name="robots" content="noindex" />}
      {meta.noFollow && <meta name="robots" content="nofollow" />}

      <link rel="canonical" href={url} />

      <meta property="og:title" content={meta.ogTitle || title} />
      <meta property="og:description" content={meta.ogDescription || description} />
      <meta property="og:image" content={meta.ogImage || baseMetadata.defaultImage} />
      <meta property="og:type" content={meta.ogType || "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={baseMetadata.siteName} />

      <meta name="twitter:card" content={meta.twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={meta.twitterTitle || title} />
      <meta name="twitter:description" content={meta.twitterDescription || description} />
      <meta name="twitter:image" content={meta.twitterImage || image} />
      {baseMetadata.twitterHandle && (
        <meta name="twitter:site" content={baseMetadata.twitterHandle} />
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