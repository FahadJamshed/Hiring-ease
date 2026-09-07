import { FormEvent, useMemo, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import hiringEaseFavicon from "../imports/HE_favicon.png"
import { submitDemoBooking } from "../services/api"
import demoSuccess from "../imports/demo-success.svg"

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
]

function upcomingBusinessDays() {
  const days: Date[] = []
  const date = new Date()
  date.setDate(date.getDate() + 1)
  while (days.length < 7) {
    if (date.getDay() !== 0 && date.getDay() !== 6) days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export default function BookDemoPage() {
  const days = useMemo(upcomingBusinessDays, [])
  const [step, setStep] = useState(1)
  const [selectedDay, setSelectedDay] = useState<Date>(days[0])
  const [selectedTime, setSelectedTime] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [timezone, setTimezone] = useState("Pakistan Standard Time (UTC+5)")
  const [details, setDetails] = useState({ name: "", email: "", company: "", teamSize: "", hiringVolume: "", attendees: "1", attendeeEmails: "", website: "", notes: "" })

  function updateField(name: string, value: string) {
    setDetails((current) => ({ ...current, [name]: value }))
  }

  function continueToSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function confirmBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedTime || submitting) return
    setSubmitting(true)
    setBookingError("")
    const result = await submitDemoBooking({
      contactName: details.name, email: details.email, companyName: details.company, companyWebsite: details.website, companySize: details.teamSize, monthlyHiringVolume: details.hiringVolume, peopleJoining: details.attendees, additionalAttendeeEmails: details.attendeeEmails, requirements: details.notes, scheduledDate: formattedDate, scheduledTime: selectedTime, timezone, website: "",
    })
    setSubmitting(false)
    if (!result.success) {
      setBookingError("Unable to confirm your demo right now. Please try again.")
      return
    }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formattedDate = selectedDay.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
          <div className="pointer-events-none absolute left-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[#00AFA8]/10 blur-[100px]" />
          <div className="pointer-events-none absolute right-[-8rem] top-[24rem] h-[24rem] w-[24rem] rounded-full bg-[#74E1D6]/15 blur-[100px]" />
          <div className="relative mx-auto max-w-[1120px]">
            {!submitted ? (
              <>
                <div className="mx-auto mb-10 max-w-[760px] text-center">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Book a demo</p>
                  <h1 className="text-5xl font-black leading-[1.06] tracking-[-0.035em] text-[#172033] lg:text-[64px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span className="text-[#00AFA8]">See HiringEase</span>{" "}in action.
                  </h1>
                  <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-[#667085]">Choose a convenient time for a tailored 30-minute walkthrough with our product team.</p>
                </div>

                <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold">
                  <StepBadge number="1" label="Your details" active={step === 1} complete={step > 1} />
                  <span className="h-px w-10 bg-[#D0D5DD]" />
                  <StepBadge number="2" label="Choose a time" active={step === 2} complete={false} />
                </div>

                {step === 1 ? (
                  <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                    <DemoSummary />
                    <form onSubmit={continueToSchedule} className="rounded-[28px] border border-white/80 bg-gradient-to-br from-white/65 via-[#EFF8F7]/60 to-[#DDEDEC]/60 p-6 shadow-[0_24px_70px_rgba(23,32,51,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl sm:p-8">
                      <h2 className="text-2xl font-black text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tell us about your team</h2>
                      <p className="mb-7 mt-2 text-xs leading-relaxed text-[#667085]">We’ll use this information to tailor the demo to your hiring workflow.</p>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Input label="Contact person" name="name" value={details.name} onChange={updateField} placeholder="Alex Morgan" />
                        <Input label="Work email" name="email" value={details.email} onChange={updateField} placeholder="alex@company.com" type="email" />
                        <Input label="Company name" name="company" value={details.company} onChange={updateField} placeholder="Your company" />
                        <Input label="Company website" name="website" value={details.website} onChange={updateField} placeholder="company.com" required={false} />
                        <Select label="Company size" name="teamSize" value={details.teamSize} onChange={updateField} options={["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"]} />
                        <Select label="Monthly hiring volume" name="hiringVolume" value={details.hiringVolume} onChange={updateField} options={["1–5 hires", "6–20 hires", "21–50 hires", "51–100 hires", "100+ hires"]} />
                        <Select label="People joining the demo" name="attendees" value={details.attendees} onChange={updateField} options={["1", "2", "3", "4", "5+"]} />
                        <MultiEmailInput value={details.attendeeEmails} onChange={(value) => updateField("attendeeEmails", value)} />
                      </div>
                      <label className="mt-5 block"><span className="mb-2 block text-xs font-semibold text-[#344054]">What would you like to see?</span><textarea value={details.notes} onChange={(event) => updateField("notes", event.target.value)} rows={3} placeholder="Tell us about your current process or priorities..." className="w-full resize-none rounded-xl border border-[#CDD5DB] bg-white/45 px-4 py-3 text-sm text-[#172033] outline-none placeholder:text-[#98A2B3] focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10" /></label>
                      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00AFA8] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,175,168,0.24)] transition hover:bg-[#008C86]">Continue to availability <span>→</span></button>
                    </form>
                  </div>
                ) : (
                  <form onSubmit={confirmBooking} className="mx-auto grid max-w-[1040px] gap-7 lg:grid-cols-[0.65fr_1.35fr]">
                    <div className="space-y-5">
                      <DemoSummary />
                      <div className="rounded-2xl border border-[#D4DCE2] bg-[#E9EFF2]/55 p-5 backdrop-blur-xl">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">Booking for</p>
                        <p className="mt-2 text-sm font-bold text-[#172033]">{details.name}</p><p className="mt-0.5 text-xs text-[#667085]">{details.email}</p><p className="mt-2 text-xs text-[#667085]">{details.company} · {details.teamSize}</p>
                        <button type="button" onClick={() => setStep(1)} className="mt-4 text-xs font-semibold text-[#008C86] hover:underline">Edit details</button>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/80 bg-gradient-to-br from-white/65 via-[#EFF8F7]/60 to-[#DDEDEC]/60 p-6 shadow-[0_24px_70px_rgba(23,32,51,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div><h2 className="text-2xl font-black text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Select date and time</h2><p className="mt-1 text-xs text-[#667085]">Available times update automatically.</p></div>
                        <span className="relative"><select value={timezone} onChange={(event) => setTimezone(event.target.value)} aria-label="Timezone" className="appearance-none rounded-xl border border-[#CDD5DB] bg-white/45 py-2.5 pl-3 pr-9 text-xs text-[#475467] outline-none focus:border-[#00AFA8]"><option>Pakistan Standard Time (UTC+5)</option><option>Eastern Time (UTC-5)</option><option>Pacific Time (UTC-8)</option><option>Greenwich Mean Time (UTC+0)</option><option>Central European Time (UTC+1)</option></select><svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#475467]" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m2.5 4.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      </div>

                      <div className="mt-7 grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {days.map((day) => {
                          const selected = day.toDateString() === selectedDay.toDateString()
                          return <button key={day.toISOString()} type="button" onClick={() => { setSelectedDay(day); setSelectedTime("") }} className={`rounded-xl border px-2 py-3 text-center transition ${selected ? "border-[#00AFA8] bg-[#00AFA8] text-white shadow-[0_5px_16px_rgba(0,175,168,0.2)]" : "border-[#CDD5DB] bg-white/35 text-[#475467] hover:border-[#00AFA8]/50 hover:bg-white/60"}`}><span className="block text-[9px] font-semibold uppercase">{day.toLocaleDateString("en-US", { weekday: "short" })}</span><span className="mt-1 block text-lg font-bold">{day.getDate()}</span><span className="block text-[9px]">{day.toLocaleDateString("en-US", { month: "short" })}</span></button>
                        })}
                      </div>

                      <div className="mt-7"><p className="mb-3 text-xs font-bold text-[#344054]">Available on {selectedDay.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{timeSlots.map((time) => <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${selectedTime === time ? "border-[#00AFA8] bg-[#00AFA8]/10 text-[#008C86]" : "border-[#CDD5DB] bg-white/35 text-[#475467] hover:border-[#00AFA8]/50"}`}>{time}</button>)}</div></div>
                      <div className="mt-7 rounded-xl border border-[#D4DCE2] bg-white/30 p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold text-[#172033]">30-minute product demo</p><p className="mt-1 text-[10px] text-[#667085]">Google Meet · Calendar invitation included</p></div><span className="text-lg">◷</span></div></div>
                      {bookingError && <p role="alert" className="mt-4 text-center text-xs font-medium text-[#D92D20]">{bookingError}</p>}
                      <button disabled={!selectedTime || submitting} type="submit" className="mt-5 inline-flex w-full items-center justify-center rounded-[14px] bg-[#00AFA8] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,175,168,0.24)] transition hover:bg-[#008C86] disabled:cursor-not-allowed disabled:opacity-40">{submitting ? "Confirming..." : "Confirm demo"}</button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div className="mx-auto max-w-[660px] rounded-[28px] border border-[#D4DCE2] bg-[#E9EFF2]/60 p-8 text-center shadow-[0_22px_70px_rgba(23,32,51,0.10)] backdrop-blur-2xl sm:p-12">
                <img
                  src={demoSuccess}
                  alt=""
                  width={433}
                  height={399}
                  className="mx-auto h-auto w-full max-w-[220px] sm:max-w-[260px]"
                />
                <h1 className="mt-6 text-4xl font-black text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Your demo is booked.</h1>
                <p className="mt-3 text-sm leading-relaxed text-[#667085]">We’ve reserved <strong className="text-[#172033]">{formattedDate} at {selectedTime}</strong>. A calendar invitation and meeting details will be sent to {details.email}.</p>
                <div className="mx-auto mt-7 max-w-[440px] rounded-2xl border border-[#D4DCE2] bg-white/35 p-5 text-left"><p className="text-xs font-bold text-[#172033]">What happens next</p><ul className="mt-3 space-y-2 text-xs text-[#667085]"><li>✓ Check your inbox for the calendar invitation</li><li>✓ Invite any additional team members</li><li>✓ Bring your current hiring workflow questions</li></ul></div>
                <a href="/" className="mt-8 inline-flex text-sm font-semibold text-[#008C86] hover:underline">Return to homepage →</a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function DemoSummary() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-white/80 bg-gradient-to-br from-[#DDF6F3]/75 via-white/50 to-[#E8EEF1]/65 shadow-[0_18px_50px_rgba(23,32,51,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl">
      <div className="border-b border-[#D4DCE2]/80 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#00AFA8] text-white shadow-[0_8px_20px_rgba(0,175,168,0.25)]">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"><rect x="3" y="4" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7 2.5v3M14 2.5v3M3 8h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#00AFA8]">HiringEase walkthrough</p><p className="mt-0.5 text-[10px] text-[#667085]">Live with a product specialist</p></div>
        </div>
        <h2 className="text-xl font-black leading-tight text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>A demo built around your team</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#667085]">See how HiringEase fits your real hiring process—not a generic sales presentation.</p>
      </div>
      <div className="p-6">
        <ul className="space-y-3 text-xs leading-relaxed text-[#667085]"><li className="flex gap-2.5"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#00AFA8]/10 text-[10px] font-bold text-[#00AFA8]">✓</span>30-minute guided product tour</li><li className="flex gap-2.5"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#00AFA8]/10 text-[10px] font-bold text-[#00AFA8]">✓</span>Candidate, pipeline, AI, and email workflows</li><li className="flex gap-2.5"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#00AFA8]/10 text-[10px] font-bold text-[#00AFA8]">✓</span>Setup, security, integration, and pricing answers</li><li className="flex gap-2.5"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#00AFA8]/10 text-[10px] font-bold text-[#00AFA8]">✓</span>No commitment required</li></ul>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/45 p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/65 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"><img src={hiringEaseFavicon} alt="HiringEase" className="h-full w-full object-contain" /></div>
          <div><p className="text-[11px] font-bold text-[#172033]">HiringEase product team</p><p className="mt-0.5 text-[9px] text-[#667085]">Ready to answer your questions</p></div>
          <span className="ml-auto h-2 w-2 rounded-full bg-[#12B76A] shadow-[0_0_8px_rgba(18,183,106,0.45)]" />
        </div>
      </div>
    </div>
  )
}

function StepBadge({ number, label, active, complete }: { number: string; label: string; active: boolean; complete: boolean }) {
  return <div className={`flex items-center gap-2 ${active || complete ? "text-[#008C86]" : "text-[#98A2B3]"}`}><span className={`grid h-7 w-7 place-items-center rounded-lg text-[10px] font-bold ${active || complete ? "bg-[#00AFA8]/12" : "bg-[#EAECF0]"}`}>{complete ? "✓" : number}</span><span>{label}</span></div>
}

function Input({ label, name, value, onChange, placeholder, type = "text", required = true }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold text-[#344054]">{label}</span><input required={required} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-[#CDD5DB] bg-white/45 px-4 py-3 text-sm text-[#172033] outline-none placeholder:text-[#98A2B3] focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10" /></label>
}

function Select({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; options: string[] }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold text-[#344054]">{label}</span><span className="relative block"><select required value={value} onChange={(event) => onChange(name, event.target.value)} className="w-full appearance-none rounded-xl border border-[#CDD5DB] bg-white/45 py-3 pl-4 pr-11 text-sm text-[#475467] outline-none focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10"><option value="" disabled>Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select><svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#475467]" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></label>
}

function MultiEmailInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [draft, setDraft] = useState("")
  const [error, setError] = useState("")
  const emails = value ? value.split(",").filter(Boolean) : []

  function addEmail() {
    const email = draft.trim().replace(/,$/, "")
    if (!email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address")
      return
    }
    if (!emails.includes(email)) onChange([...emails, email].join(","))
    setDraft("")
    setError("")
  }

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#344054]">Additional attendee emails</span>
      <span className={`flex min-h-[46px] flex-wrap items-center gap-1.5 rounded-xl border bg-white/45 px-2.5 py-2 transition focus-within:ring-4 ${error ? "border-[#F04438] focus-within:ring-[#F04438]/10" : "border-[#CDD5DB] focus-within:border-[#00AFA8] focus-within:ring-[#00AFA8]/10"}`}>
        {emails.map((email) => (
          <span key={email} className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#00AFA8]/10 px-2 py-1 text-[10px] font-semibold text-[#008C86]">
            <span className="truncate">{email}</span>
            <button type="button" onClick={() => onChange(emails.filter((item) => item !== email).join(","))} className="text-[#667085] hover:text-[#F04438]" aria-label={`Remove ${email}`}>×</button>
          </span>
        ))}
        <input
          type="email"
          value={draft}
          onChange={(event) => { setDraft(event.target.value); setError("") }}
          onBlur={addEmail}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault()
              addEmail()
            }
          }}
          placeholder={emails.length ? "Add another..." : "Type email and press Enter"}
          className="min-w-[150px] flex-1 bg-transparent px-1.5 py-1 text-sm text-[#172033] outline-none placeholder:text-[#98A2B3]"
        />
      </span>
      <span className={`mt-1.5 block text-[9px] ${error ? "text-[#F04438]" : "text-[#98A2B3]"}`}>{error || "Press Enter or comma after each email"}</span>
    </label>
  )
}
