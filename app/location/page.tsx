import Location from "@/components/Location"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Location & Hours | café de A Richmond BC Steveston Hwy",
  description: "Visit café de A at Ironwood Plaza, Richmond BC. Open 8am-10pm daily. Authentic Hong Kong cuisine near Vancouver. Get directions and hours.",
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
      "name": "Location",
      "item": "https://cafedea.ca/location"
    }
  ]
}

export default function LocationPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Location />
    </ErrorBoundary>
  )
}
