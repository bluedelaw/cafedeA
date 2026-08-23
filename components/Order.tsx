"use client"

import Link from "next/link"
import { 
  ArrowRight, 
  ShoppingCart, 
  Truck, 
  CalendarDays, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from "lucide-react"

const pickupUrl = "https://order.online/store/49725843?pickup=true&redirected=true"

const deliveryOptions = [
  {
    name: "Uber Eats",
    chinese: "優食外送",
    url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
    tag: "Delivery Partner",
  },
  {
    name: "DoorDash",
    chinese: "戶戶送外賣",
    url: "https://www.doordash.com/en-CA/store/cafe-de-a-11666-steveston-highway-apt-3050-richmond-49725843/114745349/?preview=1",
    tag: "Delivery Partner",
  },
]

export default function Order() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-gray-900 px-4 sm:px-6 lg:px-8 pb-20 pt-28 md:pt-32">
      <div className="container mx-auto max-w-6xl">
        {/* Page Header */}
        <header className="mx-auto mb-12 max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>DIRECT ORDERING & DELIVERY · 網上點餐服務</span>
          </div>
          <h1 className="font-tempus text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Order From café de A
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Choose fast in-store pickup for the freshest experience, or have your favorite dishes delivered to your doorstep.
          </p>
        </header>

        {/* Core Ordering Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 1. Direct Pickup Card (Primary Recommendation) */}
          <section className="relative rounded-2xl border-2 border-teal-600 bg-white p-7 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold tracking-wide">
              RECOMMENDED
            </div>

            <div className="space-y-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <ShoppingCart className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-tempus text-2xl font-bold text-gray-900">Direct Pickup</h2>
                <p className="text-xs font-semibold text-teal-700 font-chinese mt-0.5">到店自取 · 免手續費</p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Order directly from our kitchen. Prepared fresh with zero third-party markups and ready in 15–20 minutes.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>No extra service fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>Full menu including BBQ & Chef specials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>Convenient free parking at Ironwood</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 space-y-2.5">
              <a
                href={pickupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-center text-sm sm:text-base font-bold text-white shadow-md hover:bg-teal-500 transition-colors font-tempus"
              >
                <span>Start Pickup Order</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="tel:6042767800"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2.5 text-center text-xs font-semibold text-gray-700 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-teal-600" />
                <span>Or Call to Order: (604) 276-7800</span>
              </a>
            </div>
          </section>

          {/* 2. Delivery Card */}
          <section className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Truck className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-tempus text-2xl font-bold text-gray-900">Doorstep Delivery</h2>
                <p className="text-xs font-semibold text-blue-700 font-chinese mt-0.5">外賣送遞 · 專人送到</p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy hot Hong Kong comfort food delivered directly to your home or office via our trusted delivery partners.
              </p>

              <div className="space-y-3 pt-2">
                {deliveryOptions.map((opt) => (
                  <a
                    key={opt.name}
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
                  >
                    <div>
                      <span className="font-bold text-gray-900 text-sm block group-hover:text-teal-800">
                        {opt.name}
                      </span>
                      <span className="text-xs text-gray-500 font-chinese">{opt.chinese}</span>
                    </div>
                    <div className="flex items-center gap-1 text-teal-600 text-xs font-semibold">
                      <span>Order</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Delivery times and fees managed by respective platform apps.
              </p>
            </div>
          </section>

          {/* 3. Dine-in Live Waitlist Card */}
          <section className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <CalendarDays className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-tempus text-2xl font-bold text-gray-900">Dine-In Waitlist</h2>
                <p className="text-xs font-semibold text-amber-700 font-chinese mt-0.5">堂食實時排隊</p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Planning to visit us during peak breakfast or dinner hours? Join our live waitlist queue online before you arrive.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Real-time queue tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>SMS notification when your table is ready</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <a
                href="https://cafedeawaitlist.vercel.app/join"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-5 py-3.5 text-center text-sm sm:text-base font-bold text-white shadow-md transition-colors font-tempus"
              >
                <span>Join Live Waitlist</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>

        {/* Operating Hours & Location Summary */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Operating Hours</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Monday–Saturday: 8:00 AM – 10:00 PM
                  <br />
                  Sunday: 8:00 AM – 9:30 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Pickup Location</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Ironwood Plaza (#3050-11666 Steveston Hwy)
                  <br />
                  Free parking available right in front
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Need Help?</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Call our staff at <a href="tel:6042767800" className="text-teal-700 font-bold hover:underline">(604) 276-7800</a> for large party or custom orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
