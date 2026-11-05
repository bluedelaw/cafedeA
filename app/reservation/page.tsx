import ReservationExperience from "@/components/reservation/ReservationExperience"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/reservation",
  title: "Reservations | café de A",
  description:
    "Book a table at café de A in Richmond. Parties of 1 to 6 are confirmed when a time is available.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Reserve", item: absoluteUrl("/reservation") },
  ],
}

export default function ReservationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="breadcrumb-schema-reservation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReservationExperience />
    </div>
  )
}
