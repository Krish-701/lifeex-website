import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Plays a muted video only while it is in view; pauses when out of view.
 * Respects reduced motion / Save-Data by never playing (poster shown).
 */
export function useInViewVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduced || (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {})
          } else {
            video.pause()
          }
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduced])

  return videoRef
}
