"use client"

import { Divider } from "./Divider"

const FRONTEND_TECH = ["React", "Next.js", "TypeScript"]
const BACKEND_TECH = ["Node.js", "Express", "REST APIs"]
const DATA_TOOLING_TECH = ["MongoDB", "PostgreSQL", "Strapi", "Git"]

interface AboutSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

export function AboutSection({ sectionRef }: AboutSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Shoaib"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12">
          02 — About
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-stretch">
          
          {/* Left Column: Headline + Supporting Key Metrics Block (Balances Height) */}
          <div className="flex flex-col justify-between h-full space-y-8">
            <h2 className="section-title font-semibold">
              Engineer.
              <br />
              Builder.
              <br />
              Problem solver.
            </h2>

            {/* Supporting Key Metrics to intentionally fill space & balance right column */}
            <div className="pt-8 border-t border-[#E3E1DB] grid grid-cols-2 gap-6 max-w-sm">
              <div>
                <p className="font-mono text-2xl font-bold text-[#111110]">
                  4+ Years
                </p>
                <p className="font-mono text-xs text-[#54534F] tracking-[0.05em] uppercase mt-1">
                  Production Experience
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#14A800]">
                  10+
                </p>
                <p className="font-mono text-xs text-[#54534F] tracking-[0.05em] uppercase mt-1">
                  Shipped Projects
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Paragraphs + Categorized Tech Stack */}
          <div>
            <p className="text-[1.0625rem] text-[#111110] leading-[1.8] mb-6">
              I&apos;m a Full-Stack Developer with several years of experience building production applications that
              serve real users. I work across the entire stack — from crafting precise, performant frontends to
              designing clean, maintainable backend systems.
            </p>
            <p className="text-[1.0625rem] text-[#4A4945] leading-[1.8] mb-8">
              My focus is on building things that last: scalable APIs, well-structured databases, and interfaces
              that don&apos;t get in the way. I care about code quality, clear architecture, and shipping work that
              holds up under real-world conditions.
            </p>

            {/* Core Technologies grouped into 3 category rows */}
            <div className="border-t border-[#E3E1DB] pt-6">
              <p className="section-label mb-4">
                Core Technologies
              </p>
              
              <div className="space-y-2.5">
                {/* Row 1: Frontend */}
                <div className="flex flex-wrap gap-2">
                  {FRONTEND_TECH.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Row 2: Backend */}
                <div className="flex flex-wrap gap-2">
                  {BACKEND_TECH.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Row 3: Data & Tooling */}
                <div className="flex flex-wrap gap-2">
                  {DATA_TOOLING_TECH.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Lightweight visual slot for future "Currently learning" */}
                <div className="pt-3 border-t border-dashed border-[#E5E3DE] mt-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#787772] uppercase tracking-[0.06em]">
                    Learning:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="tech-badge-learning">
                      .NET / C#
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Divider />
    </section>
  )
}
