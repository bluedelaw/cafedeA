"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/logo.png" alt="café de A" className="w-32 h-auto mx-auto opacity-75" />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-tempus">Something went wrong!</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
          </p>

          {/* Show error details in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-mono text-red-800 break-all">{error.message}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
