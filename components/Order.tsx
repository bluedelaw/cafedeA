"use client"

import Link from "next/link"

const pickupUrl = "https://order.online/store/49725843?pickup=true&redirected=true"

const deliveryOptions = [
  {
    name: "Uber Eats",
    url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
  },
  {
    name: "DoorDash",
    url: "https://www.doordash.com/en-CA/store/cafe-de-a-11666-steveston-highway-apt-3050-richmond-49725843/114745349/?preview=1",
  },
  {
    name: "SkipTheDishes",
    url: "https://www.skipthedishes.com/cafe-de-a?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder",
  },
]

const buttonPrimary =
  "inline-flex h-12 items-center justify-center rounded-md bg-[#302117] px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"
const buttonOutline =
  "inline-flex h-12 w-full items-center justify-between rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-sm font-medium text-[#302117] transition-colors duration-150 hover:border-[#302117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"

export default function Order() {
  return (
    <div className="min-h-screen bg-[#F7F0E3] text-[#302117] pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-8 lg:pb-16">
        <header className="max-w-2xl pb-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl leading-tight sm:text-5xl">Order</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#302117]/75">
            Pickup at the kitchen, delivery on the apps, or join the waitlist before you arrive. Open daily 8:00 AM –
            10:00 PM.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-8">
          <div className="overflow-hidden rounded-md border border-[#302117]/12 bg-[#FFF9F0]">
            <section className="border-b border-[#302117]/10 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Pickup</h2>
              <p className="mt-1 text-sm text-[#302117]/60">From the kitchen. No extra app fees. Free parking in the plaza.</p>
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a href={pickupUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                  Start pickup order
                </a>
                <a href="tel:6042767800" className="text-sm underline underline-offset-4">
                  Or call (604) 276-7800
                </a>
              </div>
            </section>

            <section className="border-b border-[#302117]/10 bg-[#F7F0E3]/50 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Delivery</h2>
              <p className="mt-1 text-sm text-[#302117]/60">Uber Eats, DoorDash, or SkipTheDishes.</p>
              <ul className="mt-5 max-w-md space-y-2">
                {deliveryOptions.map((opt) => (
                  <li key={opt.name}>
                    <a href={opt.url} target="_blank" rel="noopener noreferrer" className={buttonOutline}>
                      <span>{opt.name}</span>
                      <span className="text-sm font-normal text-[#302117]/45">Open</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Waitlist</h2>
              <p className="mt-1 text-sm text-[#302117]/60">Join the queue before you arrive. We’ll text when the table is ready.</p>
              <Link
                href="/waitlist"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-md border border-[#302117] px-5 text-sm font-medium text-[#302117] transition-colors duration-150 hover:bg-[#302117] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                Join waitlist
              </Link>
            </section>
          </div>

          <div className="mt-6 lg:sticky lg:top-28 lg:mt-0">
            <aside className="rounded-md border border-[#302117]/15 bg-[#FFF9F0] p-5">
              <h2 className="font-tempus text-2xl">Your order</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Pickup</dt>
                  <dd className="text-right font-medium">15–20 min</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Delivery</dt>
                  <dd className="text-right font-medium">On the apps</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Waitlist</dt>
                  <dd className="text-right font-medium">We’ll text</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-1">
                  <dt className="text-[#302117]/55">Hours</dt>
                  <dd className="text-right font-medium">8:00 AM – 10:00 PM</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">#3050-11666 Steveston Hwy · Ironwood Plaza</p>
              <a href={pickupUrl} target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} mt-5 hidden w-full lg:inline-flex`}>
                Start pickup order
              </a>
            </aside>
            <a href="tel:6042767800" className="mt-4 hidden text-sm text-[#302117]/70 underline underline-offset-4 lg:inline-block">
              Call us · (604) 276-7800
            </a>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#302117]/10 bg-[#FFF9F0]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-sm text-[#302117]/75">Pickup · about 15–20 minutes</p>
          <a href={pickupUrl} target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} shrink-0`}>
            Start pickup
          </a>
        </div>
      </div>
    </div>
  )
}
