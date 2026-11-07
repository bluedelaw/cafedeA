import { Resend } from "resend"
import { NextResponse } from "next/server"
import { createWaitlistReservation, waitlistReservationConfigured } from "@/lib/waitlist-reservation"
import { contactInquirySchema, isBookableReservation, reservationFieldsSchema } from "@/lib/contact-schema"
import { escapeHtml } from "@/lib/html-escape"
import { clientKey, isRateLimited } from "@/lib/rate-limit"
import { RequestTooLargeError, readLimitedJson } from "@/lib/request-body"

const MAX_BODY_BYTES = 50_000
const WAITLIST_HOST = "cafedeawaitlist.vercel.app"

function isSpamMessage(message: string, email: string) {
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|prize|claim|bitcoin|crypto|investment opportunity)\b/i,
    /\b(click here|act now|limited time|urgent)\b/i,
    /(https?:\/\/[^\s]+){3,}/i,
  ]
  const suspiciousEmailPatterns = /@(tempmail|throwaway|guerrillamail|mailinator|10minutemail)/i
  return spamPatterns.some((pattern) => pattern.test(message)) || suspiciousEmailPatterns.test(email)
}

function safeManageUrl(value: string) {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:") return ""
    if (url.hostname !== WAITLIST_HOST && !url.hostname.endsWith(`.${WAITLIST_HOST}`)) return ""
    return url.toString()
  } catch {
    return ""
  }
}

