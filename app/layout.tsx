import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DevTools from "@/components/DevTools"
import { devLog } from "@/lib/dev-utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "café de A",
  description: "Authentic Hong Kong cuisine in Richmond",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  devLog("Rendering RootLayout")

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <DevTools />
      </body>
    </html>
  )
}
