import experience from "@/data/experience.json";
import siteConfig from "@/data/siteConfig.json";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Experience</SectionHeading>
        <ol className="space-y-12">
          {experience.map((item) => (
            <li key={item.company} className="grid gap-4 md:grid-cols-[220px_1fr]">
              <p className="text-sm font-medium tabular-nums text-slate-500 dark:text-slate-400">{item.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.role}
                  <span className="font-normal text-slate-500 dark:text-slate-400"> · {item.company}</span>
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-slate-300 dark:text-slate-300 dark:marker:text-slate-600">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        {siteConfig.education && (
          <div className="mt-16 grid gap-4 border-t border-slate-200 pt-10 dark:border-slate-800 md:grid-cols-[220px_1fr]">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Education</h3>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {siteConfig.education.degree}
              <span className="font-normal text-slate-500 dark:text-slate-400"> · {siteConfig.education.school}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
