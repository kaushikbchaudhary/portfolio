import skills from "@/data/skills.json";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Skills</SectionHeading>
        <dl className="divide-y divide-slate-200 dark:divide-slate-800">
          {skills.map((category) => (
            <div key={category.category} className="grid gap-3 py-5 md:grid-cols-[220px_1fr]">
              <dt className="text-sm font-semibold text-slate-900 dark:text-white">{category.category}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <span key={skill} className="badge bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
