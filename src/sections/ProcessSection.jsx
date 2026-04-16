import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const steps = [
  {
    number: "01",
    title: "Capture",
    description: "Every call, inquiry and follow-up is instantly structured and ready for review.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "AI identifies trends, risk areas and opportunities that matter to your growth.",
  },
  {
    number: "03",
    title: "Coach",
    description:
      "Leaders and teams act on clear insights with confidence and unmatched speed.",
  },
];

function ProcessSection() {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    const stepElements = gsap.utils.toArray(".process-step");

    stepElements.forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          end: "top 60%",
          scrub: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="process-section bg-milk py-32 px-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Sticky Title */}
          <div className="lg:w-1/3 h-fit lg:sticky top-32">
             <h2 className="text-dark-brown text-sm font-bold uppercase tracking-widest mb-6 opacity-60">
                Setup Around Your Agency
             </h2>
             <h1 className="general-title text-dark-brown text-5xl md:text-7xl leading-tight">
                Three steps to scale your operation.
             </h1>
          </div>

          {/* Right Side: Process Steps */}
          <div className="lg:w-2/3 space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step flex flex-col md:flex-row gap-10 md:gap-20"
              >
                <h1 className="text-[12vw] md:text-[8rem] font-bold text-dark-brown/10 leading-none">
                   {step.number}
                </h1>
                <div className="pt-4 md:pt-10 space-y-4">
                   <h3 className="text-4xl font-bold uppercase tracking-tighter text-dark-brown">
                      {step.title}
                   </h3>
                   <p className="text-xl md:text-2xl font-paragraph text-dark-brown/70 leading-relaxed max-w-lg">
                      {step.description}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
