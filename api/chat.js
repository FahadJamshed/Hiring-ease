import { systemInstruction } from "./lib/hiringease-knowledge.js"

const MAX_BYTES = 24 * 1024
let windowStart = 0
let requestCount = 0

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify(payload))
}

export default async function handleChat(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return json(res, 405, { error: "Method not allowed." })
  }
  let body
  try {
    if (req.body !== undefined) {
      const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body)
      if (Buffer.byteLength(raw) > MAX_BYTES) return json(res, 413, { error: "Message is too long." })
      body = JSON.parse(raw)
    } else {
      const chunks = []
      let size = 0
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk)
        if (size > MAX_BYTES) return json(res, 413, { error: "Message is too long." })
        chunks.push(Buffer.from(chunk))
      }
      body = JSON.parse(Buffer.concat(chunks).toString())
    }
  } catch {
    return json(res, 400, { error: "Please send a valid message." })
  }
  const messages = body?.messages
  if (!Array.isArray(messages) || !messages.length || messages.length > 12 ||
    messages.some((m, i) => !m || m.role !== (i % 2 === 0 ? "user" : "assistant") || typeof m.text !== "string" || !m.text.trim() || m.text.length > (m.role === "user" ? 1000 : 6000)) ||
    messages.at(-1).role !== "user") {
    return json(res, 400, { error: "Please send a question of up to 1,000 characters." })
  }
  if (!process.env.GEMINI_API_KEY) return json(res, 503, { error: "AI chat isn't available yet. Please contact our team for help." })
  // A per-instance cap reduces accidental bursts; Google's free-tier quota is authoritative.
  if (Date.now() - windowStart >= 60_000) { windowStart = Date.now(); requestCount = 0 }
  if (++requestCount > 5) {
    res.setHeader("Retry-After", "60")
    return json(res, 429, { error: "Chat is busy. Please try again in a minute or contact our team." })
  }
  try {
    const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite"
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: messages.map(({ role, text }) => ({ role: role === "assistant" ? "model" : "user", parts: [{ text }] })),
        generationConfig: { temperature: 0.2, maxOutputTokens: 800 },
      }),
    })
    if (upstream.status === 429) return json(res, 429, { error: "AI chat has reached its usage limit. Please try later or contact our team." })
    if (!upstream.ok) throw new Error("provider_unavailable")
    const data = await upstream.json()
    const candidate = data.candidates?.[0]
    const reply = candidate?.content?.parts?.filter((part) => !part.thought && typeof part.text === "string").map((part) => part.text).join("").trim()
    if (!reply || candidate.finishReason !== "STOP") throw new Error("no_complete_reply")
    return json(res, 200, { reply })
  } catch {
    return json(res, 503, { error: "AI chat is temporarily unavailable. Please try again or contact our team." })
  }
}
