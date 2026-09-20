import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  y?: number
  x?: number
  delay?: number
  duration?: number
  className?: string
}

/** Fade-up (or from x) on scroll, once. Instant under reduced motion. */
export default function FadeIn({ children, y = 40, x = 0, delay = 0, duration = 0.8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y, x: reduced ? 0 : x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : undefined}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}
