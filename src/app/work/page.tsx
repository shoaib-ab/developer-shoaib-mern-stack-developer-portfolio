import { Metadata } from "next"
import { getSiteData } from "@/lib/db"
import { WorkPageClient } from "@/components/WorkPageClient"

export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData()
  const name = data.profile?.name || "Shoaib"
  return {
    title: `Work & Projects — ${name}`,
    description: `A complete record of commercial projects, tools, and platforms built by ${name}.`,
  }
}

export default async function WorkPage() {
  const data = await getSiteData()
  return <WorkPageClient initialProjects={data.projects} />
}

