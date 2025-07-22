import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SellYourLandPage } from './pages/SellYourLandPage';
import { FindDevelopmentSitesPage } from './pages/FindDevelopmentSitesPage';
import { InvestInLandPage } from './pages/InvestInLandPage';
import { ToolsPage } from './pages/ToolsPage';
import { ROICalculatorPage } from './pages/tools/ROICalculatorPage';
import { TimelineToolPage } from './pages/tools/TimelineToolPage';
import { Chapter42ToolPage } from './pages/tools/Chapter42ToolPage';
import { SmartLandFinderPage } from './pages/tools/SmartLandFinderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LocationPage } from './pages/LocationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { ScrollToTop } from './components/ScrollToTop';
import { SkipToContent } from './components/SkipToContent';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
          <SkipToContent />
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main id="main-content" className="flex-1">
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sell-your-land" element={<SellYourLandPage />} />
              <Route path="/find-development-sites" element={<FindDevelopmentSitesPage />} />
              <Route path="/invest-in-land" element={<InvestInLandPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/roi-calculator" element={<ROICalculatorPage />} />
              <Route path="/tools/timeline" element={<TimelineToolPage />} />
              <Route path="/tools/chapter-42" element={<Chapter42ToolPage />} />
              <Route path="/tools/smart-finder" element={<SmartLandFinderPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/locations/:city" element={<LocationPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;