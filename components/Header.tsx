"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram, Facebook, Phone, MapPin, Clock, ExternalLink, CalendarDays, ShoppingBag } from "lucide-react"

// Navigation items configuration with bilingual subtitles
const navigationItems = [
  { name: "Home", chinese: "主頁", href: "/", description: "Welcome to café de A" },
  { name: "Menu", chinese: "菜單", href: "/menu", description: "Authentic HK dishes & BBQ" },
  { name: "Order", chinese: "點餐", href: "/order", description: "Pickup & Delivery" },
  { name: "Reserve", chinese: "訂座", href: "/reservation", description: "Book a table online" },
  { name: "Location", chinese: "位置及營業時間", href: "/location", description: "Ironwood Plaza, Richmond" },
  { name: "Contact", chinese: "聯絡我們", href: "/contact", description: "Catering & Inquiries" },
] as const

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cafedea_richmond/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588606623911",
    icon: Facebook,
  },
] as const

// Custom hook for header state management
function useHeaderState() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMenuOpenRef = useRef(isMenuOpen)

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen
  }, [isMenuOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)

      // Close mobile menu on substantial scroll
      if (isMenuOpenRef.current && window.scrollY > 60) {
        setIsMenuOpen(false)
        document.body.style.overflow = ""
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return {
    isMenuOpen,
    isScrolled,
    pathname,
    toggleMenu,
    closeMenu,
  }
}

// Custom hook for click outside detection
function useClickOutside(refs: React.RefObject<HTMLElement | null>[], handler: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))

      if (isOutside) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [refs, handler, enabled])
}

export default function Header() {
  const { isMenuOpen, isScrolled, pathname, toggleMenu, closeMenu } = useHeaderState()
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useClickOutside([navRef, menuButtonRef], closeMenu, isMenuOpen)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1d232e] border-b max-lg:backdrop-blur-none ${
          isScrolled
            ? "lg:backdrop-blur-md shadow-md py-0 border-white/10"
            : "border-white/5"
        }`}
      >
        {/* Top Info Bar (Desktop & Tablet landscape) */}
        <div className="hidden md:block bg-[#161a22] text-xs text-gray-300 border-b border-white/5 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex items-center justify-between max-w-7xl">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>#3050-11666 Steveston Hwy, Richmond, BC (Ironwood Plaza)</span>
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Open Daily: 8:00 AM – 10:00 PM</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:6042767800"
                className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>(604) 276-7800</span>
              </a>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-teal-300 transition-colors"
                    aria-label={`Follow on ${social.name}`}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg py-1 max-w-[60%]"
              onClick={closeMenu}
              aria-label="café de A Homepage"
            >
              <div className="relative w-40 sm:w-48 lg:w-56 h-12 lg:h-14">
                <Image
                  src="/images/logo.png"
                  alt="café de A"
                  fill
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-2.5 xl:px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/10 shadow-sm"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <span className="text-xs text-teal-400 font-normal font-chinese opacity-90">{item.chinese}</span>
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-400 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://cafedeawaitlist.vercel.app/join"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-200 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors"
              >
                <CalendarDays className="w-3.5 h-3.5 text-teal-300" />
                <span>Join Waitlist</span>
              </a>

              {/* Order Online CTA */}
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all font-tempus"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                toggleMenu()
              }}
              className="relative z-20 lg:hidden p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 top-16 md:top-[97px] bg-black/60 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
          aria-hidden={!isMenuOpen}
        />

        <nav
          ref={navRef}
          className={`lg:hidden fixed top-16 md:top-[97px] right-0 bottom-0 w-full max-w-md bg-[#1a1f29] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
          }`}
          aria-label="Mobile Navigation"
          aria-hidden={!isMenuOpen}
        >
          <div className="p-6 space-y-6">
            {/* Fast Order & Waitlist CTA cards */}
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/order"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-sm shadow-md transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order</span>
                <span className="text-[11px] text-teal-100 font-normal">點餐</span>
              </Link>

              <Link
                href="/reservation"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white/10 hover:bg-white/15 text-white border border-teal-500/40 rounded-xl font-semibold text-sm transition-colors"
              >
                <CalendarDays className="w-5 h-5 text-teal-300" />
                <span>Reserve</span>
                <span className="text-[11px] text-gray-300 font-normal">訂座</span>
              </Link>

              <a
                href="https://cafedeawaitlist.vercel.app/join"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl font-semibold text-sm transition-colors"
              >
                <CalendarDays className="w-5 h-5 text-amber-300" />
                <span>Waitlist</span>
                <span className="text-[11px] text-gray-300 font-normal">排隊</span>
              </a>
            </div>

            {/* Navigation links list */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between p-3.5 rounded-xl transition-colors ${
                      isActive
                        ? "bg-teal-900/40 text-teal-300 border border-teal-500/30"
                        : "text-gray-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base">{item.name}</span>
                        <span className="text-xs text-teal-400 font-chinese">{item.chinese}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-teal-400" />}
                  </Link>
                )
              })}
            </div>

            {/* Quick Contact & Directions */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <a
                href="tel:6042767800"
                className="flex items-center gap-3 text-sm text-teal-300 hover:text-teal-200 font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-950/60 border border-teal-800 flex items-center justify-center text-teal-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Call restaurant</div>
                  <div className="font-semibold">(604) 276-7800</div>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/cWFJu98tEtuGss9J9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-teal-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-400">Ironwood Plaza, Richmond</div>
                  <div className="text-xs text-gray-300 truncate">#3050-11666 Steveston Hwy</div>
                </div>
              </a>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-white/10 bg-[#131720] text-center space-y-3">
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Open Daily: 8:00 AM – 10:00 PM
            </p>
          </div>
        </nav>
      </header>
    </>
  )
}
