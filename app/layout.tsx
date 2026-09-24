import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import siteConfig from "@/data/siteConfig.json";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { personJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.seoDescription,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  verification: {
    google: siteConfig.googleVerification || undefined
  },
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "profile",
    firstName: siteConfig.name.split(" ")[0],
    lastName: siteConfig.name.split(" ").slice(1).join(" "),
    siteName: `${siteConfig.name} Portfolio`,
    locale: "en_IN",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
      </body>
    </html>
  );
}
