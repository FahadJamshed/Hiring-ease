import { useState, useEffect } from "react"
import hiringEaseLogo from "../imports/Mask_group.png"

function SidebarIcon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sidebarItems = [
  { label: "Dashboard", d: "M1.5 1.5h4v4h-4zM8.5 1.5h4v4h-4zM1.5 8.5h4v4h-4zM8.5 8.5h4v4h-4z", active: true },
  { label: "Jobs", d: "M2 4.5A1.5 1.5 0 013.5 3h7A1.5 1.5 0 0112 4.5v7A1.5 1.5 0 0110.5 13h-7A1.5 1.5 0 012 11.5v-7zM5 1v2M9 1v2M2 6h10" },
  { label: "Candidates", d: "M7 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2.5 13c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" },
  { label: "Pipeline", d: "M1.5 3.5h3v7h-3zM5.5 5.5h3v5h-3zM9.5 2h3v8.5h-3z" },
  { label: "Interviews", d: "M1.5 2.5A1 1 0 012.5 1.5h9a1 1 0 011 1v9a1 1 0 01-1 1h-9a1 1 0 01-1-1v-9zM5 1.5v2M9 1.5v2M1.5 5.5h11M4.5 8h1M6.5 8h1M8.5 8h1M4.5 10.5h1M6.5 10.5h1" },
  { label: "Emails", d: "M1.5 3.5h11v8h-11zM1.5 3.5l5.5 4.5 5.5-4.5" },
  { label: "Reports", d: "M2 11.5L5 7.5l2.5 2 3-5 1.5 2.5" },
  { label: "Settings", d: "M7 9a2 2 0 100-4 2 2 0 000 4zM7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1 1M10.5 10.5l1 1M2.5 11.5l1-1M10.5 3.5l1-1" },
]

const candidates = [
  { initials: "AM", name: "Alex Morgan", role: "Product Designer", score: 94, stage: "Interview", bg: "#00AFA8" },
  { initials: "SW", name: "Sarah Williams", role: "Senior Developer", score: 91, stage: "Screening", bg: "#7C3AED" },
  { initials: "DC", name: "Daniel Carter", role: "Frontend Developer", score: 87, stage: "Applied", bg: "#059669" },
  { initials: "PS", name: "Priya Sharma", role: "UX Researcher", score: 83, stage: "Offer", bg: "#D97706" },
]

function stageBadge(stage: string) {
  const map: Record<string, string> = {
    Interview: "bg-[#ECFDFB] text-[#00AFA8]",
    Screening: "bg-[#FEF9C3] text-[#92400E]",
    Applied: "bg-[#F9FAFB] text-[#667085]",
    Offer: "bg-[#F0FDF4] text-[#15803D]",
  }
  return map[stage] ?? "bg-[#F9FAFB] text-[#667085]"
}

