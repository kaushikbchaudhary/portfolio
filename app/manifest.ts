import type { MetadataRoute } from "next";
import siteConfig from "@/data/siteConfig.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} – ${siteConfig.jobTitle}`,
    short_name: siteConfig.name.split(" ")[0],
    description: siteConfig.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366F1",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" }
    ]
  };
}
