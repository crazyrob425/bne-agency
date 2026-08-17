/**
 * Type-safe JSON-LD schema builders using `schema-dts`.
 *
 * These builders generate strongly-typed schema objects that can be
 * serialized into `<script type="application/ld+json">` tags.
 */

import type {
  WithContext,
  Organization,
  WebSite,
  BreadcrumbList,
  Service,
  FAQPage,
  HowTo,
  TechArticle,
  Article,
  BlogPosting,
} from "schema-dts";

export const buildOrganizationSchema = (
  siteUrl: string,
  opts?: Partial<Organization>
): WithContext<Organization> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "B.N.E. Studio",
  url: siteUrl,
  description:
    "Silent operations partner for digital creators. We handle booking, screening, safety vetting, and marketing.",
  foundingDate: "2018",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@blacklisted.studio",
  },
  sameAs: [
    "https://twitter.com/blacklistedstudio",
    "https://github.com/blacklistedstudio",
  ],
  ...opts,
});

export const buildWebSiteSchema = (
  siteUrl: string,
  siteName: string
): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description:
    "B.N.E. Studio — creator operations, niche intelligence, and strategic infrastructure.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const buildBreadcrumbSchema = (
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildServiceSchema = (
  name: string,
  description: string,
  url: string
): WithContext<Service> => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: {
    "@type": "Organization",
    name: "B.N.E. Studio",
  },
  url,
});

export const buildFaqSchema = (
  items: { question: string; answer: string }[]
): WithContext<FAQPage> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildHowToSchema = (
  name: string,
  steps: { name: string; text: string }[],
  url?: string
): WithContext<HowTo> => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  step: steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.name,
    text: step.text,
  })),
  ...(url ? { url } : {}),
});

export const buildTechArticleSchema = (opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}): WithContext<TechArticle> => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: opts.headline,
  description: opts.description,
  url: opts.url,
  datePublished: opts.datePublished,
  ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  author: {
    "@type": "Person",
    name: opts.author,
  },
  publisher: {
    "@type": "Organization",
    name: "B.N.E. Studio",
    logo: {
      "@type": "ImageObject",
      url: "https://blacklisted.studio/logo.png",
    },
  },
  ...(opts.image ? { image: opts.image } : {}),
});

export const buildBlogPostingSchema = (opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}): WithContext<BlogPosting> => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: opts.headline,
  description: opts.description,
  url: opts.url,
  datePublished: opts.datePublished,
  ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  author: {
    "@type": "Person",
    name: opts.author,
  },
  publisher: {
    "@type": "Organization",
    name: "B.N.E. Studio",
    logo: {
      "@type": "ImageObject",
      url: "https://blacklisted.studio/logo.png",
    },
  },
});
