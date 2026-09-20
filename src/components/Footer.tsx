import { Sprout } from 'lucide-react'
import { CONTACT_EMAIL } from '../config'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 py-14">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <Sprout size={20} className="text-white" aria-hidden="true" />
          <span className="font-serif text-xl text-white">Lifeex</span>
          <span className="text-sm text-white/60">– Together to live</span>
        </div>
        <p className="text-white/70 text-sm">Food, land, health and community for life after work.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white text-sm hover:underline w-fit">
          {CONTACT_EMAIL}
        </a>
        <p className="text-white/40 text-xs leading-relaxed max-w-xl">
          Images and video on this site are AI-generated illustrations of the life we're building. They are not photos
          of members or of existing Lifeex land.
        </p>
        <p className="text-white/40 text-xs">© {new Date().getFullYear()} Lifeex.</p>
      </div>
    </footer>
  )
}
