const OPEN_MINUTES = 8 * 60
const LAST_SLOT_MINUTES = 21 * 60
const INTERVAL = 15
const BOOKABLE_DAYS = 30
const WINDOW_MINUTES = 120

export function restaurantToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" })
}

export function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return next.toISOString().slice(0, 10)
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

function restaurantNowMinutes() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date())
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "0")
  const minute = Number(parts.find((part) => part.type === "minute")?.value || "0")
  return hour * 60 + minute
}

export function isSlotInPast(date: string, time: string) {
  const today = restaurantToday()
  if (date > today) return false
  if (date < today) return true
  const [hours, minutes] = String(time || "").split(":").map(Number)
  const slotMinutes = (Number(hours) || 0) * 60 + (Number.isFinite(minutes) ? minutes : 0)
  return restaurantNowMinutes() > slotMinutes
}

function slotMinutes(time: string) {
  const [hours, minutes] = String(time || "").split(":").map(Number)
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0)
}

export function isSlotTooSoon(date: string, time: string, minAdvanceMinutes = 60) {
  if (date > restaurantToday()) return false
  if (date < restaurantToday()) return true
  return slotMinutes(time) - restaurantNowMinutes() < minAdvanceMinutes
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
