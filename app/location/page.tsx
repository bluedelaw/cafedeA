import Location from "@/components/Location"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Location, Hours & Directions | café de A Ironwood Plaza Richmond",
  description: "Find café de A at Ironwood Plaza (#3050-11666 Steveston Hwy, Richmond BC). Open daily 8 AM - 10 PM. Free parking, transit directions & map.",
  alternates: {
    canonical: "https://cafedea.ca/location",
  },
  openGraph: {
    title: "Location, Hours & Directions | café de A Richmond",
    description: "Find café de A at Ironwood Plaza Richmond BC. Open daily with free parking.",
    url: "https://cafedea.ca/location",
    siteName: "café de A",
    locale: "en_CA",
    type: "website",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cafedea.ca"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Location & Hours",
      "item": "https://cafedea.ca/location"
    }
  ]
}

export default function LocationPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema-location"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Location />
    </ErrorBoundary>
  )
}
