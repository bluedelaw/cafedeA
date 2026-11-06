"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { featuredSpecials, type FeaturedSpecial } from "@/lib/specials"

interface FeaturedSpecialsProps {
  variant?: "showcase" | "banner"
  onViewAll?: () => void
}

export default function FeaturedSpecials({ variant = "showcase", onViewAll }: FeaturedSpecialsProps) {
  const [selectedPoster, setSelectedPoster] = useState<FeaturedSpecial | null>(null)

  if (variant === "banner") {
    return (
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-chinese text-sm text-[#e8c9b8]">最新推介</p>
            <h2 className="font-tempus text-2xl text-[#f2ead9] sm:text-3xl">This week</h2>
          </div>
          {onViewAll ? (
            <button
              type="button"
              onClick={onViewAll}
              className="text-sm font-semibold text-[#f2ead9] underline underline-offset-4"
            >
              All specials
            </button>
          ) : (
            <Link href="/menu?section=specials" className="text-sm font-semibold text-[#f2ead9] underline underline-offset-4">
              All specials
            </Link>
          )}
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {featuredSpecials.map((special) => (
            <button
              key={special.id}
              type="button"
              onClick={() => setSelectedPoster(special)}
              className="w-40 shrink-0 text-left sm:w-48"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-[#f2ead9]/30 bg-white">
                <Image src={special.image} alt={special.alt} fill className="object-cover" sizes="192px" />
              </div>
              <p className="mt-2 font-chinese text-sm text-[#f2ead9]">{special.chineseTitle}</p>
              <p className="text-xs text-[#f2ead9]/65">{special.title}</p>
            </button>
          ))}
        </div>

        <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
      </section>
    )
  }

  return (
    <section className="border-b border-espresso/15 bg-paper py-14 text-espresso md:py-16">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-chinese text-sm text-burgundy">本月特介</p>
            <h2 className="font-tempus text-3xl sm:text-4xl">On the wall this month</h2>
          </div>
          <Link href="/menu?section=specials" className="text-sm font-semibold underline underline-offset-4">
            Menu
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible">
          {featuredSpecials.map((special) => (
            <button
              key={special.id}
              type="button"
              onClick={() => setSelectedPoster(special)}
              className="w-40 shrink-0 text-left md:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-espresso/20 bg-white">
                <Image
                  src={special.image}
                  alt={special.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 20vw"
                />
              </div>
              <p className="mt-2 font-chinese text-sm">{special.chineseTitle}</p>
              <p className="text-xs text-espresso/65">{special.title}</p>
            </button>
          ))}
        </div>
      </div>

      <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
    </section>
  )
}

function PosterModal({
  poster,
  onClose,
}: {
  poster: FeaturedSpecial | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!poster) return
    previousFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab") return
      const dialog = document.getElementById("poster-dialog")
      const focusable = dialog?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])")
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
      previousFocus.current?.focus()
    }
  }, [poster, onClose])

  if (!poster) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        id="poster-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="poster-title"
        className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-[102] -translate-y-full p-2 text-white sm:right-[-2.5rem] sm:top-0 sm:translate-y-0"
          aria-label="Close poster"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="absolute left-0 top-0 z-[102] -translate-y-full pb-2 text-white sm:left-0 sm:top-auto sm:bottom-full">
          <p id="poster-title" className="font-chinese text-sm">
            {poster.chineseTitle}
          </p>
          <p className="text-xs opacity-80">{poster.title}</p>
        </div>
        <Image
          src={poster.image}
          alt={poster.alt}
          width={1200}
          height={1600}
          className="max-h-[86vh] max-w-[92vw] object-contain"
          sizes="92vw"
          priority
        />
      </div>
    </div>
  )
}
