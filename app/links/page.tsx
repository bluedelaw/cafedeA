import type { Metadata } from "next"
import Links from "@/components/Links"

export const metadata: Metadata = {
  title: "Connect with café de A | Links",
  description: "All the ways to connect with café de A - View menu, join waitlist, follow us on social media",
}

export default function LinksPage() {
  return <Links />
}
