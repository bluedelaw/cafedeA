"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronUp, MenuIcon } from "lucide-react"

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
    images: [{ id: 1, imgSrc: "/images/AfternoonTea/Afternoon1LQ.jpg" }],
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
    name: "Specials",
    images: [
      { id: 1, imgSrc: "/images/Special/Special1.webp" },
      { id: 2, imgSrc: "/images/Special/Special2.webp" },
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
      { id: 1, imgSrc: "/images/Drink/Drink1.webp" },
      { id: 2, imgSrc: "/images/Drink/Drink2.webp" },
    ],
  },
]

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState(null)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const navMenuRef = useRef(null)

  // Animation states
  useEffect(() => {
    // Trigger initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section-id")
            if (sectionId) {
              setVisibleSections((prev) => new Set([...prev, Number.parseInt(sectionId)]))
            }
          }
        })
      },
      {
        threshold: 0.1, // Triggers when 30% of section is visible (faster)
        rootMargin: "500px 0px -50px 0px", // Triggers 150px before section enters viewport
      },
    )

    // Observe all sections after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("[data-section-id]")
      sections.forEach((section) => observer.observe(section))
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Handle hash navigation when component mounts
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      const sectionElement = document.getElementById(sectionId)

      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: "smooth" })
        }, 500) // Delay to allow initial animations to complete
      }
    }
  }, [])

  // Handle clicks outside the navigation menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setIsNavMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const openMenu = (imgSrc, sectionId, imgIndex) => {
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

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("menu")) {
      closeMenu()
    }
  }

  const goToNextImage = () => {
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

  const scrollToSection = (sectionName) => {
    const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-")
    const sectionElement = document.getElementById(sectionId)

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" })
      setIsNavMenuOpen(false)
    }
  }

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen)
  }

  return (
    <div className="App bg-gray-100 min-h-screen">
      {/* Hero Section with Animation */}
      <div
        className={`relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white pt-16 overflow-hidden transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full bg-white transition-all duration-1000 ease-out ${
                  isLoaded ? "opacity-20 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  width: Math.random() * 100 + 20 + "px",
                  height: Math.random() * 100 + 20 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: i * 100 + "ms",
                  animation: isLoaded ? `float ${3 + Math.random() * 2}s ease-in-out infinite` : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div
            className={`text-center transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-tempus">Our Menu</h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Discover the authentic flavors of Hong Kong cuisine
            </p>
            <div
              className={`w-24 h-1 bg-white mx-auto rounded-full transition-all duration-1000 ease-out delay-500 ${
                isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </div>
        </div>

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className={`relative block w-full h-20 transition-all duration-1000 ease-out delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#f3f4f6"
            />
          </svg>
        </div>
      </div>

      <main className="menu-gallery p-6 relative">
        {menuSections.map((section, sectionIndex) => (
          <div
            key={section.id}
            id={section.name.toLowerCase().replace(/\s+/g, "-")}
            data-section-id={section.id}
            className={`menu-section mb-16 scroll-mt-20 transition-all duration-300 ease-out ${
              visibleSections.has(section.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: `${sectionIndex * 100}ms`,
            }}
          >
            {/* Section Header with Animation */}
            <div
              className={`text-center mb-8 transition-all duration-600 ease-out ${
                visibleSections.has(section.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: `${sectionIndex * 100 + 200}ms`,
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-tempus text-gray-800">{section.name}</h2>
              <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full" />
            </div>

            {/* Images Grid with Flexbox for Perfect Centering */}
            <div className="flex flex-wrap justify-center gap-5">
              {section.images.map((image, index) => (
                <div
                  key={image.id}
                  className={`menu-item shadow-md overflow-hidden cursor-pointer transition-all duration-700 ease-out ${
                    visibleSections.has(section.id)
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${sectionIndex * 50 + 100 + index * 50}ms`,
                    // width: "calc(33.33% - 30px)",
                    maxWidth: "650px",
                    minWidth: "310px",
                  }}
                  onClick={() => openMenu(image.imgSrc, section.id, index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.imgSrc || "/placeholder.svg"}
                      alt={`${section.name} menu ${index + 1}`}
                      className="menu-image w-full h-auto object-contain"
                      style={{
                        maxHeight: "400px",
                        minHeight: "350px",
                        objectFit: "contain",
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Floating Navigation Menu for Mobile with Animation */}
      <div ref={navMenuRef} className="fixed bottom-4 right-4 z-40 md:hidden">
        {/* Navigation Menu Items */}
        <div
          className={`absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-out ${
            isNavMenuOpen
              ? "max-h-[400px] opacity-100 translate-y-0 w-48 scale-100"
              : "max-h-0 opacity-0 translate-y-4 w-0 scale-95"
          }`}
        >
          <div className="p-2">
            {menuSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.name)}
                className={`block w-full text-left px-4 py-3 hover:bg-teal-50 rounded-lg transition-all duration-300 text-gray-800 font-medium transform ${
                  isNavMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{
                  transitionDelay: isNavMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main FAB Button with Pulse Animation */}
        <button
          onClick={toggleNavMenu}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl focus:outline-none transition-all duration-500 ease-out transform hover:scale-110 ${
            isNavMenuOpen ? "bg-teal-700 rotate-180 scale-110" : "bg-teal-600 hover:bg-teal-700"
          } ${isLoaded ? "animate-pulse" : ""}`}
          aria-label="Navigate to menu sections"
        >
          {isNavMenuOpen ? (
            <ChevronUp className="w-6 h-6 text-white transition-transform duration-300" />
          ) : (
            <MenuIcon className="w-6 h-6 text-white transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Back to Top Button with Animation */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 z-40 md:hidden bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl focus:outline-none transition-all duration-500 ease-out hover:bg-gray-700 hover:scale-110 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1s" }}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
      </button>

      {/* Enhanced Modal with Animations */}
      {isModalOpen && (
        <div
          className="menu fixed inset-0 flex items-center justify-center bg-black transition-all duration-500 ease-out z-50"
          style={{
            backgroundColor: isModalOpen ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)",
          }}
          onClick={handleBackgroundClick}
        >
          <div
            className={`menu-content relative bg-white transition-all duration-500 ease-out flex items-center justify-center transform ${
              isModalOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
            }`}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-black text-3xl z-20 focus:outline-none bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
              onClick={closeMenu}
            >
              &times;
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 focus:outline-none transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                goToPreviousImage()
              }}
            >
              &#10094;
            </button>

            {/* Display the selected image */}
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full view"
              className={`max-w-[85vw] max-h-[80vh] object-contain z-10 transition-all duration-500 ease-out ${
                isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />

            {/* Navigation buttons */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 focus:outline-none transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                goToNextImage()
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Menu
