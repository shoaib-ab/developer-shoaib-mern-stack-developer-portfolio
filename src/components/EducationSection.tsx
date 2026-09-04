"use client"

import { EDUCATION } from "@/data/education"
import { Divider } from "./Divider"

interface EducationSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

export function EducationSection({ sectionRef }: EducationSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="education"
      aria-label="Education"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12">
          05 — Education
        </p>
        <div className="space-y-6">
          {EDUCATION.map((item, i) => (
            <article key={item.degree} className="border-t border-[#E3E1DB] pt-6">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h3 className="job-title font-semibold tracking-tight text-[#111110]">
                  {item.degree}
                </h3>
                <span className="font-mono text-xs text-[#14A800] font-medium tracking-[0.06em]">
                  {item.period}
                </span>
              </div>
              <p className="font-mono text-xs text-[#3D3C38] tracking-[0.05em] mb-3">
                {item.institution} — {item.location}
              </p>
              {item.details && (
                <p className="text-sm text-[#4A4945] leading-relaxed mb-3">
                  {item.details}
                </p>
              )}
              {item.honors && (
                <div className="flex items-center gap-2">
                  <span className="tech-badge">
                    {item.honors}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}
