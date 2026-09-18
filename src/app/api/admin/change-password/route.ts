import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { checkIsAuthenticated, verifyPassword } from "@/lib/auth"

export async function POST(request: Request) {
  const isAuthed = await checkIsAuthenticated()
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both current and new password are required." },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 400 }
      )
    }

    // Verify the current password
    if (!verifyPassword(currentPassword)) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 403 }
      )
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from the current one." },
        { status: 400 }
      )
    }

    // Update ADMIN_PASSWORD in .env.local
    const envPath = path.join(process.cwd(), ".env.local")
    let envContent = ""

    try {
      envContent = await fs.readFile(envPath, "utf-8")
    } catch {
      // .env.local doesn't exist yet — start fresh
    }

    if (envContent.match(/^ADMIN_PASSWORD=.*/m)) {
      // Replace existing entry
      envContent = envContent.replace(/^ADMIN_PASSWORD=.*$/m, `ADMIN_PASSWORD=${newPassword}`)
    } else {
      // Append new entry
      envContent = envContent.trimEnd() + `\nADMIN_PASSWORD=${newPassword}\n`
    }

    await fs.writeFile(envPath, envContent, "utf-8")

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to change password."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
