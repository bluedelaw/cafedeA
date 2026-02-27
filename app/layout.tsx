import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DevTools from "@/components/DevTools"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
  description: "Experience authentic Hong Kong cuisine at café de A in Richmond, BC. Traditional recipes, fresh ingredients, expert chefs. Visit us today.",
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://cafedea.ca/#organization",
      "name": "café de A",
      "url": "https://cafedea.ca",
      "logo": "https://cafedea.ca/images/logo.png",
      "image": "https://cafedea.ca/images/Home/cafedea.jpg",
      "description": "Authentic Hong Kong cuisine in Richmond, BC. Experience traditional recipes and culinary excellence.",
      "priceRange": "$$",
      "servesCuisine": ["Hong Kong", "Cantonese", "Chinese"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "#3050-11666 Steveston Hwy",
        "addressLocality": "Richmond",
        "addressRegion": "BC",
        "postalCode": "V7A 5J3",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "49.132195",
        "longitude": "-123.095801"
      },
      "telephone": "+1-604-276-7800",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "21:30"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/cafedea_ironwood/",
        "https://www.facebook.com/profile.php?id=61588606623911"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://cafedea.ca/#website",
      "url": "https://cafedea.ca",
      "name": "café de A",
      "publisher": {
        "@id": "https://cafedea.ca/#organization"
      }
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://cafedea.ca/#navigation",
      "name": "Site Navigation",
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "Home",
          "url": "https://cafedea.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Menu",
          "url": "https://cafedea.ca/menu"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Location",
          "url": "https://cafedea.ca/location"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contact",
          "url": "https://cafedea.ca/contact"
        }
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <DevTools />
      </body>
    </html>
  )
}
