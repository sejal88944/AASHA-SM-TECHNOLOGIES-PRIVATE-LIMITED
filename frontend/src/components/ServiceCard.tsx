import type { ReactNode } from 'react'

type ServiceCardProps = {
  title: string
  description: string
  icon?: ReactNode
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
