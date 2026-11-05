import Home from "@/components/Home"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/",
  title: "café de A | Richmond, BC",
  description:
    "Hong Kong café and Cantonese barbecue at Ironwood Plaza in Richmond. Open daily 8:00 AM to 10:00 PM.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
  ],
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home />
    </ErrorBoundary>
  )
}
