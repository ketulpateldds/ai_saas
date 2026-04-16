import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

  useGSAP(
    () => {
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".benefit-section",
          start: "top 70%",
        },
      });

      revealTl
        .from(".benefit-heading", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .from(
          ".benefit-card",
          {
            y: 24,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="benefit-section bg-milk overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 pt-20 md:pt-24">
        <h2 className="benefit-heading text-dark-brown text-2xl md:text-4xl font-bold tracking-tight">
          The Advantage For your Estate Agency
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {advantages.map((advantage) => (
            <article
              key={advantage.title}
              className="benefit-card rounded-xl border border-[#dfd8d2] bg-[#f8f4f1] p-6"
            >
              <h3 className="text-dark-brown text-2xl md:text-3xl font-bold leading-[1.05] tracking-tight">
                {advantage.title}
              </h3>
              <p className="font-paragraph text-dark-brown/80 text-lg mt-4 leading-[1.25]">
                {advantage.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative mt-8 md:mt-12">
        <VideoPinSection />
      </div>
    </section>
  );
}

export default BenefitsSection;