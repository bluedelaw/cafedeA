"use client"

import { useState } from "react"
import { isDev } from "@/lib/dev-utils"
import config from "@/lib/config"

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(false)

  // Only render in development mode
  if (!isDev()) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
        title="Development Tools"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-64">
          <h3 className="text-sm font-bold mb-2">Development Tools</h3>
          <div className="text-xs space-y-1">
            <p>
              <strong>Environment:</strong> {config.env}
            </p>
            <p>
              <strong>Version:</strong> {config.version}
            </p>
            <p>
              <strong>Node Env:</strong> {process.env.NODE_ENV}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => window.location.reload()}
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
