import siteConfig from "@/data/siteConfig.json";
import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${siteConfig.siteUrl.replace(/\/$/, "")}/sitemap.xml
`;
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
