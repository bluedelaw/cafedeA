import Menu from "@/components/Menu"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import config from "@/lib/config"

export const metadata: Metadata = {
  title: `${config.site.name} - Menu`,
  description: "Browse our delicious menu offerings at café de A",
}

export default function MenuPage() {
  return (
    <ErrorBoundary>
      <Menu />
    </ErrorBoundary>
  )
}
