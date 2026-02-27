"use client"

import React, { useState, useEffect } from "react"
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react"

// Custom hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return isVisible
}

function Location() {
  const isVisible = useScrollAnimation()

  const location = {
    name: "Ironwood",
    address: "#3050-11666 Steveston Hwy, Richmond, BC",
    phone: "(604) 276-7800",
    googleMapsUrl: "https://maps.app.goo.gl/cWFJu98tEtuGss9J9",
    hours: [
      { day: "Monday", time: "8:00 AM - 10:00 PM" },
      { day: "Tuesday", time: "8:00 AM - 10:00 PM" },
      { day: "Wednesday", time: "8:00 AM - 10:00 PM" },
      { day: "Thursday", time: "8:00 AM - 10:00 PM" },
      { day: "Friday", time: "8:00 AM - 10:00 PM" },
      { day: "Saturday", time: "8:00 AM - 10:00 PM" },
      { day: "Sunday", time: "8:00 AM - 10:00 PM" },
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.13259539964594!2d-123.09580059956326!3d49.13219505975619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e101f046e8ff%3A0xcb201b822511cf35!2scaf%C3%A9%20de%20A!5e0!3m2!1sen!2sca!4v1737688840630!5m2!1sen!2sca"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header Section */}
        <div 
          className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent font-tempus">
            Visit Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Authentic Hong Kong cuisine in Richmond
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Location Details Card */}
          <div 
            className={`transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 md:p-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold font-tempus">{location.name}</h2>
                <p className="text-teal-100 text-sm mt-1">Richmond, BC</p>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm font-tempus">Address</h3>
                    <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{location.address}</p>
                    <a
                      href={location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors duration-300 group/link"
                    >
                      <Navigation className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm font-tempus">Phone</h3>
                    <a
                      href={`tel:${location.phone.replace(/\D/g, "")}`}
                      className="text-gray-600 hover:text-teal-600 transition-colors duration-300 text-base font-medium inline-block mt-0.5"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm font-tempus mb-2">Hours</h3>
                    <div className="space-y-1">
                      {location.hours.map((schedule) => (
                        <div
                          key={schedule.day}
                          className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded transition-colors duration-200"
                        >
                          <span className="text-gray-700 text-sm font-medium">{schedule.day}</span>
                          <span className="text-gray-600 text-sm">{schedule.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-700 text-center leading-relaxed">
                      <span className="font-semibold text-teal-700">Open Daily</span>
                      <br />
                      Dine-in • Takeout • Uber Eats Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-[400px] lg:h-full hover:shadow-xl transition-shadow duration-300">
              <iframe
                src={location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Café de A Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div 
          className={`mt-8 md:mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-tempus">
              Ready to Visit?
            </h2>
            <p className="text-teal-100 text-sm md:text-base mb-6">
              Drop by for a taste of authentic Hong Kong cuisine. No reservation needed!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-600 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-tempus text-sm md:text-base"
              >
                <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                Get Directions
              </a>
              <a
                href={`tel:${location.phone.replace(/\D/g, "")}`}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-teal-900 font-tempus text-sm md:text-base"
              >
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location