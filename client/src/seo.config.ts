import { HelmetProps } from 'react-helmet-async';

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
  siteName: 'Blacklisted Studio',
  defaultTitle: 'Blacklisted Studio - Modern Web Development & Design',
  defaultDescription: 'Blacklisted Studio provides web development, UI/UX design, and digital marketing services.',
  defaultImage: 'https://blacklisted.studio/og-image.jpg',
  twitterHandle: '@blacklistedstudio',
};

export const pageSeoConfig: Record<string, SeoMetadata> = {
  home: {
    title: 'Blacklisted Studio - Modern Web Development & Design',
    description: 'Blacklisted Studio is a creative agency that builds modern websites, web applications, and digital experiences for brands.',
    ogType: 'website',
    keywords: 'web development, UI/UX design, digital agency, creative studio, web design',
  },
  'niche-matcher': {
    title: 'Niche Matcher - Find Your Perfect Digital Solution',
    description: 'Use our Niche Matcher tool to discover the best digital strategy and web solution for your specific industry niche.',
    ogType: 'website',
    keywords: 'niche finder, digital strategy, industry solution, niche marketing',
  },
  'creator-tools': {
    title: 'Creator Tools - Resources for Digital Creators',
    description: 'Tools and resources for content creators, including design templates, SEO tools, and productivity apps.',
    ogType: 'website',
    keywords: 'creator tools, content creation, design resources, SEO tools',
  },
  compliance: {
    title: 'Compliance Solutions - Legal & Regulatory Compliance',
    description: 'Compliance services for digital products and businesses, including GDPR, CCPA, and accessibility compliance.',
    ogType: 'website',
    keywords: 'compliance, GDPR, CCPA, accessibility, legal compliance',
  },
  university: {
    title: 'University - Learn Digital Skills & Strategies',
    description: 'Our University section offers courses, guides, and resources for mastering digital skills and web development.',
    ogType: 'website',
    keywords: 'digital skills, courses, web development training, online learning',
  },
  blog: {
    title: 'Blog - Insights on Web Development & Design',
    description: 'Our blog covers topics like web development, UI/UX design, SEO strategies, and digital marketing insights.',
    ogType: 'website',
    keywords: 'web development blog, design insights, SEO tips, digital marketing',
  },
  pricing: {
    title: 'Pricing - Affordable Plans for Your Business',
    description: 'Explore our transparent pricing plans for web development, design services, and digital marketing packages.',
    ogType: 'website',
    keywords: 'pricing, web development cost, design pricing, marketing packages',
  },
  'tools': {
    title: 'Tools - Digital Tools & Resources',
    description: 'A curated collection of digital tools to improve your workflow, design projects, and marketing efforts.',
    ogType: 'website',
    keywords: 'digital tools, design tools, SEO tools, marketing resources',
  },
  monetization: {
    title: 'Monetization - Revenue Strategies for Creators',
    description: 'Learn how to monetize your digital products, services, and content with our strategic guidance.',
    ogType: 'website',
    keywords: 'monetization, revenue strategies, content monetization, creator economy',
  },
  strategy: {
    title: 'Strategy - Strategic Planning for Digital Success',
    description: 'Strategic planning services for businesses and creators to achieve digital success and growth.',
    ogType: 'website',
    keywords: 'strategic planning, digital strategy, business growth, marketing strategy',
  },
  operations: {
    title: 'Operations - Streamline Your Digital Operations',
    description: 'Operations management for digital projects, including workflow optimization, project management, and team coordination.',
    ogType: 'website',
    keywords: 'operations management, workflow optimization, project management, digital operations',
  },
  security: {
    title: 'Security - Protect Your Digital Assets',
    description: 'Security solutions for websites, applications, and digital infrastructure to protect your data and users.',
    ogType: 'website',
    keywords: 'web security, application security, data protection, cybersecurity',
  },
  education: {
    title: 'Education - Learning Resources for Digital Skills',
    description: 'Education resources, courses, and guides for learning digital skills and staying current with industry trends.',
    ogType: 'website',
    keywords: 'education, digital skills, training, learning resources',
  },
  legal: {
    title: 'Legal - Terms, Privacy & Legal Information',
    description: 'Legal information including terms of service, privacy policy, and other legal documents for our users.',
    ogType: 'website',
    keywords: 'legal, terms of service, privacy policy, legal documents',
  },
  'about': {
    title: 'About - Our Story & Mission',
    description: 'Learn about our agency, our mission, and the team behind Blacklisted Studio.',
    ogType: 'website',
    keywords: 'about us, agency story, team, mission',
  },
  contact: {
    title: 'Contact - Get in Touch with Blacklisted Studio',
    description: 'Contact our team for inquiries, project discussions, or collaboration opportunities.',
    ogType: 'website',
    keywords: 'contact, reach out, collaboration, project inquiry',
  },
  portfolio: {
    title: 'Portfolio - Our Work & Case Studies',
    description: 'Browse our portfolio of projects and case studies showcasing our expertise in web development and design.',
    ogType: 'website',
    keywords: 'portfolio, case studies, projects, work',
  },
  services: {
    title: 'Services - What We Offer',
    description: 'Our services include web development, UI/UX design, digital marketing, and strategic consulting.',
    ogType: 'website',
    keywords: 'services, web development, UI/UX design, digital marketing',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blacklisted Studio',
  url: 'https://blacklisted.studio',
  logo: 'https://blacklisted.studio/logo.png',
  description: 'Blacklisted Studio is a creative agency specializing in web development, UI/UX design, and digital marketing.',
  foundingDate: '2018',
  founders: [{ '@type': 'Person', name: 'Founder Name' }],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@blacklisted.studio',
  },
  sameAs: [
    'https://twitter.com/blacklistedstudio',
    'https://github.com/blacklistedstudio',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Blacklisted Studio',
  url: 'https://blacklisted.studio',
  description: 'Blacklisted Studio is a creative agency that builds modern websites, web applications, and digital experiences for brands.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://blacklisted.studio/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const blogPostSchema = (title: string, description: string, url: string, datePublished: string, author: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description: description,
  url: url,
  datePublished: datePublished,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Blacklisted Studio',
  },
});

export const serviceSchema = (serviceName: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: description,
  provider: {
    '@type': 'Organization',
    name: 'Blacklisted Studio',
  },
  url: url,
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
