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
    id: "backpackwander-com",
    title: "Backpack Wander GmbH",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "Engineering oversight & quality management web platform for offshore wind farms, subsea pipelines, and heavy industrial infrastructure.",
    about:
      "Backpack Wander GmbH is an industrial engineering portal offering QA/QC oversight, non-destructive testing (NDT), pipeline integrity monitoring, and offshore wind farm inspection coordination. The web application features interactive technical service catalogs, multi-language internationalization (English/German), client project inquiry workflows, and compliance document exchange.",
    features: [
      "Multi-language internationalization architecture (EN/DE/SR)",
      "Offshore & industrial engineering service showcases with technical specification briefs",
      "Direct project scoping and industrial consultation inquiry flows",
      "Responsive high-performance layout with dark glassmorphism engineering aesthetics",
      "Optimized SEO metadata and structured corporate schema markup",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Internationalization"],
    image: "/projects/backpackwander-com.png",
    liveUrl: "https://www.backpackwander.com/",
  },
  {
    id: "backpackwander-org",
    title: "Backpack Wander Community",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "An outdoor lifestyle and digital nomad community platform connecting remote creators, adventurers, and retreat organizers.",
    about:
      "Backpack Wander Zajednica (Community) is a community hub dedicated to digital nomads, nature explorers, and eco-conscious travelers. The platform features travel companion matching, outdoor retreat schedules, creative community showcases, multi-language support, and interactive event registrations.",
    features: [
      "Travel companion matching system for remote workers and solo adventurers",
      "Community event and retreat discovery with interactive registration",
      "Multi-lingual localization support (English, German, Serbian)",
      "Dynamic story feed and member spotlight showcases",
      "Mobile-first responsive UX with nature-inspired visual design",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs"],
    image: "/projects/backpackwander-org.png",
    liveUrl: "https://www.backpackwander.org/",
  },
  {
    id: "primetaxsoftware",
    title: "Prime Tax Software",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A B2B FinTech platform and service bureau providing tax professionals with software enrollment, bank product integrations, and rebate management.",
    about:
      "Prime Tax Software is a full-service tax professional portal designed to help independent tax preparers and service bureaus scale their tax businesses. The platform offers multi-tier software enrollment, IRS e-file compliance tools, integrated bank product solutions, and automated rebate tracking with an executive demo scheduling pipeline.",
    features: [
      "B2B client onboarding and digital tax software enrollment application",
      "Integrated tax bank product selector and incentive rebate calculator",
      "Interactive live demo scheduling with automated calendar integration",
      "Secure document submission and compliance verification portal",
      "High-converting dark gold & slate luxury FinTech UI system",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "FinTech", "REST APIs"],
    image: "/projects/primetaxsoftware.png",
    liveUrl: "https://primetaxsoftware.com/",
  },
  {
    id: "setfreeway",
    title: "Set Freeway",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A smart freight dispatch and fleet routing web application featuring real-time shipment telemetry, carrier mapping, and compliance tracking.",
    about:
      "Set Freeway is a freight logistics and fleet management platform engineered for freight forwarders and carrier dispatchers. The web app integrates real-time geospatial tracking, automated route compliance checks, multi-driver dispatch queues, and live transit telemetry dashboards.",
    features: [
      "Live geospatial fleet routing map with active driver telemetry",
      "Multi-status shipment tracking cards with real-time ETA calculation",
      "Automated carrier dispatch queue and load assignment workflows",
      "Analytics dashboard tracking transit time compliance and driver utilization",
      "High-contrast dark mode dashboard optimized for dispatcher multi-screen setups",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Mapbox", "REST APIs"],
    image: "/projects/setfreeway.png",
    liveUrl: "https://setfreeway.com/",
  },
  {
    id: "rixdu",
    title: "Rixdu",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A modern furniture and interior decor e-commerce platform offering curated collections, interactive product showcases, and seamless checkout.",
    about:
      "Rixdu is a contemporary furniture and home decor e-commerce platform crafted to deliver a seamless shopping experience for interior enthusiasts and homeowners. The platform showcases curated collections—from living room centerpieces to modern dining sets—backed by dynamic product filtering, responsive galleries, and lightning-fast checkout flow.",
    features: [
      "Curated product catalog with multi-category filtering (Living, Dining, Bedroom)",
      "High-resolution image galleries with interactive preview zoom",
      "Seamless shopping cart state management with persistent sessions",
      "Optimized responsive UI with smooth micro-interactions",
      "Integrated inquiry and contact routing for custom interior orders",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "REST APIs"],
    image: "/projects/rixdu.png",
    liveUrl: "https://www.rixdu.com/",
  },
  {
    id: "jinnar",
    title: "Jinnar",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "A Pan-African multi-vendor e-commerce marketplace empowering local artisans, merchants, and international shoppers with multi-currency trade.",
    about:
      "Jinnar is an expansive Pan-African marketplace engineered to connect African merchants, creative producers, and consumers across borders. The platform supports multi-currency transactions, localized logistics tracking, seller storefront management, and high-conversion product discovery across fashion, electronics, art, and groceries.",
    features: [
      "Multi-vendor merchant onboarding and product catalog management",
      "Multi-currency price conversion and localized payment gateways",
      "Advanced product search with auto-suggest and faceted filtering",
      "Real-time order tracking and seller fulfillment notifications",
      "High-performance responsive interface designed for low-bandwidth regions",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs"],
    image: "/projects/jinnar.png",
    liveUrl: "https://jinnar.com/",
  },
  {
    id: "training-jinnar",
    title: "Training Jinnar",
    category: "Full-Stack",
    year: "2024",
    featured: true,
    description:
      "An interactive learning management system offering curated professional certification programs, live mentor sessions, and progress tracking.",
    about:
      "Training Jinnar is the dedicated educational ecosystem of Jinnar, built to equip professionals, students, and entrepreneurs with in-demand technical, business, and digital skills. The platform features structured curriculum tracks, video lecture streaming, automated quiz evaluations, and verifiable certification badges.",
    features: [
      "Structured course curricula with modular lesson tracks and syllabus roadmaps",
      "Interactive video player with progress tracking and bookmarking",
      "Automated student assessment quizzes with instant evaluation",
      "Direct instructor Q&A messaging and cohort discussion forums",
      "Downloadable certificates of completion with unique verification IDs",
    ],
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "LMS"],
    image: "/projects/training-jinnar.png",
    liveUrl: "https://training.jinnar.com/",
  },
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
