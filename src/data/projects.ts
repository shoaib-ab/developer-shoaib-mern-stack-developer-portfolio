export interface Project {
  id: string
  title: string
  category: "Full-Stack" | "Frontend" | "API & Backend"
  year: string
  featured: boolean
  description: string
  about: string
  features: string[]
  tags: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
}

export const ALL_PROJECTS: Project[] = [
  {
    id: "nexus-commerce",
    title: "Nexus Commerce",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A complete multi-vendor online store with product catalogs, shopping cart, customer checkout via Stripe, and a real-time merchant dashboard.",
    about:
      "Nexus Commerce is an end-to-end e-commerce platform built to support multiple independent sellers. It features a fast customer storefront, secure checkout powered by Stripe, and a seller management portal where merchants can list items, track orders, and view sales performance.",
    features: [
      "Multi-vendor product management with image uploads and category filtering",
      "Secure payment processing with Stripe Checkout and automated webhook reconciliation",
      "Real-time inventory decrementing and out-of-stock guards",
      "Seller analytics dashboard showing revenue, order volume, and top products",
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/projects/nexus-commerce.jpg",
    liveUrl: "https://nexus-commerce.example.com",
    githubUrl: "https://github.com/shoaib/nexus-commerce",
  },
  {
    id: "forma-cms",
    title: "Forma CMS",
    category: "Full-Stack",
    year: "2023",
    featured: true,
    description:
      "A headless content management platform that allows marketing teams to create, organize, and publish articles across web apps via clean REST APIs.",
    about:
      "Forma CMS was built to simplify content publishing for digital teams. Instead of managing separate blogs and landing page content across multiple websites, editors can write in a clean visual admin dashboard while developers fetch structured JSON content through a fast API.",
    features: [
      "Custom content schema builder for blog posts, landing pages, and author profiles",
      "Draft vs. Published workflow with instant preview before releasing live",
      "Automated image optimization and responsive media delivery",
      "Granular role permissions for authors, editors, and administrators",
    ],
    tags: ["React", "TypeScript", "Strapi", "Node.js", "PostgreSQL"],
    image: "/projects/forma-cms.jpg",
    liveUrl: "https://forma-cms.example.com",
    githubUrl: "https://github.com/shoaib/forma-cms",
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    category: "Full-Stack",
    year: "2023",
    featured: true,
    description:
      "A real-time analytics web dashboard that monitors website traffic, page visits, and user events as they happen using live WebSockets.",
    about:
      "Pulse Analytics provides privacy-focused, real-time website analytics. It collects visitor events through a lightweight tracking snippet and visualizes page views, user locations, referral sources, and active sessions on an interactive dashboard with live streaming updates.",
    features: [
      "Live visitor counter and active session monitoring via WebSockets",
      "Interactive charts for daily page views, top referrers, and popular pages",
      "Lightweight tracking script under 5KB with zero cookie requirements",
      "Fast data querying with time-series indexing in MongoDB",
    ],
    tags: ["Next.js", "TypeScript", "Express", "WebSocket", "MongoDB"],
    image: "/projects/pulse-analytics.jpg",
    liveUrl: "https://pulse-analytics.example.com",
    githubUrl: "https://github.com/shoaib/pulse-analytics",
  },
  {
    id: "ark-auth",
    title: "Ark Auth",
    category: "API & Backend",
    year: "2023",
    featured: false,
    description:
      "A plug-and-play authentication microservice providing email login, Google/GitHub OAuth, secure JWT sessions, and user account management.",
    about:
      "Ark Auth is a reusable backend authentication service designed to drop into any new web application. It handles secure password hashing, OAuth login providers, token expiration, and email password resets with robust security standards.",
    features: [
      "OAuth 2.0 social sign-in integration with Google and GitHub",
      "Secure JWT token issuance with automatic sliding refresh tokens",
      "Brute-force protection and IP-based rate limiting on sensitive routes",
      "Self-service password reset and email verification workflows",
    ],
    tags: ["Node.js", "TypeScript", "Express", "JWT", "MongoDB"],
    image: "/projects/ark-auth.svg",
    githubUrl: "https://github.com/shoaib/ark-auth",
  },
  {
    id: "meridian",
    title: "Meridian",
    category: "Full-Stack",
    year: "2022",
    featured: false,
    description:
      "An agile project management tool with drag-and-drop Kanban boards, sprint task tracking, and automated Slack notifications.",
    about:
      "Meridian is a focused task management app for software development teams. Teams can organize sprints across customizable Kanban columns, assign tasks to members, set deadlines, and receive Slack updates when issues move to code review or completion.",
    features: [
      "Smooth drag-and-drop task reordering across Kanban columns",
      "Custom board filters by assignee, priority label, and sprint deadline",
      "Instant Slack notifications when tasks are moved or comments are added",
      "Clean, distraction-free user interface with dark mode support",
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Slack API"],
    image: "/projects/meridian.svg",
    liveUrl: "https://meridian-app.example.com",
    githubUrl: "https://github.com/shoaib/meridian",
  },
  {
    id: "fieldwork",
    title: "Fieldwork",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "An offline-first progressive web app for field inspectors to log checklist data and view delivery routes without internet access.",
    about:
      "Built for logistics drivers and field workers operating in areas with poor cellular coverage. The app stores all inspection forms and route checkpoints locally on the device and automatically syncs them with the central database as soon as a connection is restored.",
    features: [
      "Full offline support using IndexedDB and Service Worker caching",
      "Automatic background data synchronization when back online",
      "Interactive map routes and GPS pin drop using Mapbox GL",
      "Camera photo attachment with client-side compression",
    ],
    tags: ["React", "TypeScript", "PWA", "Mapbox", "IndexedDB"],
    image: "/projects/fieldwork.svg",
    liveUrl: "https://fieldwork.example.com",
  },
  {
    id: "ledger-api",
    title: "Ledger API",
    category: "API & Backend",
    year: "2022",
    featured: false,
    description:
      "A financial accounting API built with double-entry bookkeeping rules to record multi-currency payments, fees, and client balances accurately.",
    about:
      "A critical backend service created to handle financial balance tracking for a billing platform. It strictly enforces double-entry accounting principles (every debit must equal an equal credit) to eliminate rounding errors and maintain a verifiable audit trail.",
    features: [
      "Strict double-entry validation preventing unbalanced transactions",
      "Multi-currency support with automated exchange rate conversion",
      "Immutable transaction log with tamper-evident audit history",
      "Exportable balance sheet and account statement reporting endpoints",
    ],
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Express"],
    image: "/projects/ledger-api.svg",
    githubUrl: "https://github.com/shoaib/ledger-api",
  },
  {
    id: "chronicle",
    title: "Chronicle",
    category: "Frontend",
    year: "2021",
    featured: false,
    description:
      "A clean editorial blog and reading platform with markdown authoring, category filtering, and ultra-fast static page delivery.",
    about:
      "Chronicle is a minimalist digital magazine built for tech writers. It features a typography-first reading experience, custom dark/light theme toggle, and pre-rendered static pages that load in milliseconds on mobile and desktop devices.",
    features: [
      "Markdown editor with syntax highlighting for code snippets",
      "Estimated reading time calculator and social share previews",
      "Static page generation for instant page loading and strong SEO rankings",
      "Newsletter subscription form integration",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi"],
    image: "/projects/chronicle.svg",
    liveUrl: "https://chronicle-mag.example.com",
  },
  {
    id: "roster",
    title: "Roster",
    category: "Full-Stack",
    year: "2021",
    featured: false,
    description:
      "A staff shift planning tool for small businesses to create weekly schedules, manage time-off requests, and prevent booking overlaps.",
    about:
      "Roster replaced complicated paper and spreadsheet schedules for local service businesses. Managers can visually plan weekly shifts on a clear timeline calendar, and employees get automated notifications whenever their schedule changes.",
    features: [
      "Weekly timeline calendar view with drag-and-drop shift assignment",
      "Automatic conflict detection that warns against double-booking staff",
      "Time-off request and manager approval workflow",
      "SMS and email schedule reminders sent to team members",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/roster.svg",
    liveUrl: "https://roster-shifts.example.com",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    category: "API & Backend",
    year: "2020",
    featured: false,
    description:
      "A notification microservice that sends automated transactional emails and SMS alerts through SendGrid and Twilio with retry queues.",
    about:
      "An internal messaging hub that standardizes how web applications send notifications to users. By wrapping email and SMS providers in a single API, developers can send template-based emails or order alerts with automatic retries if a third-party vendor experiences downtime.",
    features: [
      "Single API endpoint for both email and SMS notifications",
      "Automatic retry queue with exponential backoff on delivery failures",
      "Dynamic template rendering with customizable user variables",
      "Webhook delivery status tracking (delivered, opened, failed)",
    ],
    tags: ["Node.js", "Express", "MongoDB", "SendGrid", "Twilio"],
    image: "/projects/dispatch.svg",
    githubUrl: "https://github.com/shoaib/dispatch-service",
  },
]

export const CATEGORIES = ["All", "Full-Stack", "Frontend", "API & Backend"] as const
export type ProjectCategory = (typeof CATEGORIES)[number]
