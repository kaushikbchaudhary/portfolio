import siteConfig from "@/data/siteConfig.json";
import skills from "@/data/skills.json";

export const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

const personId = `${siteUrl}/#person`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.seoDescription,
  url: siteUrl,
  image: absoluteUrl(siteConfig.profileImage),
  email: siteConfig.links.email.replace("mailto:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country
  },
  knowsAbout: skills.flatMap((category) => category.items),
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.gitlab].filter(Boolean)
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${siteConfig.name} Portfolio`,
  url: siteUrl,
  inLanguage: "en",
  author: { "@id": personId }
};

export const authorRef = { "@id": personId };

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
