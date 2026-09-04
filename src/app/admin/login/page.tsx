"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Incorrect password. Please try again.")
        setLoading(false)
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("An unexpected network error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#111110] flex flex-col justify-between p-6 md:p-12">
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link href="/" className="font-sans text-base font-bold tracking-tight text-[#111110]">
          Shoaib<span className="text-[#14A800]">.</span>
        </Link>
        <Link href="/" className="text-xs font-mono text-[#54534F] hover:text-[#111110] transition-colors">
          ← Public Site
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto bg-[#FFFFFF] border border-[#E3E1DB] p-8 rounded-[4px] shadow-sm space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#14A800] font-semibold block mb-1">
            00 — Portal
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111110]">
            Admin Access
          </h1>
          <p className="text-xs text-[#54534F] mt-1.5 leading-relaxed">
            Enter your admin password to manage your projects, hero content, career timeline, and SEO meta tags.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-mono text-[#3D3C38] mb-1.5 uppercase tracking-wider">
              Master Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              required
              autoFocus
              className="w-full px-3.5 py-2.5 bg-[#F9F8F5] border border-[#E3E1DB] rounded-[2px] font-sans text-sm text-[#111110] placeholder-[#8C8B87] focus:outline-none focus:border-[#111110] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center text-xs py-2.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter Dashboard →"}
          </button>
        </form>

        <div className="pt-2 border-t border-[#F0EFEA] text-[11px] font-mono text-[#706E68] text-center">
          Default dev password: <span className="font-bold text-[#111110]">admin123</span>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center font-mono text-[11px] text-[#8C8B87]">
        © {new Date().getFullYear()} Shoaib • Private Content Engine
      </div>
    </div>
  )
}
