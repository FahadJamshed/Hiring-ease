import { useState } from "react"

const criteria = [
  { label: "Design Craft", defaultStars: 5 },
  { label: "Communication", defaultStars: 4 },
  { label: "Problem Solving", defaultStars: 5 },
  { label: "Cultural Fit", defaultStars: 4 },
  { label: "Technical Depth", defaultStars: 3 },
]

function ActivityIcon({ name }: { name: string }) {
  const paths = {
    file: <><path d="M6 2.5h5l3 3v9A1.5 1.5 0 0 1 12.5 16h-6A1.5 1.5 0 0 1 5 14.5v-10A2 2 0 0 1 6 2.5Z" /><path d="M11 2.5v3h3M7.5 10h4M7.5 13h4" /></>,
    sparkle: <path d="m10 2 1.2 5.3L16 8.5l-4.8 1.2L10 15l-1.2-5.3L4 8.5l4.8-1.2L10 2Z" />,
    chart: <><path d="M3 15.5V9M8 15.5V5M13 15.5v-8" /><path d="M2 15.5h13" /></>,
    arrow: <path d="M3 9h11M10 5l4 4-4 4" />,
    calendar: <><rect x="3" y="4" width="13" height="12" rx="2" /><path d="M6 2.5v3M13 2.5v3M3 8h13M6.5 11h.01M10 11h.01M13.5 11h.01" /></>,
    star: <path d="m9.5 2.5 2 4.1 4.5.7-3.2 3.2.8 4.5-4.1-2.2L5.4 15l.8-4.5L3 7.3l4.5-.7 2-4.1Z" />,
  }
  return <svg width="15" height="15" viewBox="0 0 19 19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name as keyof typeof paths]}</svg>
}

