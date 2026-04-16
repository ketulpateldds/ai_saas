import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const featureCards = [
  {
    title: "Main Intelligence Dashboard",
    description:
      "See your call performance clearly, with a complete view across your agency, all in one central dashboard.",
    image: "/images/feature-intelligence.webp",
    bg: "/images/brown-bg.svg",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    title: "AI Analytics Dashboard",
    description:
      "Understand what your calls are telling you. AI turns conversations into insights, making trends and opportunities instantly visible.",
    image: "/images/feature-analytics.webp",
    bg: "/images/red-bg.svg",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    title: "Leaderboards",
    description:
      "See the top performers across your agency and compare teams, branches, and individuals to identify who is leading.",
    image: "/images/feature-coaching.webp",
    bg: "/images/blue-bg.svg",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    title: "Coaching Dashboard",
    description:
      "Improve how every call is handled. Understand what good looks like and where your team can improve.",
    image: "/images/feature-intelligence.webp",
    bg: "/images/orange-bg.svg",
    rotation: "md:rotate-[8deg] rotate-0",
  },
];

function FlavorSlider() {
  const sliderRef = useRef(null);
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;
    const travel = Math.max(scrollAmount + 900, 1200);

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".features-section",
          start: "2% top",
          end: `+=${travel}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".feature-track", {
        x: `-${travel}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".features-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<",
      );
  }, [isTablet]);

  return (
    <div ref={sliderRef} className="slider-wrapper h-full">
      <div className="flavors px-5 md:px-8 lg:px-12">
        {featureCards.map((card) => (
          <div
            key={card.title}
            className={`relative z-30 lg:w-[46vw] w-[22rem] lg:h-[66vh] md:w-[86vw] md:h-[52vh] h-[28rem] flex-none rounded-[2rem] overflow-hidden ${card.rotation}`}
          >
            <img
              src={card.bg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-95"
            />

            <img
              src={card.image}
              alt={card.title}
              className="absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-4 h-[52%] md:h-[62%] w-auto object-contain z-10"
            />

            <div className="absolute top-6 md:top-8 left-6 md:left-8 right-6 max-w-md space-y-3 z-20">
              <h3 className="text-2xl md:text-[2.1rem] font-bold uppercase text-milk tracking-tight leading-[0.95]">
                {card.title}
              </h3>
              <p className="font-paragraph text-milk/85 text-sm md:text-lg leading-tight">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlavorSlider;
