import { HelmetProps } from 'react-helmet-async';
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildTechArticleSchema,
  buildBlogPostingSchema,
} from '@/lib/schema/builders';

export interface SeoMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  jsonLd?: Record<string, any>;
}

export const baseMetadata = {
  siteUrl: 'https://blacklisted.studio',
  siteName: 'B.N.E. Studio',
  defaultTitle: 'B.N.E. Studio — Silent Partner for Elite Creator Empires',
  defaultDescription: 'B.N.E. Studio is the silent operations partner for digital creators. We handle niche intelligence, backend management, compliance, advertising, and scaling so you can focus on content.',
  defaultImage: 'https://blacklisted.studio/BNE%20logo2.png',
  twitterHandle: '@blacklistedstudio',
};

export const pageSeoConfig: Record<string, SeoMetadata> = {
  // ── Core pages ──────────────────────────────────────────────────────────────
  home: {
    title: 'B.N.E. Studio — Silent Partner for Elite Creator Empires',
    description: 'B.N.E. Studio is the silent operations partner for digital creators. We handle niche intelligence, backend management, compliance, advertising, and scaling so you can focus on content.',
    canonical: '/home',
    ogType: 'website',
    keywords: 'creator management, silent partner, OnlyFans management, adult content operations, creator business infrastructure',
  },

  // ── Tools & Niche ────────────────────────────────────────────────────────────
  // Both key variants so NicheMatcher.tsx (pageKey="nicheMatcher") and any
  // future calls using "niche-matcher" both resolve correctly.
  'niche-matcher': {
    title: 'Niche Matcher — Find Your Highest-Earning Creator Niche',
    description: 'Use our Niche Matcher to discover the best digital strategy and niche for your creator brand. Analyze 1,052 market segments in 90 seconds.',
    canonical: '/niche-matcher',
    ogType: 'website',
    keywords: 'niche finder, creator niche, OnlyFans niche, digital strategy, niche analysis',
  },
  nicheMatcher: {
    title: 'Niche Matcher — Find Your Highest-Earning Creator Niche',
    description: 'Use our Niche Matcher to discover the best digital strategy and niche for your creator brand. Analyze 1,052 market segments in 90 seconds.',
    canonical: '/niche-matcher',
    ogType: 'website',
    keywords: 'niche finder, creator niche, OnlyFans niche, digital strategy, niche analysis',
  },
  tools: {
    title: 'Free Creator Tools & Revenue Calculators — BNE Studio',
    description: 'A curated collection of free digital tools for creators: revenue calculators, content strategy engines, SEO optimizers, and automation apps.',
    canonical: '/tools',
    ogType: 'website',
    keywords: 'free creator tools, OnlyFans calculator, adult creator tools, SEO optimizer, revenue calculator',
  },
  // creatorTools key used by CreatorTools.tsx
  creatorTools: {
    title: 'Creator Tool Stack — Productivity & Growth Tools for Creators',
    description: 'The complete B.N.E. Studio creator tool stack: content calendar, fan engagement bots, classified generators, income verifiers, and more.',
    canonical: '/creator-tools',
    ogType: 'website',
    keywords: 'creator tools, content creation tools, OnlyFans tools, creator productivity, automation',
  },
  'creator-tools': {
    title: 'Creator Tool Stack — Productivity & Growth Tools for Creators',
    description: 'The complete B.N.E. Studio creator tool stack: content calendar, fan engagement bots, classified generators, income verifiers, and more.',
    canonical: '/creator-tools',
    ogType: 'website',
    keywords: 'creator tools, content creation, OnlyFans tools, SEO tools, creator automation',
  },

  // ── Services ─────────────────────────────────────────────────────────────────
  services: {
    title: 'Full-Service Creator Business Infrastructure — B.N.E. Studio',
    description: 'Explore B.N.E. Studio\'s complete service suite: niche intelligence, backend management, privacy systems, advertising, compliance, and scaling frameworks.',
    canonical: '/services',
    ogType: 'website',
    keywords: 'creator services, OnlyFans management services, adult creator business infrastructure, creator operations',
  },
  // all-services key used by AllServices.tsx
  'all-services': {
    title: 'Complete Operations & Brand Management Services — B.N.E. Studio',
    description: 'Review the full portfolio of B.N.E. Studio services: identity design, webcam setups, fan chat management, passive stream creation, legal compliance, and tax assistance.',
    canonical: '/services',
    ogType: 'website',
    keywords: 'creator services, management services, brand operations, creator business support',
  },
  'creator-operations': {
    title: 'Creator Operations — Streamline Your Digital Backend',
    description: 'B.N.E. Studio handles the full operational backend for creator brands: content scheduling, fan management, platform logistics, and workflow automation.',
    canonical: '/creator-operations',
    ogType: 'website',
    keywords: 'creator operations, backend management, workflow automation, creator business operations',
  },
  operations: {
    title: 'Creator Operations — Streamline Your Digital Operations',
    description: 'Operations management for creator brands: workflow optimization, automation, backend management, and team coordination with B.N.E. Studio.',
    canonical: '/creator-operations',
    ogType: 'website',
    keywords: 'creator operations, backend management, workflow automation, creator business operations',
  },
  monetization: {
    title: 'Monetization Systems — Revenue Strategies for Elite Creators',
    description: 'Learn how elite creators monetize content across subscriptions, PPV, tips, referrals, and in-person revenue with B.N.E. Studio systems.',
    canonical: '/monetization-systems',
    ogType: 'website',
    keywords: 'creator monetization, OnlyFans revenue, subscription optimization, PPV strategy, creator income',
  },
  strategy: {
    title: 'Business Strategy — Strategic Planning for Creator Empires',
    description: 'Strategic brand architecture and business planning for creators targeting 6-figure annual revenue and sustainable growth with B.N.E. Studio.',
    canonical: '/business-strategy',
    ogType: 'website',
    keywords: 'creator business strategy, brand architecture, strategic planning, creator growth strategy',
  },
  security: {
    title: 'Security & Privacy — Protect Your Creator Brand',
    description: 'Security solutions for creator brands: identity protection, encrypted vaults, anonymous business structures, and multi-layer security protocols.',
    canonical: '/security-measures',
    ogType: 'website',
    keywords: 'creator security, identity protection, creator privacy, anonymous business, data protection',
  },

  // ── Compliance ───────────────────────────────────────────────────────────────
  compliance: {
    title: 'Compliance Vault — Legal & Regulatory Compliance for Creators',
    description: 'Compliance services for digital creators: 18 U.S.C. 2257 record-keeping, DMCA anti-piracy, and platform-specific regulatory frameworks.',
    canonical: '/compliance',
    ogType: 'website',
    keywords: 'compliance, 2257, DMCA, adult creator compliance, legal compliance',
  },
  // complianceVault key used by ComplianceVault.tsx
  complianceVault: {
    title: 'Compliance Vault — 2257, DMCA & Legal Frameworks for Creators',
    description: 'Your complete compliance command center: 18 U.S.C. 2257 record-keeping guides, DMCA anti-piracy protocols, and regulatory compliance frameworks for adult creators.',
    canonical: '/compliance',
    ogType: 'website',
    keywords: 'compliance vault, 2257 compliance, DMCA protection, adult creator legal, regulatory compliance',
  },

  // ── Education ────────────────────────────────────────────────────────────────
  university: {
    title: 'Blacklisted University — Creator Education & Masterclasses',
    description: 'Access courses, guides, and masterclasses on niche psychology, privacy law, compliance, and scaling for serious adult content creators.',
    canonical: '/university',
    ogType: 'website',
    keywords: 'creator education, adult creator courses, niche mastery, creator training, online learning',
  },
  education: {
    title: 'Creator Education — Learning Resources for Digital Skills',
    description: 'Education resources, courses, and guides for mastering creator business skills, compliance, and staying current with industry trends.',
    canonical: '/university',
    ogType: 'website',
    keywords: 'creator education, adult creator training, niche mastery, learning resources',
  },

  // ── Blog ─────────────────────────────────────────────────────────────────────
  blog: {
    title: 'Creator Intelligence & Industry Guides — B.N.E. Studio Blog',
    description: 'Guides, articles, and blueprints covering adult entertainment business strategy, 2257 record keeping, client safety, and cash flow security.',
    canonical: '/blog',
    ogType: 'website',
    keywords: 'creator blog, adult creator guides, business strategy, compliance guides, industry insights',
  },

  // ── Pricing / Tiers ──────────────────────────────────────────────────────────
  pricing: {
    title: 'Creator Management Plans & Pricing — B.N.E. Studio',
    description: 'Compare B.N.E. Studio creator management plans: Glow-Up Launch, Empire Scale, and Elite Multi-Front Management. Performance-aligned pricing for serious creators.',
    canonical: '/tiers',
    ogType: 'website',
    keywords: 'creator management pricing, OnlyFans management cost, management tiers, creator partnership pricing',
  },

  // ── Dashboard ────────────────────────────────────────────────────────────────
  // dashboard key used by Dashboard.tsx
  dashboard: {
    title: 'Creator Dashboard — Your Empire Control Center',
    description: 'Your B.N.E. Studio creator dashboard: track performance metrics, manage campaigns, review compliance status, and access all tools in one place.',
    canonical: '/dashboard',
    noIndex: true, // Private dashboard — keep out of search
    ogType: 'website',
    keywords: 'creator dashboard, performance tracking, creator metrics',
  },

  // ── Legal / Info ─────────────────────────────────────────────────────────────
  legal: {
    title: 'Legal — Terms, Privacy & Legal Information',
    description: 'Legal information including terms of service, privacy policy, and legal documents for B.N.E. Studio creator management and advisory services.',
    canonical: '/terms',
    ogType: 'website',
    keywords: 'legal, terms of service, privacy policy, creator legal documents',
  },
  'about': {
    title: 'About B.N.E. Studio — Our Story & Mission',
    description: 'Learn about B.N.E. Studio, our mission to be the silent operations partner for elite creator empires, and the team behind the infrastructure.',
    canonical: '/about',
    ogType: 'website',
    keywords: 'about BNE Studio, creator management agency, silent partner, our story',
  },
  contact: {
    title: 'Contact B.N.E. Studio — Get in Touch',
    description: 'Contact the B.N.E. Studio team for inquiries, project discussions, or collaboration opportunities. Start your strategic assessment today.',
    canonical: '/onboarding',
    ogType: 'website',
    keywords: 'contact BNE Studio, creator management inquiry, project discussion',
  },
  portfolio: {
    title: 'Portfolio — Creator Empire Case Studies',
    description: 'Browse case studies and performance data from B.N.E. Studio client engagements. See how our infrastructure transforms creator brands.',
    canonical: '/success-stories',
    ogType: 'website',
    keywords: 'creator case studies, BNE portfolio, creator empire results',
  },
};

export const organizationSchema = buildOrganizationSchema(baseMetadata.siteUrl);

export const websiteSchema = buildWebSiteSchema(baseMetadata.siteUrl, baseMetadata.siteName);

export const blogPostSchema = (
  title: string,
  description: string,
  url: string,
  datePublished: string,
  author: string
) =>
  buildBlogPostingSchema({
    headline: title,
    description,
    url,
    datePublished,
    author,
  });

export const serviceSchema = (serviceName: string, description: string, url: string) =>
  buildServiceSchema(serviceName, description, url);

export const breadcrumbSchema = (items: { name: string; url: string }[]) =>
  buildBreadcrumbSchema(items);
