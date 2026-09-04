"use client"

import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/Header"
import { SectionIndicator } from "@/components/SectionIndicator"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { WorkSection } from "@/components/WorkSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { EducationSection } from "@/components/EducationSection"
import { ContactSection } from "@/components/ContactSection"

export default function Home() {
  const sectionEls = useRef<(HTMLElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // 1. Edge Case: If user is scrolled near the bottom of the page, active section MUST be Contact (index 5)
      if (scrollPosition + windowHeight >= documentHeight - 60) {
        setCurrentSection(5)
        return
      }

      // 2. Determine which section's bounding top/bottom spans the viewport header line (offset ~150px)
      const offset = 150
      let activeIdx = 0

      for (let i = 0; i < sectionEls.current.length; i++) {
        const el = sectionEls.current[i]
        if (!el) continue

        const rect = el.getBoundingClientRect()
        // If the top of the section has reached or passed the header line (rect.top <= offset)
        // AND the bottom is still below the header line (rect.bottom > offset)
        if (rect.top <= offset && rect.bottom > offset) {
          activeIdx = i
          break
        }
      }

      setCurrentSection(activeIdx)
    }

    // Run check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const setRef = (idx: number) => (el: HTMLElement | null) => {
    sectionEls.current[idx] = el
  }

  const goToSection = (idx: number) => {
    setCurrentSection(idx)
    sectionEls.current[idx]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Header currentSection={currentSection} onGoToSection={goToSection} />
      <main>
        <HeroSection sectionRef={setRef(0)} onGoToWork={() => goToSection(2)} />
        <AboutSection sectionRef={setRef(1)} />
        <WorkSection sectionRef={setRef(2)} />
        <ExperienceSection sectionRef={setRef(3)} />
        <EducationSection sectionRef={setRef(4)} />
        <ContactSection sectionRef={setRef(5)} />
      </main>
      <SectionIndicator currentSection={currentSection} onGoToSection={goToSection} />
    </>
  )
}
