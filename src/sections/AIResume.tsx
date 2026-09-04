import { useState, useEffect } from "react"

type Stage = "upload" | "analyzing" | "results"

export default function AIResumeSection() {
  const [stage, setStage] = useState<Stage>("upload")
  const [progress, setProgress] = useState(0)

  const startAnalysis = () => {
    setStage("analyzing")
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setStage("results")
          return 100
        }
        return p + 4
      })
    }, 60)
  }

  const reset = () => {
    setStage("upload")
    setProgress(0)
  }

  return (
    <section id="ai-recruiting" className="py-28 lg:py-36 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">AI Resume Intelligence</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] max-w-[600px] mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Turn resumes into</span>{" "}
            hiring-ready insight.
          </h2>
          <p className="text-[16px] text-[#475467] max-w-[440px] mx-auto mt-4 leading-relaxed">
            Upload a resume and HiringEase instantly structures the data into a candidate profile with AI-generated match scores.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Left: Resume document */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,32,51,0.06)]">
            <div className="bg-[#F8FAFC] border-b border-[#E4E7EC] px-5 py-3 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2" />
                <path d="M4.5 4.5h5M4.5 6.5h5M4.5 8.5h3" stroke="#9CA3AF" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] text-[#9CA3AF] font-medium">alex_morgan_resume.pdf</span>
              {stage !== "upload" && (
                <span className="ml-auto text-[9px] font-bold text-[#12B76A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">Uploaded</span>
              )}
            </div>

            <div className="p-6">
              {/* Resume preview */}
              <div className="border border-[#E4E7EC] rounded-xl p-5 bg-white space-y-4">
                {/* Header */}
                <div className="border-b border-[#E4E7EC] pb-4">
                  <h3 className="text-[20px] font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Alex Morgan
                  </h3>
                  <p className="text-[12px] text-[#475467] mt-0.5">Senior Product Designer</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-[10px] text-[#9CA3AF]">alex@example.com</span>
                    <span className="text-[10px] text-[#9CA3AF]">San Francisco, CA</span>
                    <span className="text-[10px] text-[#9CA3AF]">linkedin.com/in/alexmorgan</span>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <p className="text-[10px] font-bold text-[#172033] uppercase tracking-wider mb-2">Experience</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-start justify-between">
                        <p className="text-[11px] font-semibold text-[#172033]">Lead Product Designer</p>
                        <span className="text-[10px] text-[#9CA3AF]">2021 – Present</span>
                      </div>
                      <p className="text-[10px] text-[#667085]">Acme SaaS Inc.</p>
                      <div className="mt-1.5 space-y-0.5">
                        {["Led design system for 3 product lines", "Conducted 40+ user research sessions"].map((b) => (
                          <p key={b} className="text-[10px] text-[#9CA3AF] flex gap-1.5">
                            <span>·</span>{b}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start justify-between">
                        <p className="text-[11px] font-semibold text-[#172033]">Product Designer</p>
                        <span className="text-[10px] text-[#9CA3AF]">2019 – 2021</span>
                      </div>
                      <p className="text-[10px] text-[#667085]">DesignCo.</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-[10px] font-bold text-[#172033] uppercase tracking-wider mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Figma", "UX Research", "Design Systems", "Prototyping", "SaaS", "B2B", "Usability Testing"].map((s) => (
                      <span key={s} className="text-[9px] bg-[#F8FAFC] border border-[#E4E7EC] text-[#475467] px-2 py-0.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <p className="text-[10px] font-bold text-[#172033] uppercase tracking-wider mb-1">Education</p>
                  <p className="text-[11px] font-semibold text-[#172033]">Bachelor of Fine Arts</p>
                  <p className="text-[10px] text-[#667085]">Rhode Island School of Design · 2019</p>
                </div>
              </div>

              {/* Upload button */}
              {stage === "upload" && (
                <button
                  onClick={startAnalysis}
                  className="mt-4 w-full bg-[#00AFA8] text-white text-sm font-semibold py-3 rounded-[12px] hover:bg-[#008C86] transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 5L8 2l3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 11v1.5A1.5 1.5 0 004 14h8a1.5 1.5 0 001.5-1.5V11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Analyze Resume
                </button>
              )}

              {stage === "analyzing" && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold text-[#172033]">Analyzing resume...</p>
                    <span className="text-[11px] font-bold text-[#00AFA8]">{progress}%</span>
                  </div>
                  <div className="h-2 bg-[#E4E7EC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00AFA8] rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { label: "Extracting text", done: progress > 30 },
                      { label: "Identifying fields", done: progress > 60 },
                      { label: "Calculating match score", done: progress > 85 },
                    ].map((step) => (
                      <div key={step.label} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${step.done ? "bg-[#12B76A]" : "bg-[#E4E7EC]"}`}>
                          {step.done && (
                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                              <path d="M1 3.5L2.8 5.3L6 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[10px] ${step.done ? "text-[#12B76A]" : "text-[#9CA3AF]"}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {stage === "results" && (
                <button onClick={reset} className="mt-4 w-full text-[#00AFA8] text-[11px] font-medium py-2 border border-[#E4E7EC] rounded-[10px] hover:bg-[#F8FAFC] transition-colors">
                  Reset demo
                </button>
              )}
            </div>
          </div>

          {/* Right: Generated profile */}
          <div className={`bg-white border rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,32,51,0.06)] transition-all duration-500 ${
            stage === "results" ? "border-[#00AFA8]/30" : "border-[#E4E7EC] opacity-60"
          }`}>
            <div className={`border-b px-5 py-3 flex items-center gap-2 transition-colors ${
              stage === "results" ? "bg-[#00AFA8] border-[#00AFA8]" : "bg-[#F8FAFC] border-[#E4E7EC]"
            }`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="3" stroke={stage === "results" ? "white" : "#9CA3AF"} strokeWidth="1.2" />
                <path d="M1 13c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={stage === "results" ? "white" : "#9CA3AF"} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className={`text-[11px] font-medium ${stage === "results" ? "text-white" : "text-[#9CA3AF]"}`}>
                {stage === "results" ? "Candidate Profile Generated" : "Candidate Profile"}
              </span>
              {stage === "results" && (
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="text-white/80 text-[9px]">AI-generated</span>
                </div>
              )}
            </div>

            <div className="p-6">
              {stage !== "results" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E4E7EC] flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#D0D5DD" strokeWidth="1.5" />
                      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#D0D5DD" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#9CA3AF]">Profile will appear after analysis</p>
                </div>
              ) : (
                <div className="space-y-5 anim-fade-up">
                  {/* Candidate header */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00AFA8] flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                      AM
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[16px] font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Alex Morgan
                      </h3>
                      <p className="text-[12px] text-[#667085]">Product Designer</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1.5 bg-[#ECFDFB] border border-[#99F6E4] rounded-lg px-2.5 py-1">
                          <span className="text-[13px] font-bold text-[#00AFA8]">94%</span>
                          <span className="text-[9px] text-[#00AFA8] font-medium">Match</span>
                        </div>
                        <span className="text-[10px] text-[#9CA3AF]">6 years exp.</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Figma", "UX Research", "Design Systems", "SaaS", "B2B", "Prototyping"].map((s) => (
                        <span key={s} className="text-[10px] font-semibold text-[#00AFA8] bg-[#ECFDFB] px-2.5 py-1 rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4">
                    <p className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider mb-2">Strengths</p>
                    <div className="space-y-1.5">
                      {["Relevant SaaS product design experience", "Strong design systems background", "Enterprise product exposure"].map((s) => (
                        <div key={s} className="flex items-start gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 flex-shrink-0">
                            <path d="M2 6L4.5 8.5L10 3" stroke="#12B76A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[10px] text-[#15803D]">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gaps */}
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4">
                    <p className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider mb-2">Potential gaps</p>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-[#D97706] mt-0.5">·</span>
                      <span className="text-[10px] text-[#92400E]">Limited enterprise ATS experience</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Strong Candidate", "Fast-track", "Design Lead"].map((t) => (
                      <span key={t} className="text-[9px] font-semibold text-[#475467] bg-[#F8FAFC] border border-[#E4E7EC] px-2.5 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
