import blogPosts from "@/data/blog.json";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="section">
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
          href="#contact"
          className="inline-flex items-center rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Discuss this project
        </a>
      </div>
    </article>
  );
}
