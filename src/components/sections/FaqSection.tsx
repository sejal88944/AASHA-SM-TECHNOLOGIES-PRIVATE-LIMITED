import type { FaqItem } from '../../data/schema'

export function FaqSection({ title, faqs }: { title: string; faqs: FaqItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Practical answers for teams evaluating vendors and planning rollouts.
      </p>
      <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {faqs.map((f) => (
          <details key={f.question} className="group p-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none">
              <span className="inline-flex w-full items-center justify-between gap-3">
                {f.question}
                <span className="text-slate-400 group-open:rotate-180">▾</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
