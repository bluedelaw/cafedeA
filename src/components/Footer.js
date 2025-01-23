import React from "react"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">café de A</h3>
            <p>Delightful dining experiences since 2023</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>123 Gourmet Street, Foodville</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@cafedea.com</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p>Monday - Friday: 7am - 10pm</p>
            <p>Saturday - Sunday: 8am - 11pm</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

