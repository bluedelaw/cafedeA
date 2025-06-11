import { notFound } from "next/navigation"

export default function Test404Page() {
  // This will immediately trigger the not-found page
  notFound()
}