function HeroDashboard() {
  return (
    <div className="flex h-full overflow-hidden bg-white rounded-2xl border border-[#E4E7EC]">
      {/* Sidebar */}
      <div className="w-48 bg-[#172033] hidden md:flex flex-col flex-shrink-0">
        <div className="px-4 py-4 border-b border-white/10">
          <img src={hiringEaseLogo} alt="HiringEase" className="w-[108px] h-auto brightness-0 invert" />
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-hidden">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-[#00AFA8] text-white" : "text-white/55 hover:bg-white/8 hover:text-white/90"
              }`}
            >
              <SidebarIcon d={item.d} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-6 h-6 rounded-full bg-[#00AFA8] flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0">
              JP
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white font-semibold truncate">Jamie Park</p>
              <p className="text-[9px] text-white/45 truncate">Head of Recruiting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top bar */}
        <div className="bg-white border-b border-[#E4E7EC] px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div>
            <h3 className="text-[12px] font-semibold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Candidates
            </h3>
            <p className="text-[10px] text-[#667085]">24 total · 8 active roles</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E4E7EC] rounded-lg px-2.5 py-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="4" cy="4" r="3" stroke="#9CA3AF" strokeWidth="1.2" />
                <path d="M7 7L9 9" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] text-[#9CA3AF]">Search...</span>
            </div>
            <button className="bg-[#00AFA8] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg">+ Add</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 flex-shrink-0">
          {[
            { label: "Total", value: "124", sub: "+12 this week", color: "#00AFA8" },
            { label: "Active Jobs", value: "8", sub: "3 closing soon", color: "#7C3AED" },
            { label: "Interviews", value: "14", sub: "This week", color: "#059669" },
            { label: "Offers", value: "3", sub: "Pending", color: "#D97706" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E4E7EC] px-3 py-3">
              <p className="text-[9px] text-[#9CA3AF] font-medium mb-1">{s.label}</p>
              <p className="text-[18px] font-bold text-[#172033] leading-none mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s.value}
              </p>
              <p className="text-[9px]" style={{ color: s.color }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Candidate list */}
        <div className="flex-1 px-4 pb-4 min-h-0">
          <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden h-full flex flex-col">
            <div className="px-4 py-2.5 border-b border-[#E4E7EC] flex items-center justify-between flex-shrink-0">
              <p className="text-[11px] font-semibold text-[#172033]">Recent Candidates</p>
              <p className="text-[10px] text-[#00AFA8] font-medium cursor-pointer">View all →</p>
            </div>
            <div className="divide-y divide-[#E4E7EC] overflow-auto no-scroll">
              {candidates.map((c) => (
                <div key={c.name} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: c.bg }}
                  >
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#172033] truncate">{c.name}</p>
                    <p className="text-[10px] text-[#667085] truncate">{c.role}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-14 h-1.5 bg-[#E4E7EC] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00AFA8] rounded-full"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#00AFA8]">{c.score}%</span>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${stageBadge(c.stage)}`}>
                      {c.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatCard({
  children,
  className,
  animClass,
}: {
  children: React.ReactNode
  className: string
  animClass: string
}) {
  return (
    <div
      className={`absolute z-10 bg-white border border-[#E4E7EC] rounded-2xl shadow-[0_8px_32px_rgba(23,32,51,0.1)] px-3 py-2.5 flex items-center gap-2.5 ${animClass} ${className}`}
    >
      {children}
    </div>
  )
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="pt-[120px] sm:pt-[220px] pb-20 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Headline */}
        <h1
          className={`text-center font-black text-[#00AFA8] leading-[1.07] tracking-[-0.03em] text-5xl md:text-6xl lg:text-[72px] mb-6 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Hire smarter.
          <br />
          <span className="text-[#292929]">Move candidates faster.</span>
        </h1>

        {/* Sub */}
        <p
          className={`text-center text-[17px] text-[#475467] max-w-[600px] mx-auto leading-relaxed mb-10 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          AI-powered applicant tracking that brings resumes, candidates, hiring pipelines, interviews, email, and team feedback into one connected workspace.
        </p>

        {/* CTAs */}
        <div
          className={`mx-auto flex w-full max-w-[620px] items-stretch justify-center gap-3 sm:gap-4 mb-16 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="/contact"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-[#00AFA8] text-white font-semibold text-base sm:text-lg px-5 py-3 rounded-[14px] hover:bg-[#008C86] transition-colors shadow-[0_4px_16px_rgba(0,175,168,0.3)] min-h-[60px] sm:min-h-[64px]"
          >
            Contact Us
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/book-demo"
            className="inline-flex flex-1 items-center justify-center gap-2 text-[#172033] font-semibold text-base sm:text-lg px-5 py-3 rounded-[14px] bg-white border border-[#E4E7EC] hover:border-[#D0D5DD] transition-colors min-h-[60px] sm:min-h-[64px]"
          >
            Book a Demo
          </a>
        </div>

        {/* Dashboard + floating cards */}
        <div className={`relative transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Floating notifications */}
          <FloatCard className="hidden md:flex -top-5 right-[5%]" animClass="anim-float-a">
            <div className="w-7 h-7 rounded-full bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="#12B76A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#172033]">Resume analyzed</p>
              <p className="text-[9px] text-[#667085]">Just now</p>
            </div>
          </FloatCard>

          <FloatCard className="hidden md:flex top-24 -right-4 lg:-right-8" animClass="anim-float-b">
            <div className="w-9 h-9 rounded-xl bg-[#ECFDFB] flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-[#00AFA8]">94%</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#172033]">Match Score</p>
              <p className="text-[9px] text-[#667085]">Alex Morgan</p>
            </div>
          </FloatCard>

          <FloatCard className="hidden md:flex bottom-24 -left-4 lg:-left-8" animClass="anim-float-c">
            <div className="w-7 h-7 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#D97706" strokeWidth="1.2" />
                <path d="M1 4.5h10" stroke="#D97706" strokeWidth="1.2" />
                <path d="M4 7h1M6.5 7H8" stroke="#D97706" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#172033]">Interview scheduled</p>
              <p className="text-[9px] text-[#667085]">Tomorrow · 2:00 PM</p>
            </div>
          </FloatCard>

          <FloatCard className="hidden md:flex bottom-8 right-[10%]" animClass="anim-float-d">
            <div className="w-7 h-7 rounded-full bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.2 4.3H10.6L7.9 6.4L8.9 9.8L6 7.6L3.1 9.8L4.1 6.4L1.4 4.3H4.8L6 1Z" stroke="#7C3AED" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#172033]">Scorecard submitted</p>
              <p className="text-[9px] text-[#667085]">Strong Hire</p>
            </div>
          </FloatCard>

          {/* Dashboard */}
          <div className="h-[480px] sm:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden shadow-[0_32px_96px_-16px_rgba(23,32,51,0.16),0_0_0_1px_rgba(23,32,51,0.05)]">
            <HeroDashboard />
          </div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none rounded-b-2xl" />
        </div>
      </div>
    </section>
  )
}
