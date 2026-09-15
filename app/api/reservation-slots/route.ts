import { NextResponse } from "next/server"
import { fetchWaitlistSlots, waitlistReservationConfigured } from "@/lib/waitlist-reservation"

export async function GET(request: Request) {
  try {
    if (!waitlistReservationConfigured()) {
      return NextResponse.json({ error: "Reservation service is not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || ""
    const partySize = Number(searchParams.get("partySize") || "2")
    const data = await fetchWaitlistSlots(date, partySize)
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load available times"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
