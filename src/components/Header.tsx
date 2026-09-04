"use client"

import { useState } from "react"
import { SECTIONS } from "@/data/sections"

interface HeaderProps {
  currentSection: number
  onGoToSection: (index: number) => void
}

export function Header({ currentSection, onGoToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#F9F8F5]/85 backdrop-blur-md border-b border-[#E5E3DE]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onGoToSection(0)}
            className="font-sans text-base font-bold tracking-tight text-[#111110] flex items-center gap-1.5 group"
          >
            <span>Shoaib</span>
            <span className="text-[#14A800] text-lg leading-none transition-transform duration-200 group-hover:scale-125">
              .
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1.5 bg-[#F2F1ED]/70 p-1.5 rounded-full border border-[#E5E3DE]/60">
          {SECTIONS.map((s, i) => {
            const isActive = currentSection === i
            return (
              <button
                key={s.id}
                onClick={() => onGoToSection(i)}
                className={`font-sans text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-[#111110] text-[#F9F8F5] font-medium shadow-sm"
                    : "text-[#54534F] hover:text-[#111110] hover:bg-[#E5E3DE]/50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.06em] ${
                    isActive ? "text-[#14A800]" : "text-[#54534F]/70"
                  }`}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden font-sans text-xs font-medium px-3 py-1.5 rounded-full bg-[#F2F1ED] border border-[#E5E3DE] text-[#111110] flex items-center gap-2"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
          <span>Menu</span>
        </button>
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
                className={`w-full font-sans text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                  isActive
                    ? "bg-[#111110] text-[#F9F8F5]"
                    : "text-[#54534F] hover:bg-[#F2F1ED] hover:text-[#111110]"
                }`}
              >
                <span>{s.label}</span>
                <span className={`font-mono text-[10px] tracking-[0.06em] ${isActive ? "text-[#14A800]" : "text-[#54534F]"}`}>
                  {s.num}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}
