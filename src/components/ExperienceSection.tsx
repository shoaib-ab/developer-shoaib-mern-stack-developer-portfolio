"use client"

import { EXPERIENCE } from "@/data/experience"
import { ExperienceRow } from "./ExperienceRow"
import { Divider } from "./Divider"

interface ExperienceSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

export function ExperienceSection({ sectionRef }: ExperienceSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Professional Experience"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12">
          04 — Experience
        </p>
        <div>
          {EXPERIENCE.map((job, i) => (
            <ExperienceRow key={job.company} job={job} isLast={i === EXPERIENCE.length - 1} />
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}
