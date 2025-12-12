"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X, ChevronDown, AlertCircle } from "lucide-react"

interface MenuItem {
  name: string
  description: string
  price: string
}

interface SubItem {
  chineseName: string
  name: string
  price: string
}

interface ToastItem {
  chineseName: string
  name: string
  price: string
}

interface MenuSection {
  id: string
  name: string
  chineseName: string
  price: string
  note?: string
  description?: string
  subItems?: SubItem[]
  items?: ToastItem[]
}

interface Poster {
  image: string
  alt: string
}

interface CategorySection {
  category: string
  chineseCategory: string
  note?: string
  bottomNote?: string
  price?: string
  subtitle?: string
  availableTime?: string
  description?: string
  cookingMethods?: { chineseName: string; name: string }[]
  addOnNote?: string
  items: {
    id?: string
    chineseName: string
    name: string
    price?: string
    halfPrice?: string
    wholePrice?: string
    hotPrice?: string
    coldPrice?: string
    size?: string
    image?: string
    englishName?: string
    chineseDescription?: string
  }[]
}

interface MenuCategory {
  name: string
  chineseName?: string
  subtitle?: string
  englishSubtitle?: string
  subtitleChinese?: string // Added for BBQ combo
  note?: string
  price?: string
  items?: MenuItem[]
  sections?: (MenuSection | CategorySection)[]
  type?: string
  posters?: Poster[]
}

interface MenuData {
  [key: string]: MenuCategory
}

function isCategorySection(section: MenuSection | CategorySection): section is CategorySection {
  return "category" in section
}

