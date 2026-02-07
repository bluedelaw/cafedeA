"use client"

import { Truck } from "lucide-react"

// Banner height: 48px (h-12)
export const BANNER_HEIGHT = 48

export default function UberEatsBanner() {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-gradient-to-r from-green-600 to-green-700 text-white h-12 flex items-center px-2 sm:px-4 shadow-md">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-[10px] sm:text-sm font-medium">
            <span className="hidden sm:inline">Delivery & Pickup via Uber Eats</span>
            <span className="sm:hidden">Delivery & Pickup via Uber Eats</span>
          </span>
        </div>
        <a
          href="https://www.ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-green-700 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-sm font-semibold hover:bg-green-50 transition-all duration-200 hover:scale-105 shadow-sm whitespace-nowrap"
        >
          Order Now
        </a>
      </div>
    </div>
  )
}