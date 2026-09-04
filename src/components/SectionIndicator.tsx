"use client"

import { SECTIONS } from "@/data/sections"

interface SectionIndicatorProps {
  currentSection: number
  onGoToSection: (index: number) => void
}

export function SectionIndicator({ currentSection, onGoToSection }: SectionIndicatorProps) {
  return (
    <>
      {/* Left Vertical Section Progress Rail (Desktop XL) */}
      <div
        className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 bg-[#F9F8F5]/80 backdrop-blur-xs p-2 rounded-full border border-[#E3E1DB]/60"
        aria-label="Section progress rail"
      >
        <div className="relative flex flex-col items-center gap-3">
          {/* Vertical connecting background line */}
          <div className="absolute top-2 bottom-2 w-[1px] bg-[#E3E1DB] -z-10" />

          {SECTIONS.map((s, i) => {
            const isActive = currentSection === i
            return (
              <button
                key={s.id}
                onClick={() => onGoToSection(i)}
                className="group relative flex items-center justify-center p-1 transition-all duration-200"
                aria-label={`Jump to section ${s.num} ${s.label}`}
              >
                {/* Progress Dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#14A800] scale-125 ring-4 ring-[#14A800]/20"
                      : "bg-[#D4D2CA] group-hover:bg-[#111110]"
                  }`}
                />

                {/* Hover Tooltip Label */}
                <span className="absolute left-full ml-3 px-2 py-1 bg-[#111110] text-[#F9F8F5] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-sm flex items-center gap-1.5 text-[10px]">
                  <span className="font-mono tracking-[0.06em] text-[#14A800]">{s.num}</span>
                  <span className="font-sans font-medium text-[#F9F8F5]">{s.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom-Right Counter Widget (All Viewports) */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3">
        <span className="flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded bg-[#F0EFEA] border border-[#E3E1DB]">
          <span className="text-[#111110] font-semibold">
            {String(currentSection + 1).padStart(2, "0")}
          </span>
          <span className="text-[#14A800] font-bold">
            /
          </span>
          <span className="text-[#54534F] font-medium tracking-[0.06em]">
            {String(SECTIONS.length).padStart(2, "0")}
          </span>
        </span>
        {(() => {
          const isLastSection = currentSection >= SECTIONS.length - 1
          return (
            <button
              disabled={isLastSection}
              onClick={() => !isLastSection && onGoToSection(currentSection + 1)}
              className={`flex items-center justify-center w-9 h-9 border rounded-[2px] shadow-sm transition-all duration-200 ${
                isLastSection
                  ? "bg-[#F0EFEA] border-[#E3E1DB] text-[#A3A199] opacity-50 cursor-not-allowed"
                  : "bg-[#F9F8F5] border-[#E3E1DB] text-[#111110] hover:bg-[#111110] hover:text-[#F9F8F5] hover:border-[#111110]"
              }`}
              aria-label={
                isLastSection
                  ? "Last section reached"
                  : `Go to ${SECTIONS[currentSection + 1]?.label}`
              }
            >
              <span className="text-sm leading-none" aria-hidden="true">
                →
              </span>
            </button>
          )
        })()}
      </div>
    </>
  )
}
