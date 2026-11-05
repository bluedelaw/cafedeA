"use client"

import { cn } from "@/lib/utils"

const SIZES = Array.from({ length: 12 }, (_, index) => String(index + 1))

export default function PartySizeSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (size: string) => void
}) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:max-w-md">
      {SIZES.map((size) => {
        const selected = value === size
        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={selected}
            className={cn(
              "h-12 rounded-md border text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2",
              "motion-reduce:transition-none",
              selected
                ? "border-[#302117] bg-[#302117] text-white"
                : "border-[#302117]/20 bg-[#FFF9F0] text-[#302117] hover:border-[#302117]",
            )}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}
