export interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string
  highlightBullet: string
  contributions: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Infinite Market Solutions",
    role: "Full Stack Developer",
    period: "2024 — Present",
    description:
      "Built and maintained scalable full-stack applications using modern technologies. Led feature development, improved API efficiency, and collaborated with stakeholders to deliver reliable, production-ready digital platforms and client platforms.",
    highlightBullet: "Led full-stack architecture for enterprise web platforms and client portals.",
    contributions: [
      "Engineered scalable web applications and corporate client portals using Next.js and React",
      "Integrated third-party APIs and streamlined backend data pipelines for high reliability",
      "Collaborated with international clients across the UAE, Germany, and Europe to deliver custom web platforms",
    ],
  },
  {
    company: "Devorbis",
    role: "Front End Developer",
    period: "2022 — 2023",
    description:
      "Developed responsive interfaces, optimized website performance, and implemented new features for various client projects. Worked remotely with a cross-functional team, ensuring clean code, timely delivery, and a seamless user experience.",
    highlightBullet: "Delivered high-performance frontend interfaces across diverse client engagements.",
    contributions: [
      "Built responsive UI components and interactive web apps using React and TypeScript",
      "Optimized frontend load times and cross-browser compatibility across mobile and desktop",
      "Collaborated remotely with cross-functional engineering teams following agile sprint workflows",
    ],
  },
  {
    company: "Codes Thinker",
    role: "Front-End Developer Intern",
    period: "2022",
    description:
      "Gained hands-on experience by contributing to real-world front-end tasks, improving UI components, and learning industry-standard coding practices. Collaborated closely with senior developers to strengthen problem-solving and development workflow.",
    highlightBullet: "Contributed to production frontend components and modern engineering workflows.",
    contributions: [
      "Built and tested UI components in accordance with Figma design specifications",
      "Implemented DOM interactions and frontend animations using JavaScript and modern CSS",
      "Strengthened version control practices and code review workflows with senior engineers",
    ],
  },
]
