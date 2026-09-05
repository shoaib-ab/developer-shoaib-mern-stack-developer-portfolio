"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Project } from "@/data/projects"
import { ProjectPreviewImage } from "./ProjectPreviewImage"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(project)
  const [isClosing, setIsClosing] = useState(false)
  const isClosingRef = useRef(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Smooth close handler with zero-jerk transition
  const handleAnimatedClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsClosing(true)

    // Wait for the 180ms zoom-out animation to completely finish
    setTimeout(() => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      onClose()
      setActiveProject(null)
      setIsClosing(false)
      isClosingRef.current = false
    }, 190)
  }, [onClose])

  // Sync state when incoming project prop changes
  useEffect(() => {
    if (project) {
      setActiveProject(project)
      setIsClosing(false)
      isClosingRef.current = false

      // Prevent layout shift on Windows by reserving scrollbar width
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
    }
  }, [project])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [])

  // Keyboard accessibility (ESC key)
  useEffect(() => {
    if (!activeProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleAnimatedClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeProject, handleAnimatedClose])

  if (!activeProject) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111110]/65 select-none ${
        isClosing ? "modal-backdrop-out pointer-events-none" : "modal-backdrop-in"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleAnimatedClose()
      }}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-2xl bg-[#F9F8F5] text-[#111110] max-h-[90vh] rounded-[4px] border border-[#E3E1DB] shadow-2xl flex flex-col overflow-hidden select-text ${
          isClosing ? "modal-zoom-out" : "modal-zoom-in"
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E3E1DB] flex items-center justify-between bg-[#FFFFFF] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#14A800] font-semibold uppercase tracking-wider bg-[#14A800]/10 px-2 py-0.5 rounded">
              {activeProject.category}
            </span>
            <span className="text-[#C4C2BA]">•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#54534F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
              {activeProject.liveUrl ? "Production System" : "Open Source Project"}
            </span>
          </div>

          <button
            onClick={handleAnimatedClose}
            className="w-8 h-8 rounded flex items-center justify-center text-[#706E68] hover:text-[#111110] hover:bg-[#F2F1ED] transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Project Title */}
          <div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111110]"
            >
              {activeProject.title}
            </h3>
            <p className="text-sm text-[#54534F] mt-1.5 leading-relaxed">
              {activeProject.description}
            </p>
          </div>

          {/* Screenshot Preview */}
          <div>
            <ProjectPreviewImage project={activeProject} />
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#706E68]">
              About the Project
            </h4>
            <p className="text-sm text-[#2B2A28] leading-relaxed">
              {activeProject.about}
            </p>
          </div>

          {/* Key Features */}
          {activeProject.features && activeProject.features.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#706E68]">
                Key Features
              </h4>
              <ul className="space-y-2">
                {activeProject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B2A28]">
                    <span className="text-[#14A800] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#706E68]">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-[#2B2A28] bg-[#EAE8E2] px-2.5 py-1 rounded-[2px] border border-[#DDD9D0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-[#E3E1DB] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4"
              >
                Visit Live Site <span aria-hidden="true">↗</span>
              </a>
            )}
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-[#2B2A28] hover:text-[#111110] px-3 py-2 border border-[#D6D4CE] rounded-[2px] hover:bg-[#F2F1ED] transition-colors"
              >
                View on GitHub ↗
              </a>
            )}
          </div>

          <button
            onClick={handleAnimatedClose}
            className="text-xs text-[#706E68] hover:text-[#111110] transition-colors ml-auto cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
