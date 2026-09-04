import { useState } from "react"

const tabs = ["Overview", "Resume", "Activity", "Interviews", "Emails"]

function OverviewTab() {
  return (
    <div className="grid md:grid-cols-3 gap-5 p-6">
      {/* Left: info */}
      <div className="md:col-span-2 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Current Role", value: "Senior Product Designer" },
            { label: "Experience", value: "6 years" },
            { label: "Location", value: "San Francisco, CA" },
            { label: "Applied", value: "Dec 10, 2024" },
            { label: "Source", value: "LinkedIn" },
            { label: "Stage", value: "Interview" },
          ].map((f) => (
            <div key={f.label} className="bg-[#F8FAFC] rounded-xl p-3">
              <p className="text-[9px] text-[#9CA3AF] uppercase tracking-wider mb-1">{f.label}</p>
              <p className="text-[12px] font-semibold text-[#172033]">{f.value}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {["Figma", "UX Research", "Design Systems", "SaaS", "Prototyping", "B2B", "Usability Testing", "Figma Variables"].map((s) => (
              <span key={s} className="text-[10px] font-medium text-[#00AFA8] bg-[#ECFDFB] px-2.5 py-1 rounded-lg">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Notes</p>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3">
            <p className="text-[11px] text-[#92400E] leading-relaxed">
              Strong portfolio with SaaS product examples. Very responsive — replied within 2 hours. Recommend fast-tracking to panel interview.
            </p>
            <p className="text-[9px] text-[#D97706] mt-2">Added by Jamie Park · Dec 11</p>
          </div>
        </div>
      </div>

      {/* Right: match + activity */}
      <div className="space-y-4">
        <div className="bg-[#172033] text-white rounded-2xl p-5 text-center">
          <p className="text-[11px] text-white/50 mb-1">AI Match Score</p>
          <p className="text-[44px] font-bold text-white leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>94%</p>
          <p className="text-[10px] text-[#F9D00D] mt-1">Excellent fit</p>
        </div>
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Pipeline Stage</p>
          <div className="space-y-1">
            {[
              { label: "Applied", done: true },
              { label: "Screening", done: true },
              { label: "Interview", done: true, active: true },
              { label: "Assessment", done: false },
              { label: "Offer", done: false },
              { label: "Hired", done: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.active ? "bg-[#00AFA8]" : s.done ? "bg-[#12B76A]" : "bg-[#E4E7EC]"}`} />
                <span className={`text-[10px] font-medium ${s.active ? "text-[#00AFA8]" : s.done ? "text-[#15803D]" : "text-[#9CA3AF]"}`}>
                  {s.label}
                </span>
                {s.active && <span className="text-[9px] text-[#00AFA8] ml-auto">Current</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumeTab() {
  return (
    <div className="p-6">
      <div className="border border-[#E4E7EC] rounded-2xl p-6 space-y-5">
        <div className="flex items-start justify-between pb-4 border-b border-[#E4E7EC]">
          <div>
            <h3 className="text-[20px] font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Morgan</h3>
            <p className="text-[13px] text-[#475467] mt-0.5">Senior Product Designer</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[11px] text-[#9CA3AF]">alex@example.com</span>
              <span className="text-[11px] text-[#9CA3AF]">San Francisco, CA</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-[#00AFA8] hover:text-[#008C86] transition-colors">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v8M3.5 6.5L6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.5 11h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Download PDF
          </button>
        </div>
        {[
          {
            title: "Experience",
            items: [
              { role: "Lead Product Designer", company: "Acme SaaS Inc.", period: "2021 – Present", bullets: ["Led design for 3 product lines", "40+ user research sessions", "Built design system from 0→1"] },
              { role: "Product Designer", company: "DesignCo.", period: "2019 – 2021", bullets: ["Owned UX for core features", "Increased conversion 22%"] },
            ]
          }
        ].map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-bold text-[#172033] uppercase tracking-wider mb-3">{section.title}</p>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.role}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-[#172033]">{item.role}</p>
                      <p className="text-[11px] text-[#667085]">{item.company}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0">{item.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-0.5">
                    {item.bullets.map((b) => (
                      <li key={b} className="text-[11px] text-[#475467] flex gap-2">
                        <span className="text-[#9CA3AF]">·</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTab() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {[
          { time: "09:12", label: "Resume uploaded", desc: "alex_morgan_resume.pdf", icon: "📄", color: "#667085" },
          { time: "09:13", label: "AI analysis completed", desc: "All fields extracted successfully", icon: "🤖", color: "#00AFA8" },
          { time: "09:17", label: "94% match identified", desc: "Product Designer · Job #PD-2024", icon: "📊", color: "#00AFA8" },
          { time: "09:24", label: "Moved to Screening", desc: "By Jamie Park", icon: "➡️", color: "#7C3AED" },
          { time: "10:30", label: "Interview scheduled", desc: "Dec 13 · 2:00 PM PST with Jamie Park", icon: "📅", color: "#D97706" },
          { time: "14:20", label: "Scorecard submitted", desc: "Strong Hire · Jamie Park", icon: "⭐", color: "#12B76A" },
        ].map((ev, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border border-[#E4E7EC] flex items-center justify-center text-xs flex-shrink-0">
                {ev.icon}
              </div>
              {i < 5 && <div className="w-px flex-1 bg-[#E4E7EC] mt-1" />}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] text-[#9CA3AF] font-medium">{ev.time}</span>
              </div>
              <p className="text-[12px] font-semibold text-[#172033]">{ev.label}</p>
              <p className="text-[11px] text-[#667085]">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InterviewsTab() {
  return (
    <div className="p-6 space-y-4">
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[12px] font-bold text-[#172033]">Technical Interview</p>
            <p className="text-[11px] text-[#667085]">Dec 13, 2024 · 2:00 PM – 3:00 PM PST</p>
          </div>
          <span className="text-[9px] font-bold text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-1 rounded-full">Scheduled</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#15803D]">
          <span>Interviewer: Jamie Park</span>
          <span>·</span>
          <span>Google Meet</span>
        </div>
      </div>
      <p className="text-[11px] text-[#9CA3AF] text-center py-4">No other interviews scheduled.</p>
    </div>
  )
}

function EmailsTab() {
  return (
    <div className="p-6 space-y-3">
      {[
        { subject: "Application Received — Product Designer", date: "Dec 10", preview: "Thank you for applying to the Product Designer role at..." },
        { subject: "Interview Invitation — Technical Round", date: "Dec 11", preview: "We'd love to invite you to a technical interview on Dec 13..." },
      ].map((email) => (
        <div key={email.subject} className="flex items-start gap-3 p-4 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl hover:bg-white transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#00AFA8] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">HR</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-[11px] font-semibold text-[#172033] truncate">{email.subject}</p>
              <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 ml-2">{email.date}</span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] truncate">{email.preview}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const tabContent: Record<string, React.ReactNode> = {
  Overview: <OverviewTab />,
  Resume: <ResumeTab />,
  Activity: <ActivityTab />,
  Interviews: <InterviewsTab />,
  Emails: <EmailsTab />,
}

export default function CandidateProfileSection() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <section className="py-28 lg:py-36 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Candidate Profile</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">One candidate.</span>{" "}
            The complete picture.
          </h2>
          <p className="text-[16px] text-[#475467] max-w-[480px] mx-auto mt-4 leading-relaxed">
            Every detail about a candidate — resume, activity, interviews, emails, and feedback — in a single, organized profile.
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_8px_48px_rgba(23,32,51,0.08)]">
          {/* Profile header */}
          <div className="bg-[#172033] px-6 py-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#00AFA8] flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 flex-wrap">
                <div>
                  <h3 className="text-[18px] font-bold text-white leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Alex Morgan
                  </h3>
                  <p className="text-[12px] text-white/60 mt-0.5">Product Designer · Applied Dec 10, 2024</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1.5 bg-[#00AFA8]/30 border border-[#00AFA8]/50 rounded-lg px-2.5 py-1">
                    <span className="text-[13px] font-bold text-white">94%</span>
                    <span className="text-[9px] text-white/70">Match</span>
                  </div>
                  <span className="text-[9px] font-semibold text-[#F9D00D] bg-[#F9D00D]/15 border border-[#F9D00D]/30 px-2.5 py-1 rounded-lg">
                    Interview
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button className="text-[11px] font-medium text-white/70 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg border border-white/10">
                Move Stage
              </button>
              <button className="text-[11px] font-semibold text-[#172033] bg-white hover:bg-[#F8FAFC] transition-colors px-3 py-2 rounded-lg">
                Schedule Interview
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E4E7EC] bg-white px-6">
            <div className="flex gap-0 overflow-x-auto no-scroll">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3.5 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-[#00AFA8] text-[#00AFA8]"
                      : "border-transparent text-[#667085] hover:text-[#172033]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div key={activeTab} className="anim-fade-up">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </section>
  )
}
