"use client"

import { useState } from "react"

function BubbleTea() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const bubbleTeaItems = [
    {
      id: 1,
      name: "Classic Milk Tea",
      description: "Our signature milk tea with tapioca pearls",
      price: "$5.50",
      category: "milk-tea",
      image: "/images/Drink/Drink1.jpg",
    },
    {
      id: 2,
      name: "Taro Milk Tea",
      description: "Creamy taro flavor with chewy tapioca pearls",
      price: "$5.75",
      category: "milk-tea",
      image: "/images/Drink/Drink2.jpg",
    },
    {
      id: 3,
      name: "Matcha Latte",
      description: "Premium Japanese matcha with milk and pearls",
      price: "$6.00",
      category: "specialty",
      image: "/images/Drink/Drink1.jpg",
    },
    {
      id: 4,
      name: "Brown Sugar Milk Tea",
      description: "Fresh milk with brown sugar syrup and pearls",
      price: "$6.25",
      category: "specialty",
      image: "/images/Drink/Drink2.jpg",
    },
    {
      id: 5,
      name: "Passion Fruit Green Tea",
      description: "Refreshing green tea with passion fruit",
      price: "$5.25",
      category: "fruit-tea",
      image: "/images/Drink/Drink1.jpg",
    },
    {
      id: 6,
      name: "Lychee Oolong Tea",
      description: "Fragrant oolong tea with lychee flavor",
      price: "$5.50",
      category: "fruit-tea",
      image: "/images/Drink/Drink2.jpg",
    },
  ]

  const categories = [
    { id: "all", name: "All Bubble Teas" },
    { id: "milk-tea", name: "Milk Teas" },
    { id: "fruit-tea", name: "Fruit Teas" },
    { id: "specialty", name: "Specialty Drinks" },
  ]

  const filteredItems =
    selectedCategory === "all" ? bubbleTeaItems : bubbleTeaItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="pt-16">
      <div
        className="relative bg-cover bg-center h-64 md:h-80"
        style={{ backgroundImage: "url('/images/Drink/Drink1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-tempus">Bubble Tea</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Discover our handcrafted bubble tea drinks made with premium ingredients
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-tempus">{item.name}</h3>
                  <span className="text-blue-600 font-bold">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center font-tempus">Customize Your Drink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3">1. Choose Your Tea Base</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Black Tea</li>
                <li>Green Tea</li>
                <li>Oolong Tea</li>
                <li>Jasmine Tea</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3">2. Select Toppings</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Tapioca Pearls</li>
                <li>Grass Jelly</li>
                <li>Aloe Vera</li>
                <li>Pudding</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3">3. Choose Sweetness</h3>
              <ul className="space-y-2 text-gray-700">
                <li>100% (Regular)</li>
                <li>75% (Less Sweet)</li>
                <li>50% (Half Sweet)</li>
                <li>25% (Light Sweet)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BubbleTea

