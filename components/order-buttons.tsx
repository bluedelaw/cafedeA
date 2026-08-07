"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ShoppingCart, Truck, Phone } from "lucide-react"

const orderOptions = {
  pickup: [
    {
      name: "Order Direct",
      subtitle: "No extra fees",
      url: "https://order.online/store/49725843?pickup=true&redirected=true",
      icon: ShoppingCart,
      featured: true,
    },
    {
      name: "Uber Eats",
      url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
      icon: Truck,
      featured: false,
    },
    {
      name: "Doordash",
      url: "https://order.online/store/49725843?pickup=true&redirected=true",
      icon: Truck,
      featured: false,
    },
    {
      name: "Store Counter",
      url: "https://order.online/store/49725843?pickup=true&redirected=true",
      icon: Phone,
      featured: false,
    },
  ],
  delivery: [
    {
      name: "Order Direct",
      subtitle: "No extra fees",
      url: "https://order.online/store/49725843?redirected=true&delivery=true",
      icon: ShoppingCart,
      featured: true,
    },
    {
      name: "Uber Eats",
      url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
      icon: Truck,
      featured: false,
    },
    {
      name: "Doordash",
      url: "https://order.online/store/49725843?redirected=true&delivery=true",
      icon: Truck,
      featured: false,
    },
  ],
}

interface OrderButtonsProps {
  variant?: "nav" | "hero" | "mobile"
  onSelect?: () => void
}

export function OrderButtons({ variant = "nav", onSelect }: OrderButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectOption = () => {
    setIsOpen(false)
    onSelect?.()
  }

  // Navigation variant - compact dropdown
  if (variant === "nav") {
    return (
      <div ref={dropdownRef} className="group relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 transition-colors duration-300 flex items-center gap-1 px-4 py-2 rounded-lg font-tempus ${isOpen
            ? "text-white bg-white/10"
            : "text-gray-300 group-hover:text-white hover:bg-white/5"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Order Direct</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Pickup Section */}
            <div className="border-b border-gray-100">
              <div className="px-4 py-2 bg-gray-50 font-semibold text-gray-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                PICKUP
              </div>
              {orderOptions.pickup.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className={`block px-4 py-2.5 text-gray-900 text-sm transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600 ${
                    option.featured
                      ? "bg-teal-50 font-semibold hover:bg-teal-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-2">
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </div>
                  {option.subtitle && (
                    <div className="text-xs text-teal-700 font-semibold mt-0.5">
                      {option.subtitle}
                    </div>
                  )}
                </a>
              ))}
            </div>

            {/* Delivery Section */}
            <div>
              <div className="px-4 py-2 bg-gray-50 font-semibold text-gray-900 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                DELIVERY
              </div>
              {orderOptions.delivery.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className={`block px-4 py-2.5 text-gray-900 text-sm transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600 ${
                    option.featured
                      ? "bg-teal-50 font-semibold hover:bg-teal-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-2">
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </div>
                  {option.subtitle && (
                    <div className="text-xs text-teal-700 font-semibold mt-0.5">
                      {option.subtitle}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === "mobile") {
    return (
      <div className="space-y-3">
        {/* Pickup Button */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 font-tempus"
          >
            <div className="flex flex-1 items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Order Direct
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-max bg-white rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Pickup Options */}
              <div className="border-b border-gray-100">
                {orderOptions.pickup.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSelectOption}
                    className={`block px-4 py-3 text-gray-900 font-semibold text-sm transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-2 ${
                      option.featured
                        ? "bg-teal-50 hover:bg-teal-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </a>
                ))}
              </div>

              {/* Delivery Options */}
              <div>
                {orderOptions.delivery.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSelectOption}
                    className={`block px-4 py-3 text-gray-900 font-semibold text-sm transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-2 ${
                      option.featured
                        ? "bg-teal-50 hover:bg-teal-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
