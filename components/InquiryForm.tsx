"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

const buttonPrimary =
  "inline-flex h-12 items-center justify-center rounded-md bg-[#302117] px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50"
const buttonOutline =
  "inline-flex h-12 w-full items-center justify-center rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-sm font-medium text-[#302117] transition-colors duration-150 hover:border-[#302117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 motion-reduce:transition-none"
const fieldClass =
  "h-12 w-full rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 text-base text-[#302117] outline-none transition-colors duration-150 placeholder:text-[#302117]/35 focus:border-[#302117] focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 lg:text-sm"

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: "general",
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || "Failed to send inquiry")
      }

      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to send your message online. Please try again or call us directly at (604) 276-7800.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setSubmitted(false)
    setError(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    })
  }

  return (
    <div className="min-h-screen bg-[#F7F0E3] text-[#302117] pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-8 lg:pb-16">
        <header className="max-w-2xl pb-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl leading-tight sm:text-5xl">Contact</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#302117]/75">
            Questions, catering, or large groups. Call (604) 276-7800 or send a message. We’ll reply within 24 to 48
            hours.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-8">
          <div className="overflow-hidden rounded-md border border-[#302117]/12 bg-[#FFF9F0]">
            <section className="px-5 py-8 sm:px-8">
              {submitted ? (
                <div>
                  <h2 className="font-tempus text-2xl">Message sent</h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#302117]/75">
                    We have your note. The restaurant will get back to you within 24 to 48 hours. For something same-day, call
                    (604) 276-7800.
                  </p>
                  <button type="button" onClick={resetForm} className={`${buttonPrimary} mt-6`}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="pointer-events-none absolute opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {error ? (
                    <div className="rounded-md border border-[#302117]/20 bg-[#F7F0E3] px-4 py-3 text-sm text-[#302117]">
                      {error}
                    </div>
                  ) : null}

                  <h2 className="font-tempus text-2xl">Message</h2>
                  <p className="text-sm text-[#302117]/60">Name, email, and a few details. Phone is optional.</p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm text-[#302117]/70">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="e.g. Alex Wong"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm text-[#302117]/70">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="alex@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm text-[#302117]/70">
                      Phone <span className="text-[#302117]/45">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={fieldClass}
                      placeholder="(604) 276-7800"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm text-[#302117]/70">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      minLength={10}
                      maxLength={5000}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#302117]/20 bg-[#FFF9F0] px-4 py-3 text-base text-[#302117] outline-none transition-colors duration-150 placeholder:text-[#302117]/35 focus:border-[#302117] focus-visible:ring-2 focus-visible:ring-[#D5A52F] focus-visible:ring-offset-2 lg:text-sm"
                      placeholder="How can we help? Event date, guest count, or anything we should know."
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className={`${buttonPrimary} w-full sm:w-auto`}>
                    {isSubmitting ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </section>
          </div>

          <div className="mt-6 lg:sticky lg:top-28 lg:mt-0">
            <aside className="rounded-md border border-[#302117]/15 bg-[#FFF9F0] p-5">
              <h2 className="font-tempus text-2xl">Reach us</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Phone</dt>
                  <dd className="text-right font-medium">
                    <a href="tel:6042767800" className="underline underline-offset-4">
                      (604) 276-7800
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#302117]/10 pb-2">
                  <dt className="text-[#302117]/55">Hours</dt>
                  <dd className="text-right font-medium">8:00 AM – 10:00 PM</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-1">
                  <dt className="text-[#302117]/55">Reply</dt>
                  <dd className="text-right font-medium">24–48 hours</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">#3050-11666 Steveston Hwy · Ironwood Plaza</p>
              <p className="mt-3 text-sm leading-relaxed text-[#302117]/70">
                Party trays with 24–48 hours notice: roast duck, char siu, chow mein, fried rice, dim sum platters.
              </p>
              <a href="tel:6042767800" className={`${buttonPrimary} mt-5 hidden w-full lg:inline-flex`}>
                Call us
              </a>
              <div className="mt-3 hidden gap-2 lg:grid lg:grid-cols-2">
                <Link href="/reservation" className={buttonOutline}>
                  Reserve
                </Link>
                <Link href="/location" className={buttonOutline}>
                  Location
                </Link>
              </div>
            </aside>
            <a href="tel:6042767800" className="mt-4 hidden text-sm text-[#302117]/70 underline underline-offset-4 lg:inline-block">
              Call us · (604) 276-7800
            </a>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#302117]/10 bg-[#FFF9F0]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-sm text-[#302117]/75">Daily 8:00 AM – 10:00 PM</p>
          <a href="tel:6042767800" className={`${buttonPrimary} shrink-0`}>
            Call
          </a>
        </div>
      </div>
    </div>
  )
}
