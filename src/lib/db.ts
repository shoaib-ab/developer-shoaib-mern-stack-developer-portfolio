import fs from "fs/promises"
import path from "path"
import { ALL_PROJECTS } from "@/data/projects"
import { EXPERIENCE } from "@/data/experience"
import { EDUCATION } from "@/data/education"
import { SiteData, ProfileData, SEOData, Project, ExperienceItem, EducationItem } from "./types"

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "content.json")

const INITIAL_PROFILE: ProfileData = {
  name: "Shoaib",
  roleTitle: "Full-Stack Developer / Engineer",
  statusBadge: "Available for full-time & selective contracts",
  heroTagline: "Full-Stack Developer / Engineer building thoughtful digital products.",
  heroBio:
    "I engineer scalable web platforms, interactive frontends, and reliable backend APIs with React, Next.js, TypeScript, Node.js, and modern cloud infrastructure.",
  aboutHeadline: "Building digital solutions with care, precision, and production reliability.",
  aboutParagraph1:
    "I'm a full-stack developer with extensive experience building production applications for commercial clients and enterprises. My work spans high-conversion corporate web platforms, e-commerce applications with Stripe, real-time analytics dashboards, and responsive frontends.",
  aboutParagraph2:
    "I focus on writing clean, maintainable TypeScript and building fast, resilient architectures that deliver tangible business results and delightful user experiences.",
  email: "shoaiballahbakhsh@gmail.com",
  githubUrl: "https://github.com/shoaib-ab",
  linkedinUrl: "https://www.linkedin.com/in/developershoaib/",
  resumeUrl: "/resume.pdf",
  contactHeadline: "Have a role or\nproject in mind?",
  contactSubtext:
    "I'm open to full-time engineering roles and selective contract engagements. If you're building something that requires a reliable full-stack developer, let's talk.",
}

const INITIAL_SEO: SEOData = {
  siteTitle: "Shoaib — Full-Stack Developer & Engineer",
  metaDescription:
    "Full-Stack Developer specialising in Next.js, React, TypeScript, Node.js, and modern web platforms. View commercial projects, corporate client work, and technical portfolio.",
  keywords: [
    "Shoaib",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Infinite Market Solutions",
    "Portfolio",
    "Web Engineer",
  ],
  ogImage: "/projects/infinite-market-solutions.png",
  canonicalUrl: "https://shoaibdeve.me",
  twitterHandle: "@msabwebdeveloper",
}

const DEFAULT_DATA: SiteData = {
  profile: INITIAL_PROFILE,
  projects: ALL_PROJECTS,
  experiences: EXPERIENCE,
  education: EDUCATION,
  seo: INITIAL_SEO,
}

// Ensure the data file exists on disk
async function ensureDataFile(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8")
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_DATA,
      ...parsed,
      profile: { ...DEFAULT_DATA.profile, ...(parsed.profile || {}) },
      seo: { ...DEFAULT_DATA.seo, ...(parsed.seo || {}) },
      projects: parsed.projects || DEFAULT_DATA.projects,
      experiences: parsed.experiences || DEFAULT_DATA.experiences,
      education: parsed.education || DEFAULT_DATA.education,
    }
  } catch {
    // If not found, create file with default data
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true })
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(DEFAULT_DATA, null, 2), "utf-8")
    return DEFAULT_DATA
  }
}

export async function getSiteData(): Promise<SiteData> {
  return await ensureDataFile()
}

export async function updateSiteData(updated: Partial<SiteData>): Promise<SiteData> {
  const current = await ensureDataFile()
  const merged: SiteData = {
    ...current,
    ...updated,
    profile: { ...current.profile, ...(updated.profile || {}) },
    seo: { ...current.seo, ...(updated.seo || {}) },
    projects: updated.projects || current.projects,
    experiences: updated.experiences || current.experiences,
    education: updated.education || current.education,
  }

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(merged, null, 2), "utf-8")
  return merged
}

export async function getProjects(): Promise<Project[]> {
  const data = await getSiteData()
  return data.projects
}

export async function getProfile(): Promise<ProfileData> {
  const data = await getSiteData()
  return data.profile
}

export async function getSEO(): Promise<SEOData> {
  const data = await getSiteData()
  return data.seo
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  const data = await getSiteData()
  return data.experiences
}

export async function getEducation(): Promise<EducationItem[]> {
  const data = await getSiteData()
  return data.education
}
