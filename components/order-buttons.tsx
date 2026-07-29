"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Package, Truck } from "lucide-react"

const orderOptions = {
  pickup: [
    {
      name: "Pickup",
      url: "https://h5.posking.ca/#/shop?id=617",
    },
  ],
  delivery: [
    {
      name: "Doordash",
      url: "https://order.online/store/49725843?pickup=true&redirected=true",
    },
    {
      name: "Uber Eats",
      url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
    },
  ],
}

interface OrderButtonsProps {
  variant?: "nav" | "mobile"
  onSelect?: () => void
}

export function OrderButtons({ variant = "nav", onSelect }: OrderButtonsProps) {
  const [openDelivery, setOpenDelivery] = useState(false)
  const deliveryRef = useRef<HTMLDivElement>(null)

  // Close delivery dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deliveryRef.current && !deliveryRef.current.contains(event.target as Node)) {
        setOpenDelivery(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectOption = () => {
    setOpenDelivery(false)
    onSelect?.()
  }

  if (variant === "nav") {
    // Navigation variant - two buttons side by side
    return (
      <div className="flex items-center gap-2">
        {/* Pickup Link - Direct to PosKing */}
        <a
          href={orderOptions.pickup[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSelectOption}
          className="group relative transition-colors duration-300 flex items-center gap-1 px-3 py-2 rounded-lg font-tempus text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Package className="w-4 h-4" />
          <span>Order Pickup</span>
        </a>

        {/* Delivery Button */}
        <div ref={deliveryRef} className="group relative">
          <button
            onClick={() => setOpenDelivery(!openDelivery)}
            className={`relative z-10 transition-colors duration-300 flex items-center gap-1 px-3 py-2 rounded-lg font-tempus ${openDelivery
              ? "text-white bg-white/10"
              : "text-gray-300 group-hover:text-white hover:bg-white/5"
              }`}
          >
            <Truck className="w-4 h-4" />
            <span>Order Delivery</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${openDelivery ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Delivery Dropdown */}
          {openDelivery && (
            <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {orderOptions.delivery.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className="block px-4 py-3 text-gray-900 font-semibold text-sm hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
                >
                  {option.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === "mobile") {
    // Mobile variant - two prominent buttons with delivery dropdown
    return (
      <div className="space-y-4">
        {/* Pickup Button - Direct Link */}
        <a
          href={orderOptions.pickup[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSelectOption}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 font-tempus"
        >
          <Package className="w-5 h-5" />
          Order Pickup
        </a>

        {/* Delivery Button with Dropdown */}
        <div ref={deliveryRef} className="relative">
          <button
            onClick={() => setOpenDelivery(!openDelivery)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 font-tempus"
          >
            <div className="flex flex-1 items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              Order Delivery
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${openDelivery ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Delivery Dropdown */}
          {openDelivery && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-full bg-white rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {orderOptions.delivery.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className="block px-4 py-3 text-gray-900 font-semibold text-sm hover:bg-teal-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                >
                  {option.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}
