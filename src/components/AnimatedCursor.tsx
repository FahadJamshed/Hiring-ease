import { useEffect, useRef } from "react"

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    let frame = 0
    let x = 0
    let y = 0
    let ringX = 0
    let ringY = 0
    let visible = false

    const hide = () => {
      visible = false
      cursor.dataset.visible = "false"
      cursor.dataset.pressed = "false"
      document.documentElement.classList.remove("custom-cursor-active")
      cancelAnimationFrame(frame)
      frame = 0
    }
    const animate = () => {
      ringX += (x - ringX) * 0.22
      ringY += (y - ringY) * 0.22
      cursor.style.setProperty("--ring-x", `${ringX}px`)
      cursor.style.setProperty("--ring-y", `${ringY}px`)
      if (Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1) {
        frame = requestAnimationFrame(animate)
      } else {
        frame = 0
      }
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return hide()
      const target = event.target instanceof Element ? event.target : null
      // Preserve the native caret and browser controls where people enter text.
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe')) return hide()
      x = event.clientX
      y = event.clientY
      if (!visible) { ringX = x; ringY = y }
      visible = true
      cursor.dataset.visible = "true"
      cursor.dataset.hover = String(Boolean(target?.closest('a, button:not(:disabled), [role="button"], summary, label[for]')))
      cursor.style.setProperty("--cursor-x", `${x}px`)
      cursor.style.setProperty("--cursor-y", `${y}px`)
      document.documentElement.classList.add("custom-cursor-active")
      if (!frame) animate()
    }
    const down = () => { cursor.dataset.pressed = "true" }
    const up = () => { cursor.dataset.pressed = "false" }
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") hide() }
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerdown", down)
    window.addEventListener("pointerup", up)
    window.addEventListener("blur", hide)
    window.addEventListener("keydown", keyboard)
    document.documentElement.addEventListener("pointerleave", hide)
    media.addEventListener("change", hide)
    return () => {
      hide()
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("blur", hide)
      window.removeEventListener("keydown", keyboard)
      document.documentElement.removeEventListener("pointerleave", hide)
      media.removeEventListener("change", hide)
    }
  }, [])

  return (
    <div ref={cursorRef} className="animated-cursor" aria-hidden="true">
      <div className="animated-cursor__ring"><span /></div>
      <div className="animated-cursor__dot" />
    </div>
  )
}
