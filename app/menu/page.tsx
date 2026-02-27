import Menu from "@/components/Menu"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Menu | café de A Hong Kong Restaurant Richmond BC",
  description: "Explore our authentic Hong Kong menu featuring breakfast, lunch, dinner, BBQ, and afternoon tea. View our full selection of traditional dishes.",
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
      "name": "Menu",
      "item": "https://cafedea.ca/menu"
    }
  ]
}

export default function MenuPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Menu />
    </ErrorBoundary>
  )
}
