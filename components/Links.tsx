"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  CalendarDays, 
  Instagram, 
  Facebook, 
  Star, 
  MapPin, 
  Phone,
  Sparkles,
  ExternalLink
} from "lucide-react"

const actions = [
  {
    icon: UtensilsCrossed,
    label: "Explore Full Menu",
    chinese: "餐廳菜單",
    href: "/menu",
    internal: true,
    highlight: false,
  },
  {
    icon: ShoppingBag,
    label: "Order Pickup / Delivery",
    chinese: "網上外賣點餐",
    href: "/order",
    internal: true,
    highlight: true,
  },
  {
    icon: CalendarDays,
    label: "Join Live Waitlist",
    chinese: "堂食實時排隊",
    href: "https://cafedeawaitlist.vercel.app/join",
    internal: false,
    highlight: false,
  },
  {
    icon: Phone,
    label: "Call Restaurant",
    chinese: "(604) 276-7800",
    href: "tel:6042767800",
    internal: false,
    highlight: false,
  },
  {
    icon: Instagram,
    label: "Follow Instagram",
    chinese: "@cafedea_ironwood",
    href: "https://www.instagram.com/cafedea_ironwood/",
    internal: false,
    highlight: false,
  },
  {
    icon: Facebook,
    label: "Like on Facebook",
    chinese: "café de A",
    href: "https://www.facebook.com/profile.php?id=61588606623911",
    internal: false,
    highlight: false,
  },
  {
    icon: Star,
    label: "Leave Google Review",
    chinese: "顧客評價",
    href: "https://g.page/r/CTXPESWCGyDLEBM/review",
    internal: false,
    highlight: false,
  },
  {
    icon: MapPin,
    label: "Location & Directions",
    chinese: "Ironwood Plaza, Richmond",
    href: "/location",
    internal: true,
    highlight: false,
  },
]

export default function Links() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 pt-28 pb-16">
      <div className="w-full max-w-lg space-y-8 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-56 h-16">
            <Image
              src="/images/logo.png"
              alt="café de A"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>QUICK CONNECT · 快速連結</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-tempus">
            Connect with café de A
          </h1>
          <p className="text-xs text-gray-500">
            Authentic Hong Kong Café & BBQ · Richmond, BC
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {actions.map((action) => {
            const Component = action.internal ? Link : "a"
            const linkProps = action.internal
              ? { href: action.href }
              : { href: action.href, target: "_blank", rel: "noopener noreferrer" }

            return (
              <Component
                key={action.label}
                {...linkProps}
                className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all ${
                  action.highlight
                    ? "bg-teal-600 border-teal-600 text-white shadow-md hover:bg-teal-500"
                    : "bg-[#faf8f5] border-gray-200 hover:border-teal-500 hover:bg-white text-gray-900 shadow-sm"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    action.highlight
                      ? "bg-white/20 text-white"
                      : "bg-teal-50 text-teal-700 border border-teal-200/50"
                  }`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={`font-bold text-sm block truncate ${
                      action.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {action.label}
                  </span>
                  <span
                    className={`text-xs block font-chinese ${
                      action.highlight ? "text-teal-100" : "text-gray-500"
                    }`}
                  >
                    {action.chinese}
                  </span>
                </div>
                {!action.internal && (
                  <ExternalLink
                    className={`w-3.5 h-3.5 shrink-0 ${
                      action.highlight ? "text-teal-200" : "text-gray-400"
                    }`}
                  />
                )}
              </Component>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-500">
          <p>#3050 - 11666 Steveston Hwy, Richmond, BC V7A 5J3</p>
          <p className="text-teal-700 font-semibold">(604) 276-7800 · Open Daily</p>
        </div>
      </div>
    </div>
  )
}
