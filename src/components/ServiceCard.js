export default function ServiceCard({ title, points }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 flex-1 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </article>
  );
}
