"use client"

export default function UberEatsBanner() {
  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <span className="text-sm md:text-base font-medium">🎉 Now available on Uber Eats!</span>
        <a
          href="https://www.ubereats.com/ca/store/cafe-de-a-11666-steveston-hwy-3050/eXpeXQ5IS5aZrqIhBmEO8Q?srsltid=AfmBOooKdevXRxnr1MvPBuf6u5d4jO_CJMKMoRCPXf7K1VdFSN2cKiHX"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-teal-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Order Now
        </a>
      </div>
    </div>
  )
}
