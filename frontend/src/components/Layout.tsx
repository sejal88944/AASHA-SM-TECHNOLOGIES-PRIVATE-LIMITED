import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Seo } from './Seo'

const WhatsAppFloat = lazy(async () => {
  const m = await import('./WhatsAppFloat')
  return { default: m.WhatsAppFloat }
})

function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] flex-1 flex-col items-center justify-center gap-3 bg-white px-4"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <div className="h-9 w-9 animate-pulse rounded-full bg-brand-900/15" aria-hidden />
    </div>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo />
      <Navbar />
      <main className="flex flex-1 flex-col bg-white">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppFloat />
      </Suspense>
    </div>
  )
}
