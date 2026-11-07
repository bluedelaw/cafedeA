import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { addDays, isCivilDate, isPermittedReservationTime, restaurantToday } from "./reservation-when"
import { contactInquirySchema, isBookableDate, isBookableReservation, reservationFieldsSchema } from "./contact-schema"

describe("contact inquiry schema", () => {
  it("accepts a general inquiry with required contact details", () => {
    const parsed = contactInquirySchema.safeParse({
      name: "Daniel",
      email: "daniel@example.com",
      subject: "general",
      message: "Please email me about catering trays.",
    })
    assert.equal(parsed.success, true)
  })

  it("rejects missing name and invalid email", () => {
    const parsed = contactInquirySchema.safeParse({
      name: "  ",
      email: "not-an-email",
      subject: "general",
      message: "Hello there, this is long enough.",
    })
    assert.equal(parsed.success, false)
  })
})

describe("reservation fields schema", () => {
  it("requires a 10-digit phone, party size, and a real calendar date", () => {
    const ok = reservationFieldsSchema.safeParse({
      phone: "(604) 555-0100",
      reservationDate: "2026-12-01",
      reservationTime: "18:00",
      partySize: "4",
    })
    assert.equal(ok.success, true)
    if (ok.success) {
      assert.equal(ok.data.phone, "6045550100")
      assert.equal(ok.data.partySize, 4)
    }

    const badDate = reservationFieldsSchema.safeParse({
      phone: "6045550100",
      reservationDate: "2026-02-31",
      reservationTime: "18:00",
      partySize: 2,
    })
    assert.equal(badDate.success, false)

    const badTime = reservationFieldsSchema.safeParse({
      phone: "6045550100",
      reservationDate: "2026-12-01",
      reservationTime: "18:07",
      partySize: 2,
    })
    assert.equal(badTime.success, false)
    assert.equal(isPermittedReservationTime("18:00"), true)
    assert.equal(isPermittedReservationTime("21:00"), true)
    assert.equal(isPermittedReservationTime("21:15"), false)
    assert.equal(isPermittedReservationTime("07:45"), false)
  })
})

describe("bookable dates and times", () => {
  it("accepts today through 30 days ahead and rejects the past", () => {
    const now = new Date("2026-06-15T18:00:00-07:00")
    const today = restaurantToday(now)
    assert.equal(isCivilDate(today), true)
    assert.equal(isBookableDate(today, now), true)
    assert.equal(isBookableDate(addDays(today, 30), now), true)
    assert.equal(isBookableDate(addDays(today, 31), now), false)
    assert.equal(isBookableDate(addDays(today, -1), now), false)
  })

  it("rejects past slots and times inside the 60-minute notice window", () => {
    const now = new Date("2026-06-15T18:00:00-07:00")
    const today = restaurantToday(now)
    assert.equal(isBookableReservation(today, "18:00", now), false)
    assert.equal(isBookableReservation(today, "19:00", now), true)
    assert.equal(isBookableReservation(addDays(today, 1), "08:00", now), true)
  })
})
