import Location from "@/components/Location"
import type { Metadata } from "next"
import ErrorBoundary from "@/components/ErrorBoundary"
import config from "@/lib/config"

export const metadata: Metadata = {
  title: `${config.site.name} - Location`,
  description: "Find our restaurant location in Richmond",
}

export default function LocationPage() {
  return (
    <ErrorBoundary>
      <Location />
    </ErrorBoundary>
  )
}
