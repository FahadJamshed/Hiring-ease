import { FormEvent, useEffect, useRef, useState } from "react"

type View = "home" | "guide" | "help" | "ai"
type Message = { role: "assistant" | "user"; text: string }

const guideLinks = [
  { label: "Explore the product", detail: "See the connected hiring workspace", href: "/#product" },
  { label: "How it works", detail: "Follow the workflow from application to hire", href: "/#workflow" },
  { label: "AI recruiting", detail: "Learn about resume intelligence and matching", href: "/#ai-recruiting" },
  { label: "Plans and pricing", detail: "Compare options for your team", href: "/#pricing" },
]

export default function QuickHelp() {
  const [open, setOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [view, setView] = useState<View>("home")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I'm the HiringEase AI assistant. What would you like to know?" },
  ])
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  useEffect(() => {
    const updateScrollTop = () => setShowScrollTop(window.scrollY > 500)
    updateScrollTop()
    window.addEventListener("scroll", updateScrollTop, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollTop)
  }, [])

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const question = message.trim()
    if (!question) return
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: getAiReply(question) }])
    setMessage("")
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      {open && (
        <div ref={panelRef} className="mb-3 w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-[22px] border border-white/90 bg-white/90 shadow-[0_22px_70px_rgba(23,32,51,0.20)] backdrop-blur-2xl anim-chat-open">
          <div className="bg-[#00AFA8] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>HiringEase Help</p>
                <p className="mt-1 text-[11px] text-white/75">Quick answers, whenever you need them.</p>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-7 w-7 place-items-center rounded-lg text-white/75 transition hover:bg-white/15 hover:text-white" aria-label="Close help">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          <div className="p-4">
            {view !== "home" && (
              <button onClick={() => setView("home")} className="mb-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#667085] transition hover:text-[#00AFA8]">
                <span aria-hidden="true">←</span> Back
              </button>
            )}

            {view === "home" && (
              <div className="space-y-3">
                <p className="px-1 pb-1 text-sm leading-relaxed text-[#475467]">Hi! What can we help you with?</p>
                <HelpChoice title="Chat with AI" text="Get an instant answer about HiringEase" icon="ai" onClick={() => setView("ai")} />
                <HelpChoice title="Quick guide" text="Take a short tour of HiringEase" icon="guide" onClick={() => setView("guide")} />
                <HelpChoice title="Help & support" text="Find answers or contact our team" icon="help" onClick={() => setView("help")} />
              </div>
            )}

            {view === "guide" && (
              <div>
                <p className="mb-3 text-sm font-bold text-[#172033]">What would you like to explore?</p>
                <div className="space-y-2">
                  {guideLinks.map((link, index) => (
                    <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border border-[#E4E7EC] bg-white/65 p-3 transition hover:border-[#00AFA8]/35 hover:bg-[#ECFDFB]">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#00AFA8]/10 text-[10px] font-bold text-[#00AFA8]">0{index + 1}</span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-[#172033]">{link.label}</span>
                        <span className="mt-0.5 block text-[10px] leading-snug text-[#667085]">{link.detail}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {view === "help" && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#172033]">How can we help?</p>
                <a href="/#faq" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl border border-[#E4E7EC] bg-white/65 p-3 text-xs font-semibold text-[#172033] transition hover:border-[#00AFA8]/35"><span>Browse common questions</span><span className="text-[#00AFA8]">→</span></a>
                <a href="/contact" className="flex items-center justify-between rounded-xl bg-[#00AFA8] p-3 text-xs font-semibold text-white transition hover:bg-[#008C86]"><span>Contact our team</span><span>→</span></a>
                <p className="px-1 pt-1 text-[10px] leading-relaxed text-[#98A2B3]">Our team typically responds within one business day.</p>
              </div>
            )}

            {view === "ai" && (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#00AFA8]/10 text-sm text-[#00AFA8]">✦</span>
                  <div><p className="text-xs font-bold text-[#172033]">HiringEase AI</p><p className="text-[9px] text-[#12B76A]">● Online</p></div>
                </div>
                <div className="no-scroll flex max-h-[260px] min-h-[210px] flex-col gap-2 overflow-y-auto rounded-xl bg-[#F8FAFC]/70 p-3">
                  {messages.map((item, index) => (
                    <div key={index} className={`max-w-[86%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${item.role === "user" ? "ml-auto bg-[#00AFA8] text-white" : "bg-white text-[#475467] shadow-[0_2px_10px_rgba(23,32,51,0.06)]"}`}>
                      {item.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="mt-3 flex gap-2">
                  <input value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Message HiringEase AI" placeholder="Ask about HiringEase..." className="min-w-0 flex-1 rounded-xl border border-[#D0D5DD] bg-white/80 px-3 py-2.5 text-xs text-[#172033] outline-none placeholder:text-[#98A2B3] focus:border-[#00AFA8] focus:ring-2 focus:ring-[#00AFA8]/10" />
                  <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center self-center rounded-xl bg-[#00AFA8] text-white transition hover:bg-[#008C86]" aria-label="Send message">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h10M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </form>
                <p className="mt-2 text-center text-[9px] text-[#98A2B3]">AI answers may be imperfect. Contact our team for tailored advice.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showScrollTop && !open && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group mb-3 ml-auto grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-white/90 to-[#E7F7F5]/80 text-[#008C86] shadow-[0_8px_24px_rgba(23,32,51,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_11px_28px_rgba(0,175,168,0.18)] anim-chat-open"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <svg className="transition-transform duration-200 group-hover:-translate-y-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 4h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="m5.75 10 4.25-4 4.25 4M10 6.25V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <button
        onClick={() => { setOpen((current) => !current); if (open) setView("home") }}
        className="group relative ml-auto grid h-16 w-16 place-items-center overflow-hidden rounded-[20px] bg-white/85 text-[#008C86] shadow-[0_14px_36px_rgba(23,32,51,0.16),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_42px_rgba(23,32,51,0.20),inset_0_1px_0_rgba(255,255,255,1)]"
        aria-label={open ? "Close quick help" : "Open quick help"}
        aria-expanded={open}
      >
        <span className="absolute inset-1 rounded-[15px] bg-gradient-to-br from-white via-[#E1FAF7] to-[#AEEAE5]" aria-hidden="true" />
        {!open && <span className="absolute right-1.5 top-1.5 z-20 h-3 w-3 rounded-full border-2 border-white bg-[#12B76A] shadow-[0_0_10px_rgba(18,183,106,0.55)]" aria-hidden="true" />}
        {open ? (
          <svg className="relative z-10" width="21" height="21" viewBox="0 0 22 22" fill="none"><path d="m6 6 10 10m0-10L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        ) : (
          <svg className="relative z-10 transition-transform duration-300 group-hover:scale-110" width="34" height="34" viewBox="0 0 29 29" fill="none">
            <path d="M5.25 8.25A3.25 3.25 0 0 1 8.5 5h9A3.25 3.25 0 0 1 20.75 8.25v6.5A3.25 3.25 0 0 1 17.5 18h-5.7l-4.55 3.7V18.2a3.25 3.25 0 0 1-2-3V8.25Z" fill="#00AFA8" fillOpacity="0.13" stroke="#00AFA8" strokeWidth="1.65" strokeLinejoin="round" />
            <path d="M9 11.6h7.6M9 14.4h4.7" stroke="#008C86" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22.7 3.7c.25 1.75 1.25 2.75 3 3-1.75.25-2.75 1.25-3 3-.25-1.75-1.25-2.75-3-3 1.75-.25 2.75-1.25 3-3Z" fill="#F9D00D" />
            <path d="M22.8 16.7c.18 1.18.82 1.82 2 2-1.18.18-1.82.82-2 2-.18-1.18-.82-1.82-2-2 1.18-.18 1.82-.82 2-2Z" fill="#00AFA8" />
          </svg>
        )}
      </button>
    </div>
  )
}

function HelpChoice({ title, text, icon, onClick }: { title: string; text: string; icon: "ai" | "guide" | "help"; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl border border-[#E4E7EC] bg-white/65 p-4 text-left transition hover:border-[#00AFA8]/35 hover:bg-[#ECFDFB]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#00AFA8]/10 text-[#00AFA8]">
        {icon === "ai" ? "✦" : icon === "guide" ? "→" : "?"}
      </span>
      <span className="flex-1"><span className="block text-sm font-bold text-[#172033]">{title}</span><span className="mt-0.5 block text-[11px] text-[#667085]">{text}</span></span>
      <span className="text-[#00AFA8]">→</span>
    </button>
  )
}

function getAiReply(question: string) {
  const text = question.toLowerCase()
  if (text.includes("price") || text.includes("pricing") || text.includes("cost")) return "HiringEase offers Starter, Growth, and Enterprise plans with pricing tailored to your team. Visit the Pricing section or contact our team for a quote."
  if (text.includes("demo") || text.includes("call") || text.includes("contact")) return "You can book a tailored walkthrough on our Contact page. Choose “Help & support” and then “Contact our team.”"
  if (text.includes("security") || text.includes("secure") || text.includes("privacy")) return "HiringEase includes role-based access, MFA, row-level security, audit logging, and organization-level controls."
  if (text.includes("email") || text.includes("gmail") || text.includes("outlook") || text.includes("zoho")) return "HiringEase supports Gmail, Outlook, Zoho Mail, and custom SMTP so candidate messages can be sent from your own domain."
  if (text.includes("ai") || text.includes("resume") || text.includes("match")) return "HiringEase uses AI to structure resume data, create candidate profiles, and generate job-match insights that help teams review applicants faster."
  if (text.includes("integration")) return "HiringEase works with email and scheduling tools including Gmail, Outlook, Zoho Mail, Google Calendar, Google Meet, and custom SMTP."
  if (text.includes("hello") || text.includes("hi ") || text === "hi") return "Hello! Ask me about features, AI resume matching, integrations, security, pricing, or booking a demo."
  return "HiringEase brings candidates, pipelines, interviews, email, and team feedback into one workspace. For a more specific answer, try asking about features, pricing, integrations, security, or demos."
}
