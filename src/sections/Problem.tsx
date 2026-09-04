import hiringEaseFavicon from "../imports/HE_favicon.png"

const tools = [
  { label: "Resumes", icon: "file", desc: "PDFs in email threads" },
  { label: "Spreadsheets", icon: "table", desc: "Manual tracking" },
  { label: "Email", icon: "mail", desc: "Scattered inboxes" },
  { label: "Calendar", icon: "calendar", desc: "Booking back-and-forth" },
  { label: "Interviews", icon: "mic", desc: "No-shows, reschedules" },
  { label: "Feedback", icon: "message", desc: "Docs, Slack, memory" },
]

function ToolIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    file: <><path d="M5 2.5h6l3 3v9A1.5 1.5 0 0 1 12.5 16h-7A1.5 1.5 0 0 1 4 14.5v-10A2 2 0 0 1 5 2.5Z" /><path d="M11 2.5v3h3M7 10h5M7 13h4" /></>,
    table: <><rect x="2.5" y="3" width="13" height="12" rx="1.5" /><path d="M2.5 7h13M7 7v8M11.5 7v8" /></>,
    mail: <><rect x="2.5" y="4" width="13" height="10" rx="1.5" /><path d="m3 5 6 4.5L15 5" /></>,
    calendar: <><rect x="2.5" y="3.5" width="13" height="12" rx="2" /><path d="M5.5 2v3M12.5 2v3M2.5 7.5h13M6 10.5h.01M9 10.5h.01M12 10.5h.01" /></>,
    mic: <><rect x="6.2" y="2" width="5.6" height="9" rx="2.8" /><path d="M4.5 9a4.5 4.5 0 0 0 9 0M9 13.5V16M6.5 16h5" /></>,
    message: <><path d="M15.5 9a5.8 5.8 0 0 1-6 5.5 6.9 6.9 0 0 1-2.5-.5L3 15l1-3A5.2 5.2 0 0 1 3.5 9a5.8 5.8 0 0 1 6-5.5 5.8 5.8 0 0 1 6 5.5Z" /><path d="M6.5 8.5h.01M9.5 8.5h.01M12.5 8.5h.01" /></>,
  }

  return <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function ProblemSection() {
  return (
    <section id="product" className="py-28 lg:py-36 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">The problem</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] max-w-[700px] mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Hiring shouldn't feel like</span>{" "}
            managing six different tools.
          </h2>
        </div>

        {/* Fragmented state */}
        <div className="relative mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className="relative z-10 rounded-[22px] border border-white/90 bg-white/65 backdrop-blur-md px-5 py-6 text-center shadow-[0_10px_30px_rgba(23,32,51,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00AFA8]/35 hover:shadow-[0_16px_36px_rgba(0,175,168,0.14)]"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00AFA8]/15 bg-[#ECFDFB] text-[#00AFA8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <ToolIcon name={tool.icon} />
                </div>
                <p className="text-[13px] font-bold text-[#172033] mb-1.5">{tool.label}</p>
                <p className="text-[10px] text-[#9CA3AF] leading-snug">{tool.desc}</p>
              </div>
            ))}
          </div>

          {/* Chaos indicator lines */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M9 54 Q50 26 91 54" stroke="#00AFA8" strokeOpacity="0.16" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
              <path d="M9 52 Q29 75 50 52" stroke="#00AFA8" strokeOpacity="0.13" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
              <path d="M91 52 Q71 75 50 52" stroke="#00AFA8" strokeOpacity="0.13" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>

        {/* Arrow + solution */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-[#E4E7EC]" />
            <div className="w-8 h-8 rounded-full border-2 border-[#E4E7EC] bg-white flex items-center justify-center text-[#00AFA8]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3.5 8.5L7 12l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* HiringEase unified card */}
          <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#00AFA8]/20 shadow-[0_8px_48px_rgba(0,175,168,0.12)] overflow-hidden">
            <div className="bg-[#00AFA8] px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/80 p-1 overflow-hidden flex items-center justify-center">
                <img src={hiringEaseFavicon} alt="HiringEase" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-white font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  HiringEase ATS 2.0
                </p>
                <p className="text-white/70 text-[11px]">One connected hiring workspace</p>
              </div>
            </div>
            <div className="px-6 py-5 grid grid-cols-3 md:grid-cols-6 gap-3">
              {tools.map((tool) => (
                <div key={tool.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ECFDFB] border border-[#00AFA8]/10 flex items-center justify-center text-[#00AFA8]">
                    <ToolIcon name={tool.icon} />
                  </div>
                  <span className="text-[10px] font-semibold text-[#172033] text-center">{tool.label}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E4E7EC] px-6 py-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
              <p className="text-[11px] font-medium text-[#475467]">One connected hiring workflow — from application to hire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import type { ReactNode } from "react"
