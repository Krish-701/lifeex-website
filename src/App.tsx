import { useState } from 'react'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import AboutSection from './components/AboutSection'
import LifeSection from './components/LifeSection'
import WhatSection from './components/WhatSection'
import WhoSection from './components/WhoSection'
import HowSection from './components/HowSection'
import JoinSection from './components/JoinSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

export default function App() {
  const [audience, setAudience] = useState('I lost my job to AI')
  const [email, setEmail] = useState('')

  return (
    <div id="top" className="bg-black text-white min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:border focus:border-white/40"
      >
        Skip to content
      </a>
      <Hero onEmailSubmit={setEmail} />
      <main id="main">
        <WhySection />
        <AboutSection />
        <LifeSection />
        <WhatSection />
        <WhoSection audience={audience} onAudienceChange={setAudience} />
        <HowSection />
        <JoinSection email={email} audience={audience} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
