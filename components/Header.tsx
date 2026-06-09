'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import TransitionLink from "@/components/TransitionLink"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <TransitionLink href="/" className="flex items-center gap-3">
          <Image src="/trio.png" alt="Trio Studio" width={42} height={42} className="h-9 w-auto" />
        </TransitionLink>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm text-muted/70 hover:text-primary transition-colors">Manga</a>
          <a href="#" className="text-sm text-muted/70 hover:text-primary transition-colors">Projects</a>
          <TransitionLink href="/about" className="text-sm text-muted/70 hover:text-primary transition-colors">About</TransitionLink>
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

      {open && (
        <div className="border-t border-white/5 bg-bg px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <a href="#" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Home</a>
            <a href="#" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Manga</a>
            <a href="#" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>Projects</a>
            <TransitionLink href="/about" className="text-muted/70 hover:text-primary transition-colors" onClick={() => setOpen(false)}>About</TransitionLink>
          </div>
        </div>
      )}
    </header>
  )
}
