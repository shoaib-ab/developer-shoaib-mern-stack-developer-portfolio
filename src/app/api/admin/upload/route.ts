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
    const folder = (formData.get("folder") as string) || "projects"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
    }

    const isResume = folder === "resume" || file.type === "application/pdf" || file.name.endsWith(".pdf")

    if (isResume) {
      // Validate document format (PDF, Word)
      const validDocTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      const ext = path.extname(file.name).toLowerCase()
      if (!validDocTypes.includes(file.type) && ext !== ".pdf" && ext !== ".docx" && ext !== ".doc") {
        return NextResponse.json(
          { error: "Invalid document type. Only PDF and Word documents are permitted." },
          { status: 400 }
        )
      }

      // Limit to 15MB for resume
      if (file.size > 15 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File too large. Maximum document size is 15MB." },
          { status: 400 }
        )
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const finalExt = ext || ".pdf"
      const baseName = path.basename(file.name, finalExt).replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase()
      const fileName = `${baseName}_${Date.now()}${finalExt}`

      const uploadDir = path.join(process.cwd(), "public", "uploads")
      await fs.mkdir(uploadDir, { recursive: true })

      const filePath = path.join(uploadDir, fileName)
      await fs.writeFile(filePath, buffer)

      // Also overwrite /public/resume.pdf if it's a PDF for direct canonical access
      if (finalExt === ".pdf") {
        try {
          await fs.writeFile(path.join(process.cwd(), "public", "resume.pdf"), buffer)
        } catch {
          // non-critical
        }
      }

      return NextResponse.json({
        success: true,
        url: `/uploads/${fileName}`,
        fileName,
      })
    }

    // Validate image format for projects
    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
    if (!validImageTypes.includes(file.type)) {
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
    const message = err instanceof Error ? err.message : "Failed to upload file."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
