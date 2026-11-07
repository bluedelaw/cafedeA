"use client"

import { useCallback, useEffect, useRef, useState } from "react"
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
  const closePoster = useCallback(() => setSelectedPoster(null), [])

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
              className="min-h-11 text-left text-sm font-semibold text-[#f2ead9] underline underline-offset-4"
            >
              All specials
            </button>
          ) : (
            <Link href="/menu?section=specials" className="min-h-11 text-sm font-semibold text-[#f2ead9] underline underline-offset-4">
              All specials
            </Link>
          )}
        </div>

        <div className="mt-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {featuredSpecials.map((special) => (
            <PosterButton
              key={special.id}
              special={special}
              onOpen={setSelectedPoster}
              captionClass="text-[#f2ead9]"
              subcaptionClass="text-[#f2ead9]/80"
              frameClass="border-[#f2ead9]/30"
              className="w-40 shrink-0 snap-start text-left sm:w-48"
            />
          ))}
        </div>

        <PosterModal poster={selectedPoster} onClose={closePoster} />
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
          <Link href="/menu?section=specials" className="min-h-11 text-sm font-semibold underline underline-offset-4">
            Menu
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:snap-none lg:grid-cols-6">
          {featuredSpecials.map((special) => (
            <PosterButton
              key={special.id}
              special={special}
              onOpen={setSelectedPoster}
              captionClass="text-espresso"
              subcaptionClass="text-espresso/75"
              frameClass="border-espresso/20"
              className="w-40 shrink-0 snap-start text-left md:w-auto md:min-w-0"
            />
          ))}
        </div>
      </div>

      <PosterModal poster={selectedPoster} onClose={closePoster} />
    </section>
  )
}

function PosterButton({
  special,
  onOpen,
  className,
  captionClass,
  subcaptionClass,
  frameClass,
}: {
  special: FeaturedSpecial
  onOpen: (special: FeaturedSpecial) => void
  className: string
  captionClass: string
  subcaptionClass: string
  frameClass: string
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(special)}
      className={`${className} rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
    >
      <div className={`relative aspect-[3/4] w-full overflow-hidden border bg-[#F7F0E3] transition-transform duration-200 hover:brightness-[0.97] ${frameClass}`}>
        <Image
          src={special.image}
          alt={special.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 160px, 16vw"
        />
      </div>
      <p className={`mt-2 font-chinese text-sm ${captionClass}`}>{special.chineseTitle}</p>
      <p className={`line-clamp-2 min-h-[2rem] text-xs leading-snug ${subcaptionClass}`}>{special.title}</p>
    </button>
  )
}

function PosterModal({
  poster,
  onClose,
}: {
  poster: FeaturedSpecial | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (poster && !dialog.open) dialog.showModal()
    if (!poster && dialog.open) dialog.close()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialog.open) dialog.close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [poster])

  useEffect(() => {
    if (!poster) return
    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    }
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"
    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.width = previous.bodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [poster])

  return (
    <dialog
      ref={dialogRef}
      className="poster-dialog"
      aria-labelledby="poster-title"
      onClose={() => onCloseRef.current()}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
    >
      {poster ? (
        <div className="flex max-h-[90vh] w-full max-w-[min(92vw,36rem)] flex-col items-stretch">
          <div className="mb-3 flex items-start justify-between gap-4 text-white">
            <div>
              <p id="poster-title" className="font-chinese text-sm">
                {poster.chineseTitle}
              </p>
              <p className="text-xs text-white/80">{poster.title}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white"
              aria-label="Close poster"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <Image
            src={poster.image}
            alt={poster.alt}
            width={900}
            height={1200}
            className="h-auto w-full max-h-[min(78vh,52rem)] object-contain"
            sizes="(max-width: 768px) 92vw, 36rem"
            priority
          />
        </div>
      ) : null}
    </dialog>
  )
}
