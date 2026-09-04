import { Metadata } from "next"
import { WorkPageClient } from "@/components/WorkPageClient"

export const metadata: Metadata = {
  title: "Work & Projects — Shoaib",
  description: "A complete record of commercial projects, tools, and platforms built by Shoaib.",
}

export default function WorkPage() {
  return <WorkPageClient />
}
