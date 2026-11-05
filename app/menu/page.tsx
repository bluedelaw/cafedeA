import Menu from "@/components/Menu"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"
import { Suspense } from "react"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/menu",
  title: "Menu | café de A",
  description:
    "Breakfast, lunch, afternoon tea, dinner, and barbecue at café de A in Richmond.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Menu", item: absoluteUrl("/menu") },
  ],
}

export default function MenuPage() {
  return (
    <ErrorBoundary>
      <Script
        id="breadcrumb-schema-menu"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#F7F0E3] pt-24" />}>
        <Menu />
      </Suspense>
    </ErrorBoundary>
  )
}
