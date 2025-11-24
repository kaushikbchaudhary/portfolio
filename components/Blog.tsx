"use client";

import blogPosts from "@/data/blog.json";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

export function Blog() {
  return (
    <section id="blog" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Writing & Insights</SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.title} href={`/blog/${post.slug}`} className="card block">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">
                {post.date}
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {post.title}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
