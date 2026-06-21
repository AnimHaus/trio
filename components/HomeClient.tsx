'use client'

import { useEffect, useState, useCallback } from 'react'
import BackgroundVideo from '@/components/BackgroundVideo'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import LatestReleases from '@/components/LatestReleases'

export default function HomeClient() {
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [heroReady, setHeroReady] = useState(false)

  const runFlight = useCallback(() => {
    setLoaderVisible(false)
    setHeroReady(true)
  }, [])

  useEffect(() => {
    runFlight()
  }, [runFlight])

  return (
    <main className="flex flex-col">
      <BackgroundVideo />
      <Hero loaderDone={heroReady} />
      <AboutSection />
      <LatestReleases />
    </main>
  )
}
