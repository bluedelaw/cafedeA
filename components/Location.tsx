"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Bus, 
  CalendarDays, 
  ShoppingBag, 
  ExternalLink, 
  CheckCircle2, 
  Navigation,
  Sparkles
} from "lucide-react"

export default function Location() {
  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null)
  const [currentDayName, setCurrentDayName] = useState("")

  // Calculate live restaurant opening status based on Vancouver / Richmond time (America/Vancouver)
  useEffect(() => {
    try {
      const now = new Date()
      const vancouverTimeStr = now.toLocaleString("en-US", { timeZone: "America/Vancouver" })
      const vancouverDate = new Date(vancouverTimeStr)

      const day = vancouverDate.getDay() // 0 = Sunday, 1 = Monday, ...
      const hour = vancouverDate.getHours()
      const minute = vancouverDate.getMinutes()
      const timeInMinutes = hour * 60 + minute

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      setCurrentDayName(daysOfWeek[day])

      const openMinutes = 8 * 60 // 8:00 AM = 480 mins
      const closeMinutes = 22 * 60 // 10:00 PM

      const open = timeInMinutes >= openMinutes && timeInMinutes < closeMinutes
      setIsOpenNow(open)
    } catch {
      setIsOpenNow(null)
    }
  }, [])

  const schedule = [
    { day: "Monday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Tuesday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Wednesday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Thursday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Friday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Saturday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
    { day: "Sunday", hours: "8:00 AM – 10:00 PM", note: "Breakfast, Lunch, Tea, Dinner" },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Page Header */}
        <header className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>VISIT CAFÉ DE A · 餐廳位置與營業時間</span>
          </div>
          <h1 className="font-tempus text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Location & Hours
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Located conveniently inside Ironwood Plaza in Richmond, BC, with ample free surface parking.
          </p>
        </header>

        {/* Live Status + Address & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Address, Phone & Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Open/Closed Status Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Status</span>
                {isOpenNow !== null && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isOpenNow
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                    />
                    <span>{isOpenNow ? "Open Now" : "Closed Now"}</span>
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">café de A (Richmond)</h2>
                <p className="text-xs font-semibold text-teal-700 font-chinese mt-0.5">正宗港式茶餐廳 · 燒味明爐</p>
              </div>

              <div className="space-y-3 pt-2 text-sm text-gray-600 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Ironwood Plaza</span>
                    <span>#3050 - 11666 Steveston Hwy</span>
                    <br />
                    <span>Richmond, BC V7A 5J3</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <a href="tel:6042767800" className="font-semibold text-teal-700 hover:underline">
                    (604) 276-7800
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="https://maps.app.goo.gl/cWFJu98tEtuGss9J9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://cafedeawaitlist.vercel.app/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-amber-700" />
                    <span>Join Waitlist</span>
                  </a>

                  <Link
                    href="/order"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
                    <span>Order Pickup</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Parking & Transit Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 font-tempus">
                <Car className="w-4 h-4 text-teal-600" />
                <span>Parking & Accessibility</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ironwood Plaza features hundreds of free parking stalls directly outside the restaurant. Wheelchair-accessible entrances and seating are available.
              </p>

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-teal-600" />
                  <span>Public Transit Connections</span>
                </h4>
                <p className="text-xs text-gray-600">
                  TransLink Buses <strong>403, 404, 408, 413, 351</strong> stop adjacent to Ironwood Plaza on Steveston Hwy and No. 5 Road.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Schedule Breakdown */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-gray-900 text-lg font-tempus">Weekly Hours of Operation</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full">
                  7 Days a Week
                </span>
              </div>

              {/* Schedule List */}
              <div className="space-y-3">
                {schedule.map((item) => {
                  const isToday = item.day === currentDayName
                  return (
                    <div
                      key={item.day}
                      className={`p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 ${
                        isToday
                          ? "bg-teal-50/80 border border-teal-300 shadow-sm"
                          : "bg-[#faf8f5] border border-gray-200/70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isToday ? "text-teal-900" : "text-gray-900"}`}>
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded bg-teal-600 text-white text-[10px] font-bold">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-sm text-gray-900 block">{item.hours}</span>
                        <span className="text-[11px] text-gray-500">{item.note}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Meal Service Timings */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <span className="font-bold block text-amber-950">Daily Meal Timings:</span>
                <p>• <strong>Breakfast:</strong> 8:00 AM – 11:00 AM</p>
                <p>• <strong>Lunch:</strong> 11:00 AM – 2:30 PM</p>
                <p>• <strong>Afternoon Tea:</strong> 2:30 PM – 5:30 PM</p>
                <p>• <strong>Dinner & BBQ Meats:</strong> 5:30 PM – Close</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-xl font-tempus text-gray-900">Google Map & Interactive Directions</h2>
              <p className="text-xs text-gray-500">Find us in the heart of Ironwood Plaza, Richmond</p>
            </div>

            <a
              href="https://maps.app.goo.gl/cWFJu98tEtuGss9J9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 self-start sm:self-center"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Frame */}
          <div className="w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-gray-200 relative bg-gray-100">
            <iframe
              title="café de A Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.6896229415494!2d-123.09033332338048!3d49.13054597137025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485dfb28e5a7b6b%3A0x6b80155b9e59d9c8!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
