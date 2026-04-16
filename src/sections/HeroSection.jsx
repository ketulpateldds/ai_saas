import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const containerRef = useRef();

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(
    () => {
      // Staggered Title Animation
      const titleSplit = new SplitText(".hero-title", {
        type: "chars, words",
      });

      const tl = gsap.timeline({
        delay: 0.5,
      });

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          ".hero-text-scroll",
          {
            duration: 1.2,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          "-=0.6",
        )
        .from(
          titleSplit.chars,
          {
            yPercent: 120,
            stagger: 0.02,
            ease: "back.out(1.7)",
            duration: 0.8,
          },
          "-=0.8",
        );

      // Zoom/Shrink Effect on Scroll
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "1% top",
          end: "bottom top",
          scrub: true,
        },
      });

      heroTl.to(".hero-container", {
        rotate: 5,
        scale: 0.85,
        yPercent: 20,
        borderRadius: "4rem",
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-black">
      <div className="hero-container relative h-screen w-full overflow-hidden bg-milk">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-milk/20 via-transparent to-milk/40" />
        </div>

        {/* Animated Content */}
        <div className="hero-content relative z-20 flex h-full w-full flex-col items-center justify-center opacity-0 translate-y-20 px-6 pt-20">
          <div className="overflow-hidden mb-4">
            <h1 className="hero-title text-dark-brown text-center uppercase font-bold leading-[0.9] tracking-tighter text-[12vw] lg:text-[8.5rem]">
              See Full Picture
            </h1>
          </div>

          <div
            className="hero-text-scroll rotate-[-2deg] mb-10 border-[0.5vw] border-milk overflow-hidden"
            style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
          >
            <div className="hero-subtitle bg-mid-brown px-8 py-4">
              <h1 className="uppercase font-bold text-milk text-[4vw] lg:text-[2.5rem] tracking-tight leading-none">
                AI Intelligence & Growth
              </h1>
            </div>
          </div>

          <h2 className="max-w-2xl text-center font-paragraph text-dark-brown text-lg lg:text-2xl leading-relaxed opacity-80 mb-12">
            Track inquiries, bookings and revenue in one place. Turn every call
            into actionable growth with AI-powered coaching and analytics.
          </h2>

          <div className="hero-button">
            <p className="font-bold">Start Your Free Trial</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
