"use client";

import projects from "@/data/projects.json";
import { useMemo, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectCard } from "./ProjectCard";

const platformFilters = ["All", "Web Platform", "Desktop Application"] as const;

export function Projects() {
  const [platform, setPlatform] = useState<(typeof platformFilters)[number]>("All");

  const filtered = useMemo(
    () => projects.filter((project) => platform === "All" || project.platform === platform),
    [platform]
  );

  const featured = filtered.find((project) => project.featured);
  const rest = filtered.filter((project) => project !== featured);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading description="Client work, products from my roles, and things I've built end to end.">
            Projects
          </SectionHeading>
          <div
            role="group"
            aria-label="Filter projects by platform"
            className="mb-10 inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-800"
          >
            {platformFilters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={platform === item}
                onClick={() => setPlatform(item)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  platform === item
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {item === "All" ? "All" : item === "Web Platform" ? "Web" : "Desktop"}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <div className="mb-6">
            <FeaturedProject project={featured} />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
