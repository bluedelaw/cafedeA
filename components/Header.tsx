"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag, Instagram, Facebook } from "lucide-react"

// Navigation items configuration
const navigationItems = [
  { name: "Home", href: "/", description: "Our story" },
  { name: "Menu", href: "/menu", description: "Explore dishes" },
  { name: "Location", href: "/location", description: "Find us" },
  { name: "Contact", href: "/contact", description: "Get in touch" },
] as const

const orderLink = {
  name: "Order Pickup",
  href: "https://h5.posking.ca/#/shop?id=617",
  icon: ShoppingBag,
} as const

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Close mobile menu on scroll
      if (isMenuOpen && window.scrollY > 50) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
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
function useClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))
      
      if (isOutside) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [refs, handler, enabled])
}

function Header() {
  const { isMenuOpen, isScrolled, pathname, toggleMenu, closeMenu } = useHeaderState()
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useClickOutside([navRef, menuButtonRef], closeMenu, isMenuOpen)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#232936]/95 backdrop-blur-md shadow-lg"
            : "bg-[#232936]"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-2 font-tempus"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                    
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    />

                    {/* Hover background */}
                    <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )
              })}
            </nav>

            {/* Mobile: Empty spacer for layout balance */}
            <div className="lg:hidden w-10" />

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 z-10"
              onClick={closeMenu}
            >
              <div className="relative w-48 lg:w-60 h-14 lg:h-18">
                <Image
                  src="/images/logo.png"
                  alt="café de A"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Right: Social Icons & Order Button */}
            <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
              {/* Social Icons */}
              <div className="flex items-center gap-2 mr-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Order Pickup Button */}
              <a
                href={orderLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 font-tempus"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <orderLink.icon className="w-4 h-4" />
                  {orderLink.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </div>

            {/* Mobile Menu Button - Right */}
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="lg:hidden relative z-10 p-2 text-white hover:text-teal-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? (
                  <X className="w-6 h-6 animate-in spin-in-90 duration-300" />
                ) : (
                  <Menu className="w-6 h-6 animate-in spin-in-90 duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          ref={navRef}
          className={`lg:hidden absolute top-full left-0 right-0 bg-[#232936]/98 backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-screen opacity-100 shadow-2xl"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Navigation Items */}
            <ul className="space-y-1 mb-6">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <li
                    key={item.name}
                    className="animate-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`group flex items-center justify-between px-4 py-3 rounded-lg font-tempus transition-all duration-300 ${
                        isActive
                          ? "bg-teal-600/20 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-lg">{item.name}</div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Social Media Links - Mobile */}
            <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b border-white/10">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-300 font-tempus animate-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Order Pickup Button - Mobile */}
            <a
              href={orderLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="group flex flex-col items-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 font-tempus animate-in slide-in-from-bottom duration-300"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center gap-2">
                <orderLink.icon className="w-5 h-5" />
                <span className="text-lg">{orderLink.name}</span>
              </div>
              <span className="text-xs text-teal-100">Pickup Only • Direct Order</span>
            </a>

            {/* Decorative Element */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-center text-xs text-gray-500">
                Open Daily: 8am - 10pm
              </p>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          style={{ top: "64px" }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Header