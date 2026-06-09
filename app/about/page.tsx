'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordReveal from "@/components/WordReveal"
import TransitionLink from "@/components/TransitionLink"

// ─── shared ease ────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// ─── fade + rise (used for body copy, cards, etc.) ──────────────────────────
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

// ─── section heading with accent line ───────────────────────────────────────
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

const stats = [
  { value: '2003', label: 'Founded' },
  { value: '20+', label: 'Years of storytelling' },
  { value: '1', label: 'International Emmy Nomination' },
  { value: '4+', label: 'Seasons of Lamput' },
]

const milestones = [
  {
    year: '2003',
    title: 'Studio Founded',
    description:
      'Vaibhav Studios was founded in Mumbai by Vaibhav Kumaresh with a mission to create original animated content rooted in Indian storytelling.',
  },
  {
    year: '2000–2015',
    title: 'Simpoo & Channel [V]',
    description:
      'SS Sodhi AKA Simpoo — the animated angry math teacher voiced by Vaibhav Kumaresh himself — became a cult figure on Asia\'s youth channel Channel [V], entertaining millions for over a decade.',
  },
  {
    year: '2015',
    title: 'Lamput Debuts on Cartoon Network',
    description:
      'Lamput, the studio\'s flagship original series, launched on Cartoon Network APAC. The show\'s wordless, slapstick storytelling resonated globally and went into multiple seasons.',
  },
  {
    year: '2022',
    title: 'International Emmy Nomination',
    description:
      'Lamput earned Vaibhav Studios an International Emmy Award nomination — making it the only Indian animation studio to receive this honour.',
  },
  {
    year: 'Present',
    title: 'TRIO — First Anime of India',
    description:
      'Vaibhav Studios pushes new frontiers with TRIO, India\'s first original anime — bringing together decades of animation expertise and a bold new visual language for a global audience.',
  },
]

const capabilities = [
  'Traditional 2D Animation',
  'Digital 3D CGI',
  'Stop Motion',
  'Puppet & Cut-Out',
  'Mixed Media',
  'Episodic Series',
  'Feature Films',
  'TV Commercials',
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-bg/90 backdrop-blur-sm">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col justify-end px-5 sm:px-10 md:px-16 pb-16 pt-36">
        {/* subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(156,254,8,0.06),transparent)]" />

        <FadeIn>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            The Studio Behind TRIO
          </p>
        </FadeIn>

        <div className="font-display text-5xl sm:text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.95] max-w-4xl">
          <WordReveal text="Vaibhav" as="h1" className="text-white" delay={0.1} />
          <br />
          <WordReveal text="Studios" as="span" className="text-primary" delay={0.1} />
        </div>

        <FadeIn delay={0.3} className="mt-6 max-w-xl">
          <p className="text-base md:text-lg text-muted/70 leading-relaxed">
            India's favourite animation studio — the only Indian studio to receive an
            International Emmy nomination — now bringing you the country's first original anime.
          </p>
        </FadeIn>

        {/* divider */}
        <motion.div
          className="mt-12 h-px w-full max-w-4xl bg-white/8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
          {stats.map((s, i) => (
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
            <SectionHeading text="Storytellers first," secondLine="animators always." />
            <FadeIn delay={0.1}>
              <p className="text-muted/65 leading-relaxed mb-4">
                Founded in 2003, Vaibhav Studios has produced some of India's most
                successful and beloved animated content. We script, design, direct
                and produce animation films — and as storytellers at heart, we are
                happiest creating original work that connects with audiences across
                the world.
              </p>
              <p className="text-muted/65 leading-relaxed">
                Our projects span Television Commercials, Episodic Series, Public
                Service Announcements, Channel Idents, Music Videos, Short Films
                and Feature Length Films. We work across every medium — from
                traditional 2D to stop motion, puppet, cut-out, 3D CGI and mixed
                media.
              </p>
            </FadeIn>
          </div>
          <div>
            <SectionHeading text="What we do." delay={0.1} />
            <FadeIn delay={0.2}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-2.5 text-sm text-muted/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {cap}
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
          {/* vertical rail */}
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
          <SectionHeading text="Now writing India's anime chapter." />
          <FadeIn delay={0.1}>
            <p className="text-muted/60 mb-8 leading-relaxed max-w-lg">
              TRIO is Vaibhav Studios' most ambitious original — a full-fledged
              anime born from two decades of craft and an unwavering belief that
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
      </section>

    </div>
  )
}
