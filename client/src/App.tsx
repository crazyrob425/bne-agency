import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServiceTiers from "./pages/ServiceTiers";
import NicheMatcher from "./pages/NicheMatcher";
import CreatorTools from "./pages/CreatorTools";
import ComplianceVault from "./pages/ComplianceVault";
import Onboarding from "./pages/Onboarding";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tiers" component={ServiceTiers} />
      <Route path="/niche-matcher" component={NicheMatcher} />
      <Route path="/creator-tools" component={CreatorTools} />
      <Route path="/compliance" component={ComplianceVault} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={ArticleDetail} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
