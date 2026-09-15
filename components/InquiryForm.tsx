"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Send,
  Utensils,
  CalendarDays,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import {
  bookableDateOptions,
  defaultAroundTime,
  formatSlotLabel,
  generateReservationSlots,
  isSlotInPast,
  nearbySlotTimes,
  restaurantToday,
} from "@/lib/reservation-when"

type SubjectType = "catering" | "reservation" | "general"

type SlotOption = {
  time: string
  label: string
  available: boolean
  tableLabel?: string | null
  seatsLeft?: number
  reason: string | null
}

export default function InquiryForm({ initialSubject = "general" }: { initialSubject?: SubjectType }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
    website: "",
    partySize: "2",
    reservationDate: restaurantToday(),
    reservationTime: "",
  })
  const [manageUrl, setManageUrl] = useState("")
  const [reservationStatus, setReservationStatus] = useState<"pending" | "confirmed" | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slots, setSlots] = useState<SlotOption[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [aroundTime, setAroundTime] = useState(() => defaultAroundTime(restaurantToday()))

  const subjects = [
    {
      id: "catering" as SubjectType,
      label: "Catering",
      chineseLabel: "到會服務",
      icon: Utensils,
      description: "Party trays & large group events",
    },
    {
      id: "reservation" as SubjectType,
      label: "Reservation",
      chineseLabel: "訂座查詢",
      icon: CalendarDays,
      description: "Pick a date, time, and party size",
    },
    {
      id: "general" as SubjectType,
      label: "General Inquiry",
      chineseLabel: "一般查詢",
      icon: MessageSquare,
      description: "Feedback & questions",
    },
  ]

  useEffect(() => {
    if (formData.subject !== "reservation") return

    const controller = new AbortController()
    const loadSlots = async () => {
      setSlotsLoading(true)
      setSlotsError("")
      try {
        const params = new URLSearchParams({
          date: formData.reservationDate,
          partySize: formData.partySize,
        })
        const response = await fetch(`/api/reservation-slots?${params}`, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Could not load available times")
        }
        setSlots(data.slots || [])
        if (formData.reservationTime && !(data.slots || []).some((slot: SlotOption) => slot.time === formData.reservationTime && slot.available)) {
          setFormData((prev) => ({ ...prev, reservationTime: "" }))
        }
      } catch (loadError) {
        if (controller.signal.aborted) return
        setSlots([])
        setSlotsError(loadError instanceof Error ? loadError.message : "Could not load available times")
      } finally {
        if (!controller.signal.aborted) setSlotsLoading(false)
      }
    }

    void loadSlots()
    return () => controller.abort()
  }, [formData.subject, formData.reservationDate, formData.partySize])

  const nearbyTimes = nearbySlotTimes(aroundTime, formData.reservationDate)
  const visibleSlots = slots.filter((slot) => nearbyTimes.includes(slot.time))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (formData.subject === "reservation") {
      if (!formData.phone.replace(/\D/g, "") || formData.phone.replace(/\D/g, "").length !== 10) {
        setError("A 10-digit phone number is required for reservations.")
        setIsSubmitting(false)
        return
      }
      if (!formData.reservationDate || !formData.reservationTime) {
        setError("Choose a date and an available time slot.")
        setIsSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || "Failed to send inquiry")
      }

      setManageUrl(typeof data.manageUrl === "string" ? data.manageUrl : "")
      setReservationStatus(data.status === "pending" ? "pending" : formData.subject === "reservation" ? "confirmed" : "")
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

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {initialSubject === "reservation" ? "RESERVE A TABLE · 網上訂座" : "GET IN TOUCH · 聯絡我們與到會服務"}
            </span>
          </div>
          <h1 className="font-tempus text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {initialSubject === "reservation" ? "Reserve a Table" : "Contact & Catering Inquiries"}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {initialSubject === "reservation"
              ? "Pick a date, time, and party size. Parties of 1–6 are confirmed if the time is open. Larger parties are confirmed by staff."
              : "Have questions regarding party catering trays, group reservations, or menu customizations? We're here to help."}
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main: Form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-center mx-auto text-teal-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 font-tempus">
                    {formData.subject === "reservation"
                      ? reservationStatus === "pending"
                        ? "Reservation requested"
                        : "Reservation confirmed"
                      : "Thank You for Your Message!"}
                  </h2>
                  <p className="text-sm font-semibold text-teal-700 font-chinese">
                    {formData.subject === "reservation"
                      ? reservationStatus === "pending"
                        ? "訂座已送出，待確認"
                        : "訂座已確認"
                      : "感謝您的查詢"}
                  </p>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    {formData.subject === "reservation"
                      ? reservationStatus === "pending"
                        ? "Parties of 7 or more need staff to confirm a table. We'll text this phone number when it's confirmed. Use the link below to change or cancel."
                        : "Your table is confirmed. We sent a text to this phone number with a link to change or cancel."
                      : "We have received your inquiry and our team will get back to you within 24 to 48 hours."}
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  {formData.subject === "reservation" && manageUrl && (
                    <a
                      href={manageUrl}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-teal-600 text-teal-800 text-sm font-semibold rounded-xl"
                    >
                      Change or cancel reservation
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setManageUrl("")
                      setReservationStatus("")
                      setAroundTime(defaultAroundTime(restaurantToday()))
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: initialSubject,
                        message: "",
                        website: "",
                        partySize: "2",
                        reservationDate: restaurantToday(),
                        reservationTime: "",
                      })
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <span>Send Another Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {/* Honeypot */}
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

                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                {/* Subject Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Inquiry Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {subjects.map((subject) => {
                      const Icon = subject.icon
                      const isSelected = formData.subject === subject.id
                      return (
                        <button
                          key={subject.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, subject: subject.id, reservationTime: "" }))}
                          className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                            isSelected
                              ? "border-teal-600 bg-teal-50/70 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-teal-600" : "text-gray-400"}`} />
                          <p className={`font-bold text-sm ${isSelected ? "text-teal-900" : "text-gray-900"}`}>
                            {subject.label}
                          </p>
                          <p className="text-xs text-teal-700 font-chinese font-semibold">{subject.chineseLabel}</p>
                          <p className="text-[11px] text-gray-500 mt-1">{subject.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#faf8f5]/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm transition-all"
                      placeholder="e.g. Alex Wong"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#faf8f5]/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm transition-all"
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Phone Number{" "}
                    {formData.subject === "reservation" ? (
                      <span className="text-rose-500">*</span>
                    ) : (
                      <span className="text-gray-400 font-normal">(Optional for faster response)</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required={formData.subject === "reservation"}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#faf8f5]/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm transition-all"
                    placeholder="(604) 123-4567"
                  />
                </div>

                {formData.subject === "reservation" && (
                  <div className="space-y-4 rounded-2xl border border-teal-100 bg-teal-50/40 p-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Party size <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, partySize: size, reservationTime: "" }))}
                            className={`h-11 rounded-xl text-sm font-bold ${
                              formData.partySize === size ? "bg-teal-600 text-white" : "bg-white text-gray-800 border border-gray-200"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="reservationDate" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Date <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="reservationDate"
                        name="reservationDate"
                        required
                        value={formData.reservationDate}
                        onChange={(e) => {
                          const date = e.target.value
                          setAroundTime(defaultAroundTime(date))
                          setFormData((prev) => ({ ...prev, reservationDate: date, reservationTime: "" }))
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm"
                      >
                        {bookableDateOptions().map((option) => (
                          <option key={option.date} value={option.date}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="aroundTime" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Around <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="aroundTime"
                        value={aroundTime}
                        onChange={(e) => {
                          setAroundTime(e.target.value)
                          setFormData((prev) => ({ ...prev, reservationTime: "" }))
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm mb-3"
                      >
                        {generateReservationSlots().map((slot) => (
                          <option key={slot} value={slot} disabled={isSlotInPast(formData.reservationDate, slot)}>
                            {formatSlotLabel(slot)}
                          </option>
                        ))}
                      </select>
                      {slotsLoading ? (
                        <p className="text-sm text-gray-500">Loading available times…</p>
                      ) : slotsError ? (
                        <p className="text-sm text-rose-700">{slotsError}</p>
                      ) : visibleSlots.length === 0 ? (
                        <p className="text-xs text-gray-500 mb-2">
                          No upcoming times around {formatSlotLabel(aroundTime)}. Pick a later time.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                          {visibleSlots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => setFormData((prev) => ({ ...prev, reservationTime: slot.time }))}
                              className={`min-h-14 rounded-xl border px-2 py-2 text-center text-sm ${
                                formData.reservationTime === slot.time
                                  ? "bg-teal-600 border-teal-600 text-white"
                                  : slot.available
                                    ? "bg-white border-gray-200 text-gray-900"
                                    : "bg-gray-100 border-gray-200 text-gray-400"
                              }`}
                            >
                              <span className="block font-semibold">{slot.label || formatSlotLabel(slot.time)}</span>
                              <span className="block text-[11px] opacity-80">
                                {slot.available ? "Available" : slot.reason || "Full"}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    {formData.subject === "reservation" ? "Notes" : "Message Details"}{" "}
                    {formData.subject === "reservation" ? (
                      <span className="text-gray-400 font-normal">(Optional)</span>
                    ) : (
                      <span className="text-rose-500">*</span>
                    )}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required={formData.subject !== "reservation"}
                    rows={4}
                    maxLength={formData.subject === "reservation" ? 500 : 5000}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#faf8f5]/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-sm transition-all resize-none"
                    placeholder={
                      formData.subject === "catering"
                        ? "Please let us know: event date, estimated number of guests, preferred dishes or party trays..."
                        : formData.subject === "reservation"
                          ? "High chair, window seat, allergies..."
                          : "How can we help you?"
                    }
                  />
                </div>

                {formData.subject === "reservation" && formData.reservationDate && formData.reservationTime && (
                  <p className="text-sm text-teal-900 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3">
                    {Number(formData.partySize) >= 7
                      ? "Parties of 7 or more are sent to staff to confirm. We'll text you when the table is set. You don't need to call."
                      : "If the time shows available, your table is confirmed. We'll text a link to this phone number so you can change or cancel."}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.subject || (formData.subject === "reservation" && (slotsLoading || Boolean(slotsError) || !formData.reservationTime))}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-tempus"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>
                        {formData.subject === "reservation"
                          ? Number(formData.partySize) >= 7
                            ? "Sending request..."
                            : "Booking..."
                          : "Sending Message..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        {formData.subject === "reservation"
                          ? Number(formData.partySize) >= 7
                            ? "Request this time"
                            : "Book this time"
                          : "Submit Inquiry"}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Direct Hotline Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold font-tempus text-gray-900">Direct Contact</h3>
                <p className="text-xs text-gray-500 mt-0.5">Reach us by phone or visit our restaurant</p>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Telephone</span>
                    <a href="tel:6042767800" className="text-teal-700 hover:underline font-semibold text-base">
                      (604) 276-7800
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Restaurant Address</span>
                    <span>#3050 - 11666 Steveston Hwy</span>
                    <br />
                    <span>Ironwood Plaza, Richmond, BC</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Service Hours</span>
                    <span>Open Daily: 8:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catering Services Box */}
            <div className="bg-[#1a1f29] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                <Utensils className="w-3.5 h-3.5" />
                <span>Catering Specialties · 團體到會</span>
              </div>
              <h4 className="text-xl font-bold font-tempus">Party Trays & Large Orders</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                We accommodate party trays for Cantonese BBQ roast duck, honey char siu, chow mein, fried rice, and dim sum platters.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>24–48 hours advance notice recommended</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Custom packaging for hot & fresh delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
