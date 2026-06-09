'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import WordReveal from '@/components/WordReveal'

const releases = [
  { image: '/volume_1.png' },
  { image: '/volume_2.png' },
  { image: '/volume_3.png' },
  { image: '/volume_4.png' },
  { image: '/volume_5.png' },
]

export default function LatestReleases() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' })
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-14 md:py-24 bg-black/50 snap-start">
      <div ref={headingRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WordReveal text="Latest Releases" as="h2" className="font-display text-3xl font-bold text-primary md:text-5xl" />
        <motion.div
          className="mt-2 h-0.5 w-20 bg-primary"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={headingInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div
        ref={constraintsRef}
        className="relative mt-16 mx-auto max-w-7xl"
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          className="flex gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8 w-max cursor-grab active:cursor-grabbing"
        >
          {releases.map((release, index) => (
            <ReleaseCard key={release.image} image={release.image} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ReleaseCard({ image, index }: { image: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative w-[200px] flex-shrink-0 sm:w-[260px] md:w-[300px]">
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
        className="group relative overflow-hidden rounded-lg"
      >
        <div className="h-[40vh] md:h-[63vh] w-full relative overflow-hidden">
          <Image
            src={image}
            alt={`Manga volume ${index + 1}`}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-colors rounded-lg pointer-events-none" />
      </motion.div>
    </div>
  )
}
