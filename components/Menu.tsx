"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ShoppingBag,
  Clock,
  Coffee,
  Flame,
  Utensils,
  Sparkles,
  Printer,
  Info,
  CheckCircle2,
  Phone,
  LayoutGrid,
  FileText
} from "lucide-react"

// Types for parsed JSON menu
interface MenuItem {
  id?: string | number
  name?: string
  chineseName?: string
  englishName?: string
  price?: string
  halfPrice?: string
  wholePrice?: string
  hotPrice?: string
  coldPrice?: string
  size?: string
  description?: string
  chineseDescription?: string
  image?: string
  sides?: Array<{ name?: string; options?: string[] }>
  addons?: Array<{ name?: string; price?: string }>
}

interface MenuSectionGroup {
  id?: string | number
  name?: string
  chineseName?: string
  category?: string
  chineseCategory?: string
  price?: string
  note?: string
  bottomNote?: string
  description?: string
  subtitle?: string
  availableTime?: string
  cookingMethods?: Array<{ name?: string; chineseName?: string }>
  subItems?: Array<{ name?: string; chineseName?: string; englishName?: string; price?: string }>
  items?: MenuItem[]
}

interface MenuCategoryData {
  name?: string
  chineseName?: string
  subtitle?: string
  englishSubtitle?: string
  subtitleChinese?: string
  note?: string
  price?: string
  items?: MenuItem[]
  sections?: MenuSectionGroup[]
  type?: string
  posters?: Array<{ image: string; alt: string }>
}

interface MenuData {
  [key: string]: MenuCategoryData
}

// Scanned Menu Pages Configuration
interface ScannedPage {
  id: number
  imgSrc: string
  alt: string
}

interface ScannedSection {
  id: string
  name: string
  chinese: string
  images: ScannedPage[]
}

