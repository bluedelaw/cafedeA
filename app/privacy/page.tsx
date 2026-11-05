import PrivacyPolicy from "@/components/PrivacyPolicy"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy | café de A",
  description: "How café de A handles personal information from the website, reservations, and orders.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: absoluteUrl("/privacy") },
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PrivacyPolicy />
    </>
  )
}
