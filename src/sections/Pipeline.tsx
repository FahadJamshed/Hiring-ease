import { useState } from "react"

const allCandidates = [
  { id: 1, initials: "AM", name: "Alex Morgan", role: "Product Designer", score: 94, stage: "Screening", bg: "#00AFA8", tags: ["Fast-track"] },
  { id: 2, initials: "SW", name: "Sarah Williams", role: "UX Designer", score: 91, stage: "Interview", bg: "#7C3AED", tags: ["Senior"] },
  { id: 3, initials: "DC", name: "Daniel Carter", role: "Frontend Developer", score: 87, stage: "Applied", bg: "#059669", tags: [] },
  { id: 4, initials: "PS", name: "Priya Sharma", role: "UX Researcher", score: 83, stage: "Assessment", bg: "#D97706", tags: ["Research"] },
  { id: 5, initials: "JL", name: "James Liu", role: "Product Designer", score: 79, stage: "Applied", bg: "#0891B2", tags: [] },
  { id: 6, initials: "MR", name: "Maya Reeves", role: "Senior Designer", score: 88, stage: "Offer", bg: "#7C3AED", tags: ["Senior"] },
]

const columns = [
  { id: "Applied", label: "Applied", color: "#667085" },
  { id: "Screening", label: "Screening", color: "#00AFA8" },
  { id: "Interview", label: "Interview", color: "#7C3AED" },
  { id: "Assessment", label: "Assessment", color: "#D97706" },
  { id: "Offer", label: "Offer", color: "#12B76A" },
  { id: "Hired", label: "Hired", color: "#172033" },
]

