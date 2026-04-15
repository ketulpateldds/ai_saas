import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'
import {
  CalendarCheck2,
  Crosshair,
  LineChart,
  ClipboardCheck,
  BrainCircuit,
  Sparkles,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  { title: 'More Bookings Without More Calls', icon: CalendarCheck2 },
  { title: 'No Missed Opportunities', icon: Crosshair },
  { title: 'Stronger Performance Across Your Team', icon: LineChart },
  { title: 'Less Admin, More Client Focus', icon: ClipboardCheck },
  { title: 'Decisions Backed By Real Insight', icon: BrainCircuit },
  { title: 'Professional Client Experience', icon: Sparkles },
]

function BenefitsSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.benefit-card')

      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const icons = sectionRef.current.querySelectorAll('.benefit-icon')
      gsap.fromTo(icons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
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
      className="benefits-section relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-10"
    >
      <SectionHeading
        eyebrow="The Advantage For Your Estate Agency"
        title="Every team action becomes measurable, repeatable and coachable"
        description="Six practical outcomes that compound week over week as your agency scales."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {benefits.map((item) => (
          <article
            key={item.title}
            className="benefit-card interactive-card rounded-2xl border border-white/10 bg-card/60 p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
          >
            <div className="benefit-icon mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
              <item.icon size={20} strokeWidth={2.2} />
            </div>
            <h3 className="benefit-title text-2xl font-semibold leading-tight text-white">
              {item.title}
            </h3>
            <p className="benefit-copy mt-3 text-soft">
              Capture opportunities, reduce friction and align the whole team
              around clear performance signals.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSection