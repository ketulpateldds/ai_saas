import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const ringsRef = useRef([]);
  const dataStreamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create random data streams
      const dataContainer = dataStreamRef.current;
      if (dataContainer) {
        for (let i = 0; i < 20; i++) {
          const stream = document.createElement("div");
          stream.className =
            "absolute text-[10px] font-mono text-mid-brown/20 whitespace-nowrap pointer-events-none";
          stream.style.left = `${Math.random() * 100}%`;
          stream.style.top = `${Math.random() * 100}%`;
          stream.innerText = Math.random()
            .toString(16)
            .substring(2, 15)
            .toUpperCase();
          dataContainer.appendChild(stream);

          gsap.to(stream, {
            y: -100,
            opacity: 0,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 2,
          });
        }
      }

      // Percentage counter animation
      const countObj = { value: 0 };
      gsap.to(countObj, {
        value: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => setPercent(Math.floor(countObj.value)),
      });

      // Core rotation animations
      ringsRef.current.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 3 + i,
          repeat: -1,
          ease: "none",
        });
      });

      // Core pulsing glow
      gsap.to(".core-center", {
        scale: 1.2,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scanning line
      gsap.to(".scan-line", {
        top: "100%",
        duration: 2,
        repeat: -1,
        ease: "none",
      });

      // Transition out
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.8,
        delay: 3.5,
        ease: "power4.inOut",
        onComplete: onComplete,
      });

      // Staggered entry
      gsap.from(".loader-element", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden font-sans"
    >
      {/* Background Data Stream */}
      <div ref={dataStreamRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(162,104,51,0.15)_0%,transparent_70%)]" />

      {/* Main AI Core */}
      <div
        ref={coreRef}
        className="relative z-10 flex items-center justify-center h-80 w-80"
      >
        {/* Concentric Rings */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => (ringsRef.current[i] = el)}
            className="loader-element absolute rounded-full border border-dashed border-mid-brown/40"
            style={{
              width: `${100 - i * 20}%`,
              height: `${100 - i * 20}%`,
              borderWidth: "1px",
              borderStyle: i % 2 === 0 ? "dashed" : "solid",
            }}
          />
        ))}

        {/* The Core Center */}
        <div className="loader-element core-center flex items-center justify-center h-24 w-24 rounded-full bg-mid-brown shadow-[0_0_50px_rgba(162,104,51,0.5)]">
          <div className="h-20 w-20 rounded-full border-4 border-milk/20 flex items-center justify-center overflow-hidden">
            {/* Scanning Line */}
            <div className="scan-line absolute top-0 left-0 w-full h-[2px] bg-milk shadow-[0_0_10px_#fff]" />
            <div className="text-milk font-bold text-2xl tracking-tighter">
              AI
            </div>
          </div>
        </div>
      </div>

      {/* Loading Information */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-2">
        <div className="h-[2px] w-48 bg-mid-brown/20 overflow-hidden rounded-full">
          <div
            className="h-full bg-light-brown transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-milk/40 font-mono text-xs uppercase tracking-[0.3em]">
            Processing
          </span>
          <span className="text-light-brown font-mono text-2xl font-bold min-w-[3ch]">
            {percent}
          </span>
          <span className="text-light-brown font-mono text-sm">%</span>
        </div>
      </div>

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Corner Status Indicators */}
      <div className="absolute top-10 left-10 flex gap-4 loader-element">
        <div className="flex flex-col gap-1">
          <div className="h-1 w-8 bg-mid-brown" />
          <div className="text-[10px] text-milk/40 font-mono uppercase">
            System.status: active
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 flex gap-4 loader-element">
        <div className="flex flex-col items-end gap-1">
          <div className="text-[10px] text-milk/40 font-mono uppercase text-right">
            Enc-Layer: Secure
          </div>
          <div className="h-1 w-12 bg-red-brown/50" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