function CandidateCard({
  candidate,
  onMove,
  canMove,
}: {
  candidate: typeof allCandidates[0]
  onMove?: () => void
  canMove?: boolean
}) {
  return (
    <div className="bg-white border border-[#E4E7EC] rounded-xl p-3 hover:shadow-[0_2px_12px_rgba(23,32,51,0.08)] transition-shadow cursor-pointer">
      <div className="flex items-start gap-2.5 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: candidate.bg }}
        >
          {candidate.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#172033] truncate">{candidate.name}</p>
          <p className="text-[9px] text-[#9CA3AF] truncate">{candidate.role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-10 h-1 bg-[#E4E7EC] rounded-full overflow-hidden">
            <div className="h-full bg-[#00AFA8] rounded-full" style={{ width: `${candidate.score}%` }} />
          </div>
          <span className="text-[9px] font-bold text-[#00AFA8]">{candidate.score}%</span>
        </div>
        {candidate.tags.map((t) => (
          <span key={t} className="text-[8px] font-semibold text-[#667085] bg-[#F8FAFC] border border-[#E4E7EC] px-1.5 py-0.5 rounded-lg">{t}</span>
        ))}
      </div>
      {canMove && onMove && (
        <button
          onClick={onMove}
          className="mt-2 w-full text-[9px] font-semibold text-[#00AFA8] bg-[#ECFDFB] hover:bg-[#DBEAFE] transition-colors py-1.5 rounded-lg"
        >
          Move to Interview →
        </button>
      )}
    </div>
  )
}

export default function PipelineSection() {
  const [stages, setStages] = useState<Record<number, string>>(
    Object.fromEntries(allCandidates.map((c) => [c.id, c.stage]))
  )
  const [notification, setNotification] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [bulkAction, setBulkAction] = useState<string | null>(null)

  const moveAlex = () => {
    setStages((prev) => ({ ...prev, 1: "Interview" }))
    setNotification(true)
    setTimeout(() => setNotification(false), 3000)
  }

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      {/* Pipeline section */}
      <section id="pipeline" className="py-28 lg:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-3">Pipeline</p>
              <h2
                className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Know exactly where</span>
                <br className="hidden md:block" /> every candidate stands.
              </h2>
            </div>
            <p className="text-[14px] text-[#475467] max-w-[340px] leading-relaxed">
              Customizable hiring stages give every team member instant visibility into the full candidate pipeline.
            </p>
          </div>

          {/* Kanban board */}
          <div className="relative">
            {/* Notification toast */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 z-20 bg-[#172033] text-white text-[11px] font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                notification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Candidate moved to Interview
            </div>

            <div className="overflow-x-auto no-scroll pb-4">
              <div className="flex gap-3" style={{ minWidth: "900px" }}>
                {columns.map((col) => {
                  const colCandidates = allCandidates.filter((c) => stages[c.id] === col.id)
                  return (
                    <div key={col.id} className="flex-1 min-w-[145px]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                        <span className="text-[11px] font-semibold text-[#172033]">{col.label}</span>
                        <span className="text-[10px] text-[#9CA3AF] ml-auto">{colCandidates.length}</span>
                      </div>
                      <div
                        className="min-h-[200px] bg-[#F8FAFC] rounded-xl border border-[#E4E7EC] p-2 space-y-2"
                        style={{ borderTop: `2px solid ${col.color}20` }}
                      >
                        {colCandidates.map((c) => (
                          <CandidateCard
                            key={c.id}
                            candidate={c}
                            canMove={c.id === 1 && col.id === "Screening"}
                            onMove={moveAlex}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Processing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Bulk Actions</p>
              <h2
                className="text-4xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Less repetitive work.</span>{" "}
                More recruiting.
              </h2>
              <p className="text-[15px] text-[#475467] leading-relaxed">
                Select multiple candidates at once and apply actions in bulk — move stages, add tags, update status, or send emails without doing it one by one.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <button className="flex items-center gap-2 text-sm font-medium text-white bg-[#00AFA8] px-5 py-2.5 rounded-[10px] hover:bg-[#008C86] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1.5 2.5h11v9h-11z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M1.5 5.5h11M4.5 2.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Import CSV
                </button>
              </div>
            </div>

            {/* Bulk action UI */}
            <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl overflow-hidden">
              {/* Selection bar */}
              <div className="bg-white border-b border-[#E4E7EC] px-5 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded bg-[#00AFA8] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-semibold text-[#172033]">
                    {selectedIds.size > 0 ? `${selectedIds.size} selected` : "Select candidates"}
                  </span>
                </div>
                {selectedIds.size > 0 && (
                  <div className="flex items-center gap-2">
                    {["Move Stage", "Add Tag", "Update Status"].map((action) => (
                      <button
                        key={action}
                        onClick={() => setBulkAction(action)}
                        className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                          bulkAction === action
                            ? "bg-[#00AFA8] text-white border-[#00AFA8]"
                            : "bg-white text-[#475467] border-[#E4E7EC] hover:border-[#D0D5DD]"
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Candidate rows */}
              <div className="divide-y divide-[#E4E7EC]">
                {allCandidates.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => toggleSelect(c.id)}
                    className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                      selectedIds.has(c.id) ? "bg-[#ECFDFB]" : "bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedIds.has(c.id) ? "bg-[#00AFA8] border-[#00AFA8]" : "border-[#D0D5DD]"
                      }`}
                    >
                      {selectedIds.has(c.id) && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ backgroundColor: c.bg }}>
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#172033]">{c.name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{c.role}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#00AFA8]">{c.score}%</span>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      stages[c.id] === "Interview" ? "bg-[#ECFDFB] text-[#00AFA8]" :
                      stages[c.id] === "Screening" ? "bg-[#FEF9C3] text-[#92400E]" :
                      stages[c.id] === "Offer" ? "bg-[#F0FDF4] text-[#15803D]" :
                      "bg-[#F9FAFB] text-[#667085]"
                    }`}>
                      {stages[c.id]}
                    </span>
                  </div>
                ))}
              </div>

              {bulkAction && selectedIds.size > 0 && (
                <div className="bg-[#172033] px-5 py-3 flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5L5 9.5L11 3.5" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[11px] text-white font-medium">
                    Ready to {bulkAction.toLowerCase()} {selectedIds.size} candidate{selectedIds.size > 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={() => { setSelectedIds(new Set()); setBulkAction(null) }}
                    className="ml-auto text-[10px] text-white/60 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
