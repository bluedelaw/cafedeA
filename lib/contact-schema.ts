import { z } from "zod"
import {
  addDays,
  isCivilDate,
  isPermittedReservationTime,
  isSlotInPast,
  isSlotTooSoon,
  restaurantToday,
} from "@/lib/reservation-when"

const ymd = /^\d{4}-\d{2}-\d{2}$/
const hm = /^\d{2}:\d{2}$/

export const contactInquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.enum(["general", "catering", "reservation"]),
  message: z.string().max(5000).optional().default(""),
  website: z.string().max(200).optional().default(""),
  reservationDate: z.string().optional().default(""),
  reservationTime: z.string().optional().default(""),
  partySize: z.union([z.string(), z.number()]).optional(),
})

export const reservationFieldsSchema = z.object({
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 10, "A 10-digit phone number is required for reservations."),
  reservationDate: z
    .string()
    .regex(ymd)
    .refine(isCivilDate, "Please choose a valid calendar date."),
  reservationTime: z
    .string()
    .regex(hm)
    .refine(isPermittedReservationTime, "Please choose a time the restaurant accepts reservations."),
  partySize: z.coerce.number().int().min(1).max(12),
  message: z.string().max(500).optional().default(""),
})

export const slotQuerySchema = z.object({
  date: z
    .string()
    .regex(ymd)
    .refine(isCivilDate, "Please choose a valid calendar date."),
  partySize: z.coerce.number().int().min(1).max(12),
})

export function isBookableDate(date: string, now = new Date()) {
  if (!isCivilDate(date)) return false
  const today = restaurantToday(now)
  const last = addDays(today, 30)
  return date >= today && date <= last
}

export function isBookableReservation(date: string, time: string, now = new Date()) {
  return (
    isBookableDate(date, now) &&
    isPermittedReservationTime(time) &&
    !isSlotInPast(date, time, now) &&
    !isSlotTooSoon(date, time, undefined, now)
  )
}
