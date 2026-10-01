import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "./Icons";

interface Props {
  project: Project;
}

export function FeaturedProject({ project }: Props) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="card overflow-hidden p-0">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block border-b border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900 md:px-10 md:pt-10 md:pb-0"
      >
        <Image
          src={project.heroImage}
          alt=""
          width={1200}
          height={590}
          sizes="(max-width: 1200px) 100vw, 1100px"
          className="h-auto w-full rounded-lg shadow-sm ring-1 ring-slate-900/5 md:rounded-b-none"
        />
      </Link>
      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-md bg-indigoBrand px-2 py-0.5 text-white">
              Featured
            </span>
            {project.label && (
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-indigoBrand dark:bg-indigo-500/15 dark:text-indigo-300">
                {project.label}
              </span>
            )}
            <span className="text-slate-500 dark:text-slate-400">
              {project.platform}
            </span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              <Link
                href={href}
                className="hover:text-indigoBrand dark:hover:text-indigo-300"
              >
                {project.title}
              </Link>
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <Link href={href} className="btn-primary">
              Read case study
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Live demo
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                GitHub
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
          {project.demoNote && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {project.demoNote}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {project.highlights && (
            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigoBrand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
