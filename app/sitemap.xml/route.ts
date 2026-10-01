import projects from "@/data/projects.json";
import siteConfig from "@/data/siteConfig.json";
import { absoluteUrl, siteUrl } from "@/lib/seo";

// Hand-written instead of app/sitemap.ts because Next 14's MetadataRoute.Sitemap
// has no image support. Bump `lastUpdated` in siteConfig.json / `updated` in
// projects.json when a page's content changes, so <lastmod> stays trustworthy.
// Blog posts are left out while they are noindexed (see app/blog/[slug]/page.tsx).
export const dynamic = "force-static";

type Entry = { url: string; lastModified: string; images: string[] };

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[char]};`);

function renderEntry({ url, lastModified, images }: Entry) {
  const imageTags = images
    .map((image) => `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`)
    .join("\n");
  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    ...(imageTags ? [imageTags] : []),
    "  </url>"
  ].join("\n");
}

export function GET() {
  const entries: Entry[] = [
    {
      url: siteUrl,
      lastModified: siteConfig.lastUpdated,
      images: [absoluteUrl(siteConfig.profileImage)]
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updated,
      images: Array.from(new Set([project.heroImage, ...project.screenshots])).map((image) => absoluteUrl(image))
    }))
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(renderEntry),
    "</urlset>",
    ""
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
