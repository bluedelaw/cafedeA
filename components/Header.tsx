"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram, Facebook, Phone, MapPin, CalendarDays, ShoppingBag } from "lucide-react"

// Navigation items configuration with bilingual subtitles
const navigationItems = [
  { name: "Home", href: "/", description: "Welcome to café de A" },
  { name: "Menu", href: "/menu", description: "Authentic HK dishes & BBQ" },
  { name: "Location", href: "/location", description: "Ironwood Plaza, Richmond" },
  { name: "Contact", href: "/contact", description: "Catering & Inquiries" },
] as const

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href))
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cafedea_ironwood/",
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

  const isReservePage = isCurrentPath(pathname, "/reservation")
  const isOrderPage = isCurrentPath(pathname, "/order")

  useClickOutside([navRef, menuButtonRef], closeMenu, isMenuOpen)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isMenuOpen, closeMenu])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b bg-espresso transition-colors duration-200 max-lg:backdrop-blur-none ${
          isScrolled ? "border-white/10" : "border-white/5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            {/* Left: Brand Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c41e3a] rounded-lg py-1 max-w-[60%]"
              onClick={closeMenu}
              aria-label="café de A Homepage"
            >
              <div className="relative h-10 w-32 sm:h-11 sm:w-40 lg:h-12 lg:w-44">
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
            <nav className="pointer-events-none absolute inset-x-0 hidden lg:flex items-center justify-center gap-0.5 xl:gap-1">
              {navigationItems.map((item) => {
                const isActive = isCurrentPath(pathname, item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`pointer-events-auto relative whitespace-nowrap px-2.5 py-2 font-medium text-sm xl:px-3.5 ${
                      isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#c41e3a] rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Actions */}
            <div className="relative z-10 hidden lg:flex items-center gap-3">
              <Link
                href="/reservation"
                className={`relative inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  isReservePage
                    ? "border-[#c41e3a]/70 bg-white/15 text-white"
                    : "border-white/15 bg-white/10 text-gray-200 hover:border-white/30 hover:bg-white/15 hover:text-white"
                }`}
                aria-current={isReservePage ? "page" : undefined}
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#e8c9b8]" />
                <span>Reserve</span>
                {isReservePage ? <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#c41e3a]" /> : null}
              </Link>
              <Link
                href="/order"
                className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm font-tempus transition-all ${
                  isOrderPage ? "bg-[#a31830]" : "bg-[#c41e3a] hover:bg-[#a31830] hover:shadow"
                }`}
                aria-current={isOrderPage ? "page" : undefined}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
                {isOrderPage ? <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-white" /> : null}
              </Link>
            </div>

            {/* Mobile: Reserve + Order + menu */}
            <div className="flex lg:hidden items-center gap-1.5">
              <Link
                href="/reservation"
                className={`relative inline-flex min-h-9 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold text-white transition-colors ${
                  isReservePage
                    ? "border-[#c41e3a]/70 bg-white/15"
                    : "border-white/25 bg-white/10 hover:bg-white/15"
                }`}
                aria-current={isReservePage ? "page" : undefined}
              >
                <CalendarDays className="hidden sm:block w-3.5 h-3.5" />
                <span>Reserve</span>
              </Link>
              <Link
                href="/order"
                className={`inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white transition-colors ${
                  isOrderPage ? "bg-[#a31830]" : "bg-[#c41e3a] hover:bg-[#a31830]"
                }`}
                aria-current={isOrderPage ? "page" : undefined}
              >
                <ShoppingBag className="hidden sm:block w-3.5 h-3.5" />
                <span>Order</span>
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  toggleMenu()
                }}
                className="relative z-20 p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c41e3a]"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 top-[var(--site-header-height)] bg-black/60 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
          aria-hidden={!isMenuOpen}
        />

        <nav
          ref={navRef}
          id="mobile-nav"
          className={`lg:hidden fixed top-[var(--site-header-height)] right-0 bottom-0 w-full max-w-md bg-espresso border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out ${
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
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl font-semibold text-sm shadow-md transition-colors ${
                  isOrderPage ? "bg-[#a31830] text-white ring-2 ring-white/40" : "bg-[#c41e3a] hover:bg-[#a31830] text-white"
                }`}
                aria-current={isOrderPage ? "page" : undefined}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order</span>
              </Link>

              <Link
                href="/reservation"
                onClick={closeMenu}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl font-semibold text-sm transition-colors ${
                  isReservePage
                    ? "bg-white/15 text-white border border-[#c41e3a]"
                    : "bg-white/10 hover:bg-white/15 text-white border border-[#c41e3a]/40"
                }`}
                aria-current={isReservePage ? "page" : undefined}
              >
                <CalendarDays className="w-5 h-5 text-[#e8c9b8]" />
                <span>Reserve</span>
              </Link>

              <Link
                href="/waitlist"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl font-semibold text-sm transition-colors"
              >
                <CalendarDays className="w-5 h-5 text-amber-300" />
                <span>Waitlist</span>
              </Link>
            </div>

            {/* Navigation links list */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = isCurrentPath(pathname, item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between p-3.5 min-h-[3.25rem] rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#c41e3a]/20 text-[#e8c9b8] border border-[#c41e3a]/40"
                        : "text-gray-200 hover:bg-white/5 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div>
                      <span className="font-semibold text-base">{item.name}</span>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#c41e3a]" />}
                  </Link>
                )
              })}
            </div>

            {/* Quick Contact & Directions */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <a
                href="tel:6042767800"
                className="flex items-center gap-3 text-sm text-[#e8c9b8] hover:text-white font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#e8c9b8]">
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
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#e8c9b8]">
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
          <div className="p-6 border-t border-white/10 bg-espresso text-center space-y-3">
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-[#e8c9b8] hover:bg-white/5 rounded-lg transition-colors"
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
