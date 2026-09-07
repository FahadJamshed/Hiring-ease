import nodemailer from "nodemailer"
import { readFile } from "node:fs/promises"
import path from "node:path"

const requests = new Map()
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 16 * 1024

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

function clean(value, maxLength) {
  return String(value ?? "").replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength)
}

function cleanMultiline(value, maxLength) {
  return String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().slice(0, maxLength)
}

function sendJson(response, status, payload) {
  response.statusCode = status
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.end(JSON.stringify(payload))
}

function publicError(response, status = 400) {
  return sendJson(response, status, { success: false, message: status === 429 ? "Please wait a moment before trying again." : "Something went wrong. Please try again." })
}

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body
  let raw = ""
  for await (const chunk of request) {
    raw += chunk
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new Error("payload_too_large")
  }
  try { return JSON.parse(raw || "{}") } catch { throw new Error("invalid_json") }
}

function limit(request) {
  const ip = request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket?.remoteAddress || "unknown"
  const now = Date.now()
  const state = requests.get(ip) || { count: 0, resetAt: now + 60_000 }
  if (now > state.resetAt) { state.count = 0; state.resetAt = now + 60_000 }
  state.count += 1
  requests.set(ip, state)
  return state.count > 5
}

function transporter() {
  const { SMTP_HOST, SMTP_PORT = "587", SMTP_SECURE = "false", SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM_EMAIL || !process.env.CONTACT_RECEIVER) throw new Error("email_not_configured")
  return nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: SMTP_SECURE === "true", auth: { user: SMTP_USER, pass: SMTP_PASSWORD } })
}

