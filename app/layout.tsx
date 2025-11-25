import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import siteConfig from "@/data/siteConfig.json";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | Full-Stack Medical IoT Engineer`,
  description: siteConfig.value,
  alternates: {
    canonical: siteConfig.siteUrl
  },
  keywords: [
    "Kaushik Chaudhary",
    "Frontend Engineer",
    "React",
    "Next.js",
    "Medical IoT",
    "Healthcare dashboards",
    "BLE",
    "WebSocket",
    "Electron"
  ],
  openGraph: {
    title: `${siteConfig.name} | Full-Stack Medical IoT Engineer`,
    description: siteConfig.value,
    url: siteConfig.siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Full-Stack Medical IoT Engineer`,
    description: siteConfig.value,
    images: ["/og.png"],
    creator: siteConfig.name
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}${siteConfig.heroImage}`,
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.portfolio ?? "",
      siteConfig.links.gitlab ?? "",
      siteConfig.links.email.replace("mailto:", "mailto:")
    ].filter(Boolean)
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-white text-slate-900 antialiased dark:bg-slate-950`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </body>
    </html>
  );
}
