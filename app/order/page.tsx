import Order from "@/components/Order"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/order",
  title: "Order | café de A",
  description:
    "Order pickup from café de A in Richmond, or get delivery through Uber Eats, DoorDash, or SkipTheDishes.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Order", item: absoluteUrl("/order") },
  ],
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
