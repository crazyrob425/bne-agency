import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { organizationSchema, websiteSchema } from "./seo.config";

// Primary core entry routes (eagerly loaded for fast initial LCP)
import Home from "./pages/Home";
import NotFound from "@/pages/NotFound";

// Lazy-loaded routes for code-splitting
const ServiceTiers = lazy(() => import("./pages/ServiceTiers"));
const NicheMatcher = lazy(() => import("./pages/NicheMatcher"));
const NicheDetailPage = lazy(() => import("./pages/NicheMatcher").then((m) => ({ default: m.NicheDetailPage })));
const PostingAndScheduling = lazy(() => import("./pages/PostingAndScheduling"));
const CreatorTools = lazy(() => import("./pages/CreatorTools"));
const ComplianceVault = lazy(() => import("./pages/ComplianceVault"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Blog = lazy(() => import("./pages/Blog"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Tools = lazy(() => import("./pages/Tools"));
const CreatorCalculator = lazy(() => import("./pages/CreatorCalculator"));
const ContentStrategyEngine = lazy(() => import("./pages/tools/ContentStrategyEngine"));
const IncomeVerifier = lazy(() => import("./pages/tools/IncomeVerifier"));
const WorkflowManager = lazy(() => import("./pages/tools/WorkflowManager"));
const ClassifiedGenerator = lazy(() => import("./pages/tools/ClassifiedGenerator"));
const CreatorPush = lazy(() => import("./pages/tools/CreatorPush"));
const FanBotPro = lazy(() => import("./pages/tools/FanBotPro"));
const BrandStamp = lazy(() => import("./pages/tools/BrandStamp"));
const CreatorHub = lazy(() => import("./pages/tools/CreatorHub"));
const CreatorPulse = lazy(() => import("./pages/tools/CreatorPulse"));
const AutoPilotStudio = lazy(() => import("./pages/tools/AutoPilotStudio"));
const SceneForge = lazy(() => import("./pages/tools/SceneForge"));
const SilentRank = lazy(() => import("./pages/tools/SilentRank"));
const TeaserForge = lazy(() => import("./pages/tools/TeaserForge"));
const BlacklistedLinks = lazy(() => import("./pages/tools/BlacklistedLinks"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const AllServices = lazy(() => import("./pages/AllServices"));
const MarketingAssets = lazy(() => import("./pages/MarketingAssets"));
const MediaDownloads = lazy(() => import("./pages/MediaDownloads"));
const University = lazy(() => import("./pages/University"));
const MakeMoney = lazy(() => import("./pages/MakeMoney"));
const MonetizationSystems = lazy(() => import("./pages/MonetizationSystems"));
const ScalingFrameworks = lazy(() => import("./pages/ScalingFrameworks"));
const RevenueOptimization = lazy(() => import("./pages/RevenueOptimization"));
const StructuredAdvisory = lazy(() => import("./pages/StructuredAdvisory"));
const BusinessStrategy = lazy(() => import("./pages/BusinessStrategy"));
const CreatorPositioning = lazy(() => import("./pages/CreatorPositioning"));
const AudienceIntelligence = lazy(() => import("./pages/AudienceIntelligence"));
const MarketAnalysis = lazy(() => import("./pages/MarketAnalysis"));
const BackendManagement = lazy(() => import("./pages/BackendManagement"));
const BookingManagement = lazy(() => import("./pages/BookingManagement"));
const CreatorOperations = lazy(() => import("./pages/CreatorOperations"));
const AdvertisingSystems = lazy(() => import("./pages/AdvertisingSystems"));
const TrafficStrategy = lazy(() => import("./pages/TrafficStrategy"));
const PrivacySystems = lazy(() => import("./pages/PrivacySystems"));
const SecurityMeasures = lazy(() => import("./pages/SecurityMeasures"));
const ScreeningSystems = lazy(() => import("./pages/ScreeningSystems"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PerformanceUtilities = lazy(() => import("./pages/PerformanceUtilities"));
const Templates = lazy(() => import("./pages/Templates"));
const ResourcesVault = lazy(() => import("./pages/ResourcesVault"));
const CreatorUtilities = lazy(() => import("./pages/CreatorUtilities"));
const AllCourses = lazy(() => import("./pages/AllCourses"));
const TrainingModules = lazy(() => import("./pages/TrainingModules"));
const Guides = lazy(() => import("./pages/Guides"));
const IntelligenceHub = lazy(() => import("./pages/IntelligenceHub"));
const IndustryAnalysis = lazy(() => import("./pages/IndustryAnalysis"));
const Trends = lazy(() => import("./pages/Trends"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const GrowthExamples = lazy(() => import("./pages/GrowthExamples"));
const Playbooks = lazy(() => import("./pages/Playbooks"));
const ComplianceStandards = lazy(() => import("./pages/ComplianceStandards"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PoliciesPage = lazy(() => import("./pages/PoliciesPage"));
const DataProtection = lazy(() => import("./pages/DataProtection"));
const AccountSecurity = lazy(() => import("./pages/AccountSecurity"));
const Compliance2257 = lazy(() => import("./pages/Compliance2257"));
const ComplianceDocumentation = lazy(() => import("./pages/ComplianceDocumentation"));
const ComplianceResources = lazy(() => import("./pages/ComplianceResources"));
const MonetizationOverview = lazy(() => import("./pages/MonetizationOverview"));
const FreeLegalTools = lazy(() => import("./pages/FreeLegalTools"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CreatorOS = lazy(() => import("./pages/CreatorOS"));
const Academy = lazy(() => import("./pages/Academy"));
const ApplyPage = lazy(() => import("./pages/Apply"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const BneGrowthPartnership = lazy(() => import("./pages/BneGrowthPartnership"));

function PageFallback() {
  return (
    <div className="min-h-screen bg-[oklch(0.04_0.005_85)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[oklch(0.78_0.16_85)] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">Loading Page...</span>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/tiers" component={ServiceTiers} />
        <Route path="/niche-matcher/:slug" component={NicheDetailPage} />
        <Route path="/niche-matcher" component={NicheMatcher} />
        <Route path="/solutions/niche-intelligence" component={NicheMatcher} />
        <Route path="/posting-and-scheduling" component={PostingAndScheduling} />
        <Route path="/creator-tools" component={CreatorTools} />
        <Route path="/compliance" component={ComplianceVault} />
        <Route path="/university" component={University} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/creator-os" component={CreatorOS} />
        <Route path="/academy" component={Academy} />
        <Route path="/bne-growth-partnership" component={BneGrowthPartnership} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/apply" component={ApplyPage} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={ArticleDetail} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/payment/success" component={PaymentSuccess} />
        <Route path="/services" component={AllServices} />
        <Route path="/media" component={MarketingAssets} />
        <Route path="/downloads" component={MediaDownloads} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/calculator" component={CreatorCalculator} />
        <Route path="/tools/strategy-engine" component={ContentStrategyEngine} />
        <Route path="/tools/income-verifier" component={IncomeVerifier} />
        <Route path="/tools/workflow-manager" component={WorkflowManager} />
        <Route path="/tools/classified-generator" component={ClassifiedGenerator} />
        <Route path="/tools/content-calendar" component={CreatorPush} />
        <Route path="/tools/fanbot-builder" component={FanBotPro} />
        <Route path="/tools/brandstamp" component={BrandStamp} />
        <Route path="/tools/creator-link" component={CreatorHub} />
        <Route path="/tools/creator-pulse" component={CreatorPulse} />
        <Route path="/tools/autopilot-studio" component={AutoPilotStudio} />
        <Route path="/tools/sceneforge" component={SceneForge} />
        <Route path="/tools/silent-rank" component={SilentRank} />
        <Route path="/tools/teaser-forge" component={TeaserForge} />
        <Route path="/tools/blacklisted-links" component={BlacklistedLinks} />
        <Route path="/makemoney" component={MakeMoney} />
        <Route path="/monetization-systems" component={MonetizationSystems} />
        <Route path="/scaling-frameworks" component={ScalingFrameworks} />
        <Route path="/revenue-optimization" component={RevenueOptimization} />
        <Route path="/structured-advisory" component={StructuredAdvisory} />
        <Route path="/business-strategy" component={BusinessStrategy} />
        <Route path="/creator-positioning" component={CreatorPositioning} />
        <Route path="/audience-intelligence" component={AudienceIntelligence} />
        <Route path="/market-analysis" component={MarketAnalysis} />
        <Route path="/backend-management" component={BackendManagement} />
        <Route path="/booking-management" component={BookingManagement} />
        <Route path="/creator-operations" component={CreatorOperations} />
        <Route path="/advertising-systems" component={AdvertisingSystems} />
        <Route path="/traffic-strategy" component={TrafficStrategy} />
        <Route path="/monetization" component={MonetizationOverview} />
        <Route path="/privacy-systems" component={PrivacySystems} />
        <Route path="/security-measures" component={SecurityMeasures} />
        <Route path="/screening-systems" component={ScreeningSystems} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/performance-utilities" component={PerformanceUtilities} />
        <Route path="/templates" component={Templates} />
        <Route path="/resources" component={ResourcesVault} />
        <Route path="/free-tools" component={FreeLegalTools} />
        <Route path="/creator-utilities" component={CreatorUtilities} />
        <Route path="/all-courses" component={AllCourses} />
        <Route path="/training-modules" component={TrainingModules} />
        <Route path="/guides" component={Guides} />
        <Route path="/intelligence-hub" component={IntelligenceHub} />
        <Route path="/industry-analysis" component={IndustryAnalysis} />
        <Route path="/trends" component={Trends} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/growth-examples" component={GrowthExamples} />
        <Route path="/playbooks" component={Playbooks} />
        <Route path="/compliance-standards" component={ComplianceStandards} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/policies" component={PoliciesPage} />
        <Route path="/privacy" component={PoliciesPage} />
        <Route path="/data-protection" component={DataProtection} />
        <Route path="/account-security" component={AccountSecurity} />
        <Route path="/2257-compliance" component={Compliance2257} />
        <Route path="/compliance-documentation" component={ComplianceDocumentation} />
        <Route path="/compliance-resources" component={ComplianceResources} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const globalSchemas = [organizationSchema, websiteSchema];

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="dark">
          <HelmetProvider>
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify(globalSchemas)}
            </script>
          </Helmet>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
          </TooltipProvider>
          </HelmetProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
