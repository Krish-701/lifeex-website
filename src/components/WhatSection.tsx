import { Sprout, Home, HeartPulse, Users, Hammer } from 'lucide-react'
import FadeIn from './FadeIn'

const AREAS = [
  {
    tag: 'Grow',
    Icon: Sprout,
    title: 'Food',
    desc: 'Farms and food systems run by members, so families eat from land they help tend.',
    img: '/media/area-food.webp',
    alt: 'Rows of ripe vegetables in a garden bed at sunrise, a wooden harvest crate in the foreground.',
    span: 'md:col-span-3',
  },
  {
    tag: 'Hold',
    Icon: Home,
    title: 'Land and housing',
    desc: 'Land held together for the long term, with places to live on it.',
    img: '/media/area-land.webp',
    alt: 'Small timber houses with pitched roofs on a green hillside at blue hour, warm light in the windows.',
    span: 'md:col-span-3',
  },
  {
    // TODO-CONFIRM: what exists today in health?
    tag: 'Care',
    Icon: HeartPulse,
    title: 'Health',
    desc: 'Medical care and everyday health looked after inside the community.',
    img: '/media/area-health.webp',
    alt: 'A quiet, bright timber-and-glass room with a simple bed and plants on the windowsill.',
    span: 'md:col-span-2',
  },
  {
    tag: 'Live',
    Icon: Users,
    title: 'Community',
    desc: 'Neighbors, shared meals, shared work, help with children. A life with people in it.',
    img: '/media/area-community.webp',
    alt: 'Distant silhouettes of children running in a field at dusk while adults sit around a fire pit far away.',
    span: 'md:col-span-2',
  },
  {
    tag: 'Learn',
    Icon: Hammer,
    title: 'Skills',
    desc: 'Growing, building, healing, teaching: skills that stay useful whatever AI can do.',
    img: '/media/area-skills.webp',
    alt: 'A workbench with hand tools, seed packets and a half-built wooden frame under a warm lamp.',
    span: 'md:col-span-2',
  },
]

export default function WhatSection() {
  return (
    <section id="what" className="relative bg-black py-28 md:py-40 px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <FadeIn y={40}>
            <h2 className="font-serif tracking-tight text-3xl md:text-5xl">What we do</h2>
          </FadeIn>
          <FadeIn y={20}>
            <p className="hidden md:block uppercase text-white/40 text-sm tracking-widest">Five areas</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {AREAS.map((area, i) => (
            <FadeIn key={area.title} y={50} delay={i * 0.15} className={area.span}>
              <article className="liquid-glass rounded-3xl overflow-hidden group h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={area.img}
                    alt={area.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="liquid-glass rounded-full p-2" aria-hidden="true">
                      <area.Icon size={18} className="text-white" />
                    </span>
                    <p className="uppercase text-white/40 text-xs tracking-widest">{area.tag}</p>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl tracking-tight mt-3">{area.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-2">{area.desc}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