const scannedSections: ScannedSection[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    chinese: "早餐",
    images: [
      { id: 1, imgSrc: "/images/Breakfast/Breakfast1.jpg", alt: "Breakfast menu page 1" },
      { id: 2, imgSrc: "/images/Breakfast/Breakfast2.jpg", alt: "Breakfast menu page 2" },
    ],
  },
  {
    id: "lunch",
    name: "Lunch",
    chinese: "午餐",
    images: [
      { id: 1, imgSrc: "/images/Lunch/Lunch2.webp", alt: "Lunch menu page 1" },
      { id: 2, imgSrc: "/images/Lunch/Lunch3.webp", alt: "Lunch menu page 2" },
      { id: 3, imgSrc: "/images/Lunch/Lunch4.webp", alt: "Lunch menu page 3" },
      { id: 4, imgSrc: "/images/Lunch/Lunch5.webp", alt: "Lunch menu page 4" },
      { id: 5, imgSrc: "/images/Lunch/Lunch6.webp", alt: "Lunch menu page 5" },
    ],
  },
  {
    id: "afternoon-tea",
    name: "Afternoon Tea",
    chinese: "下午茶",
    images: [
      { id: 1, imgSrc: "/images/AfternoonTea/Afternoon1LQ.webp", alt: "Afternoon tea menu" },
    ],
  },
  {
    id: "dinner",
    name: "Dinner",
    chinese: "晚餐",
    images: [
      { id: 1, imgSrc: "/images/Dinner/Dinner1.webp", alt: "Dinner menu page 1" },
      { id: 2, imgSrc: "/images/Dinner/Dinner2.webp", alt: "Dinner menu page 2" },
      { id: 3, imgSrc: "/images/Dinner/Dinner3.webp", alt: "Dinner menu page 3" },
      { id: 4, imgSrc: "/images/Dinner/Dinner4.webp", alt: "Dinner menu page 4" },
      { id: 5, imgSrc: "/images/Dinner/Dinner5.webp", alt: "Dinner menu page 5" },
      { id: 6, imgSrc: "/images/Dinner/Dinner6.webp", alt: "Dinner menu page 6" },
      { id: 7, imgSrc: "/images/Dinner/Dinner7.webp", alt: "Dinner menu page 7" },
    ],
  },
  {
    id: "bbq",
    name: "Barbecue (BBQ)",
    chinese: "港式燒味",
    images: [
      { id: 1, imgSrc: "/images/BBQ/BBQ1.webp", alt: "BBQ menu page 1" },
      { id: 2, imgSrc: "/images/BBQ/BBQ2.webp", alt: "BBQ menu page 2" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks & Beverages",
    chinese: "港式特飲",
    images: [
      { id: 1, imgSrc: "/images/Drink/Drink.jpg", alt: "Drinks menu page 1" },
    ],
  },
  {
    id: "specials",
    name: "Chef Specials",
    chinese: "廚師推介",
    images: [
      { id: 1, imgSrc: "/images/Special/Month.webp", alt: "Monthly specials" },
      { id: 2, imgSrc: "/images/Special/ChefRec.webp", alt: "Chef's recommendation" },
    ],
  },
]

// Category configuration for navigation tabs
const categoryNavItems = [
  { id: "breakfast", label: "Breakfast", chinese: "早餐", time: "8am–11am", icon: Coffee },
  { id: "lunch", label: "Lunch", chinese: "午餐", time: "11am–5pm", icon: Utensils },
  { id: "afternoon-tea", label: "Afternoon Tea", chinese: "下午茶", time: "2:30pm–5pm", icon: Coffee },
  { id: "dinner", label: "Dinner", chinese: "晚餐", time: "5pm–Close", icon: Utensils },
  { id: "bbq", label: "BBQ Meats", chinese: "港式燒味", time: "All Day", icon: Flame },
  { id: "drinks", label: "Drinks", chinese: "港式特飲", time: "All Day", icon: Coffee },
  { id: "specials", label: "Specials", chinese: "廚師推介", time: "Limited Time", icon: Sparkles },
]

export default function Menu() {
  const searchParams = useSearchParams()
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"text" | "scans">("text")

  // Modal state for scan gallery zoom
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    sectionId: string
    imageIndex: number
  }>({
    isOpen: false,
    sectionId: "breakfast",
    imageIndex: 0,
  })

  // Fetch menu JSON
  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true)
        const res = await fetch("/menu.json")
        if (res.ok) {
          const data = await res.json()
          setMenuData(data)
        }
      } catch (e) {
        console.error("Failed to load menu.json", e)
      } finally {
        setIsLoading(false)
      }
    }
    loadMenu()
  }, [])

  // Sync with URL params (e.g., ?section=BBQ or ?view=scans)
  useEffect(() => {
    const sectionParam = searchParams.get("section")
    const viewParam = searchParams.get("view")

    if (sectionParam) {
      const match = categoryNavItems.find(
        (c) => c.id.toLowerCase() === sectionParam.toLowerCase() || c.label.toLowerCase() === sectionParam.toLowerCase()
      )
      if (match) {
        setActiveCategory(match.id)
      }
    }

    if (viewParam === "scans") {
      setViewMode("scans")
    }
  }, [searchParams])

  // Lightbox navigation handlers
  const openModal = useCallback((sectionId: string, imageIndex: number) => {
    setModalState({ isOpen: true, sectionId, imageIndex })
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const navigateImage = useCallback((direction: "next" | "prev") => {
    setModalState((prev) => {
      const section = scannedSections.find((s) => s.id === prev.sectionId)
      if (!section) return prev

      const total = section.images.length
      let newIdx = prev.imageIndex

      if (direction === "next") {
        newIdx = (prev.imageIndex + 1) % total
      } else {
        newIdx = (prev.imageIndex - 1 + total) % total
      }

      return { ...prev, imageIndex: newIdx }
    })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!modalState.isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalState.isOpen, navigateImage, closeModal])

  // Current category data
  const currentCategoryData = menuData ? menuData[activeCategory] : null
  const currentScannedSection = scannedSections.find((s) => s.id === activeCategory) || scannedSections[0]

  // Global search filtering across all categories
  const searchResults = useMemo(() => {
    if (!menuData || !searchQuery.trim()) return null
    const q = searchQuery.toLowerCase().trim()

    const results: Array<{
      categoryKey: string
      categoryName: string
      sectionName?: string
      item: MenuItem
    }> = []

    Object.entries(menuData).forEach(([catKey, catData]) => {
      const catName = catData.name || catKey

      // 1. Direct items in category
      catData.items?.forEach((item) => {
        const textToSearch = `${item.name || ""} ${item.chineseName || ""} ${item.englishName || ""} ${item.description || ""} ${item.id || ""}`.toLowerCase()
        if (textToSearch.includes(q)) {
          results.push({ categoryKey: catKey, categoryName: catName, item })
        }
      })

      // 2. Items inside sections
      catData.sections?.forEach((sec) => {
        const secName = sec.name || sec.category || ""
        const secChinese = sec.chineseName || sec.chineseCategory || ""
        const fullSecTitle = `${secName} ${secChinese}`

        // Check if section itself is an item (e.g. Breakfast A, B, C)
        if (sec.description) {
          const secText = `${secName} ${secChinese} ${sec.description}`.toLowerCase()
          if (secText.includes(q)) {
            results.push({
              categoryKey: catKey,
              categoryName: catName,
              sectionName: fullSecTitle,
              item: {
                id: sec.id,
                name: sec.name,
                chineseName: sec.chineseName,
                price: sec.price,
                description: sec.description,
              },
            })
          }
        }

        // Check items in section
        sec.items?.forEach((item) => {
          const textToSearch = `${item.name || ""} ${item.chineseName || ""} ${item.englishName || ""} ${item.description || ""} ${item.id || ""}`.toLowerCase()
          if (textToSearch.includes(q)) {
            results.push({ categoryKey: catKey, categoryName: catName, sectionName: fullSecTitle, item })
          }
        })

        // Check subItems in section
        sec.subItems?.forEach((sub) => {
          const textToSearch = `${sub.name || ""} ${sub.chineseName || ""} ${sub.englishName || ""}`.toLowerCase()
          if (textToSearch.includes(q)) {
            results.push({
              categoryKey: catKey,
              categoryName: catName,
              sectionName: fullSecTitle,
              item: {
                name: sub.name,
                chineseName: sub.chineseName,
                englishName: sub.englishName,
                price: sub.price,
              },
            })
          }
        })
      })
    })

    return results
  }, [menuData, searchQuery])

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 pt-24 md:pt-28 pb-20">
      {/* 1. Page Header & View Mode Switcher */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>AUTHENTIC HONG KONG RECIPES · 港式美饌</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-tempus text-gray-900">
              Restaurant Menu
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Freshly prepared Cantonese specialties, barbecue meats, comforting combos, and traditional tea beverages.
            </p>
          </div>

          {/* View Mode & Order Action */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
              <button
                onClick={() => setViewMode("text")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "text"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Interactive Menu</span>
              </button>
              <button
                onClick={() => setViewMode("scans")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "scans"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Menu Scans (圖文版)</span>
              </button>
            </div>

            {/* Direct Order Link */}
            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Pickup</span>
            </Link>
          </div>
        </div>

        {/* 2. Search Bar */}
        <div className="mt-6 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes by name in English or Chinese (e.g. Satay Beef, 叉燒, Milk Tea, Congee, 炒飯)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Search Results Overlay or Normal Category Navigation */}
      {searchQuery.trim() && searchResults ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Search Results for "{searchQuery}" ({searchResults.length} {searchResults.length === 1 ? "item" : "items"})
              </h2>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-teal-600 hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-gray-500 space-y-2">
                <p className="text-base font-medium">No dishes found matching "{searchQuery}".</p>
                <p className="text-xs">Try searching for ingredients like "beef", "duck", "noodle", or Chinese keywords like "飯", "麵", "雞".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#faf8f5] border border-gray-200/80 hover:border-teal-500 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                          {res.categoryName} {res.sectionName ? `· ${res.sectionName}` : ""}
                        </span>
                        {(res.item.price || res.item.halfPrice || res.item.wholePrice) && (
                          <span className="font-bold text-teal-700 text-sm">
                            {res.item.price || res.item.halfPrice || res.item.wholePrice}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-gray-900 text-base leading-snug">
                        {res.item.name || res.item.englishName}
                      </h3>
                      {res.item.chineseName && (
                        <p className="text-sm text-gray-600 font-chinese mt-0.5 font-medium">
                          {res.item.chineseName}
                        </p>
                      )}

                      {res.item.description && (
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed whitespace-pre-line line-clamp-3">
                          {res.item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Sticky Category Tabs Bar */}
          <div className="sticky top-16 lg:top-20 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-y border-gray-200 shadow-sm py-3 mb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
                {categoryNavItems.map((cat) => {
                  const isActive = activeCategory === cat.id
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id)
                        const elem = document.getElementById(`category-content-${cat.id}`)
                        if (elem) {
                          const yOffset = -140
                          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset
                          window.scrollTo({ top: y, behavior: "smooth" })
                        }
                      }}
                      className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-teal-600 text-white shadow-md font-semibold scale-105"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-teal-200" : "text-teal-600"}`} />
                      <span>{cat.label}</span>
                      <span className={`font-chinese text-xs ${isActive ? "text-teal-100" : "text-gray-500"}`}>
                        {cat.chinese}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {viewMode === "text" ? (
              /* INTERACTIVE TEXT VIEW */
              <div id={`category-content-${activeCategory}`} className="space-y-10">
                {/* Category Header Banner */}
                {currentCategoryData && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-tempus">
                            {currentCategoryData.name}
                          </h2>
                          {currentCategoryData.chineseName && (
                            <span className="text-xl sm:text-2xl text-teal-700 font-chinese font-bold">
                              {currentCategoryData.chineseName}
                            </span>
                          )}
                        </div>

                        {currentCategoryData.englishSubtitle && (
                          <p className="text-sm font-semibold text-gray-700 mt-2">
                            {currentCategoryData.englishSubtitle}
                          </p>
                        )}
                        {currentCategoryData.subtitleChinese && (
                          <p className="text-xs text-teal-700 font-chinese mt-0.5">
                            {currentCategoryData.subtitleChinese}
                          </p>
                        )}
                        {currentCategoryData.subtitle && !currentCategoryData.englishSubtitle && (
                          <p className="text-sm text-gray-600 mt-1">{currentCategoryData.subtitle}</p>
                        )}
                        {currentCategoryData.note && (
                          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium">
                            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span>{currentCategoryData.note}</span>
                          </div>
                        )}
                      </div>

                      {currentCategoryData.price && (
                        <div className="shrink-0 p-3 bg-teal-50 border border-teal-200 rounded-xl text-center">
                          <span className="text-xs text-teal-700 uppercase font-semibold">Special Set Price</span>
                          <div className="text-xl font-bold text-teal-800">{currentCategoryData.price}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 1. Direct Items in Category */}
                {currentCategoryData?.items && currentCategoryData.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentCategoryData.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-sm hover:border-teal-500/60 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              {item.id && (
                                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 mb-1">
                                  #{item.id}
                                </span>
                              )}
                              <h3 className="font-bold text-gray-900 text-base leading-snug">
                                {item.name || item.englishName}
                              </h3>
                              {item.chineseName && (
                                <p className="text-sm text-teal-700 font-chinese font-semibold mt-0.5">
                                  {item.chineseName}
                                </p>
                              )}
                            </div>

                            {item.price && (
                              <span className="font-bold text-teal-700 text-base shrink-0 bg-teal-50 px-2.5 py-1 rounded-lg">
                                {item.price}
                              </span>
                            )}
                          </div>

                          {item.description && (
                            <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed pt-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Multi-price options like Half/Whole or Hot/Cold */}
                        {(item.halfPrice || item.wholePrice || item.hotPrice || item.coldPrice) && (
                          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
                            {item.hotPrice && (
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                Hot: <strong className="text-gray-900">{item.hotPrice}</strong>
                              </span>
                            )}
                            {item.coldPrice && (
                              <span className="px-2 py-0.5 bg-blue-50 rounded text-blue-800">
                                Cold: <strong className="text-blue-900">{item.coldPrice}</strong>
                              </span>
                            )}
                            {item.halfPrice && (
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                Half: <strong className="text-gray-900">{item.halfPrice}</strong>
                              </span>
                            )}
                            {item.wholePrice && (
                              <span className="px-2 py-0.5 bg-amber-50 rounded text-amber-800">
                                Whole: <strong className="text-amber-900">{item.wholePrice}</strong>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Structured Sections in Category */}
                {currentCategoryData?.sections && currentCategoryData.sections.length > 0 && (
                  <div className="space-y-8">
                    {currentCategoryData.sections.map((section, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6"
                      >
                        {/* Section Title Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                          <div>
                            <div className="flex items-center gap-3">
                              {section.id && (
                                <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                                  {section.id}
                                </span>
                              )}
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {section.name || section.category}
                                </h3>
                                {(section.chineseName || section.chineseCategory) && (
                                  <p className="text-sm font-semibold text-teal-700 font-chinese mt-0.5">
                                    {section.chineseName || section.chineseCategory}
                                  </p>
                                )}
                              </div>
                            </div>

                            {section.note && (
                              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mt-2 inline-block font-medium">
                                {section.note}
                              </p>
                            )}
                          </div>

                          {section.price && (
                            <div className="font-bold text-teal-700 text-xl bg-teal-50 px-3 py-1.5 rounded-xl self-start sm:self-center">
                              {section.price}
                            </div>
                          )}
                        </div>

                        {/* Section Description (e.g. choice of eggs/toast) */}
                        {section.description && (
                          <div className="p-4 rounded-xl bg-[#faf8f5] border border-gray-200/80 text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {section.description}
                          </div>
                        )}

                        {/* Items under section */}
                        {section.items && section.items.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="p-4 rounded-xl bg-[#faf8f5] border border-gray-200/70 hover:border-teal-500/50 hover:bg-white transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      {item.id && (
                                        <span className="text-[10px] font-bold text-gray-500 block mb-0.5">
                                          #{item.id}
                                        </span>
                                      )}
                                      <h4 className="font-bold text-gray-900 text-sm leading-snug">
                                        {item.name || item.englishName}
                                      </h4>
                                      {item.chineseName && (
                                        <p className="text-xs font-semibold text-teal-700 font-chinese mt-0.5">
                                          {item.chineseName}
                                        </p>
                                      )}
                                    </div>
                                    {item.price && (
                                      <span className="font-bold text-teal-700 text-sm shrink-0">
                                        {item.price}
                                      </span>
                                    )}
                                  </div>

                                  {item.description && (
                                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                      {item.description}
                                    </p>
                                  )}
                                </div>

                                {(item.halfPrice || item.wholePrice || item.hotPrice || item.coldPrice) && (
                                  <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex flex-wrap gap-1.5 text-[11px]">
                                    {item.hotPrice && <span className="text-gray-700">Hot: {item.hotPrice}</span>}
                                    {item.coldPrice && <span className="text-blue-700">Cold: {item.coldPrice}</span>}
                                    {item.halfPrice && <span className="text-gray-700">Half: {item.halfPrice}</span>}
                                    {item.wholePrice && <span className="text-amber-800">Whole: {item.wholePrice}</span>}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Subitems under section (e.g. Congee add-ons, fried noodles) */}
                        {section.subItems && section.subItems.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                              Combo Options & Selections
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {section.subItems.map((sub, subIdx) => (
                                <div
                                  key={subIdx}
                                  className="p-3 bg-[#faf8f5] rounded-xl border border-gray-200/80 flex items-center justify-between text-xs"
                                >
                                  <div>
                                    <span className="font-bold text-gray-900 block">{sub.name || sub.englishName}</span>
                                    {sub.chineseName && (
                                      <span className="text-teal-700 font-chinese font-medium">{sub.chineseName}</span>
                                    )}
                                  </div>
                                  {sub.price && (
                                    <span className="font-bold text-teal-700 shrink-0 ml-2">{sub.price}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* SCANNED MENU GALLERY VIEW */
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold font-tempus text-gray-900">
                      {currentScannedSection.name} · {currentScannedSection.chinese}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Showing {currentScannedSection.images.length} high-resolution scanned menu {currentScannedSection.images.length === 1 ? "page" : "pages"}. Click to zoom in.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    High Resolution Scans
                  </span>
                </div>

                {/* Scanned Pages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {currentScannedSection.images.map((page, idx) => (
                    <div
                      key={page.id}
                      onClick={() => openModal(currentScannedSection.id, idx)}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:shadow-xl hover:border-teal-500 transition-all duration-300 flex flex-col"
                    >
                      {/* Page Badge */}
                      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        Page {idx + 1} of {currentScannedSection.images.length}
                      </div>

                      {/* Image Preview Container */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        <Image
                          src={page.imgSrc}
                          alt={page.alt}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-bold shadow-lg">
                            <ZoomIn className="w-4 h-4" />
                            <span>Click to Zoom</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs font-medium text-gray-600">
                        {currentScannedSection.name} - Page {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* 4. Bottom Order Reminder Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-16">
        <div className="bg-gradient-to-r from-[#1d232e] to-[#252f3e] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-tempus">Ready to Taste Authentic Hong Kong Cuisine?</h3>
            <p className="text-gray-300 text-sm">
              Dine in with us at Ironwood Plaza, or order for quick takeaway and delivery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:6042767800"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Call (604) 276-7800</span>
            </a>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-sm shadow-md transition-colors font-tempus"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. High-Resolution Scan Zoom Modal */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[102] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Page Index Indicator */}
          <div className="absolute top-4 left-4 z-[102] bg-black/60 px-4 py-2 rounded-full text-white text-xs font-semibold backdrop-blur-sm">
            {scannedSections.find((s) => s.id === modalState.sectionId)?.name} — Page {modalState.imageIndex + 1}
          </div>

          {/* Prev / Next Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("prev")
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[102] p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("next")
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[102] p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110"
            aria-label="Next page"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Modal Image Container */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {scannedSections.find((s) => s.id === modalState.sectionId)?.images[modalState.imageIndex] && (
              <Image
                src={
                  scannedSections.find((s) => s.id === modalState.sectionId)!.images[modalState.imageIndex].imgSrc
                }
                alt="Scanned menu zoom"
                width={1200}
                height={1600}
                className="max-w-[92vw] max-h-[86vh] object-contain rounded-lg shadow-2xl"
                priority
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
