import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <div className="bg-white">
      <section
        className="border-b border-slate-200/80 bg-hero-mesh py-20 sm:py-24"
        aria-labelledby="contact-page-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand-800 sm:text-left sm:text-sm">
              Contact
            </p>
            <h1
              id="contact-page-heading"
              className="mt-3 text-center text-4xl font-bold tracking-tight text-brand-950 sm:text-left sm:mt-4 sm:text-5xl"
            >
              Let’s start a conversation
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600 sm:mx-0 sm:text-left">
              Share a bit about your project—website development in Pune, SMS automation
              India-wide, or other IT needs—and we will get back to you shortly.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:mx-0 sm:text-left">
              You can also review our <Link to="/services" className="font-medium text-brand-900 hover:underline">service list</Link> or read more <Link to="/about" className="font-medium text-brand-900 hover:underline">about our company</Link> before contacting us.
            </p>
          </header>
        </div>
      </section>

      <section
        className="bg-white py-20 sm:py-24"
        aria-label="Contact options and enquiry form"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-5" aria-label="Company contact details">
              <SectionHeading
                align="left"
                eyebrow="Reach us"
                title="Contact details"
                subtitle="Prefer email? Reach us directly or use the form."
              />
              <div className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-slate-50/80 p-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </h3>
                  <a
                    href="mailto:adminsmtechsolution@gmail.com"
                    className="mt-1 text-lg font-medium text-brand-900 hover:underline"
                  >
                    adminsmtechsolution@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Company
                  </h3>
                  <p className="mt-1 text-slate-800">
                    AASHA-SM TECHNOLOGIES PRIVATE LIMITED
                  </p>
                </div>
              </div>
            </aside>

            <div className="flex justify-center lg:col-span-7 lg:justify-end">
              <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
