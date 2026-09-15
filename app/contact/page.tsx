import InquiryForm from "@/components/InquiryForm"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Contact, Catering & Inquiries | café de A Richmond BC",
  description: "Contact café de A for group reservations, custom event catering, and general inquiries. Phone: (604) 276-7800. Located in Ironwood Plaza, Richmond BC.",
  alternates: {
    canonical: "https://cafedea.ca/contact",
  },
  openGraph: {
    title: "Contact & Catering | café de A Richmond",
    description: "Contact café de A for reservations, catering, or inquiries. Phone: (604) 276-7800.",
    url: "https://cafedea.ca/contact",
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
      "name": "Contact",
      "item": "https://cafedea.ca/contact"
    }
  ]
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="breadcrumb-schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InquiryForm />
    </div>
  )
}
