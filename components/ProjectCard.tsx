"use client";

import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <motion.div
      className="card flex flex-col gap-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={640}
          height={360}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="flex-1 rounded-full border border-indigoBrand/30 px-4 py-2 text-center text-sm font-semibold text-indigoBrand transition hover:-translate-y-0.5 hover:border-indigoBrand"
        >
          Project Details
        </Link>
        <Link
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-200"
        >
          View Project
        </Link>
        <Link
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigoBrand"
        >
          GitHub
        </Link>
      </div>
    </motion.div>
  );
}
