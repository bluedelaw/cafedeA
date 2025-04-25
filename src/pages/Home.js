"use client"
import { Link } from "react-router-dom"
import { Clock, MapPin, ChevronDown, Utensils } from 'lucide-react'

function Home() {
  const scrollToNextSection = (e) => {
    e.preventDefault()
    const nextSection = e.currentTarget.closest("section").nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Simplified menu categories to showcase - match these with the sections in Menu.js
  const menuCategories = [
    {
      category: "Breakfast",
      image: "/images/Breakfast/Breakfast1.jpg",
    },
    {
      category: "Lunch",
      image: "/images/Lunch/Lunch2.jpg",
    },
    // {
    //   category: "Afternoon Tea",
    //   image: "/images/AfternoonTea/Afternoon1LQ.jpg",
    // },
    {
      category: "Dinner",
      image: "/images/Dinner/Dinner2.jpg",
    },
    {
    category: "BBQ",
    image: "/images/BBQ/BBQ1.jpg",
    },
    {
      category: "Drinks",
      image: "/images/Drink/Drink1.jpg",
    },
  ]

  return (
<div className="pt-[54px]">
{/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/Home/cafedea.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-tempus">Welcome to café de A</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8">Experience authentic Hong Kong cuisine</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              to="/menu"
              className="bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 text-base md:text-lg"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0)
                }, 0)
              }}
            >
              View Menu
            </Link>
            <Link
              to="/location"
              className="bg-teal-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300 text-base md:text-lg"
            >
              Find Us
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8 md:w-9 md:h-9" />
        </button>
      </section>

      {/* Menu Section - Simplified Design */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold font-tempus">Our Menu</h2>
            </div>
            {/* <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover our diverse selection of dishes, from hearty breakfasts to elegant dinners. Our menu features
              locally-sourced ingredients prepared with care by our talented chefs.
            </p> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
            {menuCategories.map((item, index) => (
              <Link
                key={index}
                to={`/menu#${item.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
<div className="relative min-h-[18rem] md:min-h-[20rem] overflow-hidden">
<img
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.category} menu`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 font-tempus">{item.category}</h3>
                    <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                      View Menu
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0)
                }, 0)
              }}
            >
              View Full Menu
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToNextSection}
          className="block mx-auto mt-10 md:mt-14 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9" />
        </button>
      </section>

      {/* Location Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">Find Us</h2>
            </div>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Located in the heart of Ironwood, our restaurant offers a convenient and welcoming atmosphere for all your
              dining needs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="w-full lg:w-1/2">
              <div className="h-64 sm:h-80 lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.13259539964594!2d-123.09580059956326!3d49.13219505975619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e101f046e8ff%3A0xcb201b822511cf35!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1737688840630!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Restaurant location"
                ></iframe>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-5 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-tempus">Ironwood Location</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-teal-600 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base">#3050-11666 Steveston Hwy, Richmond, BC V7A 5J3</p>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-teal-600 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold mb-1 text-sm md:text-base">Hours of Operation</p>
                    <div className="grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-0.5 md:gap-y-1 text-sm md:text-base">
                      <p>Monday - Friday:</p>
                      <p>8am - 10pm</p>
                      <p>Saturday - Sunday:</p>
                      <p>8am - 10pm</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/location"
                className="inline-block mt-4 md:mt-6 bg-teal-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 md:py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-tempus">Ready to Experience café de A?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Browse our menu or find our location.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              to="/menu"
              className="bg-white text-teal-700 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0)
                }, 0)
              }}
            >
              View Menu
            </Link>
            <Link
              to="/location"
              className="bg-transparent text-white border-2 border-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold hover:bg-white hover:text-teal-700 transition duration-300"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
