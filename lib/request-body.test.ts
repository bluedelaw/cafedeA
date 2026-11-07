import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { InvalidRequestBodyError, RequestTooLargeError, readLimitedJson } from "./request-body"
import { clientKey } from "./rate-limit"

function jsonRequest(body: string, headers: Record<string, string> = {}) {
  return new Request("https://www.cafedea.ca/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  })
}

describe("readLimitedJson", () => {
  it("parses a small JSON object", async () => {
    const data = await readLimitedJson(jsonRequest(JSON.stringify({ hello: "world" }), { "content-length": "17" }))
    assert.deepEqual(data, { hello: "world" })
  })

  it("rejects oversized Content-Length before reading", async () => {
    await assert.rejects(
      () => readLimitedJson(jsonRequest("{}", { "content-length": "50001" }), 50_000),
      RequestTooLargeError,
    )
  })

  it("rejects an invalid Content-Length header", async () => {
    await assert.rejects(() => readLimitedJson(jsonRequest("{}", { "content-length": "nope" })), InvalidRequestBodyError)
  })

  it("rejects a stream that exceeds the cap even without Content-Length", async () => {
    const body = "x".repeat(80)
    await assert.rejects(() => readLimitedJson(jsonRequest(body), 40), RequestTooLargeError)
  })

  it("rejects malformed JSON", async () => {
    await assert.rejects(() => readLimitedJson(jsonRequest("{not json")), InvalidRequestBodyError)
  })
})

describe("clientKey", () => {
  it("prefers the Vercel forwarded header over spoofable hops", () => {
    const request = new Request("https://www.cafedea.ca/api/contact", {
      headers: {
        "x-forwarded-for": "1.2.3.4, 10.0.0.1",
        "x-vercel-forwarded-for": "203.0.113.9",
        "x-real-ip": "198.51.100.2",
      },
    })
    assert.equal(clientKey(request), "203.0.113.9")
  })

  it("ignores non-IP header values", () => {
    const request = new Request("https://www.cafedea.ca/api/contact", {
      headers: { "x-forwarded-for": "evil.example, 8.8.8.8" },
    })
    assert.equal(clientKey(request), "8.8.8.8")
  })
})
