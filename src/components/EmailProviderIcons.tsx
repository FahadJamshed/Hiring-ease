type IconProps = { className?: string }

export function GmailLogo({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Gmail logo">
      <path fill="#4285F4" d="M1.64 20.73h4.09v-9.94L0 6.5v12.59c0 .9.73 1.64 1.64 1.64Z" />
      <path fill="#34A853" d="M18.27 20.73h4.09c.91 0 1.64-.73 1.64-1.64V6.5l-5.73 4.3v9.93Z" />
      <path fill="#EA4335" d="M18.27 3.5v7.3L12 15.5l-6.27-4.7V3.5L12 8.2l6.27-4.7Z" />
      <path fill="#FBBC04" d="M0 4.32V6.5l5.73 4.3V3.5L3.93 2.15C2.31.94 0 2.09 0 4.32Z" />
      <path fill="#C5221F" d="M24 4.32V6.5l-5.73 4.3V3.5l1.8-1.35C21.69.94 24 2.09 24 4.32Z" />
    </svg>
  )
}

export function OutlookLogo({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Microsoft Outlook logo">
      <path fill="#0364B8" d="M13 4.25 22 2v20l-9-2.25V4.25Z" />
      <path fill="#0A78D0" d="M10 6h12v12H10z" />
      <path fill="#28A8EA" d="m10 6 6 4.5L22 6H10Z" />
      <path fill="#0078D4" d="M2 4h12v16H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path fill="white" d="M7.15 8.1c2.38 0 3.85 1.55 3.85 3.86 0 2.4-1.49 3.94-3.95 3.94-2.37 0-3.85-1.54-3.85-3.86 0-2.39 1.5-3.94 3.95-3.94Zm-.06 1.55c-1.13 0-1.79.9-1.79 2.35 0 1.47.67 2.35 1.81 2.35 1.13 0 1.79-.86 1.79-2.34 0-1.47-.67-2.36-1.81-2.36Z" />
    </svg>
  )
}

export function ZohoLogo({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Zoho logo">
      <rect width="24" height="24" rx="4" fill="#E42527" />
      <text x="12" y="15.2" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700">zoho</text>
    </svg>
  )
}

export function SmtpLogo({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Email server icon">
      <rect width="24" height="24" rx="4" fill="#475467" />
      <rect x="3.5" y="7" width="17" height="11" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="m4 8.5 8 5.25 8-5.25" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}
