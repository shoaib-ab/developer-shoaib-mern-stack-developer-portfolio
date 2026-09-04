"use client"

import { useState } from "react"
import Link from "next/link"
import { ALL_PROJECTS, Project } from "@/data/projects"
import { ProjectCard } from "./ProjectCard"
import { ProjectModal } from "./ProjectModal"
import { Divider } from "./Divider"

interface WorkSectionProps {
  sectionRef: (el: HTMLElement | null) => void
  projects?: Project[]
}

export function WorkSection({ sectionRef, projects = ALL_PROJECTS }: WorkSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Work"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <p className="section-label mb-3">
              03 — Selected Work
            </p>
            <h2 className="section-title font-semibold tracking-tight text-[#111110]">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[#54534F] mt-2 max-w-lg leading-relaxed">
              A selection of web applications, platforms, and tools built for real users and client businesses.
            </p>
          </div>

          <Link
            href="/work"
            className="btn-primary text-xs self-start md:self-auto py-2.5 px-4"
          >
            <span>View all {projects.length} projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom Banner to see all work */}
        <div className="mt-12 p-6 rounded-[3px] border border-[#E3E1DB] bg-[#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-sm text-[#111110]">
              Looking for more projects?
            </h4>
            <p className="text-xs text-[#54534F] mt-0.5">
              Explore the full archive including microservices, developer tools, and client platforms.
            </p>
          </div>
          <Link
            href="/work"
            className="text-xs font-semibold text-[#14A800] hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Browse all projects ({projects.length})</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Divider />
    </section>
  )
}
