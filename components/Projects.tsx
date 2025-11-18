"use client";

import projects from "@/data/projects.json";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Featured Projects</SectionHeading>
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
