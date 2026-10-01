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

  const screenshots = project.screenshots.filter((shot) => shot !== project.heroImage);

  return (
    <article className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl space-y-12 px-4">
        <div className="space-y-5">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
            <Link href="/#projects" className="hover:text-slate-900 dark:hover:text-white">
              ← All projects
            </Link>
          </nav>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{project.platform}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            {project.links.demo ? (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn-primary">
                Live demo ↗
              </a>
            ) : (
              <Link href="/#contact" className="btn-primary">
                Request demo
              </Link>
            )}
            {"github" in project.links && project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                GitHub ↗
              </a>
            )}
          </div>
          {"demoNote" in project && project.demoNote && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{project.demoNote}</p>
          )}
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
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
        <section className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">About the project</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.about}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What I did</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-600 marker:text-slate-300 dark:text-slate-300 dark:marker:text-slate-600">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        {screenshots.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Screenshots</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {screenshots.map((shot, index) => (
                <div key={shot} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
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
        )}
        <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
          <Link href="/#projects" className="link-arrow">
            ← Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
