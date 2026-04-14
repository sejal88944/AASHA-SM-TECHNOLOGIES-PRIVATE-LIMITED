import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ServiceCard from "../components/ServiceCard";
import Seo from "../components/Seo";
import { services } from "../data/services";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SM Tech Solutions Private Limited",
    image: `${window.location.origin}/logo.png`,
    url: window.location.origin,
    email: "wattamwarsejal@gmail.com",
    areaServed: ["Pune", "Maharashtra", "India"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [window.location.origin],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide bulk SMS service in Pune?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide bulk SMS service in Pune and across India for promotions, offers, reminders, and transactional alerts.",
        },
      },
      {
        "@type": "Question",
        name: "Is cheap SMS marketing India reliable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. With compliant templates, clean contact lists, and optimized timing, cheap SMS marketing in India can achieve strong delivery and ROI.",
        },
      },
      {
        "@type": "Question",
        name: "Can you handle WhatsApp marketing India campaigns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we help with WhatsApp campaign setup, approved templates, conversation flows, and lead conversion tracking.",
        },
      },
    ],
  };

  return (
    <>
      <Seo
        title="Bulk SMS Service India & Pune | WhatsApp Marketing | SM Tech Solutions"
        description="SM Tech Solutions helps small businesses with bulk sms service india, whatsapp marketing india, and website development company india services. Based in Pune."
        canonicalPath="/"
        structuredData={localBusinessSchema}
      />
      <Seo
        title="Bulk SMS Service India & Pune | WhatsApp Marketing | SM Tech Solutions"
        description="SM Tech Solutions helps small businesses with bulk sms service india, whatsapp marketing india, and website development company india services. Based in Pune."
        canonicalPath="/"
        structuredData={faqSchema}
      />
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 md:flex-row md:items-center md:text-left lg:py-24">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              SM Tech Solutions Pvt Ltd
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Bulk SMS Service India, WhatsApp Marketing & Website Development
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              SM Tech Solutions Private Limited helps small business owners in Pune and across India
              generate quality leads using affordable SMS marketing, WhatsApp automation, and
              conversion-focused websites.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 md:justify-start">
              <span className="rounded-full bg-slate-100 px-3 py-1">Affordable</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">No Setup Cost</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Easy to Use</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to="/contact"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                Free Demo
              </Link>
              <Link
                to="/services"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Contact Now
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 justify-center md:justify-end">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <Logo
                className="h-28 w-28 object-contain sm:h-36 sm:w-36"
                alt="SM Tech Solutions logo for bulk SMS and WhatsApp marketing India"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-b border-slate-100 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-0">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">About us</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            SM Tech Solutions Pvt Ltd is an early-stage technology partner focused on practical
            digital growth systems for startups and small businesses in Pune. We combine reliable
            engineering, simple campaign tools, and clear communication so you can launch faster,
            generate leads, and scale with confidence.
          </p>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              End-to-end support for bulk sms service india, bulk sms service in pune, cheap sms
              marketing india, whatsapp marketing india, and website development company india
              requirements.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} points={s.points} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Which is the best bulk sms service india option for small businesses?
              </h3>
              <p className="mt-2 text-slate-600">
                Choose a provider with DLT compliance support, delivery tracking, and easy campaign
                segmentation. We provide all three with expert onboarding.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Do you offer bulk sms service in pune with local support?
              </h3>
              <p className="mt-2 text-slate-600">
                Yes, our Pune team supports local businesses with fast setup, campaign planning, and
                optimization.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Is whatsapp marketing india suitable for service businesses?
              </h3>
              <p className="mt-2 text-slate-600">
                Absolutely. WhatsApp works very well for follow-ups, confirmations, and offer
                sharing with high response rates.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Can you build websites that generate leads?
              </h3>
              <p className="mt-2 text-slate-600">
                Yes. We design mobile-first websites with clear CTA flows, fast load speed, and SEO
                foundation to convert traffic into inquiries.
              </p>
            </article>
          </div>
          <div className="mt-8">
            <Link to="/blog" className="text-sm font-semibold text-brand hover:underline">
              Read our SEO blog for more growth tips →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
