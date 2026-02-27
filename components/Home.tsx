"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronDown, Sparkles, Phone, Mail, UtensilsCrossed, CalendarDays } from "lucide-react"
import { useEffect, useState } from "react"

function Home() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNextSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const nextSection = (e.currentTarget.closest("section") as HTMLElement)?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const promotionalPosters = [
    {
      image: "/images/Special/Month.webp",
      alt: "This Month's Featured Special",
    },
    {
      image: "/images/Special/Lamb.webp",
      alt: "Seasonal Lamb Brisket Hot Pot",
    },
    {
      image: "/images/Special/ChefRec.webp",
      alt: "Chef's Recommendation",
    },
  ]



  return (
    <div className="overflow-hidden">
      {/* Hero Section - Enhanced with parallax effect */}
<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-20 bg-black">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/Home/cafedea.jpg"
      alt="café de A restaurant interior"
      fill
      className="object-cover"
      priority
      quality={90}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
  </div>

  {/* Content */}
  <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
    <div className="space-y-6 mb-10 md:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
        Experience Authentic Hong Kong Cuisine
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light">
        Where Tradition Meets Culinary Excellence
      </p>
    </div>

{/* CTA Buttons - Unified Teal Color Scheme with Waitlist */}
<div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">

  <Link
    href="/menu"
    className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      View Our Menu
      <ChevronDown className="w-5 h-5 -rotate-90 transition-transform group-hover:translate-x-1" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
  </Link>
  
  <Link
    href="https://cafedeawaitlist.vercel.app/join"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      Join Waitlist
      <CalendarDays className="w-5 h-5 transition-transform group-hover:scale-110" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
  </Link>
</div>
      </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white group"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-75 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </button>
      </section>

      {/* Current Specials Section - Updated to Teal Theme */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-teal-400" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-tempus bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 bg-clip-text text-transparent">
                Current Specials
              </h2>
              <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-teal-400" />
            </div>
            {/* <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Limited time offers crafted by our master chefs
            </p> */}
          </div>

          {/* Specials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {promotionalPosters.map((poster, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Image */}
<div className="relative h-[500px] md:h-[600px] bg-gray-800">
  <Image
    src={poster.image}
    alt={poster.alt}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToNextSection}
            className="block mx-auto mt-14 md:mt-20 text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>
      </section>

      {/* Quick Links Section - Redesigned */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Find Us Card */}
            <Link
              href="/location"
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Map container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.13259539964594!2d-123.09580059956326!3d49.13219505975619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e101f046e8ff%3A0xcb201b822511cf35!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1737688840630!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  title="Restaurant location"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-50 rounded-full">
                    <MapPin className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Find Us</h3>
                    <span className="text-xl text-gray-600">位置</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">Visit our Ironwood location in Richmond, BC</p>
                <div className="inline-flex items-center text-teal-600 font-semibold text-lg">
                  View Location & Hours
                  <ChevronDown className="w-6 h-6 -rotate-90 ml-2" />
                </div>
              </div>
            </Link>

            {/* Contact Us Card */}
            <Link
              href="/contact"
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Gradient header */}
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center overflow-hidden">
                <div className="text-center text-white relative z-10">
                  <div className="flex justify-center gap-6 mb-6">
                    <UtensilsCrossed className="w-12 h-12 md:w-14 md:h-14" />
                    <CalendarDays className="w-12 h-12 md:w-14 md:h-14" />
                    <Mail className="w-12 h-12 md:w-14 md:h-14" />
                  </div>
                  <p className="text-xl md:text-2xl font-semibold mb-2">Catering • Reservations • Inquiries</p>
                  <p className="text-teal-100 text-lg">餐飲服務 • 預訂 • 查詢</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-50 rounded-full">
                    <Phone className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h3>
                    <span className="text-xl text-gray-600">聯繫我們</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">Get in touch for catering, reservations, or questions</p>
                <div className="inline-flex items-center text-teal-600 font-semibold text-lg">
                  Send Us a Message
                  <ChevronDown className="w-6 h-6 -rotate-90 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home