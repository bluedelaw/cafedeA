"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AlertCircle, ChevronDown, Search, X } from "lucide-react"

interface MenuItem {
  id?: string | number
  name?: string
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
}

interface MenuSection {
  id?: string | number
  name?: string
  chineseName?: string
  price?: string
  note?: string
  description?: string
  subItems?: Array<{ name?: string; englishName?: string; price?: string }>
  items?: MenuItem[]
}

interface CategorySection {
  category?: string
  chineseCategory?: string
  note?: string
  bottomNote?: string
  price?: string
  subtitle?: string
  availableTime?: string
  description?: string
  cookingMethods?: { name?: string; chineseName?: string }[]
  addOnNote?: string
  items: MenuItem[]
}

interface MenuCategory {
  name?: string
  chineseName?: string
  subtitle?: string
  englishSubtitle?: string
  subtitleChinese?: string
  note?: string
  price?: string
  items?: MenuItem[]
  sections?: Array<MenuSection | CategorySection>
  type?: string
  posters?: Array<{ image: string; alt: string }>
}

interface MenuData {
  [key: string]: MenuCategory
}

function isCategorySection(section: MenuSection | CategorySection): section is CategorySection {
  return "category" in section
}

function englishOnly(text?: string) {
  if (!text) return ""

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/[\u3400-\u9FFF]/.test(line))
    .join("\n")
    .trim()
}

function displayName(item: { name?: string; englishName?: string; id?: string | number }) {
  return item.englishName?.trim() || item.name?.trim() || (item.id !== undefined ? `Item ${item.id}` : "Item")
}

function displaySectionName(section: { name?: string; category?: string }) {
  return section.name?.trim() || section.category?.trim() || "Section"
}

function displayCategoryName(category: MenuCategory) {
  return category.name?.trim() || category.englishSubtitle?.trim() || category.subtitle?.trim() || "Menu"
}

function getItemPrice(item: MenuItem) {
  return item.price || item.halfPrice || item.hotPrice || item.wholePrice || item.coldPrice || ""
}

