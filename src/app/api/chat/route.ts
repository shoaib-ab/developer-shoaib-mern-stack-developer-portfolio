import { NextResponse } from "next/server"
import content from "@/data/content.json"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Array of messages is required." },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    const latestUserMessage = messages[messages.length - 1].content

    // Knowledge base extracted directly from verified portfolio content
    const systemPrompt = `You are Shoaib's Portfolio AI Assistant on his official website (shoaibdeve.me).
Your goal is to warmly, concisely, and professionally answer questions from clients, recruiters, and engineering managers about Muhammad Shoaib (also known as Developer Shoaib or Shoaib Dev).

KEY FACTS ABOUT SHOAIB:
- Identity: Muhammad Shoaib, Senior Full-Stack Software Engineer based in Pakistan.
- Primary Expertise: Next.js (App Router, Server Actions), React 19, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Supabase, REST APIs, GraphQL, System Architecture, Core Web Vitals optimization.
- Commercial Projects:
  1. Infinite Market Solutions (infinitemarketsolutions.com) - Corporate marketing & digital analytics platform.
  2. Infinite Market Fusion (infinitemarketfusion.com) - Real-time market analytics dashboard with Chart.js.
  3. BW Digit (bwdigit.de) - German digital transformation consultancy with multilingual i18n and GDPR compliance.
  4. Origin by the Sea (originsbythesea.com) - Luxury coastal e-commerce with Stripe checkout.
  5. Skymate Traveller (skymatetraveller.com) - Travel agency platform with package search and itinerary workflows.
- Experience:
  - Software Engineer at Infinite Market Solutions (2024 — Present)
  - Full Stack Developer at Inforox Tech (2023 — 2024)
  - Front End Developer at Devorbis (2022 — 2023)
  - Front-End Developer Intern at Codes Thinker (2022)
- Education: BS in Computer Science from The Islamia University of Bahawalpur (IUB, 2020 — 2024).
- Contact & Socials:
  - WhatsApp & Phone: +92 308 8923063
  - Email: shoaibbinallahbakhsh@gmail.com
  - LinkedIn: https://www.linkedin.com/in/developershoaib/
  - GitHub: https://github.com/shoaib-ab
  - Availability: Available for full-time roles, contract engineering, and high-impact web consultancy.

COMMUNICATION RULES:
- Keep answers concise (2 to 4 sentences or punchy bullet points).
- Be polite, tech-savvy, and confident in representing Shoaib's engineering talent.
- If someone asks to hire, collaborate, or schedule an interview, highlight his WhatsApp (+92 308 8923063) and email (shoaibbinallahbakhsh@gmail.com).
- Stick strictly to Shoaib's verified qualifications; do not fabricate unrelated facts.`

    if (apiKey) {
      try {
        // Format history for Gemini generateContent
        const contents = [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${latestUserMessage}` }],
          },
        ]

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (aiReply) {
            return NextResponse.json({ reply: aiReply })
          }
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to local engine:", geminiError)
      }
    }

    // High-fidelity fallback knowledge engine if network fails or quota triggers
    const query = latestUserMessage.toLowerCase()
    let reply = ""

    if (query.includes("tech") || query.includes("stack") || query.includes("skills") || query.includes("language")) {
      reply = "Shoaib specializes in full-stack web development. His primary stack includes Next.js (App Router), React 19, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Supabase, and REST/GraphQL APIs. He also builds real-time analytics with Chart.js and handles payment integrations like Stripe."
    } else if (query.includes("project") || query.includes("work") || query.includes("commercial")) {
      reply = "Shoaib has built commercial enterprise platforms including Infinite Market Solutions, Infinite Market Fusion (real-time analytics), BW Digit (a multilingual German consultancy site), Origin by the Sea (luxury e-commerce with Stripe), and Skymate Traveller. You can explore all 17 projects in the Work section!"
    } else if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("phone") || query.includes("whatsapp")) {
      reply = "Shoaib is open to full-stack engineering roles and high-impact contracts! You can message him directly on WhatsApp at +92 308 8923063, email him at shoaibbinallahbakhsh@gmail.com, or connect on LinkedIn (linkedin.com/in/developershoaib)."
    } else if (query.includes("experience") || query.includes("job") || query.includes("company")) {
      reply = "Shoaib is currently a Software Engineer at Infinite Market Solutions (2024–Present). Previously, he worked as a Full Stack Developer at Inforox Tech and Frontend Developer at Devorbis, delivering production apps for clients across Germany, the UAE, and globally."
    } else if (query.includes("education") || query.includes("degree") || query.includes("university")) {
      reply = "Shoaib graduated with a Bachelor of Science in Computer Science (BSCS) from The Islamia University of Bahawalpur (IUB, 2020–2024)."
    } else {
      reply = "I'm Shoaib's AI assistant! Feel free to ask me about his commercial projects, technical stack (Next.js, TypeScript, React, Node.js), engineering work history, or how to get in touch with him directly for opportunities."
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to generate chat response." },
      { status: 500 }
    )
  }
}
