'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from '@/components/Loader'
import BackgroundVideo from '@/components/BackgroundVideo'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import LatestReleases from '@/components/LatestReleases'

export default function HomeClient() {
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [heroReady, setHeroReady] = useState(false)

  const runFlight = useCallback(() => {
    setLoaderVisible(false)
    setHeroReady(true)
  }, [])

  return (
    <main className="flex flex-col">
      <AnimatePresence>
        {loaderVisible && <Loader onRequestExit={runFlight} />}
      </AnimatePresence>

      <BackgroundVideo />
      <Hero loaderDone={heroReady} />
      <AboutSection />
      <LatestReleases />
    </main>
  )
}
