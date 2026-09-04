export interface Project {
  num: string
  name: string
  year: string
  category: string
  description: string
  longDescription?: string
  outcomeLine: string
  defaultTech: string[]
  tech: string[]
  role: string
  featured?: boolean
  mockupBg?: string
}

export const ALL_PROJECTS: Project[] = [
  {
    num: "001",
    name: "Nexus Commerce",
    year: "2024",
    category: "E-commerce",
    featured: true,
    outcomeLine: "Engineered high-concurrency API handling 10k+ active sellers with sub-200ms response times.",
    defaultTech: ["Next.js", "TypeScript", "Stripe"],
    mockupBg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    description:
      "Full-stack e-commerce platform with real-time inventory management, multi-vendor support, and integrated payment processing. Engineered to handle thousands of concurrent users with sub-200ms API response times.",
    longDescription:
      "A complete commerce infrastructure built from the ground up. Includes a seller dashboard, buyer storefront, order management system, and an internal analytics panel. Stripe handles payments; Redis powers cart sessions and rate limiting.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Redis"],
    role: "Lead Full-Stack Engineer",
  },
  {
    num: "002",
    name: "Forma CMS",
    year: "2023",
    category: "CMS",
    featured: true,
    outcomeLine: "Unified multi-CMS content delivery across 5 enterprise platforms via a single API gateway.",
    defaultTech: ["React", "Strapi", "TypeScript"],
    mockupBg: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
    description:
      "Headless content management system built on Strapi with a custom React admin interface. Powers content delivery for five client platforms through a unified REST API layer with granular permission controls.",
    longDescription:
      "Designed to replace a fragmented multi-CMS workflow for a digital agency. A single Strapi backend serves structured content to five distinct frontends via a shared API gateway. Custom plugins handle media transforms and scheduled publishing.",
    tech: ["React", "TypeScript", "Strapi", "Node.js", "PostgreSQL"],
    role: "Full-Stack Developer",
  },
  {
    num: "003",
    name: "Pulse Analytics",
    year: "2023",
    category: "Dashboard",
    featured: true,
    outcomeLine: "Real-time analytics engine visualising live telemetry streams with sub-second WebSocket latency.",
    defaultTech: ["Next.js", "Express", "WebSocket"],
    mockupBg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
    description:
      "Real-time analytics dashboard for monitoring application performance and user behaviour. Processes and visualises live data streams with sub-second latency using WebSocket connections.",
    longDescription:
      "Built for an internal team tracking SaaS product metrics. An Express server aggregates events from client SDKs, stores them in MongoDB with time-based indices, and pushes live updates to a Next.js dashboard over WebSockets.",
    tech: ["Next.js", "TypeScript", "Express", "WebSocket", "MongoDB"],
    role: "Full-Stack Engineer",
  },
  {
    num: "004",
    name: "Ark Auth",
    year: "2023",
    category: "Infrastructure",
    outcomeLine: "Standalone microservice with JWT rotation, OAuth 2.0, and self-service account management.",
    defaultTech: ["Node.js", "TypeScript", "JWT"],
    mockupBg: "linear-gradient(135deg, #172554 0%, #1e3a8a 100%)",
    description:
      "Standalone authentication service with JWT and refresh token rotation, OAuth 2.0 integration, and a self-service account management portal. Drop-in for any Node.js application.",
    tech: ["Node.js", "Express", "TypeScript", "MongoDB", "JWT"],
    role: "Backend Engineer",
  },
  {
    num: "005",
    name: "Meridian",
    year: "2022",
    category: "SaaS",
    outcomeLine: "Project management SaaS featuring a custom 0-dependency drag-and-drop Kanban engine.",
    defaultTech: ["React", "Node.js", "PostgreSQL"],
    mockupBg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
    description:
      "Project management SaaS with Kanban boards, time tracking, and Slack integration. Built a custom drag-and-drop engine without external DnD libraries to keep the bundle minimal.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Slack API"],
    role: "Full-Stack Developer",
  },
  {
    num: "006",
    name: "Fieldwork",
    year: "2022",
    category: "Mobile Web",
    outcomeLine: "Offline-first PWA for field logistics teams with background sync & Mapbox dispatch tracking.",
    defaultTech: ["React", "MongoDB", "Mapbox"],
    mockupBg: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    description:
      "Field data collection app for a logistics company. Progressive web app with offline-first architecture, background sync, and live map tracking for dispatch teams.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Mapbox", "PWA"],
    role: "Full-Stack Developer",
  },
  {
    num: "007",
    name: "Ledger API",
    year: "2022",
    category: "API",
    outcomeLine: "Double-entry accounting transaction engine ensuring audit compliance under concurrent writes.",
    defaultTech: ["Node.js", "PostgreSQL", "Express"],
    mockupBg: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    description:
      "Financial transaction API with double-entry bookkeeping logic, multi-currency support, and audit logging. Designed for accuracy under concurrent write operations.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Express"],
    role: "Backend Engineer",
  },
  {
    num: "008",
    name: "Chronicle",
    year: "2021",
    category: "CMS",
    outcomeLine: "Editorial CMS with custom Strapi rich-text workflow and static-site build pipeline.",
    defaultTech: ["Next.js", "Strapi", "Node.js"],
    mockupBg: "linear-gradient(135deg, #27272a 0%, #3f3f46 100%)",
    description:
      "Blog and editorial platform with a rich-text editor, author management, and static-site generation. Content is authored in a custom Strapi instance and built to static HTML at deploy time.",
    tech: ["Next.js", "Strapi", "TypeScript", "Node.js"],
    role: "Full-Stack Developer",
  },
  {
    num: "009",
    name: "Roster",
    year: "2021",
    category: "Dashboard",
    outcomeLine: "Multi-tenant business scheduling software with automated conflict detection & shift templates.",
    defaultTech: ["React", "Express", "MongoDB"],
    mockupBg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    description:
      "Team scheduling tool for small businesses. Calendar view, shift templates, and automated conflict detection. Deployed as a multi-tenant application with isolated data per organisation.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full-Stack Developer",
  },
  {
    num: "010",
    name: "Dispatch",
    year: "2020",
    category: "API",
    outcomeLine: "Notification microservice wrapping SendGrid & Twilio APIs with auto-retries and delivery tracking.",
    defaultTech: ["Node.js", "SendGrid", "Twilio"],
    mockupBg: "linear-gradient(135deg, #451a03 0%, #78350f 100%)",
    description:
      "Transactional email and SMS notification service built as an internal microservice. Wraps SendGrid and Twilio under a single API surface with templating, retry logic, and delivery tracking.",
    tech: ["Node.js", "Express", "MongoDB", "SendGrid", "Twilio"],
    role: "Backend Developer",
  },
]

export const ALL_CATEGORIES = ["All", ...Array.from(new Set(ALL_PROJECTS.map((p) => p.category)))]
