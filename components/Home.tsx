"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, ChevronDown, Sparkles, Phone, Mail, UtensilsCrossed, CalendarDays } from "lucide-react"
import InquiryForm from "./InquiryForm"

function Home() {
  const router = useRouter()

  const scrollToNextSection = (e) => {
    e.preventDefault()
    const nextSection = e.currentTarget.closest("section").nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const menuCategories = [
    { category: "Breakfast", image: "/images/Breakfast/Breakfast1.webp" },
    { category: "Lunch", image: "/images/Lunch/Lunch2.webp" },
    { category: "Dinner", image: "/images/Dinner/Dinner2.webp" },
    { category: "BBQ", image: "/images/BBQ/BBQ1.jpg" },
    { category: "Drinks", image: "/images/Drink/Drink1.webp" },
    // { category: "Specials", image: "/images/Special/Special1.webp" },
  ]

  const featuredSpecials = [
    {
      title: "Peking Duck",
      chineseTitle: "北京烤鴨",
      description: "Whole duck served with pancakes (24hr notice required)",
      price: "$45.99",
      image: "/peking-duck-whole-roasted-crispy-skin-chinese-cuis.jpg",
      badge: "Signature Dish",
    },
    {
      title: "Seafood Hot Pot",
      chineseTitle: "海鮮火鍋",
      description: "Assorted seafood in spicy broth",
      price: "$22.99",
      image: "/chinese-seafood-hot-pot-steaming-spicy-broth.jpg",
      badge: "Chef's Pick",
    },
    {
      title: "Lobster with Ginger & Scallions",
      chineseTitle: "薑蔥龍蝦",
      description: "Fresh lobster in aromatic ginger sauce",
      price: "$29.99",
      image: "/chinese-lobster-ginger-scallions-wok-fried.jpg",
      badge: "Premium",
    },
  ]

  const promotionalPosters = [
    {
      image: "/images/Special/holiday-special.webp",
      alt: "Holiday Special - December 24, 25, 31, January 1",
    },
    {
      image: "/images/Special/weekday-special.webp",
      alt: "Monday to Thursday Special - New York Steak with Prawns and Duck Confit with Salmon $23.95",
    },
    {
      image: "/images/Special/lamb-hotpot-special.webp",
      alt: "Seasonal Lamb Brisket Hot Pot $38.95",
    },
  ]

  return (
    <div className="pt-[54px]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/Home/cafedea.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <img src="/images/logo.png" alt="café de A" className="w-64 md:w-80 mx-auto mb-6" />
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8">Experience authentic Hong Kong cuisine</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-md mx-auto">
            <Link
              href="/menu"
              className="flex-1 bg-white text-gray-900 py-2 md:py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 text-center text-base md:text-lg"
              onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}
            >
              View Menu
            </Link>
            <Link
              href="https://h5.posking.ca/#/shop?id=617"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-teal-600 text-white py-2 md:py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300 text-center text-base md:text-lg"
            >
              Order Takeout
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8 md:w-9 md:h-9" />
        </button>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400 mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-4xl font-bold font-tempus">Current Specials</h2>
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-400 ml-2 md:ml-3" />
            </div>
            {/* <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              Limited time offers you don't want to miss
            </p> */}
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {promotionalPosters.map((poster, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800 hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={poster.image || "/placeholder.svg"}
                  alt={poster.alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToNextSection}
          className="block mx-auto mt-10 md:mt-14 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9" />
        </button>
      </section>

      {/* Quick Links Section - Location & Contact CTAs */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Find Us Card */}
            <Link
              href="/location"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 md:h-56 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.13259539964594!2d-123.09580059956326!3d49.13219505975619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e101f046e8ff%3A0xcb201b822511cf35!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1737688840630!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  title="Restaurant location"
                ></iframe>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl md:text-2xl font-bold">Find Us</h3>
                  <span className="text-lg md:text-xl ml-2">位置</span>
                </div>
                <p className="text-gray-600 mb-4">Visit our Ironwood location in Richmond, BC</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
                  View Location & Hours
                  <ChevronDown className="w-5 h-5 ml-1 -rotate-90" />
                </div>
              </div>
            </Link>
            <Link
              href="/contact"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 md:h-56 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="flex justify-center gap-4 mb-4">
                    <UtensilsCrossed className="w-10 h-10 md:w-12 md:h-12" />
                    <CalendarDays className="w-10 h-10 md:w-12 md:h-12" />
                    <Mail className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <p className="text-lg md:text-xl font-medium">Catering • Reservations • Inquiries</p>
                  <p className="text-teal-200">餐飲服務 • 預訂 • 查詢</p>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-3">
                  <Phone className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-xl md:text-2xl font-bold">Contact Us</h3>
                  <span className="text-lg md:text-xl ml-2">聯繫我們</span>
                </div>
                <p className="text-gray-600 mb-4">Get in touch for catering, reservations, or questions</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Send Us a Message
                  <ChevronDown className="w-5 h-5 ml-1 -rotate-90" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      {/* <InquiryForm /> */}
    </div>
  )
}

export default Home
