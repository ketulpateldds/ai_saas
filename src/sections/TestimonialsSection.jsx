import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    company: 'The Stow Brothers',
    quote:
      'The new software is so smart and feels like we are so much more advanced now.',
  },
  {
    company: 'Grey & Co',
    quote:
      'Super innovative with AI integration and tracking back details from previous calls.',
  },
  {
    company: 'Hunters',
    quote:
      'Callers file and property history pop-up reduced missed follow-ups effortlessly.',
  },
  {
    company: 'Quote',
    quote:
      'Our teams now make faster decisions and offer a much stronger customer experience.',
  },
]

function TestimonialsSection() {
  const [active, setActive] = useState(1)
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.testimonial-card')
      
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="testimonials-section relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-10"
    >
      <SectionHeading
        eyebrow="What Estate Agencies Are Seeing"
        title="Real stories from teams already scaling with AI support"
        description="A confidence layer built from day-to-day call operations, not generic promises."
        centered
      />
      <div className="mt-14 flex justify-center gap-4">
        {testimonials.map((item, idx) => {
          const offset = Math.abs(active - idx)
          const isActive = idx === active
          
          return (
            <article
              key={item.company}
              className={`testimonial-card rounded-2xl border border-white/15 bg-white/5 p-5 transition-all duration-700 ${
                isActive
                  ? 'scale-105 bg-white/10 opacity-100 shadow-glow translate-y-0'
                  : offset === 1
                    ? 'scale-95 opacity-70 -translate-y-1'
                    : 'scale-90 opacity-45 -translate-y-2'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {item.company}
              </p>
              <p className="mt-4 text-sm text-white/90">{item.quote}</p>
            </article>
          )
        })}
      </div>
      
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === active
                ? 'w-8 bg-accent'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection