type Bucket = { count: number; timestamp: number }

const buckets = new Map<string, Bucket>()
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown"
  return ip.slice(0, 64)
}

export function isRateLimited(key: string, max = MAX_REQUESTS, windowMs = WINDOW_MS) {
  const now = Date.now()
  const record = buckets.get(key)

  if (!record || now - record.timestamp > windowMs) {
    buckets.set(key, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= max) return true
  record.count += 1
  return false
}
