import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

export default function Home() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 md:flex-row md:items-center md:text-left lg:py-24">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              SM Tech Solutions Pvt Ltd
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Smart Digital Solutions for Modern Businesses
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              We help businesses grow with websites, apps, and automation tools.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to="/contact"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                Get in Touch
              </Link>
              <Link
                to="/services"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                View Services
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 justify-center md:justify-end">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <Logo className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-b border-slate-100 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-0">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">About us</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            SM Tech Solutions Pvt Ltd is an early-stage technology partner focused on practical
            digital products—from marketing websites to internal tools. We combine clean design,
            reliable engineering, and clear communication so your business can launch faster and
            scale with confidence.
          </p>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              End-to-end support tailored to your goals—simple to understand, serious under the
              hood.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} points={s.points} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
