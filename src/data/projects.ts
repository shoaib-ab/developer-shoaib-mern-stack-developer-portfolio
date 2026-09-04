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
    id: "infinite-market-solutions-website",
    title: "Infinite Market Solutions",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A corporate platform designed to showcase Infinite Market Solutions' digital marketing expertise and services with interactive showcases and lead generation forms.",
    about:
      "A comprehensive corporate website designed to showcase Infinite Market Solutions' digital marketing expertise and service offerings. The platform features a modern, responsive design with seamless navigation, optimized for lead generation and client engagement across all devices.",
    features: [
      "Fully responsive design optimized for mobile, tablet, and desktop",
      "Interactive service showcase with smooth animations",
      "Integrated contact forms with real-time validation",
      "SEO-optimized content structure for enhanced search visibility",
      "Fast page load times with Next.js static and server optimization",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/projects/infinite-market-solutions.png",
    liveUrl: "https://infinitemarketsolutions.ae/",
  },
  {
    id: "infinite-market-fusion",
    title: "Infinite Market Fusion",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A digital analytics platform merging marketing metrics with interactive dashboards and real-time visualization for strategic market analysis.",
    about:
      "An innovative digital platform that merges marketing analytics with creative solutions, providing businesses with data-driven insights and strategic recommendations. The application features real-time data visualization and interactive dashboards for comprehensive market analysis.",
    features: [
      "Real-time analytics dashboard with interactive charts",
      "Custom data visualization components powered by Chart.js",
      "Responsive grid layout for complex multi-dimensional data presentation",
      "Secure user authentication and role-based access",
      "Export functionality for automated reports and analytics",
    ],
    tags: ["Next.js", "React", "Chart.js", "Tailwind CSS", "TypeScript"],
    image: "/projects/infinite-market-fusion.png",
    liveUrl: "https://infinitemarketfusion.com/",
  },
  {
    id: "bw-digit",
    title: "BW Digit",
    category: "Frontend",
    year: "2024",
    featured: true,
    description:
      "A digital transformation consultancy platform for German-speaking markets, featuring multilingual i18n support and enterprise case studies.",
    about:
      "A cutting-edge digital transformation consultancy website serving German-speaking markets. The platform showcases innovative digital solutions with a focus on enterprise-level transformation strategies, featuring multilingual support and localized content delivery.",
    features: [
      "Multilingual support with seamless language switching (DE / EN)",
      "Advanced international SEO optimization for German and English markets",
      "Interactive case study presentations with rich typography",
      "Custom CMS integration for streamlined content updates",
      "Performance-optimized image delivery and GDPR compliance",
    ],
    tags: ["Next.js", "React", "i18n", "Tailwind CSS", "TypeScript"],
    image: "/projects/bw-digit.png",
    liveUrl: "https://bwdigit.de/",
  },
  {
    id: "origin-by-the-sea",
    title: "Origin by the Sea",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "An e-commerce platform for a luxury coastal lifestyle brand, featuring immersive product galleries, shopping cart, and Stripe checkout.",
    about:
      "An elegant e-commerce platform for a luxury coastal lifestyle brand, featuring immersive product galleries and seamless shopping experiences. The website combines stunning visual design with robust e-commerce functionality to create an engaging online shopping destination.",
    features: [
      "High-performance image galleries with lazy loading",
      "Integrated payment processing with Stripe Checkout",
      "Advanced product filtering, search, and category indexing",
      "Wishlist and shopping cart persistence across browser sessions",
      "Mobile-first responsive layout with fast checkout flow",
    ],
    tags: ["Next.js", "React", "Stripe", "Tailwind CSS", "Headless CMS"],
    image: "/projects/origin-by-the-sea.png",
    liveUrl: "https://originsbythesea.com/",
  },
  {
    id: "skymate-traveller",
    title: "Skymate Traveller",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A travel booking web app simplifying flight searches and hotel reservations with live third-party API pricing and interactive calendars.",
    about:
      "A comprehensive travel booking platform that simplifies flight searches and hotel reservations with an intuitive interface. The application integrates multiple travel APIs to provide users with real-time pricing and availability across thousands of destinations worldwide.",
    features: [
      "Real-time flight and hotel search with live pricing",
      "Advanced filtering by price, duration, and amenities",
      "Interactive booking calendar with availability indicators",
      "User account management with past booking history",
      "Responsive design optimized for on-the-go bookings",
    ],
    tags: ["Next.js", "React", "Travel APIs", "Tailwind CSS", "Redux"],
    image: "/projects/skymate-travels.png",
    liveUrl: "https://updated-skymate-1aio.vercel.app/",
  },
  {
    id: "brainwave-website",
    title: "Brainwave AI",
    category: "Frontend",
    year: "2023",
    featured: true,
    description:
      "An interactive AI-powered platform landing page with 3D graphics, neon accents, parallax scrolling, and micro-interactions.",
    about:
      "An innovative AI-powered platform landing page featuring cutting-edge design elements and interactive demonstrations. The website showcases artificial intelligence capabilities through engaging visual storytelling and modern web technologies.",
    features: [
      "Interactive animations and 3D graphics with Three.js",
      "Parallax scrolling effects and smooth page transitions",
      "Dark mode aesthetic with curated neon accent colors",
      "Fluid micro-interactions and hover states",
      "Performance-optimized bundle size despite rich visual assets",
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion", "Three.js", "TypeScript"],
    image: "/projects/brainwave.png",
    liveUrl: "https://moder-brainwave-design.netlify.app/",
  },
  {
    id: "modern-hoo-bank-payment-ui",
    title: "HooBank Payment UI",
    category: "Frontend",
    year: "2023",
    featured: false,
    description:
      "A fintech landing page showcasing modern banking solutions, gradient design systems, trust indicators, and animated statistics.",
    about:
      "A sophisticated fintech landing page showcasing modern banking solutions with emphasis on security and user experience. The design incorporates contemporary UI trends including gradient overlays, card-based layouts, and micro-interactions to build trust and engagement.",
    features: [
      "Premium gradient-based design system and typography",
      "Animated statistics counters and interactive feature cards",
      "Responsive navigation with mobile sliding menu",
      "Trust indicators and security certifications",
      "Call-to-action optimization for customer conversions",
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/projects/bank-payment.png",
    liveUrl: "https://modern-hoo-bank-payment.netlify.app/",
  },
  {
    id: "modern-gpt-3-design",
    title: "Modern GPT-3 AI",
    category: "Frontend",
    year: "2023",
    featured: false,
    description:
      "A landing page highlighting AI tech with glassmorphism effects, smooth section transitions, and responsive typography.",
    about:
      "A sleek, modern landing page showcasing the potential of GPT-3 AI technology with engaging animations and contemporary design patterns. Demonstrates advanced CSS techniques and responsive design principles.",
    features: [
      "Gradient-based modern UI with glassmorphism styling",
      "Smooth scroll animations and parallax section reveals",
      "Fully responsive layout across mobile and desktop viewports",
      "Lighthouse-optimized performance and clean semantic structure",
    ],
    tags: ["React", "CSS3", "JavaScript", "Responsive Design"],
    image: "/projects/modern-gpt.png",
    liveUrl: "https://modern-design-gpt3.netlify.app/",
  },
  {
    id: "crypto-website",
    title: "Crypter Platform",
    category: "Frontend",
    year: "2023",
    featured: false,
    description:
      "A cryptocurrency platform with real-time price tracking, market analysis, interactive price charts, and multi-currency filtering.",
    about:
      "A dynamic cryptocurrency information platform featuring real-time price tracking, market analysis, and educational resources. The application provides users with comprehensive market insights through an intuitive, data-rich interface.",
    features: [
      "Real-time cryptocurrency price updates via crypto APIs",
      "Interactive price charts with multiple timeframe toggles",
      "Market cap rankings and trending coin spotlights",
      "Search and filter functionality across 100+ cryptocurrencies",
      "Mobile-responsive trading and tracking dashboard",
    ],
    tags: ["React", "Crypto APIs", "Chart.js", "CSS3", "Axios"],
    image: "/projects/crypto-react.png",
    liveUrl: "https://crypter-app.netlify.app/",
  },
  {
    id: "dining-restaurant-site",
    title: "Dining Restaurant",
    category: "Frontend",
    year: "2023",
    featured: false,
    description:
      "A restaurant web app featuring an interactive categorized menu, reservation booking system, and high-resolution food galleries.",
    about:
      "An elegant restaurant website featuring an interactive menu, online reservations, and food photography galleries. The design emphasizes visual appeal and user-friendly navigation to enhance the dining experience.",
    features: [
      "Interactive menu with filtering by dietary preferences",
      "Online reservation system with date/time selection",
      "Image gallery with lightbox preview functionality",
      "Google Maps integration for restaurant locations",
    ],
    tags: ["React", "CSS3", "JavaScript", "Form Validation"],
    image: "/projects/dinning-site.png",
    liveUrl: "https://resturant-dining-site.netlify.app/",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Site (JS)",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "A portfolio website built with vanilla JavaScript, showcasing custom DOM animations and responsive design without external UI frameworks.",
    about:
      "A personal portfolio website built with vanilla JavaScript, showcasing web development projects and technical skills. The site features a clean design with smooth animations and interactive elements highlighting coding proficiency without relying on frontend frameworks.",
    features: [
      "Custom JavaScript animations without heavy libraries",
      "Project showcase with client-side filtering capabilities",
      "Contact form with client-side input validation",
      "Smooth scrolling and section transitions",
    ],
    tags: ["HTML5", "CSS3", "Vanilla JavaScript", "GSAP"],
    image: "/projects/portfolio-website-js.png",
    liveUrl: "https://shoaib-portfolio-site.netlify.app/",
  },
  {
    id: "hospital-website",
    title: "Hospital Healthcare Portal",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "A healthcare facility website providing doctor profiles, department directories, appointment scheduling, and WCAG accessibility.",
    about:
      "A comprehensive healthcare facility website designed to provide patients with easy access to medical services, doctor profiles, and appointment scheduling. Prioritizes accessibility and clarity for all visitors.",
    features: [
      "Department and medical service directory pages",
      "Doctor profiles with specialization and schedule details",
      "Online appointment booking form",
      "Emergency contact information prominently displayed",
      "WCAG 2.1 AA accessibility compliance",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/projects/hospital-website.png",
    liveUrl: "https://shoaib-hospital-website-project.netlify.app/",
  },
  {
    id: "educational-website",
    title: "EduLearn Platform",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "An online learning portal with course catalogs, instructor profiles, student resources, and responsive course grids.",
    about:
      "An engaging educational platform designed to facilitate online learning with course catalogs, instructor profiles, and student resources. Combines intuitive navigation with rich content presentation.",
    features: [
      "Course catalog with category search and filtering",
      "Instructor profile pages with credentials and syllabi",
      "Student testimonials and course success stories",
      "Responsive grid layout for course cards",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/projects/educational-website.png",
    liveUrl: "https://shoaib-educational-website.netlify.app/",
  },
  {
    id: "loruki-hosting-website",
    title: "Loruki Cloud Hosting",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "A cloud hosting service landing page with pricing comparison tables, feature cards, and technical infrastructure specifications.",
    about:
      "A modern cloud hosting service landing page featuring pricing tiers, feature comparisons, and technical specifications. Emphasizes trust and reliability while communicating technical hosting specs clearly.",
    features: [
      "Pricing comparison tables with feature highlights",
      "Interactive cloud feature cards with subtle hover effects",
      "Technical server specifications presented clearly",
      "Customer testimonials and server uptime badges",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid"],
    image: "/projects/loruki.png",
    liveUrl: "https://shoaib-loruki-website.netlify.app/",
  },
  {
    id: "food-restaurant-website",
    title: "Foodie Restaurant Template",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "An open-source restaurant web template with appetizing visual design, menu categories, chef stories, and reservation inquiry forms.",
    about:
      "A vibrant restaurant website template featuring menu displays, chef profiles, and online ordering capabilities. The project emphasizes appetizing visual design and user-friendly ordering flows.",
    features: [
      "Appetizing food photography galleries",
      "Menu categories with item descriptions and pricing",
      "Chef profiles and restaurant origin story",
      "Contact and reservation inquiry forms",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "/projects/food-website.png",
    githubUrl: "https://github.com/shoaib-ab/food-website",
  },
  {
    id: "food-menu-card-app",
    title: "Food Menu Card App",
    category: "Frontend",
    year: "2022",
    featured: false,
    description:
      "An interactive menu filtering application built in pure vanilla JavaScript, demonstrating dynamic DOM state management and category sorting.",
    about:
      "An interactive menu filtering application built with vanilla JavaScript, demonstrating dynamic DOM manipulation and state management. The app allows users to filter menu items by category with smooth transitions.",
    features: [
      "Dynamic menu filtering by category",
      "Smooth fade-in animations for filtered items",
      "Category buttons generated dynamically from data",
      "Zero framework dependencies",
    ],
    tags: ["HTML5", "CSS3", "Vanilla JavaScript", "DOM Manipulation"],
    image: "/projects/food-menu-card-js.png",
    liveUrl: "https://vanilla-js-menu-project.netlify.app/",
  },
  {
    id: "portfolio-practice-project",
    title: "Interactive Practice Portfolio",
    category: "Frontend",
    year: "2021",
    featured: false,
    description:
      "A creative practice portfolio experimenting with modern CSS Grid, animation techniques, and interactive showcases.",
    about:
      "A practice portfolio website created to experiment with modern web design trends and animation techniques. Served as a testing ground for new frontend technologies and creative UI patterns.",
    features: [
      "Experimental animation and transition techniques",
      "Modern CSS Grid and Flexbox layouts",
      "Interactive project showcases with custom hover effects",
      "Smooth page transitions",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "/projects/portfolio-practice-project.png",
    liveUrl: "https://shoaib-portfolio-website.netlify.app/",
  },
]

export const CATEGORIES = ["All", "Full-Stack", "Frontend", "API & Backend"] as const
export type ProjectCategory = (typeof CATEGORIES)[number]
