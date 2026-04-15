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
      const carousel = sectionRef.current.querySelector('.carousel-container')
      
      gsap.fromTo(carousel,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      <div className="carousel-container relative mx-auto mt-14 h-[240px] w-full max-w-5xl overflow-hidden py-4 md:overflow-visible">
        {testimonials.map((item, idx) => {
          const diff = (idx - active + testimonials.length) % testimonials.length;
          let state = 'hidden';
          
          if (diff === 0) state = 'center';
          else if (diff === 1) state = 'right';
          else if (diff === testimonials.length - 1) state = 'left';

          let styles = "";
          let bgStyles = "";
          
          if (state === 'center') {
            styles = "left-[50%] -translate-x-1/2 z-20 scale-100 opacity-100 shadow-glow blur-0 pointer-events-auto";
            bgStyles = "bg-white/10 border-accent/50";
          } else if (state === 'left') {
            styles = "left-[0%] md:left-[22%] -translate-x-1/2 z-10 scale-[0.80] opacity-40 hover:opacity-75 blur-[1px] cursor-pointer pointer-events-auto";
            bgStyles = "bg-white/5 border-white/10";
          } else if (state === 'right') {
            styles = "left-[100%] md:left-[78%] -translate-x-1/2 z-10 scale-[0.80] opacity-40 hover:opacity-75 blur-[1px] cursor-pointer pointer-events-auto";
            bgStyles = "bg-white/5 border-white/10";
          } else {
            styles = "left-[50%] -translate-x-1/2 z-0 scale-[0.6] opacity-0 blur-sm pointer-events-none";
            bgStyles = "bg-white/5 border-white/10";
          }

          return (
            <article
              key={item.company}
              onClick={() => setActive(idx)}
              className={`testimonial-card absolute top-4 w-[280px] md:w-[340px] rounded-2xl border p-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${bgStyles} ${styles}`}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {item.company}
              </p>
              <p className="text-sm leading-relaxed text-white/90">{item.quote}</p>
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