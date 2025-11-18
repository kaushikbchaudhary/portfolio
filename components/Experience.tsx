"use client";

import experience from "@/data/experience.json";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading>Experience</SectionHeading>
        <div className="relative border-l border-slate-200 dark:border-slate-700">
          {experience.map((item, index) => (
            <div key={item.company} className="relative pl-8 pb-12 last:pb-0">
              <div className="absolute -left-[6px] top-1 h-3 w-3 rounded-full border border-white bg-indigoBrand shadow dark:border-slate-900" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                {item.period}
              </p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {item.role} · {item.company}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
