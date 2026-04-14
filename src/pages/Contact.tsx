import { SectionHeading } from '../components/SectionHeading'
import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <div className="bg-white">
      <section className="border-b border-brand-100 bg-hero-mesh py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-700 sm:text-left">
            Contact
          </p>
          <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-left sm:text-5xl">
            Let’s start a conversation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600 sm:mx-0 sm:text-left">
            Share a bit about your project—we will get back to you shortly.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Reach us"
                title="Contact details"
                subtitle="Prefer email? Reach us directly or use the form."
              />
              <div className="mt-8 space-y-6 rounded-2xl border border-brand-100 bg-brand-50/50 p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <a
                    href="mailto:wattamwarsejal@gmail.com"
                    className="mt-1 text-lg font-medium text-brand-700 hover:underline"
                  >
                    adminsmtechsolution@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Company
                  </p>
                  <p className="mt-1 text-slate-800">Sejal — IT solutions</p>
                </div>
              </div>
            </aside>

            <div className="flex justify-center lg:col-span-7 lg:justify-end">
              <div className="w-full max-w-lg rounded-2xl border border-brand-100 bg-white p-8 shadow-card sm:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
