"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, MapPin, Phone, Clock, ArrowRight, ExternalLink, Shield } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#161a22] text-white border-t border-white/10 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-14">
                <Image
                  src="/images/logo.png"
                  alt="café de A"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Bringing authentic Hong Kong café culture and traditional Cantonese BBQ to Richmond, BC. Made fresh daily with culinary craftsmanship.
            </p>
            <p className="text-xs text-teal-400 font-chinese">
              正宗港式茶餐廳 · 明爐港式燒味 · 鑊氣小炒
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/cafedea_ironwood/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Find us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588606623911"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Find us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Menus */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 font-tempus">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Home 主頁</span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Full Menu 餐廳菜單</span>
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Order Online 網上點餐</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://cafedeawaitlist.vercel.app/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Join Waitlist 實時排隊</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/location" className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Location & Hours 餐廳位置</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Catering & Contact 到會與查詢</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 font-tempus flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Opening Hours</span>
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Daily</span>
                <span className="font-medium text-white">8:00 AM – 10:00 PM</span>
              </div>
              <div className="pt-2 text-xs text-gray-400 leading-relaxed">
                <span className="text-teal-400 font-medium">Breakfast:</span> 8:00 AM – 11:00 AM
                <br />
                <span className="text-teal-400 font-medium">Lunch:</span> 11:00 AM – 2:30 PM
                <br />
                <span className="text-teal-400 font-medium">Afternoon Tea:</span> 2:30 PM – 5:30 PM
                <br />
                <span className="text-teal-400 font-medium">Dinner:</span> 5:30 PM – Close
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 font-tempus flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Find Us</span>
            </h3>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p className="leading-relaxed">
                <span className="text-white font-medium">Ironwood Plaza</span>
                <br />
                #3050 - 11666 Steveston Hwy
                <br />
                Richmond, BC V7A 5J3
              </p>
              <div className="pt-2">
                <a
                  href="tel:6042767800"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>(604) 276-7800</span>
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://maps.app.goo.gl/cWFJu98tEtuGss9J9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} café de A. All rights reserved. Richmond, BC.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/links" className="hover:text-teal-400 transition-colors">
              Quick Connect
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
