"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ZoomIn, X, ArrowRight } from "lucide-react"
import { featuredSpecials, type FeaturedSpecial } from "@/lib/specials"

interface FeaturedSpecialsProps {
  variant?: "showcase" | "banner"
  onViewAll?: () => void
}

export default function FeaturedSpecials({ variant = "showcase", onViewAll }: FeaturedSpecialsProps) {
  const [selectedPoster, setSelectedPoster] = useState<FeaturedSpecial | null>(null)

  if (variant === "banner") {
    return (
      <section className="mb-8">
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-teal-50 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <Sparkles className="h-3.5 w-3.5" />
                <span>New &amp; Limited-Time · 最新推介</span>
              </div>
              <h2 className="font-tempus text-2xl font-bold text-gray-900 sm:text-3xl">Featured Specials</h2>
              <p className="max-w-xl text-sm text-gray-600">
                See what&apos;s new this month — seasonal dishes, chef picks, and limited-run promotions.
              </p>
            </div>

            {onViewAll ? (
              <button
                type="button"
                onClick={onViewAll}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-500 lg:self-center"
              >
                <span>View All Specials</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/menu?section=specials"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-500 lg:self-center"
              >
                <span>View All Specials</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
            {featuredSpecials.map((special) => (
              <button
                key={special.id}
                type="button"
                onClick={() => setSelectedPoster(special)}
                className="group w-44 shrink-0 text-left sm:w-52"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all group-hover:border-teal-500 group-hover:shadow-md">
                  <Image
                    src={special.image}
                    alt={special.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="208px"
                  />
                  {special.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {special.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900">{special.title}</p>
                <p className="text-xs text-teal-700 font-chinese">{special.chineseTitle}</p>
              </button>
            ))}
          </div>
        </div>

        <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#1a1f29] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>New &amp; Limited-Time · 最新推介</span>
          </div>
          <h2 className="font-tempus text-3xl font-bold text-white md:text-5xl">Featured Specials</h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            Discover our latest seasonal dishes, chef recommendations, and limited-run promotions — updated regularly.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSpecials.map((special) => (
            <button
              key={special.id}
              type="button"
              onClick={() => setSelectedPoster(special)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#242b38] text-left shadow-xl transition-all hover:border-teal-500/60"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <Image
                  src={special.image}
                  alt={special.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {special.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    {special.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
                    <ZoomIn className="h-4 w-4" />
                    <span>View poster</span>
                  </span>
                </div>
              </div>
              <div className="border-t border-white/5 p-5">
                <h3 className="text-lg font-bold text-white">{special.title}</h3>
                <p className="mt-0.5 text-sm font-chinese text-teal-300">{special.chineseTitle}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{special.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/menu?section=specials"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-teal-500"
          >
            <span>See Full Specials Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 backdrop-blur-md sm:p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[102] rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="absolute left-4 top-4 z-[102] max-w-[min(72vw,28rem)] rounded-full bg-black/60 px-4 py-2 text-white backdrop-blur-sm">
        <p className="text-xs font-semibold">{poster.title}</p>
        <p className="text-[11px] font-chinese text-teal-200">{poster.chineseTitle}</p>
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
          className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          sizes="92vw"
          priority
        />
      </div>
    </div>
  )
}
