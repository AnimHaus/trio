'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { getUserMangas, deleteUserManga } from '@/lib/storage'
import type { UserManga } from '@/lib/storage'
import {
  getMangaAnalytics,
  aggregateAnalytics,
  formatCurrency,
  formatCompact,
  nextPayoutDate,
  type MangaAnalytics,
} from '@/lib/analytics'
import { AreaChart, BarChart } from '@/components/DashboardCharts'
import TransitionLink from '@/components/TransitionLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTrash,
  faEye,
  faBookOpen,
  faStar,
  faUsers,
  faArrowUp,
  faArrowDown,
  faWallet,
  faIndianRupeeSign,
  faMoneyBillTrendUp,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

type Metric = 'revenue' | 'views'

function Delta({ value }: { value: number }) {
  const up = value >= 0
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${up ? 'text-primary' : 'text-red-400'}`}>
      <FontAwesomeIcon icon={up ? faArrowUp : faArrowDown} className="h-2.5 w-2.5" />
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}

function StatCard({
  icon,
  label,
  value,
  delta,
  sub,
  index,
}: {
  icon: typeof faEye
  label: string
  value: string
  delta?: number
  sub?: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        </span>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      <p className="mt-4 text-2xl font-black text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted/50">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-muted/40">{sub}</p>}
    </motion.div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [mangas, setMangas] = useState<UserManga[]>([])
  const [metric, setMetric] = useState<Metric>('revenue')

  useEffect(() => {
    if (!user) router.push('/login')
    else setMangas(getUserMangas().filter((m) => m.uploadedBy === user))
  }, [user, router])

  const analytics = useMemo(() => {
    const map = new Map<string, MangaAnalytics>()
    mangas.forEach((m) => map.set(m.id, getMangaAnalytics(m)))
    return map
  }, [mangas])

  const agg = useMemo(() => aggregateAnalytics([...analytics.values()]), [analytics])

  function handleDelete(id: string) {
    deleteUserManga(id)
    setMangas((prev) => prev.filter((m) => m.id !== id))
  }

  if (!user) return null

  const payoutDate = nextPayoutDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  const chartData = metric === 'revenue' ? agg.daily.map((d) => d.revenue) : agg.daily.map((d) => d.views)
  const chartLabels = agg.daily.map((d) => d.label)

  const revenueRanked = mangas
    .map((m) => ({ manga: m, a: analytics.get(m.id)! }))
    .filter((x) => x.a)
    .sort((a, b) => b.a.revenue - a.a.revenue)

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-black text-white sm:text-4xl">Creator Dashboard</h1>
            <p className="mt-1 text-sm text-muted/60">Welcome back, {user}</p>
          </div>
          <div className="flex gap-3">
            <TransitionLink
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-bg transition-colors hover:bg-primary/90"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              Upload
            </TransitionLink>
            <button
              onClick={() => {
                logout()
                router.push('/')
              }}
              className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold text-muted/60 transition-colors hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>

        {mangas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24 text-center">
            <p className="text-sm text-muted/40">You haven&apos;t uploaded any mangas yet.</p>
            <TransitionLink
              href="/dashboard/upload"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-bg transition-colors hover:bg-primary/90"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              Upload your first manga
            </TransitionLink>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatCard
                index={0}
                icon={faEye}
                label="Total Views"
                value={formatCompact(agg.views)}
                delta={agg.viewsChange}
                sub="Lifetime across all titles"
              />
              <StatCard
                index={1}
                icon={faBookOpen}
                label="Total Reads"
                value={formatCompact(agg.reads)}
                sub={`${formatCompact(agg.followers)} followers`}
              />
              <StatCard
                index={2}
                icon={faIndianRupeeSign}
                label="Lifetime Revenue"
                value={formatCurrency(agg.revenue)}
                delta={agg.revenueChange}
                sub="After platform share"
              />
              <StatCard
                index={3}
                icon={faStar}
                label="Avg. Rating"
                value={agg.avgRating.toFixed(2)}
                sub={`${formatCompact(agg.likes)} likes`}
              />
            </div>

            {/* Revenue / payout panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="grid gap-4 lg:grid-cols-3"
            >
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent p-5 lg:col-span-1">
                <div className="flex items-center gap-2 text-primary">
                  <FontAwesomeIcon icon={faWallet} className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Earnings</span>
                </div>

                <p className="mt-4 text-[11px] uppercase tracking-wide text-muted/40">Pending payout</p>
                <p className="text-3xl font-black text-white">{formatCurrency(agg.pendingPayout, true)}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted/40">This month</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(agg.revenueThisMonth)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted/40">Lifetime</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(agg.revenue)}</p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-muted/40">
                  Next payout scheduled for <span className="text-muted/70">{payoutDate}</span>
                </p>
                <button
                  disabled
                  title="Available once your balance crosses the ₹1,000 threshold"
                  className="mt-3 w-full cursor-not-allowed rounded-full bg-primary/20 px-4 py-2 text-xs font-semibold text-primary/70"
                >
                  Request Payout
                </button>
              </div>

              {/* Trend chart */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-sm font-bold text-white">
                      <FontAwesomeIcon icon={faMoneyBillTrendUp} className="h-4 w-4 text-primary" />
                      {metric === 'revenue' ? 'Revenue' : 'Views'} — last 30 days
                    </h2>
                    <p className="mt-0.5 text-xs text-muted/50">
                      {metric === 'revenue'
                        ? formatCurrency(agg.revenueThisMonth)
                        : formatCompact(agg.daily.reduce((a, d) => a + d.views, 0))}{' '}
                      in this period
                    </p>
                  </div>
                  <div className="flex rounded-full border border-white/10 p-0.5 text-[11px]">
                    {(['revenue', 'views'] as Metric[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMetric(m)}
                        className={`rounded-full px-3 py-1 font-semibold capitalize transition-colors ${
                          metric === m ? 'bg-primary text-bg' : 'text-muted/50 hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <AreaChart
                  key={metric}
                  data={chartData}
                  labels={chartLabels}
                  format={(v) => (metric === 'revenue' ? formatCurrency(v) : formatCompact(v))}
                />
              </div>
            </motion.div>

            {/* Revenue by title */}
            {revenueRanked.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
              >
                <h2 className="mb-4 font-display text-sm font-bold text-white">Revenue by title</h2>
                <BarChart
                  data={revenueRanked.map((x) => ({ label: x.manga.title, value: Math.round(x.a.revenue) }))}
                  format={(v) => formatCurrency(v)}
                />
              </motion.div>
            )}

            {/* Per-title performance */}
            <div>
              <h2 className="mb-3 font-display text-sm font-bold text-white">Your titles</h2>
              <div className="space-y-3">
                {revenueRanked.map(({ manga: m, a }, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded bg-white/5">
                        {m.coverImage ? (
                          <img src={m.coverImage} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center p-1 text-center text-[10px] leading-tight text-muted/30">
                            {m.title}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-display text-sm font-bold text-white">{m.title}</h3>
                            <p className="truncate text-xs text-muted/50">
                              {m.genre} &middot; {m.chapters} chapter{m.chapters !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="flex-shrink-0 rounded-full p-2 text-muted/40 transition-colors hover:text-red-400"
                            aria-label="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
                          <Stat icon={faEye} label="Views" value={formatCompact(a.views)} delta={a.viewsChange} />
                          <Stat icon={faBookOpen} label="Reads" value={formatCompact(a.reads)} />
                          <Stat icon={faUsers} label="Followers" value={formatCompact(a.followers)} />
                          <Stat
                            icon={faIndianRupeeSign}
                            label="Revenue"
                            value={formatCurrency(a.revenue)}
                            delta={a.revenueChange}
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted/40">
                          <span className="inline-flex items-center gap-1">
                            <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-primary/70" />
                            {a.avgRating.toFixed(2)} rating
                          </span>
                          <span>{Math.round(a.completionRate * 100)}% completion</span>
                          <span>{formatCurrency(a.rpm)} / 1k reads</span>
                          <span className="text-primary/70">{formatCurrency(a.pendingPayout, true)} pending</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="flex items-center gap-1.5 pt-2 text-[11px] text-muted/30">
              <FontAwesomeIcon icon={faArrowRight} className="h-2.5 w-2.5" />
              Revenue figures are estimates and update daily. Payouts roll out monthly.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

function Stat({
  icon,
  label,
  value,
  delta,
}: {
  icon: typeof faEye
  label: string
  value: string
  delta?: number
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[11px] text-muted/40">
        <FontAwesomeIcon icon={icon} className="h-2.5 w-2.5" />
        {label}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-white">
        {value}
        {delta !== undefined && (
          <span className={`text-[10px] font-semibold ${delta >= 0 ? 'text-primary' : 'text-red-400'}`}>
            {delta >= 0 ? '+' : ''}
            {delta.toFixed(0)}%
          </span>
        )}
      </p>
    </div>
  )
}
