import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { WhatsAppFloat } from './components/cta/WhatsAppFloat'
import { SEO_LANDING_PATHS } from './data/seoLandings'

const HomePage = lazy(async () => {
  const m = await import('./pages/HomePage')
  return { default: m.HomePage }
})
const ServicesPage = lazy(async () => {
  const m = await import('./pages/ServicesPage')
  return { default: m.ServicesPage }
})
const ServiceDetailPage = lazy(async () => {
  const m = await import('./pages/ServiceDetailPage')
  return { default: m.ServiceDetailPage }
})
const AboutPage = lazy(async () => {
  const m = await import('./pages/AboutPage')
  return { default: m.AboutPage }
})
const ContactPage = lazy(async () => {
  const m = await import('./pages/ContactPage')
  return { default: m.ContactPage }
})
const BlogIndexPage = lazy(async () => {
  const m = await import('./pages/BlogIndexPage')
  return { default: m.BlogIndexPage }
})
const BlogPostPage = lazy(async () => {
  const m = await import('./pages/BlogPostPage')
  return { default: m.BlogPostPage }
})
const NotFoundPage = lazy(async () => {
  const m = await import('./pages/NotFoundPage')
  return { default: m.NotFoundPage }
})
const CareersPage = lazy(async () => {
  const m = await import('./pages/CareersPage')
  return { default: m.CareersPage }
})
const JobsPage = lazy(async () => {
  const m = await import('./pages/JobsPage')
  return { default: m.JobsPage }
})
const InternshipPage = lazy(async () => {
  const m = await import('./pages/InternshipPage')
  return { default: m.InternshipPage }
})
const ApplyPage = lazy(async () => {
  const m = await import('./pages/ApplyPage')
  return { default: m.ApplyPage }
})
const AdminHiringPage = lazy(async () => {
  const m = await import('./pages/AdminHiringPage')
  return { default: m.AdminHiringPage }
})
const SeoLandingPage = lazy(async () => {
  const m = await import('./pages/SeoLandingPage')
  return { default: m.SeoLandingPage }
})

function RouteFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-600" role="status" aria-live="polite">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/internship" element={<InternshipPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/admin/hiring" element={<AdminHiringPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            {SEO_LANDING_PATHS.map((p) => (
              <Route key={p} path={p} element={<SeoLandingPage />} />
            ))}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/job" element={<Navigate to="/jobs" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <WhatsAppFloat />
    </>
  )
}
