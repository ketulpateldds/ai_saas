import { Sparkles } from 'lucide-react'

function Navbar() {
  return (
    <nav className="fixed left-10 right-0 top-10 z-50 md:p-9 p-5 flex justify-between items-center w-full mix-blend-difference">
      <a href="/" className="flex items-center gap-2 text-milk hover:text-light-brown transition-colors">
        <Sparkles size={24} />
        <span className="text-2xl font-bold uppercase tracking-[-.05em] font-sans">AI AGENCY</span>
      </a>
    </nav>
  )
}

export default Navbar
