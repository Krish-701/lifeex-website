import FadeIn from './FadeIn'
import { useInViewVideo } from '../hooks/useInViewVideo'

export default function LifeSection() {
  const videoRef = useInViewVideo()

  return (
    <section id="life" className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={40}>
          <h2 className="font-serif tracking-tight leading-[1.1] text-5xl md:text-7xl lg:text-8xl mb-16 md:mb-24">
            Life <em className="italic text-white/40">after</em> work
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <FadeIn x={-40} y={0}>
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/media/philosophy.mp4"
                poster="/media/philosophy-poster.webp"
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            </div>
          </FadeIn>
          <FadeIn x={40} y={0}>
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p className="uppercase text-white/40 text-xs tracking-widest">Why start now</p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mt-3">
                  Farms, homes and clinics take years to build. If we wait until the jobs are gone, everyone will be
                  looking for the same land, food and care at the same time. Starting now means it's already there
                  when it's needed.
                </p>
              </div>
              <div className="w-full h-px bg-white/10" aria-hidden="true" />
              <div>
                <p className="uppercase text-white/40 text-xs tracking-widest">What we hold</p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mt-3">
                  Not only money. Land, skills, health and community that pass from one generation to the next.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
