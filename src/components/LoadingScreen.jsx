import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate dots in sequence
      dotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          y: -20,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.1 * i,
          repeat: 1,
          yoyo: true,
        })
      })

      // Pulse the center ring
      gsap.to('.loader-ring', {
        scale: 1.3,
        opacity: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
        repeat: 3,
        yoyo: true,
      })

      // Rotate the ring
      gsap.to('.loader-ring', {
        rotation: 180,
        duration: 2,
        ease: 'none',
        repeat: 1,
      })

      // Fade out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 2.5,
        onComplete: () => {
          setIsVisible(false)
          onComplete()
        }
      })
    })

    return () => ctx.revert()
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div 
      ref={containerRef}
      className="loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
    >
      {/* Main loading animation */}
      <div className="loader-ring relative h-24 w-24 rounded-full border-2 border-transparent border-t-accent" />
      
      {/* Floating dots */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={el => dotsRef.current[i] = el}
            className="h-2 w-2 rounded-full bg-accent opacity-0"
          />
        ))}
      </div>

      {/* Loading text */}
      <p className="absolute bottom-1/3 mt-16 text-sm font-medium uppercase tracking-[0.4em] text-accent">
        <span className="animate-pulse">Loading</span>
      </p>

      {/* Corner accents */}
      <div className="loader-corner absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-accent/50" />
      <div className="loader-corner absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-accent/50" />
      <div className="loader-corner absolute bottom-8 left-8 h-16 w-16 border-l-2 border-b-2 border-accent/50" />
      <div className="loader-corner absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-accent/50" />
    </div>
  )
}

export default LoadingScreen