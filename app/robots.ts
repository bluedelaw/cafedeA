import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/links"],
    },
    sitemap: "https://cafedea.ca/sitemap.xml",
  }
}
