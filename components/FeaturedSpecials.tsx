"use client"

import { useState } from "react"
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
                <Image
                  src={special.image}
                  alt={special.alt}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
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
    <section className="border-b border-[#1c1410]/15 bg-[#f2ead9] py-14 text-[#1c1410] md:py-16">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-chinese text-sm text-[#c41e3a]">本月特介</p>
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
              <div className="relative aspect-[3/4] overflow-hidden border border-[#1c1410]/20 bg-white shadow-[3px_3px_0_#1c1410]/10">
                <Image
                  src={special.image}
                  alt={special.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 20vw"
                />
              </div>
              <p className="mt-2 font-chinese text-sm">{special.chineseTitle}</p>
              <p className="text-xs text-[#1c1410]/65">{special.title}</p>
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
  if (!poster) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[102] p-2 text-white"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="absolute left-4 top-4 z-[102] text-white">
        <p className="font-chinese text-sm">{poster.chineseTitle}</p>
        <p className="text-xs opacity-80">{poster.title}</p>
      </div>

      <div
        className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
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
