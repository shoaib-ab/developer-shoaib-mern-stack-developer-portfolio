"use client"

import { useState } from "react"
import { ExperienceItem } from "@/data/experience"

interface ExperienceRowProps {
  job: ExperienceItem
  isLast: boolean
}

export function ExperienceRow({ job, isLast }: ExperienceRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <article className="border-t border-[#E3E1DB]">
      <div className="py-7 md:py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4 mb-1">
              <h3 className="job-title font-semibold tracking-tight text-[#111110]">
                {job.company}
              </h3>
              <span className="font-mono text-xs text-[#14A800] font-medium tracking-[0.06em]">
                {job.period}
              </span>
            </div>
            <p className="font-mono text-xs text-[#54534F] tracking-[0.05em]">
              {job.role}
            </p>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs px-3 py-1 rounded-[2px] border border-[#E2DFD7] bg-[#FFFFFF] text-[#111110] hover:bg-[#FAF9F6] transition-colors flex items-center gap-1.5 shrink-0 self-end md:self-auto shadow-2xs"
            aria-expanded={open}
          >
            <span>{open ? "Less" : "More details"}</span>
            <span className="text-[#14A800] font-bold">{open ? "−" : "+"}</span>
          </button>
        </div>

        {/* Visible 1 Key Highlight Bullet by Default */}
        <div className="flex items-start gap-3 text-sm text-[#2B2A28] font-medium leading-relaxed max-w-3xl">
          <span
            className="mt-[0.45rem] shrink-0 w-1.5 h-1.5 rounded-full bg-[#14A800]"
            aria-hidden="true"
          />
          <p>{job.highlightBullet}</p>
        </div>

        {/* Expanded Additional Details */}
        {open && (
          <div className="mt-5 p-5 sm:p-6 border border-[#E2DFD7] bg-[#FFFFFF] rounded-[3px] shadow-xs space-y-4">
            <p className="text-base text-[#111110] leading-relaxed">
              {job.description}
            </p>
            <div>
              <p className="section-label mb-3">
                Key Deliverables & Architecture
              </p>
              <ul className="space-y-2.5">
                {job.contributions.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-[#4A4945] leading-relaxed">
                    <span
                      className="mt-[0.45rem] shrink-0 w-1.5 h-1.5 rounded-full bg-[#14A800]"
                      aria-hidden="true"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {isLast && <div className="border-t border-[#E3E1DB]" />}
    </article>
  )
}
