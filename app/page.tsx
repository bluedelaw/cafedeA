import Home from "@/components/Home"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
  description: "Experience authentic Hong Kong café culture and Cantonese BBQ at café de A in Ironwood Plaza, Richmond BC. Breakfast, lunch, afternoon tea, dinner & wok-hei classics.",
  alternates: {
    canonical: "https://cafedea.ca",
  },
  openGraph: {
    title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
    description: "Experience authentic Hong Kong café culture and Cantonese BBQ at café de A in Ironwood Plaza, Richmond BC.",
    url: "https://cafedea.ca",
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
    }
  ]
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
