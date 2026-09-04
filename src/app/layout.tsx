import type { Metadata, Viewport } from "next"
import { Instrument_Sans, JetBrains_Mono } from "next/font/google"
import { getSEO } from "@/lib/db"
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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO()

  return {
    title: seo.siteTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    authors: [{ name: "Shoaib" }],
    metadataBase: new URL(seo.canonicalUrl || "https://shoaibdeve.me"),
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl,
      siteName: seo.siteTitle,
      images: [
        {
          url: seo.ogImage || "/projects/nexus-commerce.jpg",
          width: 1200,
          height: 630,
          alt: seo.siteTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteTitle,
      description: seo.metaDescription,
      creator: seo.twitterHandle,
      images: [seo.ogImage || "/projects/nexus-commerce.jpg"],
    },
  }
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
      <body className="antialiased bg-[#F9F8F5] text-[#111110] font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
