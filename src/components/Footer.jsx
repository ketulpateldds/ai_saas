import { Globe, Mail, MessageCircle, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer-section relative z-10 mt-16 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">
            AI AGENCY PLATFORM
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Built for high-performing teams.
          </h3>
          <p className="mt-3 max-w-md text-soft">
            Unified call intelligence, analytics and coaching in one smooth
            operating system.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[Globe, Mail, MessageCircle, Phone].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="rounded-full border border-white/15 bg-white/5 p-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
