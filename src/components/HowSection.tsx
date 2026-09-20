import FadeIn from './FadeIn'

const STEPS = [
  { n: '1', title: 'Join.', line: 'Tell us your situation.' },
  { n: '2', title: 'Meet.', line: 'Find people near you, or start a group.' },
  { n: '3', title: 'Start.', line: 'Begin with food and skills, together.' },
  { n: '4', title: 'Grow.', line: 'Move toward shared land, housing and care.' },
]

// TODO-CONFIRM: all steps are drafts the founder must approve.
export default function HowSection() {
  return (
    <section id="how" className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={20}>
          <p className="uppercase text-white/40 text-xs tracking-widest">How it starts</p>
        </FadeIn>
        <FadeIn y={40} delay={0.05}>
          <h2 className="font-serif tracking-tight text-4xl md:text-6xl lg:text-7xl mt-4">
            Small first steps, <em className="italic text-white/60">real ground</em>
          </h2>
        </FadeIn>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 mt-14 md:mt-20">
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} y={30} delay={i * 0.1}>
              <li className={`flex flex-col gap-3 md:px-8 ${i > 0 ? 'md:border-l md:border-white/10' : 'md:pl-0'}`}>
                <span className="font-serif italic text-6xl text-white/30 leading-none" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-white">
                  {s.title} <span className="text-white/60 font-sans text-base md:text-lg">{s.line}</span>
                </h3>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
