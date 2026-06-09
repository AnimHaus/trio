'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

// trio.svg viewBox
const VB_W = 3345.6182
const VB_H = 1270.5924
const LOGO_ASPECT_RATIO = VB_W / VB_H // ≈ 2.633

const SLASH_DRAW = 0.17 // how fast a single blade draws
const SLASH_STAGGER = 0.09 // gap between consecutive slashes

// Hand-authored katana slashes across the logo. Order = strike sequence.
// Thick strokes are used as a reveal mask; their union uncovers the whole logo.
const SLASHES = [
  'M -200 690 Q 1672 540 3550 500', // 1 mid horizontal
  'M -200 150 Q 1672 720 3550 1150', // 2 steep down-right
  'M -200 1150 Q 1672 560 3550 230', // 3 steep up-right
  'M -200 340 Q 1672 250 3550 180', // 4 high
  'M -200 1050 Q 1672 900 3550 940', // 5 low
  'M -200 520 Q 1672 1080 3550 760', // 6 swoop
  'M -200 900 Q 1672 320 3550 480', // 7 swoop opposite
]

interface LoaderProps {
  onRequestExit: () => void
}

export default function Loader({ onRequestExit }: LoaderProps) {
  const slashesEnd = (SLASHES.length - 1) * SLASH_STAGGER + SLASH_DRAW
  const settleDelay = slashesEnd + 0.05

  useEffect(() => {
    // Hold briefly after the logo settles, then hand off to the flight.
    const t = setTimeout(() => onRequestExit(), (settleDelay + 0.85) * 1000)
    return () => clearTimeout(t)
  }, [settleDelay, onRequestExit])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 sm:gap-8"
      style={{ backgroundColor: '#0C0F0E' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px]"
        style={{ aspectRatio: `${LOGO_ASPECT_RATIO}` }}
      >
        {/* Faint ghost so the logo's presence is hinted before the cuts land */}
        <img
          src="/trio.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          style={{ opacity: 0.08 }}
        />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden
        >
          <defs>
            {/* Mask built from the slashes: each blade paints its band white,
                progressively revealing the logo beneath along the cut. */}
            <mask id="trio-slash-mask">
              {SLASHES.map((d, i) => (
                <motion.path
                  key={`mask-${i}`}
                  d={d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={380}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: SLASH_DRAW,
                    delay: i * SLASH_STAGGER,
                    ease: [0.3, 0, 0.2, 1],
                  }}
                />
              ))}
              {/* Final full reveal so any sliver the blades missed fills in */}
              <motion.rect
                x={-200}
                y={-200}
                width={VB_W + 400}
                height={VB_H + 400}
                fill="#fff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: settleDelay, ease: 'easeInOut' }}
              />
            </mask>
          </defs>

          {/* The real logo, revealed through the slash mask */}
          <image
            href="/trio.svg"
            x={0}
            y={0}
            width={VB_W}
            height={VB_H}
            mask="url(#trio-slash-mask)"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Bright blade trails — drawn along each cut, then they flash out */}
          {SLASHES.map((d, i) => (
            <g key={`trail-${i}`}>
              {/* green glow */}
              <motion.path
                d={d}
                fill="none"
                stroke="#9CFE08"
                strokeWidth={16}
                strokeLinecap="round"
                style={{ filter: 'blur(8px)' }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                transition={{
                  pathLength: { duration: SLASH_DRAW, delay: i * SLASH_STAGGER, ease: [0.3, 0, 0.2, 1] },
                  opacity: { duration: SLASH_DRAW + 0.35, delay: i * SLASH_STAGGER, times: [0, 0.25, 0.55, 1] },
                }}
              />
              {/* white-hot core */}
              <motion.path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                transition={{
                  pathLength: { duration: SLASH_DRAW, delay: i * SLASH_STAGGER, ease: [0.3, 0, 0.2, 1] },
                  opacity: { duration: SLASH_DRAW + 0.3, delay: i * SLASH_STAGGER, times: [0, 0.2, 0.5, 1] },
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
  )
}
