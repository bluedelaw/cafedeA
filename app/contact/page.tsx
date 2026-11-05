import InquiryForm from "@/components/InquiryForm"
import Script from "next/script"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | café de A",
  description:
    "Call (604) 276-7800 or send a message to café de A in Ironwood Plaza, Richmond.",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
  ],
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
