'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username.trim()) {
      login(username.trim())
      router.push('/dashboard')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 sm:px-6">
      <div className="w-full max-w-sm px-2">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl">Welcome</h1>
          <p className="mt-2 text-sm text-muted/60">Enter your name to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted/60 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  )
}
