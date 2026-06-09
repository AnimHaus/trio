export interface UserManga {
  id: string
  title: string
  author: string
  description: string
  coverImage: string
  chapters: number
  genre: string
  createdAt: string
  updatedAt: string
  uploadedBy: string
}

const MANGA_KEY = "trio_user_mangas"
const USERNAME_KEY = "trio_username"

export function getUsername(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(USERNAME_KEY)
}

export function setUsername(name: string) {
  localStorage.setItem(USERNAME_KEY, name)
}

export function clearUsername() {
  localStorage.removeItem(USERNAME_KEY)
}

export function getUserMangas(): UserManga[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(MANGA_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addUserManga(manga: Omit<UserManga, "id" | "createdAt">): UserManga {
  const mangas = getUserMangas()
  const newManga: UserManga = {
    ...manga,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  mangas.push(newManga)
  localStorage.setItem(MANGA_KEY, JSON.stringify(mangas))
  return newManga
}

export function deleteUserManga(id: string) {
  const mangas = getUserMangas().filter((m) => m.id !== id)
  localStorage.setItem(MANGA_KEY, JSON.stringify(mangas))
}
