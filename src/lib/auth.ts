import { cookies } from "next/headers"
import crypto from "crypto"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
const ADMIN_SECRET = process.env.ADMIN_SECRET || "shoaib-portfolio-admin-secret-2025"
export const SESSION_COOKIE_NAME = "shoaib_admin_session"

// Generate HMAC SHA-256 signature
function signPayload(payload: string): string {
  return crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex")
}

export function verifyPassword(passwordAttempt: string): boolean {
  return passwordAttempt === ADMIN_PASSWORD
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const signature = signPayload(`admin_${timestamp}`)
  return `${timestamp}.${signature}`
}

export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes(".")) return false
  const [timestamp, signature] = token.split(".")
  const expected = signPayload(`admin_${timestamp}`)
  if (signature !== expected) return false

  // Max session age: 7 days
  const age = Date.now() - parseInt(timestamp, 10)
  return age < 7 * 24 * 60 * 60 * 1000
}

export async function checkIsAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!session) return false
  return verifySessionToken(session)
}
