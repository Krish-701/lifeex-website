import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * rAF-based fade-to-black loop for the hero video, per brief §6.1.
 * Returns refs for the <video> element.
 * Reduced motion: never plays; poster shown instead.
 */
export function useVideoFade() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const fadeRef = useRef<number>(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduced) return

    const animateOpacity = (from: number, to: number, duration: number, onDone?: () => void) => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        video.style.opacity = String(from + (to - from) * t)
        if (t < 1) {
          fadeRef.current = requestAnimationFrame(step)
        } else if (onDone) {
          onDone()
        }
      }
      fadeRef.current = requestAnimationFrame(step)
    }

    const onCanPlay = () => {
      void video.play().catch(() => {})
      animateOpacity(0, 1, 500)
    }

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime
      if (remaining > 0 && remaining <= 0.55) {
        // stop re-triggering during the fade-out window
        video.removeEventListener('timeupdate', onTimeUpdate)
        animateOpacity(1, 0, 500)
      }
    }

    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        void video.play().catch(() => {})
        animateOpacity(0, 1, 500)
        video.addEventListener('timeupdate', onTimeUpdate)
      }, 100)
    }

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => {
      cancelAnimationFrame(fadeRef.current)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [reduced])

  return videoRef
}
