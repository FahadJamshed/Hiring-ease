import footerLogo from "../imports/Mask_group_footer.png"

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
    <footer className="bg-[#172033]">
      <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-16">
        <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <img src={footerLogo} alt="HiringEase" className="h-auto w-[174px]" />
            <p className="mt-4 max-w-[220px] text-[12px] leading-relaxed text-white/50">
              AI-powered applicant tracking for modern recruiting teams.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[12px] text-white/60 transition-colors hover:text-white">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 md:flex-row">
          <p className="text-[11px] text-white/30">© 2026 HiringEase. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
            <p className="text-[11px] text-white/30">
              HiringEase ATS — Design &amp; Developed By{" "}
              <a href="https://novatoresols.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/70">Novatore Solutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
