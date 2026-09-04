import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const privacySections = [
  ["Information we collect", "We may collect contact details, account information, hiring workflow data, candidate information submitted through the service, and technical data such as device, browser, and usage information."],
  ["How we use information", "We use information to provide and improve HiringEase, manage accounts, respond to requests, secure the service, communicate product updates, and meet legal obligations."],
  ["How information is shared", "We do not sell personal information. We may share information with trusted service providers that support hosting, analytics, communications, and security, or when disclosure is legally required."],
  ["Data retention and security", "We retain information only as long as needed for the purposes described here or required by law. We use reasonable administrative, technical, and organizational safeguards to protect it."],
  ["Your choices", "Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information. You may also opt out of non-essential communications."],
  ["Contact", "For privacy questions or requests, please contact the HiringEase team through our Contact page."],
]

const termsSections = [
  ["Using HiringEase", "You may use HiringEase only in accordance with applicable law and these terms. You are responsible for your account, authorized users, and the accuracy and legality of information submitted to the service."],
  ["Acceptable use", "You must not misuse the service, attempt unauthorized access, disrupt its operation, upload harmful content, infringe others’ rights, or use HiringEase for unlawful discrimination or other prohibited hiring practices."],
  ["Customer data", "You retain ownership of data you submit. You grant HiringEase the limited rights needed to host, process, and display that data solely to provide and improve the service."],
  ["Intellectual property", "HiringEase, its software, branding, and content are owned by HiringEase or its licensors. These terms do not transfer ownership or grant rights beyond those required to use the service."],
  ["Availability and changes", "We may improve, modify, or discontinue features over time. We aim to provide a reliable service but do not guarantee uninterrupted or error-free availability."],
  ["Limitation and contact", "Use of the service is subject to the limitations permitted by applicable law. If you have questions about these terms, contact our team before using HiringEase."],
]

export default function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy"
  const sections = privacy ? privacySections : termsSections
  const title = privacy ? "Privacy Policy" : "Terms of Use"

  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <section className="px-6 pb-24 pt-36 lg:pb-32 lg:pt-44">
          <div className="mx-auto max-w-[860px]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Legal</p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.035em] text-[#172033] lg:text-[64px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="text-[#00AFA8]">{privacy ? "Your privacy." : "Clear terms."}</span>{" "}
              {privacy ? "Our responsibility." : "Better collaboration."}
            </h1>
            <p className="mt-5 text-sm text-[#667085]">{title} · Last updated September 4, 2026</p>

            <div className="mt-10 rounded-[28px] border border-[#D4DCE2] bg-[#E9EFF2]/55 p-6 shadow-[0_20px_60px_rgba(23,32,51,0.07),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl sm:p-10">
              <p className="mb-9 text-[15px] leading-relaxed text-[#475467]">
                {privacy
                  ? "This policy explains how HiringEase collects, uses, and protects information when you visit our website or use our applicant tracking services."
                  : "These terms govern access to and use of the HiringEase website and applicant tracking services. By using HiringEase, you agree to these terms."}
              </p>
              <div className="space-y-8">
                {sections.map(([heading, body], index) => (
                  <section key={heading} className="border-t border-[#E4E7EC] pt-7 first:border-0 first:pt-0">
                    <div className="flex gap-4">
                      <span className="mt-0.5 text-[10px] font-bold text-[#00AFA8]">0{index + 1}</span>
                      <div><h2 className="text-lg font-bold text-[#172033]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{heading}</h2><p className="mt-2 text-sm leading-7 text-[#667085]">{body}</p></div>
                    </div>
                  </section>
                ))}
              </div>
              <div className="mt-10 rounded-2xl border border-[#D4DCE2] bg-[#E1EBED]/55 p-5 text-sm text-[#475467] backdrop-blur-xl">Need more information? <a href="/contact" className="font-semibold text-[#008C86] hover:underline">Contact our team →</a></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
