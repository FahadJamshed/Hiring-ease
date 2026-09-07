import { useState } from "react"
import hiringEaseFavicon from "../imports/HE_favicon.png"

import { faqs } from "../data/hiringease-faqs.js"

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 lg:py-36 px-6 bg-white">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">FAQ</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Questions before</span>{" "}
            you get started?
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i ? "border-[#00AFA8]/30 bg-[#F8FCFF]" : "border-[#E4E7EC] bg-white"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[14px] font-semibold text-[#172033] leading-snug">{faq.q}</span>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                    open === i ? "bg-[#00AFA8] border-[#00AFA8]" : "border-[#E4E7EC]"
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                  >
                    <path
                      d="M5 2v6M2 5h6"
                      stroke={open === i ? "white" : "#9CA3AF"}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5 anim-fade-up">
                  <p className="text-[13px] text-[#475467] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="py-28 lg:py-36 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#667085] mb-4">Pricing</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#172033] tracking-[-0.025em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#00AFA8]">Simple plans</span>{" "}
            for growing hiring teams.
          </h2>
          <p className="text-[16px] text-[#475467] max-w-[420px] mx-auto mt-4 leading-relaxed">
            We tailor pricing to the size and needs of your team. Reach out and we'll find the right fit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {[
            {
              name: "Starter",
              desc: "For small teams getting started with structured hiring.",
              features: ["Up to 5 team members", "3 active jobs", "AI resume parsing", "Basic pipeline", "Email templates", "Candidate profiles"],
              cta: "Talk to our team",
              highlight: false,
            },
            {
              name: "Growth",
              desc: "For scaling teams that need full pipeline visibility and email.",
              features: ["Up to 20 team members", "Unlimited active jobs", "AI matching & scoring", "Custom pipeline stages", "BYOE email integration", "Interview scheduling", "Scorecards"],
              cta: "Talk to our team",
              highlight: true,
            },
            {
              name: "Enterprise",
              desc: "For organizations that need security, compliance, and full control.",
              features: ["Unlimited team members", "Everything in Growth", "RLS + RBAC + MFA", "Audit logs", "Superadmin console", "Custom SMTP", "Priority support"],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border overflow-hidden ${
                plan.highlight
                  ? "bg-[#172033] border-[#172033] shadow-[0_24px_64px_rgba(23,32,51,0.2)]"
                  : "bg-white border-[#E4E7EC] hover:shadow-[0_8px_32px_rgba(23,32,51,0.08)] transition-shadow"
              }`}
            >
              <div className={`px-7 py-7 ${plan.highlight ? "border-b border-white/10" : "border-b border-[#E4E7EC]"}`}>
                {plan.highlight && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#F9D00D] mb-3 block">Most Popular</span>
                )}
                <h3
                  className={`text-[22px] font-bold mb-2 ${plan.highlight ? "text-white" : "text-[#172033]"}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className={`text-[12px] leading-relaxed ${plan.highlight ? "text-white/60" : "text-[#667085]"}`}>
                  {plan.desc}
                </p>
                <div className={`mt-4 pt-4 ${plan.highlight ? "border-t border-white/10" : "border-t border-[#F3F4F6]"}`}>
                  <p className={`text-[13px] font-semibold ${plan.highlight ? "text-white/60" : "text-[#9CA3AF]"}`}>
                    Pricing available on request
                  </p>
                </div>
              </div>
              <div className="px-7 py-6">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-[#00AFA8]" : "bg-[#F0FDF4]"
                      }`}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1.5 3.5L2.8 4.8L5.5 2" stroke={plan.highlight ? "white" : "#12B76A"} strokeWidth="1.1" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className={`text-[11px] ${plan.highlight ? "text-white/70" : "text-[#475467]"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`block text-center text-[13px] font-semibold py-3 rounded-[12px] transition-colors ${
                    plan.highlight
                      ? "bg-[#00AFA8] text-white hover:bg-[#008C86]"
                      : "bg-[#F8FAFC] text-[#172033] border border-[#E4E7EC] hover:bg-white hover:border-[#D0D5DD]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-28 lg:py-36 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Brand mark */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl border border-white/80 p-2.5 shadow-[0_10px_28px_rgba(0,175,168,0.18)] backdrop-blur-xl"
            style={{ backgroundColor: "rgb(214 250 246 / 48%)" }}
          >
            <img src={hiringEaseFavicon} alt="HiringEase" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        </div>

        <h2
          className="text-5xl lg:text-[64px] font-bold text-[#172033] tracking-[-0.03em] leading-[1.07] mb-6"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="text-[#00AFA8]">Make hiring</span>
          <br />feel easy.
        </h2>
        <p className="text-[17px] text-[#475467] max-w-[480px] mx-auto leading-relaxed mb-10">
          Bring your recruiting workflow together with HiringEase ATS 2.0.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00AFA8] text-white font-semibold text-sm px-8 py-4 rounded-[14px] hover:bg-[#008C86] transition-colors shadow-[0_8px_32px_rgba(0,175,168,0.3)]"
          >
            Contact Us
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/book-demo"
            className="inline-flex items-center gap-2 text-[#172033] font-semibold text-sm px-8 py-4 rounded-[14px] bg-white border border-[#E4E7EC] hover:border-[#D0D5DD] transition-colors"
          >
            Book a Demo
          </a>
        </div>

        <p className="text-[11px] text-[#9CA3AF] mt-8">No setup fees. No long-term contracts required. Talk to the team.</p>
      </div>
    </section>
  )
}

export default function ConversionSections() {
  return (
    <>
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
