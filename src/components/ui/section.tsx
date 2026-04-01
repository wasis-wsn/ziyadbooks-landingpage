import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, description, action, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 sm:py-24 ${className}`.trim()}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--primary)]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}