'use client'

import { useRef, useState, useCallback } from 'react'
import { AnimatePresence, useAnimate } from 'framer-motion'
import Loader from '@/components/Loader'
import BackgroundVideo from '@/components/BackgroundVideo'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import LatestReleases from '@/components/LatestReleases'

export default function HomeClient() {
  const [loaderVisible, setLoaderVisible] = useState(true)
  // Controls the real hero tagline + the rest of the hero entrance.
  const [heroReady, setHeroReady] = useState(false)
  // Keeps the flight overlay mounted until the flight finishes.
  const [overlayVisible, setOverlayVisible] = useState(true)

  const heroTaglineRef = useRef<HTMLSpanElement>(null)
  const [scope, animate] = useAnimate<HTMLParagraphElement>()

  const runFlight = useCallback(async () => {
    const overlay = scope.current
    const target = heroTaglineRef.current

    // Begin fading the loader background away as the text starts moving.
    setLoaderVisible(false)

    if (!overlay || !target) {
      setHeroReady(true)
      setOverlayVisible(false)
      return
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const s = overlay.getBoundingClientRect()
    const t = target.getBoundingClientRect()
    const dx = t.left - s.left
    const dy = t.top - s.top
    // Scale from the live font sizes so the overlay lands on EXACTLY the
    // hero breakpoint size: text-3xl (mobile) / text-5xl (tablet) / text-7xl (pc).
    const sFont = parseFloat(getComputedStyle(overlay).fontSize)
    const tFont = parseFloat(getComputedStyle(target).fontSize)
    const scale = tFont / sFont

    if (reduce) {
      setHeroReady(true)
      setOverlayVisible(false)
      return
    }

    // Translate and scale together: the text glides from the centered loader
    // spot to the hero header position while simultaneously growing to the
    // full hero size, landing precisely on the real tagline.
    await animate(
      overlay,
      { x: dx, y: dy, scale },
      { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
    )

    // Reveal the real hero tagline underneath, then drop the overlay.
    setHeroReady(true)
    setOverlayVisible(false)
  }, [animate, scope])

  return (
    <main className="flex flex-col">
      <AnimatePresence>
        {loaderVisible && <Loader onRequestExit={runFlight} />}
      </AnimatePresence>

      {/* Flight overlay: the single "First anime of India" element that lives
          on top during loading and animates into the hero on completion. */}
      {overlayVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div style={{ transform: 'translateY(110px)' }}>
            <p
              ref={scope}
              className="font-display font-bold text-white tracking-tight select-none whitespace-nowrap"
              style={{
                fontSize: '1.25rem',
                transformOrigin: 'top left',
                animation: 'tagline-in 0.6s ease 0.7s both',
              }}
            >
              First anime of India
            </p>
          </div>
        </div>
      )}

      <BackgroundVideo />
      <Hero loaderDone={heroReady} taglineRef={heroTaglineRef} />
      <AboutSection />
      <LatestReleases />
    </main>
  )
}
