"use client"

interface ContactSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

const CONTACT_LINKS = [
  { label: "Email", value: "hello@shoaib.dev", href: "mailto:hello@shoaib.dev" },
  { label: "GitHub", value: "github.com/shoaib", href: "https://github.com/shoaib" },
  { label: "LinkedIn", value: "linkedin.com/in/shoaib", href: "https://linkedin.com/in/shoaib" },
  { label: "Resume", value: "Download PDF", href: "/resume.pdf" },
]

export function ContactSection({ sectionRef }: ContactSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      className="relative px-8 md:px-16 lg:px-24 pt-[108px] pb-[88px] scroll-mt-[68px]"
    >
      <div className="max-w-7xl w-full mx-auto">
        <p className="section-label mb-8 md:mb-12">
          06 — Contact
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <div>
            <h2 className="contact-title font-semibold mb-6">
              Have a role
              <br />
              in mind?
            </h2>
            <p className="text-[1.0625rem] text-[#4A4945] leading-[1.75] max-w-[360px]">
              I&apos;m open to full-time roles and selective contract engagements. If you&apos;re building
              something that requires a strong full-stack engineer, let&apos;s talk.
            </p>
          </div>
          <div className="flex flex-col">
            {CONTACT_LINKS.map((link, i, arr) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={link.label === "Resume" ? true : undefined}
                className={`group flex items-center justify-between py-5 ${
                  i < arr.length - 1 ? "border-b border-[#E3E1DB]" : ""
                }`}
              >
                <span className="section-label">
                  {link.label}
                </span>
                <span className="font-medium text-sm text-[#111110] flex items-center gap-2">
                  {link.value}
                  <span
                    className="text-[#14A800] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-[#E3E1DB] mt-12 md:mt-20 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-mono text-xs text-[#54534F] tracking-[0.05em]">
            © 2025 Shoaib. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#54534F] tracking-[0.05em]">
            Full-Stack Developer / Engineer
          </p>
        </div>
      </div>
    </section>
  )
}
