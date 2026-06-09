'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { addUserManga } from '@/lib/storage'

export default function UploadPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [chapters, setChapters] = useState(1)
  const [coverImage, setCoverImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!title.trim() || !author.trim() || !description.trim() || !genre.trim()) {
      setError('All fields are required')
      return
    }

    addUserManga({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      genre: genre.trim(),
      chapters,
      coverImage: coverImage.trim(),
      updatedAt: new Date().toISOString(),
      uploadedBy: user!,
    })

    setSuccess(true)
    setTitle('')
    setAuthor('')
    setDescription('')
    setGenre('')
    setChapters(1)
    setCoverImage('')
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-xl px-4 pt-28 pb-16 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl">Upload Manga</h1>
          <p className="mt-1 text-sm text-muted/60">Share your creation with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-muted/60 mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors"
                placeholder="Manga title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted/60 mb-1">Author</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors"
                placeholder="Author name"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted/60 mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors resize-none"
              placeholder="Tell readers what your manga is about..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-muted/60 mb-1">Genre</label>
              <input
                type="text"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors"
                placeholder="e.g. Action, Fantasy"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted/60 mb-1">Chapters</label>
              <input
                type="number"
                min={1}
                required
                value={chapters}
                onChange={(e) => setChapters(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted/60 mb-1">Cover Image URL (optional)</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-muted/40 outline-none focus:border-primary/50 transition-colors"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
          {success && <p className="text-xs text-primary">Manga uploaded successfully!</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-primary/90"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-muted/60 transition-colors hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
