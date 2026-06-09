'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordReveal from "@/components/WordReveal"
import TransitionLink from "@/components/TransitionLink"

const EASE = [0.16, 1, 0.3, 1] as const

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ text, secondLine, delay = 0 }: { text: string; secondLine?: string; delay?: number }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="font-display text-3xl font-bold text-white md:text-4xl">
        <WordReveal text={text} as="h2" className="inline" delay={delay} />
        {secondLine && (
          <>
            <br />
            <WordReveal text={secondLine} as="span" className="inline" delay={delay} />
          </>
        )}
      </div>
      <div className="mt-3 h-px w-16 bg-primary" />
    </div>
  )
}

const servicesAll = [
  '2D Animation',
  '3D Modelling',
  'Motion Graphics',
  'Infographics',
  'Character Design (2D & 3D)',
  'Storyboarding',
  'VFX',
  'Video Editing',
  'Roto',
  'Logo Design',
  'Content Creation',
  'Multimedia',
]

const milestones = [
  {
    year: '2018',
    title: 'Studio Founded',
    description:
      'Vaibhavi Studios was founded as an independent creative house under Vaibhavi Enterprises, driven by a passion for animation, visual effects, and design.',
  },
  {
    year: '2019–2021',
    title: 'EDU Venture & Early Projects',
    description:
      'Contributed to EDU Venture for Notebook design and educational content. Built a reputation for high-quality motion graphics, infographics, and logo design.',
  },
  {
    year: '2022',
    title: 'VFX for Thallaiva',
    description:
      'Delivered VFX shots for the feature film Thallaiva, showcasing the studio&apos;s technical capabilities in visual effects and compositing.',
  },
  {
    year: '2023',
    title: 'Academic Publication by Emerald',
    description:
      'Cartoon Case Study content creation work was published by Emerald Publishing, marking a milestone in research-driven animation and content development.',
  },
  {
    year: 'Present',
    title: 'TRIO — First Anime of India',
    description:
      'Vaibhavi Studios pushes new frontiers with TRIO, India&apos;s first original anime — bringing together years of creative expertise and a bold new visual language for a global audience.',
  },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-bg/90 backdrop-blur-sm">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col justify-end px-5 sm:px-10 md:px-16 pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(156,254,8,0.06),transparent)]" />

        <FadeIn>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            The Studio Behind TRIO
          </p>
        </FadeIn>

        <div className="font-display text-5xl sm:text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.95] max-w-4xl">
          <WordReveal text="Vaibhavi" as="h1" className="text-white" delay={0.1} />
          <br />
          <WordReveal text="Studios" as="span" className="text-primary" delay={0.1} />
        </div>

        <FadeIn delay={0.3} className="mt-6 max-w-xl">
          <p className="text-base md:text-lg text-muted/70 leading-relaxed">
            An independent creative house under Vaibhavi Enterprises — specialising in
            animation, motion graphics, VFX, design, and content creation since 2018.
          </p>
        </FadeIn>

        <motion.div
          className="mt-12 h-px w-full max-w-4xl bg-white/8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 py-14 md:py-20">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
          {[
            { value: '2018', label: 'Founded' },
            { value: '100%', label: 'Client satisfaction' },
            { value: '12', label: 'Service disciplines' },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="bg-bg/80 backdrop-blur-sm px-6 py-8">
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-none">
                {s.value}
              </p>
              <p className="mt-2 text-xs text-muted/50 uppercase tracking-wider">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── About copy ───────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 py-14 md:py-20 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-6xl">
          <div>
            <SectionHeading text="Creativity meets" secondLine="craftsmanship." />
            <FadeIn delay={0.1}>
              <p className="text-muted/65 leading-relaxed mb-4">
                Vaibhavi Studios is an independent house under Vaibhavi Enterprises into the field of
                Infographic, Motion Graphics, Character Design (2D &amp; 3D), Storyboarding, VFX,
                Video Editing, Content Creation, and Logo Design. We have been in this field since
                2018 having contributions to EDU Venture for Notebook, VFX shots for Movie
                Thallaiva, Cartoon Case Study content creation and getting published by Emerald
                Publishing, and many more.
              </p>
              <p className="text-muted/65 leading-relaxed">
                Having 100% customer satisfaction achieved we convey our deepest gratitude to all
                the people for trusting, trying and believing us. We at Vaibhavi Studios are experts
                in 2D Animation, Roto, Video Editing, Logo Design, 3D Modelling, Storyboarding, and
                Multimedia.
              </p>
            </FadeIn>
          </div>
          <div>
            <SectionHeading text="What we do." delay={0.1} />
            <FadeIn delay={0.2}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {servicesAll.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-muted/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 py-14 md:py-20 border-t border-white/5">
        <SectionHeading text="Our journey." />

        <div className="relative max-w-3xl">
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/8 hidden md:block" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="flex gap-8">
                  <div className="w-20 flex-shrink-0 text-right hidden md:block pt-0.5">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                      {m.year}
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-bg mt-0.5" />
                  </div>
                  <div className="flex-1 group">
                    <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5 md:hidden">
                      {m.year}
                    </p>
                    <WordReveal text={m.title} as="h3" className="font-display text-base font-bold text-white mb-2" delay={i * 0.06} />
                    <p className="text-sm text-muted/55 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 py-16 md:py-28 border-t border-white/5">
        <div className="relative max-w-2xl">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,rgba(156,254,8,0.05),transparent)]" />
          <SectionHeading text="Now writing India's" secondLine="anime chapter." />
          <FadeIn delay={0.1}>
            <p className="text-muted/60 mb-8 leading-relaxed max-w-lg">
              TRIO is Vaibhavi Studios&apos; most ambitious original — a full-fledged
              anime born from years of creative craft and an unwavering belief that
              Indian stories deserve a global stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <TransitionLink
                href="/"
                className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
              >
                Explore TRIO
              </TransitionLink>
              <a
                href="https://www.vaibhavientp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Visit Vaibhavi Enterprises ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
