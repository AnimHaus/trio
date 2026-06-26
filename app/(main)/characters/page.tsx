'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TransitionLink from '@/components/TransitionLink'
import WordReveal from '@/components/WordReveal'
import { characters } from '@/lib/characters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Precompute the swirl SVG path — matches drawSwirl() in IDCard3D canvas
const SWIRL_PATH = (() => {
  const cx = 38, cy = 38, R = 30
  const turns = 1.7 * Math.PI * 2
  const steps = 64
  const outer: string[] = [], inner: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = -turns * t
    const r = R * (1 - t * 0.92)
    const bw = R * (0.34 - 0.27 * t)
    outer.push(`${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * (r + bw / 2)).toFixed(1)},${(cy + Math.sin(a) * (r + bw / 2)).toFixed(1)}`)
    inner.push(`L${(cx + Math.cos(a) * Math.max(r - bw / 2, 0)).toFixed(1)},${(cy + Math.sin(a) * Math.max(r - bw / 2, 0)).toFixed(1)}`)
  }
  return [...outer, ...inner.reverse(), 'Z'].join(' ')
})()

function CharacterCard({ char, index }: { char: (typeof characters)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const INK = '#0C0C0C'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <TransitionLink href={`/character/${char.id}`} className="group block">
        {/* Outer wrapper carries the drop-shadow so it follows the clip-path shape */}
        <div style={{ filter: 'drop-shadow(0 6px 28px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
          <div
            className="relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.015]"
            style={{
              background: char.accentColor,
              clipPath:
                'polygon(0 4.5%, 4.5% 0, 50% 0, 54.5% 5.5%, 70% 5.5%, 74.5% 0, 95.5% 0, 100% 4.5%, 100% 95.5%, 95.5% 100%, 4.5% 100%, 0 95.5%)',
            }}
          >
            {/* Fine dot texture matching IDCard canvas */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
              <defs>
                <pattern id={`dt-${char.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.65" fill={INK} opacity="0.05" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dt-${char.id})`} />
            </svg>

            <div className="relative p-5 pt-4">
              {/* Top label strip */}
              <div
                className="flex items-center justify-between mb-2"
                style={{ fontFamily: '"Courier New", monospace', fontSize: 9, color: INK, opacity: 0.55, letterSpacing: '0.05em' }}
              >
                <span>[{char.class}]</span>
                <span>{char.studentId}</span>
                <span>{char.year.toUpperCase()}</span>
              </div>
              <div style={{ height: 1, background: INK, opacity: 0.12, marginBottom: 10 }} />

              {/* Protagonist stamp */}
              {char.isProtagonist && (
                <div
                  className="inline-block mb-2 px-2 py-0.5"
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: INK,
                    border: `1px solid ${INK}`,
                    opacity: 0.4,
                  }}
                >
                  ◆ PROTAGONIST
                </div>
              )}

              {/* Big name block */}
              <div className="mb-1 leading-none">
                {char.name.toUpperCase().split(' ').map((part, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: '"Arial Black", Impact, sans-serif',
                      fontSize: 52,
                      fontWeight: 900,
                      lineHeight: 0.92,
                      letterSpacing: '-0.01em',
                      color: INK,
                    }}
                  >
                    {part}
                  </div>
                ))}
              </div>

              {/* Role */}
              <div
                className="mt-2 mb-1"
                style={{ fontFamily: '"Courier New", monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: INK, opacity: 0.7 }}
              >
                {char.role.toUpperCase()}
              </div>
              <div style={{ height: 1, background: INK, opacity: 0.14, marginBottom: 14 }} />

              {/* Decorative row: swirl · checker · target */}
              <div className="flex items-center justify-between mb-5">
                <svg width="72" height="72" viewBox="0 0 76 76" aria-hidden>
                  <path d={SWIRL_PATH} fill={INK} opacity="0.78" />
                </svg>

                <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden>
                  {Array.from({ length: 4 }).flatMap((_, c) =>
                    Array.from({ length: 4 }).map((_, r) =>
                      (c + r) % 2 === 0 ? (
                        <rect key={`${c}-${r}`} x={c * 13} y={r * 13} width="13" height="13" fill={INK} opacity="0.68" />
                      ) : null,
                    ),
                  )}
                  <rect x="0" y="0" width="52" height="52" fill="none" stroke={INK} strokeWidth="1" opacity="0.35" />
                </svg>

                <svg width="72" height="72" viewBox="0 0 76 76" aria-hidden>
                  {[34, 26, 18, 10].map((r, i) => (
                    <circle key={r} cx="38" cy="38" r={r} fill="none" stroke={INK} strokeWidth={i === 0 ? 1.5 : 0.9} opacity={i % 2 === 0 ? 0.65 : 0.28} />
                  ))}
                  <line x1="6" y1="38" x2="70" y2="38" stroke={INK} strokeWidth="0.7" opacity="0.2" />
                  <line x1="38" y1="6" x2="38" y2="70" stroke={INK} strokeWidth="0.7" opacity="0.2" />
                  <circle cx="38" cy="38" r="3.5" fill={INK} opacity="0.6" />
                </svg>
              </div>

              {/* Stats bars — same minimal style as IDCard3D */}
              <div className="space-y-1.5 mb-4">
                {Object.entries(char.stats).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      style={{
                        width: 22,
                        fontFamily: '"Courier New", monospace',
                        fontSize: 8,
                        textTransform: 'uppercase',
                        color: INK,
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      {key.slice(0, 3)}
                    </span>
                    <div style={{ flex: 1, height: 8, border: `1px solid rgba(12,12,12,0.28)`, position: 'relative' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 1, bottom: 1, left: 1,
                          width: `calc(${val}% - 2px)`,
                          background: INK,
                          opacity: 0.62,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: INK, opacity: 0.1, marginBottom: 10 }} />

              {/* CTA */}
              <div
                className="flex items-center justify-between"
                style={{ fontFamily: '"Courier New", monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: INK, opacity: 0.6 }}
              >
                <span>VIEW PROFILE</span>
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  )
}

export default function CharactersPage() {
  const protagonistList = characters.filter((c) => c.isProtagonist)
  const supportingList = characters.filter((c) => !c.isProtagonist)

  return (
    <div className="min-h-screen bg-bg pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <WordReveal text="All Characters" as="h1" className="font-display text-5xl sm:text-7xl font-black text-white mb-6" />
        <FadeUp delay={0.15} className="mb-16 max-w-xl">
          <p className="text-sm text-white/45 leading-relaxed">
            Every character in the world of Trio — from the three protagonists who anchor the story to the allies,
            rivals, and shadows that shape their journey.
          </p>
        </FadeUp>

        {/* Protagonists */}
        <section className="mb-20">
          <FadeUp className="mb-8 flex items-center gap-5">
            <span className="text-white/30" style={{ fontFamily: '"Courier New", monospace', fontSize: 11 }}>◆</span>
            <h2 className="font-display text-2xl font-black text-white tracking-tight">Protagonists</h2>
            <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-white/20" style={{ fontFamily: '"Courier New", monospace', fontSize: 9 }}>[03]</span>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {protagonistList.map((char, i) => (
              <CharacterCard key={char.id} char={char} index={i} />
            ))}
          </div>
        </section>

        {/* Supporting */}
        <section>
          <FadeUp className="mb-8 flex items-center gap-5">
            <span className="text-white/30" style={{ fontFamily: '"Courier New", monospace', fontSize: 11 }}>◆</span>
            <h2 className="font-display text-2xl font-black text-white tracking-tight">Supporting Cast</h2>
            <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-white/20" style={{ fontFamily: '"Courier New", monospace', fontSize: 9 }}>[03]</span>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportingList.map((char, i) => (
              <CharacterCard key={char.id} char={char} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
