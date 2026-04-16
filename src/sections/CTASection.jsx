import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function CTASection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from(".cta-title", {
       y: 100,
       opacity: 0,
       duration: 1,
       ease: "power2.out",
       scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          end: "top 50%",
          scrub: true
       }
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="cta-section bg-milk py-32 px-10 flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-4xl space-y-12">
        <h2 className="cta-title text-4xl md:text-[7vw] font-bold uppercase leading-[1] text-dark-brown tracking-tighter">
          Ready to make every call smarter?
        </h2>
        
        <p className="mx-auto max-w-2xl text-xl md:text-2xl font-paragraph text-dark-brown/70 leading-relaxed">
          Launch fast, coach better, and grow revenue with a platform designed 
          specifically for modern, high-performing estate agencies.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
           <button className="bg-light-brown text-dark-brown px-10 py-5 rounded-full text-xl font-bold uppercase hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Free Trial <span>→</span>
           </button>
           <button className="border-2 border-dark-brown text-dark-brown px-10 py-5 rounded-full text-xl font-bold uppercase hover:bg-dark-brown hover:text-milk transition-all">
              Book a Live Demo
           </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection