'use client'

import { useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

interface HeroProps {
  loaderDone?: boolean
}

export default function Hero({ loaderDone = false }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen w-full snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />

      {/* <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 sm:px-8 pb-30 md:pt-0 md:px-24"
      >
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => setTrailerOpen(true)}
            className="inline-block cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
          >
            Watch Trailer
          </button>
          <a
            href="#"
            className="inline-block rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Start reading the manga
          </a>
        </motion.div>
      </motion.div> */}

      <motion.div
        className="absolute bottom-6 right-5 sm:right-8 z-10 flex items-center gap-5 md:bottom-8"
        initial={{ opacity: 0, x: 30 }}
        animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="https://www.instagram.com/trioanimee/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-xl" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com/@trio.officialanimation" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-xl" aria-label="YouTube">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </motion.div>

      {/* ── YouTube trailer box — bottom left ────────────── */}
      <motion.button
        onClick={() => setTrailerOpen(true)}
        className="absolute bottom-6 left-5 sm:left-8 z-10 md:bottom-8 flex items-center gap-4 border border-white/20 bg-black/30 backdrop-blur-sm px-5 py-4 rounded hover:border-white/40 hover:bg-black/50 transition-colors cursor-pointer text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Watch Manga Trailer"
      >
        <FontAwesomeIcon icon={faYoutube} className="text-[#FF0000] text-4xl flex-shrink-0" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 leading-none mb-1">Manga Trailer</p>
          <p className="text-sm font-semibold text-white leading-none">Watch now</p>
        </div>
      </motion.button>

      {/* ── SCROLL indicator — bottom center ─────────────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 md:bottom-8 hidden sm:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <motion.svg
          className="h-4 w-4 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>

      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTrailerOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="h-full w-full rounded-lg"
                src="https://www.youtube.com/embed/1hhzV-49s-E?autoplay=1&controls=1&rel=0"
                allow="autoplay; encrypted-media"
                title="Trailer"
              />
            </div>
            <button
              onClick={() => setTrailerOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
