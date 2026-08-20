import Menu from "@/components/Menu"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Restaurant Menu | café de A Authentic Hong Kong Food Richmond",
  description: "Browse the complete café de A menu: Cantonese BBQ (Char Siu, Roast Pork), HK Style Milk Tea, Sizzling Plates, Baked Rice, Congee & All-Day Breakfast in Richmond, BC.",
  alternates: {
    canonical: "https://cafedea.ca/menu",
  },
  openGraph: {
    title: "Restaurant Menu | café de A Hong Kong Café Richmond",
    description: "Browse the complete menu: Cantonese BBQ, HK Milk Tea, Sizzling Plates, Baked Rice & All-Day Breakfast.",
    url: "https://cafedea.ca/menu",
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
      "name": "Menu",
      "item": "https://cafedea.ca/menu"
    }
  ]
}

export default function MenuPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema-menu"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Menu />
    </ErrorBoundary>
  )
}
