"use client"

interface TechItem {
  name: string
  category: string
  icon: string
}

const FRONTEND_TOOLS: TechItem[] = [
  { name: "React.js", category: "Library", icon: "/icons/tech/react-icon.svg" },
  { name: "Next.js", category: "Framework", icon: "/icons/tech/nextjs-icon.svg" },
  { name: "TypeScript", category: "Language", icon: "/icons/tech/typescript-icon.svg" },
  { name: "Tailwind CSS", category: "Styling", icon: "/icons/tech/tailwind-icon.svg" },
  { name: "Figma", category: "Design", icon: "/icons/tech/figma-icon.svg" },
  { name: "Framer", category: "Animation", icon: "/icons/tech/framer-icon.svg" },
  { name: "Angular", category: "Framework", icon: "/icons/tech/angular-icon.svg" },
  { name: "Photoshop", category: "Design", icon: "/icons/tech/photoshop-icon.svg" },
  { name: "Adobe XD", category: "Design", icon: "/icons/tech/adobe-icon.svg" },
]

const BACKEND_TOOLS: TechItem[] = [
  { name: "Node.js", category: "Runtime", icon: "/icons/tech/nodejs-icon.svg" },
  { name: "Express.js", category: "Backend", icon: "/icons/tech/express-icon.svg" },
  { name: "Nest.js", category: "Enterprise", icon: "/icons/tech/nestjs-icon.svg" },
  { name: "MongoDB", category: "Database", icon: "/icons/tech/mongodb-icon.svg" },
  { name: "AWS Cloud", category: "Infra", icon: "/icons/tech/aws-icon.svg" },
  { name: "Stripe", category: "Payments", icon: "/icons/tech/stripe-icon.svg" },
  { name: "Git", category: "VCS", icon: "/icons/tech/git-icon.svg" },
  { name: "Firebase", category: "Cloud DB", icon: "/icons/tech/firebase-icon.svg" },
  { name: "GitLab", category: "CI/CD", icon: "/icons/tech/gitlab-icon.svg" },
  { name: "Django", category: "Framework", icon: "/icons/tech/django-icon.svg" },
]

function TechPill({ item }: { item: TechItem }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-[4px] bg-[#FFFFFF] border border-[#E0DCD3] shadow-2xs hover:border-[#14A800] hover:shadow-xs transition-all duration-200 group/pill shrink-0 cursor-default select-none">
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt={item.name}
          className="w-4.5 h-4.5 object-contain transition-transform duration-200 group-hover/pill:scale-110"
          loading="lazy"
        />
      </div>
      <span className="font-mono text-xs font-medium text-[#111110] whitespace-nowrap tracking-tight">
        {item.name}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-wider text-[#787772] bg-[#F7F6F2] px-1.5 py-0.5 rounded-[2px] border border-[#E8E6E0]">
        {item.category}
      </span>
    </div>
  )
}

export function TechCarousel() {
  // Duplicate arrays to create continuous infinite marquee
  const row1Items = [...FRONTEND_TOOLS, ...FRONTEND_TOOLS, ...FRONTEND_TOOLS]
  const row2Items = [...BACKEND_TOOLS, ...BACKEND_TOOLS, ...BACKEND_TOOLS]

  return (
    <div
      className="marquee-container relative w-full overflow-hidden py-2"
      aria-label="Technologies and Tooling Carousel"
    >
      {/* Left Gradient Fade Mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[var(--bg-a)] via-[var(--bg-a)]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Right Gradient Fade Mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[var(--bg-a)] via-[var(--bg-a)]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Dual Direction Rows */}
      <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
        {/* Row 1: Sliding Smoothly Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-3 pr-3">
            {row1Items.map((tool, idx) => (
              <TechPill key={`row1-${tool.name}-${idx}`} item={tool} />
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Smoothly Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-3 pr-3">
            {row2Items.map((tool, idx) => (
              <TechPill key={`row2-${tool.name}-${idx}`} item={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
