import { Resend } from "resend"
import { NextResponse } from "next/server"

const rateLimit = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5 // Max 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Reset if window has passed
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Check if limit exceeded
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  // Increment count
  record.count++
  return false
}

function isSpamMessage(message: string, email: string): boolean {
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|prize|claim|bitcoin|crypto|investment opportunity)\b/i,
    /\b(click here|act now|limited time|urgent)\b/i,
    /(http[s]?:\/\/[^\s]+){3,}/i, // More than 2 URLs
  ]

  const suspiciousEmailPatterns = [/@(tempmail|throwaway|guerrillamail|mailinator|10minutemail)/i]

  for (const pattern of spamPatterns) {
    if (pattern.test(message)) return true
  }

  for (const pattern of suspiciousEmailPatterns) {
    if (pattern.test(email)) return true
  }

  return false
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown"

    console.log("[v0] Contact form submission from IP:", ip)

    if (isRateLimited(ip)) {
      console.log("[v0] Rate limited")
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    console.log("[v0] Request body:", JSON.stringify(body, null, 2))

    const { name, email, phone, subject, message, website } = body

    if (website) {
      console.log("[v0] Honeypot triggered")
      return NextResponse.json({ success: true, id: "honeypot" })
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Missing required fields:", {
        name: !!name,
        email: !!email,
        subject: !!subject,
        message: !!message,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Invalid email:", email)
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (isSpamMessage(message, email)) {
      console.log("[v0] Spam detected")
      return NextResponse.json(
        { error: "Your message was flagged as spam. Please contact us directly at 604-276-7800." },
        { status: 400 },
      )
    }

    if (message.length < 10 || message.length > 5000) {
      console.log("[v0] Message length invalid:", message.length)
      return NextResponse.json({ error: "Message must be between 10 and 5000 characters" }, { status: 400 })
    }

    // Format subject line
    const subjectLabels: Record<string, string> = {
      catering: "Catering Inquiry",
      reservation: "Reservation Request",
      general: "General Inquiry",
    }

    const emailSubject = `[Cafe de A] ${subjectLabels[subject] || "New Inquiry"} from ${name}`

    console.log("[v0] Attempting to send email...")
    console.log("[v0] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: "Cafe de A <noreply@cafedea.ca>",
      to: ["inquiry@cafedea.ca"],
      replyTo: email,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background-color: #0d9488; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New ${subjectLabels[subject] || "Inquiry"}</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 24px;">
                  <!-- Subject Badge -->
                  <div style="margin-bottom: 20px;">
                    <span style="display: inline-block; background-color: #f0fdfa; color: #0d9488; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                      ${subjectLabels[subject] || subject}
                    </span>
                  </div>

                  <!-- Contact Details -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Name</strong>
                        <div style="color: #111827; font-size: 16px; margin-top: 4px;">${name}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Email</strong>
                        <div style="margin-top: 4px;">
                          <a href="mailto:${email}" style="color: #0d9488; font-size: 16px; text-decoration: none;">${email}</a>
                        </div>
                      </td>
                    </tr>
                    ${
                      phone
                        ? `
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Phone</strong>
                        <div style="margin-top: 4px;">
                          <a href="tel:${phone}" style="color: #0d9488; font-size: 16px; text-decoration: none;">${phone}</a>
                        </div>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                  </table>

                  <!-- Message -->
                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px;">
                    <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 8px;">Message</strong>
                    <div style="color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                  </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; font-size: 12px; margin: 0;">
                    This inquiry was sent from the Cafe de A website contact form.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data?.id)
    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
