import { Project } from "@/data/projects"
import { ExperienceItem } from "@/data/experience"
import { EducationItem } from "@/data/education"

export type { Project, ExperienceItem, EducationItem }

export interface ProfileData {
  name: string
  roleTitle: string
  statusBadge: string
  heroTagline: string
  heroBio: string
  aboutHeadline: string
  aboutParagraph1: string
  aboutParagraph2: string
  email: string
  githubUrl: string
  linkedinUrl: string
  resumeUrl: string
  contactHeadline: string
  contactSubtext: string
}

export interface SEOData {
  siteTitle: string
  metaDescription: string
  keywords: string[]
  ogImage: string
  canonicalUrl: string
  twitterHandle: string
}

export interface SiteData {
  profile: ProfileData
  projects: Project[]
  experiences: ExperienceItem[]
  education: EducationItem[]
  seo: SEOData
}
