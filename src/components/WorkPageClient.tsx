"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ALL_PROJECTS, CATEGORIES, Project, ProjectCategory } from "@/data/projects"
import { ProjectCard } from "./ProjectCard"
import { ProjectModal } from "./ProjectModal"

export function WorkPageClient({ initialProjects = ALL_PROJECTS }: { initialProjects?: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = initialProjects

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      const searchOk =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.about.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))

      return catOk && searchOk
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="bg-[#F9F8F5] min-h-screen text-[#111110]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 h-[68px] bg-[#F9F8F5]/90 backdrop-blur-md border-b border-[#E5E3DE] transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-sans text-base font-bold tracking-tight text-[#111110] flex items-center gap-1.5 group"
            aria-label="Back to homepage"
          >
            <span>Shoaib</span>
            <span className="text-[#14A800] text-lg leading-none transition-transform duration-200 group-hover:scale-125">
              .
            </span>
          </Link>

          <span className="font-mono text-xs text-[#54534F]">
            <span className="text-[#111110] font-semibold">{filteredProjects.length}</span> of {projects.length} projects
          </span>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-16 pb-24 max-w-7xl mx-auto space-y-10">
        {/* Page Hero */}
        <section aria-labelledby="work-heading" className="pt-12 md:pt-16 pb-6 border-b border-[#E5E3DE]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#54534F]">
              <span>03 — Work</span>
              <span className="text-[#C4C2BA]">/</span>
              <span>Portfolio</span>
            </div>

            <h1 id="work-heading" className="page-title font-semibold tracking-tight text-[#111110]">
              All Projects
            </h1>

            <p className="text-base sm:text-lg text-[#54534F] leading-relaxed">
              A collection of web applications, commercial platforms, and tools built with React, Next.js, Node.js, and modern cloud technologies.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section aria-label="Search and category filters" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category
                const count = categoryCounts[category] ?? 0

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`font-sans text-xs px-3.5 py-2 rounded-[2px] flex items-center gap-2 transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#111110] text-[#F9F8F5]"
                        : "bg-[#FFFFFF] border border-[#E5E3DE] text-[#54534F] hover:bg-[#F2F1ED] hover:text-[#111110]"
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] font-mono ${
                        isActive ? "text-[#14A800]" : "text-[#8C8B87]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8B87]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="project-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or tech (e.g. Stripe)..."
                className="w-full pl-9 pr-9 py-2 bg-[#FFFFFF] border border-[#E5E3DE] rounded-[2px] font-sans text-xs sm:text-sm text-[#111110] placeholder-[#8C8B87] focus:outline-none focus:border-[#111110] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8C8B87] hover:text-[#111110] text-xs cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section aria-label="Project list">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center border border-[#E5E3DE] rounded-[3px] bg-[#FFFFFF] p-8">
              <p className="font-sans text-base font-semibold text-[#111110] mb-2">
                No projects matched your search.
              </p>
              <p className="text-xs text-[#54534F] mb-6">
                Try searching for another technology or click reset to view all projects.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                }}
                className="btn-primary text-xs py-2 px-4 cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div
              key={`${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 card-fade-in"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={setSelectedProject}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="border-t border-[#E5E3DE] px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="font-mono text-xs text-[#8C8B87]">
          © {new Date().getFullYear()} Shoaib • Full-Stack Developer
        </p>
        <Link
          href="/"
          className="font-sans text-xs text-[#54534F] hover:text-[#111110] transition-colors"
        >
          ← Back to portfolio homepage
        </Link>
      </footer>
    </div>
  )
}
