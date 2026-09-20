import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import FadeIn from './FadeIn'

const FAQS = [
  {
    q: 'Is Lifeex against AI?',
    a: 'No. AI does the work. Lifeex makes sure people still have a life.',
  },
  {
    q: 'Do I have to leave my job?',
    a: 'No. Starting now means building alongside work, before you need it.',
  },
  // TODO-CONFIRM: answers below are placeholders the founder must supply.
  { q: 'What does joining cost?', a: "We haven't decided yet." },
  { q: 'Where is Lifeex?', a: "We'll announce where we're starting first when the ground is secured." },
  { q: 'Who is behind it?', a: "Lifeex was started by a small group of founders. We'll introduce them here soon." },
  { q: 'What is Lifeex legally?', a: "We'll share our legal structure once it's finalized." },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn y={20}>
          <p className="uppercase text-white/40 text-xs tracking-widest">FAQ</p>
        </FadeIn>
        <FadeIn y={40} delay={0.05}>
          <h2 className="font-serif tracking-tight text-4xl md:text-6xl mt-4 mb-12">
            Common <em className="italic text-white/60">questions</em>
          </h2>
        </FadeIn>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {FAQS.map((f, i) => (
            <FadeIn key={f.q} y={20} delay={i * 0.05}>
              <div>
                <button
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-serif text-xl md:text-2xl text-white">{f.q}</span>
                  {open === i ? (
                    <Minus size={20} className="text-white/60 shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus size={20} className="text-white/60 shrink-0" aria-hidden="true" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/70 text-base md:text-lg leading-relaxed pb-6 pr-10">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
