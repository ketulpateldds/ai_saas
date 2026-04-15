import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CTASection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.to(sectionRef.current.querySelector('.cta-button'), {
        scale: 1.05,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cta-section relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-20 md:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0d1117] via-[#0a0d0f] to-[#0d1117] p-10 text-center md:p-16">
        <div className="absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[250px] w-[250px] rounded-full bg-accent/8 blur-[100px]" />
        
        <h2 className="relative text-3xl font-semibold text-white md:text-5xl">
          Ready to make every call smarter?
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-soft">
          Launch fast, coach better, and grow revenue with a platform designed
          for high-performing agencies.
        </p>
        <button className="cta-button interactive-button relative mt-9 rounded-full border border-accent/30 bg-accent px-8 py-3 font-semibold text-black transition-all duration-300 hover:bg-accent/90 hover:scale-105">
          Book a Live Demo
        </button>
      </div>
    </section>
  )
}

export default CTASection