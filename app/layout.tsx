import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Analytics } from "@vercel/analytics/react"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DevTools from "@/components/DevTools"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://cafedea.ca"),
  title: {
    default: "café de A | Authentic Hong Kong Cuisine Richmond BC",
    template: "%s | café de A",
  },
  description:
    "Experience authentic Hong Kong cuisine and Cantonese BBQ at café de A in Ironwood Plaza, Richmond BC. Breakfast, lunch, afternoon tea, dinner & wok-hei classics.",
  keywords: [
    "café de A",
    "cafe de a richmond",
    "hong kong cafe richmond",
    "ironwood plaza restaurant",
    "cantonese bbq richmond",
    "cha chaan teng richmond",
    "hong kong milk tea",
    "richmond bc chinese restaurant",
    "油尖旺冰室",
  ],
  alternates: {
    canonical: "https://cafedea.ca",
  },
  openGraph: {
    title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
    description:
      "Experience authentic Hong Kong cuisine and Cantonese BBQ at café de A in Ironwood Plaza, Richmond BC.",
    url: "https://cafedea.ca",
    siteName: "café de A",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/Home/cafedea.jpg",
        width: 1200,
        height: 630,
        alt: "café de A - Authentic Hong Kong Cuisine in Richmond BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
    description:
      "Experience authentic Hong Kong cuisine and Cantonese BBQ at café de A in Ironwood Plaza, Richmond BC.",
    images: ["/images/Home/cafedea.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://cafedea.ca/#website",
      "url": "https://cafedea.ca",
      "name": "café de A",
      "alternateName": [
        "café de A",
        "cafe de a",
        "cafe de a richmond",
        "café de A Ironwood",
        "油尖旺冰室"
      ],
      "description": "Authentic Hong Kong Café and Cantonese BBQ in Richmond, BC",
      "inLanguage": "en-CA"
    },
    {
      "@type": "Restaurant",
      "@id": "https://cafedea.ca/#restaurant",
      "name": "café de A",
      "alternateName": "油尖旺冰室",
      "url": "https://cafedea.ca",
      "logo": "https://cafedea.ca/images/logo.png",
      "image": "https://cafedea.ca/images/Home/cafedea.jpg",
      "description":
        "Authentic Hong Kong cuisine and Cantonese BBQ in Ironwood Plaza, Richmond, BC. Fresh ingredients, chef specialties, milk tea, and all-day dining.",
      "priceRange": "$$",
      "servesCuisine": ["Hong Kong", "Cantonese", "Chinese", "Barbecue"],
      "hasMenu": "https://cafedea.ca/menu",
      "potentialAction": [
        {
          "@type": "OrderAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://cafedea.ca/order",
            "inLanguage": "en-CA",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "deliveryMethod": [
            "http://purl.org/goodrelations/v1#DeliveryModePickUp",
            "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"
          ]
        }
      ],
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
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "08:00",
          "closes": "22:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/cafedea_ironwood/",
        "https://www.facebook.com/profile.php?id=61588606623911"
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://cafedea.ca/#sitenavigation",
      "name": "Site Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Home",
          "description": "Welcome to café de A Hong Kong Café",
          "url": "https://cafedea.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Menu",
          "description": "Explore our full Hong Kong café menu and Cantonese BBQ",
          "url": "https://cafedea.ca/menu"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Order Pickup & Delivery",
          "description": "Direct online pickup ordering and delivery via Uber Eats & DoorDash",
          "url": "https://cafedea.ca/order"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Reserve a Table",
          "description": "Book a table online at café de A",
          "url": "https://cafedea.ca/reservation"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Location & Hours",
          "description": "Directions, parking, map, and daily hours at Ironwood Plaza",
          "url": "https://cafedea.ca/location"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Contact & Catering",
          "description": "Get in touch for group dining and custom catering",
          "url": "https://cafedea.ca/contact"
        }
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />

        <main>{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph),
          }}
        />

        {process.env.NODE_ENV === "production" && <Analytics />}

        <DevTools />
      </body>
    </html>
  )
}
