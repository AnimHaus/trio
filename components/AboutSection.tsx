'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordReveal from '@/components/WordReveal'
import TransitionLink from '@/components/TransitionLink'

const stats = [
  { value: '2003', label: 'Founded' },
  { value: '20+', label: 'Years of storytelling' },
  { value: '1', label: 'International Emmy Nomination' },
  { value: '4+', label: 'Seasons of Lamput' },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section className="w-full bg-black/50 py-20 md:py-28 px-5 sm:px-8 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            The Studio Behind TRIO
          </p>
        </FadeIn>

        <div className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none">
          <WordReveal text="Vaibhav" as="span" className="text-white" delay={0.1} />
          <br />
          <WordReveal text="Studios" as="span" className="text-primary" delay={0.1} />
        </div>

        <FadeIn delay={0.2} className="mt-5 max-w-2xl">
          <p className="text-base md:text-lg text-muted/80 leading-relaxed">
            India&apos;s favourite animation studio — the only Indian studio to receive an
            International Emmy nomination — now bringing you the country&apos;s first original anime.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/5">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted/60 uppercase tracking-wider">{s.label}</p>
            </FadeIn>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/5">
          <FadeIn>
            <div className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              <WordReveal text="Storytellers first," as="span" />
              <br />
              <WordReveal text="animators always." as="span" />
            </div>
            <p className="text-muted/70 leading-relaxed mb-4">
              Founded in 2003, Vaibhav Studios has produced some of India&apos;s most
              successful and beloved animated content. We script, design, direct
              and produce animation films — and as storytellers at heart, we are
              happiest creating original work that connects with audiences across
              the world.
            </p>
            <p className="text-muted/70 leading-relaxed">
              Our projects span Television Commercials, Episodic Series, Public
              Service Announcements, Channel Idents, Music Videos, Short Films
              and Feature Length Films. We work across every medium — from
              traditional 2D to stop motion, puppet, cut-out, 3D CGI and mixed
              media.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              <WordReveal text="Now writing India's" as="span" />
              <br />
              <WordReveal text="anime chapter." as="span" className="text-primary" />
            </div>
            <p className="text-muted/70 leading-relaxed mb-8">
              TRIO is Vaibhav Studios&apos; most ambitious original — a full-fledged
              anime born from two decades of craft and an unwavering belief that
              Indian stories deserve a global stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <TransitionLink
                href="/about"
                className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
              >
                Learn more
              </TransitionLink>
              <a
                href="https://www.vaibhavstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Visit Vaibhav Studios ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
