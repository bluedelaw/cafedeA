"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Location", href: "/location" },
  { name: "Order Takeout", href: "https://h5.posking.ca/#/shop?id=617", target: "_blank", rel: "noopener noreferrer" },
  // { name: "Bubble Tea", href: "/bubble-tea" },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollDirection, setScrollDirection] = useState(null)
  const navRef = useRef(null)
  const menuButtonRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const handleScroll = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? "down" : "up"
      if (direction !== scrollDirection) {
        setIsVisible(direction === "up")
      }
      setIsScrolled(scrollY > 10)
      lastScrollY = scrollY > 0 ? scrollY : 0
      setScrollDirection(direction)

      // Close menu on scroll
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollDirection, isMenuOpen])

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm ${isScrolled ? (isVisible ? "bg-black/80 shadow-md" : "bg-transparent") : "bg-black/90"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center font-tempus">
        <Link href="/">
          <img src="/images/logo.png" alt="café de A logo" className="w-32 h-auto" />
        </Link>
        <nav
          ref={navRef}
          className={`lg:flex ${isMenuOpen ? "block" : "hidden"} absolute lg:relative top-[100%] left-0 w-full lg:w-auto bg-black lg:bg-transparent z-50`}
        >
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 p-4 lg:p-0">
            {menuItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <li key={item.name}>
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target={item.target || "_blank"}
                      rel={item.rel || "noopener noreferrer"}
                      className={`text-white inline-block py-2 lg:py-0 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                        }`}

                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-white inline-block py-2 lg:py-0 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                        }`}

                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 lg:hidden transition-colors duration-200"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
