import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NotFound } from './pages/NotFound'

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
const Blog = lazy(async () => {
  const m = await import('./pages/Blog')
  return { default: m.Blog }
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
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
