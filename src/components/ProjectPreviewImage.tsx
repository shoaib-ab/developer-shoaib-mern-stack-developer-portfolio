"use client"

import { Project } from "@/data/projects"

interface ProjectPreviewImageProps {
  project: Project
  className?: string
}

export function ProjectPreviewImage({ project, className = "" }: ProjectPreviewImageProps) {
  return (
    <div
      className={`relative w-full aspect-[16/10] rounded-[3px] border border-[#E3E1DB] overflow-hidden bg-[#161615] flex flex-col justify-between select-none shadow-[0_2px_10px_rgba(0,0,0,0.03)] ${className}`}
    >
      {/* Subtle browser chrome bar */}
      <div className="h-7 px-3 bg-[#1F1F1E] border-b border-[#2C2C2A] flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]/80" />
          <div className="w-2 h-2 rounded-full bg-[#F59E0B]/80" />
          <div className="w-2 h-2 rounded-full bg-[#10B981]/80" />
        </div>
        <div className="text-[10px] font-mono text-[#8C8B87] truncate max-w-[180px]">
          {project.liveUrl
            ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}
        </div>
        <div className="text-[10px] font-mono text-[#8C8B87]">
          {project.year}
        </div>
      </div>

      {/* Real Image Screenshot */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#0F172A]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </div>
  )
}
