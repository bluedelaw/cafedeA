"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, X, Grid3x3, ChevronDown } from "lucide-react"

// Type definitions
interface MenuImage {
  id: number
  imgSrc: string
  alt?: string
}

interface MenuSection {
  id: number
  name: string
  images: MenuImage[]
  // description?: string
}

// Menu data
const menuSections: MenuSection[] = [
  {
    id: 1,
    name: "Breakfast",
    // description: "Start your day with our signature breakfast items",
    images: [
      { id: 1, imgSrc: "/images/Breakfast/Breakfast1.webp", alt: "Breakfast menu page 1" },
      { id: 2, imgSrc: "/images/Breakfast/Breakfast2.webp", alt: "Breakfast menu page 2" },
    ],
  },
  {
    id: 2,
    name: "Lunch",
    // description: "Authentic Hong Kong lunch specialties",
    images: [
      { id: 1, imgSrc: "/images/Lunch/Lunch1.webp", alt: "Lunch menu page 1" },
      { id: 2, imgSrc: "/images/Lunch/Lunch2.webp", alt: "Lunch menu page 2" },
      { id: 3, imgSrc: "/images/Lunch/Lunch3.webp", alt: "Lunch menu page 3" },
      { id: 4, imgSrc: "/images/Lunch/Lunch4.webp", alt: "Lunch menu page 4" },
      { id: 5, imgSrc: "/images/Lunch/Lunch5.webp", alt: "Lunch menu page 5" },
    ],
  },
  {
    id: 3,
    name: "Afternoon Tea",
    // description: "Classic afternoon tea selections",
    images: [
      { id: 1, imgSrc: "/images/AfternoonTea/Afternoon1LQ.webp", alt: "Afternoon tea menu" },
    ],
  },
  {
    id: 4,
    name: "Dinner",
    // description: "Evening dining favorites",
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
    id: 5,
    name: "Mix & Match",
    // description: "Create your perfect combination",
    images: [
      { id: 1, imgSrc: "/images/Mix/Mix1.webp", alt: "Mix & Match menu" },
    ],
  },
  {
    id: 6,
    name: "BBQ",
    // description: "Grilled perfection",
    images: [
      { id: 1, imgSrc: "/images/BBQ/BBQ1.webp", alt: "BBQ menu page 1" },
      { id: 2, imgSrc: "/images/BBQ/BBQ2.webp", alt: "BBQ menu page 2" },
    ],
  },
  {
    id: 7,
    name: "Drinks",
    // description: "Refreshing beverages",
    images: [
      { id: 1, imgSrc: "/images/Drink/Drink2.webp", alt: "Drinks menu page 1" },
      { id: 2, imgSrc: "/images/Drink/Drink1.webp", alt: "Drinks menu page 2" },
    ],
  },
  {
    id: 8,
    name: "Specials",
    // description: "Limited time offerings",
    images: [
      { id: 1, imgSrc: "/images/Special/Month.webp", alt: "Monthly special" },
      { id: 2, imgSrc: "/images/Special/ChefRec.webp", alt: "Chef's recommendation" },
      // { id: 3, imgSrc: "/images/Special/Lamb.webp", alt: "Lamb special" },
    ],
  },
]

// Custom hook for menu state management
function useMenuState() {
  const [activeSection, setActiveSection] = useState(1)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    imageIndex: number
    sectionId: number | null
  }>({
    isOpen: false,
    imageIndex: 0,
    sectionId: null,
  })

  const openModal = useCallback((sectionId: number, imageIndex: number) => {
    setModalState({
      isOpen: true,
      imageIndex,
      sectionId,
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      imageIndex: 0,
      sectionId: null,
    })
  }, [])

  const navigateImage = useCallback((direction: "next" | "prev") => {
    setModalState((prev) => {
      if (prev.sectionId === null) return prev

      const section = menuSections.find((s) => s.id === prev.sectionId)
      if (!section) return prev

      const totalImages = section.images.length
      let newIndex = prev.imageIndex

      if (direction === "next") {
        // Navigate to next section if at end
        if (prev.imageIndex === totalImages - 1) {
          const nextSectionIndex = menuSections.findIndex((s) => s.id === prev.sectionId) + 1
          const nextSection = menuSections[nextSectionIndex % menuSections.length]
          return {
            ...prev,
            sectionId: nextSection.id,
            imageIndex: 0,
          }
        }
        newIndex = prev.imageIndex + 1
      } else {
        // Navigate to previous section if at start
        if (prev.imageIndex === 0) {
          const prevSectionIndex =
            (menuSections.findIndex((s) => s.id === prev.sectionId) - 1 + menuSections.length) % menuSections.length
          const prevSection = menuSections[prevSectionIndex]
          return {
            ...prev,
            sectionId: prevSection.id,
            imageIndex: prevSection.images.length - 1,
          }
        }
        newIndex = prev.imageIndex - 1
      }

      return { ...prev, imageIndex: newIndex }
    })
  }, [])

  return {
    activeSection,
    setActiveSection,
    modalState,
    openModal,
    closeModal,
    navigateImage,
  }
}

