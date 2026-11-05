import { NextResponse } from "next/server"
import { fetchWaitlistSlots, waitlistReservationConfigured } from "@/lib/waitlist-reservation"

export async function GET(request: Request) {
  try {
    if (!waitlistReservationConfigured()) {
      return NextResponse.json(
        { error: "Online reservations are temporarily unavailable. Please call us at (604) 276-7800." },
        { status: 503 },
      )
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date") || ""
    const partySize = Number(searchParams.get("partySize") || "2")
    const data = await fetchWaitlistSlots(date, partySize)
    return NextResponse.json(data)
  } catch (error) {
    const raw = error instanceof Error ? error.message : ""
    const message = /not configured|reservation service/i.test(raw)
      ? "Online reservations are temporarily unavailable. Please call us at (604) 276-7800."
      : raw || "Could not load available times"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
