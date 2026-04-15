import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdvancedBackground from "./components/AdvancedBackground";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import BenefitsSection from "./sections/BenefitsSection";
import ProcessSection from "./sections/ProcessSection";
import CTASection from "./sections/CTASection";
import useLenisScroll from "./animations/useLenisScroll";
import usePageAnimations from "./animations/usePageAnimations";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef(null);
  useLenisScroll();
  usePageAnimations(pageRef);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      {!isLoading && (
        <>
          <AdvancedBackground />
          <main
            ref={pageRef}
            className="relative overflow-hidden bg-base text-white"
          >
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <BenefitsSection />
            <ProcessSection />
            <CTASection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

export default App;
