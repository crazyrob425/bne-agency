import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  imageUrl?: string;
  keywords?: string[];
  schema?: Record<string, any>;
  noIndex?: boolean;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleTags?: string[];
  type?: "website" | "article";
}

const SITE_URL = "https://blacklisted.studio";
const SITE_NAME = "Blacklisted Studio";
const TWITTER_HANDLE = "@BNEAgency";

export default function Seo({
  title,
  description,
  canonical,
  imageUrl,
  keywords,
  schema,
  noIndex,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleTags,
  type = "website",
}: SeoProps) {
  const fullTitle = title.includes(SITE_NAME) || title.includes("B.N.E.") ? title : `${title} | ${SITE_NAME}`;
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullImageUrl = imageUrl ? `${SITE_URL}${imageUrl}` : `${SITE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph - Base */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />

      {/* Open Graph - Article specific */}
      {type === "article" && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === "article" && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {type === "article" && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {type === "article" && articleTags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}

      {/* JSON-LD Structured Data */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}