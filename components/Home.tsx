"use client"

import Link from "next/link"
import Image from "next/image"
import FeaturedSpecials from "@/components/FeaturedSpecials"
import {
  MapPin, 
  ChevronDown, 
  Phone, 
  Mail, 
  UtensilsCrossed, 
  CalendarDays, 
  ShoppingBag, 
  Clock, 
  Flame, 
  Coffee, 
  Award, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react"

export default function Home() {
  const specialties = [
    {
      icon: Flame,
      title: "Master Roast BBQ",
      chinese: "明爐燒味",
      description:
        "Authentic Cantonese barbecue roasted fresh throughout the day — featuring crispy pork belly, honey-glazed char siu, roasted duck, and tender soy sauce chicken.",
      tag: "Fresh Daily",
    },
    {
      icon: Coffee,
      title: "Classic HK Café Comforts",
      chinese: "經典茶餐",
      description:
        "Signature Hong Kong-style milk tea brewed from premium Ceylon tea leaves, golden French toast with condensed milk, and satay beef noodle soups.",
      tag: "Time-Honored",
    },
    {
      icon: Award,
      title: "Wok Hei Cantonese Cuisine",
      chinese: "鑊氣小炒·生滾粥品",
      description:
        "High-heat wok-tossed Cantonese stir-fries, seafood noodles, comforting hot congee combos with crispy Chinese donuts, and comforting dinner claypots.",
      tag: "Authentic Flavor",
    },
  ]

  const bbqHighlights = [
    { name: "Roasted Duck", chinese: "明爐燒鴨", note: "Crispy skin with aromatic spiced marinade" },
    { name: "BBQ Pork (Char Siu)", chinese: "蜜汁叉燒", note: "Caramelized honey glaze & tender pork collar" },
    { name: "Crispy Pork Belly", chinese: "脆皮燒肉", note: "Golden crackling crust with succulent layers" },
    { name: "Rose Soy Sauce Chicken", chinese: "玫瑰豉油雞", note: "Poached in supreme master soy broth" },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* 1. Hero Section */}
      <section className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col items-center justify-center overflow-hidden bg-[#131720] text-white pt-24 pb-16">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Home/cafedea.jpg"
            alt="café de A restaurant interior in Richmond, BC"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            priority
            quality={90}
          />
          {/* Multi-stage refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131720] via-[#131720]/75 to-[#131720]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center space-y-8 my-auto">
          {/* Bilingual Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-medium tracking-wide shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>AUTHENTIC HONG KONG CAFÉ & BBQ · 正宗港式茶餐廳</span>
          </div>

          {/* Main Title & Slogan */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-tempus leading-tight sm:leading-tight">
              Experience the True Taste of Hong Kong
            </h1>
            <p className="text-base sm:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
              From sizzling wok dishes and signature barbecue meats to traditional milk tea and breakfast combos — prepared fresh daily in Richmond, BC.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-xl mx-auto">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-teal-500/25 transition-all font-tempus"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Explore Our Menu</span>
            </Link>

            <Link
              href="/reservation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 rounded-xl font-semibold text-base backdrop-blur-sm transition-all"
            >
              <CalendarDays className="w-5 h-5 text-teal-300" />
              <span>Reserve a Table</span>
            </Link>

            <Link
              href="/order"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 rounded-xl font-semibold text-base backdrop-blur-sm transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-teal-300" />
              <span>Order Pickup / Delivery</span>
            </Link>

            <a
              href="https://cafedeawaitlist.vercel.app/join"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl font-semibold text-base backdrop-blur-sm transition-all"
            >
              <CalendarDays className="w-5 h-5 text-amber-400" />
              <span>Join Waitlist</span>
            </a>
          </div>

          {/* Live Status Bar */}
          <div className="pt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Open Daily: <strong className="text-white font-medium">8:00 AM – 10:00 PM</strong></span>
              </div>
              <div className="hidden sm:block h-3.5 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Ironwood Plaza, Richmond (Free Parking)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Specials — high visibility for new promotions */}
      <FeaturedSpecials variant="showcase" />

      {/* 3. Restaurant Specialties & Essence */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-teal-700">
              Culinary Heritage · 港式經典
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-tempus">
              The Authentic Cha Chaan Teng Tradition
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              A staple of Hong Kong dining culture, café de A brings you the lively, comforting flavors of authentic café favorites, Cantonese wok stir-fries, and roast barbecue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#faf8f5] rounded-2xl p-8 border border-gray-200/70 hover:border-teal-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-gray-200 rounded-full text-gray-700">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-sm font-medium text-teal-700 font-chinese mt-0.5">{item.chinese}</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200/60">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 group"
                  >
                    <span>Explore in Menu</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Barbecue Meat Specialty Showcase */}
      <section className="py-16 md:py-24 bg-[#faf8f5] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: BBQ Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[420px] sm:h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/Home/bbq2.webp"
                  alt="Authentic Hong Kong Style BBQ and Roast Duck"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 text-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Cantonese Roast</span>
                      <h4 className="font-bold text-lg">Traditional Master BBQ</h4>
                    </div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                      Daily Roast
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: BBQ Description & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-teal-700">
                  Specialty Selection · 招牌明爐燒味
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-tempus">
                  Master Cantonese Barbecue Meats
                </h2>
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Prepared with secret family marinades and slow-roasted to golden perfection in authentic roasting ovens. Available for dine-in combos, rice plates, and custom whole or pound orders for takeout.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {bbqHighlights.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                      <span className="text-xs font-semibold text-teal-700 font-chinese">{item.chinese}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/menu?section=BBQ"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl shadow-md transition-all font-tempus"
                >
                  <span>View Full BBQ Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold rounded-xl transition-colors text-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-teal-600" />
                  <span>Order BBQ Takeout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destination & Action Hub (Location, Dining, Inquiries) */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Location & Hours */}
            <div className="bg-[#faf8f5] rounded-3xl p-8 sm:p-10 border border-gray-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-tempus">Visit café de A</h3>
                    <p className="text-sm text-teal-700 font-chinese">Ironwood Plaza, Richmond · 餐廳位置</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <strong className="text-gray-900 shrink-0">Address:</strong>
                    <span>#3050 - 11666 Steveston Hwy, Richmond, BC V7A 5J3</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="text-gray-900 shrink-0">Phone:</strong>
                    <a href="tel:6042767800" className="text-teal-700 hover:underline font-semibold">
                      (604) 276-7800
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <strong className="text-gray-900 shrink-0">Hours:</strong>
                    <span>Open Daily: 8:00 AM – 10:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-200 flex flex-wrap gap-3">
                <Link
                  href="/location"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl transition-colors font-tempus"
                >
                  <span>View Map & Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:6042767800"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            {/* Card 2: Catering & Inquiries */}
            <div className="bg-[#faf8f5] rounded-3xl p-8 sm:p-10 border border-gray-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-tempus">Catering & Events</h3>
                    <p className="text-sm text-amber-800 font-chinese">Party Trays & Large Orders · 到會服務</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  Planning a family celebration, office lunch, or community event? We provide custom party catering trays, whole BBQ roast pigs, and traditional Cantonese banquet items.
                </p>

                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Custom Hong Kong Café & BBQ party packages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Advance table reservations for larger parties</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-200 flex flex-wrap gap-3">
                <Link
                  href="/reservation"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl transition-colors font-tempus"
                >
                  <span>Reserve a Table</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  <span>Catering & Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
