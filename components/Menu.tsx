"use client"

import { useState, useEffect, useMemo, useRef, useCallback, type TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { featuredSpecials, type FeaturedSpecial } from "@/lib/specials"
import menuJson from "@/public/menu.json"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"

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
}

interface MenuSectionGroup {
  id?: string | number
  name?: string
  chineseName?: string
  category?: string
  chineseCategory?: string
  price?: string
  note?: string
  description?: string
  availableTime?: string
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
}

interface MenuData {
  [key: string]: MenuCategoryData
}

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
      { id: 1, imgSrc: "/images/Lunch/Lunch1.webp", alt: "Lunch menu page 1" },
      { id: 2, imgSrc: "/images/Lunch/Lunch2.webp", alt: "Lunch menu page 2" },
      { id: 3, imgSrc: "/images/Lunch/Lunch3.webp", alt: "Lunch menu page 3" },
      { id: 4, imgSrc: "/images/Lunch/Lunch4.webp", alt: "Lunch menu page 4" },
      { id: 5, imgSrc: "/images/Lunch/Lunch5.webp", alt: "Lunch menu page 5" },
      { id: 6, imgSrc: "/images/Lunch/Lunch6.webp", alt: "Lunch menu page 6" },
    ],
  },
  {
    id: "lunch-combo",
    name: "Lunch Special",
    chinese: "午餐套餐",
    images: [{ id: 1, imgSrc: "/images/LunchSpecial/Lunch7.webp", alt: "Lunch special combo menu" }],
  },
  {
    id: "afternoon-tea",
    name: "Afternoon Tea",
    chinese: "下午茶",
    images: [{ id: 1, imgSrc: "/images/AfternoonTea/Afternoon1LQ.webp", alt: "Afternoon tea menu" }],
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
      { id: 2, imgSrc: "/images/Drink/Drink2.webp", alt: "Drinks menu page 2" },
    ],
  },
  {
    id: "specials",
    name: "Chef Specials",
    chinese: "廚師推介",
    images: [
      { id: 1, imgSrc: "/images/Special/Month.webp", alt: "Monthly specials" },
      { id: 2, imgSrc: "/images/Special/Lamb.webp", alt: "Lamb Hot Pot" },
      { id: 3, imgSrc: "/images/Special/ChefRec.webp", alt: "Chef's Recommendation" },
      { id: 4, imgSrc: "/images/Special/MidWeekSpecial.webp", alt: "Mid-week Special" },
      { id: 5, imgSrc: "/images/Special/SeasonalLobster.webp", alt: "Seasonal Lobster Special" },
      { id: 6, imgSrc: "/images/Special/LobsterSpecial.webp", alt: "Lobster Baked Rice Special" },
    ],
  },
]

const categoryNavItems = [
  { id: "breakfast", label: "Breakfast", chinese: "早餐", time: "8:00–11:00" },
  { id: "lunch", label: "Lunch", chinese: "午餐", time: "11:00–2:30" },
  { id: "lunch-combo", label: "Lunch special", chinese: "午餐套餐", time: "11:00–5:00" },
  { id: "afternoon-tea", label: "Afternoon tea", chinese: "下午茶", time: "2:30–5:30" },
  { id: "dinner", label: "Dinner", chinese: "晚餐", time: "5:30–close" },
  { id: "bbq", label: "BBQ", chinese: "燒味", time: "All day" },
  { id: "drinks", label: "Drinks", chinese: "飲品", time: "All day" },
  { id: "specials", label: "Specials", chinese: "推介", time: "Posted" },
]

function resolveCategoryFromParam(sectionParam: string | null): string {
  if (!sectionParam) return "breakfast"
  const normalized = sectionParam.toLowerCase().trim().replace(/_/g, "-")
  const match = categoryNavItems.find(
    (c) =>
      c.id.toLowerCase() === normalized ||
      c.label.toLowerCase() === normalized ||
      c.id.toLowerCase().replace(/-/g, " ") === normalized.replace(/-/g, " ")
  )
  return match?.id ?? "breakfast"
}

function chipClass(active: boolean) {
  return `inline-flex h-11 items-center justify-center rounded-md border px-3 text-[13px] font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 ${
    active
      ? "border-[#302117] bg-[#302117] text-white"
      : "border-[#302117]/20 bg-[#FFF9F0] text-[#302117] hover:border-[#302117]"
  }`
}

function extraPrice(item: MenuItem) {
  const bits: string[] = []
  if (item.hotPrice) bits.push(`Hot ${item.hotPrice}`)
  if (item.coldPrice) bits.push(`Iced ${item.coldPrice}`)
  return bits.join("  ·  ")
}

