"use client"

import { notFound } from "next/navigation"

export default function Test404() {
  return (
    <div className="p-4">
      <button onClick={() => notFound()} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Trigger 404 Error
      </button>
    </div>
  )
}
