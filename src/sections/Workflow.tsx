import { useState } from "react"

const steps = [
  {
    num: "01",
    label: "Capture",
    desc: "Bring candidates into your recruiting workflow from any source.",
    ui: <CaptureUI />,
  },
  {
    num: "02",
    label: "Parse",
    desc: "AI extracts structured information from resumes automatically.",
    ui: <ParseUI />,
  },
  {
    num: "03",
    label: "Match",
    desc: "Understand candidate-to-job fit with AI-generated match scores.",
    ui: <MatchUI />,
  },
  {
    num: "04",
    label: "Manage",
    desc: "Move candidates through customizable hiring stages.",
    ui: <ManageUI />,
  },
  {
    num: "05",
    label: "Interview",
    desc: "Schedule interviews and generate Google Meet links automatically.",
    ui: <InterviewUI />,
  },
  {
    num: "06",
    label: "Decide",
    desc: "Collect structured interviewer feedback with scorecards.",
    ui: <DecideUI />,
  },
]

function CaptureUI() {
  return (
    <div className="p-5 space-y-3">
      <p className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider mb-4">New Applications · Product Designer</p>
      {[
        { initials: "AM", name: "Alex Morgan", email: "alex@example.com", src: "LinkedIn", time: "2 min ago", bg: "#00AFA8" },
        { initials: "RK", name: "Ryan Kim", email: "ryan@example.com", src: "Job Portal", time: "15 min ago", bg: "#7C3AED" },
        { initials: "LT", name: "Lisa Torres", email: "lisa@example.com", src: "Indeed", time: "1h ago", bg: "#D97706" },
      ].map((c) => (
        <div key={c.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E4E7EC]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ backgroundColor: c.bg }}>
            {c.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#172033]">{c.name}</p>
            <p className="text-[10px] text-[#9CA3AF] truncate">{c.email}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-[9px] font-semibold text-[#00AFA8] bg-[#ECFDFB] px-2 py-0.5 rounded-full">{c.src}</span>
            <p className="text-[9px] text-[#9CA3AF] mt-1">{c.time}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
        <p className="text-[10px] text-[#12B76A] font-medium">3 new applications · Reviewing now</p>
      </div>
    </div>
  )
}

function ParseUI() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-[#ECFDFB] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="#00AFA8" strokeWidth="1.2" />
            <path d="M3.5 4h5M3.5 6h5M3.5 8h3" stroke="#00AFA8" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold text-[#172033]">alex_morgan_resume.pdf</p>
        <span className="ml-auto text-[9px] font-semibold text-[#12B76A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">Parsed</span>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "Full Name", value: "Alex Morgan" },
          { label: "Current Role", value: "Senior Product Designer" },
          { label: "Experience", value: "6 years" },
          { label: "Location", value: "San Francisco, CA" },
          { label: "Education", value: "BFA, RISD" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-3 py-2 border-b border-[#F3F4F6] last:border-0">
            <span className="text-[10px] text-[#9CA3AF] w-24 flex-shrink-0">{f.label}</span>
            <span className="text-[11px] font-semibold text-[#172033]">{f.value}</span>
          </div>
        ))}
        <div className="pt-2">
          <p className="text-[10px] text-[#9CA3AF] mb-2">Skills extracted</p>
          <div className="flex flex-wrap gap-1.5">
            {["Figma", "UX Research", "Design Systems", "Prototyping", "SaaS", "B2B"].map((s) => (
              <span key={s} className="text-[10px] font-medium text-[#00AFA8] bg-[#ECFDFB] px-2.5 py-1 rounded-lg">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchUI() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[12px] font-semibold text-[#172033]">Alex Morgan</p>
          <p className="text-[10px] text-[#9CA3AF]">Product Designer · Job #PD-2024</p>
        </div>
        <div className="text-right">
          <p className="text-[28px] font-bold text-[#00AFA8] leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>94%</p>
          <p className="text-[9px] text-[#9CA3AF]">Match Score</p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {[
          { label: "Skills Match", score: 96, color: "#00AFA8" },
          { label: "Experience", score: 90, color: "#7C3AED" },
          { label: "Education", score: 88, color: "#059669" },
          { label: "Location", score: 100, color: "#D97706" },
        ].map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#667085]">{m.label}</span>
              <span className="text-[10px] font-semibold" style={{ color: m.color }}>{m.score}%</span>
            </div>
            <div className="h-1.5 bg-[#E4E7EC] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.score}%`, backgroundColor: m.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3 space-y-1.5">
        {["Relevant product design experience", "Strong SaaS background", "Design systems expertise"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#12B76A] flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[10px] text-[#15803D] font-medium">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManageUI() {
  return (
    <div className="p-4">
      <p className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Pipeline · Product Designer</p>
      <div className="flex gap-2 overflow-x-auto no-scroll pb-2">
        {[
          { stage: "Applied", count: 12, color: "#667085", candidates: ["Alex M.", "Ryan K."] },
          { stage: "Screening", count: 5, color: "#00AFA8", candidates: ["Sarah W."] },
          { stage: "Interview", count: 3, color: "#7C3AED", candidates: ["Daniel C."] },
          { stage: "Offer", count: 1, color: "#D97706", candidates: ["Priya S."] },
        ].map((col) => (
          <div key={col.stage} className="flex-shrink-0 w-36">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col.color }} />
              <span className="text-[10px] font-semibold text-[#172033]">{col.stage}</span>
              <span className="ml-auto text-[9px] text-[#9CA3AF]">{col.count}</span>
            </div>
            <div className="space-y-1.5">
              {col.candidates.map((name) => (
                <div key={name} className="bg-white border border-[#E4E7EC] rounded-xl p-2.5">
                  <p className="text-[10px] font-semibold text-[#172033]">{name}</p>
                  <p className="text-[9px] text-[#9CA3AF]">Product Designer</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InterviewUI() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#00AFA8] flex items-center justify-center text-[10px] font-bold text-white">AM</div>
        <div>
          <p className="text-[12px] font-semibold text-[#172033]">Alex Morgan</p>
          <p className="text-[10px] text-[#9CA3AF]">Interview Scheduling</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "Interviewer", value: "Jamie Park" },
          { label: "Date", value: "Friday, Dec 13" },
          { label: "Time", value: "2:00 PM – 3:00 PM PST" },
          { label: "Format", value: "Google Meet" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-3 py-2 border-b border-[#F3F4F6] last:border-0">
            <span className="text-[10px] text-[#9CA3AF] w-24 flex-shrink-0">{f.label}</span>
            <span className="text-[11px] font-semibold text-[#172033]">{f.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 6.5L5.5 10L12 4" stroke="#12B76A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[11px] font-semibold text-[#15803D]">Interview scheduled · Meet link sent</p>
      </div>
    </div>
  )
}

function DecideUI() {
  return (
    <div className="p-5">
      <p className="text-[11px] font-semibold text-[#172033] mb-1">Interview Scorecard</p>
      <p className="text-[10px] text-[#9CA3AF] mb-4">Alex Morgan · Product Designer</p>
      <div className="space-y-3 mb-4">
        {[
          { label: "Design Craft", stars: 5 },
          { label: "Communication", stars: 4 },
          { label: "Problem Solving", stars: 5 },
          { label: "Cultural Fit", stars: 4 },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[11px] text-[#475467]">{item.label}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.2 4.3H10.6L7.9 6.3L8.9 9.7L6 7.6L3.1 9.7L4.1 6.3L1.4 4.3H4.8L6 1Z"
                    fill={s <= item.stars ? "#F9D00D" : "#E4E7EC"} strokeLinejoin="round" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#00AFA8] rounded-xl p-3 text-center">
        <p className="text-white text-[11px] font-bold">Strong Hire</p>
        <p className="text-white/70 text-[9px] mt-0.5">Submitted by Jamie Park</p>
      </div>
    </div>
  )
}

export default function WorkflowSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="workflow" className="py-28 lg:py-36 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">How it works</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] max-w-[640px] mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">From application to hire,</span>{" "}
            without the busywork.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
          {/* Steps */}
          <div className="space-y-2.5">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-200 ${
                  active === i
                    ? "bg-white/80 border-[#00AFA8]/30 text-[#475467] shadow-[0_10px_30px_rgba(23,32,51,0.09)]"
                    : "bg-[#F1F5F9]/65 border-white/90 text-[#475467] shadow-[0_6px_20px_rgba(23,32,51,0.045)] hover:bg-white/80 hover:border-[#D0D5DD]/70 hover:shadow-[0_10px_28px_rgba(23,32,51,0.08)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[11px] font-bold tracking-wider flex-shrink-0 ${active === i ? "text-[#00AFA8]" : "text-[#98A2B3]"}`}
                  >
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold mb-0.5 text-[#172033]"
                       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {step.label}
                    </p>
                    <p className="text-[12px] leading-snug text-[#667085]">
                      {step.desc}
                    </p>
                  </div>
                  {active === i && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[#00AFA8]">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Product UI panel */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(23,32,51,0.07)] min-h-[380px]">
              {/* Panel header */}
              <div className="bg-white border-b border-[#E4E7EC] px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F04438]/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F9D00D]/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#12B76A]/40" />
                </div>
                <span className="text-[11px] text-[#9CA3AF] ml-2">{steps[active].label} — HiringEase</span>
              </div>
              <div key={active} className="anim-fade-up">
                {steps[active].ui}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
