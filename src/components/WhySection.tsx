import FadeIn from './FadeIn'

export default function WhySection() {
  return (
    <section id="why" className="relative bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-40"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.08), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        <FadeIn y={20}>
          <p className="uppercase text-white/40 text-xs tracking-widest">Why Lifeex</p>
        </FadeIn>
        <FadeIn y={40} delay={0.05}>
          <h2 className="font-serif tracking-tight leading-[1.1] text-4xl md:text-6xl lg:text-7xl mt-4">
            Work is changing <em className="italic text-white/60">faster than life can adapt.</em>
          </h2>
        </FadeIn>
        <FadeIn y={30} delay={0.1}>
          <div className="text-white/70 text-lg max-w-2xl mt-8 space-y-4">
            <p>
              AI agents can already do the work of many people, and they improve every year. We expect many companies
              to need far fewer employees, and soon. Nobody knows exactly how fast. We're not waiting to find out.
            </p>
            <p>
              People will still need to eat. They'll still need a place to live, care when they're sick, and people
              around them. Lifeex builds those things first.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
