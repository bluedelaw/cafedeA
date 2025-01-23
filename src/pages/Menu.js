import React, { useState } from "react"
import { Menu as MenuIcon, X, ChevronLeft, ChevronRight } from "lucide-react"

function MenuComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuSections = [
    {
      id: 1,
      name: "All-Day Breakfast",
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
      name: "Drinks",
      images: [
        { id: 1, imgSrc: "/images/Drink/Drink1.jpg" },
        { id: 2, imgSrc: "/images/Drink/Drink2.jpg" },
      ],
    },
  ]

  const openModal = (imgSrc, sectionId, imgIndex) => {
    setSelectedImage(imgSrc)
    setCurrentSection(sectionId)
    setCurrentIndex(imgIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setCurrentIndex(0)
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="App bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/images/logo.png" alt="café de A logo" className="w-32 h-auto" />
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 lg:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          <nav className={`lg:flex ${isMenuOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
              {menuSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {menuSections.map((section) => (
          <div key={section.id} id={section.name.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{section.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.images.map((image, index) => (
                <div
                  key={image.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => openModal(image.imgSrc, section.id, index)}
                >
                  <img
                    src={image.imgSrc || "/placeholder.svg"}
                    alt={`${section.name} item ${image.id}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-4xl w-full h-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="flex-grow flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected menu item"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full" onClick={goToPreviousImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full" onClick={goToNextImage}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuComponent
