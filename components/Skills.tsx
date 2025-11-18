"use client";

import skills from "@/data/skills.json";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Skills & Focus</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2">
          {skills.map((category) => (
            <div key={category.category} className="card">
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {category.category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
