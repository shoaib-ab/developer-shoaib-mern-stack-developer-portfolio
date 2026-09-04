import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { checkIsAuthenticated } from "@/lib/auth"

export async function POST(request: Request) {
  const isAuthed = await checkIsAuthenticated()
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
    }

    // Validate image format
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WebP, and SVG images are permitted." },
        { status: 400 }
      )
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum image size is 5MB." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename
    const ext = path.extname(file.name) || ".jpg"
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase()
    const fileName = `${baseName}_${Date.now()}${ext}`

    const uploadDir = path.join(process.cwd(), "public", "projects")
    await fs.mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, fileName)
    await fs.writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/projects/${fileName}`,
      fileName,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload image."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
