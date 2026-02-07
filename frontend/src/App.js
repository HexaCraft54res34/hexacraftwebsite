import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground relative">
        <div className="noise-overlay" />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/what-we-do" element={<WhatWeDoPage />} />
            <Route path="/who-its-for" element={<WhoItsForPage />} />
            <Route path="/plans" element={<MinecraftPlansPage />} />
            <Route path="/calculator" element={<PlanCalculatorPage />} />
            <Route path="/pterodactyl" element={<PterodactylFeaturesPage />} />
            <Route path="/ddos-protection" element={<DDoSProtectionPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
