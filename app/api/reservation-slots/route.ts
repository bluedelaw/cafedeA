import { NextResponse } from "next/server"
import { fetchWaitlistSlots, waitlistReservationConfigured } from "@/lib/waitlist-reservation"
import { isBookableDate, slotQuerySchema } from "@/lib/contact-schema"
import { clientKey, isRateLimited } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    if (await isRateLimited(`slots:${clientKey(request)}`, 60, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } },
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

    if (!waitlistReservationConfigured()) {
      return NextResponse.json(
        { error: "Online reservations are temporarily unavailable. Please call us at (604) 276-7800." },
        { status: 503 },
      )
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
