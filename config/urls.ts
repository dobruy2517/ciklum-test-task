/**
 * URL configuration for different environments and locales
 * Builds URLs dynamically based on env and locale
 */

export const urls = {
  home: `/h/${process.env.LOCALE}` || 'nl',
  // Add more URLs as needed
};

/**
 * Get URL for specific path based on environment and locale
 * @param path - The path key from urls object
 * @param env - Environment (e.g., 'prod', 'staging')
 * @param locale - Locale (e.g., 'nl', 'de')
 * @returns The full relative URL
 */
export const getUrl = (path: keyof typeof urls, env?: string, locale?: string): string => {
  // For now, simple implementation. Can be extended for dynamic building
  return urls[path];
};