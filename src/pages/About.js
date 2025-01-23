import React from "react"

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About café de A</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img src="/images/restaurant-interior.jpg" alt="café de A Interior" className="rounded-lg shadow-md w-full" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, café de A has quickly become a local favorite for those seeking a unique dining experience.
            Our passion for great food, warm hospitality, and a cozy atmosphere has made us a beloved part of the
            community.
          </p>
          <p className="mb-4">
            At café de A, we believe in using only the freshest, locally-sourced ingredients to create dishes that
            delight and inspire. Our menu is a carefully curated selection of classic favorites and innovative new
            creations, all prepared with love and attention to detail.
          </p>
          <p>
            Whether you're joining us for a quick breakfast, a leisurely lunch, or a romantic dinner, we strive to make
            every visit to café de A a memorable one. We look forward to welcoming you and sharing our passion for great
            food and warm hospitality.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "Head Chef", image: "/images/chef1.jpg" },
            { name: "Jane Smith", role: "Pastry Chef", image: "/images/chef2.jpg" },
            { name: "Mike Johnson", role: "Restaurant Manager", image: "/images/manager.jpg" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="rounded-full mx-auto mb-4 w-48 h-48 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About

