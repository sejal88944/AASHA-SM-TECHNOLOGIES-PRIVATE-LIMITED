import type { ReactNode } from 'react'

type ServiceCardProps = {
  title: string
  description: string
  icon?: ReactNode
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-7 transition-colors duration-200 hover:border-brand-900/25 hover:shadow-card lg:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {icon && (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-900 text-white shadow-sm sm:h-11 sm:w-11"
            aria-hidden
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug tracking-tight text-brand-950 sm:text-lg">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
