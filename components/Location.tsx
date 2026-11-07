"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { restaurantClock } from "@/lib/restaurant-clock"

const mapsUrl = "https://maps.app.goo.gl/cWFJu98tEtuGss9J9"
const mapsEmbed =
  "https://maps.google.com/maps?q=caf%C3%A9+de+A+11666+Steveston+Hwy+%233050+Richmond+BC&z=17&output=embed"

const buttonPrimary =
  "inline-flex h-12 items-center justify-center rounded-md bg-[#302117] px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"
const buttonOutline =
  "inline-flex h-12 w-full items-center justify-center rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-sm font-medium text-[#302117] transition-colors duration-150 hover:border-[#302117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"

export default function Location() {
  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null)
  const [currentDayName, setCurrentDayName] = useState("")

  useEffect(() => {
    try {
      const clock = restaurantClock()
      setCurrentDayName(clock.dayName)
      setIsOpenNow(clock.isOpen)
    } catch {
      setIsOpenNow(null)
    }
  }, [])

  const openLabel = isOpenNow === null ? "Daily 8–10" : isOpenNow ? "Open now" : "Closed now"

  return (
    <div className="bg-[#F7F0E3] text-[#302117] pt-[calc(var(--site-header-height)_+_1.25rem)]">
      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-8 lg:pb-10">
        <header className="max-w-2xl pb-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl leading-tight sm:text-5xl">Location</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#302117]/75">
            #3050 – 11666 Steveston Hwy, Richmond. Open every day, 8:00 AM to 10:00 PM.
            {isOpenNow !== null ? ` ${isOpenNow ? "We’re open now." : "We’re closed right now."}` : ""}
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-8">
          <div className="overflow-hidden rounded-md border border-[#302117]/12 bg-[#FFF9F0]">
            <section className="border-b border-[#302117]/10 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Address</h2>
              <address className="mt-4 not-italic text-[15px] leading-7">
                #3050 – 11666 Steveston Hwy
                <br />
                Richmond, BC V7A 5J3
                <br />
                <a
                  href="tel:6042767800"
                  className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2"
                >
                  (604) 276-7800
                </a>
              </address>
              <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">
                Free parking in the plaza. Buses 403, 404, 408, 413, and 351 stop on Steveston Hwy and No. 5 Road.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                  Get directions
                </a>
                <a href="tel:6042767800" className="text-sm underline underline-offset-4">
                  Or call (604) 276-7800
                </a>
              </div>
            </section>

            <section className="border-b border-[#302117]/10 bg-[#F7F0E3]/50 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Hours</h2>
              <p className="mt-5 text-[15px] leading-relaxed">
                Open daily, 8:00 AM – 10:00 PM
                {currentDayName ? ` · ${currentDayName}` : ""}
                {isOpenNow === null ? "" : isOpenNow ? " · open now" : " · closed now"}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">
                Breakfast 8–11 · Lunch 11–2:30 · Afternoon tea 2:30–5:30 · Dinner 5:30–close
              </p>
              <p className="mt-2 text-xs text-[#302117]/55">Hours listed in Pacific time.</p>
            </section>

            <section className="px-5 py-6 sm:px-8 sm:py-8">
              <h2 className="font-tempus text-2xl">Map</h2>
              <p className="mt-1 text-sm text-[#302117]/60">Ironwood Plaza, Steveston Hwy at No. 5 Road.</p>
              <div className="mt-5 h-[320px] w-full overflow-hidden rounded-md border border-[#302117]/12 sm:h-[420px]">
                <iframe
                  title="café de A on Google Maps"
                  src={mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </section>
          </div>

          <div className="mt-6 lg:sticky lg:top-28 lg:mt-0">
            <aside className="rounded-md border border-[#302117]/15 bg-[#FFF9F0] p-5">
              <h2 className="font-tempus text-2xl">Visit</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Today</dt>
                  <dd className="text-right font-medium">{openLabel}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Hours</dt>
                  <dd className="text-right font-medium">8:00 AM – 10:00 PM</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Parking</dt>
                  <dd className="text-right font-medium">Free in the plaza</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-1">
                  <dt className="text-[#302117]/55">Phone</dt>
                  <dd className="text-right font-medium">
                    <a href="tel:6042767800" className="underline underline-offset-4">
                      (604) 276-7800
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">#3050-11666 Steveston Hwy · Ironwood Plaza</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonPrimary} mt-5 hidden w-full lg:inline-flex`}
              >
                Get directions
              </a>
              <div className="mt-3 hidden gap-2 lg:grid lg:grid-cols-2">
                <Link href="/reservation" className={buttonOutline}>
                  Reserve
                </Link>
                <Link href="/waitlist" className={buttonOutline}>
                  Waitlist
                </Link>
              </div>
            </aside>
            <a href="tel:6042767800" className="mt-4 hidden text-sm text-[#302117]/70 underline underline-offset-4 lg:inline-block">
              Call us · (604) 276-7800
            </a>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#302117]/10 bg-[#FFF9F0]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-sm text-[#302117]/75">{openLabel} · 8:00 AM – 10:00 PM</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} shrink-0`}>
            Directions
          </a>
        </div>
      </div>
    </div>
  )
}
