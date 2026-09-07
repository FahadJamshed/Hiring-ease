import { useState } from "react"
import { GmailLogo, OutlookLogo, SmtpLogo, ZohoLogo } from "../components/EmailProviderIcons"

const providers = [
  { name: "Gmail", icon: <GmailLogo className="h-5 w-5" /> },
  { name: "Outlook", icon: <OutlookLogo className="h-5 w-5" /> },
  { name: "Zoho Mail", icon: <ZohoLogo className="h-5 w-5" /> },
  { name: "Custom SMTP", icon: <SmtpLogo className="h-5 w-5" /> },
]

const emailTemplates = [
  { name: "Interview Invitation", subject: "Interview Invitation — {{job_title}}", badge: "Most used" },
  { name: "Application Received", subject: "We received your application for {{job_title}}", badge: null },
  { name: "Follow Up", subject: "Following up on your application at {{company_name}}", badge: null },
  { name: "Rejection", subject: "Update on your application — {{job_title}}", badge: null },
  { name: "Custom Template", subject: "Start from scratch", badge: null },
]

function EmailComposer() {
  const [sent, setSent] = useState(false)

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,32,51,0.07)]">
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E4E7EC] px-5 py-3 flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.1" />
          <path d="M1 4L6 7l5-3" stroke="#9CA3AF" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] text-[#9CA3AF]">New Email · HiringEase</span>
        {sent && (
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
            <span className="text-[10px] font-semibold text-[#12B76A]">Email sent</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-0">
        {[
          { label: "From", value: "recruiting@company.com", editable: false },
          { label: "To", value: "alex@example.com", editable: false },
          { label: "Subject", value: "Interview Invitation — Product Designer", editable: true },
        ].map((field, i) => (
          <div key={field.label} className={`flex items-center gap-4 py-3 ${i < 2 ? "border-b border-[#F3F4F6]" : ""}`}>
            <span className="text-[11px] text-[#9CA3AF] w-14 flex-shrink-0">{field.label}</span>
            <span className="text-[12px] font-medium text-[#172033]">{field.value}</span>
          </div>
        ))}

        <div className="border-t border-[#F3F4F6] pt-4 pb-2 min-h-[120px]">
          <p className="text-[12px] text-[#475467] leading-relaxed">
            Hi Alex,
          </p>
          <p className="text-[12px] text-[#475467] leading-relaxed mt-3">
            Thank you for your interest in the Product Designer role. We were impressed with your experience and would like to invite you for a technical interview.
          </p>
          <p className="text-[12px] text-[#475467] leading-relaxed mt-3">
            Please find the details below:
            <br />
            <strong className="text-[#172033]">Date:</strong> Friday, December 13
            <br />
            <strong className="text-[#172033]">Time:</strong> 2:00 PM – 3:00 PM PST
            <br />
            <strong className="text-[#172033]">Format:</strong> Google Meet (link will follow)
          </p>
          <p className="text-[12px] text-[#475467] leading-relaxed mt-3">
            Looking forward to speaking with you.
          </p>
          <p className="text-[12px] text-[#475467] mt-3">Best,<br />Jamie Park<br />Head of Recruiting</p>
        </div>

        <div className="border-t border-[#F3F4F6] pt-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#9CA3AF]">Via recruiting@company.com</span>
            <div className="w-1 h-1 rounded-full bg-[#D0D5DD]" />
            <span className="text-[10px] text-[#9CA3AF]">Template: Interview Invitation</span>
          </div>
          {!sent ? (
            <button
              onClick={() => setSent(true)}
              className="flex items-center gap-2 bg-[#00AFA8] text-white text-[11px] font-semibold px-4 py-2 rounded-[10px] hover:bg-[#008C86] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5L11.5 1.5L8 11.5L6.5 7L1.5 6.5Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                <path d="M6.5 7L11.5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Send Email
            </button>
          ) : (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#12B76A]">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sent successfully
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EmailSection() {
  const [activeTemplate, setActiveTemplate] = useState(0)

  return (
    <>
      {/* Email / BYOE Section */}
      <section className="py-28 lg:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Email Integration</p>
              <h2
                className="text-4xl lg:text-[42px] font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Your email. Your brand.</span>{" "}
                Your candidate.
              </h2>
              <p className="text-[15px] text-[#475467] leading-relaxed mb-8">
                Connect your company's email provider and communicate with candidates directly from your own hiring team's address — no more generic noreply emails.
              </p>

              {/* Providers */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {providers.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 bg-white border border-[#E4E7EC] rounded-xl px-4 py-3 hover:border-[#D0D5DD] transition-colors">
                    {p.icon}
                    <span className="text-[12px] font-semibold text-[#172033]">{p.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#12B76A" strokeWidth="1.2" />
                  <path d="M4.5 7L6.5 9L9.5 5" stroke="#12B76A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Emails are sent from your own domain — not HiringEase servers.
              </div>
            </div>

            <EmailComposer />
          </div>
        </div>
      </section>

      {/* Email Templates Section */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Template list */}
            <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl overflow-hidden">
              <div className="border-b border-[#E4E7EC] px-5 py-3.5">
                <p className="text-[12px] font-semibold text-[#172033]">Email Templates</p>
              </div>
              <div className="divide-y divide-[#E4E7EC]">
                {emailTemplates.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveTemplate(i)}
                    className={`w-full text-left px-5 py-3.5 transition-colors flex items-start gap-3 ${
                      activeTemplate === i ? "bg-[#ECFDFB]" : "hover:bg-white"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      activeTemplate === i ? "bg-[#00AFA8]" : "bg-[#E4E7EC]"
                    }`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="1" y="2" width="10" height="8" rx="1.5" stroke={activeTemplate === i ? "white" : "#9CA3AF"} strokeWidth="1.1" fill="none" />
                        <path d="M1 4L6 7l5-3" stroke={activeTemplate === i ? "white" : "#9CA3AF"} strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-[12px] font-semibold ${activeTemplate === i ? "text-[#00AFA8]" : "text-[#172033]"}`}>{t.name}</p>
                        {t.badge && (
                          <span className="text-[8px] font-bold text-[#00AFA8] bg-[#ECFDFB] px-1.5 py-0.5 rounded-full">{t.badge}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5 truncate">{t.subject}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: info + template preview */}
            <div>
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Email Templates</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Every candidate message.</span>{" "}
                Ready when you need it.
              </h2>
              <p className="text-[15px] text-[#475467] leading-relaxed mb-6">
                Pre-built templates with dynamic variables keep your communication consistent and professional. Customize and save your own.
              </p>

              {/* Dynamic variables */}
              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Dynamic Variables</p>
                <div className="flex flex-wrap gap-2">
                  {["{{candidate_name}}", "{{job_title}}", "{{interview_date}}", "{{interview_time}}", "{{company_name}}"].map((v) => (
                    <code key={v} className="text-[10px] font-mono text-[#00AFA8] bg-[#ECFDFB] border border-[#99F6E4] px-2.5 py-1 rounded-lg">{v}</code>
                  ))}
                </div>
              </div>

              {/* Template preview */}
              <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Preview</p>
                <p className="text-[11px] font-semibold text-[#172033] mb-1">{emailTemplates[activeTemplate].subject}</p>
                <p className="text-[10px] text-[#667085] leading-relaxed">
                  {activeTemplate === 0 && "Hi {{candidate_name}}, We'd love to invite you for a technical interview for the {{job_title}} role. Please find the scheduling details below..."}
                  {activeTemplate === 1 && "Hi {{candidate_name}}, Thank you for applying to the {{job_title}} role at {{company_name}}. We've received your application and will be in touch shortly..."}
                  {activeTemplate === 2 && "Hi {{candidate_name}}, We wanted to follow up on your application for the {{job_title}} position. We're still reviewing candidates and will have an update soon..."}
                  {activeTemplate === 3 && "Hi {{candidate_name}}, Thank you for taking the time to apply for the {{job_title}} role. After careful consideration, we've decided to move forward with other candidates..."}
                  {activeTemplate === 4 && "Start writing your custom email template here. Use dynamic variables to personalize each message automatically."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interviews Section */}
      <section className="py-28 lg:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Interview Scheduling</p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-[#00AFA8]">Schedule interviews</span>{" "}
              without the back-and-forth.
            </h2>
          </div>

          <div className="max-w-[720px] mx-auto">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(23,32,51,0.07)]">
              <div className="bg-[#F8FAFC] border-b border-[#E4E7EC] px-6 py-3.5 flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#172033]">Schedule Interview · Alex Morgan</p>
                <div className="flex items-center gap-1.5">
                  {/* Google Meet icon approximation */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect width="16" height="16" rx="3" fill="#00897B" />
                    <rect x="2" y="4" width="7" height="8" rx="1" fill="white" />
                    <path d="M9 6L14 4v8l-5-2V6Z" fill="white" />
                  </svg>
                  <span className="text-[10px] font-medium text-[#667085]">Google Meet auto-generated</span>
                </div>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { label: "Candidate", value: "Alex Morgan", icon: "👤" },
                    { label: "Interviewer", value: "Jamie Park", icon: "👔" },
                    { label: "Interview Type", value: "Technical Interview", icon: "💬" },
                  ].map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1.5">{f.label}</p>
                      <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl px-3 py-2.5">
                        <span className="text-sm">{f.icon}</span>
                        <span className="text-[12px] font-semibold text-[#172033]">{f.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1.5">Select Date</p>
                  <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-[#172033]">December 2024</span>
                      <div className="flex gap-1">
                        <button className="w-5 h-5 rounded flex items-center justify-center text-[#9CA3AF] hover:bg-white hover:text-[#172033]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5 6.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                        </button>
                        <button className="w-5 h-5 rounded flex items-center justify-center text-[#9CA3AF] hover:bg-white hover:text-[#172033]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5 3.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <span key={d} className="text-[8px] text-[#9CA3AF] py-1">{d}</span>
                      ))}
                      {["", "", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"].map((d, i) => (
                        <span key={i} className={`text-[9px] py-1 rounded cursor-pointer ${
                          d === "13" ? "bg-[#00AFA8] text-white font-bold" :
                          d === "" ? "" :
                          "text-[#172033] hover:bg-white"
                        }`}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"].map((t) => (
                      <button key={t} className={`text-[10px] font-medium py-2 rounded-lg border transition-colors ${
                        t === "2:00 PM" ? "bg-[#00AFA8] text-white border-[#00AFA8]" : "border-[#E4E7EC] text-[#475467] hover:border-[#D0D5DD]"
                      }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E4E7EC] px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {/* Google Calendar icon approximation */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1.5" y="2" width="13" height="12" rx="2" fill="white" stroke="#E4E7EC" strokeWidth="1" />
                      <rect x="1.5" y="2" width="13" height="4" rx="2" fill="#4285F4" />
                      <rect x="1.5" y="4" width="13" height="2" fill="#4285F4" />
                      <path d="M5 1.5v2M11 1.5v2" stroke="#4285F4" strokeWidth="1.2" strokeLinecap="round" />
                      <text x="8" y="12.5" textAnchor="middle" fontSize="4.5" fill="#172033" fontWeight="bold">13</text>
                    </svg>
                    <span className="text-[10px] text-[#667085]">Added to Google Calendar</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L4.5 8.5L10 3" stroke="#12B76A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] font-semibold text-[#15803D]">Interview scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
