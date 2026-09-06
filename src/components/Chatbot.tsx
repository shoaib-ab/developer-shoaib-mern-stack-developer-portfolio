"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface Message {
  id: string
  role: "user" | "model"
  content: string
}

const QUICK_PROMPTS = [
  "What is Shoaib's core tech stack?",
  "Tell me about his commercial projects",
  "Is Shoaib available for hire?",
  "How can I contact him directly?",
]

// Parse inline markdown tokens: [link](url), **bold**, `code`, *italic*
function formatInlineTokens(text: string): React.ReactNode {
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let keyIndex = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#14A800] underline font-medium hover:text-[#118500] transition-colors break-all"
        >
          {match[2]}
        </a>
      )
    } else if (match[4]) {
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-[#111110]">
          {match[4]}
        </strong>
      )
    } else if (match[5]) {
      parts.push(
        <code
          key={`code-${keyIndex++}`}
          className="font-mono text-[11px] bg-[#EAE8E3] px-1 py-0.5 rounded text-[#111110]"
        >
          {match[5]}
        </code>
      )
    } else if (match[6]) {
      parts.push(
        <em key={`italic-${keyIndex++}`} className="italic text-[#3C3A36]">
          {match[6]}
        </em>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

function FormattedMessage({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{content}</div>
  }

  const rawLines = content.split("\n")

  return (
    <div className="text-xs sm:text-sm leading-relaxed space-y-1.5 text-[#111110]">
      {rawLines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-0.5" />
        }

        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const bulletText = trimmed.replace(/^(\*|-)\s+/, "")
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 my-0.5">
              <span className="text-[#14A800] font-bold text-sm leading-none mt-0.5 select-none">•</span>
              <span className="flex-1">{formatInlineTokens(bulletText)}</span>
            </div>
          )
        }

        return (
          <p key={idx} className="my-0.5">
            {formatInlineTokens(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content:
        "Hi there! 👋 I'm Shoaib's AI Assistant. Ask me anything about his technical experience, commercial projects, tech stack, or hiring availability!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Intro animation phases: "center" -> "flying" -> "docked"
  const [introPhase, setIntroPhase] = useState<"center" | "flying" | "docked">("center")

  // Current (x, y) coordinates of the widget (top-left)
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const dragRef = useRef<{
    pointerId: number | null
    startX: number
    startY: number
    initialX: number
    initialY: number
    hasMoved: boolean
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  })

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const widgetRef = useRef<HTMLButtonElement>(null)

  // Helper to calculate default docked coordinates
  const getDefaultDockedCoords = useCallback(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 }
    const x = Math.max(16, window.innerWidth - 72)
    const y = Math.max(76, window.innerHeight - 136)
    return { x, y }
  }, [])

  // Helper to calculate screen center coordinates
  const getCenterCoords = useCallback(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 }
    const x = Math.round(window.innerWidth / 2 - 28)
    const y = Math.round(window.innerHeight / 2 - 28)
    return { x, y }
  }, [])

  // Trigger intro animation on page mount
  useEffect(() => {
    // Lock body scroll during center spotlight intro so page cannot scroll
    document.body.style.overflow = "hidden"

    // Start in center
    const center = getCenterCoords()
    setCoords(center)
    setIntroPhase("center")

    // After 1.4s, glide to corner
    const timer1 = setTimeout(() => {
      const docked = getDefaultDockedCoords()
      setIntroPhase("flying")
      setCoords(docked)

      // Transition takes 850ms, then finalize to docked state
      const timer2 = setTimeout(() => {
        setIntroPhase("docked")
        document.body.style.overflow = ""
      }, 850)

      return () => clearTimeout(timer2)
    }, 1400)

    return () => {
      clearTimeout(timer1)
      document.body.style.overflow = ""
    }
  }, [getCenterCoords, getDefaultDockedCoords])

  // Skip intro immediately if user clicks backdrop or scrolls
  const handleSkipIntro = useCallback(() => {
    if (introPhase === "center") {
      document.body.style.overflow = ""
      const docked = getDefaultDockedCoords()
      setIntroPhase("flying")
      setCoords(docked)
      setTimeout(() => {
        setIntroPhase("docked")
      }, 850)
    }
  }, [introPhase, getDefaultDockedCoords])

  // Adjust coordinates on window resize so widget never gets lost off-screen
  useEffect(() => {
    const handleResize = () => {
      if (introPhase !== "docked") return
      setCoords((prev) => {
        if (!prev) return getDefaultDockedCoords()
        const clampedX = Math.max(16, Math.min(window.innerWidth - 64, prev.x))
        const clampedY = Math.max(76, Math.min(window.innerHeight - 64, prev.y))
        return { x: clampedX, y: clampedY }
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [introPhase, getDefaultDockedCoords])

  // Auto-scroll messages container safely without scrolling main window
  useEffect(() => {
    if (isOpen && !isMinimized && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, isOpen, isMinimized, isLoading])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [isOpen, isMinimized])

  // Pointer down (mouse & touch drag start)
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (introPhase !== "docked") return

    // Allow interaction with header/buttons inside without starting drag
    const target = e.target as HTMLElement
    if (target.closest("button") && target.closest("button") !== widgetRef.current) {
      return
    }

    const currentX = coords ? coords.x : getDefaultDockedCoords().x
    const currentY = coords ? coords.y : getDefaultDockedCoords().y

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentX,
      initialY: currentY,
      hasMoved: false,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch { }

    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (!isDragging || dragRef.current.pointerId !== e.pointerId) return

    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY

    // If moved more than 5px, mark as drag rather than click
    if (Math.hypot(dx, dy) > 5) {
      dragRef.current.hasMoved = true
    }

    const newX = Math.max(16, Math.min(window.innerWidth - 64, dragRef.current.initialX + dx))
    const newY = Math.max(76, Math.min(window.innerHeight - 64, dragRef.current.initialY + dy))

    setCoords({ x: newX, y: newY })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (dragRef.current.pointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch { }
      setIsDragging(false)
      dragRef.current.pointerId = null
    }
  }

  // Handle click on circular launcher button
  const handleLauncherClick = () => {
    if (dragRef.current.hasMoved) {
      dragRef.current.hasMoved = false
      return
    }

    if (introPhase === "center") {
      handleSkipIntro()
      return
    }

    if (isMinimized) {
      setIsMinimized(false)
      setIsOpen(true)
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  // Send message to AI endpoint
  const handleSend = async (userText: string) => {
    const query = userText.trim()
    if (!query || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) throw new Error("Failed to get response")

      const data = await res.json()
      const aiReply = data.reply || "Sorry, I had trouble processing that. Please try again!"

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: aiReply,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content:
            "I'm momentarily having trouble connecting. You can message Shoaib directly on WhatsApp (+92 308 8923063) or email shoaibbinallahbakhsh@gmail.com!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content:
          "Hi there! 👋 I'm Shoaib's AI Assistant. Ask me anything about his technical experience, commercial projects, tech stack, or hiring availability!",
      },
    ])
  }

  // Calculate modal position clamped cleanly inside the viewport
  const getModalStyle = () => {
    if (typeof window === "undefined") return { bottom: "80px", right: "24px" }

    const cur = coords || getDefaultDockedCoords()
    const modalWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 400
    const modalHeight = Math.min(520, window.innerHeight - 100)

    // Horizontal anchoring
    let left: number
    if (cur.x > window.innerWidth / 2) {
      // Near right side: anchor right edge to widget
      left = Math.max(16, cur.x + 48 - modalWidth)
    } else {
      // Near left side: anchor left edge to widget
      left = Math.min(window.innerWidth - modalWidth - 16, Math.max(16, cur.x))
    }

    // Vertical anchoring
    let top: number
    if (cur.y > window.innerHeight / 2) {
      // Near bottom side: open above widget
      top = Math.max(76, cur.y - modalHeight - 12)
    } else {
      // Near top side: open below widget
      top = Math.min(window.innerHeight - modalHeight - 16, cur.y + 56)
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
    }
  }

  // Style for widget positioning
  const getWidgetPositionStyle = () => {
    if (!coords) {
      return {
        position: "fixed" as const,
        bottom: "80px",
        right: "24px",
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 60,
      }
    }

    // Center intro stage
    if (introPhase === "center") {
      return {
        position: "fixed" as const,
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: "scale(1.25)",
        zIndex: 80,
        transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }
    }

    // Flying from center to docked corner
    if (introPhase === "flying") {
      return {
        position: "fixed" as const,
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: "scale(1)",
        zIndex: 80,
        transition: "all 850ms cubic-bezier(0.16, 1, 0.3, 1)",
      }
    }

    // Docked & Draggable
    return {
      position: "fixed" as const,
      left: `${coords.x}px`,
      top: `${coords.y}px`,
      zIndex: 60,
      cursor: isDragging ? "grabbing" : "grab",
      transition: isDragging ? "none" : "transform 150ms ease",
    }
  }

  return (
    <aside aria-label="Shoaib AI Portfolio Assistant" className="contents">
      {/* ─── Backdrop Blur During Center Spotlight Intro ─── */}
      {introPhase !== "docked" && (
        <>
          {/* Full-Screen Bleed Backdrop Overlay (Extends past all viewport edges to eliminate edge blur gaps) */}
          <div
            onClick={handleSkipIntro}
            style={{
              position: "fixed",
              top: "-100px",
              left: "-100px",
              right: "-100px",
              bottom: "-100px",
              width: "calc(100vw + 200px)",
              height: "calc(100vh + 200px)",
              zIndex: 75,
            }}
            className={`transition-opacity duration-700 cursor-pointer ${
              introPhase === "center"
                ? "bg-black/60 backdrop-blur-md opacity-100"
                : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
            }`}
          />

          {/* Spotlight welcome pill in center */}
          {introPhase === "center" && (
            <div
              style={{ zIndex: 80 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[88px] flex flex-col items-center pointer-events-none animate-in fade-in zoom-in-95 duration-400"
            >
              {/* Clean, Aesthetic Single Pill */}
              <div className="px-5 py-2 rounded-full bg-[#111110] border border-[#2B2A28] text-[#F9F8F5] shadow-[0_12px_36px_rgba(0,0,0,0.55)] flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14A800] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14A800]" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white font-sans">
                  Meet Shoaib AI Assistant
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#14A800]/15 text-[#14A800] border border-[#14A800]/30 select-none">
                  ✨ AI
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── Floating Launcher / Minimized Capsule ─── */}
      {/* If Chat is Open & Not Minimized, hide the launcher button to prevent duplicate UI */}
      {(!isOpen || isMinimized) && (
        <>
          {isMinimized ? (
            /* Minimized Sleek Pill (Only rendered when minimized) */
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={getWidgetPositionStyle()}
              className="fixed flex items-center gap-2.5 px-3.5 py-2 bg-[#111110] text-[#F9F8F5] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#27272A] hover:border-[#14A800]/70 transition-colors select-none touch-none animate-in fade-in zoom-in-95 duration-200"
            >
              <button
                onClick={() => {
                  if (!dragRef.current.hasMoved) {
                    setIsMinimized(false)
                    setIsOpen(true)
                  }
                }}
                className="flex items-center gap-2 cursor-pointer"
                title="Expand Shoaib AI"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14A800] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14A800]" />
                </span>
                <span className="text-xs font-medium text-white tracking-tight">Shoaib AI</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#27272A] text-[#A1A1AA]">
                  Active
                </span>
              </button>

              <button
                onClick={() => {
                  setIsMinimized(false)
                  setIsOpen(true)
                }}
                title="Expand chat"
                className="p-1 text-[#8C8B87] hover:text-[#14A800] transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19L19 5M19 5v10M19 5H9" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsMinimized(false)
                }}
                title="Close chat"
                className="p-1 text-[#8C8B87] hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            /* Circular Floating Launcher Button */
            <button
              ref={widgetRef}
              onClick={handleLauncherClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={getWidgetPositionStyle()}
              aria-label="Open Shoaib AI Assistant (Draggable)"
              className="fixed group flex items-center justify-center w-12 h-12 rounded-full bg-[#111110] text-[#F9F8F5] shadow-[0_8px_28px_rgba(0,0,0,0.35)] border border-[#2B2A28] hover:scale-105 active:scale-95 select-none touch-none"
            >
              {/* Active Pulse Dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14A800] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#14A800] border-2 border-[#111110]" />
              </span>

              {/* Chat Message SVG Icon */}
              <svg className="w-5 h-5 text-[#14A800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>

              {/* Hover Tooltip (Desktop only when docked) */}
              {introPhase === "docked" && !isDragging && (
                <span className="absolute right-full mr-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111110] text-[#F9F8F5] text-xs font-medium rounded-[2px] shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <span>Chat with Shoaib AI (Drag to move)</span>
                  <span className="text-[#14A800] font-bold">✨</span>
                </span>
              )}
            </button>
          )}
        </>
      )}

      {/* ─── Chat Window Modal ─── */}
      {isOpen && !isMinimized && (
        <div
          role="dialog"
          aria-label="Shoaib AI Assistant Chat"
          style={getModalStyle()}
          className="fixed z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[410px] h-[520px] max-h-[78vh] bg-[#FFFFFF] border border-[#E5E3DE] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#111110] text-[#F9F8F5] flex items-center justify-between border-b border-[#2B2A28]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center font-bold text-xs text-white">
                S
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#14A800]" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold tracking-tight text-[#F9F8F5]">Shoaib AI</h3>
                <p className="text-[11px] text-[#8C8B87]">Full-Stack Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Direct WhatsApp Quick Contact */}
              <a
                href="https://wa.me/923088923063?text=Hi%20Shoaib%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat directly on WhatsApp (+92 308 8923063)"
                className="p-1.5 text-[#8C8B87] hover:text-[#25D366] hover:bg-[#2B2A28] rounded-md transition-colors cursor-pointer"
                aria-label="Direct WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29" />
                </svg>
              </a>

              {/* Reset Conversation */}
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 text-[#8C8B87] hover:text-[#F9F8F5] hover:bg-[#2B2A28] rounded-md transition-colors cursor-pointer"
                aria-label="Reset chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              {/* Minimize Chat */}
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize chat"
                className="p-1.5 text-[#8C8B87] hover:text-[#F9F8F5] hover:bg-[#2B2A28] rounded-md transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                </svg>
              </button>

              {/* Close Chat */}
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsMinimized(false)
                }}
                title="Close chat"
                className="p-1.5 text-[#8C8B87] hover:text-[#F9F8F5] hover:bg-[#2B2A28] rounded-md transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9F8F5]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "model" && (
                  <div className="w-6 h-6 rounded-full bg-[#111110] text-[#F9F8F5] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    S
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${m.role === "user"
                      ? "bg-[#111110] text-white rounded-br-xs"
                      : "bg-[#FFFFFF] text-[#111110] border border-[#E5E3DE] rounded-bl-xs shadow-xs"
                    }`}
                >
                  <FormattedMessage content={m.content} isUser={m.role === "user"} />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#111110] text-[#F9F8F5] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  S
                </div>
                <div className="bg-[#FFFFFF] border border-[#E5E3DE] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14A800] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14A800] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14A800] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-[#F9F8F5] border-t border-[#EAE8E3] flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] bg-[#FFFFFF] border border-[#DDDCD7] hover:border-[#14A800] hover:text-[#14A800] text-[#3C3A36] px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="p-3 bg-[#FFFFFF] border-t border-[#E5E3DE] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Shoaib..."
              disabled={isLoading}
              className="flex-1 text-xs sm:text-sm bg-[#F9F8F5] border border-[#E5E3DE] rounded-full px-3.5 py-2 text-[#111110] placeholder-[#8C8B87] focus:outline-hidden focus:border-[#14A800] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-full bg-[#111110] text-[#F9F8F5] flex items-center justify-center hover:bg-[#14A800] disabled:opacity-40 disabled:hover:bg-[#111110] transition-colors cursor-pointer flex-shrink-0"
              aria-label="Send message"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  )
}
