import type { MetadataRoute } from "next"
import { getSEO, getProjects } from "@/lib/db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSEO()
  const projects = await getProjects()
  const baseUrl = seo.canonicalUrl || "https://shoaibdeve.me"
  const currentDate = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Add all project anchor/modal references or paths
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work?project=${encodeURIComponent(p.id)}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