function TextMenu() {
  const [selectedCategory, setSelectedCategory] = useState("breakfast")
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("") // Add search query state
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
        console.error("[v0] Error fetching menu:", err)
        setError("Failed to load menu. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      const headerOffset = 165
      const elementPosition = contentRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [selectedCategory])

  const searchResults = useMemo(() => {
    if (!menuData || !searchQuery.trim()) return null

    const query = searchQuery.toLowerCase().trim()
    const results: {
      category: string
      categoryName: string
      item: {
        id?: string
        chineseName: string
        name: string
        price?: string
        halfPrice?: string
        wholePrice?: string
        hotPrice?: string
        coldPrice?: string
        description?: string
        subItems?: { chineseName: string; name: string; price: string }[]
        items?: { chineseName: string; name: string; price: string }[]
      }
    }[] = []

    const addedSectionIds = new Set<string>()

    const excludedBBQIds = ["1", "2", "3", "4", "5", "6"]

    Object.entries(menuData).forEach(([categoryKey, category]) => {
      if (categoryKey === "bbq" && category.subtitle) {
        const subtitleMatches =
          category.subtitle.toLowerCase().includes(query) ||
          (category.subtitleChinese && category.subtitleChinese.toLowerCase().includes(query))

        if (subtitleMatches && !addedSectionIds.has("bbq-combo")) {
          addedSectionIds.add("bbq-combo")
          results.push({
            category: categoryKey,
            categoryName: category.name,
            item: {
              id: "bbq-combo",
              chineseName: category.subtitleChinese || "",
              name: category.subtitle,
              price: category.price,
              description: category.note,
              items: category.items,
            },
          })
        }
      }

      // Search in category items
      if (category.items) {
        category.items.forEach((item: any) => {
          const chineseName = item.chineseName || ""
          const englishName = item.name || ""
          const itemId = item.id?.toString() || ""
          const isBBQExcluded = categoryKey === "bbq" && excludedBBQIds.includes(itemId)
          if (
            !isBBQExcluded &&
            (chineseName.toLowerCase().includes(query) || englishName.toLowerCase().includes(query) || itemId === query)
          ) {
            results.push({
              category: categoryKey,
              categoryName: category.name,
              item: {
                id: item.id,
                chineseName: chineseName,
                name: englishName,
                price: item.price,
              },
            })
          }
        })
      }

      // Search in sections
      if (category.sections) {
        category.sections.forEach((section: any) => {
          const sectionChineseName = section.chineseName || ""
          const sectionEnglishName = section.name || ""
          const sectionDescription = section.description || ""
          const sectionId = section.id?.toString() || ""
          const sectionKey = `${categoryKey}-${sectionId}`

          const isBBQExcludedSection = categoryKey === "bbq" && excludedBBQIds.includes(sectionId)

          const sectionNameMatches =
            sectionChineseName.toLowerCase().includes(query) || sectionEnglishName.toLowerCase().includes(query)
          const descriptionMatches = !isBBQExcludedSection && sectionDescription.toLowerCase().includes(query)

          const addSectionResult = () => {
            if (addedSectionIds.has(sectionKey)) return
            addedSectionIds.add(sectionKey)
            results.push({
              category: categoryKey,
              categoryName: category.name,
              item: {
                id: section.id,
                chineseName: sectionChineseName,
                name: sectionEnglishName,
                price: section.price,
                description: sectionDescription,
                subItems: section.subItems,
                items: section.items,
              },
            })
          }

          if (!isBBQExcludedSection && (sectionNameMatches || sectionId === query || descriptionMatches)) {
            if (section.price || section.items || section.subItems) {
              addSectionResult()
            }
          }

          if (section.items && !addedSectionIds.has(sectionKey)) {
            section.items.forEach((item: any) => {
              const chineseName = item.chineseName || ""
              const englishName = item.name || ""
              const itemId = item.id?.toString() || ""
              const isBBQExcluded = categoryKey === "bbq" && excludedBBQIds.includes(itemId)
              if (
                !isBBQExcluded &&
                (chineseName.toLowerCase().includes(query) ||
                  englishName.toLowerCase().includes(query) ||
                  itemId === query)
              ) {
                // Add individual item, not the entire section
                results.push({
                  category: categoryKey,
                  categoryName: category.name,
                  item: {
                    id: item.id,
                    chineseName: chineseName,
                    name: englishName,
                    price: item.price,
                    halfPrice: item.halfPrice,
                    wholePrice: item.wholePrice,
                    hotPrice: item.hotPrice,
                    coldPrice: item.coldPrice,
                  },
                })
              }
            })
          }

          if (section.subItems && !addedSectionIds.has(sectionKey)) {
            const hasMatchingSubItem = section.subItems.some((item: any) => {
              const chineseName = item.chineseName || ""
              const englishName = item.name || ""
              const itemId = item.id?.toString() || ""
              const isBBQExcluded = categoryKey === "bbq" && excludedBBQIds.includes(itemId)
              return (
                !isBBQExcluded &&
                (chineseName.toLowerCase().includes(query) ||
                  englishName.toLowerCase().includes(query) ||
                  itemId === query)
              )
            })

            if (hasMatchingSubItem) {
              addSectionResult()
            }
          }
        })
      }
    })

    return results.length > 0 ? results : null
  }, [menuData, searchQuery])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-tempus">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error || !menuData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error || "Unable to load menu data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const categoryOrder = ["breakfast", "lunch", "lunch-combo", "afternoon-tea", "dinner", "bbq", "drinks", "specials"]

  const categories = categoryOrder.filter((cat) => cat in menuData)
  const currentCategory = menuData[selectedCategory]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white pt-24 pb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-20"
                style={{
                  width: Math.random() * 80 + 20 + "px",
                  height: Math.random() * 80 + 20 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-tempus">Menu</h1>
            <div className="text-center text-gray-200">
              Explore our delicious selection of authentic Hong Kong dishes
            </div>
          </div>

          <div className="max-w-md mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu (English or 中文)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchQuery.trim() && searchResults ? (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Search Results ({searchResults.length} items found)
            </h2>

            {searchResults.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No items found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((result, idx) => {
                  if (result.item.id === "bbq-combo") {
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Header with title and price */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{currentCategory?.name || "BBQ Combo"}</h3>
                            <p className="text-gray-600">{result.item.name}</p>
                          </div>
                          <span className="text-2xl font-bold text-teal-600">{result.item.price}</span>
                        </div>

                        {/* Red banner section */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md p-6 mb-4">
                          <h3 className="text-xl font-medium text-center text-red-100 mb-1">
                            {result.item.chineseName}
                          </h3>
                          <h3 className="text-2xl font-bold text-center">{result.item.name}</h3>
                          {result.item.note && (
                            <div className="mt-4 pt-3 border-t border-red-400/30 text-center text-sm">
                              <p className="text-white font-medium">Includes Soup + Hot Coffee or Tea</p>
                              <p className="text-red-100">包括湯 + 熱飲咖啡或茶</p>
                              <p className="text-red-200 mt-1 text-xs">Cold Drinks +$1.50 | 冷飲 +$1.50</p>
                            </div>
                          )}
                        </div>

                        {/* 2-column grid for BBQ items */}
                        {result.item.items && result.item.items.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.item.items.map((item: any, itemIdx: number) => (
                              <div key={itemIdx} className="flex items-center gap-3 text-gray-700">
                                <div className="bg-red-100 text-red-700 font-semibold text-sm px-3 py-1 rounded min-w-[2rem] text-center">
                                  {item.id}
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium block">{item.chineseName}</span>
                                  <span className="text-gray-600">{item.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }
                  // End BBQ combo special rendering

                  if (result.category === "breakfast") {
                    const isLetterSection = ["A", "B", "C", "D"].includes(result.item.id)

                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            {result.item.id && (
                              <div className="bg-teal-600 text-white font-bold text-lg px-3 py-1 rounded">
                                {result.item.id}
                              </div>
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {result.item.chineseName} {result.item.name}
                              </h3>
                              {result.item.note && <p className="text-sm text-gray-500 italic">{result.item.note}</p>}
                              <span className="text-xs text-teal-600 mt-1 block">{result.categoryName}</span>
                            </div>
                          </div>
                          {result.item.price && (
                            <span className="text-xl font-bold text-teal-600 ml-4 flex-shrink-0">
                              {result.item.price}
                            </span>
                          )}
                        </div>

                        {result.item.description && (
                          <div className="text-sm text-gray-700 whitespace-pre-line mb-4">
                            {result.item.description}
                          </div>
                        )}

                        {result.item.subItems && result.item.subItems.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-semibold text-gray-800 mb-2">
                              可選配以下一款：
                              <br />
                              Choice one of the following Item:
                            </p>
                            {result.item.subItems.map((subItem, subIdx) => (
                              <div
                                key={subIdx}
                                className="flex justify-between items-center py-2 border-b border-gray-200"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="text-gray-700 font-medium">{subItem.chineseName}</span>
                                  <span className="text-gray-600">{subItem.name}</span>
                                </div>
                                <span className="text-lg font-bold text-teal-600">{subItem.price}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.item.items && result.item.items.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {result.item.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex justify-between items-center py-2 border-b border-gray-200"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  {item.id && (
                                    <span className="bg-red-600 text-white font-semibold text-sm px-3 py-1 rounded min-w-[3rem] text-center flex-shrink-0">
                                      {item.id}
                                    </span>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <span className="text-gray-800 font-semibold block">{item.chineseName}</span>
                                    <span className="text-gray-600 text-sm block">{item.name}</span>
                                  </div>
                                </div>
                                {item.price && (
                                  <span className="text-lg font-bold text-teal-600 ml-4 flex-shrink-0">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }
                  // End Breakfast special rendering

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Badge column - fixed width */}
                      <div className="w-12 flex-shrink-0">
                        {result.item.id && (
                          <span
                            className={`${result.category === "breakfast" ? "bg-teal-600" : "bg-red-600"} text-white font-semibold text-sm px-3 py-1 rounded text-center block`}
                          >
                            {result.item.id}
                          </span>
                        )}
                      </div>

                      {/* Content column */}
                      <div className="flex-1 min-w-0">
                        {/* Header row with title and price */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <span className="text-gray-800 font-semibold block">{result.item.chineseName}</span>
                            <span className="text-gray-600 text-sm block">{result.item.name}</span>
                            <span className="text-xs text-teal-600 mt-1 block">{result.categoryName}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {result.item.halfPrice && result.item.wholePrice ? (
                              <div className="flex gap-3">
                                <div>
                                  <span className="text-lg font-bold text-teal-600">{result.item.halfPrice}</span>
                                  <span className="text-xs text-gray-500 block">(Half)</span>
                                </div>
                                <div>
                                  <span className="text-lg font-bold text-teal-600">{result.item.wholePrice}</span>
                                  <span className="text-xs text-gray-500 block">(Whole)</span>
                                </div>
                              </div>
                            ) : result.item.hotPrice || result.item.coldPrice ? (
                              <div className="flex gap-3">
                                {result.item.hotPrice && (
                                  <div>
                                    <span className="text-lg font-bold text-teal-600">{result.item.hotPrice}</span>
                                    <span className="text-xs text-gray-500 block">Hot</span>
                                  </div>
                                )}
                                {result.item.coldPrice && (
                                  <div>
                                    <span className="text-lg font-bold text-teal-600">{result.item.coldPrice}</span>
                                    <span className="text-xs text-gray-500 block">Cold</span>
                                  </div>
                                )}
                              </div>
                            ) : result.item.price ? (
                              <span className="text-lg font-bold text-teal-600">{result.item.price}</span>
                            ) : null}
                          </div>
                        </div>

                        {/* Description */}
                        {result.item.description && (
                          <p className="text-sm text-gray-600 mt-2 whitespace-pre-line border-t pt-2">
                            {result.item.description}
                          </p>
                        )}

                        {/* SubItems (for Congee Combo style sections) */}
                        {result.item.subItems && result.item.subItems.length > 0 && (
                          <div className="mt-4 border-t pt-2">
                            <p className="text-sm font-semibold text-gray-800 mb-2">
                              可選配以下一款：
                              <br />
                              Choice one of the following Item:
                            </p>
                            {result.item.subItems.map((subItem, subIdx) => (
                              <div
                                key={subIdx}
                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-4"
                              >
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                  <span className="text-gray-700 font-medium whitespace-nowrap">
                                    {subItem.chineseName}
                                  </span>
                                  <span className="text-gray-600">{subItem.name}</span>
                                </div>
                                <span className="text-lg font-bold text-teal-600 flex-shrink-0">{subItem.price}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.item.items && result.item.items.length > 0 && (
                          <div className="mt-4 border-t pt-2">
                            {result.item.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-4"
                              >
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                  <span className="text-gray-700 font-medium whitespace-nowrap">
                                    {item.chineseName}
                                  </span>
                                  <span className="text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-lg font-bold text-teal-600 flex-shrink-0">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Category Navigation */}
          <div className="sticky top-24 bg-white shadow-md z-30 py-3">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-teal-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {menuData[category].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div ref={contentRef} className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-tempus text-gray-800">
                {currentCategory.name}
              </h2>

              {currentCategory.subtitle && (
                <p className="text-center text-gray-600 mb-2 text-sm md:text-base">{currentCategory.subtitle}</p>
              )}

              {currentCategory.englishSubtitle && (
                <p className="text-center text-gray-600 mb-8 text-sm md:text-base">{currentCategory.englishSubtitle}</p>
              )}

              {currentCategory.price && (
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-teal-600">{currentCategory.price}</p>
                </div>
              )}

              {selectedCategory === "specials" && currentCategory.type === "posters" ? (
                <div className="space-y-8">
                  <div className="bg-teal-600 text-white py-4 px-6 rounded-xl mb-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {currentCategory.chineseName} {currentCategory.name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentCategory.posters?.map((poster: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
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
              ) : selectedCategory === "specials" && currentCategory.sections ? (
                <div className="space-y-8">
                  {currentCategory.sections.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex}>
                      <div className="bg-teal-600 text-white py-4 px-6 rounded-xl mb-6 text-center">
                        <h3 className="text-xl md:text-2xl font-bold">
                          {section.chineseName} {section.name}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.items?.map((item: any, itemIndex: number) => (
                          <div
                            key={itemIndex}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                          >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg?height=300&width=400&query=Chinese special dish"}
                                alt={item.englishName || item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                  {item.id}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3">
                                <span className="bg-teal-600 text-white text-lg md:text-xl font-bold px-4 py-1 rounded-full">
                                  {item.price}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              <h4 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h4>
                              <p className="text-teal-600 font-medium mb-3">{item.englishName}</p>
                              {item.chineseDescription && (
                                <p className="text-gray-500 text-sm mb-1">{item.chineseDescription}</p>
                              )}
                              {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {currentCategory.items && currentCategory.items.length > 0 && !currentCategory.sections && (
                    <div className="space-y-4">
                      {currentCategory.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-800 font-tempus">{item.name}</h3>
                            <span className="text-xl font-bold text-teal-600 ml-4">{item.price}</span>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* START: Updated section for BBQ combo */}
                  {currentCategory.items && currentCategory.items.length > 0 && currentCategory.sections && (
                    <div className="mb-8">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md p-6 mb-4">
                        <h3 className="text-xl font-medium text-center text-red-100 mb-1">
                          {currentCategory.subtitleChinese}
                        </h3>
                        <h3 className="text-2xl font-bold text-center">{currentCategory.subtitle}</h3>
                        {currentCategory.note && (
                          <div className="mt-4 pt-3 border-t border-red-400/30 text-center text-sm">
                            <p className="text-white font-medium">Includes Soup + Hot Coffee or Tea</p>
                            <p className="text-red-100">包括湯 + 熱飲咖啡或茶</p>
                            <p className="text-red-200 mt-1 text-xs">Cold Drinks +$1.50 | 冷飲 +$1.50</p>
                          </div>
                        )}
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentCategory.items.map((item: any, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-700">
                              <div className="bg-red-100 text-red-700 font-semibold text-sm px-3 py-1 rounded min-w-[2rem] text-center">
                                {item.id}
                              </div>
                              <div className="flex-1">
                                <span className="font-medium block">{item.chineseName}</span>
                                <span className="text-gray-600">{item.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* END: Updated section for BBQ combo */}

                  {currentCategory.sections ? (
                    <div className="space-y-6">
                      {currentCategory.sections.map((section, index) => {
                        if (isCategorySection(section)) {
                          return (
                            <div key={index}>
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-4 mb-4">
                                <h3 className="text-2xl font-bold text-center">
                                  {section.category} {section.chineseCategory}
                                </h3>
                                {section.note && (
                                  <p className="text-center text-sm mt-2 text-blue-100 whitespace-pre-line">
                                    {section.note}
                                  </p>
                                )}
                                {section.availableTime && (
                                  <p className="text-center text-sm mt-2 text-blue-100 whitespace-pre-line">
                                    {section.availableTime}
                                  </p>
                                )}
                                {section.price && (
                                  <p className="text-center text-2xl font-bold mt-2 text-yellow-300">{section.price}</p>
                                )}
                                {section.description && (
                                  <p className="text-center text-sm mt-2 text-blue-100">{section.description}</p>
                                )}
                              </div>

                              {section.cookingMethods && (
                                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {section.cookingMethods.map((method, idx) => (
                                      <div key={idx} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium">{method.chineseName}</span>
                                        <span className="text-gray-600">{method.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {section.addOnNote && (
                                    <p className="text-center text-sm mt-4 text-red-600 font-medium">
                                      {section.addOnNote}
                                    </p>
                                  )}
                                </div>
                              )}

                              {section.items && section.items.length > 0 && (
                                <div className="space-y-3">
                                  {section.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                                    >
                                      {item.hotPrice || item.coldPrice ? (
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {item.id && (
                                              <span
                                                className={`${item.id === "breakfast" ? "bg-teal-600" : "bg-red-600"} text-white font-semibold text-sm px-3 py-1 rounded min-w-[3rem] text-center flex-shrink-0`}
                                              >
                                                {item.id}
                                              </span>
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <span className="text-gray-800 font-semibold block">
                                                {item.chineseName}
                                              </span>
                                              <span className="text-gray-600 text-sm block">{item.name}</span>
                                              {item.size && (
                                                <span className="text-gray-500 text-xs block">{item.size}</span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                            {item.hotPrice && (
                                              <div className="text-right">
                                                <span className="text-lg font-bold text-teal-600">{item.hotPrice}</span>
                                                <span className="text-xs text-gray-500 block">Hot</span>
                                              </div>
                                            )}
                                            {item.coldPrice && (
                                              <div className="text-right">
                                                <span className="text-lg font-bold text-teal-600">
                                                  {item.coldPrice}
                                                </span>
                                                <span className="text-xs text-gray-500 block">Cold</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ) : item.halfPrice && item.wholePrice ? (
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {item.id && (
                                              <span
                                                className={`${item.id === "breakfast" ? "bg-teal-600" : "bg-red-600"} text-white font-semibold text-sm px-3 py-1 rounded min-w-[3rem] text-center flex-shrink-0`}
                                              >
                                                {item.id}
                                              </span>
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <span className="text-gray-800 font-semibold block">
                                                {item.chineseName}
                                              </span>
                                              <span className="text-gray-600 text-sm block">{item.name}</span>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                            <div className="text-right">
                                              <span className="text-lg font-bold text-teal-600">{item.halfPrice}</span>
                                              <span className="text-xs text-gray-500 block">(Half)</span>
                                            </div>
                                            <div className="text-right">
                                              <span className="text-lg font-bold text-teal-600">{item.wholePrice}</span>
                                              <span className="text-xs text-gray-500 block">(Whole)</span>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            {item.id && (
                                              <span
                                                className={`${item.id === "breakfast" ? "bg-teal-600" : "bg-red-600"} text-white font-semibold text-sm px-3 py-1 rounded min-w-[3rem] text-center flex-shrink-0`}
                                              >
                                                {item.id}
                                              </span>
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <span className="text-gray-800 font-semibold block">
                                                {item.chineseName}
                                              </span>
                                              <span className="text-gray-600 text-sm block">{item.name}</span>
                                            </div>
                                          </div>
                                          {item.price && (
                                            <span className="text-lg font-bold text-teal-600 ml-4 flex-shrink-0">
                                              {item.price}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {section.bottomNote && (
                                <div className="mt-4 text-center">
                                  <p className="text-sm text-gray-600 italic">{section.bottomNote}</p>
                                </div>
                              )}
                            </div>
                          )
                        }

                        const isLetterSection = ["A", "B", "C", "D"].includes(section.id)

                        return (
                          <div key={index}>
                            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`${isLetterSection ? "bg-teal-600" : "bg-teal-600"} text-white font-bold text-lg px-3 py-1 rounded`}
                                  >
                                    {section.id}
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                      {section.chineseName} {section.name}
                                    </h3>
                                    {section.note && <p className="text-sm text-gray-500 italic">{section.note}</p>}
                                  </div>
                                </div>
                                <span className="text-xl font-bold text-teal-600 ml-4 flex-shrink-0">
                                  {section.price}
                                </span>
                              </div>

                              {section.description && (
                                <div className="text-sm text-gray-700 whitespace-pre-line mb-4">
                                  {section.description}
                                </div>
                              )}

                              {section.subItems && section.subItems.length > 0 && (
                                <div className="mt-4 space-y-2">
                                  <p className="text-sm font-semibold text-gray-800 mb-2">
                                    可選配以下一款：
                                    <br />
                                    Choice one of the following Item:
                                  </p>
                                  {section.subItems.map((subItem, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between items-center py-2 border-b border-gray-200"
                                    >
                                      <div className="flex items-center gap-4">
                                        <span className="text-gray-700 font-medium">{subItem.chineseName}</span>
                                        <span className="text-gray-600">{subItem.name}</span>
                                      </div>
                                      <span className="text-lg font-bold text-teal-600">{subItem.price}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {section.items && section.items.length > 0 && (
                                <div className="mt-4 space-y-2">
                                  {section.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between items-center py-2 border-b border-gray-200"
                                    >
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {item.id && (
                                          <span
                                            className={`${item.id === "breakfast" ? "bg-teal-600" : "bg-red-600"} text-white font-semibold text-sm px-3 py-1 rounded min-w-[3rem] text-center flex-shrink-0`}
                                          >
                                            {item.id}
                                          </span>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <span className="text-gray-800 font-semibold block">{item.chineseName}</span>
                                          <span className="text-gray-600 text-sm block">{item.name}</span>
                                          {item.size && (
                                            <span className="text-gray-500 text-xs block">{item.size}</span>
                                          )}
                                        </div>
                                      </div>
                                      {item.hotPrice || item.coldPrice ? (
                                        <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                          {item.hotPrice && (
                                            <div className="text-right">
                                              <span className="text-lg font-bold text-teal-600">{item.hotPrice}</span>
                                              <span className="text-xs text-gray-500 block">Hot</span>
                                            </div>
                                          )}
                                          {item.coldPrice && (
                                            <div className="text-right">
                                              <span className="text-lg font-bold text-teal-600">{item.coldPrice}</span>
                                              <span className="text-xs text-gray-500 block">Cold</span>
                                            </div>
                                          )}
                                        </div>
                                      ) : item.halfPrice && item.wholePrice ? (
                                        <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                          <div className="text-right">
                                            <span className="text-lg font-bold text-teal-600">{item.halfPrice}</span>
                                            <span className="text-xs text-gray-500 block">(Half)</span>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-lg font-bold text-teal-600">{item.wholePrice}</span>
                                            <span className="text-xs text-gray-500 block">(Whole)</span>
                                          </div>
                                        </div>
                                      ) : (
                                        item.price && (
                                          <span className="text-lg font-bold text-teal-600 ml-4 flex-shrink-0">
                                            {item.price}
                                          </span>
                                        )
                                      )}
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
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Scroll indicator at bottom */}
      <div className="text-center pb-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center justify-center bg-teal-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-teal-700 transition-colors"
          aria-label="Back to top"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default TextMenu
