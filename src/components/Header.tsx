"use client"

import { useState, useRef, useEffect } from "react"
import { SECTIONS } from "@/data/sections"

interface HeaderProps {
  currentSection: number
  onGoToSection: (index: number) => void
}

export function Header({ currentSection, onGoToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  // Measure and smoothly animate the sliding pill indicator
  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = itemRefs.current[currentSection]
      const navContainer = navRef.current
      if (activeBtn && navContainer) {
        const navRect = navContainer.getBoundingClientRect()
        const btnRect = activeBtn.getBoundingClientRect()
        setIndicatorStyle({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
          opacity: 1,
        })
      }
    }

    // Run on initial mount & whenever active section changes
    updateIndicator()

    // Re-calculate on window resize
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [currentSection])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#FAF9F6]/75 backdrop-blur-md border-b border-[#E0DCD3]/90 transition-all duration-300 border-2">
      <div className="max-w-7xl mx-auto h-full px-8 md:px-16 lg:px-24 flex items-center justify-between relative">
        {/* Brand Logo (Left) */}
        <div className="flex items-center z-10">
          <button
            onClick={() => onGoToSection(0)}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Go to top"
          >
            {/* Inline SVG logo — matches favicon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-8 h-8 shrink-0"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hdr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18181B" />
                  <stop offset="100%" stopColor="#09090B" />
                </linearGradient>
                <linearGradient id="hdr-s" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F4F4F5" />
                </linearGradient>
                <filter id="hdr-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#hdr-bg)" stroke="#2E2E32" strokeWidth="1.5" />
              <path
                d="M37.5 21 C36 18.5 33.2 17.2 29.5 17.2 C24.2 17.2 20.5 20.5 20.5 25.4 C20.5 33 33.5 31.8 33.5 37.6 C33.5 40.8 30.6 42.5 26.8 42.5 C22.4 42.5 19.5 39.8 18.5 36.8"
                fill="none"
                stroke="url(#hdr-s)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="43" cy="41" r="4.2" fill="#14A800" filter="url(#hdr-glow)" />
            </svg>
            <span className="font-sans text-sm font-bold tracking-tight text-[#111110] group-hover:text-[#111110] transition-colors">
              Shoaib<span className="text-[#14A800] transition-transform duration-200 inline-block group-hover:scale-125">.</span>
            </span>
          </button>
        </div>


        {/* Desktop Navigation Links (Centered with Fluid Sliding Pill) */}
        <nav
          ref={navRef}
          aria-label="Primary navigation"
          className="hidden md:flex items-center relative gap-1 bg-[#F2F1ED]/85 p-1.5 rounded-full border border-[#E5E3DE]/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)] md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          {/* Fluid Sliding Background Pill */}
          <span
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[#181817] shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
            aria-hidden="true"
          />

          {SECTIONS.map((s, i) => {
            const isActive = currentSection === i
            return (
              <button
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                key={s.id}
                onClick={() => onGoToSection(i)}
                className={`relative z-10 font-sans text-xs px-3.5 py-1.5 rounded-full transition-colors duration-200 flex items-center gap-1.5 cursor-pointer select-none ${isActive
                  ? "text-[#F9F8F5] font-medium"
                  : "text-[#3D3C38] hover:text-[#111110]"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`font-mono text-[10px] tracking-wider transition-colors duration-200 ${isActive ? "text-[#14A800] font-semibold" : "text-[#8C8B87]"
                    }`}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Action (Desktop: Resume link, Mobile: Menu toggle) */}
        <div className="flex items-center gap-3 z-10">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E5E3DE] text-[#2B2A28] hover:border-[#111110] hover:text-[#111110] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <span>Resume</span>
            <span className="font-mono text-[11px] text-[#14A800]" aria-hidden="true">↗</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#F2F1ED] border border-[#E5E3DE] text-[#111110] flex items-center gap-2 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
            <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F8F5] border-b border-[#E5E3DE] px-6 py-4 space-y-2 shadow-lg">
          {SECTIONS.map((s, i) => {
            const isActive = currentSection === i
            return (
              <button
                key={s.id}
                onClick={() => {
                  onGoToSection(i)
                  setMobileMenuOpen(false)
                }}
                className={`w-full font-sans text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors ${isActive
                  ? "bg-[#181817] text-[#F9F8F5]"
                  : "text-[#3D3C38] hover:bg-[#F2F1ED] hover:text-[#111110]"
                  }`}
              >
                <span>{s.label}</span>
                <span className={`font-mono text-[10px] tracking-[0.06em] ${isActive ? "text-[#14A800]" : "text-[#706E68]"}`}>
                  {s.num}
                </span>
              </button>
            )
          })}
          <div className="pt-2 border-t border-[#E5E3DE]">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-sans text-xs font-medium px-4 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E3DE] text-[#111110] flex items-center justify-between"
            >
              <span>Download Resume</span>
              <span className="font-mono text-[11px] text-[#14A800]">PDF ↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
