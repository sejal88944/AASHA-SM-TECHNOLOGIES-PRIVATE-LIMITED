import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'

const Home = lazy(async () => {
  const m = await import('./pages/Home')
  return { default: m.Home }
})
const About = lazy(async () => {
  const m = await import('./pages/About')
  return { default: m.About }
})
const Services = lazy(async () => {
  const m = await import('./pages/Services')
  return { default: m.Services }
})
const Contact = lazy(async () => {
  const m = await import('./pages/Contact')
  return { default: m.Contact }
})

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
