'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import TransitionLink from '@/components/TransitionLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faStar, faBolt, faShield, faEye } from '@fortawesome/free-solid-svg-icons'
import type { Character } from '@/lib/characters'
import { characters } from '@/lib/characters'

const IDCard3D = dynamic(() => import('@/components/IDCard3D'), { ssr: false })
const CharacterModel3D = dynamic(() => import('@/components/CharacterModel3D'), { ssr: false })

function StatBar({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="w-28 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-muted/50 capitalize">{label}</span>
      <div className="flex-1 h-1.5 bg-card/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
      <span className="w-8 text-right text-xs font-bold tabular-nums" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

export default function CharacterDetailClient({ character }: { character: Character }) {
  const char = character
  const charIndex = characters.findIndex((c) => c.id === char.id)
  const prevChar = characters[(charIndex - 1 + characters.length) % characters.length]
  const nextChar = characters[(charIndex + 1) % characters.length]

  const abilityIcons = [faBolt, faStar, faShield, faEye, faBolt]

  return (
    <div className="min-h-screen bg-bg pt-20">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{ background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${char.accentColor} 0%, transparent 65%)` }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 py-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <TransitionLink
            href="/characters"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted/50 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
            All Characters
          </TransitionLink>
        </motion.div>

        {/* Main content: card + info */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
          {/* --- 3D Card --- */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex flex-col items-center lg:sticky lg:top-28"
          >
            {/* Card / model frame */}
            {char.glbModel ? (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 340,
                  height: 480,
                  boxShadow: `0 32px 80px ${char.accentColor}20, 0 0 0 1px var(--color-card)`,
                  background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${char.accentColor}12 0%, transparent 70%)`,
                }}
              >
                <CharacterModel3D src={char.glbModel} accentColor={char.accentColor} />
              </div>
            ) : (
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 340,
                  height: 214,
                  boxShadow: `0 32px 80px ${char.accentColor}20, 0 0 0 1px var(--color-card)`,
                }}
              >
                <IDCard3D character={char} active={true} />
              </div>
            )}

            {/* Student ID label */}
            <div className="mt-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/45">Student ID</p>
              <p className="text-sm font-mono font-semibold mt-0.5" style={{ color: char.accentColor }}>
                {char.studentId}
              </p>
            </div>

            {/* Quick info chips */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                { label: 'Age', value: `${char.age}` },
                { label: 'Height', value: char.height },
                { label: 'Class', value: char.class },
                { label: 'Year', value: char.year },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-4 py-2 rounded-xl border"
                  style={{ borderColor: char.accentColor + '22', background: char.accentColor + '08' }}
                >
                  <span className="text-[9px] uppercase tracking-widest text-muted/45">{label}</span>
                  <span className="text-sm font-bold text-white mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Character info --- */}
          <div className="flex-1 min-w-0">
            {/* Protagonist badge */}
            {char.isProtagonist && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
                style={{ background: char.accentColor + '18', color: char.accentColor, border: `1px solid ${char.accentColor}30` }}
              >
                <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5" />
                Main Protagonist
              </motion.div>
            )}

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-5xl sm:text-7xl font-black text-white leading-none mb-3">
                {char.name}
              </h1>
              <p className="text-lg font-semibold mb-8" style={{ color: char.accentColor + 'BB' }}>
                {char.role}
              </p>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {char.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{ color: char.accentColor + 'CC', borderColor: char.accentColor + '2E', background: char.accentColor + '0A' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-display text-lg font-black text-white mb-4 uppercase tracking-wide">Background</h2>
              <div className="space-y-4 border-l-2 pl-5" style={{ borderColor: char.accentColor + '35' }}>
                {char.fullBio.trim().split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-muted leading-relaxed">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-display text-lg font-black text-white mb-6 uppercase tracking-wide">Combat Stats</h2>
              <div className="space-y-4 max-w-md">
                {Object.entries(char.stats).map(([key, val], i) => (
                  <StatBar key={key} label={key} value={val} color={char.accentColor} delay={i * 0.07} />
                ))}
              </div>
            </motion.div>

            {/* Abilities */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-display text-lg font-black text-white mb-6 uppercase tracking-wide">Abilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {char.abilities.map((ability, i) => (
                  <div
                    key={ability}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3"
                    style={{ borderColor: char.accentColor + '22', background: char.accentColor + '07' }}
                  >
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ background: char.accentColor + '18' }}
                    >
                      <FontAwesomeIcon
                        icon={abilityIcons[i % abilityIcons.length]}
                        className="h-3 w-3"
                        style={{ color: char.accentColor }}
                      />
                    </span>
                    <span className="text-sm font-semibold text-muted">{ability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-card/30 grid grid-cols-2 gap-4"
        >
          <TransitionLink
            href={`/character/${prevChar.id}`}
            className="group flex items-center gap-3 rounded-xl border border-card/25 bg-card/10 px-5 py-4 hover:border-card/40 hover:bg-card/20 transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5 text-muted/45 group-hover:text-muted transition-colors" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted/40 mb-0.5">Previous</p>
              <p className="text-sm font-bold text-muted group-hover:text-white transition-colors truncate">{prevChar.name}</p>
            </div>
          </TransitionLink>

          <TransitionLink
            href={`/character/${nextChar.id}`}
            className="group flex items-center justify-end gap-3 rounded-xl border border-card/25 bg-card/10 px-5 py-4 hover:border-card/40 hover:bg-card/20 transition-all text-right"
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted/40 mb-0.5">Next</p>
              <p className="text-sm font-bold text-muted group-hover:text-white transition-colors truncate">{nextChar.name}</p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 text-muted/45 group-hover:text-muted transition-colors" />
          </TransitionLink>
        </motion.div>
      </div>
    </div>
  )
}