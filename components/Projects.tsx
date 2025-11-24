"use client";

import projects from "@/data/projects.json";
import { useMemo, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

const platformFilters = ["All", "Web Platform", "Desktop Application"] as const;

export function Projects() {
  const [platform, setPlatform] = useState<(typeof platformFilters)[number]>("All");
  const [tech, setTech] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesPlatform = platform === "All" || project.platform === platform;
      const matchesTech = tech ? project.tech.includes(tech) : true;
      return matchesPlatform && matchesTech;
    });
  }, [platform, tech]);

  const popularTech = Array.from(new Set(projects.flatMap((p) => p.tech))).slice(0, 6);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-6xl px-4 space-y-6">
        <SectionHeading>Featured Projects</SectionHeading>

        <div className="flex flex-wrap items-center gap-3">
          {platformFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPlatform(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                platform === item
                  ? "border-indigoBrand bg-indigoBrand/10 text-indigoBrand"
                  : "border-slate-200 text-slate-600 hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
          <div className="ml-auto flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Quick tech filter:</span>
            {popularTech.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTech((prev) => (prev === tag ? null : tag))}
                className={`rounded-full border px-3 py-1 font-semibold transition ${
                  tech === tag
                    ? "border-indigoBrand bg-indigoBrand/10 text-indigoBrand"
                    : "border-slate-200 text-slate-600 hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {tag}
              </button>
            ))}
            {tech && (
              <button
                type="button"
                onClick={() => setTech(null)}
                className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {filtered.length === 0 && (
            <div className="lg:col-span-2 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
              No projects match that filter. Try another platform or clear the tech tag.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
