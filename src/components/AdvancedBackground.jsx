import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AdvancedBackground() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseRef.current.x = (e.clientX / innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    const ctx = gsap.context(() => {
      const blobs = container.querySelectorAll('.floating-blob')
      const waves = container.querySelectorAll('.wave')
      const particles = container.querySelectorAll('.drift-particle')
      const lines = container.querySelectorAll('.flow-line')
      const scrollLayers = container.querySelectorAll('.scroll-layer')

      // Parallax fluid scroll
      scrollLayers.forEach((layer, i) => {
        gsap.to(layer, {
          y: -150 - (i * 200),
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        })
      })

      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: 'random(-120, 120)',
          y: 'random(-80, 80)',
          scale: 'random(0.8, 1.4)',
          rotation: 'random(-270, 270)',
          duration: 'random(18, 30)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 'random(0, 5)',
        })
      })

      waves.forEach((wave) => {
        gsap.to(wave, {
          x: 'random(-100, 100)',
          y: 'random(-60, 60)',
          scale: 'random(1.1, 1.8)',
          duration: 'random(12, 22)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 'random(0, 4)',
        })
      })

      particles.forEach((particle) => {
        const duration = 8 + Math.random() * 12
        gsap.to(particle, {
          y: -200 - Math.random() * 300,
          x: 'random(-100, 100)',
          opacity: 0,
          duration: duration,
          repeat: -1,
          ease: 'power1.out',
          delay: Math.random() * 5,
        })
      })

      lines.forEach((line) => {
        gsap.to(line, {
          x: 'random(-200, 200)',
          y: 'random(-150, 150)',
          duration: 'random(15, 25)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 'random(0, 6)',
        })
      })
    }, container)

    let rafId
    
    const tick = () => {
      const blobsOuter = container.querySelectorAll('.blob-outer')
      const glows = container.querySelectorAll('.glow.orb')
      
      blobsOuter.forEach((el, i) => {
        const depth = (i + 1) * 0.08
        const targetX = mouseRef.current.x * 100 * depth
        const targetY = mouseRef.current.y * 60 * depth
        
        gsap.to(el, {
          x: targetX,
          y: targetY,
          duration: 2,
          ease: 'power2.out',
        })
      })

      glows.forEach((el, i) => {
        const depth = (i + 1) * 0.05
        gsap.to(el, {
          x: mouseRef.current.x * 50 * depth,
          y: mouseRef.current.y * 30 * depth,
          duration: 1.5,
          ease: 'power2.out',
        })
      })
      
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#000000]"
      style={{ zIndex: -1 }}
    >
      <div className="noise-overlay absolute inset-0 opacity-[0.12]" />
      
      {/* High-end SVG fluid displacement filter to mimic WebGL shaders natively */}
      <svg className="hidden">
        <filter id="liquid-glass">
          <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.004; 0.008; 0.004" dur="25s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="160" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="absolute inset-0 z-0" style={{ filter: "url('#liquid-glass')" }}>
        <div className="scroll-layer absolute inset-0">
          <div className="blob-outer absolute inset-0">
            <div className="floating-blob absolute left-[5%] top-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#39FF14]/10 to-transparent blur-[180px]" />
            <div className="floating-blob absolute right-[0%] top-[40%] h-[900px] w-[900px] rounded-full bg-gradient-to-bl from-[#39FF14]/7 to-transparent blur-[200px]" />
            <div className="floating-blob absolute left-[30%] top-[70%] h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-[#32CD32]/10 to-transparent blur-[160px]" />
          </div>
        </div>
        
        <div className="scroll-layer absolute inset-0">
          <div className="blob-outer absolute inset-0">
            <div className="wave absolute right-[15%] top-[15%] h-[500px] w-[600px] rounded-full bg-gradient-to-br from-[#39FF14]/20 to-transparent blur-[140px]" />
            <div className="wave absolute left-[5%] bottom-[20%] h-[550px] w-[650px] rounded-full bg-gradient-to-tr from-[#98FB98]/15 to-transparent blur-[150px]" />
            <div className="wave absolute right-[40%] bottom-[35%] h-[400px] w-[450px] rounded-full bg-gradient-to-bl from-[#00FF00]/10 to-transparent blur-[100px]" />
          </div>
        </div>
        
        <div className="scroll-layer absolute inset-0">
          <div className="blob-outer absolute inset-0">
            <div className="floating-blob absolute left-[50%] top-[25%] h-[300px] w-[350px] rounded-full bg-gradient-to-br from-[#39FF14]/10 to-transparent blur-[80px]" />
            <div className="floating-blob absolute right-[50%] bottom-[15%] h-[280px] w-[320px] rounded-full bg-gradient-to-tl from-[#90EE90]/10 to-transparent blur-[75px]" />
            <div className="floating-blob absolute left-[10%] top-[60%] h-[250px] w-[300px] rounded-full bg-gradient-to-br from-[#228B22]/10 to-transparent blur-[70px]" />
            <div className="floating-blob absolute right-[10%] top-[80%] h-[200px] w-[250px] rounded-full bg-gradient-to-bl from-[#39FF14]/10 to-transparent blur-[60px]" />
          </div>
        </div>
      </div>

      <div className="scroll-layer absolute inset-0">
        <div className="blob-outer absolute inset-0">
          <div className="glow orb absolute left-[20%] top-[30%] h-[150px] w-[180px] rounded-full bg-[#39FF14]/25 blur-[50px]" />
          <div className="glow orb absolute right-[25%] top-[50%] h-[120px] w-[150px] rounded-full bg-[#98FB98]/20 blur-[40px]" />
          <div className="glow orb absolute left-[60%] bottom-[25%] h-[100px] w-[130px] rounded-full bg-[#32CD32]/20 blur-[35px]" />
          <div className="glow orb absolute right-[70%] top-[20%] h-[80px] w-[100px] rounded-full bg-[#39FF14]/15 blur-[30px]" />
        </div>
      </div>

      <div className="scroll-layer absolute inset-0 z-10">
        <div className="blob-outer absolute inset-0">
          <div className="drift-particle absolute bottom-0 left-[5%] w-[4px] h-[4px] rounded-full bg-[#39FF14]/50" />
          <div className="drift-particle absolute bottom-0 left-[12%] w-[3px] h-[3px] rounded-full bg-[#39FF14]/40" />
          <div className="drift-particle absolute bottom-0 left-[20%] w-[5px] h-[5px] rounded-full bg-[#39FF14]/60" />
          <div className="drift-particle absolute bottom-0 left-[28%] w-[2px] h-[2px] rounded-full bg-[#39FF14]/35" />
          <div className="drift-particle absolute bottom-0 left-[35%] w-[4px] h-[4px] rounded-full bg-[#39FF14]/45" />
          <div className="drift-particle absolute bottom-0 left-[42%] w-[3px] h-[3px] rounded-full bg-[#39FF14]/55" />
          <div className="drift-particle absolute bottom-0 left-[50%] w-[2px] h-[2px] rounded-full bg-[#39FF14]/30" />
          <div className="drift-particle absolute bottom-0 left-[58%] w-[5px] h-[5px] rounded-full bg-[#39FF14]/50" />
          <div className="drift-particle absolute bottom-0 left-[65%] w-[3px] h-[3px] rounded-full bg-[#39FF14]/40" />
          <div className="drift-particle absolute bottom-0 left-[72%] w-[4px] h-[4px] rounded-full bg-[#39FF14]/55" />
          <div className="drift-particle absolute bottom-0 left-[80%] w-[2px] h-[2px] rounded-full bg-[#39FF14]/35" />
          <div className="drift-particle absolute bottom-0 left-[88%] w-[3px] h-[3px] rounded-full bg-[#39FF14]/45" />
          <div className="drift-particle absolute bottom-0 left-[95%] w-[4px] h-[4px] rounded-full bg-[#39FF14]/50" />
        </div>
      </div>

      <div className="scroll-layer absolute inset-0 z-0">
        <div className="blob-outer absolute inset-0">
          <div className="flow-line absolute left-[8%] top-[45%] h-[1px] w-[300px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />
          <div className="flow-line absolute left-[25%] top-[60%] h-[1px] w-[400px] bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
          <div className="flow-line absolute left-[55%] top-[35%] h-[1px] w-[350px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />
          <div className="flow-line absolute left-[70%] top-[75%] h-[1px] w-[250px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]/80" />
      
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(57,255,20,0.4) 0.6px, transparent 0.6px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-radial-from-center opacity-[0.06]" />
    </div>
  )
}

export default AdvancedBackground