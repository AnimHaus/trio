'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TransitionLink from "@/components/TransitionLink"
import { useAuth } from "@/components/AuthProvider"

export default function Header() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled
            ? "bg-bg/50 backdrop-blur-md border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDuration: "400ms",
        }}
      >
        <nav className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <TransitionLink href="/" className="flex items-center gap-3">
            <Image src="/trio.png" alt="Vaibhavi Studios" width={42} height={42} className="h-9 w-auto" />
          </TransitionLink>

          <div className="hidden items-center gap-8 md:flex">
            <TransitionLink href="/manga" className="text-sm text-muted/70 hover:text-primary transition-colors">Manga</TransitionLink>
            <TransitionLink href="/about" className="text-sm text-muted/70 hover:text-primary transition-colors">About</TransitionLink>
            {user ? (
              <TransitionLink href="/dashboard" className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-bg transition-colors hover:bg-primary/90">Dashboard</TransitionLink>
            ) : (
              <TransitionLink href="/login" className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10">Sign In</TransitionLink>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-muted transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-muted transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-muted transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg md:hidden"
          >
            <div className="flex flex-col items-center gap-6 text-lg">
              <TransitionLink href="/" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Home</TransitionLink>
              <TransitionLink href="/manga" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Manga</TransitionLink>
              <TransitionLink href="/about" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>About</TransitionLink>
              {user ? (
                <TransitionLink href="/dashboard" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Dashboard</TransitionLink>
              ) : (
                <TransitionLink href="/login" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Sign In</TransitionLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
