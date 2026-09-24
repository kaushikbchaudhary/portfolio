import type { Metadata } from "next";
import blogPosts from "@/data/blog.json";
import { notFound } from "next/navigation";
import { absoluteUrl, authorRef, breadcrumbJsonLd } from "@/lib/seo";

// Posts are outlines for now; keep them out of search results until they are written in full.
const INDEX_BLOG = false;

interface BlogPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return { title: "Blog Post Not Found" };
  }
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    robots: { index: INDEX_BLOG, follow: true },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt
    }
  };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: new Date(`1 ${post.date}`).toISOString().slice(0, 10),
      url: absoluteUrl(path),
      mainEntityOfPage: absoluteUrl(path),
      author: authorRef
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path }
    ])
  ];

  return (
    <article className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl space-y-8 px-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">{post.date}</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{post.title}</h1>
          <p className="text-base text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <a
          href="/#contact"
          className="inline-flex items-center rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Discuss this project
        </a>
      </div>
    </article>
  );
}
