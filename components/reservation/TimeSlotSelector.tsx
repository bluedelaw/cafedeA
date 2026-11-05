"use client"

import { cn } from "@/lib/utils"
import { formatSlotLabel, mealPeriod } from "@/lib/reservation-when"

export type SlotOption = {
  time: string
  label: string
  available: boolean
  tableLabel?: string | null
  reason: string | null
}

const PERIODS = ["Morning", "Lunch", "Afternoon", "Dinner"] as const

export default function TimeSlotSelector({
  slots,
  value,
  onChange,
  loading,
  serviceDown,
  empty,
}: {
  slots: SlotOption[]
  value: string
  onChange: (time: string) => void
  loading: boolean
  serviceDown: boolean
  empty: boolean
}) {
  if (loading) {
    return (
      <p className="text-sm text-[#302117]/60" aria-live="polite">
        Looking up open tables…
      </p>
    )
  }

  if (serviceDown) {
    return (
      <p className="text-sm leading-relaxed text-[#302117]/80" role="status">
        Online reservations are temporarily unavailable. Please call us at{" "}
        <a href="tel:6042767800" className="font-medium text-[#302117] underline underline-offset-4">
          (604) 276-7800
        </a>{" "}
        and we’ll be happy to assist.
      </p>
    )
  }

  if (empty) {
    return (
      <p className="text-sm text-[#302117]/70" role="status">
        No open times for this party and date. Try another day, or call{" "}
        <a href="tel:6042767800" className="underline underline-offset-4">
          (604) 276-7800
        </a>
        .
      </p>
    )
  }

  return (
    <div className="space-y-5">
      {PERIODS.map((period) => {
        const group = slots.filter((slot) => mealPeriod(slot.time) === period)
        if (group.length === 0) return null
        return (
          <div key={period}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#302117]/50">{period}</p>
            <div className="flex flex-wrap gap-2">
              {group.map((slot) => {
                const selected = value === slot.time
                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => onChange(slot.time)}
                    aria-pressed={selected}
                    className={cn(
                      "h-11 min-w-[5.5rem] rounded-md border px-3 text-sm font-medium transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2",
                      "motion-reduce:transition-none",
                      selected
                        ? "border-[#302117] bg-[#302117] text-white"
                        : "border-[#302117]/20 bg-[#FFF9F0] text-[#302117] hover:border-[#302117]",
                    )}
                  >
                    {slot.label || formatSlotLabel(slot.time)}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
