import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import { absoluteUrl, authorRef, breadcrumbJsonLd } from "@/lib/seo";

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

  const path = `/projects/${project.slug}`;
  const title = `${project.title} Case Study`;

  return {
    title,
    description: project.description,
    keywords: project.tech,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: project.description,
      images: [{ url: project.heroImage, alt: `${project.title} screenshot` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  const path = `/projects/${project.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.title,
      description: project.about,
      url: absoluteUrl(path),
      image: absoluteUrl(project.heroImage),
      keywords: project.tech.join(", "),
      genre: project.platform,
      author: authorRef,
      creator: authorRef,
      ...(project.links.demo ? { sameAs: project.links.demo } : {})
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#projects" },
      { name: project.title, path }
    ])
  ];

  return (
    <article className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">
            <Link href="/#projects" className="hover:text-indigoBrand">
              Projects
            </Link>{" "}
            / Case Study
          </nav>
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
                href="/#contact"
                className="rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white"
              >
                Request Demo
              </Link>
            )}
            {"github" in project.links && project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-white"
              >
                GitHub Repo
              </Link>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <Image
            src={project.heroImage}
            alt={`${project.title} – ${project.platform} built with ${project.tech.slice(0, 3).join(", ")}`}
            width={1200}
            height={600}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full"
          />
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
            {project.screenshots.map((shot, index) => (
              <div key={shot} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <Image
                  src={shot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={640}
                  height={360}
                  sizes="(max-width: 768px) 100vw, 512px"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
