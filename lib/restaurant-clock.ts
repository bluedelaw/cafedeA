export const RESTAURANT_TIMEZONE = "America/Vancouver"
const OPEN_MINUTES = 8 * 60
const CLOSE_MINUTES = 22 * 60

export function restaurantClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)

  const weekday = parts.find((part) => part.type === "weekday")?.value || "Sun"
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "0")
  const minute = Number(parts.find((part) => part.type === "minute")?.value || "0")
  const weekdayMap: Record<string, string> = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  }

  const minutes = hour * 60 + minute
  return {
    dayName: weekdayMap[weekday] || "Sunday",
    minutes,
    isOpen: minutes >= OPEN_MINUTES && minutes < CLOSE_MINUTES,
  }
}
