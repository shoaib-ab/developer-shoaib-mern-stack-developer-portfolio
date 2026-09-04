import { NextResponse } from "next/server"
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password. Please try again." },
        { status: 401 }
      )
    }

    const token = createSessionToken()
    const response = NextResponse.json({ success: true })

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    )
  }
}
