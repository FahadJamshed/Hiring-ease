import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import hiringEaseFavicon from "./imports/HE_favicon.png"
import QuickHelp from "./components/QuickHelp"
import AnimatedCursor from "./components/AnimatedCursor"
import ScrollMotion from "./components/ScrollMotion"
import Footer from "./components/Footer"
import HeroSection from "./sections/Hero"
import ProblemSection from "./sections/Problem"
import WorkflowSection from "./sections/Workflow"
import AIResumeSection from "./sections/AIResume"
import CandidateProfileSection from "./sections/CandidateProfile"
import PipelineSection from "./sections/Pipeline"
import EmailSection from "./sections/Email"
import FeedbackSection from "./sections/Feedback"
import PlatformSections from "./sections/Platform"
import ConversionSections from "./sections/Conversion"
import ContactPage from "./pages/Contact"
import LegalPage from "./pages/Legal"
import BookDemoPage from "./pages/BookDemo"

export default function App() {
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [loaderLeaving, setLoaderLeaving] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLoaderLeaving(true), 1200)
    const hideTimer = window.setTimeout(() => setLoaderVisible(false), 1550)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    setShowCookieBanner(window.localStorage.getItem("hiringease-cookie-consent") !== "accepted")
  }, [])

  const acceptCookies = () => {
    window.localStorage.setItem("hiringease-cookie-consent", "accepted")
    setShowCookieBanner(false)
  }

  const rejectCookies = () => {
    window.localStorage.setItem("hiringease-cookie-consent", "rejected")
    setShowCookieBanner(false)
  }

  const path = window.location.pathname.replace(/\/$/, "") || "/"

  return (
    <>
      <AnimatedCursor />
      <ScrollMotion />
      {loaderVisible && <SiteLoader leaving={loaderLeaving} />}
      <QuickHelp />
      {showCookieBanner && <CookieBanner onAccept={acceptCookies} onReject={rejectCookies} />}
      {path === "/contact" ? (
        <ContactPage />
      ) : path === "/book-demo" ? (
        <BookDemoPage />
      ) : path === "/privacy" ? (
        <LegalPage type="privacy" />
      ) : path === "/terms" ? (
        <LegalPage type="terms" />
      ) : (
        <div className="min-h-full">
          <Navbar />
          <main>
            <HeroSection />
            <ProblemSection />
            <WorkflowSection />
            <AIResumeSection />
            <CandidateProfileSection />
            <PipelineSection />
            <EmailSection />
            <FeedbackSection />
            <PlatformSections />
            <ConversionSections />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

function CookieBanner({ onAccept, onReject }: { onAccept: () => void; onReject: () => void }) {
  return (
    <aside
      className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-[620px] -translate-x-1/2 flex-col items-stretch justify-between gap-4 rounded-2xl border border-white/80 bg-white/5 px-5 py-4 text-left shadow-[0_14px_40px_rgba(23,32,51,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:bottom-6 sm:flex-row sm:items-center sm:gap-5 sm:px-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="flex min-w-0 items-start gap-3">
        <svg className="mt-0.5 shrink-0 text-[#00AFA8]" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.02a3.5 3.5 0 0 0 4.48 4.48A3.5 3.5 0 0 0 20.5 13.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8.5" cy="13" r="1" fill="currentColor" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
          <circle cx="7" cy="8.5" r="1" fill="currentColor" />
        </svg>
        <p className="text-xs leading-relaxed text-[#667085]">
          We use cookies to improve your experience and understand how our site is used.
        </p>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2">
        <button
          type="button"
          onClick={onReject}
          className="rounded-[10px] border border-[#D0D5DD] px-3.5 py-2.5 text-xs font-semibold text-[#475467] transition-colors hover:border-[#00AFA8]/50 hover:text-[#008C86]"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="rounded-[10px] bg-[#00AFA8] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(0,175,168,0.24)] transition-colors hover:bg-[#008C86]"
        >
          Accept all cookies
        </button>
      </div>
    </aside>
  )
}

function SiteLoader({ leaving }: { leaving: boolean }) {
  return (
    <div
      className={`site-loader ${leaving ? "site-loader--leaving" : ""}`}
      role="status"
      aria-label="Loading HiringEase"
    >
      <div className="site-loader__stage">
        <div className="site-loader__logo-wrap">
          <img src={hiringEaseFavicon} alt="" className="site-loader__logo" />
        </div>
      </div>
      <div className="site-loader__track" aria-hidden="true">
        <span className="site-loader__progress" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
