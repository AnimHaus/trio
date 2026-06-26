'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { protagonists } from '@/lib/characters'
import TransitionLink from '@/components/TransitionLink'
import WordReveal from '@/components/WordReveal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const IDCard3D = dynamic(() => import('@/components/IDCard3D'), { ssr: false })

// Center card intrinsic size — side cards sit behind it, scaled down
const CENTER_W = 640
const CENTER_H = 404
const SIDE_X = 320 // distance from center to side-card origin (causes overlap)

type PosKey = 'left' | 'center' | 'right'

const POS: Record<PosKey, { x: number; rotateY: number; scale: number; opacity: number; zIndex: number }> = {
  left:   { x: -SIDE_X, rotateY: 35, scale: 0.38, opacity: 0.35, zIndex: 1 },
  center: { x: 0,       rotateY: 0,  scale: 1,    opacity: 1,    zIndex: 10 },
  right:  { x: SIDE_X,  rotateY: -35, scale: 0.38, opacity: 0.35, zIndex: 1 },
}

// Stat bar
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={barRef} className="flex items-center gap-3">
      <span className="w-24 flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</span>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: visible ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
      <span className="w-7 text-right text-[10px] font-semibold tabular-nums" style={{ color }}>{value}</span>
    </div>
  )
}

export default function CharactersSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const prevIdx = (activeIdx - 1 + protagonists.length) % protagonists.length
  const nextIdx = (activeIdx + 1) % protagonists.length
  const active = protagonists[activeIdx]

  // index → position key
  const posOf = (i: number): PosKey => {
    if (i === activeIdx) return 'center'
    if (i === prevIdx) return 'left'
    return 'right'
  }

  const go = (dir: 1 | -1) =>
    setActiveIdx((i) => (i + dir + protagonists.length) % protagonists.length)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden snap-start bg-black/50"
    >
      {/* Background radial glow keyed to active character's color */}
      <motion.div
        key={active.id + '-bg'}
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 40%, ${active.accentColor}14 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-14 md:mb-18">
          <WordReveal
            text="Meet the Trio"
            as="h2"
            className="font-display text-5xl sm:text-7xl font-black text-white"
          />
        </div>

        {/* === Carousel full-width, info below === */}
        <div className="flex flex-col items-center">
          {/* --- Card carousel --- */}
          <div className="flex flex-col items-center w-full">
            {/* Cards */}
            <div
              className="relative"
              style={{
                width: Math.min(CENTER_W + SIDE_X * 2, 1200),
                height: CENTER_H + 56,
                perspective: '1600px',
              }}
            >
              {protagonists.map((char, i) => {
                const pos = posOf(i)
                const cfg = POS[pos]
                const isCenter = pos === 'center'
                const isSide = !isCenter

                return (
                  <motion.div
                    key={char.id}
                    className="absolute top-1/2"
                    style={{
                      width: CENTER_W,
                      height: CENTER_H,
                      left: '50%',
                      marginLeft: -CENTER_W / 2,
                      marginTop: -CENTER_H / 2,
                      transformStyle: 'preserve-3d',
                      zIndex: cfg.zIndex,
                      cursor: isSide ? 'pointer' : 'default',
                    }}
                    animate={{
                      x: cfg.x,
                      rotateY: cfg.rotateY,
                      scale: cfg.scale,
                      opacity: cfg.opacity,
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => isSide && setActiveIdx(i)}
                    whileHover={isSide ? { opacity: 0.72 } : {}}
                  >
                    <IDCard3D character={char} active={isCenter} />
                  </motion.div>
                )
              })}
            </div>

            {/* Arrows + dots */}
            <div className="flex items-center gap-5 mt-8">
              <button
                onClick={() => go(-1)}
                aria-label="Previous character"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/50 hover:text-primary transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
              </button>

              <div className="flex gap-2">
                {protagonists.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Go to character ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIdx ? 24 : 6,
                      background: i === activeIdx ? active.accentColor : 'rgba(255,255,255,0.18)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next character"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/50 hover:text-primary transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* --- Character info panel --- */}
          <div className="w-full mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row lg:items-start lg:gap-16"
              >
                {/* Left: name + bio */}
                <div className="flex-1 min-w-0 mb-10 lg:mb-0">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3"
                    style={{ color: active.accentColor }}
                  >
                    {active.studentId}
                  </p>
                  <h3 className="font-display text-5xl sm:text-6xl font-black text-white mb-2">
                    {active.name}
                  </h3>
                  <p className="text-lg text-white/45 font-medium mb-6">{active.role}</p>
                  <p className="text-sm text-white/55 leading-relaxed mb-7 max-w-lg">{active.bio}</p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-8">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[11px] font-medium border"
                        style={{
                          color: active.accentColor + 'CC',
                          borderColor: active.accentColor + '33',
                          background: active.accentColor + '0C',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <TransitionLink
                      href={`/character/${active.id}`}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors text-bg"
                      style={{ background: active.accentColor }}
                    >
                      Character Profile
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </TransitionLink>
                    <TransitionLink
                      href="/characters"
                      className="inline-flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white transition-colors"
                    >
                      All Characters
                      <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                    </TransitionLink>
                  </div>
                </div>

                {/* Right: stats */}
                <div className="flex-shrink-0 w-full lg:w-72">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-white/30"
                  >
                    Combat Stats
                  </p>
                  <div className="space-y-4">
                    {Object.entries(active.stats).map(([key, val]) => (
                      <StatBar
                        key={key}
                        label={key}
                        value={val}
                        color={active.accentColor}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
