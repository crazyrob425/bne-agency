import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  imageUrl?: string;
  schema?: Record<string, any>;
  noIndex?: boolean;
}

const SITE_URL = "https://blacklisted.studio";
const SITE_NAME = "Blacklisted Studio";
const TWITTER_HANDLE = "@BNEAgency"; // Replace with your actual Twitter handle

export default function Seo({ title, description, canonical, imageUrl, schema, noIndex }: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullImageUrl = imageUrl ? `${SITE_URL}${imageUrl}` : `${SITE_URL}/og-image.png`; // A default OG image is recommended

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:type" content="website" />

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