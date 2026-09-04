import type { Metadata, Viewport } from "next"
import { Instrument_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Shoaib — Full-Stack Developer",
  description:
    "Full-Stack Developer and Engineer specialising in React, Next.js, TypeScript, Node.js, Express, and MongoDB.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Shoaib Portfolio"],
  authors: [{ name: "Shoaib" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "#shoaib",
                  name: "Shoaib",
                  jobTitle: "Full-Stack Developer",
                  description:
                    "Full-Stack Developer and Engineer specialising in React, Next.js, TypeScript, Node.js, Express, and MongoDB.",
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "Strapi",
                    "REST APIs",
                  ],
                  email: "hello@shoaib.dev",
                  sameAs: ["https://github.com/shoaib", "https://linkedin.com/in/shoaib"],
                },
                {
                  "@type": "WebSite",
                  "@id": "#website",
                  name: "Shoaib — Full-Stack Developer",
                  author: { "@id": "#shoaib" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#F9F8F5] text-[#111110] font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
