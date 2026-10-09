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
  defaultImage: 'https://blacklisted.studio/og-image.jpg',
  twitterHandle: '@blacklistedstudio',
};

export const pageSeoConfig: Record<string, SeoMetadata> = {
  // ── Core pages ──────────────────────────────────────────────────────────────
  home: {
    title: 'B.N.E. Studio — Silent Partner for Elite Creator Empires',
    description: 'B.N.E. Studio is the silent operations partner for digital creators. We handle niche intelligence, backend management, compliance, advertising, and scaling so you can focus on content.',
    canonical: '/',
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
  'free-software': {
    title: 'Free Software Arsenal for Creators — 40 Free & Open-Source Tools',
    description: '40 genuinely free and open-source apps for OnlyFans creators, webcam models, and in-person companions — streaming, editing, scheduling, bookkeeping, and safety. Honest free-tier details, no trials masquerading as free.',
    canonical: '/free-software',
    ogType: 'website',
    keywords: 'free software for creators, open source creator tools, free OBS plugins, free video editor, free scheduling app, creator free software',
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

  // ── Admin operations console (role-gated, never indexed, never in sitemap) ──
  admin: {
    title: 'Admin Console',
    description: 'Restricted site administration console.',
    canonical: '/admin',
    noIndex: true,
    noFollow: true,
    ogType: 'website',
    keywords: '',
  },
  'admin-geo-blocking': {
    title: 'Geo-Block Manager',
    description: 'Restricted admin tool for client geo-blocking requests.',
    canonical: '/admin/geo-blocking',
    noIndex: true,
    noFollow: true,
    ogType: 'website',
    keywords: '',
  },
  'admin-identity-shield': {
    title: 'Identity Shield',
    description: 'Restricted admin privacy toolkit.',
    canonical: '/admin/identity-shield',
    noIndex: true,
    noFollow: true,
    ogType: 'website',
    keywords: '',
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
  'onlyfans-management': {
    title: 'OnlyFans Management Agency — Scale Your Fan Business | BNE Studio',
    description: 'BNE Studio is the silent operations partner for OnlyFans creators: niche positioning, 24/7 DM operations, content systems, pricing engineering, 2257 compliance, and traffic growth.',
    canonical: '/onlyfans-management',
    ogType: 'website',
    keywords: 'onlyfans management agency, onlyfans manager, onlyfans growth agency, fan platform management, onlyfans marketing',
  },
  'webcam-models': {
    title: 'Webcam Model Management — Grow Your Cam Business | BNE Studio',
    description: 'BNE Studio manages webcam model businesses end-to-end: multistream simulcasting, live show chatter service, tip menu engineering, high-spender cultivation, clip repurposing, privacy shielding, and sustainable scheduling.',
    canonical: '/webcam-models',
    ogType: 'website',
    keywords: 'webcam model management, cam model agency, camgirl management, chaturbate management, webcam business growth',
  },
  'in-person-companions': {
    title: 'Business Management for In-Person Companions | BNE Studio',
    description: 'BNE Studio provides business infrastructure for independent in-person companions: brand positioning, screening and safety systems, client management, discreet digital presence, and bookkeeping.',
    canonical: '/in-person-companions',
    ogType: 'website',
    keywords: 'in-person companion business management, companion branding agency, independent companion business support, companion screening systems',
  },

  // ── Auto-generated route coverage (from component <Seo> props) ─────────
  'payment-success': {
    title: 'Payment Successful — B.N.E. Studio',
    description: 'Your payment to B.N.E. Studio was received. Check your email for next steps and onboarding details.',
    canonical: '/payment/success',
    ogType: 'website',
    noIndex: true,
  },
  '2257-compliance': {
    title: '18 U.S.C. § 2257 Federal Compliance & Custodian Services | BNE Studio',
    description: 'BNE Studio provides official Custodian of Records representation, 18 U.S.C. 2257 record-keeping compliance, model releases, and performer liability protection.',
    canonical: '/2257-compliance',
    ogType: 'website',
    keywords: '2257 compliance services, Custodian of Records adult creator, 18 USC 2257 record keeping, OnlyFans 2257 legal compliance, adult performer model release',
  },
  'account-security': {
    title: 'Account Security & Cybersecurity Protocols | BNE Studio',
    description: 'Protect your creator accounts with BNE Studio: YubiKey hardware 2FA, role-based sub-account access, static residential IP proxy firewalls, and breach monitoring.',
    canonical: '/account-security',
    ogType: 'website',
    keywords: 'creator account security, OnlyFans security protocols, YubiKey 2FA creators, creator SIM swap protection, sub account management adult creator',
  },
  'advertising-systems': {
    title: 'Advertising Systems | BNE Agency',
    description: 'Strategic advertising systems that put creator brands in front of high-intent audiences. Stop wasting ad spend, start converting viewers into revenue.',
    canonical: '/advertising-systems',
    ogType: 'website',
    keywords: 'adult creator advertising, OnlyFans ads, creator ad campaigns, traffic advertising, fan acquisition ads',
  },
  'all-courses': {
    title: 'Blacklisted University Free Class Catalog | Creator Guides',
    description: 'Browse Blacklisted University\'s free class guides: 2257 compliance, niche psychology, monetization, platform automation, and companion safety. No enrollment, no tuition — just free in-depth creator education.',
    canonical: '/all-courses',
    ogType: 'website',
    keywords: 'free creator guides, OnlyFans education free, 2257 compliance guide, creator monetization guide, Blacklisted University',
  },
  'apply': {
    title: 'Apply for Management & Empire Building',
    description: 'Apply for BNE Agency\'s confidential management, silent webcam partnership, or companion safety/booking support. Start stacking cash and reclaim your free time.',
    canonical: '/apply',
    ogType: 'website',
    keywords: 'apply for creator management, OnlyFans management application, webcam model management apply, join BNE agency',
  },
  'audience-intelligence': {
    title: 'Audience Intelligence | BNE Agency',
    description: 'Understand the hidden psychology behind your audience is spending habits. Learn to read intent, segment superfans, and dominate your niche.',
    canonical: '/audience-intelligence',
    ogType: 'website',
    keywords: 'audience intelligence, fan analytics, demographic insights',
  },
  'backend-management': {
    title: 'Creator Backend Management | Silent Partner Operations — BNE Studio',
    description: 'BNE Studio manages the complete backend of your creator business: content scheduling, fan DMs, analytics, tax records, 2257 compliance, and platform optimization. You create. We handle everything else.',
    canonical: '/backend-management',
    ogType: 'website',
    keywords: 'creator backend management, OnlyFans management service, adult creator operations, fan DM management, creator compliance, 2257 record keeping',
  },
  'booking-management': {
    title: 'In-Person Booking & Client Vetting Management | BNE Studio',
    description: 'Professional booking management, safety vetting, VOIP identity protection, and calendar filling for high-end companions and adult entertainment providers across the West Coast.',
    canonical: '/booking-management',
    ogType: 'website',
    keywords: 'escort booking management, client screening protocols, companion safety vetting, adult provider booking agency, escort safety dispatch',
  },
  'compliance-documentation': {
    title: 'Performer Compliance Documentation & Model Release Forms | BNE Studio',
    description: 'Download federal 18 U.S.C. 2257 performer model releases, co-star consent contracts, custodian statements, and EXIF metadata privacy checklists.',
    canonical: '/compliance-documentation',
    ogType: 'website',
    keywords: '2257 model release form, adult performer contract, co star consent agreement, Custodian of Records statement, creator legal documentation',
  },
  'compliance-resources': {
    title: 'Creator Legal Compliance Resources & Survival Kits | BNE Studio',
    description: 'Access free adult creator legal resources: 18 U.S.C. 2257 federal audit survival guides, DMCA takedown tools, model releases, and privacy manuals.',
    canonical: '/compliance-resources',
    ogType: 'website',
    keywords: 'adult creator compliance resources, 2257 audit guide, free DMCA takedown generator, OnlyFans legal resources, BNE legal library',
  },
  'compliance-standards': {
    title: 'Adult Creator Compliance Standards & Legal Frameworks | BNE Studio',
    description: 'Master federal 18 U.S.C. 2257 standards, Visa/Mastercard payment processor content rules, state age-gating mandates, and co-star release contracts with BNE Studio.',
    canonical: '/compliance-standards',
    ogType: 'website',
    keywords: 'adult creator compliance standards, 2257 legal standards, Visa Mastercard adult content rules, creator age verification compliance, BNE legal standards',
  },
  'creator-positioning': {
    title: 'Creator Positioning | BNE Agency',
    description: 'Master niche psychology and position yourself as the go-to creator in a high-value, underserved market segment.',
    canonical: '/creator-positioning',
    ogType: 'website',
    keywords: 'creator positioning, personal brand strategy, OnlyFans branding, creator niche positioning',
  },
  'creator-utilities': {
    title: 'Creator Utility Stack & AFK Automation Tools | BNE Studio',
    description: 'Access BNE Creator Utilities: Income Verifier calculators, AFK content queue tools, classified ad generators, and custom rate card designers.',
    canonical: '/creator-utilities',
    ogType: 'website',
    keywords: 'creator utilities, OnlyFans income verifier, creator AFK tools, custom tip menu calculator, adult creator software tools',
  },
  'data-protection': {
    title: 'Creator Data Protection & Financial Privacy Infrastructure | BNE Studio',
    description: 'BNE Studio provides enterprise data protection for adult creators: zero-knowledge encrypted vaults, EXIF scrubbing, anonymous LLC structures, and financial privacy.',
    canonical: '/data-protection',
    ogType: 'website',
    keywords: 'creator data protection, OnlyFans creator privacy, EXIF scrubbing tool, anonymous LLC creator setup, financial privacy adult creators',
  },
  'free-creator-tools': {
    title: 'Free Creator Tools — AI Apps & Utilities for Adult Creators',
    description: 'Every free tool on Blacklisted Studio, matched to your creator type: AI-powered classified ad posters with geo-rotation for companions, AI chatters and analytics for OnlyFans creators, show planners for webcam models. No signup, no catch.',
    canonical: '/free-creator-tools',
    ogType: 'website',
    keywords: 'free creator tools, AI tools for OnlyFans creators, free companion advertising tools, webcam model tools, creator AI apps',
  },
  'free-tools': {
    title: 'Free Legal Tools & Templates | BNE Creator OS',
    description: 'Download free legal templates, release forms, compliance checklists, and contract frameworks for adult content creators. No sign-up required.',
    canonical: '/free-tools',
    ogType: 'website',
    keywords: 'free creator tools, free OnlyFans tools, creator freebies, free content tools',
  },
  'growth-examples': {
    title: 'Creator Growth Case Studies & Transformations | BNE Studio',
    description: 'Explore real before/after creator growth examples. See how BNE systems transformed small independent creator accounts into 6-figure recurring empires.',
    canonical: '/growth-examples',
    ogType: 'website',
    keywords: 'creator growth case studies, OnlyFans revenue transformation, adult creator before after metrics, companion booking growth, BNE case studies',
  },
  'guides': {
    title: 'Creator Guides & Downloadable Toolkits | Blacklisted University',
    description: 'Download Blacklisted University creator guides, § 2257 compliance workbooks, brand playbooks, and niche psychology toolkits.',
    canonical: '/guides',
    ogType: 'website',
    keywords: 'adult creator guides, 2257 compliance manual PDF, OnlyFans creator toolkit, adult brand playbook PDF, Blacklisted University guides',
  },
  'industry-analysis': {
    title: 'Adult Creator Industry Analysis & Market Intelligence | BNE Studio',
    description: 'Access empirical research on creator economy earnings, platform revenue distribution, search trend velocity, and paywall price elasticity.',
    canonical: '/industry-analysis',
    ogType: 'website',
    keywords: 'adult creator industry analysis, OnlyFans market report, creator earnings stats, adult entertainment market size, BNE market research',
  },
  'intelligence-hub': {
    title: 'Legal & Compliance Intelligence Hub | Blacklisted University',
    description: 'Access Blacklisted University strategic intelligence briefings on 18 U.S.C. 2257 compliance, privacy law, DMCA enforcement, and identity protection.',
    canonical: '/intelligence-hub',
    ogType: 'website',
    keywords: '2257 compliance guide, adult creator legal intelligence, OnlyFans privacy protection, DMCA takedown briefing, Blacklisted University intelligence',
  },
  'makemoney': {
    title: 'Adult Creator Revenue Playbook | How to Make Money with BNE Studio',
    description: 'Master the 6 core revenue engines for adult content creators: subscription tiering, PPV messaging, 24/7 DM chat sales, clip store syndication, companion booking, and affiliate stacking.',
    canonical: '/makemoney',
    ogType: 'website',
    keywords: 'how to make money on OnlyFans, adult content revenue streams, creator income playbook, PPV messaging optimization, creator business model',
  },
  'market-analysis': {
    title: 'Market Analysis | BNE Agency',
    description: 'Deep market and niche analysis for adult content creators. Identify high-earning segments, competition gaps, and growth opportunities.',
    canonical: '/market-analysis',
    ogType: 'website',
    keywords: 'creator market analysis, OnlyFans market research, adult industry analysis, niche market data',
  },
  'monetization-page': {
    title: 'Creator Monetization Architecture & Revenue Strategy | BNE Studio',
    description: 'Master adult content creator revenue architecture. Learn how to balance subscription pricing, PPV messaging, custom rate cards, and clip store syndication for maximum monthly profit.',
    canonical: '/monetization',
    ogType: 'website',
    keywords: 'adult creator monetization, OnlyFans pricing strategy, PPV conversion rates, creator revenue architecture, custom content rate card',
  },
  'performance-utilities': {
    title: 'Performance Utilities & Creator Business Intelligence | BNE Studio',
    description: 'Transform raw creator metrics into growth strategies. Use BNE Performance Utilities: Income Verifier calculators, cohort analytics, and price elasticity modeling tools.',
    canonical: '/performance-utilities',
    ogType: 'website',
    keywords: 'creator performance utilities, OnlyFans analytics calculator, subscriber LTV calculator, creator income verifier, price elasticity modeling tool',
  },
  'playbooks': {
    title: 'Creator Operational Playbooks | Blacklisted University',
    description: 'Access BNE Studio operational playbooks: business infrastructure, brand positioning, high-ticket DM sales scripts, and 2257 legal compliance blueprints.',
    canonical: '/playbooks',
    ogType: 'website',
    keywords: 'creator operational playbooks, OnlyFans business playbook, 2257 compliance playbook, DM sales scripts for creators, Blacklisted University playbooks',
  },
  'policies': {
    title: 'Creator Operational Policies & Agency Governance | BNE Studio',
    description: 'Review BNE Studio\'s creator partnership policies: flat-fee financial transparency, performer autonomy guarantees, DM team conduct, and anonymity protections.',
    canonical: '/policies',
    ogType: 'website',
    keywords: 'BNE studio policies, creator agency ethics, OnlyFans management policy, flat fee creator agency, performer autonomy policy',
  },
  'posting-and-scheduling': {
    title: 'Managed Booking & Vetting Services for In-Person Entertainers',
    description: 'We handle the advertisements, vet incoming clients via a shared VOIP SMS line, manage your calendar with live GPS notifications, and perform end-of-date safety checks.',
    canonical: '/posting-and-scheduling',
    ogType: 'website',
    keywords: 'content scheduling for creators, OnlyFans posting schedule, social media scheduler, automated posting',
  },
  'pricing-page': {
    title: 'Management Plans, Pricing & Service Tiers',
    description: 'Compare BNE\'s plans: from Glow-Up Launch and Empire Scale to Elite Multi-Front Management. Choose the perfect tier to automate your backend, secure your privacy, and multiply your revenue.',
    canonical: '/pricing',
    ogType: 'website',
    keywords: 'creator management pricing, OnlyFans management cost, agency pricing plans, BNE pricing',
  },
  'privacy-systems': {
    title: 'Privacy Systems | BNE Agency',
    description: 'Lock down your digital identity and financial footprint. BNE builds a complete anonymity fortress around your creator brand.',
    canonical: '/privacy-systems',
    ogType: 'website',
    keywords: 'creator privacy protection, OnlyFans anonymity, DMCA protection, online privacy for creators',
  },
  'resources': {
    title: 'Resources Vault | BNE Creator OS',
    description: 'Free and premium downloads for creators: marketing assets, legal documents, brand guides, and technical toolkits.',
    canonical: '/resources',
    ogType: 'website',
    keywords: 'creator resources, OnlyFans guides, webcam model resources, free creator education',
  },
  'revenue-optimization': {
    title: 'Creator Revenue Optimization & Growth Science | BNE Studio',
    description: 'Optimize your creator business revenue. Learn how to increase subscriber LTV, reduce churn, model paywall price elasticity, and cultivate high-ticket whales.',
    canonical: '/revenue-optimization',
    ogType: 'website',
    keywords: 'creator revenue optimization, OnlyFans LTV optimization, subscriber churn reduction, adult creator analytics, whale retention strategy',
  },
  'scaling-frameworks': {
    title: 'Scaling Frameworks | BNE Agency',
    description: 'Discover BNE operational scaling frameworks designed to grow creator empires while reducing labor and maximizing passive revenue.',
    canonical: '/scaling-frameworks',
    ogType: 'website',
    keywords: 'scale creator business, OnlyFans growth framework, creator scaling strategy, revenue scaling',
  },
  'screening-systems': {
    title: 'Screening Systems | BNE Agency',
    description: 'Rigorous client vetting and reference checking systems that filter out time-wasters, bad actors, and dangerous clients before they reach your calendar.',
    canonical: '/screening-systems',
    ogType: 'website',
    keywords: 'client screening systems, companion safety screening, verification systems, booking screening',
  },
  'solutions-niche-intelligence': {
    title: 'Niche Matcher — Find Your Highest-Earning Creator Niche',
    description: 'Use our Niche Matcher to discover the best digital strategy and niche for your creator brand. Analyze 1,052 market segments in 90 seconds.',
    canonical: '/niche-matcher',
    ogType: 'website',
    keywords: 'niche finder, creator niche, OnlyFans niche, digital strategy, niche analysis',
  },
  'structured-advisory': {
    title: 'Structured Creator Advisory Tiers & Brand Strategy | BNE Studio',
    description: 'Flat-rate strategic advisory for adult creators. Get bi-weekly 1-on-1 brand positioning calls, compliance auditing, revenue funnel optimization, and custom Brand Playbooks.',
    canonical: '/structured-advisory',
    ogType: 'website',
    keywords: 'structured creator advisory, OnlyFans consultant, adult creator brand playbook, creator advisory firm, flat rate creator management',
  },
  'templates': {
    title: 'Creator Templates & Media Kits | Blacklisted University',
    description: 'Download ready-to-use adult creator templates: Media Kits, 2257 performer release forms, DM sales scripts, and custom tip menu designs.',
    canonical: '/templates',
    ogType: 'website',
    keywords: 'adult creator templates, OnlyFans media kit PDF, 2257 release form template, creator DM sales scripts, adult creator brand templates',
  },
  'tools-blacklisted-links': {
    title: 'Blacklisted Links-in-Bio | Premium Bio Page Generator | BNE Studio',
    description: 'Generate a luxurious black and gold link-in-bio page for adult content creators. Non-removable BNE CTA, premium styling, and platform-optimized links.',
    canonical: '/tools/blacklisted-links',
    ogType: 'website',
    keywords: 'link in bio tool, creator link page, OnlyFans link aggregator, bio link tool',
  },
  'tools-calculator': {
    title: 'Creator Revenue Calculator — BNE Studio',
    description: 'Estimate your creator earnings across subscriptions, PPV, tips, and after-BNE projections with our all-in-one calculator.',
    canonical: '/tools/calculator',
    ogType: 'website',
    keywords: 'OnlyFans revenue calculator, creator earnings calculator, income estimator',
  },
  'tools-silent-rank': {
    title: 'SilentRank — Adult Content SEO Optimizer | BNE Studio',
    description: 'Audit your OnlyFans, Fansly, and creator bios for platform compliance and SEO optimization. AI-enhanced filters, keyword suggestions, and preview image generation — all api-keyless.',
    canonical: '/tools/silent-rank',
    ogType: 'website',
    keywords: 'SEO ranking tool, creator SEO, search ranking checker',
  },
  'tools-teaser-forge': {
    title: 'TeaserForge — AI Video Teaser Generator | BNE Studio',
    description: 'Upload your full-length video and let TeaserForge AI automatically clip the best moments into 2-10 teaser clips with zoom effects and watermark branding.',
    canonical: '/tools/teaser-forge',
    ogType: 'website',
    keywords: 'teaser content maker, promo clip generator, SFW teaser creator',
  },
  'traffic-strategy': {
    title: 'Traffic Strategy | BNE Agency',
    description: 'Multi-platform traffic systems that turn platform algorithms into your personal audience pipeline. Scale views, subscribers, and revenue simultaneously.',
    canonical: '/traffic-strategy',
    ogType: 'website',
    keywords: 'creator traffic strategy, OnlyFans promotion, Reddit marketing, fan traffic generation',
  },
  'training-modules': {
    title: 'Creator Training Modules & Automation Playbooks | Blacklisted University',
    description: 'Master adult creator automation workflows, 24/7 DM sales systems, 2257 compliance, and clip store syndication through Blacklisted University training modules.',
    canonical: '/training-modules',
    ogType: 'website',
    keywords: 'creator training modules, OnlyFans automation course, 2257 compliance training, creator DM sales scripts, adult creator academy',
  },
  'trends': {
    title: 'Creator Economy Trend Intelligence & 2026 Forecasts | BNE Studio',
    description: 'Stay ahead of adult creator economy trends: micro-niche acceleration, platform algorithm shifts, AI fan CRM tools, and sovereign legal privacy frameworks.',
    canonical: '/trends',
    ogType: 'website',
    keywords: 'adult creator trends 2026, OnlyFans algorithm forecast, micro-niche creator strategy, adult content market trends, Blacklisted University trends',
  },
  'web-design-apps': {
    title: 'In-Person Services Management for Escorts & Entertainers',
    description: 'Full-service management for in-person entertainers. We handle client screening, booking, safety, marketing, and legal so you can focus on your craft.',
    canonical: '/web-design-apps',
    ogType: 'website',
    keywords: 'adult web design, creator website design, OnlyFans landing pages, web design services',
  },

  // ── Bare-page coverage: components that previously set no <Seo> ──
  'media': {
    title: 'Marketing Assets & Brand Media Kit | BNE Studio',
    description: 'Download official BNE Studio brand assets, logos, and marketing materials for partners, affiliates, and press.',
    canonical: '/media',
    ogType: 'website',
    keywords: 'BNE Studio media kit, brand assets download, creator agency logos, marketing materials',
  },
  'downloads': {
    title: 'Free Creator Guides & eBook Downloads | BNE Studio',
    description: 'Download free creator playbooks and guides: six-figure content empire blueprints, niche mastery, and entertainer business infrastructure.',
    canonical: '/downloads',
    ogType: 'website',
    keywords: 'free creator ebooks, OnlyFans guide download, creator business playbook PDF, free adult creator guides',
  },
  'tools-autopilot-studio': {
    title: 'AutoPilot Studio — No-Code Creator Workflow Automation | BNE Studio',
    description: 'Build no-code automation workflows for your creator business: welcome DM sequences, tip thank-yous, re-engagement loops, PPV funnels, and VIP tracking.',
    canonical: '/tools/autopilot-studio',
    ogType: 'website',
    keywords: 'creator workflow automation, OnlyFans auto DM, no-code automation creators, fan funnel builder',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AutoPilot Studio',
      url: 'https://blacklisted.studio/tools/autopilot-studio',
      description: 'Build no-code automation workflows for your creator business: welcome DM sequences, tip thank-yous, re-engagement loops, PPV funnels, and VIP tracking.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-brandstamp': {
    title: 'BrandStamp — Batch Media Watermarking Tool | BNE Studio',
    description: 'Watermark entire batches of photos and videos with your brand in seconds. Protect your content before it ships.',
    canonical: '/tools/brandstamp',
    ogType: 'website',
    keywords: 'batch watermark tool, watermark photos in bulk, creator content protection, video watermark app',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'BrandStamp',
      url: 'https://blacklisted.studio/tools/brandstamp',
      description: 'Watermark entire batches of photos and videos with your brand in seconds. Protect your content before it ships.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-classified-generator': {
    title: 'Classified Ad Generator — High-Converting Companion Ads | BNE Studio',
    description: 'Write classified ads that actually convert: AI-assisted copy tuned for independent companion advertising, with geo-rotation posting.',
    canonical: '/tools/classified-generator',
    ogType: 'website',
    keywords: 'classified ad writer, escort ad generator, companion advertising copy, high converting adult ads',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Classified Generator',
      url: 'https://blacklisted.studio/tools/classified-generator',
      description: 'Write classified ads that actually convert: AI-assisted copy tuned for independent companion advertising, with geo-rotation posting.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-strategy-engine': {
    title: 'Content Strategy Engine — Never Run Out of Content Ideas | BNE Studio',
    description: 'Generate a full content strategy in minutes: pillars, hooks, posting cadence, and PPV angles tailored to your niche.',
    canonical: '/tools/strategy-engine',
    ogType: 'website',
    keywords: 'content strategy generator, OnlyFans content ideas, creator content planner, AI content strategy',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Content Strategy Engine',
      url: 'https://blacklisted.studio/tools/strategy-engine',
      description: 'Generate a full content strategy in minutes: pillars, hooks, posting cadence, and PPV angles tailored to your niche.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-creator-link': {
    title: 'CreatorHub — Link-in-Bio Pages for Creators | BNE Studio',
    description: 'Build a premium link-in-bio page for your creator brand. One link for every platform, styled to convert profile visitors into subscribers.',
    canonical: '/tools/creator-link',
    ogType: 'website',
    keywords: 'link in bio for creators, OnlyFans link page, creator landing page builder, bio link tool',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CreatorHub',
      url: 'https://blacklisted.studio/tools/creator-link',
      description: 'Build a premium link-in-bio page for your creator brand. One link for every platform, styled to convert profile visitors into subscribers.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-creator-pulse': {
    title: 'CreatorPulse — AI Content Performance Insights | BNE Studio',
    description: 'AI-generated insights on what\'s working in your content: engagement patterns, best posting windows, and what to double down on.',
    canonical: '/tools/creator-pulse',
    ogType: 'website',
    keywords: 'creator analytics AI, OnlyFans insights tool, content performance analysis, AI posting recommendations',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CreatorPulse',
      url: 'https://blacklisted.studio/tools/creator-pulse',
      description: 'AI-generated insights on what\'s working in your content: engagement patterns, best posting windows, and what to double down on.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-content-calendar': {
    title: 'CreatorPush — Content Calendar & Scheduling for Creators | BNE Studio',
    description: 'Plan a month of content in one sitting: visual content calendar, scheduling queues, and campaign planning for fan platforms.',
    canonical: '/tools/content-calendar',
    ogType: 'website',
    keywords: 'creator content calendar, OnlyFans scheduling tool, content planner app, social scheduling creators',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CreatorPush',
      url: 'https://blacklisted.studio/tools/content-calendar',
      description: 'Plan a month of content in one sitting: visual content calendar, scheduling queues, and campaign planning for fan platforms.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-fanbot-builder': {
    title: 'FanBot Pro — Build Your AI Fan Chatbot | BNE Studio',
    description: 'Build an AI chatbot trained on your voice to handle fan DMs, answer FAQs, and sell PPV while you sleep.',
    canonical: '/tools/fanbot-builder',
    ogType: 'website',
    keywords: 'AI chatbot for OnlyFans, fan DM automation, AI chatter bot, OnlyFans chat automation',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FanBot Pro',
      url: 'https://blacklisted.studio/tools/fanbot-builder',
      description: 'Build an AI chatbot trained on your voice to handle fan DMs, answer FAQs, and sell PPV while you sleep.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-income-verifier': {
    title: 'Income Verifier — Professional Creator Income Reports | BNE Studio',
    description: 'Generate professional income verification reports from your creator earnings. Proof of income for rentals, loans, and visas.',
    canonical: '/tools/income-verifier',
    ogType: 'website',
    keywords: 'creator income verification, OnlyFans proof of income, adult creator income report, 1099 income letter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Income Verifier',
      url: 'https://blacklisted.studio/tools/income-verifier',
      description: 'Generate professional income verification reports from your creator earnings. Proof of income for rentals, loans, and visas.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-bank-statement-generator': {
    title: 'Bank Statement Generator — Reconciled Sample Statements | BNE Studio',
    description: 'Generate fully reconciled sample bank statements: payroll deposits matched to pay stubs, realistic expenses, exact starting and ending balances.',
    canonical: '/tools/bank-statement-generator',
    ogType: 'website',
    keywords: 'bank statement generator, sample bank statement, reconciled statement, proof of funds sample',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Bank Statement Generator',
      url: 'https://blacklisted.studio/tools/bank-statement-generator',
      description: 'Generate fully reconciled sample bank statements for demonstration and testing.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-sceneforge': {
    title: 'SceneForge — Content Shoot Planner for Creators | BNE Studio',
    description: 'Plan content shoots like a production: shot lists, scenes, outfits, and schedules — batch a month of content in one day.',
    canonical: '/tools/sceneforge',
    ogType: 'website',
    keywords: 'content shoot planner, OnlyFans shoot planning, creator shot list app, batch content creation',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SceneForge',
      url: 'https://blacklisted.studio/tools/sceneforge',
      description: 'Plan content shoots like a production: shot lists, scenes, outfits, and schedules — batch a month of content in one day.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  'tools-workflow-manager': {
    title: 'Workflow Manager — Creator Operations System | BNE Studio',
    description: 'Run your creator business like an operation: task pipelines, SOPs, and delegation systems for the hidden labor behind every post.',
    canonical: '/tools/workflow-manager',
    ogType: 'website',
    keywords: 'creator workflow system, OnlyFans operations management, creator SOP templates, VA delegation creators',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Workflow Manager',
      url: 'https://blacklisted.studio/tools/workflow-manager',
      description: 'Run your creator business like an operation: task pipelines, SOPs, and delegation systems for the hidden labor behind every post.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
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
