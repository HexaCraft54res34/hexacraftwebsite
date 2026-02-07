import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WhatWeDoPage from "./pages/WhatWeDoPage";
import WhoItsForPage from "./pages/WhoItsForPage";
import MinecraftPlansPage from "./pages/MinecraftPlansPage";
import PlanCalculatorPage from "./pages/PlanCalculatorPage";
import PterodactylFeaturesPage from "./pages/PterodactylFeaturesPage";
import DDoSProtectionPage from "./pages/DDoSProtectionPage";
import FAQPage from "./pages/FAQPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ContactPage from "./pages/ContactPage";
import VPSPlansPage from "./pages/VPSPlansPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/who-its-for" element={<WhoItsForPage />} />
          <Route path="/plans" element={<MinecraftPlansPage />} />
          <Route path="/vps" element={<VPSPlansPage />} />
          <Route path="/calculator" element={<PlanCalculatorPage />} />
          <Route path="/pterodactyl" element={<PterodactylFeaturesPage />} />
          <Route path="/ddos-protection" element={<DDoSProtectionPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground relative">
        <div className="noise-overlay" />
        <ScrollToTop />
        <Navbar />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
