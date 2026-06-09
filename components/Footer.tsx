import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import WordReveal from "@/components/WordReveal"
import TransitionLink from "@/components/TransitionLink"

config.autoAddCss = false

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/trio.png" alt="Trio Studio" width={42} height={42} className="h-10 w-auto" />
            <p className="mt-3 text-sm text-muted/70">
              Where imagination meets animation
            </p>
          </div>

          <div>
            <WordReveal text="Studio" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <ul className="space-y-2 text-sm text-muted/70">
              <li><TransitionLink href="/about" className="hover:text-primary transition-colors">About</TransitionLink></li>
              <li><a href="#" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <WordReveal text="Manga" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <ul className="space-y-2 text-sm text-muted/70">
              <li><a href="#" className="hover:text-primary transition-colors">Latest Releases</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Series</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Artists</a></li>
            </ul>
          </div>

          <div>
            <WordReveal text="Connect" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <div className="flex gap-4">
              <a href="#" className="text-muted/70 hover:text-primary transition-colors" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/trioanimee/" className="text-muted/70 hover:text-primary transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@trio.officialanimation" target="_blank" rel="noopener noreferrer" className="text-muted/70 hover:text-primary transition-colors" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-card/20 pt-6 text-center text-xs text-muted/50">
          &copy; {new Date().getFullYear()} Trio Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
