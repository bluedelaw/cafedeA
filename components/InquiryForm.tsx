"use client"

import type React from "react"

import { useState } from "react"
import { Send, Utensils, CalendarDays, MessageSquare, Mail } from "lucide-react"

type SubjectType = "catering" | "reservation" | "general"

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "" as SubjectType | "",
    message: "",
    website: "", // Honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subjects = [
    {
      id: "catering" as SubjectType,
      label: "Catering",
      chineseLabel: "到會服務",
      icon: Utensils,
    },
    {
      id: "reservation" as SubjectType,
      label: "Reservation",
      chineseLabel: "訂座",
      icon: CalendarDays,
    },
    {
      id: "general" as SubjectType,
      label: "General Inquiry",
      chineseLabel: "一般查詢",
      icon: MessageSquare,
    },
  ]

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
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send inquiry")
      }

      setSubmitted(true)
    } catch (err) {
      setError("Failed to send your inquiry. Please try again or contact us directly at 604-276-7800.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-2">感謝您的查詢</p>
            <p className="text-gray-600 mb-4">
              We've received your inquiry and will get back to you within 24-48 hours.
            </p>
            <div className="flex items-center justify-center gap-2 text-teal-600 mb-6">
              <Mail className="w-5 h-5" />
              <p className="font-medium">We will contact you via email regarding this matter.</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: "", email: "", phone: "", subject: "", message: "", website: "" })
              }}
              className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-500 mb-1">聯絡我們</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about catering, reservations, or anything else? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <input
              type="text"
              name="website"
              value={formData.website || ""}
              onChange={handleInputChange}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {subjects.map((subject) => {
                  const Icon = subject.icon
                  const isSelected = formData.subject === subject.id
                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, subject: subject.id }))}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-teal-600" : "text-gray-400"}`} />
                      <p className={`font-medium text-sm ${isSelected ? "text-teal-600" : "text-gray-900"}`}>
                        {subject.label}
                      </p>
                      <p className="text-xs text-gray-500">{subject.chineseLabel}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="604-XXX-XXXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                placeholder={
                  formData.subject === "catering"
                    ? "Tell us about your event: date, number of guests, dietary requirements..."
                    : formData.subject === "reservation"
                      ? "Preferred date, time, party size, any special requests..."
                      : "How can we help you?"
                }
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.subject}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
