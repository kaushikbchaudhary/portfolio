import blogPosts from "@/data/blog.json";
import Link from "next/link";

export default function BlogIndexPage() {
  return (
    <section className="section">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">Blog</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Writing & Insights</h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Product notes from building medical IoT dashboards, real-time telemetry, and quality systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card block h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">{post.date}</p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{post.title}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigoBrand">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
