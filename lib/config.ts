/**
 * Application configuration
 * This provides environment-specific configuration without relying on Vercel
 */
const config = {
  // Environment
  env: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "development",

  // Version
  version: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",

  // Site information
  site: {
    name: "café de A",
    description: "Authentic Hong Kong cuisine in Richmond",
    url: process.env.NODE_ENV === "production" ? "https://cafedea.vercel.app" : "http://localhost:3000",
  },

  // Feature flags
  features: {
    analytics: process.env.NODE_ENV === "production",
  },
}

export default config
