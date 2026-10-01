import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "./Icons";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="card card-interactive group flex flex-col gap-5 p-4">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
      >
        <Image
          src={project.thumbnail}
          alt=""
          width={640}
          height={360}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-2">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{project.platform}</p>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          <Link href={href} className="hover:text-indigoBrand dark:hover:text-indigo-300">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <li key={tech} className="badge">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-3">
          <Link href={href} className="link-arrow">
            Case study
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
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
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              GitHub
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
