import Links from "@/components/Links"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  path: "/links",
  title: "Links | café de A",
  description: "Menu, ordering, reservations, and social accounts for café de A.",
  index: false,
})

export default function LinksPage() {
  return <Links />
}
