"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-[#232936] text-white py-8 md:py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-44 h-14">
            <Image
              src="/images/logo.png"
              alt="café de A"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-3 mb-10">
          <a
            href="https://www.instagram.com/cafedea_ironwood/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
            aria-label="Find us on Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61588606623911"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
            aria-label="Find us on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* Three Column Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6">
          {/* Left: Address */}
          <div className="text-center md:text-left flex-1">
            <p className="text-gray-400 text-xs leading-none">
              #3050-11666 Steveston Hwy, Richmond, BC
            </p>
          </div>

          {/* Center: Privacy Policy */}
          <div className="text-center flex-1">
            <Link 
              href="/privacy" 
              className="text-gray-400 text-xs hover:text-teal-400 transition-colors leading-none"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right flex-1">
            <p className="text-gray-500 text-xs leading-none">
              © {new Date().getFullYear()} café de A
            </p>
          </div>
        </div>

        {/* Hidden SEO Navigation */}
        <nav aria-label="Footer navigation" className="hidden">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/location">Location</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
