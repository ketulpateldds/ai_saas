import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const featureCards = [
  {
    title: 'Main Intelligence Dashboard',
    description:
      'See your call performance clearly, with a complete view across your agency.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'AI Analytics Dashboard',
    description:
      'Turn conversations into trends, opportunities and decisions in real time.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Leaderboards',
    description:
      'Compare teams, branches and individuals to identify what drives wins.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Coaching Dashboard',
    description:
      'Understand what good looks like and improve every call with AI coaching.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  },
]

function FeaturesSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.feature-card')
      
      gsap.fromTo(cards, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      className="features-section relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-10"
    >
      <SectionHeading
        eyebrow="Core Features"
        title="Intelligent dashboards built for modern estate agencies"
        description="A modular command center designed to reveal exactly what is happening across calls, opportunities and team execution."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="feature-card interactive-card group rounded-2xl border border-white/10 bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
          >
            <div className="feature-card-image relative mb-5 h-36 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0d1117] to-[#0a0d0f]">
              <img 
                src={card.image} 
                alt={card.title} 
                className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal" 
              />
            </div>
            <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-accent">
              {card.title}
            </h3>
            <p className="mt-3 text-soft">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection