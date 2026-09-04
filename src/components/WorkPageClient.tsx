"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ALL_PROJECTS, ALL_CATEGORIES, Project } from "@/data/projects"

const POPULAR_STACKS = ["Next.js", "TypeScript", "Stripe", "Node.js", "MongoDB", "PostgreSQL"]

export function WorkPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeYear, setActiveYear] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const years = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(ALL_PROJECTS.map((p) => p.year))).sort((a, b) => Number(b) - Number(a)),
    ]
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_PROJECTS.length }
    ALL_PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory
      const yearOk = activeYear === "All" || p.year === activeYear
      
      const query = searchQuery.trim().toLowerCase()
      const searchOk =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.outcomeLine.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query))

      return catOk && yearOk && searchOk
    })
  }, [activeCategory, activeYear, searchQuery])

  return (
    <div className="bg-[#F9F8F5] min-h-screen text-[#111110]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 h-[68px] bg-[#F9F8F5]/90 backdrop-blur-md border-b border-[#E5E3DE] transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Back to portfolio homepage">
            <span
              className="font-sans text-xs font-medium px-3 py-1.5 rounded-full bg-[#F2F1ED] border border-[#E5E3DE] text-[#2B2A28] transition-all duration-200 group-hover:-translate-x-1 group-hover:bg-[#111110] group-hover:text-[#F9F8F5]"
              aria-hidden="true"
            >
              ← Back to main site
            </span>
            <span className="font-sans text-base font-bold tracking-tight text-[#111110]">
              Shoaib<span className="text-[#14A800]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#54534F]">
              <span className="text-[#111110] font-semibold">{filteredProjects.length}</span> / {ALL_PROJECTS.length} indexed
            </span>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-16 pb-24 max-w-7xl mx-auto space-y-12">
        {/* Editorial Hero Section */}
        <section aria-labelledby="work-title" className="pt-12 md:pt-16 pb-8 border-b border-[#E5E3DE]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#54534F] tracking-[0.08em] uppercase">
                03 — Index
              </span>
              <span className="text-[#C4C2BA]">/</span>
              <span className="font-sans text-xs text-[#54534F]">
                Selected Work & Systems
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 id="work-title" className="page-title font-semibold tracking-tight text-[#111110]">
                All Projects
              </h1>
              <p className="text-base text-[#54534F] max-w-md leading-relaxed">
                A complete record of commercial platforms, distributed APIs, and full-stack software engineered for production reliability and measurable scale.
              </p>
            </div>

            {/* Quiet Editorial Stat Strip (Replaces bulky AI boxes) */}
            <div className="flex flex-wrap items-baseline gap-8 md:gap-14 pt-6 border-t border-[#E5E3DE]/70">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-semibold text-[#111110]">10</span>
                <span className="font-sans text-xs text-[#54534F]">Total Projects</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-semibold text-[#14A800]">03</span>
                <span className="font-sans text-xs text-[#54534F]">Featured</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-semibold text-[#111110]">4+</span>
                <span className="font-sans text-xs text-[#54534F]">Years Experience</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-semibold text-[#14A800] bg-[#14A800]/10 px-2 py-0.5 rounded-[2px] border border-[#14A800]/20">
                  TypeScript First
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Search, Quick Filter & Sticky Category Toolbar */}
        <section aria-label="Search and filter projects" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <label htmlFor="project-search" className="sr-only">
                Search projects by keyword or tech stack
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
                placeholder="Search projects, stacks, or keywords..."
                className="w-full pl-9 pr-9 py-2 bg-[#FFFFFF] border border-[#E5E3DE] rounded-[2px] font-sans text-sm text-[#111110] placeholder-[#8C8B87] focus:outline-none focus:border-[#111110] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8C8B87] hover:text-[#111110] text-xs"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Stack Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#54534F]">
              <span className="font-sans text-[#8C8B87] mr-1">Filter by:</span>
              {POPULAR_STACKS.map((stack) => {
                const isSelected = searchQuery.toLowerCase() === stack.toLowerCase()
                return (
                  <button
                    key={stack}
                    onClick={() => setSearchQuery((q) => (q === stack ? "" : stack))}
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-[2px] transition-colors ${
                      isSelected
                        ? "bg-[#111110] text-[#F9F8F5]"
                        : "bg-[#F2F1ED] text-[#54534F] hover:bg-[#E5E3DE] hover:text-[#111110]"
                    }`}
                  >
                    {stack}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sticky Category Filter & View Toggle */}
          <div className="sticky top-[68px] z-40 bg-[#F9F8F5]/95 backdrop-blur-md py-3 border-y border-[#E5E3DE] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {ALL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                const count = categoryCounts[cat] ?? 0
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`font-sans text-xs px-3 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? "bg-[#111110] text-[#F9F8F5]"
                        : "text-[#54534F] hover:bg-[#F2F1ED] hover:text-[#111110]"
                    }`}
                  >
                    <span>{cat}</span>
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

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 border border-[#E5E3DE] p-0.5 rounded-[2px] shrink-0 self-end md:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`px-2.5 py-1 text-xs font-medium rounded-[1px] transition-colors ${
                  viewMode === "grid" ? "bg-[#111110] text-[#F9F8F5]" : "text-[#8C8B87] hover:text-[#111110]"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={`px-2.5 py-1 text-xs font-medium rounded-[1px] transition-colors ${
                  viewMode === "list" ? "bg-[#111110] text-[#F9F8F5]" : "text-[#8C8B87] hover:text-[#111110]"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </section>

        {/* Project Cards Section */}
        <section aria-label="Projects">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border border-[#E5E3DE] rounded-[2px] p-8">
              <p className="font-sans text-base font-medium text-[#111110] mb-2">
                No matching projects found.
              </p>
              <p className="text-xs text-[#54534F] mb-6">
                No results for &ldquo;{searchQuery}&rdquo;. Try another search term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setActiveYear("All")
                }}
                className="font-sans text-xs font-medium px-4 py-2 bg-[#111110] text-[#F9F8F5] rounded-[2px] hover:bg-[#14A800] transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.num} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectListRow key={project.num} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E3DE] px-6 md:px-12 lg:px-16 py-8 flex flex-col md:flex-row justify-between gap-4 max-w-7xl mx-auto">
        <p className="font-mono text-xs text-[#8C8B87]">
          © 2025 Shoaib
        </p>
        <Link
          href="/"
          className="font-sans text-xs flex items-center gap-2 text-[#54534F] hover:text-[#111110] transition-colors"
        >
          ← Back to portfolio homepage
        </Link>
      </footer>
    </div>
  )
}

/* ─── Human-Crafted Grid Card ─── */
function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="group bg-[#FFFFFF] border border-[#E5E3DE] rounded-[2px] p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#111110] hover:shadow-[0_8px_30px_rgba(17,17,16,0.04)]">
      <div className="space-y-4">
        {/* Clean Architectural Index Header */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#EBE9E4]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[#111110]">
              {project.num}
            </span>
            <span className="text-[#C4C2BA]">/</span>
            <span className="font-sans text-[#54534F]">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#14A800] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
                Featured
              </span>
            )}
            <span className="font-mono text-xs text-[#706E68]">
              {project.year}
            </span>
          </div>
        </div>

        {/* Project Title & Role with Subtle Arrow Indicator */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="project-title-sm font-semibold tracking-tight text-[#111110] group-hover:text-[#14A800] transition-colors">
              {project.name}
            </h2>
            <span
              className="text-[#8C8B87] group-hover:text-[#14A800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono shrink-0 mt-1"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
          <p className="font-sans text-xs text-[#54534F] mt-1">
            {project.role}
          </p>
        </div>

        {/* Natural Narrative Outcome — Subtle editorial quote accent, no cheesy AI label */}
        <div className="border-l-2 border-[#14A800] pl-3 py-1 bg-[#F9FBF8]">
          <p className="font-sans text-xs text-[#1F1E1D] font-medium leading-relaxed">
            {project.outcomeLine}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-xs text-[#54534F] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Deep Architecture Drawer */}
        {isExpanded && (
          <div className="pt-4 border-t border-[#EBE9E4] text-xs space-y-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#706E68] block mb-1">
                Overview & System Details
              </span>
              <p className="font-sans text-xs text-[#1F1E1D] leading-relaxed">
                {project.longDescription ?? project.description}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#706E68] block mb-1.5">
                Complete Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#3D3C38] bg-[#F2F1ED] px-2 py-0.5 rounded-[2px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Clean Stack Chips & Harmonious Actions */}
      <div className="pt-5 mt-5 border-t border-[#EBE9E4] space-y-4">
        {/* Curated Stack Chips (Clean, minimal, no chunky button boxes) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.defaultTech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-[#3D3C38] bg-[#F2F1ED] hover:bg-[#E5E3DE] px-2 py-0.5 rounded-[2px] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Balanced Action Row */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-sans font-medium text-[#111110] hover:text-[#14A800] transition-colors inline-flex items-center gap-1"
          >
            <span>Live Site</span>
            <span className="font-mono text-[11px]" aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="font-sans font-medium text-[#54534F] hover:text-[#111110] transition-colors inline-flex items-center gap-1 cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Close" : "Case Details"}</span>
            <span className="font-mono text-[#14A800] font-semibold">{isExpanded ? "−" : "→"}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─── Human-Crafted List Row ─── */
function ProjectListRow({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="group bg-[#FFFFFF] border border-[#E5E3DE] rounded-[2px] p-5 md:p-6 transition-all duration-200 hover:border-[#111110] hover:shadow-[0_4px_20px_rgba(17,17,16,0.03)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Number, Title, Role, Outcome */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-xs font-semibold text-[#111110]">
              {project.num}
            </span>
            <h2 className="project-title-sm font-semibold tracking-tight text-[#111110] group-hover:text-[#14A800] transition-colors">
              {project.name}
            </h2>
            {project.featured && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#14A800] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
                Featured
              </span>
            )}
            <span className="font-sans text-xs text-[#54534F]">
              ({project.category})
            </span>
            <span className="font-mono text-xs text-[#706E68]">
              {project.year}
            </span>
          </div>

          <p className="font-sans text-xs text-[#54534F]">
            {project.role}
          </p>

          <p className="font-sans text-xs text-[#1F1E1D] font-medium leading-relaxed">
            {project.outcomeLine}
          </p>

          {isExpanded && (
            <div className="pt-3 border-t border-[#EBE9E4] text-xs space-y-2">
              <p className="font-sans text-xs text-[#54534F] leading-relaxed">
                {project.longDescription ?? project.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#3D3C38] bg-[#F2F1ED] px-2 py-0.5 rounded-[2px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Stack Chips & Balanced Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0">
          <div className="flex flex-wrap gap-1.5 max-w-xs">
            {project.defaultTech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-[#3D3C38] bg-[#F2F1ED] hover:bg-[#E5E3DE] px-2 py-0.5 rounded-[2px] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-1 text-xs">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-sans font-medium text-[#111110] hover:text-[#14A800] transition-colors inline-flex items-center gap-1"
            >
              <span>Live Site</span>
              <span className="font-mono text-[11px]" aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="font-sans font-medium text-[#54534F] hover:text-[#111110] transition-colors inline-flex items-center gap-1 cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Less" : "Case Details"}</span>
              <span className="font-mono text-[#14A800] font-semibold">{isExpanded ? "−" : "→"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
