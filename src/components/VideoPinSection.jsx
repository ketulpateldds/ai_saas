import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

function VideoPinSection() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".vd-pin-section",
        start: "0% top",
        end: "150% top",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(".video-box", {
      clipPath: "circle(100% at 50% 50%)",
      ease: "power1.inOut",
    }).to(
      ".abs-center",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "<",
    );
  }, [isMobile]);

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(6% at 50% 50%)",
        }}
        className="size-full video-box relative overflow-hidden"
      >
        <video src="/videos/showcase.mp4" playsInline muted loop autoPlay />

        <div className="abs-center flex-center md:scale-100 scale-200">
          {/* Spinning Outer Ring */}
          <img
            src="/images/circle-text.svg"
            alt=""
            className="spin-circle size-[15vw]"
          />

          {/* Play Button - Now uses flex to center icon naturally */}
          <div className="absolute inset-0 flex-center">
            <div className="play-btn">
              <img src="/images/play.svg" alt="" className="size-[3vw]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoPinSection;
