import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  description?: ReactNode;
}

export function SectionHeading({ children, description }: Props) {
  return (
    <div className="mb-10 max-w-2xl space-y-3">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {children}
      </h2>
      {description && (
        <p className="text-base text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
