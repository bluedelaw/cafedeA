import React from "react"
import { Link } from "react-router-dom"
import '../App.css'
import '../index.css'

function Home() {
  return (
    <div className="bg-gray-100">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4 font-tempus text-yellow-500">Welcome to café de A</h1>
          <p className="text-xl mb-8">Experience culinary excellence in every bite</p>
          <Link
            to="/menu"
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <div key={meal} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={`/images/${meal.toLowerCase()}.jpg`} alt={meal} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{meal}</h3>
                  <p className="text-gray-600">Discover our delicious {meal.toLowerCase()} options.</p>
                  <Link to="/menu" className="mt-4 inline-block text-blue-600 hover:underline">
                    View {meal} Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Book a Table</h2>
          <p className="text-xl mb-8">Reserve your spot for an unforgettable dining experience</p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Make a Reservation
          </Link>
        </div>
      </section> */}
    </div>
  )
}

export default Home

