"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import DatePicker from "@/components/reservation/DatePicker"
import GuestDetails from "@/components/reservation/GuestDetails"
import PartySizeSelector from "@/components/reservation/PartySizeSelector"
import ReservationSummary from "@/components/reservation/ReservationSummary"
import TimeSlotSelector, { type SlotOption } from "@/components/reservation/TimeSlotSelector"
import {
  formatBookableDateLabel,
  formatSlotLabel,
  isSlotInPast,
  isSlotTooSoon,
  restaurantToday,
} from "@/lib/reservation-when"

type FieldErrors = { name?: string; email?: string; phone?: string; time?: string }

export default function ReservationExperience() {
  const [partySize, setPartySize] = useState("2")
  const [reservationDate, setReservationDate] = useState(restaurantToday)
  const [reservationTime, setReservationTime] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [slots, setSlots] = useState<SlotOption[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [manageUrl, setManageUrl] = useState("")
  const [reservationStatus, setReservationStatus] = useState<"pending" | "confirmed" | "">("")

  const largeParty = Number(partySize) >= 7
  const serviceDown = Boolean(slotsError)

  const availableSlots = useMemo(
    () =>
      slots.filter(
        (slot) =>
          slot.available && !isSlotInPast(reservationDate, slot.time) && !isSlotTooSoon(reservationDate, slot.time),
      ),
    [slots, reservationDate],
  )

  useEffect(() => {
    const controller = new AbortController()
    const loadSlots = async () => {
      setSlotsLoading(true)
      setSlotsError("")
      try {
        const params = new URLSearchParams({
          date: reservationDate,
          partySize,
        })
        const response = await fetch(`/api/reservation-slots?${params}`, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Could not load available times")
        }
        const nextSlots: SlotOption[] = data.slots || []
        setSlots(nextSlots)
        setReservationTime((current) =>
          current && nextSlots.some((slot) => slot.time === current && slot.available) ? current : "",
        )
      } catch (loadError) {
        if (controller.signal.aborted) return
        setSlots([])
        setReservationTime("")
        setSlotsError(loadError instanceof Error ? loadError.message : "Could not load available times")
      } finally {
        if (!controller.signal.aborted) setSlotsLoading(false)
      }
    }

    void loadSlots()
    return () => controller.abort()
  }, [reservationDate, partySize])

  const onGuestChange = (field: "name" | "email" | "phone" | "message", value: string) => {
    if (field === "name") setName(value)
    if (field === "email") setEmail(value)
    if (field === "phone") setPhone(value)
    if (field === "message") setMessage(value)
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = "Please enter a name."
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email."
    if (phone.replace(/\D/g, "").length !== 10) next.phone = "Please enter a 10-digit phone number."
    if (!reservationTime) next.time = "Please pick an available time."
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (serviceDown) {
      setFormError("Online reservations are temporarily unavailable. Please call us at (604) 276-7800.")
      return
    }
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: "reservation",
          message,
          website,
          partySize,
          reservationDate,
          reservationTime,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || "Could not complete the reservation.")
      }
      setManageUrl(typeof data.manageUrl === "string" ? data.manageUrl : "")
      setReservationStatus(data.status === "pending" ? "pending" : "confirmed")
      setSubmitted(true)
    } catch (submitError) {
      setFormError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please call us at (604) 276-7800.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    const today = restaurantToday()
    setSubmitted(false)
    setManageUrl("")
    setReservationStatus("")
    setPartySize("2")
    setReservationDate(today)
    setReservationTime("")
    setName("")
    setEmail("")
    setPhone("")
    setMessage("")
    setFieldErrors({})
    setFormError(null)
  }

  if (submitted) {
    const pending = reservationStatus === "pending"
    return (
      <div className="min-h-screen bg-[#F7F0E3] text-[#302117] pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl sm:text-5xl">{pending ? "We have your request" : "See you soon"}</h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#302117]/75">
            {pending
              ? `A table for ${partySize} on ${formatBookableDateLabel(reservationDate)} at ${formatSlotLabel(reservationTime)} isn’t held yet. We’ll text this number if we can seat everyone.`
              : `You’re booked for ${partySize} on ${formatBookableDateLabel(reservationDate)} at ${formatSlotLabel(reservationTime)}. We sent a text with a link if you need to change or cancel.`}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {manageUrl ? (
              <a
                href={manageUrl}
                className="inline-flex h-12 items-center rounded-md bg-[#302117] px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029]"
              >
                {pending ? "Cancel this request" : "Change or cancel"}
              </a>
            ) : null}
            <button type="button" onClick={reset} className="h-12 px-2 text-sm underline underline-offset-4">
              Make another booking
            </button>
          </div>
        </div>
      </div>
    )
  }

  const submitDisabled = isSubmitting || slotsLoading || serviceDown || !reservationTime

  return (
    <div className="min-h-screen bg-[#F7F0E3] text-[#302117] pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-8 lg:pb-16">
        <header className="max-w-2xl pb-8">
          <p className="text-sm font-medium text-[#9A7420]">café de A · Ironwood Plaza</p>
          <h1 className="mt-2 font-tempus text-4xl leading-tight sm:text-5xl">Reserve a table</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#302117]/75">
            Come eat at Ironwood. Parties of 1–6 can book here. For 7 or more, call{" "}
            <a href="tel:6042767800" className="font-medium text-[#302117] underline underline-offset-4">
              (604) 276-7800
            </a>{" "}
            or send a request — we’ll text you.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-8">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="overflow-hidden rounded-md border border-[#302117]/12 bg-[#FFF9F0]">
            <section className="border-b border-[#302117]/10 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">Party</h2>
              <p className="mt-1 text-sm text-[#302117]/60">How many people?</p>
              <div className="mt-5">
                <PartySizeSelector
                  value={partySize}
                  onChange={(size) => {
                    setPartySize(size)
                    setReservationTime("")
                  }}
                />
              </div>
              {largeParty ? (
                <p className="mt-4 text-sm leading-relaxed text-[#302117]/70">
                  A table for {partySize} needs the floor to say yes. We’ll text you either way.
                </p>
              ) : null}
            </section>

            <section className="border-b border-[#302117]/10 bg-[#F7F0E3]/50 px-5 py-8 sm:px-8">
              <h2 className="font-tempus text-2xl">When</h2>
              <p className="mt-1 text-sm text-[#302117]/60">Pick a day, then a time that works.</p>
              <div className="mt-5 max-w-sm">
                <label className="mb-1.5 block text-sm text-[#302117]/70" htmlFor="reservation-date-trigger">
                  Date
                </label>
                <DatePicker
                  value={reservationDate}
                  onChange={(date) => {
                    setReservationDate(date)
                    setReservationTime("")
                  }}
                />
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm text-[#302117]/70">Time</p>
                <TimeSlotSelector
                  slots={availableSlots}
                  value={reservationTime}
                  onChange={(time) => {
                    setReservationTime(time)
                    setFieldErrors((prev) => ({ ...prev, time: undefined }))
                  }}
                  loading={slotsLoading}
                  serviceDown={serviceDown}
                  empty={!slotsLoading && !serviceDown && availableSlots.length === 0}
                />
                {fieldErrors.time ? (
                  <p className="mt-2 text-sm text-[#9b2c2c]" role="alert">
                    {fieldErrors.time}
                  </p>
                ) : null}
              </div>
            </section>

            <section className="px-5 py-8 sm:px-8">
              <GuestDetails
                name={name}
                email={email}
                phone={phone}
                notes={message}
                errors={fieldErrors}
                onChange={onGuestChange}
              />
              {formError ? (
                <p className="mt-6 text-sm text-[#9b2c2c]" role="alert">
                  {formError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitDisabled}
                className="mt-8 hidden h-12 items-center justify-center rounded-md bg-[#302117] px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1C2029] disabled:cursor-not-allowed disabled:opacity-50 lg:inline-flex"
              >
                {isSubmitting ? "Sending…" : largeParty ? "Send request" : "Book a table"}
              </button>
            </section>
          </div>

          <div className="mt-6 lg:sticky lg:top-28 lg:mt-0">
            <ReservationSummary
              partySize={partySize}
              date={reservationDate}
              time={reservationTime}
              name={name}
              largeParty={largeParty}
            />
            <a href="tel:6042767800" className="mt-4 hidden text-sm text-[#302117]/70 underline underline-offset-4 lg:inline-block">
              Call us · (604) 276-7800
            </a>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#302117]/10 bg-[#FFF9F0]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
            <div className="mx-auto flex max-w-6xl items-center gap-3">
              <p className="min-w-0 flex-1 truncate text-sm text-[#302117]/75">
                {partySize} · {formatBookableDateLabel(reservationDate)}
                {reservationTime ? ` · ${formatSlotLabel(reservationTime)}` : ""}
              </p>
              <button
                type="submit"
                disabled={submitDisabled}
                className="h-12 shrink-0 rounded-md bg-[#302117] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending…" : largeParty ? "Send request" : "Book a table"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
