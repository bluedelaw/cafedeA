"use client"

import { useState, useEffect, useRef } from "react"
import { useNavbar } from "../context/NavbarContext"
import { ChevronUp, MenuIcon } from "lucide-react"
import "../App.css"
import "../index.css"

const menuSections = [
  {
    id: 1,
    name: "Breakfast",
    images: [
      { id: 1, imgSrc: "/images/Breakfast/Breakfast1.jpg" },
      { id: 2, imgSrc: "/images/Breakfast/Breakfast2.jpg" },
    ],
  },
  {
    id: 2,
    name: "Lunch",
    images: [
      { id: 1, imgSrc: "/images/Lunch/Lunch1.jpg" },
      { id: 2, imgSrc: "/images/Lunch/Lunch2.jpg" },
      { id: 3, imgSrc: "/images/Lunch/Lunch3.jpg" },
      { id: 4, imgSrc: "/images/Lunch/Lunch4.jpg" },
      { id: 5, imgSrc: "/images/Lunch/Lunch5.jpg" },
      { id: 6, imgSrc: "/images/Lunch/Lunch6.jpg" },
      { id: 7, imgSrc: "/images/Lunch/Lunch7.jpg" },
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
      { id: 1, imgSrc: "/images/Dinner/Dinner1.jpg" },
      { id: 2, imgSrc: "/images/Dinner/Dinner2.jpg" },
      { id: 3, imgSrc: "/images/Dinner/Dinner3.jpg" },
      { id: 4, imgSrc: "/images/Dinner/Dinner4.jpg" },
      { id: 5, imgSrc: "/images/Dinner/Dinner5.jpg" },
      { id: 6, imgSrc: "/images/Dinner/Dinner6.jpg" },
      { id: 7, imgSrc: "/images/Dinner/Dinner7.jpg" },
    ],
  },
  {
    id: 5,
    name: "Specials",
    images: [
      { id: 1, imgSrc: "/images/Special/Special1.jpg" },
      { id: 2, imgSrc: "/images/Special/Special2.jpg" },
    ],
  },
  {
    id: 6,
    name: "BBQ",
    images: [
      { id: 1, imgSrc: "/images/BBQ/BBQ1.jpg" },
      { id: 2, imgSrc: "/images/BBQ/BBQ2.jpg" },
    ],
  },
  {
    id: 7,
    name: "Drinks",
    images: [
      { id: 1, imgSrc: "/images/Drink/Drink1.jpg" },
      { id: 2, imgSrc: "/images/Drink/Drink2.jpg" },
    ],
  },
]

function Menu() {
  const { isNavbarVisible, setIsNavbarVisible } = useNavbar()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState(null)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const navMenuRef = useRef(null)

  // Handle hash navigation when component mounts
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Remove the # character
      const sectionId = window.location.hash.substring(1)

      // Find the section element
      const sectionElement = document.getElementById(sectionId)

      // If the section exists, scroll to it with a slight delay to ensure DOM is ready
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: "smooth" })
        }, 300)
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
    setIsNavbarVisible(false) // Hide the navbar when the modal is open
  }

  const closeMenu = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setCurrentIndex(0)
    setIsNavbarVisible(true) // Show the navbar when the modal is closed
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
      setIsNavMenuOpen(false) // Close the menu after navigation
    }
  }

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen)
  }

  return (
    <div className="App bg-gray-100 min-h-screen">
      <main className="menu-gallery p-6 pt-16">
        {menuSections.map((section) => (
          <div
            key={section.id}
            id={section.name.toLowerCase().replace(/\s+/g, "-")}
            className="menu-section mb-12 scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-4 font-tempus">{section.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
              {section.images.map((image, index) => (
                <div
                  key={image.id}
                  className="menu-item text-center bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => openMenu(image.imgSrc, section.id, index)}
                >
                  <img
                    src={image.imgSrc || "/placeholder.svg"}
                    alt={section.name}
                    className="menu-image w-full h-90 object-cover transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Floating Navigation Menu for Mobile */}
      <div ref={navMenuRef} className="fixed bottom-4 right-4 z-40 md:hidden">
        {/* Navigation Menu Items */}
        <div
          className={`absolute bottom-16 right-0 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
            isNavMenuOpen ? "max-h-[400px] opacity-100 translate-y-0 w-48" : "max-h-0 opacity-0 translate-y-2 w-0"
          }`}
        >
          <div className="p-2">
            {menuSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.name)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-800 font-medium"
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={toggleNavMenu}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg focus:outline-none transition-all duration-300 ${
            isNavMenuOpen ? "bg-teal-700 rotate-180" : "bg-teal-600"
          }`}
          aria-label="Navigate to menu sections"
        >
          {isNavMenuOpen ? <ChevronUp className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Back to Top Button - Shows when scrolled down */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 left-4 z-40 md:hidden bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg focus:outline-none"
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {isModalOpen && (
        <div
          className="menu fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500"
          onClick={handleBackgroundClick}
        >
          <div className="menu-content relative bg-white p-1 rounded-lg transition-all duration-500">
            {/* Close button */}
            <button className="absolute top-2 right-2 text-black text-3xl z-20 focus:outline-none" onClick={closeMenu}>
              &times;
            </button>

            {/* Invisible button for previous image */}
            <button
              className="absolute left-0 top-0 h-full w-1/2 bg-transparent focus:outline-none"
              onClick={(e) => {
                e.stopPropagation()
                goToPreviousImage()
              }}
            ></button>

            {/* Display the selected image */}
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full view"
              className="max-w-full max-h-[95vh] object-contain z-10"
            />

            {/* Invisible button for next image */}
            <button
              className="absolute right-0 top-0 h-full w-1/2 bg-transparent focus:outline-none"
              onClick={(e) => {
                e.stopPropagation()
                goToNextImage()
              }}
            ></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
