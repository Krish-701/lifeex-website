import { motion } from 'framer-motion'
import { Sprout, ChevronDown, ArrowRight } from 'lucide-react'
import { useVideoFade } from '../hooks/useVideoFade'

type Props = {
  onEmailSubmit: (email: string) => void
}

export default function Hero({ onEmailSubmit }: Props) {
  const videoRef = useVideoFade()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ;(e.currentTarget.elements.namedItem('email') as HTMLInputElement).focus()
      return
    }
    onEmailSubmit(email)
    document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => document.querySelector<HTMLInputElement>('#join-name')?.focus(), 700)
  }

  const scrollTo = (sel: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen relative flex flex-col overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
        src="/media/hero.mp4"
        poster="/media/hero-poster.webp"
        muted
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" aria-hidden="true" />

      <header className="relative z-20 px-6 py-6">
        <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between" aria-label="Main">
          <a href="#top" className="flex items-center gap-2.5">
            <Sprout size={24} className="text-white" aria-hidden="true" />
            <span className="font-serif text-2xl tracking-tight text-white">Lifeex</span>
            <span className="hidden md:inline text-sm text-white/60">– Together to live</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#what" onClick={scrollTo('#what')} className="text-white/80 hover:text-white text-sm font-medium">What we do</a>
            <a href="#who" onClick={scrollTo('#who')} className="text-white/80 hover:text-white text-sm font-medium">Who it's for</a>
            <a href="#how" onClick={scrollTo('#how')} className="text-white/80 hover:text-white text-sm font-medium">How it starts</a>
            <a href="#faq" onClick={scrollTo('#faq')} className="text-white/80 hover:text-white text-sm font-medium">FAQ</a>
          </div>
          <a
            href="#join"
            onClick={scrollTo('#join')}
            className="rounded-full px-6 py-2 text-sm font-semibold bg-marigold text-black hover:brightness-105 transition"
          >
            Join Lifeex
          </a>
        </nav>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1 className="font-serif tracking-tight text-white leading-[1.1] text-5xl md:text-7xl lg:text-8xl">
          Humans keep the life.
          <br />
          <em className="italic text-white/60">Together to live.</em>
        </h1>

        <form onSubmit={submit} className="mt-10 max-w-xl w-full" noValidate>
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email to join"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm md:text-base"
              aria-label="Email to join"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full p-3 text-black bg-marigold hover:brightness-105 transition"
              aria-label="Join Lifeex"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </form>

        <p className="mt-6 text-white text-sm md:text-base leading-relaxed max-w-xl px-4">
          Lifeex is a community building the food, land, health and homes people will need when paid work gets
          scarce. We're starting now, before the jobs are gone.
        </p>

        <a
          href="#what"
          onClick={scrollTo('#what')}
          className="liquid-glass mt-8 rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition"
        >
          See what we're building
        </a>
      </div>

      <div className="relative z-10 pb-8 flex justify-center">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <a href="#why" onClick={scrollTo('#why')} aria-label="Scroll down">
            <ChevronDown size={24} className="text-white/60" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
