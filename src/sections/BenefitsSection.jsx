import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import VideoPinSection from "../components/VideoPinSection";

const advantages = [
  {
    title: "More Bookings Without More Calls",
    description:
      "Capture more opportunities and convert inquiries, without increasing workload.",
  },
  {
    title: "No Missed Opportunities",
    description:
      "Every call answered, every inquiry captured, every follow-up clear.",
  },
  {
    title: "Stronger Performance Across Your Team",
    description:
      "Understand what good looks like and improve how every call is handled.",
  },
  {
    title: "Less Admin, More Time To Focus On Clients",
    description:
      "Notes, summaries and updates handled automatically, with no manual work needed.",
  },
  {
    title: "Decisions Backed By Real Insight",
    description:
      "See what's working, fix what's not, and move your agency forward with confidence.",
  },
  {
    title: "More Professional, Consistent Client Experience",
    description:
      "Every call is handled clearly and consistently, building trust, improving satisfaction and strengthening your brand.",
  },
];

function BenefitsSection() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(
    () => {
      if (!horizontalRef.current || !trackRef.current) return;

      const scrollAmount = trackRef.current.scrollWidth - window.innerWidth;
      const travel = Math.max(scrollAmount + 400, 800);

      // Pin ONLY the horizontal portion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: `+=${travel}px`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".benefit-track",
        { x: 0 },
        {
          x: -scrollAmount,
          ease: "none",
        },
      );

      // Heading Reveal (relative to the section entering)
      gsap.from(".benefit-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top 80%",
        },
      });

      // Individual Card Entry
      gsap.fromTo(
        ".benefit-card",
        {
          opacity: 0,
          clipPath: "inset(0% 100% 0% 0%)",
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          stagger: 0.1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top center",
          },
        },
      );

      // Mouse tracking
      const handleMouseMove = (e) => {
        const cards = cardsRef.current;
        if (!cards) return;

        cards.forEach((card) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );

  return (
    <section ref={sectionRef} className="benefit-section bg-milk">
      {/* Horizontal Slider Area (Pinned) */}
      <div
        ref={horizontalRef}
        className="h-screen w-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="px-5 md:px-[10vw] mb-12">
          <h2 className="benefit-heading text-dark-brown text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-2">
            The Advantage
          </h2>
          <p className="benefit-heading font-paragraph text-dark-brown/60 text-lg md:text-2xl opacity-80 translate-y-[-10px]">
            For your Estate Agency
          </p>
        </div>

        <div ref={trackRef} className="benefit-track">
          {advantages.map((advantage, index) => (
            <article
              key={advantage.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="benefit-card flex flex-col justify-between min-h-[340px]"
            >
              <div className="relative z-10">
                <h3 className="text-dark-brown text-2xl md:text-[2rem] font-bold leading-[1] tracking-tight mb-5 uppercase">
                  {advantage.title}
                </h3>
                <p className="font-paragraph text-dark-brown/70 text-base md:text-xl leading-[1.35] font-medium">
                  {advantage.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-6 flex justify-between items-end opacity-40">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em]">
                  Advantage {index + 1}
                </span>
                <div className="size-1.5 bg-dark-brown rounded-full" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative">
        <VideoPinSection />
      </div>
    </section>
  );
}

export default BenefitsSection;