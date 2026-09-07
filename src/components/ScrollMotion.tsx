import { useEffect } from "react"

export default function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let observer: IntersectionObserver | undefined
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"))
      .filter((section) => !section.parentElement?.closest("section") && section.id !== "home")

    const reset = () => {
      observer?.disconnect()
      sections.forEach((section) => {
        section.classList.remove("scroll-scene", "scroll-scene--visible")
      })
    }
    const setup = () => {
      reset()
      if (preference.matches || !("IntersectionObserver" in window)) return
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("scroll-scene--visible", entry.isIntersecting)
        })
      }, { threshold: 0, rootMargin: "-32px 0px -32px 0px" })
      sections.forEach((section) => {
        const bounds = section.getBoundingClientRect()
        section.classList.toggle("scroll-scene--visible", bounds.top < window.innerHeight && bounds.bottom > 0)
        section.classList.add("scroll-scene")
        observer?.observe(section)
      })
    }
    setup()
    preference.addEventListener("change", setup)
    return () => {
      reset()
      preference.removeEventListener("change", setup)
    }
  }, [])

  return null
}
