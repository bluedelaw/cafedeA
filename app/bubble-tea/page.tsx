import BubbleTea from "@/components/BubbleTea"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import config from "@/lib/config"

export const metadata: Metadata = {
  title: `${config.site.name} - Bubble Tea`,
  description: "Discover our handcrafted bubble tea drinks made with premium ingredients",
}

export default function BubbleTeaPage() {
  return (
    <ErrorBoundary>
      <BubbleTea />
    </ErrorBoundary>
  )
}
