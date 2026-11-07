/**
 * Rate limiting for public POST/GET APIs.
 *
 * Default: in-memory Map on this isolate. That is best-effort only on Vercel
 * serverless (each instance has its own map; counts reset on cold start).
 * Do not treat it as global production rate limiting.
 *
 * Shared store (optional, no extra npm package): if Vercel KV / Upstash REST
 * env vars are set, counters are stored there with INCR + EXPIRE.
 *   KV_REST_API_URL + KV_REST_API_TOKEN
 *   or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *
 * Next step if abuse continues: Vercel WAF / firewall rate rules, or owner
 * approval to provision KV.
 */

type Bucket = { count: number; timestamp: number }

const buckets = new Map<string, Bucket>()
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5
const IP_MAX_LEN = 64

const KV_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "")
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ""

export function hasSharedRateLimitStore() {
  return Boolean(KV_URL && KV_TOKEN)
}

function headerHops(value: string | null) {
  if (!value) return []
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
}

function looksLikeIp(value: string) {
  if (!value || value.length > IP_MAX_LEN) return false
  if (value === "unknown" || value === "localhost") return false
  // IPv4 or IPv6 (compressed). Reject header injection / hostnames.
  return /^[\d.a-fA-F:]+$/.test(value)
}

/**
 * Prefer platform-set headers. On Vercel, x-vercel-forwarded-for is not
 * taken from the inbound request. x-forwarded-for is also overwritten, but
 * we still take only the first hop and ignore junk.
 */
export function clientKey(request: Request) {
  const candidates = [
    ...headerHops(request.headers.get("x-vercel-forwarded-for")),
    ...headerHops(request.headers.get("x-real-ip")),
    ...headerHops(request.headers.get("x-forwarded-for")),
  ]
  const ip = candidates.find(looksLikeIp) || "unknown"
  return ip.slice(0, IP_MAX_LEN)
}

function memoryLimited(key: string, max: number, windowMs: number) {
  const now = Date.now()
  if (buckets.size > 5000) {
    buckets.forEach((record, entryKey) => {
      if (now - record.timestamp > windowMs) buckets.delete(entryKey)
    })
  }

  const record = buckets.get(key)
  if (!record || now - record.timestamp > windowMs) {
    buckets.set(key, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= max) return true
  record.count += 1
  return false
}

async function redisLimited(key: string, max: number, windowMs: number) {
  const ttlSeconds = Math.max(1, Math.ceil(windowMs / 1000))
  const response = await fetch(`${KV_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(ttlSeconds), "NX"],
    ]),
    cache: "no-store",
  })

  if (!response.ok) throw new Error("rate-limit store unavailable")
  const data = (await response.json()) as Array<{ result?: number | string | null }>
  const count = Number(data?.[0]?.result)
  if (!Number.isFinite(count)) throw new Error("rate-limit store unavailable")
  return count > max
}

export async function isRateLimited(key: string, max = MAX_REQUESTS, windowMs = WINDOW_MS) {
  const namespaced = `rl:${key}`
  if (hasSharedRateLimitStore()) {
    try {
      return await redisLimited(namespaced, max, windowMs)
    } catch {
      // Fall back to isolate memory rather than failing open with no cap.
    }
  }
  return memoryLimited(namespaced, max, windowMs)
}
