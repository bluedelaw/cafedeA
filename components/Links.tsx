"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Star, UtensilsCrossed } from "lucide-react"

const actions = [
  {
    icon: UtensilsCrossed,
    label: "View Menu",
    href: "/menu",
    internal: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/cafedea_richmond/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588606623911",
  },
  {
    icon: Star,
    label: "Leave a Review",
    href: "https://g.page/r/CTXPESWCGyDLEBM/review",
  },
]

function Links() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-64 h-20">
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
        <h1 className="text-2xl font-bold text-center text-gray-900 font-tempus">
          Connect with Café de A
        </h1>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => {
            const Component = action.internal ? Link : 'a'
            const linkProps = action.internal 
              ? { href: action.href }
              : { href: action.href, target: "_blank", rel: "noopener noreferrer" }
            
            return (
              <Component
                key={action.label}
                {...linkProps}
                className="flex flex-col items-center justify-center gap-3 px-6 py-8 bg-white border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all"
              >
                <action.icon className="w-8 h-8 text-teal-600" />
                <span className="text-sm font-semibold text-gray-900 text-center">{action.label}</span>
              </Component>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            #3050-11666 Steveston Hwy, Richmond, BC V7A 5J3
          </p>
        </div>
      </div>
    </div>
  )
}

export default Links
