import type { Metadata, Viewport } from "next"
import { Instrument_Sans, JetBrains_Mono } from "next/font/google"
import { getSEO } from "@/lib/db"
import { Chatbot } from "@/components/Chatbot"
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
  const siteUrl = seo.canonicalUrl || "https://shoaibdeve.me"

  return {
    title: {
      default: seo.siteTitle,
      template: "%s | Muhammad Shoaib",
    },
    description: seo.metaDescription,
    keywords: seo.keywords,
    authors: [
      { name: "Muhammad Shoaib", url: siteUrl },
      { name: "Developer Shoaib", url: "https://www.linkedin.com/in/developershoaib/" }
    ],
    creator: "Muhammad Shoaib",
    publisher: "Muhammad Shoaib",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.metaDescription,
      url: siteUrl,
      siteName: "Muhammad Shoaib — Portfolio",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Muhammad Shoaib — Full-Stack Developer & Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@msabwebdeveloper",
      creator: seo.twitterHandle || "@msabwebdeveloper",
      title: seo.siteTitle,
      description: seo.metaDescription,
      images: [`${siteUrl}/twitter-image`],
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-icon.svg", type: "image/svg+xml" },
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const seo = await getSEO()
  const siteUrl = seo.canonicalUrl || "https://shoaibdeve.me"

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Muhammad Shoaib",
        alternateName: [
          "developer shoaib",
          "shoaib dev",
          "Shoaib",
          "Muhammad Shoaib Allah Bakhsh"
        ],
        url: siteUrl,
        image: `${siteUrl}${seo.ogImage || "/projects/infinite-market-fusion.png"}`,
        jobTitle: "Full-Stack Software Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Evonicsoft"
        },
        sameAs: [
          "https://www.linkedin.com/in/developershoaib/",
          "https://github.com/shoaib-ab",
          "https://x.com/msabwebdeveloper"
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bahawalpur",
          addressRegion: "Punjab",
          addressCountry: "PK"
        },
        email: "mailto:shoaibbinallahbakhsh@gmail.com",
        telephone: "+923088923063",
        knowsAbout: [
          "Full-Stack Development",
          "Software Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "REST APIs",
          "GraphQL",
          "Tailwind CSS",
          "PostgreSQL",
          "System Architecture"
        ],
        description: "Full-Stack Software Engineer specialising in Next.js, React, TypeScript, Node.js, and high-performance digital platforms."
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Muhammad Shoaib — Developer Shoaib Portfolio",
        description: "Official engineering portfolio of Full-Stack Engineer Muhammad Shoaib (Developer Shoaib)",
        publisher: {
          "@id": `${siteUrl}/#person`
        },
        inLanguage: "en-US"
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Muhammad Shoaib — Full-Stack Developer & Engineer",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`
        }
      }
    ]
  }

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#F9F8F5] text-[#111110] font-sans min-h-screen relative" suppressHydrationWarning>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
