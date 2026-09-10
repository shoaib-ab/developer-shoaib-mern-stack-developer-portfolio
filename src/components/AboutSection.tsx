import { ProfileData } from "@/lib/types"
import { TechCarousel } from "./TechCarousel"

interface AboutSectionProps {
  sectionRef: (el: HTMLElement | null) => void
  profile?: ProfileData
}

export function AboutSection({ sectionRef, profile }: AboutSectionProps) {
  const p1 = profile?.aboutParagraph1 || "I'm a Full-Stack Developer with several years of experience building production applications that serve real users. I work across the entire stack — from crafting precise, performant frontends to designing clean, maintainable backend systems."
  const p2 = profile?.aboutParagraph2 || "My focus is on building things that last: scalable APIs, well-structured databases, and interfaces that don't get in the way. I care about code quality, clear architecture, and shipping work that holds up under real-world conditions."

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Shoaib"
      className="relative section-bg-a section-border-b px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12">
          02 — About
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-stretch">
          
          {/* Left Column: Headline + Supporting Key Metrics Block */}
          <div className="flex flex-col justify-between h-full space-y-8 reveal-on-scroll">
            <h2 className="section-title font-semibold">
              Engineer.
              <br />
              Builder.
              <br />
              Problem solver.
            </h2>

            {/* Supporting Key Metrics on elevated white card */}
            <div className="bg-[#FFFFFF] border border-[#E0DCD3] rounded-[3px] p-6 grid grid-cols-2 gap-6 max-w-sm shadow-xs">
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
                  15+
                </p>
                <p className="font-mono text-xs text-[#54534F] tracking-[0.05em] uppercase mt-1">
                  Shipped Projects
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Paragraphs */}
          <div className="reveal-on-scroll reveal-delay-200 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-[1.0625rem] text-[#111110] leading-[1.8]">
                {p1}
              </p>
              <p className="text-[1.0625rem] text-[#4A4945] leading-[1.8]">
                {p2}
              </p>
            </div>

            {/* Engineering Principles highlight */}
            <div className="pt-6 border-t border-[#E0DCD3] grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-2 text-xs font-mono text-[#3D3C38]">
                <span className="text-[#14A800] font-bold">✓</span>
                <span>Production API Architecture</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-[#3D3C38]">
                <span className="text-[#14A800] font-bold">✓</span>
                <span>Sub-second Client Speed</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-[#3D3C38]">
                <span className="text-[#14A800] font-bold">✓</span>
                <span>Type-Safe End-to-End</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-mono text-[#3D3C38]">
                <span className="text-[#14A800] font-bold">✓</span>
                <span>Database Design & Scaling</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Technologies Infinite Marquee Carousel */}
        <div className="mt-14 md:mt-20 pt-10 border-t border-[#E0DCD3] reveal-on-scroll">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
            <div>
              <p className="section-label mb-1">
                Ecosystem & Tooling
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111110]">
                Technologies I Build With
              </h3>
            </div>
            <p className="font-mono text-xs text-[#787772]">
              Hover to pause • 20+ production tools
            </p>
          </div>

          <TechCarousel />
        </div>

      </div>
    </section>
  )
}
