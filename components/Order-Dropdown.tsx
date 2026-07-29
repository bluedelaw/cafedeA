"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ShoppingBag } from "lucide-react"

const orderOptions = {
  pickup: [
    {
      name: "Pickup",
      url: "https://h5.posking.ca/#/shop?id=617",
      description: "",
    },
  ],
  delivery: [
    {
      name: "Doordash",
      url: "https://order.online/store/49725843?pickup=true&redirected=true",
      description: "",
    },
    {
      name: "Uber Eats",
      url: "https://ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AE37R_j93zdmW29aaQTCBnds3JlJaL2Aw7EWQWFSUF9z9Py52ir-69WR-Y0vfMz-sNVYfTpxcOVevN6CxOtV3X2-8Qt_PgTkgQ%3D%3D",
      description: "",
    },
  ],
}

interface OrderDropdownProps {
  variant?: "header" | "hero" | "nav"
  onSelect?: () => void
}

export function OrderDropdown({ variant = "header", onSelect }: OrderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
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

  if (variant === "nav") {
    // Navigation variant - matches header nav items style
    return (
      <div ref={dropdownRef} className="group relative px-4 py-2 font-tempus">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 transition-colors duration-300 flex items-center gap-1 ${
            isOpen
              ? "text-white"
              : "text-gray-300 group-hover:text-white"
          }`}
        >
          Order
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Animated underline */}
        <span
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
          }`}
        />

        {/* Hover background */}
        <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                  className="block px-4 py-2.5 text-gray-900 text-sm hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
                >
                  <div className="font-semibold">{option.name}</div>
                  {option.description && <div className="text-xs text-gray-500">{option.description}</div>}
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
                  className="block px-4 py-2.5 text-gray-900 text-sm hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
                >
                  <div className="font-semibold">{option.name}</div>
                  {option.description && <div className="text-xs text-gray-500">{option.description}</div>}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === "hero") {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 flex items-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Order Now
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Pickup Section */}
            <div className="border-b border-gray-100">
              <div className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                Pickup
              </div>
              {orderOptions.pickup.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className="block px-4 py-3 text-gray-900 hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
                >
                  <div className="font-semibold">{option.name}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </a>
              ))}
            </div>

            {/* Delivery Section */}
            <div>
              <div className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                Delivery
              </div>
              {orderOptions.delivery.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectOption}
                  className="block px-4 py-3 text-gray-900 hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
                >
                  <div className="font-semibold">{option.name}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Header variant
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 font-tempus text-sm"
      >
        <span className="relative z-10 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Order
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-52 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                className="block px-4 py-2.5 text-gray-900 text-sm hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
              >
                <div className="font-semibold">{option.name}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
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
                className="block px-4 py-2.5 text-gray-900 text-sm hover:bg-teal-50 transition-colors duration-200 border-l-3 border-transparent hover:border-teal-600"
              >
                <div className="font-semibold">{option.name}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