function layout(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title></head><body style="margin:0;padding:0;background-color:#f2f7f7;color:#172033;font-family:Inter,Arial,sans-serif">
  <style>
  @media (prefers-color-scheme: dark) {
    .email-logo-header { background-color:#172033 !important; }
    .email-logo-light { display:none !important; }
    .email-logo-dark { display:block !important; max-height:none !important; overflow:visible !important; }
  }
  [data-ogsc] .email-logo-header { background-color:#172033 !important; }
  [data-ogsc] .email-logo-light { display:none !important; }
  [data-ogsc] .email-logo-dark { display:block !important; max-height:none !important; overflow:visible !important; }
  </style>
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escapeHtml(title)} — HiringEase, your connected hiring workspace.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f7f7"><tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="width:100%;max-width:600px;border:1px solid #dfe9e8;border-radius:20px;background-color:#ffffff">
  <tr><td height="5" bgcolor="#00afa8" style="border-radius:20px 20px 0 0;font-size:1px">&nbsp;</td></tr>
  <tr><td class="email-logo-header" align="center" bgcolor="#ffffff" style="padding:32px 24px;background-color:#ffffff;border-bottom:1px solid #e7efee"><img class="email-logo-light" src="cid:hiringease-logo" width="190" height="53" alt="HiringEase" style="display:block;width:190px;height:53px;border:0;background-color:#ffffff">
  <!--[if !mso]><!--><div class="email-logo-dark" style="display:none;max-height:0;overflow:hidden;mso-hide:all"><img src="cid:hiringease-logo-dark" width="190" height="53" alt="HiringEase" style="display:block;width:190px;height:53px;border:0;background-color:#172033"></div><!--<![endif]--></td></tr>
  <tr><td align="center" bgcolor="#effaf8" style="padding:30px 24px;background-color:#effaf8"><p style="margin:0 0 12px;font:700 11px Arial,sans-serif;letter-spacing:2px;color:#008c86">YOUR CONNECTED HIRING WORKSPACE</p><h1 style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:28px;line-height:1.3;font-weight:700;color:#172033">${escapeHtml(title)}</h1></td></tr>
  <tr><td style="padding:24px;font-size:15px;line-height:1.7;color:#475467;overflow-wrap:anywhere">${body}</td></tr>
  <tr><td style="padding:24px;border-top:1px solid #e7efee;color:#667085;font-size:12px;line-height:1.7"><strong style="color:#172033">HiringEase Team</strong><br>Make hiring feel easy.<br><span style="color:#98a2b3">HiringEase ATS 2.0 · Sent in response to your website request.</span></td></tr>
  </table></td></tr></table></body></html>`
}

function details(items) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dfe9e8;border-radius:12px;width:100%;font-size:14px;background-color:#f7faf9">${items.map(([label, value]) => `<tr><th align="left" valign="top" style="padding:12px;border-bottom:1px solid #e7efee;color:#667085;width:35%;font-weight:400">${escapeHtml(label)}</th><td valign="top" style="padding:12px;border-bottom:1px solid #e7efee;color:#172033;font-weight:600;white-space:pre-wrap;word-break:break-word">${escapeHtml(value)}</td></tr>`).join("")}</table>`
}

async function deliver(messages) {
  const client = transporter()
  const logo = await readFile(path.join(process.cwd(), "src/imports/email-logo-light.png"))
  const darkLogo = await readFile(path.join(process.cwd(), "src/imports/email-logo-dark.png"))
  const results = await Promise.all(messages.map((message) => client.sendMail({ from: { name: process.env.SMTP_FROM_NAME || "HiringEase", address: process.env.SMTP_FROM_EMAIL }, ...message, attachments: [{ filename: "hiringease.png", content: logo, contentType: "image/png", cid: "hiringease-logo", contentDisposition: "inline" }, { filename: "hiringease-dark.png", content: darkLogo, contentType: "image/png", cid: "hiringease-logo-dark", contentDisposition: "inline" }] })))
  for (const result of results) {
    console.info("email_accepted", { messageId: result.messageId, accepted: result.accepted?.length ?? 0, rejected: result.rejected?.length ?? 0, response: result.response })
  }
}

export async function handleContact(request, response) {
  if (request.method !== "POST") return sendJson(response, 405, { success: false, message: "Method not allowed." })
  if (limit(request)) return publicError(response, 429)
  try {
    const payload = await readBody(request)
    if (payload.website) return sendJson(response, 200, { success: true, message: "Thanks! Your message has been sent successfully." })
    const firstName = clean(payload.firstName, 80), lastName = clean(payload.lastName, 80), email = clean(payload.email, 254), company = clean(payload.company, 160), teamSize = clean(payload.teamSize, 60), message = cleanMultiline(payload.message, 4000)
    if (!firstName || !lastName || !EMAIL.test(email) || !company || !teamSize || !message) return publicError(response)
    const submitted = new Date().toISOString()
    const rows = [["Name", `${firstName} ${lastName}`], ["Email", email], ["Company", company], ["Team size", teamSize], ["Message", message], ["Submitted", submitted], ["Source", "Website Contact Form"]]
    await deliver([{
      to: process.env.CONTACT_RECEIVER, replyTo: email, subject: `New Contact Request — ${company}`,
      text: `Contact Request\n\n${rows.map(([key, value]) => `${key}: ${value}`).join("\n")}`,
      html: layout("New Contact Request", details(rows)),
    }, {
      to: email, subject: "Thanks for contacting HiringEase",
      text: `Hi ${firstName},\n\nThanks for reaching out to HiringEase. We've received your request and our team will review your requirements and get back to you shortly.\n\nYour request:\nCompany: ${company}\nTeam size: ${teamSize}\n\nWe'll be in touch soon.\n\nHiringEase Team`,
      html: layout("Thanks for contacting HiringEase", `<p>Hi ${escapeHtml(firstName)},</p><p>Thanks for reaching out to HiringEase. We’ve received your request and our team will review your requirements and get back to you shortly.</p><div style="margin:24px 0;padding:16px;background:#f5f8f8;border-radius:12px"><strong>Your request</strong><br><span style="color:#667085">Company:</span> ${escapeHtml(company)}<br><span style="color:#667085">Team size:</span> ${escapeHtml(teamSize)}</div><p>We’ll be in touch soon.</p><p>HiringEase Team</p>`),
    }])
    return sendJson(response, 200, { success: true, message: "Thanks! Your message has been sent successfully." })
  } catch (error) {
    console.error("contact_email_failed", { reason: error instanceof Error ? error.message : "unknown" })
    return publicError(response, 500)
  }
}

export async function handleDemoBooking(request, response) {
  if (request.method !== "POST") return sendJson(response, 405, { success: false, message: "Method not allowed." })
  if (limit(request)) return publicError(response, 429)
  try {
    const payload = await readBody(request)
    if (payload.website) return sendJson(response, 200, { success: true, message: "Your demo has been booked successfully." })
    const contactName = clean(payload.contactName, 160), email = clean(payload.email, 254), companyName = clean(payload.companyName, 160), website = clean(payload.companyWebsite, 250), companySize = clean(payload.companySize, 80), hiringVolume = clean(payload.monthlyHiringVolume, 80), peopleJoining = clean(payload.peopleJoining, 20), scheduledDate = clean(payload.scheduledDate, 80), scheduledTime = clean(payload.scheduledTime, 40), timezone = clean(payload.timezone, 120), requirements = cleanMultiline(payload.requirements, 4000)
    const attendees = String(payload.additionalAttendeeEmails || "").split(",").map((item) => clean(item, 254)).filter(Boolean)
    if (!contactName || !EMAIL.test(email) || !companyName || !companySize || !hiringVolume || !peopleJoining || !scheduledDate || !scheduledTime || !timezone || !requirements || attendees.some((item) => !EMAIL.test(item))) return publicError(response)
    const submitted = new Date().toISOString()
    const rows = [["Contact", contactName], ["Work email", email], ["Company", companyName], ["Website", website || "Not provided"], ["Company size", companySize], ["Monthly hiring volume", hiringVolume], ["Number of attendees", peopleJoining], ["Additional attendees", attendees.join(", ") || "None"], ["Requested demo date", scheduledDate], ["Requested demo time", scheduledTime], ["Time zone", timezone], ["What they want to see", requirements], ["Submitted", submitted], ["Source", "Website Book Demo"]]
    const firstName = contactName.split(" ")[0]
    await deliver([{
      to: process.env.CONTACT_RECEIVER, replyTo: email, subject: `New Demo Booking — ${companyName}`,
      text: `New Demo Booking\n\n${rows.map(([key, value]) => `${key}: ${value}`).join("\n")}`,
      html: layout("New Demo Booking", details(rows)),
    }, {
      to: email, subject: "Your Demo Is Booked",
      text: `Hi ${firstName},\n\nThank you for booking a HiringEase demo.\n\nYour booking details:\nDate: ${scheduledDate}\nTime: ${scheduledTime}\nTime zone: ${timezone}\nDuration: 30 minutes\nCompany: ${companyName}\nAdditional attendees: ${attendees.join(", ") || "None"}\n\nWe’ll tailor the walkthrough around your hiring workflow.\n\nWhat we’ll cover:\n- Candidate and pipeline management\n- AI-powered CV parsing and scoring\n- Hiring workflows and interview scheduling\n- Email integrations, administration, and security\n\nWhat happens next:\n- Check your inbox for further scheduling updates\n- Invite any additional team members\n- Bring your current hiring workflow questions\n\nHiringEase Team`,
      html: layout("Thank you for booking a demo.", `<p>Hi ${escapeHtml(firstName)},</p><p>Your HiringEase demo is booked. We’ll tailor the walkthrough around your hiring workflow.</p><h2 style="font-size:16px">Your booking details</h2>${details([["Date", scheduledDate], ["Time", scheduledTime], ["Time zone", timezone], ["Duration", "30 minutes"], ["Company", companyName], ["Additional attendees", attendees.join(", ") || "None"]])}<h2 style="font-size:16px;margin-top:24px">What we’ll cover</h2><ul><li>Candidate and pipeline management</li><li>AI-powered CV parsing and scoring</li><li>Hiring workflows and interview scheduling</li><li>Email integrations, administration, and security</li></ul><h2 style="font-size:16px">What happens next</h2><ul><li>Check your inbox for further scheduling updates</li><li>Invite any additional team members</li><li>Bring your current hiring workflow questions</li></ul>`),
    }])
    return sendJson(response, 200, { success: true, message: "Your demo has been booked successfully." })
  } catch (error) {
    console.error("demo_email_failed", { reason: error instanceof Error ? error.message : "unknown" })
    return publicError(response, 500)
  }
}
