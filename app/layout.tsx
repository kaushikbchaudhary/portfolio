import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import siteConfig from "@/data/siteConfig.json";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Full-Stack Medical IoT Engineer`,
  description: siteConfig.value,
  openGraph: {
    title: `${siteConfig.name} | Full-Stack Medical IoT Engineer`,
    description: siteConfig.value,
    url: "https://portfolio.example.com",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-white text-slate-900 antialiased dark:bg-slate-950`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
