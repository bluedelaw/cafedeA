import Location from "@/components/Location"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/location",
  title: "Location & Hours | café de A",
  description:
    "café de A is in Ironwood Plaza at 11666 Steveston Hwy, Richmond. Open daily 8:00 AM to 10:00 PM.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Location & Hours", item: absoluteUrl("/location") },
  ],
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
