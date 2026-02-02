"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const menuSections = [
  {
    id: 1,
    name: "Breakfast",
    images: [
      { id: 1, imgSrc: "/images/Breakfast/Breakfast1.webp" },
      { id: 2, imgSrc: "/images/Breakfast/Breakfast2.webp" },
    ],
  },
  {
    id: 2,
    name: "Lunch",
    images: [
      { id: 1, imgSrc: "/images/Lunch/Lunch1.webp" },
      { id: 2, imgSrc: "/images/Lunch/Lunch2.webp" },
      { id: 3, imgSrc: "/images/Lunch/Lunch3.webp" },
      { id: 4, imgSrc: "/images/Lunch/Lunch4.webp" },
      { id: 5, imgSrc: "/images/Lunch/Lunch5.webp" },
      { id: 6, imgSrc: "/images/Lunch/Lunch6.webp" },
      { id: 7, imgSrc: "/images/Lunch/Lunch7.webp" },
    ],
  },
  {
    id: 3,
    name: "Afternoon Tea",
    images: [{ id: 1, imgSrc: "/images/AfternoonTea/Afternoon1LQ.webp" }],
  },
  {
    id: 4,
    name: "Dinner",
    images: [
      { id: 1, imgSrc: "/images/Dinner/Dinner1.webp" },
      { id: 2, imgSrc: "/images/Dinner/Dinner2.webp" },
      { id: 3, imgSrc: "/images/Dinner/Dinner3.webp" },
      { id: 4, imgSrc: "/images/Dinner/Dinner4.webp" },
      { id: 5, imgSrc: "/images/Dinner/Dinner5.webp" },
      { id: 6, imgSrc: "/images/Dinner/Dinner6.webp" },
      { id: 7, imgSrc: "/images/Dinner/Dinner7.webp" },
    ],
  },
  {
    id: 5,
    name: "Mix & Match",
    images: [
      { id: 1, imgSrc: "/images/Mix/Mix1.webp" },
      // { id: 2, imgSrc: "/images/Mix/Mix2.webp" },
    ],
  },
  {
    id: 6,
    name: "BBQ",
    images: [
      { id: 1, imgSrc: "/images/BBQ/BBQ1.webp" },
      { id: 2, imgSrc: "/images/BBQ/BBQ2.webp" },
    ],
  },
  {
    id: 7,
    name: "Drinks",
    images: [
      { id: 1, imgSrc: "/images/Drink/Drink2.webp" },
      { id: 2, imgSrc: "/images/Drink/Drink1.webp" },
    ],
  },
    {
    id: 8,
    name: "Specials",
    images: [
      { id: 1, imgSrc: "/images/Special/Month.webp" },
      { id: 2, imgSrc: "/images/Special/ChefRec.webp" },
      { id: 3, imgSrc: "/images/Special/Lamb.webp" },
    ],
  },
]

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState(1)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const openMenu = (imgSrc: string, sectionId: number, imgIndex: number) => {
    setSelectedImage(imgSrc)
    setCurrentSection(sectionId)
    setCurrentIndex(imgIndex)
    setIsModalOpen(true)
  }

  const closeMenu = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setCurrentIndex(0)
  }

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("menu-modal")) {
      closeMenu()
    }
  }

  const goToNextImage = () => {
    if (currentSection === null) return
    const sectionImages = menuSections[currentSection - 1].images

    if (currentIndex === sectionImages.length - 1) {
      const nextSection = (currentSection % menuSections.length) + 1
      setCurrentSection(nextSection)
      setCurrentIndex(0)
      setSelectedImage(menuSections[nextSection - 1].images[0].imgSrc)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setSelectedImage(sectionImages[currentIndex + 1].imgSrc)
    }
  }

  const goToPreviousImage = () => {
    if (currentSection === null) return
    const sectionImages = menuSections[currentSection - 1].images

    if (currentIndex === 0) {
      const prevSection = ((currentSection - 2 + menuSections.length) % menuSections.length) + 1
      setCurrentSection(prevSection)
      const lastIndex = menuSections[prevSection - 1].images.length - 1
      setCurrentIndex(lastIndex)
      setSelectedImage(menuSections[prevSection - 1].images[lastIndex].imgSrc)
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1)
      setSelectedImage(sectionImages[currentIndex - 1].imgSrc)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === "ArrowRight") goToNextImage()
      if (e.key === "ArrowLeft") goToPreviousImage()
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, currentIndex, currentSection])

  const currentSectionData = menuSections.find((s) => s.id === activeSection)

  // Banner (48px) + Header (56px) = 104px total
  const headerHeight = "104px"

  const handleSectionChange = (sectionId: number, buttonElement?: HTMLButtonElement) => {
    setActiveSection(sectionId)
    window.scrollTo({ top: 0, behavior: "smooth" })
    
    // Scroll the clicked tab into center view
    if (buttonElement && tabsContainerRef.current) {
      const container = tabsContainerRef.current
      const buttonLeft = buttonElement.offsetLeft
      const buttonWidth = buttonElement.offsetWidth
      const containerWidth = container.offsetWidth
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)
      
      container.scrollTo({ left: scrollPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-stone-100" style={{ paddingTop: headerHeight }}>
      {/* Mobile: Horizontal scrollable tabs */}
      <div 
        ref={tabsContainerRef}
        className="md:hidden fixed left-0 right-0 bg-white border-b border-stone-200 z-20 overflow-x-auto scrollbar-hide"
        style={{ top: headerHeight }}
      >
        <div className="flex px-2 py-2 gap-1">
          {menuSections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={(e) => handleSectionChange(section.id, e.currentTarget)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                  isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {section.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex">
        {/* Desktop: Sidebar */}
        <aside 
          className="hidden md:block w-48 bg-white border-r border-stone-200 fixed left-0 bottom-0 z-20"
          style={{ top: headerHeight }}
        >
          <nav className="py-4">
            {menuSections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                    isActive
                      ? "text-stone-900 bg-stone-100 border-l-2 border-stone-900"
                      : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {section.name}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-48 pt-14 md:pt-0">
          <div className="p-4 md:p-10">
            {/* Menu Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl">
              {currentSectionData?.images.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openMenu(image.imgSrc, activeSection, index)}
                  className="cursor-pointer"
                >
                  <div className="bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors">
                    <img
                      src={image.imgSrc || "/placeholder.svg"}
                      alt={`${currentSectionData.name} menu ${index + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="menu-modal fixed inset-0 flex items-center justify-center bg-black/95 z-50"
          onClick={handleBackgroundClick}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-20 p-2"
            onClick={closeMenu}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-20 p-2"
            onClick={(e) => {
              e.stopPropagation()
              goToPreviousImage()
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Full view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-20 p-2"
            onClick={(e) => {
              e.stopPropagation()
              goToNextImage()
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentIndex + 1} / {currentSection && menuSections[currentSection - 1].images.length}
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
