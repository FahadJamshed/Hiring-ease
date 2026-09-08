import test from 'node:test'
import assert from 'node:assert/strict'
import nodemailer from 'nodemailer'
import { handleContact, handleDemoBooking } from '../api/lib/email.js'

const createTransport = nodemailer.createTransport.bind(nodemailer)

for (const kind of ['contact', 'demo']) {
test(`${kind} sends both emails and never hides failures`, async (t) => {
  for (const [key, value] of Object.entries({ SMTP_HOST: 'smtp.example.com', SMTP_USER: 'test', SMTP_PASSWORD: 'test', SMTP_FROM_EMAIL: 'hello@example.com', CONTACT_RECEIVER: 'fahad.jamshaid@novatoresols.com' })) {
    const original = process.env[key]
    process.env[key] = value
    t.after(() => { if (original === undefined) delete process.env[key]; else process.env[key] = original })
  }
  const sent = []
  let failure = false
  let rejected = false
  let failClientOnly = false
  t.mock.method(nodemailer, 'createTransport', () => ({
    async sendMail(message) {
      if (failure) throw new Error('smtp_unavailable')
      if (failClientOnly && message.to === 'alex@example.com') throw new Error('client_send_failed')
      sent.push(message)
      return { accepted: rejected ? [] : [message.to], rejected: rejected ? [message.to] : [] }
    },
  }))
  const payload = kind === 'contact'
    ? { firstName: 'Alex', lastName: 'Morgan', email: 'alex@example.com', company: 'Example', teamSize: '1–10', message: 'Please share details.', contactFax: '' }
    : { contactName: 'Alex Morgan', email: 'alex@example.com', companyName: 'Example', companyWebsite: 'https://example.com', companySize: '1–10', monthlyHiringVolume: '1–5', peopleJoining: '1', scheduledDate: '2026-10-01', scheduledTime: '10:00 AM', timezone: 'Asia/Karachi', requirements: 'Show the hiring workflow.', website: '' }
  let requestId = 0
  async function call(extra = {}) {
    const response = { setHeader() {}, end(raw) { this.body = JSON.parse(raw) } }
    await (kind === 'contact' ? handleContact : handleDemoBooking)({ method: 'POST', headers: { 'x-forwarded-for': `test-${kind}-${requestId++}` }, body: { ...payload, ...extra } }, response)
    return response
  }
  for (const extra of kind === 'contact' ? [{}, { website: 'https://autofilled.example.com' }] : [{}]) {
    sent.length = 0
    const response = await call(extra)
    assert.equal(response.statusCode, 200)
    assert.equal(response.body.success, true)
    assert.deepEqual(sent.map(message => message.to), ['fahad.jamshaid@novatoresols.com', 'alex@example.com'])
    assert.equal(sent[0].replyTo, payload.email)
    const ids = new Set()
    for (const message of sent) {
      const compiled = await createTransport({ streamTransport: true, buffer: true }).sendMail(message)
      const mime = compiled.message.toString()
      assert.match(mime, /Content-Type: multipart\/related;/)
      for (const attachment of message.attachments) {
        assert.match(attachment.cid, /^logo-(light|dark)\.[a-f0-9-]+@example\.com$/)
        assert.equal(ids.has(attachment.cid), false)
        ids.add(attachment.cid)
        assert.ok(message.html.includes(`src="cid:${attachment.cid}"`))
        assert.ok(mime.includes(`Content-ID: <${attachment.cid}>`))
        assert.equal(attachment.content.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      }
      assert.match(mime, /Content-Disposition: inline;/)
    }
  }
  sent.length = 0
  assert.equal((await call(kind === 'contact' ? { contactFax: 'spam' } : { website: 'spam' })).body.success, false)
  assert.equal(sent.length, 0)
  assert.equal((await call({ email: 'invalid' })).statusCode, 400)
  failure = true
  assert.equal((await call()).body.success, false)
  failure = false
  rejected = true
  assert.equal((await call()).body.success, false)
  rejected = false
  failClientOnly = true
  sent.length = 0
  assert.equal((await call()).body.success, false)
  assert.deepEqual(sent.map(message => message.to), ['fahad.jamshaid@novatoresols.com'])
})
}
