import { EXPERIENCE, ExperienceItem } from "@/data/experience"
import { ExperienceRow } from "./ExperienceRow"
import { Divider } from "./Divider"

interface ExperienceSectionProps {
  sectionRef: (el: HTMLElement | null) => void
  experiences?: ExperienceItem[]
}

export function ExperienceSection({ sectionRef, experiences = EXPERIENCE }: ExperienceSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Professional Experience"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12 reveal-on-scroll">
          04 — Experience
        </p>
        <div className="space-y-0">
          {experiences.map((job, i) => (
            <div key={job.company} className="reveal-on-scroll">
              <ExperienceRow job={job} isLast={i === experiences.length - 1} />
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  )
}
