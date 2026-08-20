import PrivacyPolicy from "@/components/PrivacyPolicy"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Privacy Policy | café de A Richmond BC",
  description: "Read café de A's privacy policy to learn how we collect, use, and protect your personal information.",
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
      "name": "Privacy Policy",
      "item": "https://cafedea.ca/privacy"
    }
  ]
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
