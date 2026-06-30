import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
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
            <Image src="/trio.png" alt="Vaibhavi Studios" width={42} height={42} className="h-10 w-auto" />
          </div>

          <div>
            <WordReveal text="Studio" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <ul className="space-y-2 text-sm text-muted/70">
              <li><TransitionLink href="/about" className="hover:text-primary transition-colors">About</TransitionLink></li>
              <li><a href="#" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="https://trio-manga.vercel.app/careers" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <WordReveal text="Manga" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <ul className="space-y-2 text-sm text-muted/70">
              <li><TransitionLink href="/manga" className="hover:text-primary transition-colors">Latest Releases</TransitionLink></li>
              <li><a href="#" className="hover:text-primary transition-colors">Series</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Artists</a></li>
            </ul>
          </div>

          <div>
            <WordReveal text="Connect" as="h4" className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted" />
            <div className="flex gap-4 mb-4">
              <a href="https://www.linkedin.com/in/vaibhavi-studios-2008b0209/" target="_blank" rel="noopener noreferrer" className="text-muted/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/trioanimee/" target="_blank" rel="noopener noreferrer" className="text-muted/70 hover:text-primary transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@trio.officialanimation" target="_blank" rel="noopener noreferrer" className="text-muted/70 hover:text-primary transition-colors" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </a>
            </div>
            <div className="flex gap-2">
              <a href="https://apps.apple.com/in/app/trio-vaibhavi-studios/id6751782028" target="_blank" rel="noopener noreferrer">
                <img src="https://pub-936a2a79cb9b473fabc46e4ad35a3e2e.r2.dev/apple-store.webp" alt="Download on the App Store" className="h-10 w-auto" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.vaibhavistudios.app" target="_blank" rel="noopener noreferrer">
                <img src="https://pub-936a2a79cb9b473fabc46e4ad35a3e2e.r2.dev/app-store.webp" alt="Get it on Google Play" className="h-14.5 w-auto -mt-2.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-card/20 pt-6 flex justify-between items-center gap-1 text-xs text-muted/50">
          <span>&copy; {new Date().getFullYear()} Vaibhavi Studios. All rights reserved.</span>
          <span>Developed by <a href="https://animhaus.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">AnimHaus</a></span>
        </div>
      </div>
    </footer>
  )
}
