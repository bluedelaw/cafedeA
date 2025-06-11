import Home from "@/components/Home"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import config from "@/lib/config"

export const metadata: Metadata = {
  title: `${config.site.name} - Home`,
  description: config.site.description,
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  )
}
