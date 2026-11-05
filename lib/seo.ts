import type { Metadata } from "next"

export const SITE_URL = "https://www.cafedea.ca"

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string
  description: string
  path: string
  index?: boolean
}): Metadata {
  const url = absoluteUrl(path)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "café de A",
      locale: "en_CA",
      type: "website",
    },
  }
}
