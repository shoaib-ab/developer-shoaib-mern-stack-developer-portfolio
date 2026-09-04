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
    company: "Horizon Digital",
    role: "Senior Full-Stack Developer",
    period: "2023 — Present",
    description:
      "Leading development of a multi-tenant SaaS platform serving enterprise clients across the MENA region. Architecting scalable Node.js microservices, React-based interfaces, and managing production deployments.",
    highlightBullet: "Reduced API response times by 60% through query optimisation and Redis caching.",
    contributions: [
      "Reduced API response times by 60% through query optimisation and caching",
      "Architected a real-time notification system using WebSockets for 12k+ users",
      "Led migration from REST to GraphQL for the core data layer",
    ],
  },
  {
    company: "Craft Studio",
    role: "Full-Stack Developer",
    period: "2021 — 2023",
    description:
      "Built and maintained production web applications for a range of clients from early-stage startups to established brands. Delivered end-to-end features spanning frontend, backend, and database design.",
    highlightBullet: "Built a reusable React component library deployed across 4 client projects.",
    contributions: [
      "Developed custom Strapi plugins for client-specific content workflows",
      "Integrated third-party APIs including Stripe, Twilio, and Mapbox",
      "Built a reusable component library deployed across four client projects",
    ],
  },
  {
    company: "Pixel Labs",
    role: "Junior Developer",
    period: "2020 — 2021",
    description:
      "Started career building React interfaces and contributing to Node.js backends. Gained production experience with agile workflows, code review practices, and deployment pipelines.",
    highlightBullet: "Improved frontend automated test coverage from 40% to 72%.",
    contributions: [
      "Built responsive UI components in React and TypeScript",
      "Maintained and extended existing Express API endpoints",
      "Improved frontend test coverage from 40% to 72%",
    ],
  },
]
