import { Sparkles } from 'lucide-react'

const navItems = ['Features', 'Intelligence', 'Pricing', 'Resources']

function Navbar() {
  return (
    <header className="navbar fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-b-2xl border-x border-b border-white/10 bg-[#070a14]/80 px-6 py-4 backdrop-blur-xl md:px-10">
        <a href="/" className="flex items-center gap-2 text-white">
          <span className="rounded-xl border border-accent/30 bg-accent/10 p-2">
            <Sparkles size={16} className="text-accent" />
          </span>
          <span className="text-sm font-semibold tracking-[0.18em]">AI AGENCY</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-soft transition-colors duration-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="interactive-button rounded-full border border-white/15 bg-white/90 px-5 py-2 text-sm font-semibold text-[#0B1020]">
          Request Access
        </button>
      </div>
    </header>
  )
}

export default Navbar
