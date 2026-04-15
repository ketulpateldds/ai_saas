import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react'

function HeroSection() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.hero-title', {
        y: 64,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.4,
      })

      gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      })

      gsap.from('.hero-cta', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8,
      })

      gsap.from('.hero-image', {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.5,
      })

      gsap.to('.hero-image-wrap', {
        yPercent: -3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-blob-1', {
        y: -30,
        x: 40,
        scale: 1.2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-blob-2', {
        y: 25,
        x: -35,
        scale: 1.1,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const image = imageRef.current
    if (!image) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      const moveX = (clientX - centerX) / centerX * 15
      const moveY = (clientY - centerY) / centerY * 10

      gsap.to(image, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const dashboardStats = [
    { label: 'Revenue', value: '+18.4%', icon: TrendingUp },
    { label: 'Bookings', value: '+12.7%', icon: BarChart3 },
    { label: 'Opportunities', value: '+24.3%', icon: Users },
    { label: 'Coaching', value: '+9.8%', icon: Zap },
  ]

  return (
    <section
      ref={sectionRef}
      className="hero-section relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 pb-24 pt-36 md:grid-cols-2 md:px-10"
    >
      <div>
        <p className="hero-eyebrow mb-4 text-sm font-medium uppercase tracking-[0.24em] text-accent">
          Across Every Call
        </p>
        <h1 className="hero-title text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
          See the full picture.
          <br />
          Turn insight into growth.
        </h1>
        <p className="hero-subtitle mt-6 max-w-xl text-base text-soft md:text-lg">
          Track calls, inquiries, bookings and revenue in one place, with
          AI-powered insights, analytics, leaderboards and coaching that feel
          instant and actionable.
        </p>
        <button className="hero-cta interactive-button mt-10 rounded-full border border-accent/30 bg-accent px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-accent/90 md:text-base">
          Start Free Trial
        </button>
      </div>

      <div ref={imageRef} className="hero-image-wrap relative">
        <div className="hero-blob-1 pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="hero-blob-2 pointer-events-none absolute -bottom-10 -right-10 h-[250px] w-[250px] rounded-full bg-accent-light/10 blur-[80px]" />
        
        {/* Main Dashboard Card */}
        <div className="hero-image relative rounded-3xl border border-white/10 bg-card shadow-glow overflow-hidden">
          <div className="bg-gradient-to-br from-[#0d1117] to-[#0a0d0f] p-4 md:p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-soft">AI Intelligence Hub</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Dashboard</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="text-xs text-accent">LIVE</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {dashboardStats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-soft group-hover:text-accent">
                      {stat.label}
                    </span>
                    <stat.icon className="h-3 w-3 text-soft group-hover:text-accent" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Mini Chart Placeholder */}
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-soft">Performance Trend</p>
              <div className="flex items-end gap-1 h-16">
                {[40, 65, 45, 80, 55, 90, 70, 85, 95, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-accent/60 transition-all duration-300 group-hover:bg-accent"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-soft">Last updated: Just now</span>
              <span className="text-xs text-accent">AI Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection