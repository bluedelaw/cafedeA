import InquiryForm from "@/components/InquiryForm"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Reserve a Table | café de A Richmond BC",
  description:
    "Book a table online at café de A in Ironwood Plaza, Richmond BC. Pick a date, time, and party size. Parties of 1–6 are confirmed instantly when a time is open.",
  alternates: {
    canonical: "https://cafedea.ca/reservation",
  },
  openGraph: {
    title: "Reserve a Table | café de A Richmond",
    description: "Book a table online at café de A. Pick a date, time, and party size.",
    url: "https://cafedea.ca/reservation",
    siteName: "café de A",
    locale: "en_CA",
    type: "website",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://cafedea.ca",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Reserve",
      item: "https://cafedea.ca/reservation",
    },
  ],
}

export default function ReservationPage() {
  return (
    <div className="min-h-screen flex flex-col pt-24">
      <Script
        id="breadcrumb-schema-reservation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InquiryForm initialSubject="reservation" />
    </div>
  )
}
