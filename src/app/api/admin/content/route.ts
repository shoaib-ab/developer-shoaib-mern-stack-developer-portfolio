import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { checkIsAuthenticated } from "@/lib/auth"
import { getSiteData, updateSiteData } from "@/lib/db"

export async function GET() {
  const isAuthed = await checkIsAuthenticated()
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await getSiteData()
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const isAuthed = await checkIsAuthenticated()
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await request.json()
    const updated = await updateSiteData(payload)

    // Instantly purge and refresh cache for public pages
    revalidatePath("/")
    revalidatePath("/work")

    return NextResponse.json({ success: true, data: updated })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update content."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
