"use client"

import { formatBookableDateLabel, formatSlotLabel, restaurantToday } from "@/lib/reservation-when"

export default function ReservationSummary({
  partySize,
  date,
  time,
  name,
  largeParty,
}: {
  partySize: string
  date: string
  time: string
  name: string
  largeParty: boolean
}) {
  const rows = [
    { label: "Party", value: `${partySize} ${Number(partySize) === 1 ? "guest" : "guests"}` },
    { label: "Date", value: formatBookableDateLabel(date, restaurantToday()) },
    { label: "Time", value: time ? formatSlotLabel(time) : "Pick a time" },
    ...(name.trim() ? [{ label: "Name", value: name.trim() }] : []),
  ]

  return (
    <aside className="rounded-md border border-[#302117]/15 bg-[#FFF9F0] p-5">
      <h2 className="font-tempus text-2xl text-[#302117]">Your booking</h2>
      <dl className="mt-4 space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
            <dt className="text-[#302117]/55">{row.label}</dt>
            <dd className="text-right font-medium text-[#302117]">{row.value}</dd>
          </div>
        ))}
      </dl>
      {largeParty ? (
        <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">
          Parties of 7 or more are a request. We’ll text you if we can seat everyone.
        </p>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">We’ll text a confirmation to your phone.</p>
      )}
    </aside>
  )
}
