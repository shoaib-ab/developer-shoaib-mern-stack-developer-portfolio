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
    company: "Evonicsoft",
    role: "Frontend Developer",
    period: "May 2026 — Present",
    description:
      "Frontend Developer at Evonicsoft, building a SPA booking system with Vue.js and TypeScript on a Laravel + Inertia backend, alongside a company website using Next.js and Strapi (GraphQL).",
    highlightBullet: "Engineered full-scale SPA booking systems with Vue.js & TypeScript and Next.js enterprise platforms.",
    contributions: [
      "Architected and developed a single-page application (SPA) booking system using Vue.js and TypeScript integrated with a Laravel + Inertia.js backend",
      "Developed the official corporate web platform using Next.js and headless Strapi CMS with GraphQL querying",
      "Engineered responsive, accessible, and SEO-friendly user interfaces adhering to modern web performance standards",
      "Collaborated on-site in an agile environment, participating in sprint planning and code reviews",
    ],
  },
  {
    company: "PT Express",
    role: "Full Stack Engineer",
    period: "Jan 2026 — May 2026",
    description:
      "Remote Full-Stack Developer (React + React Native) at PT Express, building a shipment management platform with real-time order tracking across multiple clients.",
    highlightBullet: "Built multi-tenant shipment management with WebSocket real-time tracking across web and mobile.",
    contributions: [
      "Developed a shipment management platform with an admin dashboard, enabling multiple clients to track orders and shipments in real time",
      "Implemented WebSocket-based real-time communication to synchronize order and shipment status updates instantly across clients, eliminating manual refresh/polling delays",
      "Built cross-platform functionality using React.js for web and React Native for mobile, delivering a consistent user experience across both platforms",
      "Worked within a microservices architecture, collaborating with another developer to design and integrate backend services using Node.js, Express, and PostgreSQL",
      "Utilized Docker and Kubernetes for containerized deployment, and AWS for cloud infrastructure, supporting scalable service delivery",
      "Collaborated in a CI/CD-driven workflow using Git, contributing to consistent, production-ready code delivery in a remote team setting",
    ],
  },
  {
    company: "Infinite Market Solutions",
    role: "Associate Software Engineer",
    period: "Mar 2025 — Mar 2026",
    description:
      "Associate Software Engineer building full-stack MERN applications, including Rixdu (marketplace platform) and Origins by the Sea (e-commerce platform), alongside multiple client projects.",
    highlightBullet: "Delivered production full-stack MERN platforms including Rixdu and Origins by the Sea.",
    contributions: [
      "Developed Rixdu (marketplace platform) and Origins by the Sea (e-commerce platform) using the MERN stack — handling end-to-end development from database schema design to responsive UI implementation",
      "Contributed to multiple client projects across the MERN ecosystem, delivering scalable frontend and backend features under real-world production timelines",
      "Applied TypeScript across frontend and backend code to improve type safety, reduce runtime errors, and strengthen long-term code maintainability",
      "Gained hands-on exposure to Docker and AWS for containerization and cloud deployment workflows, broadening full-stack delivery capability beyond local development",
      "Collaborated within a team environment using Git version control, contributing to iterative feature delivery and code review processes",
    ],
  },
  {
    company: "Skill Evokers",
    role: "Frontend Developer (Internship)",
    period: "Mar 2024 — Mar 2025",
    description:
      "Frontend Developer (MERN Stack) building admin dashboards and full-stack web applications using React.js, Node.js, Express.js, and MongoDB.",
    highlightBullet: "Built responsive admin dashboards and full-stack MERN features from database to UI.",
    contributions: [
      "Built responsive admin dashboards end-to-end using the MERN stack, handling both frontend UI development in React.js and backend API design with Node.js and Express.js",
      "Designed and consumed RESTful APIs, integrating MongoDB and Mongoose ODM for efficient data modeling and CRUD operations",
      "Collaborated within a team environment using Git version control and code review workflows, contributing to agile sprints and iterative feature delivery",
      "Applied clean code principles and component-based architecture with React.js and Material-UI, focusing on maintainable, reusable UI patterns",
      "Strengthened full-stack problem-solving skills by working across the entire MERN pipeline, from database schema design to client-facing interfaces",
    ],
  },
]
