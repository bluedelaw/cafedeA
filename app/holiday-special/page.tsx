import Header from "@/components/Header"
import UberEatsBanner from "@/components/UberEatsBanner"
import Footer from "@/components/Footer"
import { Phone, Mail, Clock, Calendar, Users, UtensilsCrossed, ShoppingBag } from "lucide-react"

export const metadata = {
  title: "Holiday Special | Café de A",
  description:
    "Join us for our special holiday menu available December 24, 25, 31, and January 1. Reservations recommended.",
}

export default function HolidaySpecialPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <UberEatsBanner />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-red-900 via-red-800 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🎄</span>
            <h1 className="text-4xl md:text-5xl font-bold font-tempus">Holiday Special</h1>
            <span className="text-4xl">🎄</span>
          </div>
        </div>
      </section>

      {/* Holiday Special Image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600">
              <img src="/images/Special/holiday-special.webp" alt="Holiday Special Menu" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Holiday Special Information</h2>

            {/* Dates & Times Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Available Dates</h3>
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold text-red-600">December 24, 25, 31</span> and{" "}
                    <span className="font-semibold text-red-600">January 1</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Time Slots Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Reservation Time Slots</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">5:30 PM</span>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">7:00 PM</span>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">8:20 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dine-in Only Notice */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <UtensilsCrossed className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Dine-In Dinner Service Only</h3>
                  <p className="text-gray-600">
                    The Holiday Special menu is offered exclusively for dine-in dinner service on these dates.
                  </p>
                </div>
              </div>
            </div>

            {/* Takeout Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Takeout Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>
                        <strong>Not available for takeout:</strong> Curries, mix-and-match items, and baked dishes
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>All other regular menu items remain available for takeout</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reservation Card */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Reservations Highly Recommended</h3>
                  <p className="text-red-100 mb-4">Please call or email us!</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:604-276-7800"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      604-276-7800
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Walk-ins Notice */}
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <p className="text-gray-700">
                <strong>Walk-ins are welcome</strong> if space permits, but availability is not guaranteed.
                <br />
                <span className="text-red-600 font-semibold">
                  We strongly encourage calling ahead to confirm seating.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
