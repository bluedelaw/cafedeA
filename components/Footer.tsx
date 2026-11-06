"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/reservation", label: "Reserve" },
  { href: "/waitlist", label: "Waitlist" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-charcoal pt-14 pb-10 text-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-3 md:gap-12">
          <div>
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-44">
                <Image src="/images/logo.png" alt="café de A" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">Hong Kong café in Ironwood Plaza, Richmond.</p>
            <p className="mt-2 font-chinese text-sm text-[#e8c9b8]">正宗港式茶餐廳 · 明爐燒味</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/cafedea_ironwood/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588606623911"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-tempus text-sm tracking-wide text-white">Visit</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/70">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-tempus text-sm tracking-wide text-white">Hours &amp; contact</p>
            <address className="mt-4 not-italic text-sm leading-7 text-white/70">
              Daily 8:00 AM – 10:00 PM
              <br />
              #3050 – 11666 Steveston Hwy
              <br />
              Richmond, BC V7A 5J3
              <br />
              <a href="tel:6042767800" className="text-[#e8c9b8] hover:text-white">
                (604) 276-7800
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} café de A. Richmond, BC.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/links" className="hover:text-white">
              Quick Connect
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
