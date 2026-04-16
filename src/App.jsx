import { useState, useLayoutEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import FeaturesSection from "./sections/FeaturesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import BenefitsSection from "./sections/BenefitsSection";
import ProcessSection from "./sections/ProcessSection";
import CTASection from "./sections/CTASection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (!isLoading) {
      ScrollSmoother.create({
        smooth: 3,
        effects: true,
      });
    }
  }, [isLoading]);

  // const handleLoadingComplete = useCallback(() => {
  //   setIsLoading(false);
  // }, []);

  return (
    <>
      {/* {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />} */}

      {!isLoading && (
        <main>
          <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <HeroSection />
              <MessageSection />
              <FeaturesSection />
              <BenefitsSection />
              <TestimonialsSection />
              <ProcessSection />
              <CTASection />
              <Footer />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