function StarRating({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (v: number) => void
  disabled: boolean
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          disabled={disabled}
          onClick={() => onChange(s)}
          onMouseEnter={() => !disabled && setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110 disabled:cursor-default"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1.5L10.854 6.624H16.274L11.956 9.751L13.81 14.875L9 11.749L4.19 14.875L6.044 9.751L1.726 6.624H7.146L9 1.5Z"
              fill={s <= (hover || value) ? "#F9D00D" : "#E4E7EC"}
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

const recommendations = ["Strong Hire", "Hire", "Lean Hire", "No Hire"]

export default function FeedbackSection() {
  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(criteria.map((c) => [c.label, c.defaultStars]))
  )
  const [recommendation, setRecommendation] = useState("Strong Hire")
  const [submitted, setSubmitted] = useState(false)

  const avgRating = Math.round(Object.values(ratings).reduce((a, b) => a + b, 0) / criteria.length)

  return (
    <>
      {/* Scorecard section */}
      <section className="py-28 lg:py-36 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Scorecards</p>
              <h2
                className="text-4xl lg:text-[42px] font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Make hiring decisions</span>{" "}
                with structured feedback.
              </h2>
              <p className="text-[15px] text-[#475467] leading-relaxed mb-6">
                Every interviewer submits a structured scorecard. No more scattered notes — just clear, comparable feedback that helps your team decide faster.
              </p>
              <div className="space-y-3">
                {[
                  "Custom rating criteria per job role",
                  "Overall recommendation (Strong Hire to No Hire)",
                  "Private notes visible only to hiring team",
                  "Aggregate scores surfaced automatically",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2.5" stroke="#12B76A" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-[13px] text-[#475467]">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scorecard UI */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(23,32,51,0.08)]">
              <div className="flex items-center gap-3 border-b border-[#D4DCE2] bg-[#E8F2F2]/65 px-6 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-[#00AFA8] flex items-center justify-center text-[10px] font-bold text-white">AM</div>
                <div>
                  <p className="text-[#172033] text-[13px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Morgan</p>
                  <p className="text-[#667085] text-[10px]">Technical Interview · Product Designer</p>
                </div>
                {submitted && (
                  <div className="ml-auto flex items-center gap-1.5 bg-[#12B76A]/20 border border-[#12B76A]/40 rounded-lg px-2.5 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                    <span className="text-[10px] font-semibold text-[#12B76A]">Submitted</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-5">
                {/* Ratings */}
                <div className="space-y-4">
                  {criteria.map((c) => (
                    <div key={c.label} className="flex items-center justify-between gap-4">
                      <span className="text-[12px] font-medium text-[#475467] flex-shrink-0 w-32">{c.label}</span>
                      <StarRating
                        value={ratings[c.label]}
                        onChange={(v) => !submitted && setRatings((prev) => ({ ...prev, [c.label]: v }))}
                        disabled={submitted}
                      />
                      <span className="text-[10px] font-bold text-[#9CA3AF] w-4 text-right">{ratings[c.label]}/5</span>
                    </div>
                  ))}
                </div>

                {/* Average */}
                <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl px-4 py-3">
                  <span className="text-[11px] font-semibold text-[#172033]">Average Score</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1L7.2 4.3H10.6L7.9 6.3L8.9 9.7L6 7.6L3.1 9.7L4.1 6.3L1.4 4.3H4.8L6 1Z"
                            fill={s <= avgRating ? "#F9D00D" : "#E4E7EC"} strokeLinejoin="round" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] font-bold text-[#172033]">{avgRating}/5</span>
                  </div>
                </div>

                {/* Recommendation */}
                <div>
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Overall Recommendation</p>
                  <div className="grid grid-cols-2 gap-2">
                    {recommendations.map((r) => (
                      <button
                        key={r}
                        onClick={() => !submitted && setRecommendation(r)}
                        disabled={submitted}
                        className={`py-2.5 text-[11px] font-semibold rounded-xl border transition-colors disabled:cursor-default ${
                          recommendation === r
                            ? r === "Strong Hire" ? "bg-[#172033] text-white border-[#172033]"
                            : r === "Hire" ? "bg-[#00AFA8] text-white border-[#00AFA8]"
                            : r === "Lean Hire" ? "bg-[#F9D00D] text-[#172033] border-[#F9D00D]"
                            : "bg-[#F04438] text-white border-[#F04438]"
                            : "text-[#667085] border-[#E4E7EC] hover:border-[#D0D5DD]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {!submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-[#00AFA8] text-white text-sm font-semibold py-3 rounded-[12px] hover:bg-[#008C86] transition-colors"
                  >
                    Submit Feedback
                  </button>
                ) : (
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[12px] py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="#12B76A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[12px] font-semibold text-[#15803D]">Scorecard submitted · {recommendation}</span>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="mt-1 text-[10px] text-[#9CA3AF] hover:text-[#667085]">Reset demo</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="py-28 lg:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Activity Feed</p>
              <h2
                className="text-4xl lg:text-[42px] font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Every hiring action,</span>{" "}
                connected.
              </h2>
              <p className="text-[15px] text-[#475467] leading-relaxed">
                A complete timeline of every action taken on a candidate — from the moment they apply to the day they're hired. No more wondering what happened or who did what.
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-[0_4px_24px_rgba(23,32,51,0.07)]">
              <p className="text-[12px] font-semibold text-[#172033] mb-5">Alex Morgan · Activity Timeline</p>
              <div className="space-y-0">
                {[
                  { time: "09:12", label: "Resume uploaded", detail: "alex_morgan_resume.pdf", color: "#9CA3AF", icon: "file" },
                  { time: "09:13", label: "AI analysis completed", detail: "6 fields extracted · Skills identified", color: "#00AFA8", icon: "sparkle" },
                  { time: "09:17", label: "94% match identified", detail: "Product Designer · Job #PD-2024", color: "#00AFA8", icon: "chart" },
                  { time: "09:24", label: "Moved to Screening", detail: "By Jamie Park", color: "#7C3AED", icon: "arrow" },
                  { time: "10:30", label: "Interview scheduled", detail: "Dec 13 · 2:00 PM · Jamie Park", color: "#D97706", icon: "calendar" },
                  { time: "14:20", label: "Scorecard submitted", detail: "Strong Hire · Jamie Park", color: "#12B76A", icon: "star" },
                  { time: "15:05", label: "Moved to Offer", detail: "By Jamie Park", color: "#12B76A", icon: "arrow" },
                ].map((ev, i, arr) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 z-10"
                        style={{ backgroundColor: ev.color }}
                      >
                        <ActivityIcon name={ev.icon} />
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-[#E4E7EC] my-1" style={{ minHeight: "20px" }} />
                      )}
                    </div>
                    <div className="pb-5 pt-0.5 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] text-[#9CA3AF] font-medium font-mono">{ev.time}</span>
                      </div>
                      <p className="text-[12px] font-semibold text-[#172033]">{ev.label}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{ev.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
