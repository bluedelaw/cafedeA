import { NextResponse } from "next/server"
import { fetchWaitlistSlots, waitlistReservationConfigured } from "@/lib/waitlist-reservation"
import { isBookableDate, slotQuerySchema } from "@/lib/contact-schema"

export async function GET(request: Request) {
  try {
    if (!waitlistReservationConfigured()) {
      return NextResponse.json(
        { error: "Online reservations are temporarily unavailable. Please call us at (604) 276-7800." },
        { status: 503 },
      )
    }

    const { searchParams } = new URL(request.url)
    const parsed = slotQuerySchema.safeParse({
      date: searchParams.get("date") || "",
      partySize: searchParams.get("partySize") || "2",
    })

    if (!parsed.success || !isBookableDate(parsed.data.date)) {
      return NextResponse.json({ error: "Please choose a valid date and party size." }, { status: 400 })
    }

    const data = await fetchWaitlistSlots(parsed.data.date, parsed.data.partySize)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Could not load available times. Please call us at (604) 276-7800." },
      { status: 502 },
    )
  }
}
