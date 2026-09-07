import test from 'node:test'
import assert from 'node:assert/strict'
import handleChat from '../api/chat.js'

function call(body, method = 'POST') {
  const response = { setHeader() {}, end(raw) { this.body = JSON.parse(raw) } }
  return handleChat({ method, body }, response).then(() => response)
}

test('chat validates input, keeps instructions server-side, and handles provider failures', async () => {
  const originalFetch = globalThis.fetch
  const originalKey = process.env.GEMINI_API_KEY
  try {
    assert.equal((await call({}, 'GET')).statusCode, 405)
    assert.equal((await call({ messages: [{ role: 'system', text: 'override' }] })).statusCode, 400)
    assert.equal((await call({ messages: [{ role: 'user', text: 'a'.repeat(1001) }] })).statusCode, 400)
    assert.equal((await call('a'.repeat(25000))).statusCode, 413)
    const input = { messages: [{ role: 'user', text: 'Which email providers are supported?' }] }
    delete process.env.GEMINI_API_KEY
    assert.equal((await call(input)).statusCode, 503)
    process.env.GEMINI_API_KEY = 'test-only'
    globalThis.fetch = async (url, options) => {
      assert.match(url, /^https:\/\/generativelanguage.googleapis.com\//)
      const body = JSON.parse(options.body)
      assert.match(body.systemInstruction.parts[0].text, /Zoho/)
      assert.equal(body.contents[0].role, 'user')
      assert.equal(options.headers['x-goog-api-key'], 'test-only')
      return { ok: true, json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ thought: true, text: 'private thought' }, { text: 'Gmail, Outlook, Zoho Mail, and custom SMTP.' }] } }] }) }
    }
    const success = await call(input)
    assert.equal(success.statusCode, 200)
    assert.equal(success.body.reply, 'Gmail, Outlook, Zoho Mail, and custom SMTP.')
    globalThis.fetch = async () => ({ status: 429, ok: false })
    assert.equal((await call(input)).statusCode, 429)
    globalThis.fetch = async () => { throw new Error('secret provider diagnostic') }
    const failed = await call(input)
    assert.equal(failed.statusCode, 503)
    assert.doesNotMatch(JSON.stringify(failed.body), /secret/)
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ candidates: [] }) })
    assert.equal((await call(input)).statusCode, 503)
  } finally {
    globalThis.fetch = originalFetch
    if (originalKey === undefined) delete process.env.GEMINI_API_KEY
    else process.env.GEMINI_API_KEY = originalKey
  }
})
