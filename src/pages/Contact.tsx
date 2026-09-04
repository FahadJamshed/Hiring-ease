import { FormEvent, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <section className="px-6 pb-24 pt-36 lg:pb-32 lg:pt-44">
          <div className="mx-auto grid max-w-[1120px] items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Contact us</p>
              <h1
                className="mb-6 text-5xl font-bold leading-[1.06] tracking-[-0.035em] text-[#172033] lg:text-[64px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#00AFA8]">Let's make hiring</span>{" "}
                feel easy.
              </h1>
              <p className="max-w-[470px] text-[16px] leading-relaxed text-[#475467]">
                Tell us about your hiring workflow. Our team will help you find the right HiringEase setup for your organization.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  ["A tailored walkthrough", "See the workflows that matter to your team."],
                  ["Straightforward answers", "Get clear guidance on plans, setup, and security."],
                  ["A quick response", "Our team will get back to you within one business day."],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3 rounded-2xl border border-white/90 bg-white/55 p-4 shadow-[0_8px_24px_rgba(23,32,51,0.05)] backdrop-blur-xl">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00AFA8]/10 text-[#00AFA8]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="m2.5 6 2.1 2.1 4.9-4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#172033]">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#667085]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/90 bg-white/65 p-6 shadow-[0_24px_70px_rgba(23,32,51,0.10)] backdrop-blur-2xl sm:p-9">
              {submitted ? (
                <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00AFA8]/10 text-[#00AFA8]">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="m7 15 5 5 11-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Thanks for reaching out.</h2>
                  <p className="mt-3 max-w-[390px] text-sm leading-relaxed text-[#667085]">Your request has been received. The HiringEase team will be in touch within one business day.</p>
                  <a href="/" className="mt-8 text-sm font-semibold text-[#00AFA8] hover:text-[#008C86]">Return to home</a>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Talk to our team</h2>
                  <p className="mb-7 mt-2 text-sm text-[#667085]">Share a few details and we'll get back to you shortly.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="First name" name="firstName" placeholder="Alex" />
                      <Field label="Last name" name="lastName" placeholder="Morgan" />
                    </div>
                    <Field label="Work email" name="email" placeholder="alex@company.com" type="email" />
                    <Field label="Company" name="company" placeholder="Your company" />
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-[#344054]">Team size</span>
                      <select required name="teamSize" defaultValue="" className="w-full appearance-none rounded-xl border border-[#D0D5DD] bg-white/70 px-4 py-3.5 text-sm text-[#475467] outline-none transition focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10">
                        <option value="" disabled>Select team size</option>
                        <option>1–10</option><option>11–50</option><option>51–200</option><option>201–500</option><option>500+</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-[#344054]">How can we help?</span>
                      <textarea required name="message" rows={4} placeholder="Tell us about your hiring needs..." className="w-full resize-none rounded-xl border border-[#D0D5DD] bg-white/70 px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10" />
                    </label>
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00AFA8] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,175,168,0.26)] transition hover:bg-[#008C86]">
                      Send request
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#344054]">{label}</span>
      <input required type={type} name={name} placeholder={placeholder} className="w-full rounded-xl border border-[#D0D5DD] bg-white/70 px-4 py-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00AFA8] focus:ring-4 focus:ring-[#00AFA8]/10" />
    </label>
  )
}
