/**
 * After replacing `public/logo.jpeg` or `public/favicon.jpg`, increment this and
 * update the same `v=` in root `index.html` favicon links (HTML cannot import this file).
 */
export const PUBLIC_ASSET_VERSION = '3'

export function publicAsset(path: string): string {
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}v=${PUBLIC_ASSET_VERSION}`
}
