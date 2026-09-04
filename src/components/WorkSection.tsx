"use client"

import Link from "next/link"
import { ALL_PROJECTS } from "@/data/projects"
import { ProjectRow } from "./ProjectRow"
import { Divider } from "./Divider"

interface WorkSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

export function WorkSection({ sectionRef }: WorkSectionProps) {
  const featuredProjects = ALL_PROJECTS.filter((p) => p.featured)

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Work"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <p className="section-label">
            03 — Selected Work
          </p>
          <Link
            href="/work"
            className="section-label flex items-center gap-2 text-[#54534F] hover:text-[#111110] transition-colors duration-150"
          >
            All work <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          {featuredProjects.map((project, i, arr) => (
            <ProjectRow key={project.num} project={project} isLast={i === arr.length - 1} />
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}
