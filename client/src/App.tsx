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
import PaymentSuccess from "./pages/PaymentSuccess";
import AllServices from "./pages/AllServices";
import MarketingAssets from "./pages/MarketingAssets";
import MediaDownloads from "./pages/MediaDownloads";
import University from "./pages/University";
import MakeMoney from "./pages/MakeMoney";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/home" component={Home} />
      <Route path="/tiers" component={ServiceTiers} />
      <Route path="/niche-matcher/:slug" component={NicheMatcher} />
      <Route path="/niche-matcher" component={NicheMatcher} />
      <Route path="/posting-and-scheduling" component={PostingAndScheduling} />
      <Route path="/creator-tools" component={CreatorTools} />
      <Route path="/compliance" component={ComplianceVault} />
      <Route path="/university" component={University} />
      <Route path="/onboarding" component={Onboarding} />
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
      <Route path="/makemoney" component={MakeMoney} />
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
