import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Capture',
    description: 'Every call, inquiry and follow-up is instantly structured.',
  },
  {
    number: '02',
    title: 'Analyze',
    description:
      'AI identifies trends, risk areas and opportunities that matter now.',
  },
  {
    number: '03',
    title: 'Coach',
    description:
      'Leaders and teams act on clear actions with confidence and speed.',
  },
]

function ProcessSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const line = sectionRef.current.querySelector('.process-line')
      const stepCards = sectionRef.current.querySelectorAll('.process-step')

      // Animate line first
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.15,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      // Animate steps
      gsap.fromTo(stepCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.22,
          ease: 'power3.out',
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
      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        <div className="process-line pointer-events-none absolute left-0 top-10 hidden h-[2px] w-full origin-left bg-gradient-to-r from-accent via-[#8b5cf6] to-transparent md:block" />
        {steps.map((step) => (
          <article
            key={step.number}
            className="process-step group rounded-2xl border border-white/10 bg-card/60 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-glow"
          >
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent">
              {step.number}
            </p>
            <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors">
              {step.title}
            </h3>
            <p className="mt-3 text-soft">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProcessSection