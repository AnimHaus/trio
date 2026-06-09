'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { getUserMangas } from '@/lib/storage'
import type { UserManga } from '@/lib/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import TransitionLink from '@/components/TransitionLink'

const trioVolumes = [
  { image: '/volume_1.png', title: 'Volume 1', chapters: 'Chapters 1–6', date: '2 days ago' },
  { image: '/volume_2.png', title: 'Volume 2', chapters: 'Chapters 7–12', date: '1 week ago' },
  { image: '/volume_3.png', title: 'Volume 3', chapters: 'Chapters 13–18', date: '2 weeks ago' },
  { image: '/volume_4.png', title: 'Volume 4', chapters: 'Chapters 19–24', date: '3 weeks ago' },
  { image: '/volume_5.png', title: 'Volume 5', chapters: 'Chapters 25–30', date: '1 month ago' },
]

const featured = trioVolumes[4]

function MangaCard({ image, title, chapters, date, index }: typeof trioVolumes[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#" className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
          <Image src={image} alt={title} fill sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
        <div className="mt-3">
          <h3 className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
          <p className="mt-0.5 text-xs text-muted/50">{chapters}</p>
          <p className="mt-0.5 text-[11px] text-muted/40">{date}</p>
        </div>
      </a>
    </motion.div>
  )
}

function UserMangaCard({ manga, index }: { manga: UserManga; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#" className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
          {manga.coverImage ? (
            <img src={manga.coverImage} alt={manga.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted/30 text-sm p-4 text-center leading-relaxed">
              {manga.title}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
        <div className="mt-3">
          <h3 className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors">{manga.title}</h3>
          <p className="mt-0.5 text-xs text-muted/50">by {manga.author}</p>
          <p className="mt-0.5 text-[11px] text-muted/40">{manga.chapters} chapter{manga.chapters !== 1 ? 's' : ''}</p>
        </div>
      </a>
    </motion.div>
  )
}

export default function MangaPage() {
  const [userMangas, setUserMangas] = useState<UserManga[]>([])

  useEffect(() => {
    setUserMangas(getUserMangas())
  }, [])

  const allMangas = [...userMangas].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const latestUserManga = allMangas.length > 0 ? allMangas[0] : null

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Featured Hero ─────────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-end pb-10 sm:pb-14 md:pb-20">
        <div className="absolute inset-0">
          <Image
            src={featured.image}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">Featured — Latest Release</p>
          <h1 className="font-display text-4xl font-black text-white sm:text-5xl md:text-7xl leading-none">
            {featured.title}
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted/70 leading-relaxed">
            {featured.chapters} &middot; Updated {featured.date}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90">
              Read Now <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </a>
            {latestUserManga && (
              <a href="#community" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Latest from Community <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── TRIO Volumes ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">TRIO</h2>
            <p className="mt-1 text-sm text-muted/60">Official manga volumes</p>
          </div>
          <a href="#" className="hidden text-xs text-primary hover:underline sm:block">View all &rarr;</a>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {trioVolumes.map((v, i) => (
            <MangaCard key={v.image} {...v} index={i} />
          ))}
        </div>
      </section>

      {/* ── Community Mangas ──────────────────────────────── */}
      <section id="community" className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Community</h2>
              <p className="mt-1 text-sm text-muted/60">Mangas uploaded by our creators</p>
            </div>
            <TransitionLink
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-bg transition-colors hover:bg-primary/90"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              Upload
            </TransitionLink>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* ── Manga Grid ───────────────────────────────── */}
            <div className="flex-1">
              {allMangas.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-20 text-center">
                  <p className="text-sm text-muted/40">No community mangas yet.</p>
                  <TransitionLink
                    href="/dashboard/upload"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-bg transition-colors hover:bg-primary/90"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                    Be the first to upload
                  </TransitionLink>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                  {allMangas.map((m, i) => (
                    <UserMangaCard key={m.id} manga={m} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* ── Hot Sidebar ──────────────────────────────── */}
            <div className="w-full flex-shrink-0 lg:w-64 xl:w-72">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Hot</h3>
                </div>
                <div className="space-y-1">
                  {allMangas.length === 0 ? (
                    <p className="text-xs text-muted/40 py-4 text-center">No community mangas yet</p>
                  ) : (
                    allMangas.slice(0, 10).map((m, i) => (
                      <a
                        key={m.id}
                        href="#"
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/5"
                      >
                        <span className={`w-5 text-center text-xs font-bold leading-none ${i < 3 ? 'text-primary' : 'text-muted/40'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="relative h-10 w-7 flex-shrink-0 overflow-hidden rounded bg-white/5">
                          {m.coverImage ? (
                            <img src={m.coverImage} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[8px] text-muted/30 p-0.5 text-center leading-tight">{m.title}</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-white/80 text-xs font-medium">{m.title}</p>
                          <p className="text-[11px] text-muted/40">{m.chapters} ch.</p>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
