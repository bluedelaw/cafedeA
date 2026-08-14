'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingCart, Truck } from 'lucide-react'

const pickupUrl = 'https://order.online/store/49725843?pickup=true&redirected=true'

const deliveryOptions = [
  {
    name: 'Uber Eats',
    url: 'https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D',
  },
  {
    name: 'DoorDash',
    url: 'https://www.doordash.com/en-CA/store/cafe-de-a-11666-steveston-highway-apt-3050-richmond-49725843/114745349/?preview=1',
  },
]

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-32">
      <div className="container mx-auto">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          {/* <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
            Cafe de A
          </p> */}
          <h1 className="mb-4 font-tempus text-4xl font-bold text-foreground md:text-5xl">
            Order Now
          </h1>
          <p className="text-lg text-foreground/70">
            Choose pickup or select the delivery service that works best for you.
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Pickup: one clear direct option */}
          <section className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-teal-500 hover:shadow-xl">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600 text-primary-foreground">
                <ShoppingCart className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mb-2 font-tempus text-3xl font-bold text-foreground">Pickup</h2>
              <p className="mb-6 text-foreground/65">
                Order directly from Cafe de A and pick up at our location.
              </p>
              <ul className="mb-8 space-y-2 text-foreground/70">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600" aria-hidden="true" />
                  No extra fees
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600" aria-hidden="true" />
                  Quick and easy ordering
                </li>
              </ul>
              <a
                href={pickupUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start your pickup order"
                className="mt-auto inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-teal-600 px-5 py-4 text-center text-lg font-bold text-primary-foreground shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <span>Start Pickup Order</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* Delivery: make the provider choice explicit */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-teal-500 hover:shadow-xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600 text-primary-foreground">
              <Truck className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mb-2 font-tempus text-3xl font-bold text-foreground">Delivery</h2>
            <p className="mb-6 text-foreground/65">
              Choose your preferred delivery service.
            </p>
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition-all duration-300 hover:border-teal-500 hover:bg-teal-50"
                >
                  {option.name}
                  <ArrowRight className="h-5 w-5 text-teal-600" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            Back to home
          </Link>
        </div> */}
      </div>
    </main>
  )
}
