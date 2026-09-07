import hiringEaseLogo from "../imports/Mask_group.png"
import type { ReactNode } from "react"
import { GmailLogo, OutlookLogo, SmtpLogo, ZohoLogo } from "../components/EmailProviderIcons"

// Job Distribution, Team Roles, Security, Integrations, Superadmin, Technology

function PlatformIcon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    shield: <path d="M12 2.5 19 5v5.7c0 4.4-2.9 7.8-7 9.3-4.1-1.5-7-4.9-7-9.3V5l7-2.5Z" />,
    target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><path d="m15.5 8.5 5-5M17.2 3.5h3.3v3.3" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 4V2.8h6V4M9 10h6M9 14h6M9 18h3" /></>,
    lockKey: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10M12 14v2" /></>,
    key: <><circle cx="8" cy="12" r="3.5" /><path d="m10.5 9.5 8-8M15.5 4.5l2 2M13.5 6.5l2 2" /></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" /></>,
    ticket: <path d="M4 5h16v4a2.5 2.5 0 0 0 0 5v4H4v-4a2.5 2.5 0 0 0 0-5V5ZM13 8v7" />,
    link: <><path d="M10 13.5 8.5 15a4 4 0 0 1-5.7-5.7l3-3A4 4 0 0 1 11.5 6" /><path d="M14 10.5l1.5-1.5a4 4 0 0 0-5.7-5.7l-3 3A4 4 0 0 0 6.5 12" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
    globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5C9.8 18.2 8.7 15.4 8.7 12S9.8 5.8 12 3.5" /></>,
    refresh: <><path d="M19 8a8 8 0 0 0-13.6-2.3L3 8M3 4v4h4M5 16a8 8 0 0 0 13.6 2.3L21 16M21 20v-4h-4" /></>,
  }

  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function JobDistribution() {
  return (
    <section id="integrations" className="py-28 lg:py-36 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Job Distribution</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Publish once.</span>{" "}
            Reach candidates where they are.
          </h2>
          <p className="text-[16px] text-[#475467] max-w-[480px] mx-auto mt-4 leading-relaxed">
            Post your job to your public portal, share to LinkedIn, and distribute via Indeed XML — all from one place.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto">
          {/* Flow */}
          <div className="flex flex-col items-center gap-4">
            {/* Source */}
            <div className="rounded-2xl border border-[#00AFA8]/20 bg-white/80 px-8 py-4 shadow-[0_8px_24px_rgba(0,175,168,0.10)]">
              <img src={hiringEaseLogo} alt="HiringEase" className="w-[156px] h-auto" />
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-5 bg-[#E4E7EC]" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M2 7.5L6 11.5L10 7.5" stroke="#D0D5DD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Destinations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                {
                  name: "Public Job Portal",
                  desc: "Branded careers page",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="9" stroke="#00AFA8" strokeWidth="1.5" />
                      <path d="M11 2C11 2 8 6.5 8 11s3 9 3 9" stroke="#00AFA8" strokeWidth="1.2" fill="none" />
                      <path d="M11 2C11 2 14 6.5 14 11s-3 9-3 9" stroke="#00AFA8" strokeWidth="1.2" fill="none" />
                      <path d="M2 11h18" stroke="#00AFA8" strokeWidth="1.2" />
                      <path d="M3 7h16M3 15h16" stroke="#00AFA8" strokeWidth="1" strokeDasharray="2 2" />
                    </svg>
                  ),
                  color: "#ECFDFB",
                  border: "#99F6E4",
                },
                {
                  name: "LinkedIn",
                  desc: "Easy link sharing",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect width="22" height="22" rx="5" fill="#0A66C2" />
                      <rect x="3.5" y="8" width="3.5" height="10.5" rx="1" fill="white" />
                      <circle cx="5.25" cy="5.25" r="2" fill="white" />
                      <path d="M9.5 8h3.5v2s1-2.5 4-2.5c2.5 0 3.5 2 3.5 4.5V18.5h-3.5V13c0-1.5-.5-2.5-2-2.5-1.7 0-2 1.5-2 2.5V18.5H9.5V8Z" fill="white" />
                    </svg>
                  ),
                  color: "#ECFDFB",
                  border: "#99F6E4",
                },
                {
                  name: "Indeed XML",
                  desc: "Automated feed",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect width="22" height="22" rx="5" fill="#2164F3" />
                      <text x="11" y="14.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">indeed</text>
                    </svg>
                  ),
                  color: "#ECFDFB",
                  border: "#99F6E4",
                },
              ].map((dest) => (
                <div
                  key={dest.name}
                  className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl border"
                  style={{ backgroundColor: dest.color, borderColor: dest.border }}
                >
                  {dest.icon}
                  <div>
                    <p className="text-[12px] font-semibold text-[#172033]">{dest.name}</p>
                    <p className="text-[10px] text-[#667085] mt-0.5">{dest.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#9CA3AF] text-center max-w-[400px]">
              LinkedIn sharing and Indeed XML syndication are supported. Direct ATS integrations with LinkedIn/Indeed are not implied.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamRoles() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Team Roles</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Everyone knows</span>{" "}
            what to do next.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {[
            {
              role: "Admin",
              icon: "shield",
              badge: "Organization-level",
              desc: "Full organization-level control. Manage team members, configure integrations, set up hiring workflows, and oversee all recruiting activity.",
              perms: ["Manage all users & roles", "Configure integrations", "Access all jobs & candidates", "View audit logs", "Billing & subscription"],
              color: "#172033",
              badgeBg: "#F8FAFC",
              badgeText: "#475467",
            },
            {
              role: "Recruiter",
              icon: "target",
              badge: "Core role",
              desc: "Manage jobs, candidates, pipelines, and all recruiting activities. Communicate with candidates and coordinate interviews.",
              perms: ["Create & manage jobs", "Manage candidates & pipeline", "Send emails to candidates", "Schedule interviews", "Use email templates"],
              color: "#00AFA8",
              badgeBg: "#ECFDFB",
              badgeText: "#00AFA8",
            },
            {
              role: "Interviewer",
              icon: "clipboard",
              badge: "Focused access",
              desc: "Access only the interviews you're assigned to. Review candidate profiles and submit structured scorecards after each interview.",
              perms: ["View assigned interviews", "Access candidate profile", "Submit scorecards", "View own feedback history"],
              color: "#7C3AED",
              badgeBg: "#F5F3FF",
              badgeText: "#7C3AED",
            },
          ].map((r) => (
            <div key={r.role} className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(23,32,51,0.08)] transition-shadow">
              <div className="px-6 py-5 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ color: r.color, backgroundColor: `${r.color}12` }}>
                    <PlatformIcon name={r.icon} />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.role}</p>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: r.badgeBg, color: r.badgeText }}>
                      {r.badge}
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-[#667085] leading-relaxed">{r.desc}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Permissions</p>
                <ul className="space-y-2">
                  {r.perms.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${r.color}15` }}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1.5 3.5L2.8 4.8L5.5 2" stroke={r.color} strokeWidth="1.1" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-[11px] text-[#475467]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SecuritySection() {
  return (
    <section id="security" className="py-28 lg:py-36 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Security</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] max-w-[640px] mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Powerful enough for your team.</span>{" "}
            Secure enough for your data.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              label: "RLS",
              title: "Row-Level Security",
              desc: "Tenant-level data isolation. Every organization's data is strictly separated at the database layer.",
              icon: "lockKey",
              color: "#172033",
            },
            {
              label: "RBAC",
              title: "Role-Based Access",
              desc: "Granular permissions control exactly what each team member can see and do.",
              icon: "shield",
              color: "#00AFA8",
            },
            {
              label: "MFA",
              title: "Multi-Factor Auth",
              desc: "TOTP authentication adds an extra layer of protection for every user login.",
              icon: "key",
              color: "#7C3AED",
            },
            {
              label: "Encryption",
              title: "Data Encryption",
              desc: "All sensitive credentials and candidate data encrypted at rest and in transit.",
              icon: "lock",
              color: "#12B76A",
            },
          ].map((s) => (
            <div key={s.label} className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl p-6 hover:bg-white hover:border-[#D0D5DD] transition-colors">
              <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ color: s.color, backgroundColor: `${s.color}12` }}>
                <PlatformIcon name={s.icon} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-wider text-white px-2 py-0.5 rounded-lg" style={{ backgroundColor: s.color }}>
                  {s.label}
                </span>
              </div>
              <p className="text-[13px] font-semibold text-[#172033] mb-2">{s.title}</p>
              <p className="text-[11px] text-[#667085] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function IntegrationsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Integrations</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Fits into the tools</span>{" "}
            your team already uses.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[900px] mx-auto">
          {[
            {
              name: "Gmail",
              icon: <GmailLogo className="h-7 w-7" />,
            },
            {
              name: "Outlook",
              icon: <OutlookLogo className="h-7 w-7" />,
            },
            {
              name: "Zoho Mail",
              icon: <ZohoLogo className="h-7 w-7" />,
            },
            {
              name: "Google Calendar",
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="1" y="3" width="26" height="24" rx="3" fill="white" stroke="#E4E7EC" />
                  <rect x="1" y="3" width="26" height="8" rx="3" fill="#4285F4" />
                  <rect x="1" y="9" width="26" height="2" fill="#4285F4" />
                  <path d="M8 2v4M20 2v4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                  <text x="14" y="22" textAnchor="middle" fontSize="9" fill="#172033" fontWeight="bold">21</text>
                </svg>
              ),
            },
            {
              name: "Google Meet",
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="5" fill="#00897B" />
                  <rect x="3" y="6" width="13" height="16" rx="2" fill="white" />
                  <path d="M16 9L25 5v18l-9-4V9Z" fill="white" />
                </svg>
              ),
            },
            {
              name: "Custom SMTP",
              icon: <SmtpLogo className="h-7 w-7" />,
            },
          ].map((int) => (
            <div key={int.name} className="flex flex-col items-center gap-3 bg-white border border-[#E4E7EC] rounded-2xl p-5 hover:shadow-[0_4px_16px_rgba(23,32,51,0.08)] transition-shadow">
              {int.icon}
              <p className="text-[11px] font-semibold text-[#172033] text-center">{int.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SuperadminSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Platform Administration</p>
            <h2
              className="text-4xl lg:text-[42px] font-bold text-[#172033] tracking-[-0.025em] leading-[1.1] mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-[#00AFA8]">Control the entire</span>{" "}
              recruiting environment.
            </h2>
            <p className="text-[15px] text-[#475467] leading-relaxed">
              Platform-level administration gives you complete visibility and control over tenant lifecycle, billing, and system-wide audit logs.
            </p>
          </div>

          {/* Superadmin console */}
          <div className="overflow-hidden rounded-2xl border border-[#D4DCE2] bg-[#E8F2F2]/65 shadow-[0_12px_42px_rgba(23,32,51,0.10),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
            <div className="border-b border-[#D4DCE2] bg-white/20 px-5 py-3.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F04438]/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F9D00D]/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#12B76A]/50" />
              </div>
              <span className="text-[#667085] text-[11px] ml-1">Superadmin Console</span>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                {
                  title: "Tenant Management",
                  items: ["Create tenant", "Suspend tenant", "Configure tenant", "Monitor activity"],
                  color: "#00AFA8",
                },
                {
                  title: "Billing & Plans",
                  items: ["Plan management", "Subscriptions", "Usage metrics", "Invoices"],
                  color: "#F9D00D",
                },
                {
                  title: "Audit & Logs",
                  items: ["Activity logs", "Data export", "Event history", "User actions"],
                  color: "#12B76A",
                },
                {
                  title: "System Health",
                  items: ["Active tenants: 0", "Jobs queued: 0", "Uptime: 99.9%", "Last check: now"],
                  color: "#7C3AED",
                },
              ].map((panel) => (
                <div key={panel.title} className="rounded-xl border border-[#D4DCE2] bg-white/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: panel.color }} />
                    <p className="text-[10px] font-bold text-[#172033]">{panel.title}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {panel.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 cursor-pointer group">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40 group-hover:opacity-100 transition-opacity">
                          <path d="M2.5 5h5M6 3l2 2-2 2" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[10px] text-[#667085] group-hover:text-[#172033] transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechnologySection() {
  const techs = [
    { name: "React 18", color: "#61DAFB", bg: "#E0F7FE" },
    { name: "TypeScript", color: "#3178C6", bg: "#EBF3FC" },
    { name: "Vite", color: "#646CFF", bg: "#EDEDFF" },
    { name: "Tailwind CSS", color: "#06B6D4", bg: "#E0F9FC" },
    { name: "FastAPI", color: "#059669", bg: "#E9F9F4" },
    { name: "Python", color: "#3776AB", bg: "#EBF3FA" },
    { name: "PostgreSQL", color: "#336791", bg: "#E8EFF7" },
    { name: "Redis", color: "#DC382D", bg: "#FBEAEA" },
    { name: "Celery", color: "#37814A", bg: "#E9F5EC" },
    { name: "DigitalOcean", color: "#0080FF", bg: "#E5F2FF" },
    { name: "OpenAI", color: "#412991", bg: "#EDE8F8" },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Technology</p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Built for speed.</span>{" "}
            Designed to scale.
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E4E7EC] bg-white hover:shadow-[0_2px_8px_rgba(23,32,51,0.07)] transition-shadow"
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
              <span className="text-[12px] font-semibold text-[#172033]">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PlatformSections() {
  return (
    <>
      <JobDistribution />
      <TeamRoles />
      <SecuritySection />
      <IntegrationsSection />
      <SuperadminSection />
      <TechnologySection />
    </>
  )
}
