"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error")
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-espresso">
      <div className="mx-auto max-w-md text-center">
        <div className="relative mx-auto mb-8 h-14 w-44">
          <Image src="/images/logo.png" alt="café de A" fill className="object-contain" />
        </div>
        <h1 className="font-tempus text-3xl">Something went wrong</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-espresso/75">
          Please try again, or go back to the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center bg-burgundy px-6 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-espresso px-6 text-sm font-semibold"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