function DishRow({ item }: { item: MenuItem }) {
  const zh = item.chineseName
  const en = item.name || item.englishName
  const extras = extraPrice(item)
  const hasHalfWhole = Boolean(item.halfPrice || item.wholePrice)

  return (
    <div className="break-inside-avoid border-b border-[#302117]/10 py-3 lg:py-2.5">
      <div className="flex items-baseline gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-chinese text-[15px] leading-snug text-[#302117]">
            {item.id ? <span className="mr-1.5 text-[#9A7420]">{item.id}</span> : null}
            {zh || en}
          </p>
          {zh && en ? <p className="mt-0.5 text-[13px] leading-snug text-[#302117]/55">{en}</p> : null}
        </div>
        {hasHalfWhole ? (
          <div className="shrink-0 text-right font-tempus text-[15px] tabular-nums leading-snug text-[#302117]">
            {item.halfPrice ? (
              <p>
                <span className="mr-1.5 font-sans text-[11px] text-[#302117]/50">Half</span>
                {item.halfPrice}
              </p>
            ) : null}
            {item.wholePrice ? (
              <p className={item.halfPrice ? "mt-0.5" : undefined}>
                <span className="mr-1.5 font-sans text-[11px] text-[#302117]/50">Whole</span>
                {item.wholePrice}
              </p>
            ) : null}
          </div>
        ) : item.price ? (
          <span className="shrink-0 font-tempus text-[15px] tabular-nums text-[#302117]">{item.price}</span>
        ) : null}
      </div>
      {extras ? <p className="mt-1 text-xs text-[#302117]/55">{extras}</p> : null}
      {item.description ? (
        <p className="mt-1 text-xs leading-relaxed text-[#302117]/55 whitespace-pre-line">{item.description}</p>
      ) : null}
    </div>
  )
}