export async function POST(request: Request) {
  try {
    if (await isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } },
      )
    }

    let body: unknown
    try {
      body = await readLimitedJson(request, MAX_BODY_BYTES)
    } catch (error) {
      if (error instanceof RequestTooLargeError) {
        return NextResponse.json({ error: "Request is too large." }, { status: 413 })
      }
      return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }

    if (typeof (body as { website?: string }).website === "string" && (body as { website: string }).website.trim()) {
      return NextResponse.json({ success: true })
    }

    const parsed = contactInquirySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 })
    }

    const inquiry = parsed.data

    if (isSpamMessage(inquiry.message, inquiry.email)) {
      return NextResponse.json(
        { error: "Your message was flagged as spam. Please call us at (604) 276-7800." },
        { status: 400 },
      )
    }

    const isReservation = inquiry.subject === "reservation"
    let manageUrl = ""
    let reservationId = ""
    let reservationStatus: "pending" | "confirmed" | "" = ""
    let partySize = 0
    let reservationDate = ""
    let reservationTime = ""
    let phone = inquiry.phone

    if (isReservation) {
      const reservation = reservationFieldsSchema.safeParse({
        phone: inquiry.phone,
        reservationDate: inquiry.reservationDate,
        reservationTime: inquiry.reservationTime,
        partySize: inquiry.partySize,
        message: inquiry.message,
      })
      if (
        !reservation.success ||
        !isBookableReservation(reservation.data.reservationDate, reservation.data.reservationTime)
      ) {
        return NextResponse.json({ error: "Please choose a valid date, time, and party size." }, { status: 400 })
      }

      if (!waitlistReservationConfigured()) {
        return NextResponse.json(
          { error: "Online reservations are unavailable. Please call us at (604) 276-7800." },
          { status: 503 },
        )
      }

      partySize = reservation.data.partySize
      reservationDate = reservation.data.reservationDate
      reservationTime = reservation.data.reservationTime
      phone = reservation.data.phone

      const booked = await createWaitlistReservation({
        name: inquiry.name,
        email: inquiry.email,
        phone,
        partySize,
        reservationDate,
        reservationTime,
        specialRequests: reservation.data.message,
        website: inquiry.website,
      })

      if (!booked.ok) {
        return NextResponse.json(
          { error: "That time is unavailable. Please pick another slot or call us." },
          { status: booked.status && booked.status < 500 ? booked.status : 400 },
        )
      }
      reservationId = String(booked.data.id || "")
      manageUrl = safeManageUrl(String(booked.data.manageUrl || ""))
      reservationStatus = booked.data.status === "pending" ? "pending" : "confirmed"
    } else if (inquiry.message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be between 10 and 5000 characters." }, { status: 400 })
    }

    const subjectLabels: Record<typeof inquiry.subject, string> = {
      catering: "Catering Inquiry",
      reservation: "Reservation",
      general: "General Inquiry",
    }

    const emailSubject = `[Cafe de A] ${subjectLabels[inquiry.subject]} from ${inquiry.name}`
    const safeName = escapeHtml(inquiry.name)
    const safeEmail = escapeHtml(inquiry.email)
    const safePhone = escapeHtml(phone)
    const safeMessage = escapeHtml(inquiry.message)
    const safeDate = escapeHtml(reservationDate)
    const safeTime = escapeHtml(reservationTime)
    const safeParty = escapeHtml(partySize)
    const safeManage = escapeHtml(manageUrl)

    if (!process.env.RESEND_API_KEY) {
      if (isReservation) {
        return NextResponse.json({
          success: true,
          booked: true,
          emailSent: false,
          id: reservationId,
          manageUrl,
          status: reservationStatus,
        })
      }
      return NextResponse.json(
        { error: "Email service is not configured. Please call us at (604) 276-7800." },
        { status: 503 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: "Cafe de A <noreply@cafedea.ca>",
      to: ["inquiry@cafedea.ca"],
      replyTo: inquiry.email,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Georgia, 'Times New Roman', serif; margin: 0; padding: 24px; background-color: #F7F0E3; color: #302117;">
            <div style="max-width: 600px; margin: 0 auto; background: #FFF9F0; border: 1px solid #30211722; padding: 24px;">
              <h1 style="font-size: 22px; margin: 0 0 16px;">${escapeHtml(subjectLabels[inquiry.subject])}</h1>
              <p style="margin: 0 0 8px;"><strong>Name</strong><br>${safeName}</p>
              <p style="margin: 0 0 8px;"><strong>Email</strong><br><a href="mailto:${safeEmail}" style="color: #C41E3A;">${safeEmail}</a></p>
              ${phone ? `<p style="margin: 0 0 8px;"><strong>Phone</strong><br><a href="tel:${safePhone}" style="color: #C41E3A;">${safePhone}</a></p>` : ""}
              ${
                isReservation
                  ? `<p style="margin: 0 0 8px;"><strong>Reservation</strong><br>${safeParty} guests · ${safeDate} · ${safeTime}</p>`
                  : ""
              }
              <p style="margin: 16px 0 0; white-space: pre-wrap;">${safeMessage || "—"}</p>
              <p style="margin: 24px 0 0; font-size: 12px; color: #30211799;">
                ${
                  isReservation
                    ? `This booking is ${reservationStatus === "pending" ? "pending staff confirmation" : "confirmed"}.${manageUrl ? ` Guest link: ${safeManage}` : ""}`
                    : "Sent from the café de A website contact form."
                }
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      if (isReservation) {
        return NextResponse.json({
          success: true,
          booked: true,
          emailSent: false,
          id: reservationId,
          manageUrl,
          status: reservationStatus,
        })
      }
      return NextResponse.json({ error: "Could not send your message. Please call us at (604) 276-7800." }, { status: 500 })
    }

    if (isReservation && manageUrl) {
      try {
        await resend.emails.send({
          from: "Cafe de A <noreply@cafedea.ca>",
          to: [inquiry.email],
          subject:
            reservationStatus === "pending"
              ? "Reservation request received — not confirmed yet"
              : "Your Cafe de A reservation is confirmed",
          html: `
            <p>Hi ${safeName},</p>
            <p>${
              reservationStatus === "pending"
                ? `This is not a confirmed table. We received your request for ${safeParty} guests on ${safeDate} at ${safeTime}. Parties of 7 or more need staff to accept the booking. We'll text you if it's confirmed — please don't come in until you get that second text.`
                : `Your reservation for ${safeParty} guests on ${safeDate} at ${safeTime} is confirmed. We also sent a text to your phone. You can change the date, time, or party size until 2 hours before arrival. After that, only notes and cancel stay open.`
            }</p>
            <p>${reservationStatus === "pending" ? "You can view or cancel this request here:" : "You can change or cancel it here:"}</p>
            <p><a href="${safeManage}">${safeManage}</a></p>
            <p>Cafe de A<br/>(604) 276-7800</p>
          `,
        })
      } catch {
        // Guest email is secondary to the booking itself.
      }
    }

    return NextResponse.json({
      success: true,
      id: isReservation ? reservationId : data?.id,
      manageUrl: manageUrl || undefined,
      status: reservationStatus || undefined,
      booked: isReservation,
    })
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again or call us." }, { status: 500 })
  }
}
