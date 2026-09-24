import projects from "@/data/projects.json";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { MetadataRoute } from "next";

// Blog posts are left out while they are noindexed (see app/blog/[slug]/page.tsx).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projectPages
  ];
}
