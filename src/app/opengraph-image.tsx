import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Muhammad Shoaib — Full-Stack Developer & Engineer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0f1115 0%, #090a0d 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 168, 0, 0.18) 0%, rgba(20, 168, 0, 0) 70%)",
          }}
        />

        {/* Header brand pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            S
          </div>
          <span
            style={{
              color: "#a1a1aa",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            shoaibdeve.me
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "auto",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(20, 168, 0, 0.12)",
              border: "1px solid rgba(20, 168, 0, 0.3)",
              color: "#14a800",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#14a800",
              }}
            />
            Available for Engineering Roles
          </div>
        </div>

        {/* Main Title & Role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
              }}
            >
              Muhammad Shoaib
            </span>
            <span
              style={{
                color: "#14A800",
                fontSize: "64px",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              .
            </span>
          </div>

          <p
            style={{
              color: "#d4d4d8",
              fontSize: "28px",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Full-Stack Software Engineer & Platform Architect
          </p>

          <p
            style={{
              color: "#71717a",
              fontSize: "20px",
              lineHeight: 1.5,
              maxWidth: "850px",
              margin: 0,
            }}
          >
            Specialising in Next.js, React, TypeScript, Node.js, and modern AI-driven cloud architectures.
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
          }}
        >
          {["Next.js 15", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                color: "#e4e4e7",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
