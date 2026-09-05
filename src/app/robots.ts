import type { MetadataRoute } from "next"
import { getSEO } from "@/lib/db"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSEO()
  const baseUrl = seo.canonicalUrl || "https://shoaibdeve.me"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
