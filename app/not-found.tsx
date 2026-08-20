"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/logo.png" alt="café de A" className="w-32 h-auto mx-auto opacity-75" />
        </div>

        {/* 404 Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-tempus">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered
            the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or visit one of these pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/menu" className="text-teal-600 hover:text-teal-700 hover:underline">
              Menu
            </Link>
            <Link href="/location" className="text-teal-600 hover:text-teal-700 hover:underline">
              Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
