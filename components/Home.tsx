"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronDown, Sparkles, Phone, Mail, UtensilsCrossed, CalendarDays, Clock, Award, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

function Home() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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

  const highlights = [
    {
      icon: Award,
      title: "Authentic",
      subtitle: "Hong Kong Cuisine",
      description: "Traditional recipes passed down through generations",
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      subtitle: "Quality Ingredients",
      description: "Sourced locally and prepared with care",
    },
    {
      icon: UtensilsCrossed,
      title: "Expert Chefs",
      subtitle: "Culinary Excellence",
      description: "Crafted by experienced Hong Kong chefs",
    },
  ]

  return (
    <div className="pt-[54px] overflow-hidden">
      {/* Hero Section - Enhanced with parallax effect */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-20 bg-black">
        {/* Background with parallax */}
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
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

        {/* Animated content */}
        <div
          className={`relative z-20 text-center text-white px-4 max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo with fade-in animation */}
          <div className="mb-8 animate-fade-in">
            <Image
              src="/images/logo.png"
              alt="café de A"
              width={320}
              height={100}
              className="w-64 md:w-80 mx-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline with staggered animation */}
          <div className="space-y-4 mb-10 md:mb-12">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Experience Authentic Hong Kong Cuisine
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl text-gray-200 font-light transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Where Tradition Meets Culinary Excellence
            </p>
          </div>

          {/* CTA Buttons - Unified Teal Color Scheme */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto mb-12 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
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
              href="https://h5.posking.ca/#/shop?id=617"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Pickup
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </div>

          {/* Highlights Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-20 md:mb-16">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className={`backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 transition-all duration-1000 hover:bg-white/20 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + idx * 100}ms` }}
              >
                <item.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-teal-300" />
                <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                <p className="text-teal-200 font-medium mb-2">{item.subtitle}</p>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white group animate-bounce"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium opacity-75 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
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
              <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-teal-400 animate-pulse" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-tempus bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 bg-clip-text text-transparent">
                Current Specials
              </h2>
              <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-teal-400 animate-pulse" />
            </div>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Limited time offers crafted by our master chefs
            </p>
          </div>

          {/* Specials Grid - Enhanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {promotionalPosters.map((poster, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                {/* Card glow effect - now teal */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Image container */}
<div className="relative h-[500px] md:h-[600px] bg-gray-800">
  <Image
    src={poster.image}
    alt={poster.alt}
    fill
    className="object-cover transition-transform duration-700 group-hover:scale-110"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
</div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 z-20">
                  <p className="text-white text-center font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {poster.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToNextSection}
            className="block mx-auto mt-14 md:mt-20 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10 animate-bounce" />
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
            {/* Find Us Card - Enhanced */}
            <Link
              href="/location"
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Map container with overlay */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.13259539964594!2d-123.09580059956326!3d49.13219505975619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e101f046e8ff%3A0xcb201b822511cf35!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1737688840630!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  title="Restaurant location"
                  className="transition-all duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                    <MapPin className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Find Us</h3>
                    <span className="text-xl text-gray-600">位置</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">Visit our Ironwood location in Richmond, BC</p>
                <div className="inline-flex items-center text-teal-600 font-semibold text-lg group-hover:gap-3 transition-all">
                  View Location & Hours
                  <ChevronDown className="w-6 h-6 -rotate-90 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Contact Us Card - Enhanced */}
            <Link
              href="/contact"
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient header */}
              <div className="relative h-64 md:h-72 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-75" />
                </div>

                <div className="text-center text-white relative z-10">
                  <div className="flex justify-center gap-6 mb-6">
                    <UtensilsCrossed className="w-12 h-12 md:w-14 md:h-14 animate-float" />
                    <CalendarDays className="w-12 h-12 md:w-14 md:h-14 animate-float delay-100" />
                    <Mail className="w-12 h-12 md:w-14 md:h-14 animate-float delay-200" />
                  </div>
                  <p className="text-xl md:text-2xl font-semibold mb-2">Catering • Reservations • Inquiries</p>
                  <p className="text-teal-100 text-lg">餐飲服務 • 預訂 • 查詢</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                    <Phone className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h3>
                    <span className="text-xl text-gray-600">聯繫我們</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">Get in touch for catering, reservations, or questions</p>
                <div className="inline-flex items-center text-teal-600 font-semibold text-lg group-hover:gap-3 transition-all">
                  Send Us a Message
                  <ChevronDown className="w-6 h-6 -rotate-90 ml-2 group-hover:translate-x-2 transition-transform" />
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