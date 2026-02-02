"use client"

// Banner height: 48px (h-12)
export const BANNER_HEIGHT = 48

export default function UberEatsBanner() {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-teal-700 text-white h-12 flex items-center px-4">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-4">
        <span className="text-sm font-medium">Now available on Uber Eats!</span>
        <a
          href="https://www.ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-teal-700 px-3 py-1 rounded text-sm font-medium hover:bg-teal-50 transition-colors"
        >
          Order Now
        </a>
      </div>
    </div>
  )
}
