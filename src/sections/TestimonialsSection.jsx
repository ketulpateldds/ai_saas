import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const testimonials = [
  {
    company: "THE STOW BROTHERS",
    quote:
      "“The new software is so smart and feels like we are so much more advanced now.”",
    stars: 5,
  },
  {
    company: "GREY & CO",
    quote:
      "“Super innovative with AI integration and tracking details effortlessly, making it a game changer when it comes to the details of previous calls.”",
    stars: 5,
  },
  {
    company: "HUNTERS",
    quote:
      "“Callers files & property history pop-up straight away. We’ve reduced missed follow-ups & all summaries make notes effortless.”",
    stars: 5,
  },
  {
    company: "Quote",
    quote: "",
    stars: 0,
  },
];

function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.set(".testimonials-section", { marginTop: "-140vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: " top bottom",
          end: "100% top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", { xPercent: 70 })
        .to(".testimonials-section .sec-title", { xPercent: 25 }, "<")
        .to(".testimonials-section .third-title", { xPercent: -50 }, "<");

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      pinTl
        .from(
          ".vd-card",
          {
            x: -window.innerWidth,
            y: window.innerHeight,
            rotate: -60,
            opacity: 0,
            stagger: 0.3,
            duration: 1.5,
            ease: "power3.out",
          },
          0,
        )
        .to(
          ".vd-card",
          {
            y: (i) => i * -70, // Slightly more vertical stagger for readability
            x: (i) => i * 40, // More horizontal drift to spread across the viewport
            rotate: (i) => (i % 2 === 0 ? -6 + i : 4 - i), // Subtle, more natural rotation
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=1",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="testimonials-section bg-milk relative w-full h-[120dvh] overflow-hidden"
    >
      <div className="absolute size-full flex flex-col items-center pt-[5vw] pointer-events-none">
        <h1 className="text-black first-title">What</h1>
        <h1 className="text-light-brown sec-title">Estate Agencies</h1>
        <h1 className="text-black third-title">Are Saying</h1>
      </div>

      <div className="pin-box">
        {testimonials.map((t, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={t.company + index}
              className={`vd-card ${isActive ? "opacity-100" : "opacity-80"}`}
              style={{
                zIndex: isActive ? 999 : index + 10,
                borderRadius: "12px",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(0)}
            >
              <div
                className="h-full w-full bg-white text-[#222123] p-6 md:p-8 flex flex-col justify-between shadow-2xl border border-[#dfd8d2]"
                style={{ borderRadius: "24px" }}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-5">
                    <div className="flex justify-between items-start">
                      <p className="text-[1rem] md:text-lg font-bold uppercase tracking-tight text-dark-brown leading-none">
                        {t.company}
                      </p>
                      {t.stars > 0 && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.stars }).map((_, i) => (
                            <span
                              key={i}
                              className="text-[#e3a458] text-[1.1rem]"
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {t.quote ? (
                      <p className="text-[1.1rem] md:text-[1.4rem] font-paragraph font-medium leading-[1.3] text-dark-brown opacity-90 italic">
                        {t.quote}
                      </p>
                    ) : (
                      <div className="h-10" />
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#dfd8d2]/30 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-dark-brown/40">
                      Verified Review
                    </span>
                    <div className="size-8 rounded-full bg-light-brown/10 flex items-center justify-center">
                      <div className="size-2 rounded-full bg-light-brown" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TestimonialsSection;
