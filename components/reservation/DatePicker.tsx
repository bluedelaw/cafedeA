"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  bookableDateOptions,
  formatBookableDateLabel,
  formatCivilYmd,
  parseCivilDate,
  restaurantToday,
} from "@/lib/reservation-when"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export default function DatePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (date: string) => void
}) {
  const today = restaurantToday()
  const bookable = useMemo(() => new Set(bookableDateOptions().map((option) => option.date)), [])
  const selected = parseCivilDate(value)
  const [view, setView] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1))
  const [open, setOpen] = useState(false)

  const cells = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const first = new Date(year, month, 1)
    const startPad = first.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const items: Array<{ date: string; day: number; inMonth: boolean }> = []
    for (let i = 0; i < startPad; i += 1) {
      items.push({ date: "", day: 0, inMonth: false })
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      items.push({ date: formatCivilYmd(new Date(year, month, day)), day, inMonth: true })
    }
    return items
  }, [view])

  const monthLabel = view.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  const canPrev = bookableDateOptions().some((option) => {
    const d = parseCivilDate(option.date)
    return d.getFullYear() < view.getFullYear() || (d.getFullYear() === view.getFullYear() && d.getMonth() < view.getMonth())
  })
  const canNext = bookableDateOptions().some((option) => {
    const d = parseCivilDate(option.date)
    return d.getFullYear() > view.getFullYear() || (d.getFullYear() === view.getFullYear() && d.getMonth() > view.getMonth())
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id="reservation-date-trigger"
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-left text-sm text-[#302117]",
            "transition-colors duration-150 hover:border-[#302117] motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2",
          )}
          aria-label={`Date, ${formatBookableDateLabel(value, today)}`}
        >
          <span>{formatBookableDateLabel(value, today)}</span>
          <span className="text-xs text-[#302117]/50">Change</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(20.5rem,calc(100vw-2rem))] rounded-md border-[#302117]/15 bg-[#FFF9F0] p-3 text-[#302117] shadow-sm"
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            disabled={!canPrev}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#302117]/15 disabled:opacity-30"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-sm font-medium">{monthLabel}</p>
          <button
            type="button"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            disabled={!canNext}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#302117]/15 disabled:opacity-30"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#302117]/50">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell, index) => {
            if (!cell.inMonth) return <span key={`pad-${index}`} />
            const enabled = bookable.has(cell.date)
            const isSelected = cell.date === value
            const isToday = cell.date === today
            return (
              <button
                key={cell.date}
                type="button"
                disabled={!enabled}
                onClick={() => {
                  onChange(cell.date)
                  setOpen(false)
                }}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                className={cn(
                  "h-9 rounded-md text-sm transition-colors duration-150 motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F]",
                  !enabled && "text-[#302117]/30",
                  enabled && !isSelected && "hover:bg-[#F7F0E3]",
                  isToday && !isSelected && "ring-1 ring-[#D5A52F]",
                  isSelected && "bg-[#302117] text-white",
                )}
              >
                {cell.day}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
