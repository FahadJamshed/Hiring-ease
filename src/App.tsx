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

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLoaderLeaving(true), 1200)
    const hideTimer = window.setTimeout(() => setLoaderVisible(false), 1550)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  const path = window.location.pathname.replace(/\/$/, "") || "/"

  return (
    <>
      <AnimatedCursor />
      <ScrollMotion />
      {loaderVisible && <SiteLoader leaving={loaderLeaving} />}
      <QuickHelp />
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
