'use client'

import { useMemo } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

export default function BackgroundVideo() {
  const { scrollY } = useScroll()
  const blurPx = useTransform(scrollY, [0, 900], [0, 12])
  const filterStyle = useTransform(blurPx, (v) => `blur(${v}px)`)

  const noiseBg = useMemo(() => {
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">',
      '<filter id="n">',
      '<feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>',
      '<feColorMatrix type="saturate" values="0"/>',
      '</filter>',
      '<rect width="256" height="256" filter="url(#n)" opacity="1"/>',
      '</svg>',
    ].join('')
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  }, [])

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-10 overflow-hidden max-sm:h-dvh max-sm:w-dvw"
        style={{ filter: filterStyle }}
      >
        <video
          className="h-full w-full object-cover pointer-events-none max-sm:object-[center_20%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        {/* Duotone: dark shadow colour → brand green */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color"
          style={{ background: 'linear-gradient(160deg, #0C0F0E 0%, #9CFE08 100%)', opacity: 0.45 }}
        />
      </motion.div>

      {/* Coarse grain — outside blur so it stays sharp while scrolling */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.35] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: noiseBg, backgroundRepeat: 'repeat', backgroundSize: '256px 256px' }}
      />
    </>
  )
}
