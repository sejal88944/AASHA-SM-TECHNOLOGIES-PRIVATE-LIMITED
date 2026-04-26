import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Seo } from './Seo'
import { WhatsAppFloat } from './WhatsAppFloat'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
