import { useState, useEffect } from "react"
import Logo from "./Logo"

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "AI Recruiting", href: "#ai-recruiting" },
  { label: "Workflow", href: "#workflow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/55 backdrop-blur-2xl saturate-150 border-b border-white/80 shadow-[0_8px_28px_rgba(23,32,51,0.05)] transition-shadow duration-200 ${
        scrolled ? "shadow-[0_10px_32px_rgba(0,120,112,0.10)]" : ""
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between gap-8">
        <a href="/" aria-label="HiringEase home">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={`/${l.href}`}
              className="relative py-2 text-sm font-semibold text-[#475467] transition-colors duration-200 hover:text-[#008C86] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#00AFA8] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium text-[#475467] hover:text-[#172033] transition-colors px-4 py-2"
          >
            Sign In
          </a>
          <a
            href="/contact"
            className="text-sm font-semibold text-white bg-[#00AFA8] hover:bg-[#008C86] transition-colors px-5 py-2.5 rounded-[12px] shadow-[0_2px_8px_rgba(0,175,168,0.25)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <a
            href="/contact"
            className="text-sm font-semibold text-white bg-[#00AFA8] px-4 py-2.5 rounded-[10px]"
          >
            Get Started
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#475467] hover:text-[#172033]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E4E7EC]">
          <div className="px-6 py-2">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={`/${l.href}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3.5 text-sm font-semibold text-[#475467] border-b border-[#E4E7EC] transition-colors hover:text-[#008C86] last:border-0"
              >
                {l.label}
              </a>
            ))}
            <div className="py-4">
              <a
                href="#"
                className="block text-center text-sm font-medium text-[#475467] py-3 border border-[#E4E7EC] rounded-[10px]"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