function Menu() {
  const { activeSection, setActiveSection, modalState, openModal, closeModal, navigateImage } = useMenuState()
  const searchParams = useSearchParams()

  // Handle URL section parameter
  useEffect(() => {
    const sectionParam = searchParams.get('section')
    if (sectionParam) {
      const section = menuSections.find(s => s.name.toLowerCase() === sectionParam.toLowerCase())
      if (section) {
        setActiveSection(section.id)
      }
    }
  }, [searchParams, setActiveSection])

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalState.isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          navigateImage("next")
          break
        case "ArrowLeft":
          navigateImage("prev")
          break
        case "Escape":
          closeModal()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalState.isOpen, navigateImage, closeModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalState.isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [modalState.isOpen])

  // Get current section data
  const currentSection = useMemo(
    () => menuSections.find((s) => s.id === activeSection),
    [activeSection]
  )

  const modalSection = useMemo(
    () => menuSections.find((s) => s.id === modalState.sectionId),
    [modalState.sectionId]
  )

  const currentModalImage = modalSection?.images[modalState.imageIndex]

  // Header offset calculation (Banner 48px + Header 56px = 104px)
  const headerHeight = "104px"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Category Selector */}
      <div
        className="md:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-30 shadow-sm"
        style={{ top: headerHeight }}
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex px-3 py-3 gap-2 min-w-max">
            {menuSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside
          className="hidden md:flex md:flex-col w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 fixed left-0 bottom-0 z-20 shadow-lg overflow-hidden"
          style={{ top: headerHeight }}
        >
          {/* Fixed Header */}
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Grid3x3 className="w-6 h-6 text-teal-600" />
              Menu
            </h2>
            <p className="text-sm text-gray-600 mt-1">Browse our categories</p>
          </div>

          {/* Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuSections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className={`w-full text-left px-6 py-4 transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-600 text-teal-900"
                      : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-semibold ${isActive ? "text-teal-900" : "text-gray-800"}`}>
                        {section.name}
                      </div>
                      {section.description && (
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{section.description}</div>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isActive ? "rotate-180 text-teal-600" : "rotate-90 text-gray-400 group-hover:text-gray-600"}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs text-gray-500">
                      {section.images.length} page{section.images.length > 1 ? "s" : ""}
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64" style={{ paddingTop: "calc(104px + 3.5rem)", minHeight: "100vh" }}>
          <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Section Header */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{currentSection?.name}</h1>
              </div>
              {currentSection?.description && (
                <p className="text-gray-600 text-lg ml-15">{currentSection.description}</p>
              )}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {currentSection?.images.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => openModal(currentSection.id, index)}
                  className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
                >
                  {/* Image Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-semibold text-gray-700">
                      Page {index + 1} of {currentSection.images.length}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <Image
                      src={image.imgSrc}
                      alt={image.alt || `${currentSection.name} menu page ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Image Modal */}
      {modalState.isOpen && currentModalImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[70] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-[71] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Info */}
          <div className="absolute top-4 left-4 text-white z-[71] bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-sm font-medium">
              {modalSection?.name} - Page {modalState.imageIndex + 1} of {modalSection?.images.length}
            </p>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-[71] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("prev")
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-[71] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("next")
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image */}
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentModalImage.imgSrc}
              alt={currentModalImage.alt || `${modalSection?.name} menu`}
              width={1200}
              height={1600}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu