import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import UberEatsBanner from "@/components/UberEatsBanner"
import DevTools from "@/components/DevTools"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "café de A",
  description: "Authentic Hong Kong cuisine in Richmond",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-[48px]`}>
        <UberEatsBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <DevTools />
      </body>

    </html>
  )
}
