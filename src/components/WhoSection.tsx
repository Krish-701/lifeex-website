import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { AUDIENCES } from '../config'

const CARDS: Record<string, string> = {
  'I lost my job to AI':
    "Your income changed. Your need for food, a home and care didn't. Join, farm, live, and be looked after.",
  'I have a family': 'Secure food and a stable place for your children.',
  "I'm thinking about my kids' future": 'Leave them land, skills, health and a community, not only money.',
  // TODO-CONFIRM: does Lifeex support groups today?
  "We're a group": 'Start a farm, a clinic or housing with people you trust.',
  'I want to build this': 'Help build the infrastructure for life after work.',
}

type Props = {
  audience: string
  onAudienceChange: (a: string) => void
}

export default function WhoSection({ audience, onAudienceChange }: Props) {
  const [active, setActive] = useState(audience)

  const choose = (a: string) => {
    setActive(a)
    onAudienceChange(a)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = (AUDIENCES as readonly string[]).indexOf(active)
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      choose(AUDIENCES[(idx + 1) % AUDIENCES.length])
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      choose(AUDIENCES[(idx - 1 + AUDIENCES.length) % AUDIENCES.length])
    }
  }

  return (
    <section id="who" className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={20}>
          <p className="uppercase text-white/40 text-xs tracking-widest">Who it's for</p>
        </FadeIn>
        <FadeIn y={40} delay={0.05}>
          <h2 className="font-serif tracking-tight text-4xl md:text-6xl lg:text-7xl mt-4">
            Find <em className="italic text-white/60">yourself</em> here
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-12 md:mt-16 items-start">
          <FadeIn y={30}>
            <div role="radiogroup" aria-label="Which of these is closest to you?" onKeyDown={onKeyDown}>
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  role="radio"
                  aria-checked={a === active}
                  onClick={() => choose(a)}
                  className={`w-full text-left font-serif text-2xl md:text-4xl tracking-tight py-3 px-4 rounded-2xl transition-colors ${
                    a === active ? 'text-white liquid-glass' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn y={30} delay={0.1}>
            <div className="liquid-glass rounded-3xl p-8 md:p-10 md:sticky md:top-8 min-h-[260px] flex flex-col justify-between gap-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/80 text-lg md:text-xl leading-relaxed"
                >
                  {CARDS[active]}
                </motion.p>
              </AnimatePresence>
              <motion.a
                href="#join"
                onClick={(e) => {
                  e.preventDefault()
                  choose(active)
                  document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="self-start rounded-full px-8 py-3 text-sm font-semibold bg-marigold text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join as this
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
