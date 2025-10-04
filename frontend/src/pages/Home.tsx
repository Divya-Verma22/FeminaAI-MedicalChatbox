import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FocusAreasSection from "@/components/FocusAreasSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustSection from "@/components/TrustSection";
import ChatPreview from "@/components/ChatPreview";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when Home mounts
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FocusAreasSection />
        <HowItWorksSection />
        <TrustSection />
        <ChatPreview />
        <FaqSection /> {/* ✅ Added FAQ section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
