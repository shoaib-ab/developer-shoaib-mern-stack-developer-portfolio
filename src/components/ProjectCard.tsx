"use client"

import { Project } from "@/data/projects"
import { ProjectPreviewImage } from "./ProjectPreviewImage"

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <article className="group bg-[#FFFFFF] border border-[#E3E1DB] rounded-[3px] overflow-hidden flex flex-col justify-between project-card-interactive card-fade-in">
      {/* Clickable Screenshot Header with smooth subtle zoom */}
      <div
        onClick={() => onOpenDetails(project)}
        className="cursor-pointer overflow-hidden p-3 bg-[#F9F8F5] border-b border-[#E3E1DB] transition-colors duration-200 group-hover:bg-[#F2F1ED]"
      >
        <div className="transition-transform duration-300 group-hover:scale-[1.015]">
          <ProjectPreviewImage project={project} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category & Status Indicator */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#14A800] font-semibold">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#54534F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
              <span>{project.liveUrl ? "Production" : "Open Source"}</span>
            </div>
          </div>

          {/* Project Title */}
          <h3
            onClick={() => onOpenDetails(project)}
            className="text-lg sm:text-xl font-semibold tracking-tight text-[#111110] group-hover:text-[#14A800] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>{project.title}</span>
            <span className="text-xs font-mono text-[#8C8B87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </h3>

          {/* Clean Human Description */}
          <p className="text-xs sm:text-sm text-[#54534F] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-[#3D3C38] bg-[#F2F1ED] px-2 py-0.5 rounded-[2px]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="font-mono text-[10px] text-[#706E68] bg-[#F2F1ED] px-1.5 py-0.5 rounded-[2px]">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-4 border-t border-[#EAE8E2] flex items-center justify-between text-xs mt-4">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="font-medium text-[#111110] hover:text-[#14A800] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>Read Details</span>
            <span aria-hidden="true">→</span>
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#54534F] hover:text-[#111110] transition-colors inline-flex items-center gap-1"
              >
                <span>Live Site</span>
                <span className="font-mono text-[10px]">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#54534F] hover:text-[#111110] transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <span className="font-mono text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
