"use client"

import { useState } from "react"
import { Project } from "@/data/projects"

interface ProjectRowProps {
  project: Project
  isLast: boolean
}

export function ProjectRow({ project, isLast }: ProjectRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <article className="border-t border-[#E3E1DB]">
      <div className="py-7 md:py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Project Details (Left & Center) */}
          <div className="flex-1 min-w-0 w-full">
            {/* Number + Name + Year */}
            <div className="flex items-baseline gap-4 md:gap-6 mb-2">
              <span className="font-mono text-xs font-semibold text-[#54534F] tracking-[0.06em] shrink-0">
                {project.num}
              </span>
              <h3 className="project-title font-semibold tracking-tight text-[#111110]">
                {project.name}
              </h3>
              <span className="font-mono text-xs text-[#54534F] tracking-[0.06em]">
                {project.year}
              </span>
            </div>

            {/* Role */}
            <p className="font-mono text-xs text-[#3D3C38] tracking-[0.05em] mb-3 ml-[2.25rem] md:ml-[2.75rem]">
              {project.role}
            </p>

            {/* Outcome Line — Visible by default */}
            <p className="text-sm text-[#2B2A28] font-medium leading-relaxed mb-4 ml-[2.25rem] md:ml-[2.75rem] max-w-2xl">
              {project.outcomeLine}
            </p>

            {/* Default Tech Tags — Visible by default */}
            <div className="flex flex-wrap items-center gap-2 ml-[2.25rem] md:ml-[2.75rem]">
              {project.defaultTech.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Project Browser Frame Thumbnail & Expand Trigger (Right) */}
          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
            {/* Minimal Architectural Spec Card */}
            <div
              className="hidden sm:flex flex-col justify-between w-48 h-24 p-3 bg-[#FFFFFF] border border-[#E3E1DB] rounded-[2px] cursor-pointer hover:border-[#111110] transition-all group/card shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              onClick={() => setOpen((v) => !v)}
              title="Click to toggle case study"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#706E68]">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#14A800] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
                  Production
                </span>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold text-[#111110] group-hover/card:text-[#14A800] transition-colors truncate">
                  {project.name}
                </p>
                <p className="font-mono text-[10px] text-[#8C8B87] mt-0.5">
                  {project.year} · Case Study {open ? "−" : "+"}
                </p>
              </div>
            </div>

            {/* Expand Case Study Trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="font-mono text-xs px-3 py-1.5 rounded border border-[#E3E1DB] text-[#111110] hover:bg-[#F0EFEA] transition-colors flex items-center gap-1.5 shrink-0"
              aria-expanded={open}
            >
              <span>{open ? "Close" : "Case Study"}</span>
              <span className="text-[#14A800] font-bold">{open ? "−" : "+"}</span>
            </button>
          </div>
        </div>

        {/* Deep Case Study Detail Drawer (Expanded on Click) */}
        {open && (
          <div className="mt-6 pt-6 border-t border-[#E3E1DB] bg-[#F0EFEA]/50 p-6 rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="md:col-span-2 space-y-4">
                <p className="section-label">
                  Project Overview & Architecture
                </p>
                <p className="text-base text-[#111110] leading-relaxed">
                  {project.longDescription ?? project.description}
                </p>

                <div className="pt-2 flex items-center gap-5">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="font-medium text-sm flex items-center gap-1.5 text-[#111110] hover:text-[#14A800] transition-colors"
                  >
                    Live site <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="font-medium text-sm flex items-center gap-1.5 text-[#54534F] hover:text-[#111110] transition-colors"
                  >
                    Case study details <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4 border-l border-[#E3E1DB] pl-0 md:pl-6">
                <div>
                  <p className="section-label mb-2">
                    Full Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-label mb-1">
                    Role
                  </p>
                  <p className="text-sm font-medium text-[#111110]">
                    {project.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLast && <div className="border-t border-[#E3E1DB]" />}
    </article>
  )
}
