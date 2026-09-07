type ApiResult = { success: boolean; message: string }

async function post(path: string, payload: Record<string, string>): Promise<ApiResult> {
  try {
    const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    const data = await response.json() as ApiResult
    return response.ok && data.success ? data : { success: false, message: data.message || "Something went wrong. Please try again." }
  } catch {
    return { success: false, message: "Something went wrong. Please try again." }
  }
}

export const submitContact = (payload: Record<string, string>) => post("/api/contact", payload)
export const submitDemoBooking = (payload: Record<string, string>) => post("/api/book-demo", payload)
