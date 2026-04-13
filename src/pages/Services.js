import { Fragment } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services";

const steps = ["Requirement", "Planning", "Development", "Testing", "Delivery"];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Services</h1>
        <p className="mt-4 text-lg text-slate-600">
          We design and ship digital solutions that match how your business actually works—not
          generic templates—so teams stay productive and customers get a polished experience.
        </p>
      </header>

      <div className="mt-14 space-y-12">
        {services.map((s) => (
          <article
            key={s.title}
            id={s.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}
            className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{s.summary}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
        <h2 className="text-xl font-semibold text-slate-900">Our work process</h2>
        <p className="mt-2 text-slate-600">
          A clear path from idea to launch, with checkpoints so you always know what happens next.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2" role="list">
          {steps.map((step, i) => (
            <Fragment key={step}>
              <div
                className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm sm:min-w-[100px] sm:flex-col sm:text-center"
                role="listitem"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-slate-800">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden text-lg font-light text-slate-400 sm:inline" aria-hidden>
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
