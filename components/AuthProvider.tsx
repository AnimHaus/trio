"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { getUsername, setUsername as saveUsername, clearUsername } from "@/lib/storage"

interface AuthContextValue {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    setUser(getUsername())
  }, [])

  const login = useCallback((username: string) => {
    saveUsername(username)
    setUser(username)
  }, [])

  const logout = useCallback(() => {
    clearUsername()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
