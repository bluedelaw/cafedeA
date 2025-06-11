/**
 * Development utilities
 * These functions are only used during development
 */

/**
 * Log a development message to the console
 */
export function devLog(message: string, ...args: any[]) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEV] ${message}`, ...args)
  }
}

/**
 * Check if running in development mode
 */
export function isDev(): boolean {
  return process.env.NODE_ENV !== "production"
}

/**
 * Check if running in production mode
 */
export function isProd(): boolean {
  return process.env.NODE_ENV === "production"
}

/**
 * Get a development-only value
 * @param devValue Value to use in development
 * @param prodValue Value to use in production
 */
export function devValue<T>(devValue: T, prodValue: T): T {
  return isDev() ? devValue : prodValue
}
