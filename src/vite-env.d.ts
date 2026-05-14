/// <reference types="vite/client" />

declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_ENDPOINT?: string
  readonly VITE_APPLY_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
