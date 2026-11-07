const DEFAULT_MAX_BODY_BYTES = 50_000

export class RequestTooLargeError extends Error {
  constructor() {
    super("Request is too large.")
    this.name = "RequestTooLargeError"
  }
}

export class InvalidRequestBodyError extends Error {
  constructor(message = "Invalid request.") {
    super(message)
    this.name = "InvalidRequestBodyError"
  }
}

function contentLengthBytes(header: string | null) {
  if (header === null || header === "") return null
  if (!/^\d+$/.test(header.trim())) throw new InvalidRequestBodyError()
  return Number(header.trim())
}

async function readLimitedBytes(request: Request, maxBytes: number) {
  const declared = contentLengthBytes(request.headers.get("content-length"))
  if (declared !== null && declared > maxBytes) {
    throw new RequestTooLargeError()
  }

  if (!request.body) {
    if (declared === 0) return new Uint8Array()
    throw new InvalidRequestBodyError()
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (!value) continue
    total += value.byteLength
    if (total > maxBytes) {
      try {
        await reader.cancel()
      } catch {
        // Ignore cancel failures; the size error is what we return.
      }
      throw new RequestTooLargeError()
    }
    chunks.push(value)
  }

  if (declared !== null && declared !== total) {
    // Header can lie; the stream length is authoritative. If they claimed a
    // small body then sent more, the cap above already caught it.
  }

  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return bytes
}

export async function readLimitedJson(request: Request, maxBytes = DEFAULT_MAX_BODY_BYTES) {
  const bytes = await readLimitedBytes(request, maxBytes)
  let text: string
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    throw new InvalidRequestBodyError()
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new InvalidRequestBodyError()
  }
}
