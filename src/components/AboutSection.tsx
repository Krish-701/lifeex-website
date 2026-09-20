import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { useInViewVideo } from '../hooks/useInViewVideo'

export default function AboutSection() {
  const videoRef = useInViewVideo()

  return (
    <section id="about" className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={50}>
          <div className="relative rounded-3xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/media/featured.mp4"
              poster="/media/featured-poster.webp"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
                <p className="uppercase text-white/40 text-xs tracking-widest">Not another AI product</p>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mt-3">
                  Lifeex is an organization, a community and a company. We grow food, hold land, look after each
                  other's health, and live together, so that a good life doesn't depend on a job.
                </p>
              </div>
              <motion.a
                href="#join"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-full px-8 py-3 text-sm font-semibold bg-marigold text-black self-start md:self-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Lifeex
              </motion.a>
            </div>
          </div>
        </FadeIn>
        <FadeIn y={40} delay={0.1}>
          <p className="font-serif italic text-5xl md:text-7xl text-white/60 mt-10 md:mt-14">Together to live.</p>
        </FadeIn>
      </div>
    </section>
  )
}