function TextMenu() {
  const [selectedCategory, setSelectedCategory] = useState("breakfast")
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/menu.json")

        if (!response.ok) {
          throw new Error("Failed to load menu")
        }

        const data = await response.json()
        setMenuData(data)
        setError(null)
      } catch (err) {
        console.error("[TextMenu] Error fetching menu:", err)
        setError("Failed to load menu. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    const headerOffset = 160
    const elementPosition = contentRef.current.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
  }, [selectedCategory])

  const categoryOrder = ["breakfast", "lunch", "lunch-combo", "afternoon-tea", "dinner", "bbq", "drinks", "specials"]
  const categories = useMemo(() => {
    if (!menuData) return []
    return categoryOrder.filter((category) => category in menuData)
  }, [menuData])

  const currentCategory = menuData?.[selectedCategory]

  const handlePrint = () => {
    window.print()
  }

  const searchResults = useMemo(() => {
    if (!menuData || !searchQuery.trim()) return null

    const query = searchQuery.toLowerCase().trim()
    const results: Array<{
      title: string
      subtitle?: string
      price?: string
      description?: string
      items?: MenuItem[]
      subItems?: Array<{ name?: string; englishName?: string; price?: string }>
    }> = []

    Object.entries(menuData).forEach(([, category]) => {
      const categoryTitle = displayCategoryName(category)
      const categorySubtitle = englishOnly(category.englishSubtitle || category.subtitle || "")

      if (categoryTitle.toLowerCase().includes(query) || categorySubtitle.toLowerCase().includes(query)) {
        results.push({
          title: categoryTitle,
          subtitle: categorySubtitle,
          price: category.price,
          description: englishOnly(category.note),
          items: category.items,
        })
      }

      category.items?.forEach((item) => {
        const itemName = displayName(item)
        const itemDescription = englishOnly(item.description || item.chineseDescription)

        if (
          itemName.toLowerCase().includes(query) ||
          itemDescription.toLowerCase().includes(query) ||
          String(item.id || "").toLowerCase() === query
        ) {
          results.push({
            title: itemName,
            subtitle: categoryTitle,
            price: getItemPrice(item),
            description: itemDescription,
          })
        }
      })

      category.sections?.forEach((section) => {
        const sectionName = isCategorySection(section) ? section.category || "" : displaySectionName(section)
        const sectionDescription = englishOnly(section.description || "")

        if (
          sectionName.toLowerCase().includes(query) ||
          sectionDescription.toLowerCase().includes(query) ||
          String(section.id || "").toLowerCase() === query
        ) {
          results.push({
            title: sectionName,
            subtitle: categoryTitle,
            price: section.price,
            description: sectionDescription,
            items: section.items,
            subItems: isCategorySection(section) ? undefined : section.subItems,
          })
        }
      })
    })

    return results.length > 0 ? results : null
  }, [menuData, searchQuery])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e8e0d3] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#8f6d4f]" />
          <p className="text-[#5f513f]" style={{ fontFamily: "Georgia, serif" }}>
            Loading menu...
          </p>
        </div>
      </div>
    )
  }

  if (error || !menuData) {
    return (
      <div className="min-h-screen bg-[#e8e0d3] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[#b64036]" />
          <h2 className="mb-2 text-2xl font-bold text-[#2f241c]" style={{ fontFamily: "Georgia, serif" }}>
            Oops!
          </h2>
          <p className="mb-4 text-[#5f513f]">{error || "Unable to load menu data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="border border-[#8f6d4f] bg-[#8f6d4f] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#7a6047]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#d7d0c4] py-4 md:py-8">
      <div className="mx-auto w-full max-w-[8.5in] overflow-hidden bg-[#f8f5ef] text-slate-900 shadow-[0_28px_80px_rgba(17,24,39,0.22)] ring-1 ring-black/10 print:max-w-none print:shadow-none print:ring-0">
        <div className="border-b-4 border-[#c8a76a] bg-[#13263d] px-6 py-5 text-white md:px-10 md:py-7 print:border-b-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.6em] text-[#d8c18a]">Cafe & Grill</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
                Menu Presentation
              </h1>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#d4dde9] md:mx-0 md:text-base">
                Western-style proposal layout with print-friendly pages for review, presentation, or PDF export.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 border border-[#c8a76a] bg-[#c8a76a] px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#13263d] transition-colors hover:bg-[#e4c88c]"
              >
                Print / PDF
              </button>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-xl print:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search the menu"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#b7a89a] bg-white px-10 py-3 text-sm text-slate-900 shadow-none outline-none focus:ring-2 focus:ring-[#c8a76a]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {searchQuery.trim() && searchResults ? (
          <div className="px-5 py-6 md:px-8 md:py-8 print:px-0 print:py-0">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-5 text-center text-xl font-bold uppercase tracking-[0.2em] text-[#1e2d42]" style={{ fontFamily: "Georgia, serif" }}>
                Search Results ({searchResults.length})
              </h2>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-lg">No items found for "{searchQuery}"</p>
                  <p className="mt-2 text-sm">Try searching with different keywords</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result, idx) => (
                    <div key={idx} className="mb-4 overflow-hidden border border-[#c9b8a4] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.08)]">
                      <div className="flex items-start justify-between gap-4 border-b border-[#e3d8c8] bg-[#f6f2ea] px-5 py-4">
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold text-[#13263d]" style={{ fontFamily: "Georgia, serif" }}>
                            {result.title}
                          </h3>
                          {result.subtitle && <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#a16a3a]">{result.subtitle}</p>}
                        </div>
                        {result.price && <span className="text-2xl font-bold text-[#a16a3a]">{result.price}</span>}
                      </div>

                      {result.description && <p className="px-5 py-4 whitespace-pre-line text-sm leading-6 text-slate-700">{result.description}</p>}

                      {result.subItems && result.subItems.length > 0 && (
                        <div className="border-t border-[#e4d8c6] px-5 py-4">
                          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1e2d42]">Choose one included item</p>
                          <div className="space-y-2">
                            {result.subItems.map((subItem, subIdx) => (
                              <div key={subIdx} className="flex items-center justify-between border-b border-[#eee4d5] py-2">
                                <span className="text-slate-700">{subItem.englishName || subItem.name}</span>
                                <span className="text-lg font-bold text-[#a16a3a]">{subItem.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.items && result.items.length > 0 && (
                        <div className="border-t border-[#e4d8c6] px-5 py-4">
                          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            {result.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-center justify-between gap-4 border-b border-[#eee4d5] py-2">
                                <div className="flex min-w-0 items-center gap-3">
                                  {item.id && (
                                    <span className="min-w-[3rem] flex-shrink-0 border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-center text-sm font-semibold text-[#a16a3a]">
                                      {item.id}
                                    </span>
                                  )}
                                  <span className="min-w-0 font-medium text-[#13263d]">{displayName(item)}</span>
                                </div>
                                <span className="ml-4 flex-shrink-0 text-lg font-bold text-[#a16a3a]">{getItemPrice(item)}</span>
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
          </div>
        ) : (
          <>
            <div className="border-y border-[#ccbfa9] bg-[#f0ebe3] px-5 py-4 md:px-8 print:hidden">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 md:text-base ${
                      selectedCategory === category
                        ? "bg-[#13263d] text-white shadow-[0_8px_16px_rgba(19,38,61,0.18)]"
                        : "border border-[#bfb2a1] bg-white text-[#4b5563] hover:bg-[#f8f4ee]"
                    }`}
                  >
                    {displayCategoryName(menuData[category])}
                  </button>
                ))}
              </div>
            </div>

            <div ref={contentRef} className="px-5 py-8 md:px-8 md:py-10 print:px-0 print:py-0">
              <div className="mx-auto max-w-4xl">
                <div className="mb-8 border-b-4 border-[#c8a76a] pb-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#a16a3a]">Print-ready page</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#13263d] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
                  {displayCategoryName(currentCategory || {})}
                  </h2>
                </div>

                {englishOnly(currentCategory?.subtitle) && <p className="mb-2 text-center text-sm uppercase tracking-[0.18em] text-[#a16a3a] md:text-base">{englishOnly(currentCategory?.subtitle)}</p>}
                {englishOnly(currentCategory?.englishSubtitle) && <p className="mb-8 text-center text-sm text-slate-700 md:text-base">{englishOnly(currentCategory?.englishSubtitle)}</p>}

                {currentCategory?.price && <p className="mb-4 text-center text-3xl font-bold text-[#a16a3a]">{currentCategory.price}</p>}

                {selectedCategory === "specials" && currentCategory?.type === "posters" ? (
                  <div className="space-y-8">
                    <div className="mb-6 border-y-2 border-[#c8a76a] py-4 text-center">
                      <h3 className="text-xl font-bold uppercase tracking-[0.25em] text-[#13263d] md:text-2xl">{displayCategoryName(currentCategory)}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {currentCategory.posters?.map((poster, index) => (
                        <div key={index} className="overflow-hidden border border-[#c9b8a4] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.08)]">
                          <img src={poster.image || "/placeholder.svg"} alt={poster.alt} className="h-auto w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedCategory === "specials" && currentCategory?.sections ? (
                  <div className="space-y-8">
                    {currentCategory.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-10 break-after-page rounded-none border border-[#c9b8a4] bg-white shadow-[0_10px_28px_rgba(17,24,39,0.08)] print:break-after-page">
                        <div className="border-b border-[#e3d8c8] bg-[#13263d] px-5 py-4 text-center text-white">
                          <p className="text-[10px] uppercase tracking-[0.45em] text-[#d8c18a]">Page section</p>
                          <h3 className="mt-2 text-lg font-bold uppercase tracking-[0.22em] md:text-2xl">{displaySectionName(section)}</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-6">
                          {section.items?.map((item, itemIndex) => (
                            <div key={itemIndex} className="overflow-hidden border border-[#c9b8a4] bg-[#fbfaf7] shadow-[0_6px_18px_rgba(17,24,39,0.06)]">
                              <div className="relative h-48 overflow-hidden">
                                <img src={item.image || "/placeholder.svg?height=300&width=400&query=breakfast entree"} alt={item.englishName || item.name || "menu item"} className="h-full w-full object-cover" />
                                <div className="absolute left-3 top-3">
                                  <span className="border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-xs font-bold text-[#a16a3a]">{item.id}</span>
                                </div>
                                <div className="absolute right-3 top-3">
                                  <span className="bg-[#13263d] px-4 py-1 text-lg font-bold text-white md:text-xl">{getItemPrice(item)}</span>
                                </div>
                              </div>
                              <div className="p-5">
                                <h4 className="mb-1 text-xl font-bold text-[#13263d]" style={{ fontFamily: "Georgia, serif" }}>{displayName(item)}</h4>
                                {englishOnly(item.description || item.chineseDescription) && <p className="text-sm leading-6 text-slate-700">{englishOnly(item.description || item.chineseDescription)}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentCategory?.items && currentCategory.items.length > 0 && !currentCategory.sections && (
                      <div className="space-y-4">
                        {currentCategory.items.map((item, index) => (
                          <div key={index} className="border border-[#d9ceb9] bg-white p-5 shadow-sm">
                            <div className="mb-2 flex items-start justify-between gap-4">
                              <h3 className="text-xl font-bold text-[#2f241c]" style={{ fontFamily: "Georgia, serif" }}>{displayName(item)}</h3>
                              <span className="ml-4 text-xl font-bold text-[#8f6d4f]">{getItemPrice(item)}</span>
                            </div>
                            {englishOnly(item.description || item.chineseDescription) && <p className="text-[#5f513f]">{englishOnly(item.description || item.chineseDescription)}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {currentCategory?.items && currentCategory.items.length > 0 && currentCategory.sections && (
                      <div className="mb-10 break-after-page border border-[#c9b8a4] bg-white shadow-[0_10px_28px_rgba(17,24,39,0.08)] print:break-after-page">
                        <div className="border-b border-[#e3d8c8] bg-[#13263d] px-5 py-4 text-center text-white">
                          <p className="text-[10px] uppercase tracking-[0.45em] text-[#d8c18a]">BBQ combo page</p>
                          <h3 className="mt-2 text-2xl font-bold tracking-[0.12em]">{englishOnly(currentCategory.subtitle)}</h3>
                        </div>
                        <div className="p-5 text-center md:p-6">
                          <p className="text-sm uppercase tracking-[0.2em] text-[#a16a3a]">Includes soup and your choice of coffee or tea</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-600">Cold drinks +$1.50</p>
                        </div>
                        <div className="border-t border-[#e4d8c6] p-5 md:p-6">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {currentCategory.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-3 border-b border-[#eee4d5] py-2 text-slate-700">
                                <div className="min-w-[2rem] border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-center text-sm font-semibold text-[#a16a3a]">
                                  {item.id}
                                </div>
                                <div className="flex-1">
                                  <span className="block font-medium text-[#13263d]">{displayName(item)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentCategory?.sections ? (
                      <div className="space-y-6">
                        {currentCategory.sections.map((section, index) => {
                          if (isCategorySection(section)) {
                            return (
                              <div key={index}>
                                <div className="mb-4 border-y border-[#8f6d4f] py-3 text-center">
                                  <h3 className="text-2xl font-bold text-[#13263d]">{section.category}</h3>
                                  {englishOnly(section.note) && <p className="mt-2 whitespace-pre-line text-center text-sm text-[#6d5b46]">{englishOnly(section.note)}</p>}
                                  {englishOnly(section.availableTime) && <p className="mt-2 whitespace-pre-line text-center text-sm text-[#6d5b46]">{englishOnly(section.availableTime)}</p>}
                                  {section.price && <p className="mt-2 text-center text-2xl font-bold text-[#a16a3a]">{section.price}</p>}
                                  {englishOnly(section.description) && <p className="mt-2 text-center text-sm text-[#6d5b46]">{englishOnly(section.description)}</p>}
                                </div>

                                {section.cookingMethods && (
                                  <div className="mb-4 border border-[#c9b8a4] bg-white p-5 shadow-[0_6px_18px_rgba(17,24,39,0.06)]">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                      {section.cookingMethods.map((method, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700">
                                          <div className="h-2 w-2 rounded-full bg-[#a16a3a]" />
                                          <span className="text-slate-700">{method.name?.trim() || method.chineseName || "Method"}</span>
                                        </div>
                                      ))}
                                    </div>
                                    {englishOnly(section.addOnNote) && <p className="mt-4 text-center text-sm font-medium text-[#a16a3a]">{englishOnly(section.addOnNote)}</p>}
                                  </div>
                                )}

                                {section.items && section.items.length > 0 && (
                                  <div className="space-y-3">
                                    {section.items.map((item, idx) => (
                                      <div key={idx} className="border border-[#d5c7b4] bg-[#fcfbf8] p-4">
                                        <div className="flex items-center justify-between gap-4">
                                          <div className="flex min-w-0 items-center gap-3 flex-1">
                                            {item.id && <span className="min-w-[3rem] flex-shrink-0 border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-center text-sm font-semibold text-[#a16a3a]">{item.id}</span>}
                                            <div className="min-w-0">
                                              <span className="block font-semibold text-[#13263d]">{displayName(item)}</span>
                                              {item.size && <span className="block text-xs text-[#8a745d]">{item.size}</span>}
                                            </div>
                                          </div>
                                          <div className="flex flex-shrink-0 items-center gap-4">
                                            {item.hotPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.hotPrice}</span>}
                                            {item.coldPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.coldPrice}</span>}
                                            {item.halfPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.halfPrice}</span>}
                                            {item.wholePrice && <span className="text-lg font-bold text-[#a16a3a]">{item.wholePrice}</span>}
                                            {item.price && <span className="text-lg font-bold text-[#a16a3a]">{item.price}</span>}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {section.bottomNote && <p className="mt-4 text-center text-sm italic text-slate-600">{englishOnly(section.bottomNote)}</p>}
                              </div>
                            )
                          }

                          return (
                            <div key={index} className="mb-10 break-after-page border border-[#c9b8a4] bg-white shadow-[0_10px_28px_rgba(17,24,39,0.08)] print:break-after-page">
                              <div className="border-b border-[#e3d8c8] bg-[#13263d] px-5 py-4 text-center text-white">
                                <p className="text-[10px] uppercase tracking-[0.45em] text-[#d8c18a]">Page section</p>
                              </div>
                              <div className="px-5 py-5 md:px-6 md:py-6">
                              <div className="mb-4 flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                  <div className="border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-lg font-bold text-[#a16a3a]">{section.id}</div>
                                  <div>
                                    <h3 className="text-xl font-bold text-[#13263d]" style={{ fontFamily: "Georgia, serif" }}>{displaySectionName(section)}</h3>
                                    {englishOnly(section.note) && <p className="text-sm italic text-slate-600">{englishOnly(section.note)}</p>}
                                  </div>
                                </div>
                                <span className="ml-4 flex-shrink-0 text-xl font-bold text-[#a16a3a]">{section.price}</span>
                              </div>

                              {englishOnly(section.description) && <div className="mb-4 whitespace-pre-line text-sm leading-6 text-slate-700">{englishOnly(section.description)}</div>}

                              {section.subItems && section.subItems.length > 0 && (
                                <div className="mt-4 space-y-2 border-t border-[#e4d8c6] pt-3">
                                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1e2d42]">Choose one included item</p>
                                  {section.subItems.map((subItem, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-[#eee4d5] py-2">
                                      <span className="text-slate-700">{subItem.englishName || subItem.name}</span>
                                      <span className="text-lg font-bold text-[#a16a3a]">{subItem.price}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {section.items && section.items.length > 0 && (
                                <div className="mt-4 space-y-2 border-t border-[#e4d8c6] pt-3">
                                  {section.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-4 border-b border-[#eee4d5] py-2">
                                      <div className="flex min-w-0 items-center gap-3 flex-1">
                                        {item.id && <span className="min-w-[3rem] flex-shrink-0 border border-[#a16a3a] bg-[#fff7ea] px-3 py-1 text-center text-sm font-semibold text-[#a16a3a]">{item.id}</span>}
                                        <div className="min-w-0">
                                          <span className="block font-semibold text-[#13263d]">{displayName(item)}</span>
                                          {item.size && <span className="block text-xs text-[#8a745d]">{item.size}</span>}
                                        </div>
                                      </div>
                                      <div className="flex flex-shrink-0 items-center gap-4">
                                        {item.hotPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.hotPrice}</span>}
                                        {item.coldPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.coldPrice}</span>}
                                        {item.halfPrice && <span className="text-lg font-bold text-[#a16a3a]">{item.halfPrice}</span>}
                                        {item.wholePrice && <span className="text-lg font-bold text-[#a16a3a]">{item.wholePrice}</span>}
                                        {item.price && <span className="text-lg font-bold text-[#a16a3a]">{item.price}</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="pb-12 pt-6 text-center print:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-12 w-12 items-center justify-center bg-[#13263d] text-white shadow-lg transition-colors hover:bg-[#1f3a5c]"
            aria-label="Back to top"
          >
            <ChevronDown className="h-6 w-6 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextMenu