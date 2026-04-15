import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function usePageAnimations(pageRef) {
  useLayoutEffect(() => {
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.navbar', {
        y: -70,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.to('.hero-image-wrap', {
        yPercent: -3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.cta-button', {
        scale: 1.05,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.from('.footer-section', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 92%',
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [pageRef])
}

export default usePageAnimations