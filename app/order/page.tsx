'use client'

import Link from 'next/link'
import { ShoppingCart, Truck, ArrowRight } from 'lucide-react'

const orderOptions = [
  {
    type: 'Pickup',
    url: 'https://order.online/store/49725843?pickup=true&redirected=true',
    icon: ShoppingCart,
    description: 'Order pickup at our location',
    features: ['No extra fees', 'Quick service', 'Easy ordering'],
  },
  {
    type: 'Delivery',
    url: 'https://order.online/store/49725843?redirected=true&delivery=true',
    icon: Truck,
    description: 'Fresh food delivered to you',
    features: ['No extra fees', 'Convenient', 'Hot & fresh'],
  },
]

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4 font-tempus">Order Now</h1>
          <p className="text-lg text-foreground/70">Choose your preferred ordering method</p>
        </div>

        {/* Order Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {orderOptions.map((option) => {
            const Icon = option.icon
            return (
              <a
                key={option.type}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-teal-500 cursor-pointer"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-foreground mb-2 font-tempus">{option.type}</h2>

                  {/* Description */}
                  <p className="text-foreground/60 mb-6">{option.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all duration-300">
                    Order {option.type}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Also Available On Section */}
        <div className="mt-20 pt-16 border-t border-border text-center">
          <p className="text-foreground/60 mb-8">Also available on</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { name: 'Uber Eats', url: 'https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D' },
              { name: 'Doordash', url: 'https://order.online/store/49725843?redirected=true&delivery=true' },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-border rounded-lg text-foreground/70 hover:text-foreground hover:border-teal-500 transition-all duration-300"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-foreground/60 hover:text-foreground transition-colors duration-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
