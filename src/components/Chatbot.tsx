"use client"

import { useState, useRef, useEffect } from "react"

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
      // [label](url)
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
      // **bold**
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-[#111110]">
          {match[4]}
        </strong>
      )
    } else if (match[5]) {
      // `code`
      parts.push(
        <code
          key={`code-${keyIndex++}`}
          className="font-mono text-[11px] bg-[#EAE8E3] px-1 py-0.5 rounded text-[#111110]"
        >
          {match[5]}
        </code>
      )
    } else if (match[6]) {
      // *italic*
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

        // Bullet list detection
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

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

  return (
    <aside aria-label="AI Portfolio Assistant">
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI Chat" : "Open Shoaib AI Assistant"}
        className="fixed bottom-20 right-6 md:bottom-22 md:right-8 z-40 group flex items-center justify-center w-12 h-12 rounded-full bg-[#111110] text-[#F9F8F5] shadow-[0_6px_24px_rgba(0,0,0,0.25)] border border-[#2B2A28] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Active Pulse Dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14A800] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#14A800] border-2 border-[#111110]" />
        </span>

        {isOpen ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#14A800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}

        {/* Hover Tooltip (Desktop) */}
        {!isOpen && (
          <span className="absolute right-full mr-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111110] text-[#F9F8F5] text-xs font-medium rounded-[2px] shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
            <span>Ask Shoaib AI</span>
            <span className="text-[#14A800] font-bold">✨</span>
          </span>
        )}
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Shoaib AI Assistant Chat"
          className="fixed bottom-20 right-4 sm:right-6 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[410px] h-[520px] max-h-[78vh] bg-[#FFFFFF] border border-[#E5E3DE] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#111110] text-[#F9F8F5] flex items-center justify-between border-b border-[#2B2A28]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center font-bold text-xs text-white">
                S
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#14A800]" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold tracking-tight text-[#F9F8F5]">Shoaib AI</h3>
                <p className="text-[11px] text-[#8C8B87]">Answers questions about Shoaib</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 text-[#8C8B87] hover:text-[#F9F8F5] hover:bg-[#2B2A28] rounded-md transition-colors cursor-pointer"
                aria-label="Reset chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
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

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9F8F5]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-xs ${
                    m.role === "user"
                      ? "bg-[#111110] text-[#F9F8F5] rounded-br-sm"
                      : "bg-[#FFFFFF] text-[#111110] border border-[#E5E3DE] rounded-bl-sm"
                  }`}
                >
                  <FormattedMessage content={m.content} isUser={m.role === "user"} />
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips (when user hasn't asked questions yet) */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="text-[11px] font-mono text-[#8C8B87] mb-2 uppercase tracking-wider">Suggested Questions</p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs bg-[#FFFFFF] hover:bg-[#F2F1ED] text-[#2B2A28] border border-[#E5E3DE] hover:border-[#14A800]/50 px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <span className="text-[#8C8B87] group-hover:text-[#14A800] text-xs transition-colors">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E5E3DE] px-3.5 py-2.5 rounded-2xl rounded-bl-sm w-fit shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#14A800] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[#14A800] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#14A800] rounded-full animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
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
              placeholder="Ask about projects, skills, or hiring..."
              className="flex-1 bg-[#F9F8F5] border border-[#E5E3DE] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#111110] placeholder-[#8C8B87] focus:outline-none focus:border-[#14A800] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#111110] hover:bg-[#14A800] text-white disabled:opacity-30 disabled:hover:bg-[#111110] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  )
}
