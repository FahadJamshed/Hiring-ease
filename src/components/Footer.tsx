import footerLogo from "../imports/Mask_group.png"

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Product overview", href: "/#product" },
      { label: "AI Recruiting", href: "/#ai-recruiting" },
      { label: "Workflow", href: "/#workflow" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Security", href: "/#security" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact us", href: "/contact" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-transparent px-4 pb-0 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-[1440px] px-7 pb-5 pt-10 sm:px-12 sm:pb-6 sm:pt-14 lg:px-16">
        <div className="grid gap-12 border-b border-[#E4E7EC] pb-12 md:grid-cols-[1.1fr_2fr] md:gap-20 lg:gap-28">
          <div>
            <img src={footerLogo} alt="HiringEase" className="-ml-2 h-auto w-[230px] max-w-full" />
            <p className="mt-6 max-w-[300px] text-[14px] leading-7 text-[#667085]">
              AI-powered applicant tracking for modern recruiting teams.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[#667085]" aria-label="Social media">
              <span aria-label="Instagram" title="Instagram" className="inline-flex cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[#00AFA8]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </span>
              <span aria-label="X" title="X" className="inline-flex cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[#00AFA8]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.09 17.86h1.73L8.26 4.03H6.4L17.81 19.86Z" />
                </svg>
              </span>
              <span aria-label="LinkedIn" title="LinkedIn" className="inline-flex cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[#00AFA8]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5.2 3.5A2.2 2.2 0 1 1 .8 3.5a2.2 2.2 0 0 1 4.4 0ZM1 8h4.4v13H1V8Zm7 0h4.2v1.78h.06c.58-1.1 2-2.26 4.13-2.26 4.42 0 5.24 2.91 5.24 6.7V21h-4.38v-6.02c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.2V21H8V8Z" />
                </svg>
              </span>
              <span aria-label="Facebook" title="Facebook" className="inline-flex cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[#00AFA8]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.93-5 5v2H6v4h3v7h4v-7h3.2l.8-4H13V9c0-.67.33-1 1-1Z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-12">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#172033]">{group.title}</p>
                <ul className="space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[13px] text-[#667085] transition-colors hover:text-[#00AFA8]">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[12px] text-[#98A2B3]">© 2026 HiringEase. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00AFA8]" />
            <p className="text-[12px] text-[#98A2B3]">
              HiringEase ATS — Design &amp; Developed By{" "}
              <a href="https://novatoresols.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#98A2B3]/40 underline-offset-2 transition-colors hover:text-[#172033]">Novatore Solutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
