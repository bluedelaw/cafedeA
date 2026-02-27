import Home from "@/components/Home"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
  description: "Experience authentic Hong Kong cuisine at café de A in Richmond, BC. Traditional recipes, fresh ingredients, expert chefs. Visit us today.",
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
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home />
    </ErrorBoundary>
  )
}
