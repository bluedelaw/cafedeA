import Order from "@/components/Order"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Order Online & Delivery | café de A Richmond Hong Kong Food",
  description: "Order fresh Hong Kong cuisine from café de A online for fast pickup at Ironwood Plaza Richmond, or order delivery via Uber Eats and DoorDash.",
  alternates: {
    canonical: "https://cafedea.ca/order",
  },
  openGraph: {
    title: "Order Online & Delivery | café de A Richmond",
    description: "Order fresh Hong Kong cuisine from café de A for fast pickup or delivery.",
    url: "https://cafedea.ca/order",
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
      "name": "Order",
      "item": "https://cafedea.ca/order"
    }
  ]
}

export default function OrderPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema-order"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Order />
    </ErrorBoundary>
  )
}
