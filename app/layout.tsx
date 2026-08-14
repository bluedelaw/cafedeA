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
  title: "café de A | Authentic Hong Kong Cuisine Richmond BC",
  description:
    "Experience authentic Hong Kong cuisine at café de A in Richmond, BC. Traditional recipes, fresh ingredients, expert chefs. Visit us today.",

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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://cafedea.ca/#restaurant",

  name: "café de A",
  url: "https://cafedea.ca",

  logo: "https://cafedea.ca/images/logo.png",
  image: "https://cafedea.ca/images/Home/cafedea.jpg",

  description:
    "Authentic Hong Kong cuisine in Richmond, BC. Experience traditional recipes and culinary excellence.",

  priceRange: "$$",

  servesCuisine: ["Hong Kong", "Cantonese", "Chinese"],

  address: {
    "@type": "PostalAddress",
    streetAddress: "#3050-11666 Steveston Hwy",
    addressLocality: "Richmond",
    addressRegion: "BC",
    postalCode: "V7A 5J3",
    addressCountry: "CA",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "49.132195",
    longitude: "-123.095801",
  },

  telephone: "+1-604-276-7800",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "21:30",
    },
  ],

  sameAs: [
    "https://www.instagram.com/cafedea_ironwood/",
    "https://www.facebook.com/profile.php?id=61588606623911",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main>{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {process.env.NODE_ENV === "production" && <Analytics />}

        <DevTools />
      </body>
    </html>
  )
}