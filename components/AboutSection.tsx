'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordReveal from '@/components/WordReveal'
import TransitionLink from '@/components/TransitionLink'

const stats = [
  { value: '2018', label: 'Founded' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '50+', label: 'Projects delivered' },
  { value: '10+', label: 'Services offered' },
]

const services = [
  '2D Animation', '3D Modelling', 'Motion Graphics', 'Infographics',
  'Character Design', 'Storyboarding', 'VFX', 'Video Editing',
  'Roto', 'Logo Design', 'Content Creation', 'Multimedia',
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
    <section className="relative w-full overflow-hidden py-24 md:py-36 bg-black/50 inset-0">
      {/* Subtle green glow top-right */}
      <div className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      {/* Subtle glow bottom-left */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">

        {/* ── Header row ───────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 md:mb-28">
          <div>
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary mb-5">
                The Studio Behind TRIO
              </p>
            </FadeIn>
            <div className="font-display text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              <WordReveal text="Vaibhavi" as="span" className="text-white" delay={0.05} />
              <br />
              <WordReveal text="Studios." as="span" className="text-primary" delay={0.12} />
            </div>
          </div>

          <FadeIn delay={0.2} className="lg:max-w-sm xl:max-w-md">
            <p className="text-base text-muted/70 leading-relaxed border-l-2 border-primary/40 pl-5">
              An independent creative house under Vaibhavi Enterprises — crafting compelling visuals,
              motion graphics, character design, and VFX since 2018. We bring stories to life across
              every medium.
            </p>
            <TransitionLink
              href="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
            >
              Learn more
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </TransitionLink>
          </FadeIn>
        </div>

        {/* ── Stats row ────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/5 mb-20 md:mb-28">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="border-b border-r border-white/5 px-6 py-8 md:py-10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <p className="font-display text-4xl sm:text-5xl font-black text-primary tabular-nums">{s.value}</p>
              <p className="mt-2 text-xs text-muted/50 uppercase tracking-widest">{s.label}</p>
            </FadeIn>
          ))}
        </div>

        {/* ── Two-col body ─────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-28">
          {/* Left */}
          <FadeIn>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-snug text-white mb-6">
              <WordReveal text="Creativity meets" as="span" />
              <br />
              <WordReveal text="craftsmanship." as="span" className="text-primary" />
            </h3>
            <div className="space-y-4 text-muted/60 leading-relaxed text-sm md:text-base">
              <p>
                Vaibhavi Studios specialises in Infographic, Motion Graphics, Character Design
                (2D &amp; 3D), Storyboarding, VFX, Video Editing, Content Creation, and Logo Design
                — delivering across diverse projects since 2018.
              </p>
              <p>
                Our work spans EDU Venture notebooks, VFX shots for the movie Thallaiva, and
                Cartoon Case Study content published by Emerald Publishing, among many others.
              </p>
            </div>
          </FadeIn>

          {/* Right — services */}
          <FadeIn delay={0.15}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 mb-5">What we do</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {services.map((s, i) => (
                <motion.li
                  key={s}
                  className="flex items-center gap-2.5 text-sm text-muted/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="h-1 w-4 rounded-full bg-primary/60 flex-shrink-0" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
