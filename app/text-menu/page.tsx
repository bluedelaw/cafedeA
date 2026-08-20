import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"
import TextMenu from "../../components/TextMenu"

export const metadata: Metadata = {
  title: "Text Menu Preview | café de A",
  description: "Temporary preview route for the redesigned English-first text menu.",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cafedea.ca",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Text Menu Preview",
      "item": "https://cafedea.ca/text-menu",
    },
  ],
}

export default function TextMenuPreviewPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TextMenu />
    </ErrorBoundary>
  )
}
