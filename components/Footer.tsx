"use client"

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.png" alt="café de A" className="h-12" />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch">
          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-sm mb-1">#3050-11666 Steveston Hwy, Richmond</p>
              <a href="tel:+16042767800" className="text-sm hover:text-gray-300 transition-colors duration-200">
                Phone: (604) 276-7800
              </a>
            </div>
          </div>
          <div className="hidden md:block w-px bg-gray-700 self-stretch mx-4"></div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Hours</h3>
              <p className="text-sm">Monday - Sunday: 8am - 10pm</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} café de A. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
