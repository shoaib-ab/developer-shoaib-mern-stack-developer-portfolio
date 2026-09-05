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
import { SiteData } from "@/lib/types"

interface PortfolioClientProps {
  initialData: SiteData
}

export function PortfolioClient({ initialData }: PortfolioClientProps) {
  const sectionEls = useRef<(HTMLElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const isProgrammaticScroll = useRef(false)
  const programmaticScrollTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // If user clicked a navbar link, do not let intermediate scroll frames interrupt the sliding pill
      if (isProgrammaticScroll.current) return

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
        if (rect.top <= offset && rect.bottom > offset) {
          activeIdx = i
          break
        }
      }

      setCurrentSection(activeIdx)
    }

    // Run check on mount
    handleScroll()

    // Scroll reveal observer for elements entering viewport
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    const revealElements = document.querySelectorAll(".reveal-on-scroll")
    revealElements.forEach((el) => revealObserver.observe(el))

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      revealObserver.disconnect()
      if (programmaticScrollTimer.current) {
        clearTimeout(programmaticScrollTimer.current)
      }
    }
  }, [])

  const setRef = (idx: number) => (el: HTMLElement | null) => {
    sectionEls.current[idx] = el
  }

  const goToSection = (idx: number) => {
    // Lock intermediate scroll updates so the pill glides straight to the target
    isProgrammaticScroll.current = true
    setCurrentSection(idx)

    const el = sectionEls.current[idx]
    if (el) {
      const headerHeight = 68
      const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      })
    }

    if (programmaticScrollTimer.current) {
      clearTimeout(programmaticScrollTimer.current)
    }

    // Release lock once smooth scroll has finished
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 850)
  }

  return (
    <>
      <Header currentSection={currentSection} onGoToSection={goToSection} />
      <main>
        <HeroSection
          sectionRef={setRef(0)}
          onGoToWork={() => goToSection(2)}
          profile={initialData.profile}
        />
        <AboutSection
          sectionRef={setRef(1)}
          profile={initialData.profile}
        />
        <WorkSection
          sectionRef={setRef(2)}
          projects={initialData.projects}
        />
        <ExperienceSection
          sectionRef={setRef(3)}
          experiences={initialData.experiences}
        />
        <EducationSection
          sectionRef={setRef(4)}
          education={initialData.education}
        />
        <ContactSection
          sectionRef={setRef(5)}
          profile={initialData.profile}
        />
      </main>
      <SectionIndicator currentSection={currentSection} onGoToSection={goToSection} />
    </>
  )
}
