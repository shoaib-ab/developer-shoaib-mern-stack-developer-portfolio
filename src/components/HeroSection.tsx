"use client"

import { useState, useEffect } from "react"
import { ProfileData } from "@/lib/types"

interface HeroSectionProps {
  sectionRef: (el: HTMLElement | null) => void
  onGoToWork: () => void
  profile?: ProfileData
}

function TypewriterName({ name }: { name: string }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(name.slice(0, i))
      if (i >= name.length) {
        clearInterval(interval)
      }
    }, 130)

    return () => clearInterval(interval)
  }, [name])

  return (
    <span className="inline-flex items-baseline">
      <span className="text-[#111110]">{displayed || name.slice(0, 1)}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      <span className="text-[#14A800]">.</span>
    </span>
  )
}

export function HeroSection({ sectionRef, onGoToWork, profile }: HeroSectionProps) {
  const name = profile?.name || "Shoaib"
  const tagline = profile?.heroTagline || "Full-Stack Developer / Engineer building thoughtful digital products."
  const bio = profile?.heroBio || "I work across the full stack — React, Next.js, TypeScript on the frontend; Node.js, Express, and MongoDB on the backend. I care about clean architecture, API design, and products that work."
  const resumeUrl = profile?.resumeUrl || "/resume.pdf"

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative section-bg-b section-border-b px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 max-w-2xl reveal-on-scroll is-revealed">
          {/* Eyebrow Label */}
          <p className="section-label mb-10 md:mb-14">
            01 — Full-Stack Developer
          </p>

          {/* Main Headline with Typewriter Effect */}
          <h1 className="hero-title font-semibold mb-3 md:mb-4">
            Hi, I&apos;m
            <br />
            <TypewriterName name={name} />
          </h1>

          {/* Tagline */}
          <p className="hero-subheading font-medium mb-6 text-[#111110]">
            {tagline}
          </p>

          {/* Paragraph */}
          <p className="hero-paragraph mb-14 md:mb-16 max-w-lg">
            {bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToWork}
              className="btn-primary cursor-pointer"
            >
              View my work <span aria-hidden="true">↓</span>
            </button>
            <a
              href={resumeUrl}
              download
              className="btn-secondary"
            >
              Download resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Right Content Column — Developer Terminal Card (Stable Height, Zero Jerk) */}
        <div className="hidden lg:flex lg:col-span-5 justify-end reveal-on-scroll is-revealed">
          <div className="w-full max-w-md bg-[#111110] rounded-lg border border-[#2D2C2A] shadow-2xl overflow-hidden font-mono text-xs text-[#F9F8F5]">
            {/* Terminal Window Header */}
            <div className="bg-[#1C1B1A] px-4 py-3 border-b border-[#2D2C2A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14A800]" />
                <span className="text-[11px] text-[#8C8B87] tracking-[0.06em]">
                  shoaib.config.ts
                </span>
              </div>
            </div>

            {/* Code Snippet Content */}
            <div className="p-5 space-y-3 leading-relaxed">
              <div>
                <span className="text-[#C084FC]">const</span>{" "}
                <span className="text-[#60A5FA]">developer</span>{" "}
                <span className="text-[#8C8B87]">=</span> {"{"}
              </div>
              <div className="pl-4 space-y-1.5">
                <div>
                  <span className="text-[#F43F5E]">name</span>:{" "}
                  <span className="text-[#34D399]">&quot;{name}&quot;</span>,
                </div>
                <div>
                  <span className="text-[#F43F5E]">role</span>:{" "}
                  <span className="text-[#34D399]">&quot;Full-Stack Engineer&quot;</span>,
                </div>
                <div>
                  <span className="text-[#F43F5E]">location</span>:{" "}
                  <span className="text-[#34D399]">&quot;Available Remote / Hybrid&quot;</span>,
                </div>
                <div>
                  <span className="text-[#F43F5E]">coreStack</span>: [
                  <div className="pl-4 text-[#34D399] space-y-0.5">
                    <div>&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;,</div>
                    <div>&quot;Node.js&quot;, &quot;Express&quot;, &quot;MongoDB&quot;</div>
                  </div>
                  ],
                </div>
                <div>
                  <span className="text-[#F43F5E]">status</span>:{" "}
                  <span className="text-[#14A800] font-semibold">&quot;Open for Opportunities&quot;</span>
                </div>
              </div>
              <div>{"}"}</div>

              {/* Calm, Rock-Solid Terminal Prompt (Fixed Height, No Jerk) */}
              <div className="pt-2 text-[#8C8B87] flex items-center gap-2 border-t border-[#2D2C2A]">
                <span className="text-[#14A800]">❯</span>
                <span className="animate-pulse text-[#14A800]">_</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
