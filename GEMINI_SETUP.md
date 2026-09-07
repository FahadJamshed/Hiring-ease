# HiringEase website chat

The widget calls `/api/chat`, which sends website knowledge and the last five conversation turns to Gemini. This uses context, not model training. Shared FAQs live in `src/data/hiringease-faqs.js`; additional product facts and assistant instructions live in `api/lib/hiringease-knowledge.js`. Update these when website facts change.

## Enable replies

1. Create an API key at https://aistudio.google.com/api-keys using a project on the **Free tier**, without enabling billing.
2. Add `GEMINI_API_KEY=your_key` to `.env.local`. Never prefix it with `VITE_` or put it in frontend source. The default model is `gemini-3.1-flash-lite`; optionally set `GEMINI_MODEL` to another model with free-tier access in your project.
3. Restart the local Vite process if environment changes have not been picked up. In Vercel, set these server environment variables and redeploy. The included `api/chat.js` is the production function; static-only hosting cannot run it. Vite development and preview also serve this endpoint.
4. Open Help → Chat with AI and ask about email providers, plans, or booking a demo. Check an unknown topic such as refunds: the assistant should refer visitors to the team instead of inventing a policy.

The API key's Google project controls billing: code cannot force a paid project's requests onto a free tier. Free quotas vary by project/model and can change. This implementation does not enable billing, purchase services, or automatically switch providers. It limits history, message size, output length, and requests per running server instance; the in-memory cap is not a deployment-wide quota. Configure hosting-level rate limits if needed for public traffic.

Google's free-tier pricing states that content can be used to improve its products. This assistant is for public website questions, not candidate records. The widget discloses Gemini processing and asks visitors not to share personal or candidate data.

References: https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/api/generate-content

Validation: `npm run build` and `node --test tests/chat.test.js`. Tests mock Gemini; a live response requires the configured key and available free quota.
