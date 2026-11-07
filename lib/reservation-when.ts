import { RESTAURANT_TIMEZONE } from "@/lib/restaurant-clock"

const OPEN_MINUTES = 8 * 60
const LAST_SLOT_MINUTES = 21 * 60
const INTERVAL = 15
const BOOKABLE_DAYS = 30
const WINDOW_MINUTES = 120
export const MIN_ADVANCE_MINUTES = 60

export function restaurantToday(now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: RESTAURANT_TIMEZONE })
}

export function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return next.toISOString().slice(0, 10)
}

export function isCivilDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const [year, month, day] = date.split("-").map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day))
  return utc.getUTCFullYear() === year && utc.getUTCMonth() === month - 1 && utc.getUTCDate() === day
}

export function formatBookableDateLabel(date: string, today = restaurantToday()) {
  if (date === today) return "Today"
  if (date === addDays(today, 1)) return "Tomorrow"
  const [year, month, day] = date.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function bookableDateOptions() {
  const today = restaurantToday()
  return Array.from({ length: BOOKABLE_DAYS + 1 }, (_, index) => {
    const date = addDays(today, index)
    return { date, label: formatBookableDateLabel(date, today) }
  })
}

export function generateReservationSlots() {
  const slots: string[] = []
  for (let minutes = OPEN_MINUTES; minutes <= LAST_SLOT_MINUTES; minutes += INTERVAL) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
  }
  return slots
}

const PERMITTED_SLOTS = new Set(generateReservationSlots())

export function isPermittedReservationTime(time: string) {
  return PERMITTED_SLOTS.has(time)
}

export function formatSlotLabel(time: string) {
  const [rawHours, rawMinutes] = String(time || "").split(":")
  const hours = Number(rawHours)
  const minutes = Number(rawMinutes)
  const safeHours = Number.isFinite(hours) ? hours : 0
  const safeMinutes = Number.isFinite(minutes) ? minutes : 0
  const ampm = safeHours >= 12 ? "PM" : "AM"
  const displayHour = safeHours % 12 || 12
  return `${displayHour}:${String(safeMinutes).padStart(2, "0")} ${ampm}`
}

function restaurantNowMinutes(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "0")
  const minute = Number(parts.find((part) => part.type === "minute")?.value || "0")
  return hour * 60 + minute
}

export function isSlotInPast(date: string, time: string, now = new Date()) {
  const today = restaurantToday(now)
  if (date > today) return false
  if (date < today) return true
  const [hours, minutes] = String(time || "").split(":").map(Number)
  const slotMinutes = (Number(hours) || 0) * 60 + (Number.isFinite(minutes) ? minutes : 0)
  return restaurantNowMinutes(now) > slotMinutes
}

function slotMinutes(time: string) {
  const [hours, minutes] = String(time || "").split(":").map(Number)
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0)
}

export function isSlotTooSoon(date: string, time: string, minAdvanceMinutes = MIN_ADVANCE_MINUTES, now = new Date()) {
  if (date > restaurantToday(now)) return false
  if (date < restaurantToday(now)) return true
  return slotMinutes(time) - restaurantNowMinutes(now) < minAdvanceMinutes
}

export function defaultAroundTime(date: string) {
  if (date > restaurantToday()) return "18:00"
  return generateReservationSlots().find((slot) => !isSlotInPast(date, slot) && !isSlotTooSoon(date, slot)) || "12:00"
}

export function nearbySlotTimes(preferredTime: string, date: string) {
  const center = slotMinutes(preferredTime || defaultAroundTime(date))
  return generateReservationSlots().filter((slot) => {
    if (isSlotInPast(date, slot) || isSlotTooSoon(date, slot)) return false
    return Math.abs(slotMinutes(slot) - center) <= WINDOW_MINUTES
  })
}

export function aroundTimeOptions(date: string) {
  return generateReservationSlots().filter((slot) => !isSlotInPast(date, slot) && !isSlotTooSoon(date, slot))
}

export function parseCivilDate(date: string) {
  const [year, month, day] = String(date || "").split("-").map(Number)
  return new Date(year || 1970, (month || 1) - 1, day || 1)
}

export function formatCivilYmd(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function mealPeriod(time: string): "Morning" | "Lunch" | "Afternoon" | "Dinner" {
  const [hours, minutes] = String(time || "").split(":").map(Number)
  const value = (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0)
  if (value < 11 * 60) return "Morning"
  if (value < 14 * 60 + 30) return "Lunch"
  if (value < 17 * 60 + 30) return "Afternoon"
  return "Dinner"
}

export function isFriendlyServiceError(message: string) {
  return /not configured|temporarily unavailable|503|reservation service/i.test(message)
}
