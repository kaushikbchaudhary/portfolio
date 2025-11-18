import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/data/projects.json";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} | Project Details` ,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.heroImage]
    }
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="section">
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">
            Case Study
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{project.title}</h1>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{project.platform}</p>
          <p className="text-lg text-slate-600 dark:text-slate-300">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {project.links.demo ? (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white"
              >
                Live Demo
              </Link>
            ) : (
              <Link
                href="#contact"
                className="rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white"
              >
                Request Demo
              </Link>
            )}
            <Link
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-white"
            >
              GitHub Repo
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <Image src={project.heroImage} alt={project.title} width={1200} height={600} className="w-full" />
        </div>
        <section className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">About Project</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{project.about}</p>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Responsibilities</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {project.responsibilities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">Screenshots</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.screenshots.map((shot) => (
              <div key={shot} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <Image src={shot} alt={`${project.title} screenshot`} width={640} height={360} className="w-full" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