function ChoiceGrid({ items }: { items: MenuItem[] }) {
  return (
    <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={String(item.id ?? item.name)}
          className="flex items-baseline gap-3 rounded-md border border-[#302117]/12 bg-[#FFF9F0] px-3 py-2.5"
        >
          <span className="w-5 shrink-0 font-tempus text-[#9A7420] tabular-nums">{item.id}</span>
          <span className="min-w-0">
            <span className="block font-chinese text-[15px] leading-snug">{item.chineseName || item.name}</span>
            {item.chineseName && item.name ? (
              <span className="mt-0.5 block text-[13px] leading-snug text-[#302117]/55">{item.name}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  )
}

function isChoiceSection(section: MenuSectionGroup) {
  return section.category === "BBQ Rice Combo"
}

export default function Menu() {
  const searchParams = useSearchParams()
  const [menuData] = useState<MenuData>(menuJson as MenuData)
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"text" | "scans">("text")
  const categoryTabsRef = useRef<HTMLDivElement>(null)
  const [poster, setPoster] = useState<FeaturedSpecial | null>(null)
  const [modalState, setModalState] = useState({
    isOpen: false,
    sectionId: "breakfast",
    imageIndex: 0,
  })

  useEffect(() => {
    const sectionParam = searchParams.get("section")
    const viewParam = searchParams.get("view")
    setActiveCategory(resolveCategoryFromParam(sectionParam))
    if (viewParam === "scans") setViewMode("scans")
  }, [searchParams])

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSearchQuery("")
    setActiveCategory(categoryId)
    const tabsContainer = categoryTabsRef.current
    const activeTab = tabsContainer?.querySelector<HTMLButtonElement>(`[data-category-id="${categoryId}"]`)
    if (activeTab && tabsContainer) {
      tabsContainer.scrollLeft = Math.max(0, activeTab.offsetLeft - 16)
    }
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const sheet = document.getElementById("menu-sheet")
      if (sheet) {
        const y = sheet.getBoundingClientRect().top + window.scrollY - 120
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
      }
    }
  }, [])

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
      const newIdx =
        direction === "next" ? (prev.imageIndex + 1) % total : (prev.imageIndex - 1 + total) % total
      return { ...prev, imageIndex: newIdx }
    })
  }, [])

  useEffect(() => {
    if (!modalState.isOpen && !poster) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
        setPoster(null)
      }
      if (modalState.isOpen && e.key === "ArrowRight") navigateImage("next")
      if (modalState.isOpen && e.key === "ArrowLeft") navigateImage("prev")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalState.isOpen, poster, navigateImage, closeModal])

  useEffect(() => {
    if (!modalState.isOpen && !poster) return

    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    }

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.width = previous.bodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [modalState.isOpen, poster])

  const lightboxTouchX = useRef<number | null>(null)
  const onLightboxTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    lightboxTouchX.current = event.changedTouches[0]?.clientX ?? null
  }, [])
  const onLightboxTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (lightboxTouchX.current == null) return
      const dx = (event.changedTouches[0]?.clientX ?? lightboxTouchX.current) - lightboxTouchX.current
      lightboxTouchX.current = null
      if (Math.abs(dx) < 40) return
      navigateImage(dx < 0 ? "next" : "prev")
    },
    [navigateImage]
  )

  const currentCategoryData = menuData ? menuData[activeCategory] : null
  const currentScannedSection = scannedSections.find((s) => s.id === activeCategory) || scannedSections[0]
  const lightboxSection = scannedSections.find((s) => s.id === modalState.sectionId)
  const lightboxPage = lightboxSection?.images[modalState.imageIndex]
  const lightboxCount = lightboxSection?.images.length ?? 0
  const activeNav = categoryNavItems.find((c) => c.id === activeCategory)

  const searchResults = useMemo(() => {
    if (!menuData || !searchQuery.trim()) return null
    const q = searchQuery.toLowerCase().trim()
    const results: Array<{ categoryName: string; sectionName?: string; item: MenuItem }> = []

    Object.entries(menuData).forEach(([catKey, catData]) => {
      const catName = catData.name || catKey
      catData.items?.forEach((item) => {
        const text = `${item.name || ""} ${item.chineseName || ""} ${item.englishName || ""} ${item.description || ""} ${item.id || ""}`.toLowerCase()
        if (text.includes(q)) results.push({ categoryName: catName, item })
      })
      catData.sections?.forEach((sec) => {
        const fullSecTitle = `${sec.name || sec.category || ""} ${sec.chineseName || ""}`
        if (sec.description) {
          const secText = `${fullSecTitle} ${sec.description}`.toLowerCase()
          if (secText.includes(q)) {
            results.push({
              categoryName: catName,
              sectionName: fullSecTitle,
              item: { id: sec.id, name: sec.name, chineseName: sec.chineseName, price: sec.price, description: sec.description },
            })
          }
        }
        sec.items?.forEach((item) => {
          const text = `${item.name || ""} ${item.chineseName || ""} ${item.englishName || ""} ${item.description || ""} ${item.id || ""}`.toLowerCase()
          if (text.includes(q)) results.push({ categoryName: catName, sectionName: fullSecTitle, item })
        })
        sec.subItems?.forEach((sub) => {
          const text = `${sub.name || ""} ${sub.chineseName || ""} ${sub.englishName || ""}`.toLowerCase()
          if (text.includes(q)) {
            results.push({
              categoryName: catName,
              sectionName: fullSecTitle,
              item: { name: sub.name, chineseName: sub.chineseName, englishName: sub.englishName, price: sub.price },
            })
          }
        })
      })
    })
    return results
  }, [menuData, searchQuery])

  const pickupButton = (
    <Link
      href="/order"
      className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[#302117] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      Order pickup
    </Link>
  )

  return (
    <div className="min-h-screen bg-[#F7F0E3] text-[#302117] pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-8 lg:pb-16">
        <header className="max-w-2xl pb-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl leading-tight sm:text-5xl">Menu</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#302117]/75">
            Breakfast through dinner, barbecue, drinks, and what’s on the wall this week.
          </p>
        </header>

        <div className="relative lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-8">
          <aside className="lg:sticky lg:top-28">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#302117]/40" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="叉燒, milk tea…"
                className="h-12 w-full rounded-md border border-[#302117]/20 bg-[#FFF9F0] py-2.5 pl-10 pr-10 text-base text-[#302117] outline-none transition-colors duration-150 placeholder:text-[#302117]/35 focus:border-[#302117] focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 lg:text-sm"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#302117]/40"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="sticky top-16 z-30 mt-4 rounded-md border border-[#302117]/12 bg-[#FFF9F0] p-3 md:top-[6.5rem] lg:static">
              <nav
                ref={categoryTabsRef}
                className="flex snap-x snap-mandatory gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:items-stretch lg:overflow-visible"
              >
                {categoryNavItems.map((cat) => {
                  const isActive = !searchQuery.trim() && activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      data-category-id={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`snap-start shrink-0 ${chipClass(isActive)}`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="mt-4 rounded-md border border-[#302117]/12 bg-[#FFF9F0] p-3">
              <p className="mb-2 text-sm text-[#302117]/55">List and photos</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("text")}
                  className={`flex-1 ${chipClass(viewMode === "text")}`}
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("scans")}
                  className={`flex-1 ${chipClass(viewMode === "scans")}`}
                >
                  Photos
                </button>
              </div>
              <div className="mt-3 hidden md:block">{pickupButton}</div>
            </div>
          </aside>

          <div id="menu-sheet" className="mt-6 overflow-hidden rounded-md border border-[#302117]/12 bg-[#FFF9F0] px-5 py-6 sm:px-8 lg:mt-0 lg:py-8">
            {searchQuery.trim() && searchResults ? (
              <div>
                <p className="text-sm text-[#302117]/60">
                  {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for “{searchQuery}”
                </p>
                {searchResults.length === 0 ? (
                  <p className="mt-8 text-sm text-[#302117]/60">Nothing matched. Try 飯, 麵, beef, or milk tea.</p>
                ) : (
                  <div className="mt-6 columns-1 lg:columns-2 lg:gap-x-12">
                    {searchResults.map((res, i) => (
                      <div key={i} className="break-inside-avoid">
                        <p className="pt-2 text-[11px] text-[#9A7420]">
                          {res.categoryName}
                          {res.sectionName ? ` · ${res.sectionName}` : ""}
                        </p>
                        <DishRow item={res.item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : viewMode === "scans" ? (
              <div>
                <header className="mb-5 lg:mb-6">
                  <h2 className="font-tempus text-2xl lg:text-3xl">{currentScannedSection.name}</h2>
                  <p className="mt-1 text-sm text-[#302117]/55">Tap a page to zoom.</p>
                </header>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {currentScannedSection.images.map((page, idx) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => openModal(currentScannedSection.id, idx)}
                      className="min-w-0 text-left"
                    >
                      <div className="overflow-hidden rounded-md border border-[#302117]/15 bg-[#FFF9F0]">
                        <Image
                          src={page.imgSrc}
                          alt={page.alt}
                          width={870}
                          height={1126}
                          className="h-auto w-full"
                          sizes="(max-width: 640px) 100vw, 40vw"
                        />
                      </div>
                      <p className="mt-2 text-xs text-[#302117]/50">
                        {currentScannedSection.name} · {idx + 1}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <header className="mb-5 lg:mb-8">
                  <h2 className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-tempus text-2xl lg:text-4xl">
                    <span>
                      {currentCategoryData?.name || activeNav?.label}
                      {activeNav?.time ? (
                        <span className="ml-3 font-sans text-sm font-normal text-[#302117]/50 lg:hidden">
                          {activeNav.time}
                        </span>
                      ) : null}
                    </span>
                    {currentCategoryData?.price ? (
                      <span className="font-tempus text-xl tabular-nums lg:text-3xl">{currentCategoryData.price}</span>
                    ) : null}
                  </h2>
                  {activeNav?.time ? (
                    <p className="mt-1 hidden text-sm text-[#302117]/55 lg:block">{activeNav.time}</p>
                  ) : null}
                  {currentCategoryData?.subtitle ? (
                    <p className="mt-2 max-w-xl font-chinese text-sm leading-relaxed text-[#302117]/70 lg:hidden">
                      {currentCategoryData.subtitle}
                    </p>
                  ) : null}
                  {currentCategoryData?.englishSubtitle ? (
                    <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-[#302117]/70 lg:block">
                      {currentCategoryData.englishSubtitle}
                    </p>
                  ) : currentCategoryData?.subtitle ? (
                    <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-[#302117]/70 lg:block">
                      {currentCategoryData.subtitle}
                    </p>
                  ) : null}
                  {currentCategoryData?.note ? (
                    <p className="mt-2 text-xs text-[#302117]/55">{currentCategoryData.note}</p>
                  ) : null}
                </header>

                {activeCategory === "specials" ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {featuredSpecials.map((special) => (
                      <button
                        key={special.id}
                        type="button"
                        onClick={() => setPoster(special)}
                        className="text-left"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[#302117]/15 bg-[#F7F0E3]">
                          <Image
                            src={special.image}
                            alt={special.alt}
                            fill
                            className="object-cover object-top"
                            sizes="33vw"
                          />
                        </div>
                        <p className="mt-2 font-chinese text-sm">{special.chineseTitle}</p>
                        <p className="text-xs text-[#302117]/55">{special.title}</p>
                      </button>
                    ))}
                  </div>
                ) : null}

                {currentCategoryData?.items && currentCategoryData.items.length > 0 ? (
                  <div className="columns-1 lg:columns-2 lg:gap-x-12">
                    {currentCategoryData.items.map((item, idx) => (
                      <DishRow key={idx} item={item} />
                    ))}
                  </div>
                ) : null}

                {currentCategoryData?.sections?.map((section, sIdx) => (
                  <section key={sIdx} className="mb-10">
                    <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-[#302117]/20 pb-2">
                      <div>
                        <h3 className="text-lg font-medium">
                          {section.id ? <span className="mr-2 text-[#9A7420]">{section.id}</span> : null}
                          {section.name || section.category || section.chineseName || section.chineseCategory}
                        </h3>
                        {section.chineseCategory && (section.name || section.category) ? (
                          <p className="mt-0.5 font-chinese text-sm text-[#302117]/50">{section.chineseCategory}</p>
                        ) : null}
                      </div>
                      {section.price ? (
                        <span className="shrink-0 font-tempus text-lg tabular-nums">{section.price}</span>
                      ) : null}
                    </div>
                    {section.note ? (
                      <p className="mb-3 text-xs leading-relaxed text-[#9A7420] whitespace-pre-line">{section.note}</p>
                    ) : null}
                    {section.availableTime ? (
                      <p className="mb-2 text-xs text-[#302117]/55 whitespace-pre-line">{section.availableTime}</p>
                    ) : null}
                    {section.description ? (
                      <div className="mb-4 space-y-2 text-[13px] leading-relaxed text-[#302117]/70">
                        {section.description.split(/\n\n+/).map((block, i) => (
                          <p key={i} className="whitespace-pre-line">
                            {block}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {section.items && section.items.length > 0 ? (
                      isChoiceSection(section) ? (
                        <ChoiceGrid items={section.items} />
                      ) : (
                        <div className={activeCategory === "bbq" ? "" : "columns-1 lg:columns-2 lg:gap-x-12"}>
                          {section.items.map((item, itemIdx) => (
                            <DishRow key={itemIdx} item={item} />
                          ))}
                        </div>
                      )
                    ) : null}
                    {section.subItems && section.subItems.length > 0 ? (
                      <div className="mt-2 columns-1 lg:columns-2 lg:gap-x-12">
                        {section.subItems.map((sub, subIdx) => (
                          <DishRow key={subIdx} item={sub} />
                        ))}
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#302117]/10 bg-[#FFF9F0]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <div className="mx-auto max-w-6xl">{pickupButton}</div>
      </div>

      {poster ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3"
          onClick={() => setPoster(null)}
          role="dialog"
          aria-modal="true"
          aria-label={poster.title}
        >
          <button type="button" className="absolute right-4 top-4 text-white" onClick={() => setPoster(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <Image
            src={poster.image}
            alt={poster.alt}
            width={1200}
            height={1600}
            className="max-h-[88vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}

      {modalState.isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label="Scanned menu"
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
        >
          <div className="flex items-center justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 text-white">
            <p className="min-w-0 truncate text-sm text-white/80">
              {lightboxSection?.name}
              {lightboxCount ? ` · ${modalState.imageIndex + 1} of ${lightboxCount}` : ""}
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2">
            {lightboxCount > 1 ? (
              <button
                type="button"
                onClick={() => navigateImage("prev")}
                className="absolute left-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white sm:inline-flex"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            ) : null}
            {lightboxPage ? (
              <Image
                src={lightboxPage.imgSrc}
                alt={lightboxPage.alt}
                width={1200}
                height={1600}
                className="max-h-full w-auto max-w-full object-contain"
                priority
              />
            ) : null}
            {lightboxCount > 1 ? (
              <button
                type="button"
                onClick={() => navigateImage("next")}
                className="absolute right-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white sm:inline-flex"
                aria-label="Next page"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            ) : null}
          </div>

          {lightboxCount > 1 ? (
            <div className="flex items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
              <button
                type="button"
                onClick={() => navigateImage("prev")}
                className="inline-flex h-12 flex-1 items-center justify-center gap-1 rounded-md bg-white/15 text-sm font-medium text-white"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <button
                type="button"
                onClick={() => navigateImage("next")}
                className="inline-flex h-12 flex-1 items-center justify-center gap-1 rounded-md bg-white text-sm font-medium text-black"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="pb-[max(1rem,env(safe-area-inset-bottom))]" />
          )}
        </div>
      ) : null}
    </div>
  )
}
