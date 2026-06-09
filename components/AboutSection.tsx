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
          <WordReveal text="Vaibhavi" as="span" className="text-white" delay={0.1} />
          <br />
          <WordReveal text="Studios" as="span" className="text-primary" delay={0.1} />
        </div>

        <FadeIn delay={0.2} className="mt-5 max-w-2xl">
          <p className="text-base md:text-lg text-muted/80 leading-relaxed">
            An independent creative house under Vaibhavi Enterprises — crafting compelling visuals,
            motion graphics, character design, and VFX since 2018. We bring stories to life across
            every medium.
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
              <WordReveal text="Creativity meets" as="span" />
              <br />
              <WordReveal text="craftsmanship." as="span" className="text-primary" />
            </div>
            <p className="text-muted/70 leading-relaxed mb-4">
              Vaibhavi Studios is an independent house under Vaibhavi Enterprises, specialising in
              Infographic, Motion Graphics, Character Design (2D &amp; 3D), Storyboarding, VFX,
              Video Editing, Content Creation, and Logo Design. We&apos;ve been in this field since
              2018, delivering across diverse projects.
            </p>
            <p className="text-muted/70 leading-relaxed">
              Our work spans contributions to EDU Venture for Notebooks, VFX shots for the movie
              Thallaiva, Cartoon Case Study content creation published by Emerald Publishing, and
              many more. With 100% customer satisfaction, we convey our deepest gratitude to
              everyone who trusted, tried, and believed in us.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              <WordReveal text="What we do." as="span" />
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-muted/70 mb-8">
              {[
                '2D Animation',
                '3D Modelling',
                'Motion Graphics',
                'Infographics',
                'Character Design',
                'Storyboarding',
                'VFX',
                'Video Editing',
                'Roto',
                'Logo Design',
                'Content Creation',
                'Multimedia',
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <TransitionLink
                href="/about"
                className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
              >
                Learn more
              </TransitionLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
