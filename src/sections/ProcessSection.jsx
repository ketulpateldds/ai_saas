import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Capture",
    description: "Every call, inquiry and follow-up is instantly structured.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "AI identifies trends, risk areas and opportunities that matter now.",
  },
  {
    number: "03",
    title: "Coach",
    description:
      "Leaders and teams act on clear actions with confidence and speed.",
  },
];

function ProcessSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let resizeHandler;

    const ctx = gsap.context(() => {
      const linePath = document.getElementById("process-curve");
      const bgPath = document.getElementById("process-curve-bg");
      const container = sectionRef.current.querySelector(".process-wrapper");
      const svgArea = container?.querySelector(".svg-container");

      if (!linePath || !bgPath || !container || !svgArea) return;

      const updatePath = () => {
        const dots = container.querySelectorAll(".timeline-step .rounded-full");
        if (dots.length === 0) return;

        const svgRect = svgArea.getBoundingClientRect();

        const pts = Array.from(dots).map((dot) => {
          const rect = dot.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - svgRect.left,
            y: Math.max(0, rect.top + rect.height / 2 - svgRect.top),
          };
        });

        const startX = svgRect.width / 2;
        let d = `M${startX},0`;

        let prevPt = { x: startX, y: 0 };
        pts.forEach((pt) => {
          const cpY = prevPt.y + (pt.y - prevPt.y) / 2;
          d += ` C${prevPt.x},${cpY} ${pt.x},${cpY} ${pt.x},${pt.y}`;
          prevPt = pt;
        });

        const endY = svgRect.height;
        const cpY2 = prevPt.y + (endY - prevPt.y) / 2;
        d += ` C${prevPt.x},${cpY2} ${startX},${cpY2} ${startX},${endY}`;

        bgPath.setAttribute("d", d);
        linePath.setAttribute("d", d);

        const totalLength = linePath.getTotalLength();
        gsap.set(linePath, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });
      };

      updatePath();

      resizeHandler = () => {
        updatePath();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", resizeHandler);

      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each step coming into view
      const stepElements =
        sectionRef.current.querySelectorAll(".timeline-step");
      stepElements.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0.6, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Dynamic path generation handled in layout effect now

  return (
    <section
      ref={sectionRef}
      className="process-section relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-10"
    >
      <SectionHeading
        eyebrow="Set Up Around Your Agency"
        title="Three steps to launch a high-performing AI operation"
        description="Designed to slot into your current workflow without disrupting daily momentum."
      />

      {/* Wrapper for scroll trigger */}
      <div className="process-wrapper relative mt-20">
        {/* Curved SVG Line */}
        <svg
          className="svg-container pointer-events-none absolute left-0 top-0 h-full w-full"
          style={{
            zIndex: 0,
          }}
        >
          <defs>
            <linearGradient
              id="curveGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#39FF14" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#39FF14" />
            </linearGradient>
          </defs>

          {/* Background line */}
          <path
            id="process-curve-bg"
            fill="none"
            stroke="rgba(57,255,20,0.2)"
            strokeWidth="4"
          />

          {/* Animated progress line */}
          <path
            id="process-curve"
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Steps container */}
        <div className="relative">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`timeline-step relative flex items-center py-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row md:justify-end"
              }`}
            >
              {/* Left card */}
              <div
                className={`w-full md:w-[42%] ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "hidden"
                }`}
              >
                <div className="step-card inline-block rounded-2xl border border-white/10 bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:border-accent/40">
                  <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-accent">
                    Step {step.number}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-soft">{step.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="relative z-10 mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-accent bg-[#0a0a0a] text-accent font-bold md:mx-0">
                {step.number}
              </div>

              {/* Right card */}
              <div
                className={`w-full md:w-[42%] ${
                  index % 2 !== 0 ? "md:pl-16 md:text-left" : "hidden"
                }`}
              >
                <div className="step-card inline-block rounded-2xl border border-white/10 bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:border-accent/40">
                  <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-accent">
                    Step {step.number}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-soft">{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
