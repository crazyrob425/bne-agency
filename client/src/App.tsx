import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Splash from "./pages/Splash";
import ServiceTiers from "./pages/ServiceTiers";
import NicheMatcher from "./pages/NicheMatcher";
import PostingAndScheduling from "./pages/PostingAndScheduling";
import CreatorTools from "./pages/CreatorTools";
import ComplianceVault from "./pages/ComplianceVault";
import Onboarding from "./pages/Onboarding";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Pricing from "./pages/Pricing";
import Tools from "./pages/Tools";
import CreatorCalculator from "./pages/CreatorCalculator";
import ContentStrategyEngine from "./pages/tools/ContentStrategyEngine";
import IncomeVerifier from "./pages/tools/IncomeVerifier";
import WorkflowManager from "./pages/tools/WorkflowManager";
import ClassifiedGenerator from "./pages/tools/ClassifiedGenerator";
import CreatorPush from "./pages/tools/CreatorPush";
import FanBotPro from "./pages/tools/FanBotPro";
import BrandStamp from "./pages/tools/BrandStamp";
import CreatorHub from "./pages/tools/CreatorHub";
import CreatorPulse from "./pages/tools/CreatorPulse";
import AutoPilotStudio from "./pages/tools/AutoPilotStudio";
import SceneForge from "./pages/tools/SceneForge";
import SilentRank from "./pages/tools/SilentRank";
import TeaserForge from "./pages/tools/TeaserForge";
import BlacklistedLinks from "./pages/tools/BlacklistedLinks";
import PaymentSuccess from "./pages/PaymentSuccess";
import AllServices from "./pages/AllServices";
import MarketingAssets from "./pages/MarketingAssets";
import MediaDownloads from "./pages/MediaDownloads";
import University from "./pages/University";
import MakeMoney from "./pages/MakeMoney";
import MonetizationSystems from "./pages/MonetizationSystems";
import ScalingFrameworks from "./pages/ScalingFrameworks";
import RevenueOptimization from "./pages/RevenueOptimization";
import StructuredAdvisory from "./pages/StructuredAdvisory";
import BusinessStrategy from "./pages/BusinessStrategy";
import CreatorPositioning from "./pages/CreatorPositioning";
import AudienceIntelligence from "./pages/AudienceIntelligence";
import MarketAnalysis from "./pages/MarketAnalysis";
import BackendManagement from "./pages/BackendManagement";
import BookingManagement from "./pages/BookingManagement";
import CreatorOperations from "./pages/CreatorOperations";
import AdvertisingSystems from "./pages/AdvertisingSystems";
import TrafficStrategy from "./pages/TrafficStrategy";
import PrivacySystems from "./pages/PrivacySystems";
import SecurityMeasures from "./pages/SecurityMeasures";
import ScreeningSystems from "./pages/ScreeningSystems";
import Dashboard from "./pages/Dashboard";
import PerformanceUtilities from "./pages/PerformanceUtilities";
import Templates from "./pages/Templates";
import ResourcesVault from "./pages/ResourcesVault";
import CreatorUtilities from "./pages/CreatorUtilities";
import AllCourses from "./pages/AllCourses";
import TrainingModules from "./pages/TrainingModules";
import Guides from "./pages/Guides";
import IntelligenceHub from "./pages/IntelligenceHub";
import IndustryAnalysis from "./pages/IndustryAnalysis";
import Trends from "./pages/Trends";
import SuccessStories from "./pages/SuccessStories";
import GrowthExamples from "./pages/GrowthExamples";
import Playbooks from "./pages/Playbooks";
import ComplianceStandards from "./pages/ComplianceStandards";
import TermsPage from "./pages/TermsPage";
import PoliciesPage from "./pages/PoliciesPage";
import DataProtection from "./pages/DataProtection";
import AccountSecurity from "./pages/AccountSecurity";
import Compliance2257 from "./pages/Compliance2257";
import ComplianceDocumentation from "./pages/ComplianceDocumentation";
import ComplianceResources from "./pages/ComplianceResources";
import MonetizationOverview from "./pages/MonetizationOverview";
import FreeLegalTools from "./pages/FreeLegalTools";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/home" component={Home} />
      <Route path="/tiers" component={ServiceTiers} />
      <Route path="/niche-matcher/:slug" component={NicheMatcher} />
      <Route path="/niche-matcher" component={NicheMatcher} /> {/* Retain for SEO */}
      <Route path="/solutions/niche-intelligence" component={NicheMatcher} />
      <Route path="/posting-and-scheduling" component={PostingAndScheduling} />
      <Route path="/creator-tools" component={CreatorTools} />
      <Route path="/compliance" component={ComplianceVault} />
      <Route path="/university" component={University} />
      <Route path="/onboarding" component={Onboarding} /> {/* Retain for SEO */}
      <Route path="/apply" component={Onboarding} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={ArticleDetail} />
      <Route path="/pricing" component={ServiceTiers} />
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
      <Route path="/data-protection" component={DataProtection} />
      <Route path="/account-security" component={AccountSecurity} />
      <Route path="/2257-compliance" component={Compliance2257} />
      <Route path="/compliance-documentation" component={ComplianceDocumentation} />
      <Route path="/compliance-resources" component={ComplianceResources} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <HelmetProvider>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
          </TooltipProvider>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
