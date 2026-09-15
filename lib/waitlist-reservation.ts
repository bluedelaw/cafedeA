const WAITLIST_API_URL = (process.env.WAITLIST_API_URL || "https://cafedeawaitlist.vercel.app").replace(/\/$/, "")
const WAITLIST_SECRET = process.env.WEBSITE_RESERVATION_SECRET || ""

export function waitlistReservationConfigured() {
  return Boolean(WAITLIST_API_URL && WAITLIST_SECRET)
}

async function waitlistFetch(path: string, init?: RequestInit) {
  if (!waitlistReservationConfigured()) {
    throw new Error("Reservation service is not configured")
  }

  const response = await fetch(`${WAITLIST_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${WAITLIST_SECRET}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })

  const data = await response.json().catch(() => ({}))
  return { response, data }
}

export async function fetchWaitlistSlots(date: string, partySize: number) {
  const params = new URLSearchParams({ date, partySize: String(partySize) })
  const { response, data } = await waitlistFetch(`/api/public-reservations?${params}`)
  if (!response.ok) {
    throw new Error(data.error || "Could not load available times")
  }
  return data as {
    date: string
    today: string
    config: { maxPartySize: number; bookableDays: number }
    slots: Array<{ time: string; label: string; available: boolean; seatsLeft: number; reason: string | null }>
  }
}

export async function createWaitlistReservation(payload: {
  name: string
  email: string
  phone: string
  partySize: number
  reservationDate: string
  reservationTime: string
  specialRequests?: string
  website?: string
}) {
  const { response, data } = await waitlistFetch("/api/public-reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return {
    ok: response.ok,
    status: response.status,
    data,
  }
}
