import { redirect } from "next/navigation"
import { Metadata } from "next"
import { checkIsAuthenticated } from "@/lib/auth"
import { getSiteData } from "@/lib/db"
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient"

export const metadata: Metadata = {
  title: "Admin Studio — Shoaib",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const isAuthed = await checkIsAuthenticated()

  if (!isAuthed) {
    redirect("/admin/login")
  }

  const siteData = await getSiteData()

  return <AdminDashboardClient initialData={siteData} />
}
